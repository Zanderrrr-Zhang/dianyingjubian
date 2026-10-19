import { readFile, readdir, access } from 'node:fs/promises';
import { PAGE_FILES, PAGE_REDIRECTS, HOME, SERIES } from '../../src/catalog.mjs';
import { seriesNeighbors } from '../../src/shared/series-navigation.mjs';
import { projectPath } from './project.mjs';

export async function checkProject() {
  const errors = [];
  const actual = (await readdir(projectPath('.'))).filter(f => f.endsWith('.dc.html')).sort();
  const expected = [...PAGE_FILES].sort();
  for (const [old, target] of Object.entries(PAGE_REDIRECTS)) {
    if (actual.includes(old)) errors.push(`Obsolete preview still exists: ${old}`);
    if (!expected.includes(target.split('#')[0])) errors.push(`Broken preview redirect: ${old} -> ${target}`);
  }
  for (const file of actual) if (!expected.includes(file)) errors.push(`Unregistered preview: ${file}`);
  for (const file of expected) if (!actual.includes(file)) errors.push(`Missing page: ${file}`);
  const pages = new Map();
  let links = 0, imports = 0;
  for (const file of actual) {
    const html = await readFile(projectPath(file), 'utf8');
    pages.set(file, html);
    // Include literal links in both templates and the homepage's JS data.
    for (const match of html.matchAll(/(?:\b(?:href)["']?\s*[=:]\s*["'])(\.\/[^"'#?]+\.dc\.html)(?:[?#][^"']*)?["']/g)) {
      const target = decodeURIComponent(match[1].slice(2));
      if (!expected.includes(target)) errors.push(`Broken page link: ${file} -> ${target}`);
      links++;
    }
    for (const match of html.matchAll(/<dc-import\b[^>]*\bname="([^"]+)"/g)) {
      if (!expected.includes(match[1] + '.dc.html')) errors.push(`Missing child: ${file} -> ${match[1]}`);
      imports++;
    }
    for (const match of html.matchAll(/\bsrc="((?:\.\/)?assets\/[^"{}]+|\.\/(?:support|image-slot)\.js)"/g)) {
      await access(projectPath(match[1])).catch(() => errors.push(`Missing local asset: ${file} -> ${match[1]}`));
    }
  }
  const home = pages.get(HOME) || '';
  for (const e of SERIES) {
    if (!home.includes(`./${e.page}`)) errors.push(`Homepage missing series entry: ${e.id}`);
    const combined = pages.get(e.page) || '';
    if (/<dc-import\b/.test(combined)) errors.push(`Series content still requires another page: ${e.id}`);
    const sections = [...combined.matchAll(/data-episode-part="([^"]+)"/g)].map(m => m[1]);
    if (sections.join() !== e.sections.join()) errors.push(`Missing or reordered bundled section: ${e.id}`);
    const navs = [...combined.matchAll(/<nav\b[^>]*data-series-nav="[^"]+"[\s\S]*?<\/nav>/g)].map(m => m[0]);
    if (navs.length !== 2) errors.push(`Expected header and footer navigation: ${e.id}`);
    const neighbors = seriesNeighbors(e.id);
    for (const nav of navs) {
      for (const [rel, neighbor] of [['prev', neighbors.previous], ['next', neighbors.next]]) {
        const match = nav.match(new RegExp(`rel="${rel}" href="\\./([^"]+)"`));
        if ((match?.[1] || '') !== (neighbor?.page || '')) errors.push(`Incorrect ${rel} navigation: ${e.id}`);
      }
    }
  }
  if (errors.length) throw new Error(errors.join('\n'));
  return { pages: actual.length, links, imports, series: SERIES.length };
}

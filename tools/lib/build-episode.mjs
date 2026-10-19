import { readFile, readdir } from 'node:fs/promises';
import { SERIES } from '../../src/catalog.mjs';
import { renderSeriesNavigation } from '../../src/shared/series-navigation.mjs';
import { projectPath } from './project.mjs';

// Legacy page generators are async function bodies, split in reading order.
// Collect all outputs before writing so a generator error cannot leave half a page.
export async function buildEpisode(id, { only, log = () => {} } = {}) {
  const episode = SERIES.find(e => e.id === id);
  if (!episode) throw new Error(`Unknown episode: ${id}`);
  const allowed = new Set([episode.page]);
  if (only) {
    throw new Error(`Pages now include all sections; omit --only and rebuild ${id}.`);
  }
  const outputs = new Map();
  const helpers = {
    EPISODE: episode,
    seriesNav: options => renderSeriesNavigation(id, options),
    readFile: file => readFile(projectPath(file), 'utf8'),
    readFileBinary: async file => new Blob([await readFile(projectPath(file))]),
    async saveFile(file, html) {
      if (!allowed.has(file)) throw new Error(`Unexpected output: ${file}`);
      if (outputs.has(file)) throw new Error(`Duplicate output: ${file}`);
      outputs.set(file, html);
    },
    async ls(dir) {
      const out = [];
      async function walk(relative) {
        const entries = await readdir(projectPath(relative), { withFileTypes: true });
        for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
          const file = `${relative}/${entry.name}`;
          if (entry.isDirectory()) await walk(file); else out.push(file);
        }
      }
      await walk(dir.replace(/\/$/, ''));
      return out;
    },
    log,
    replaceText: (text, find, replacement) => text.split(find).join(replacement),
  };
  const source = (await Promise.all([...episode.parts].map(part => readFile(projectPath(`src/episodes/${id}/${part}.js`), 'utf8')))).join('\n');
  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
  await new AsyncFunction(...Object.keys(helpers), source)(...Object.values(helpers));
  const expected = [...allowed];
  for (const file of expected) if (!outputs.has(file)) throw new Error(`Missing output: ${file}`);
  return outputs;
}

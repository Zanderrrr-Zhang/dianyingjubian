#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { SERIES, EP26_PAGE, HOME } from '../src/catalog.mjs';
import { buildEpisode } from './lib/build-episode.mjs';
import { buildEp26 } from './lib/ep26.mjs';
import { buildHome } from './lib/home.mjs';
import { projectPath } from './lib/project.mjs';

const args = process.argv.slice(2);
let id, all = false, check = false, only;
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--all') all = true;
  else if (arg === '--check') check = true;
  else if (arg === '--only') {
    if (!args[i + 1] || args[i + 1].startsWith('--')) throw new Error('--only requires a comma-separated part list');
    only = args[++i].split(',').filter(Boolean);
  } else if (arg.startsWith('--') || id) throw new Error(`Unknown argument: ${arg}`);
  else id = arg;
}
if (all && (id || only)) throw new Error('--all cannot be combined with an episode or --only');
if (!all && !id) {
  if (only) throw new Error('--only requires an episode');
  console.log('Usage: node tools/build.mjs <episode|--all> [--check]');
  for (const e of SERIES) console.log(`  ${e.id.padEnd(8)} ${e.page}`);
  console.log(`  ep26     ${EP26_PAGE} (sync embedded data)`);
  console.log(`  home     ${HOME}`);
  process.exit(0);
}
const outputs = new Map();
for (const target of all ? [...SERIES.map(e => e.id), 'ep26', 'home'] : [id]) {
  if (target === 'home') {
    if (only) throw new Error('--only is not supported for home');
    outputs.set(HOME, await buildHome());
  } else if (target === 'ep26') {
    if (only) throw new Error('--only is not supported for ep26');
    outputs.set(EP26_PAGE, await buildEp26());
  } else {
    for (const [file, html] of await buildEpisode(target, { only })) outputs.set(file, html);
  }
}
let stale = 0;
for (const [file, html] of outputs) {
  if (check) {
    const current = await readFile(projectPath(file), 'utf8').catch(e => { if (e.code === 'ENOENT') return ''; throw e; });
    if (current.replace(/\r\n/g, '\n') !== html.replace(/\r\n/g, '\n')) { console.error(`Out of date: ${file}`); stale++; }
  } else await writeFile(projectPath(file), html, 'utf8');
}
console.log(`${check ? 'Checked' : 'Built'} ${outputs.size} page files${stale ? `; ${stale} out of date` : ''}.`);
if (stale) process.exitCode = 1;

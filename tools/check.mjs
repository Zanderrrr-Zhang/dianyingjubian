#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { SERIES, EP26_PAGE, HOME } from '../src/catalog.mjs';
import { buildEpisode } from './lib/build-episode.mjs';
import { buildEp26 } from './lib/ep26.mjs';
import { buildHome } from './lib/home.mjs';
import { checkProject } from './lib/check-project.mjs';
import { projectPath } from './lib/project.mjs';

const result = await checkProject();
const normalize = html => html.replace(/\r\n/g, '\n');
for (const episode of SERIES) {
  for (const [file, generated] of await buildEpisode(episode.id)) {
    if (normalize(generated) !== normalize(await readFile(projectPath(file), 'utf8'))) throw new Error(`Generated page is stale: ${file}`);
  }
}
if (normalize(await buildEp26()) !== normalize(await readFile(projectPath(EP26_PAGE), 'utf8'))) throw new Error('EP26 embedded data is stale');
if (normalize(await buildHome()) !== normalize(await readFile(projectPath(HOME), 'utf8'))) throw new Error('Homepage is stale');
console.log(`Checked ${result.pages} pages, ${result.links} page links, ${result.imports} child imports and ${result.series} series entries. All generated pages match their sources.`);

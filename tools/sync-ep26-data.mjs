#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { EP26_PAGE } from '../src/catalog.mjs';
import { buildEp26 } from './lib/ep26.mjs';
import { projectPath } from './lib/project.mjs';

const html = await buildEp26();
const page = projectPath(EP26_PAGE);
if (process.argv.includes('--check')) {
  if (html !== await readFile(page, 'utf8')) throw new Error('EP26 embedded data is stale; run node tools/sync-ep26-data.mjs');
  console.log('EP26 embedded data matches its source files.');
} else {
  await writeFile(page, html, 'utf8');
  console.log('EP26 embedded data updated.');
}

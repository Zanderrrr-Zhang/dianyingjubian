import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import { SERIES } from '../src/catalog.mjs';
import { projectPath } from '../tools/lib/project.mjs';

class DCLogic {
  constructor(props = {}) { this.props = props; }
  setState(update) { Object.assign(this.state, typeof update === 'function' ? update(this.state) : update); }
}

for (const id of ['hjx08', 'zmy09']) {
  test(`${id}: the full page and station interactions work without loading sibling files`, async () => {
    const episode = SERIES.find(e => e.id === id);
    const html = await readFile(projectPath(episode.page), 'utf8');
    assert.doesNotMatch(html, /<dc-import\b/);
    for (const part of episode.sections) assert.ok(html.includes(`data-episode-part="${part}"`));
    const source = html.match(/<script\b[^>]*type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
    const Component = runInNewContext(source + '\nComponent;', {
      DCLogic,
      window: { matchMedia: () => ({ matches: false }) },
      fetch: () => { throw new Error('Sibling files are unavailable'); },
    });
    const page = new Component();
    let values = page.renderVals();
    assert.equal(values.isWide, true);
    assert.equal(values.isNarrow, false);
    assert.ok(values.bTags.length > 0);
    assert.ok(values.bBlocks.length > 0);
    const countRows = value => value.stClips.reduce((sum, clip) => sum + clip.rows.length, 0);
    const initialRows = countRows(values);
    assert.ok(initialRows > 0);
    values.toggleSt();
    values = page.renderVals();
    assert.ok(countRows(values) > initialRows, 'station detail toggle must preserve its state after bundling');
    page.state.mqNarrow = true;
    values = page.renderVals();
    assert.equal(values.isWide, false);
    assert.equal(values.isNarrow, true);
    assert.ok(values.mBlocks.length > 0);
    assert.ok(countRows(values) > initialRows, 'responsive changes must preserve expanded station details');
  });
}

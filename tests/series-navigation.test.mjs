import assert from 'node:assert/strict';
import test from 'node:test';
import { SERIES } from '../src/catalog.mjs';
import { seriesNeighbors, renderSeriesNavigation } from '../src/shared/series-navigation.mjs';
import { buildEpisode } from '../tools/lib/build-episode.mjs';
import { checkProject } from '../tools/lib/check-project.mjs';

test('series navigation connects only available episodes, with correct boundaries', () => {
  assert.equal(seriesNeighbors('cn01').previous, undefined);
  assert.equal(seriesNeighbors('zmy09').next, undefined);
  assert.equal(seriesNeighbors('hy06').next.id, 'hjx08');
  for (const e of SERIES) {
    const { next, previous } = seriesNeighbors(e.id);
    if (next) assert.equal(seriesNeighbors(next.id).previous.id, e.id);
    if (previous) assert.equal(seriesNeighbors(previous.id).next.id, e.id);
    const html = renderSeriesNavigation(e.id);
    assert.equal(html.includes('rel="prev"'), Boolean(previous));
    assert.equal(html.includes('rel="next"'), Boolean(next));
  }
});

test('all published links, assets, bundled sections and both navigation locations are valid', async () => {
  assert.equal((await checkProject()).series, 8);
});

test('long episodes publish a complete main page instead of dependent child pages', async () => {
  for (const id of ['hjx08', 'zmy09']) {
    const e = SERIES.find(e => e.id === id);
    const output = await buildEpisode(id);
    assert.deepEqual([...output.keys()], [e.page]);
    const html = output.get(e.page);
    assert.doesNotMatch(html, /<dc-import\b/);
    assert.deepEqual([...html.matchAll(/data-episode-part="([^"]+)"/g)].map(m => m[1]), e.sections);
    assert.equal([...html.matchAll(/data-series-nav=/g)].length, 2);
    assert.match(html, /<footer/);
    await assert.rejects(buildEpisode(id, { only: ['main'] }), /omit --only/);
  }
});

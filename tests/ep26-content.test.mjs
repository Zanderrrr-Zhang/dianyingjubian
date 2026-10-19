import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

const root = new URL('../', import.meta.url);
const html = await readFile(new URL('电影巨辩26-一战再战.dc.html', root), 'utf8');
const source = html.match(/<script\b[^>]*type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
class DCLogic {
  props = {};
  setState(update) {
    Object.assign(this.state, typeof update === 'function' ? update(this.state) : update);
  }
}
// No browser, network or dynamic-import callback: first render must be complete.
const Component = runInNewContext(source + '\nComponent;', { DCLogic });
const plain = value => JSON.parse(JSON.stringify(value));

test('embedded content preserves the handoff and image sources exactly', async () => {
  const handoff = await readFile(new URL('uploads/ep26-handoff.md', root), 'utf8');
  const expected = JSON.parse(handoff.match(/```json\s*\n([\s\S]*?)```/)[1]);
  const imageSource = await readFile(new URL('src/episodes/ep26/images.js', root), 'utf8');
  const images = JSON.parse(imageSource.replace(/^export const IMG = /, '').trim().replace(/;$/, ''));
  const c = new Component();
  assert.deepEqual(plain(c.D), expected);
  assert.deepEqual(plain(c.IMG), images);
});

for (const width of [360, 1024]) {
  test(`all content is available on first render at ${width}px without module loading`, () => {
    const c = new Component();
    c.state.cw = width;
    const v = c.renderVals();
    assert.equal(v.tldr, c.D.episode.tldr);
    assert.equal(v.road.hits.length, 27);
    assert.ok(v.road.cur.gist.length > 0);
    assert.equal(v.mm.nodes.length, 36);
    assert.equal(v.lin.masters.length, 4);
    assert.ok(v.lin.toolbox.length > 0);
    assert.equal(v.old.rows.length, 9);
    assert.equal(v.ad.rows.length, 11);
    assert.equal(v.db.q.length + v.db.d.length, 10);
    assert.equal(v.po.steps.length, 5);
    assert.equal(v.vl.head.length, 3);
    assert.equal(v.cs.refs.length, 3);
    assert.equal(v.fm.hist.length, 4);
    assert.equal(v.ind.peers.length, 4);
    assert.equal(v.st.alloc.length, 7);
    assert.equal(v.dis.length, 6);
    assert.equal(v.credits.length, 24);
    assert.equal(v.lin.ptaSrc, 'assets/ep26/pta.jpg');

    v.road.cur.onNext();
    assert.notEqual(c.renderVals().road.cur.title, v.road.cur.title);
    const node = v.mm.nodes.find(n => n.has && n.mark === '+');
    node.onToggle();
    assert.ok(c.renderVals().mm.nodes.length > v.mm.nodes.length);
  });
}

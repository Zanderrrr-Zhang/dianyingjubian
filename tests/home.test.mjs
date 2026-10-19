import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile, access } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import { HOME, PAGE_FILES } from '../src/catalog.mjs';
import { projectPath } from '../tools/lib/project.mjs';
import { buildHome } from '../tools/lib/home.mjs';

const html = await readFile(projectPath(HOME), 'utf8');
const source = html.match(/<script\b[^>]*type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
const content = JSON.parse(await readFile(projectPath('src/home/content.json'), 'utf8'));
const episodes = JSON.parse(await readFile(projectPath('src/home/episodes.json'), 'utf8'));

function setup({ reducedMotion = false, hidden = false } = {}) {
  const timers = new Map(), documentListeners = new Map(), motionListeners = new Map();
  let timerId = 0;
  const motion = { matches: reducedMotion, addEventListener: (event, fn) => motionListeners.set(event, fn), removeEventListener: event => motionListeners.delete(event) };
  const document = { hidden, addEventListener: (event, fn) => documentListeners.set(event, fn), removeEventListener: event => documentListeners.delete(event) };
  class DCLogic {
    props = {};
    setState(patch) {
      Object.assign(this.state, typeof patch === 'function' ? patch(this.state) : patch);
      if (this._mounted) this.componentDidUpdate();
    }
  }
  const Component = runInNewContext(source + '\nComponent;', {
    DCLogic, document, window: { matchMedia: () => motion },
    setInterval: (fn, ms) => { const id = ++timerId; timers.set(id, { fn, ms }); return id; },
    clearInterval: id => timers.delete(id),
  });
  const page = new Component();
  return { page, timers, motion, motionListeners, document, documentListeners };
}

test('homepage embeds its data and preserves every existing episode destination', async () => {
  assert.equal(await buildHome(), html);
  assert.doesNotMatch(source, /\bfetch\s*\(|\bimport\s*\(/);
  assert.doesNotMatch(html, /<dc-import\b/);
  assert.equal(episodes.length, 20);
  assert.deepEqual(episodes.map(e => e.href.slice(2)).sort(), PAGE_FILES.filter(p => p !== HOME).sort());
  for (const e of episodes) if (e.img) await access(projectPath(e.img));
  assert.equal(setup().page.renderVals().entries.length, 20);
});

test('every quote has an attribution, destination and traceable source', async () => {
  assert.equal(content.quotes.length, 10);
  assert.equal(new Set(content.quotes.map(q => q.id)).size, 10);
  for (const q of content.quotes) {
    assert.ok(q.speaker && q.episode && q.kind && q.href);
    if (q.sourceFile) {
      const lines = (await readFile(projectPath(q.sourceFile), 'utf8')).split(/\r?\n/);
      assert.ok(lines[q.sourceLine - 1].includes(q.text), `Quote differs from source: ${q.id}`);
      assert.ok(PAGE_FILES.includes(q.href.slice(2)));
      assert.equal(q.speaker, '电影巨辩');
    } else assert.match(q.href, /^https:\/\/www\.vistopia\.com\.cn\/article\/795(?:275|325)$/);
  }
});

test('quote rotation wraps, pauses for reading and releases timers on unmount', () => {
  const { page, timers, document, documentListeners } = setup();
  page.componentDidMount();
  assert.equal(timers.size, 1);
  assert.equal([...timers.values()][0].ms, 9000);
  [...timers.values()][0].fn();
  assert.equal(page.state.quoteIndex, 1);
  page.previousQuote(); page.previousQuote();
  assert.equal(page.state.quoteIndex, 9);
  page.nextQuote();
  assert.equal(page.state.quoteIndex, 0);
  page.enterQuotes(); assert.equal(timers.size, 0);
  page.leaveQuotes(); assert.equal(timers.size, 1);
  page.focusQuotes(); assert.equal(timers.size, 0);
  page.blurQuotes({ currentTarget: { contains: () => false }, relatedTarget: null });
  assert.equal(timers.size, 1);
  page.togglePlayback(); page.enterQuotes(); page.leaveQuotes();
  assert.equal(timers.size, 0, 'hover must not override a manual pause');
  page.togglePlayback(); assert.equal(timers.size, 1);
  document.hidden = true; documentListeners.get('visibilitychange')();
  assert.equal(timers.size, 0);
  document.hidden = false; documentListeners.get('visibilitychange')();
  assert.equal(timers.size, 1);
  page.componentWillUnmount();
  assert.equal(timers.size, 0);
  assert.equal(documentListeners.size, 0);
});

test('reduced motion starts paused and suppresses slide animation', () => {
  const { page, timers } = setup({ reducedMotion: true });
  page.componentDidMount();
  assert.equal(timers.size, 0);
  assert.equal(page.renderVals().quoteAnimation, 'none');
  page.nextQuote(); assert.equal(page.state.quoteIndex, 1);
  page.componentWillUnmount();
});

test('category and keyword search work together, including empty-result recovery', () => {
  const { page } = setup();
  page.renderVals().categories.find(c => c.id === 'series').onSelect();
  assert.equal(page.renderVals().entries.length, 8);
  page.search({ target: { value: '张曼玉' } });
  assert.equal(page.renderVals().entries.length, 1);
  assert.match(page.renderVals().entries[0].title, /张曼玉/);
  page.search({ target: { value: '没有这期xyz' } });
  assert.equal(page.renderVals().empty, true);
  page.clearSearch(); assert.equal(page.renderVals().entries.length, 20);
});

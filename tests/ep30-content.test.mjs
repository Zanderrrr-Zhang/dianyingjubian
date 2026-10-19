import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import { projectPath } from '../tools/lib/project.mjs';

const PAGE = '电影巨辩30-2025世界电影总结.dc.html';
const HANDOFF = 'uploads/电影巨辩30_2025世界电影总结_ClaudeDesign交接.md';

const html = await readFile(projectPath(PAGE), 'utf8');
const source = html.match(/<script\b[^>]*type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
const handoff = await readFile(projectPath(HANDOFF), 'utf8');

class DCLogic {
  constructor(props = {}) { this.props = props; }
  setState(update) { Object.assign(this.state, typeof update === 'function' ? update(this.state) : update); }
}
const sandbox = runInNewContext(source + '\n({ Component, DATA });', { DCLogic, window: {} });
const { Component } = sandbox;
// 换回本上下文的对象，deepStrictEqual 才会比较内容而非原型
const DATA = JSON.parse(JSON.stringify(sandbox.DATA));

// 页面把引号改成了全角，比对时去掉所有引号
const q = (s) => (typeof s === 'string' ? s.replace(/[“”"‘’']/g, '') : s);
const block = (id) => handoff.split(/^### /m).find((s) => s.startsWith(id + ' ')).match(/```(csv|json)\n([\s\S]*?)```/)[2];
function csv(text) {
  const rows = [];
  for (const line of text.trim().split('\n')) {
    const cells = [];
    let cur = '', quoted = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (quoted) {
        if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; } else if (ch === '"') quoted = false; else cur += ch;
      } else if (ch === '"') quoted = true;
      else if (ch === ',') { cells.push(cur); cur = ''; } else cur += ch;
    }
    cells.push(cur);
    rows.push(cells);
  }
  return rows.slice(1);
}
const deepQ = (v) => JSON.parse(JSON.stringify(v, (k, x) => q(x)));

test('EP30 renders on desktop and phone widths without placeholders leaking into values', () => {
  for (const cw of [1240, 1100, 960, 600, 358]) {
    const page = new Component();
    page.state.cw = cw;
    for (const expand of [false, true]) {
      page.state.expand = expand;
      const values = page.renderVals();
      const text = JSON.stringify(values, (k, v) => (typeof v === 'function' ? undefined : v));
      assert.doesNotMatch(text, /NaN|undefined|\[object Object\]/, `width ${cw}`);
      assert.equal(values.mapIsWide, cw >= 1100);
      const map = values.mapIsWide ? values.mw : values.mn;
      assert.equal(map.cells.length, 5 * DATA.heat.length);
      assert.equal(map.labels.length + (values.mapIsWide ? map.labels2.length : 0), expand ? DATA.stations.length : DATA.stations.filter((s) => s[3] === 1).length);
    }
  }
  const page = new Component();
  page.renderVals().mw.cellHits[0].on();
  assert.equal(page.state.hc, '0-0');
  page.renderVals().mw.labels[0].onSel();
  assert.notEqual(page.state.st, 7);
});

test('EP30 timeline labels never overlap each other in the same lane', () => {
  for (const cw of [1336, 1240, 1150, 1100]) {
    const page = new Component();
    page.state.cw = cw;
    page.state.expand = true;
    const { mw } = page.renderVals();
    for (const list of [mw.labels, mw.labels2]) {
      const byLane = {};
      for (const l of list) (byLane[l.y] = byLane[l.y] || []).push(l);
      for (const lane of Object.values(byLane)) {
        lane.sort((a, b) => a.x - b.x);
        for (let i = 1; i < lane.length; i++) assert.ok(lane[i].x >= lane[i - 1].x + lane[i - 1].w, `${lane[i].text} overlaps ${lane[i - 1].text} at width ${cw}`);
      }
      for (const l of list) assert.ok(l.x >= 0 && l.x + l.w <= cw, `${l.text} stays inside the page at width ${cw}`);
    }
    // 主站标签在轴上方：引线向下经过的层里不能有别的标签
    for (const l of mw.labels) {
      for (const m of mw.labels) {
        if (m !== l && m.y > l.y) assert.ok(!(m.x < l.lx && l.lx < m.x + m.w), `leader of ${l.text} crosses ${m.text} at width ${cw}`);
      }
    }
  }
});

test('EP30 embedded data matches the handoff appendix', () => {
  assert.deepEqual(DATA.sections.map((r) => r.map(q)), csv(block('D1')).map(([id, name, a, b, min, share, cat]) => [id, q(name), a, b, +min, +share, cat]));
  assert.deepEqual(DATA.stations, csv(block('D2')).map(([t, l, b, lv, m]) => [t, l, b, +lv, +m]));
  assert.deepEqual(DATA.heat, csv(block('D3')).map(([a, b, ...n]) => [a, b, ...n.map(Number)]));
  const d4 = JSON.parse(block('D4'));
  assert.deepEqual(deepQ(DATA.stances), deepQ(d4));
  const d5 = JSON.parse(block('D5'));
  assert.deepEqual(deepQ(DATA.women), deepQ({ keywords: d5.keywords, chains: d5.chains, houses: d5.houses, houseNote: d5.house_note }));
  assert.deepEqual(DATA.strategies.map((r) => r.map(q)), csv(block('D6')).map(([n, ...r]) => [+n, ...r].map(q)));
  assert.deepEqual(DATA.films.map((r) => r.map(q)), csv(block('D7')).map(([t, o, d, b, c, m, tot, men, r, note]) => [t, o, d, b, +c, +m, +tot, men === '' ? null : +men, r, note].map(q)));
  const d8 = JSON.parse(block('D8'));
  assert.deepEqual(deepQ({ left: DATA.bigYear.left, right: DATA.bigYear.right }), deepQ({ left: d8.left, right: d8.right }));
  const d9 = JSON.parse(block('D9'));
  assert.deepEqual(deepQ(DATA.sv), deepQ({ autumn: d9.autumn_sonata, sentimental: d9.sentimental_value, critic: d9.critic, defender: d9.defender, ending: d9.ending }));
  assert.deepEqual(DATA.decades, csv(block('D10')).map(([d, n, w]) => [d, +n, w]));
  assert.equal(DATA.decades.reduce((s, d) => s + d[1], 0), 22);
  assert.deepEqual(deepQ(DATA.routes), deepQ(JSON.parse(block('D11'))));
  const d12 = JSON.parse(block('D12'));
  assert.deepEqual(deepQ(DATA.agent), deepQ({ line1977: d12.line_1977, bridge: d12.bridge, line2020s: d12.line_2020s, matryoshka: d12.matryoshka, aside: d12.aside }));
  assert.deepEqual(DATA.splits.map((r) => r.map(q)), csv(block('D13')).map((r) => r.map(q)));
  const d14 = JSON.parse(block('D14'));
  assert.deepEqual(deepQ(DATA.heal), deepQ({ sources: d14.sources, linkQuote: d14.link_quote, hub: d14.hub, films: d14.films.map((f) => [f.film, f.act]) }));
});

test('EP30 headline numbers are derived from the appendix', () => {
  const sec = Object.fromEntries(DATA.sections.map((s) => [s[0], s]));
  assert.equal(Math.round(sec.B1[4] + sec.B2[4] + sec.B3[4]), 224);
  // 交接文档的 72% 是三个 share_pct 之和（71.5）取整；按分钟直接算是 71.4%
  assert.equal(Math.round(+(sec.B1[5] + sec.B2[5] + sec.B3[5]).toFixed(1)), 72);
  const top = [...DATA.films].sort((a, b) => b[6] - a[6])[0];
  assert.deepEqual([top[0], top[6]], ['密探', 19.1]);
  const truth = DATA.heat.map((r) => r[11]);
  assert.equal(Math.max(...truth), 24.06);
});

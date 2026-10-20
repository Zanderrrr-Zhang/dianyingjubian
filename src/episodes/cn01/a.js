const MD = 'src/episodes/cn01/handoff.md';
const OUT = EPISODE.page;
const md = await readFile(MD);

function csv(s) {
  const rows = [];
  for (const line of s.trim().split('\n')) {
    const out = []; let cur = '', q = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (q) { if (ch === '"') { if (line[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += ch; }
      else { if (ch === '"') q = true; else if (ch === ',') { out.push(cur); cur = ''; } else cur += ch; }
    }
    out.push(cur); rows.push(out);
  }
  const h = rows.shift();
  return rows.map(r => Object.fromEntries(h.map((k, i) => [k, (r[i] || '').trim()])));
}
function sectionText(id) { const i = md.indexOf('### ' + id + ' '); const s = md.slice(i + 4); const j = s.indexOf('\n### '); return j < 0 ? s : s.slice(0, j); }
function blk(id) { const m = sectionText(id).match(/```(csv|json)\n([\s\S]*?)```/); return m[1] === 'csv' ? csv(m[2]) : JSON.parse(m[2]); }
function mdTable(id) { const rows = []; for (const l of sectionText(id).split('\n')) { if (!l.startsWith('|')) continue; const c = l.split('|').slice(1, -1).map(x => x.trim()); if (/^-+$/.test(c[0])) continue; rows.push(c); } rows.shift(); return rows; }

const hms = s => { const p = s.split(':').map(Number); return p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + p[1]; };
const hm = s => { const [h, m] = s.split(':').map(Number); return h * 3600 + m * 60; };
const T = hms('7:22:27');
const D1 = blk('D1'), D2 = blk('D2'), D3 = blk('D3'), D4 = blk('D4'), D5 = blk('D5'), D6 = blk('D6'), D7 = blk('D7'), D8 = blk('D8'), D9 = blk('D9'), D10 = blk('D10'), D11 = blk('D11'), D12 = blk('D12'), D13 = blk('D13'), D14 = blk('D14'), D17 = blk('D17');
const D15 = mdTable('D15');

const C = { ink: '#1D1B18', ink2: '#2E2A24', paper: '#F4F0E6', card: '#FBF8F1', deep: '#ECE6D9', muted: '#4F493F', cap: '#6B6355', faint: '#8E877A', rule: 'rgba(29,27,24,0.15)', rule2: 'rgba(29,27,24,0.32)', ref: '#2F4A6B', sys: '#6F87A6', cre: '#A8432F', opn: '#2E7D6B', off: '#7A6A55', neu: '#B8B2A6', yel: '#E0A82E' };
const F = { serif: "'Noto Serif SC', serif", sans: "'Noto Sans SC', sans-serif", mono: "'IBM Plex Mono', 'Noto Sans SC', monospace" };
const PAD = 'clamp(20px, 5vw, 72px)';
const CAT = {
  reform: { c: C.ref, t: C.ref, g: 'sq', name: '改革' },
  creation: { c: C.cre, t: C.cre, g: 'ci', name: '创作' },
  opening: { c: C.opn, t: C.opn, g: 'tr', name: '开放' },
  officials: { c: C.off, t: C.off, g: 'di', name: '管理者' },
  neutral: { c: C.neu, t: C.cap, g: 'ba', name: '中性' },
  context: { c: C.neu, t: C.cap, g: 'ba', name: '大环境' }
};
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pct = f => (f * 100).toFixed(3) + '%';
const f1 = n => (+n).toFixed(1), f2 = n => (+n).toFixed(2);
const fmtHM = m => Math.floor(m / 60) + ':' + String(m % 60).padStart(2, '0');
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${(+a).toFixed(3)})`; };

function gl(g, c, s = 10, hollow = false) {
  const b = `display: inline-block; flex: none; width: ${s}px; height: ${s}px; box-sizing: border-box;`;
  const neu = c === C.neu;
  const fill = hollow ? `background: ${C.paper}; border: 1.5px solid ${neu ? C.faint : c};` : `background: ${c};${neu ? ` border: 1px solid ${C.faint};` : ''}`;
  if (g === 'sq') return `<span style="${b} ${fill}"></span>`;
  if (g === 'ci') return `<span style="${b} ${fill} border-radius: 50%;"></span>`;
  if (g === 'di') return `<span style="${b} ${fill} transform: rotate(45deg) scale(0.8);"></span>`;
  if (g === 'ba') return `<span style="display: inline-block; flex: none; width: ${s}px; height: ${Math.max(4, Math.round(s * 0.5))}px; box-sizing: border-box; ${fill}"></span>`;
  const tri = 'clip-path: polygon(50% 0, 100% 100%, 0 100%);';
  if (!hollow) return `<span style="${b} background: ${c}; ${tri}"></span>`;
  return `<span style="${b} position: relative; background: ${c}; ${tri}"><span style="position: absolute; left: 2.4px; right: 2.4px; top: 3.6px; bottom: 1.5px; background: ${C.paper}; ${tri}"></span></span>`;
}
function spread(ideal, gap, lo, hi) {
  let cl = ideal.map(x => ({ sum: x, n: 1 }));
  const start = c => Math.max(lo, Math.min(hi - gap * (c.n - 1), c.sum / c.n - gap * (c.n - 1) / 2));
  let changed = true;
  while (changed) { changed = false; for (let k = 0; k < cl.length - 1; k++) { if (start(cl[k]) + gap * cl[k].n > start(cl[k + 1]) + 1e-9) { cl.splice(k, 2, { sum: cl[k].sum + cl[k + 1].sum, n: cl[k].n + cl[k + 1].n }); changed = true; break; } } }
  const out = []; for (const c of cl) { const s = start(c); for (let j = 0; j < c.n; j++) out.push(s + j * gap); } return out;
}
function vspread(items, H) {
  const out = []; let prev = -1e9;
  items.forEach(it => { let top = Math.max(0, it.y - it.h / 2, prev); out.push(top); prev = top + it.h + 3; });
  let next = H; for (let i = items.length - 1; i >= 0; i--) { if (out[i] + items[i].h > next) out[i] = next - items[i].h; next = out[i] - 3; }
  return out;
}

const SHORT = { b0: '开场', b1: '问题', b2: '计划经济与发行改革', b3: '制片改革、主旋律与审查', b4: '创作：代际与类型', b5: '开放一：进口片', b6: '开放二：影院与合拍', b7: '管电影的官员', b8: '反思与展望' };
const SEC = {}; D1.forEach(r => { SEC[r.id] = Object.assign({}, CAT[r.category], { id: r.id, name: r.section, s: hms(r.start), e: hms(r.end), min: r.minutes, share: r.share_pct, cat: r.category }); });
const SECS = Object.values(SEC);
const CL = D2.map(r => ({ n: r.clip, title: r.title, s: hms(r.start), e: hms(r.end), min: r.minutes, start: r.start, end: r.end }));
const ST = D3.map((r, i) => ({ i, t: hms(r.time), time: r.time, clip: r.clip, ct: r.clip_time, label: r.label, sec: r.section, level: +r.level }));
const N1 = ST.filter(s => s.level === 1).length, NST = ST.length;
const GROUPS = [{ k: 'dist', name: '发行放映', c: C.ref }, { k: 'sys', name: '体制与制片', c: C.sys }, { k: 'crea', name: '创作与代际', c: C.cre }, { k: 'open', name: '开放与进口', c: C.opn }, { k: 'cens', name: '审查与意识形态', c: C.off }];
const BINS = D4.map((r, i) => ({ s: hm(r.bin_start), e: i === D4.length - 1 ? T : hm(r.bin_end), a: r.bin_start, b: r.bin_end, v: Object.fromEntries(GROUPS.map(g => [g.k, +r[g.k + '_per1k']])) }));
const PEAKS = { dist: [['1:50', '在讲院线制和互联网票务'], ['7:10', '结尾讲分线发行，回升']], sys: [['2:10', '西影厂与指标']], crea: [['2:50', '代际划分开讲']], open: [['5:10', '分账大片的舆论战']], cens: [['6:30', '田聪明与分级']] };
const EV = D5.map((r, i) => ({ i, y: +r.year, lane: r.lane, imp: +r.importance, text: r.event }));
const LANE_NAME = { reform: '改革', opening: '开放', creation: '创作与内容管理', context: '大环境' };

const S = {
  h2: `margin: 0; font-family: ${F.serif}; font-weight: 700; font-size: clamp(30px, 3.6vw, 46px); line-height: 1.15; letter-spacing: 0.02em;`,
  intro: `margin: 24px 0 0; max-width: 840px; font-size: 17px; line-height: 1.9; color: ${C.ink2}; text-wrap: pretty;`,
  cap: `margin: 16px 0 0; max-width: 1040px; font-size: 13px; line-height: 1.8; color: ${C.cap}; text-wrap: pretty;`,
  btn: `user-select: none; font-family: ${F.sans}; font-size: 13.5px; letter-spacing: 0.04em; padding: 8px 14px; border: 1px solid ${C.ink}; background: ${C.card}; color: ${C.ink}; cursor: pointer;`,
  btnH: `background: ${C.ink}; color: ${C.paper};`
};
function head(letter, title, q) {
  return `<div style="display: flex; flex-wrap: wrap; align-items: flex-end; gap: 12px 22px; padding-bottom: 16px; border-bottom: 3px double ${C.ink};"><span style="flex: none; width: 46px; height: 46px; box-sizing: border-box; border: 1.5px solid ${C.ink}; display: flex; align-items: center; justify-content: center; font-family: ${F.mono}; font-size: 22px; font-weight: 600;">${letter}</span><h2 style="${S.h2}">${title}</h2><span style="margin-left: auto; padding-bottom: 6px; font-size: 15px; color: ${C.muted};">${q}</span></div>`;
}
const LAND = new Set(['chengnan', 'mumaren']);
function pbox(k, title) {
  const land = LAND.has(k);
  return `<div style="position: relative; aspect-ratio: ${land ? '3 / 2' : '2 / 3'}; background: ${C.deep}; box-shadow: 0 0 0 1px ${C.ink}, 4px 4px 0 rgba(29,27,24,0.12);"><image-slot id="cn01-f-${k}" src="assets/cn01/f-${k}.jpg" shape="rect" placeholder="${esc(title)}"></image-slot></div>`;
}
function poster(k, title, cap, w) {
  const ww = w || (LAND.has(k) ? '200px' : '112px');
  return `<figure style="margin: 0; width: ${ww}; max-width: 100%;">${pbox(k, title)}<figcaption style="margin-top: 10px; font-size: 12.5px; line-height: 1.55;"><span style="display: block; font-family: ${F.serif}; font-weight: 700; color: ${C.ink};">${esc(title)}</span>${cap ? `<span style="display: block; color: ${C.cap};">${esc(cap)}</span>` : ''}</figcaption></figure>`;
}
function face(k, name, s = 56) {
  return `<div style="display: flex; flex-direction: column; align-items: center; gap: 6px; width: ${s + 8}px;"><div style="position: relative; width: ${s}px; height: ${s}px; border-radius: 50%; background: ${C.deep}; box-shadow: 0 0 0 1px ${C.rule2};"><image-slot id="cn01-p-${k}" src="assets/cn01/p-${k}.jpg" shape="circle" placeholder="${esc(name)}"></image-slot></div><span style="font-size: 12px; line-height: 1.3; color: ${C.ink2}; white-space: nowrap;">${esc(name)}</span></div>`;
}
function quoteFace(text, who, k, name) {
  return `<figure style="margin: 0; padding: 18px 0 0; border-top: 1px solid ${C.ink}; display: grid; grid-template-columns: 72px minmax(0, 1fr); gap: 18px; align-items: start;"><div style="position: relative; width: 72px; height: 72px; border-radius: 50%; background: ${C.deep}; box-shadow: 0 0 0 1px ${C.rule2};"><image-slot id="cn01-p-${k}" src="assets/cn01/p-${k}.jpg" shape="circle" placeholder="${esc(name)}"></image-slot></div><div><blockquote style="margin: 0; font-family: ${F.serif}; font-size: 21px; font-weight: 600; line-height: 1.6; color: ${C.ink}; text-wrap: pretty;">${esc(text)}</blockquote><figcaption style="margin-top: 8px; font-size: 13px; color: ${C.cap};">—— ${esc(who)}</figcaption></div></figure>`;
}
function openers() {
  const it = (k, title, time, label) => `<div style="display: grid; grid-template-columns: 96px minmax(0, 1fr); gap: 18px; align-items: end;">${pbox(k, title)}<div style="padding-bottom: 4px;"><div style="font-family: ${F.mono}; font-size: 13px; color: ${C.cap};">${time}</div><div style="margin-top: 6px; font-family: ${F.serif}; font-size: 17px; font-weight: 700; line-height: 1.55; text-wrap: pretty;">${esc(label)}</div></div></div>`;
  return `<div style="margin-top: 32px; max-width: 840px;"><div style="font-size: 12.5px; letter-spacing: 0.14em; color: ${C.cap};">问题从这两部片开始</div><div style="margin-top: 14px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 22px 40px;">${it('zhuawawa', '《抓娃娃》', '0:08:51', '2024 暑期档：《抓娃娃》与“价值空心化”')}${it('jiemi', '《解密》', '0:18:54', '《解密》：往自己后场踢了一脚')}</div></div>`;
}
function filmStrip() {
  const items = [['yigehebage', '《一个和八个》', 1983, 'creation', '探索片开始'], ['modaihuangdi', '《末代皇帝》', 1988, 'opening', '合拍'], ['bawang', '《霸王别姬》', 1993, 'opening', '合拍片到达高峰；获金棕榈'], ['yingxiong', '《英雄》', 2002, 'creation', '开启古装大片'], ['avatar', '《阿凡达》', 2010, 'opening', '带动建院潮'], ['taijiong', '《泰囧》', 2012, 'creation', '终结古装大片时代']];
  return `<div style="margin-top: 44px;"><div style="display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 16px; padding-bottom: 10px; border-bottom: 1px solid ${C.ink};"><h3 style="margin: 0; font-family: ${F.serif}; font-size: 20px; font-weight: 700;">时间线上的片子</h3><span style="font-size: 13px; color: ${C.cap};">按年份；标记的颜色和形状对应泳道</span></div><div style="margin-top: 20px; display: grid; grid-template-columns: repeat(auto-fill, minmax(118px, 150px)); gap: 26px 24px;">${items.map(([k, t, y, lane, cap]) => `<div><div style="display: flex; align-items: center; gap: 7px; margin-bottom: 10px;">${gl(CAT[lane].g, CAT[lane].c, 10)}<span style="font-family: ${F.mono}; font-size: 15px; font-weight: 600;">${y}</span></div>${poster(k, t, cap, '100%')}</div>`).join('')}</div></div>`;
}
// 全页是一本账：底上一层淡蓝横线，左边距一对朱砂竖线
const LEDGER = `repeating-linear-gradient(180deg, transparent 0 31px, ${rgba(C.ref, 0.055)} 31px 32px), linear-gradient(90deg, transparent 0 calc(${PAD} * 0.5 - 3px), ${rgba(C.cre, 0.28)} calc(${PAD} * 0.5 - 3px) calc(${PAD} * 0.5 - 2px), transparent calc(${PAD} * 0.5 - 2px) calc(${PAD} * 0.5 + 1px), ${rgba(C.cre, 0.28)} calc(${PAD} * 0.5 + 1px) calc(${PAD} * 0.5 + 2px), transparent calc(${PAD} * 0.5 + 2px)), ${C.paper}`;
// 模块之间是一道票根式的骑缝线：虚线两端各一个半圆缺口
const tear = `<div aria-hidden="true" style="position: relative; height: 18px; margin: 0 calc(-1 * ${PAD}); background: repeating-linear-gradient(90deg, ${C.rule2} 0 7px, transparent 7px 13px) 0 50% / 100% 1.5px no-repeat;"><span style="position: absolute; left: -9px; top: 0; width: 18px; height: 18px; border-radius: 50%; background: ${C.deep}; box-shadow: inset 0 0 0 1px ${C.rule2};"></span><span style="position: absolute; right: -9px; top: 0; width: 18px; height: 18px; border-radius: 50%; background: ${C.deep}; box-shadow: inset 0 0 0 1px ${C.rule2};"></span></div>`;
const secOpen = (id, letter, title) => `<section id="${id}" data-screen-label="${letter} ${title}" style="padding: clamp(40px, 5vw, 64px) ${PAD} 0;">${tear}<div style="height: clamp(36px, 4.5vw, 56px);"></div>`;
function quote(text, who, size = 21) {
  return `<figure style="margin: 0; padding: 18px 0 0; border-top: 1px solid ${C.ink};"><blockquote style="margin: 0; font-family: ${F.serif}; font-size: ${size}px; font-weight: 600; line-height: 1.6; color: ${C.ink}; text-wrap: pretty;">${esc(text)}</blockquote><figcaption style="margin-top: 8px; font-size: 13px; color: ${C.cap};">—— ${esc(who)}</figcaption></figure>`;
}

// ===== A cover
function cover() {
  const toc = [['map', 'B', '节目地图'], ['relay', 'C', '话题接力'], ['years', 'D', '四十五年'], ['flow', 'E', '钱和拷贝怎么流'], ['rights', 'F', '四权不放'], ['gens', 'G', '四代人'], ['steps', 'H', '开放的台阶'], ['breaks', 'I', '三次突破'], ['officials', 'J', '管电影的人'], ['why2010', 'N', '2010 年代为什么爆发'], ['future', 'K', '会停在 2.8'], ['mentions', 'L', '谁被提得最多'], ['ledger', 'M', '账本']];
  const meta = [['节目', '《电影巨辩》'], ['专辑', '《为了华语电影》，第一张付费专辑'], ['本集', '第 1 集《中国电影的改开史》'], ['主持', '老马（magasa）、阿吴（LOOK）'], ['录制', '2024 年夏末'], ['时长', '<span style="font-family: ' + F.mono + ';">7:22:27</span>'], ['分段', '平台上切成 14 段播出，内容是一期'], ['跨度', '1978–2024，最早追到 1956 年']];
  const three = [
    ['reform', '改革', '体制、发行、制片', '谁能拍、谁来发、钱怎么分。发行放映和投资主体这些经济范畴的事，改掉了大半。', '两个板块 · 129 分钟'],
    ['creation', '创作与内容管理', '代际、类型、作品、审查', '四代导演怎么拍，类型怎么来。内容管理始终没有动。', '一个板块 · 97 分钟'],
    ['opening', '开放', '进口片、外资、合拍', '和外部的关系。用节目的话说，“一个台阶一个台阶升上来”。', '两个板块 · 103.5 分钟']
  ];
  return `<header id="cover" data-screen-label="A 封面" style="background: repeating-linear-gradient(180deg, transparent 0 35px, rgba(47,74,107,0.08) 35px 36px), ${C.paper}; padding: clamp(22px, 3vw, 36px) ${PAD} clamp(44px, 5vw, 64px); border-bottom: 3px double ${C.ink};">
${seriesNav({ color: C.cap })}
<div style="margin-top: clamp(36px, 5vw, 64px); display: flex; flex-wrap: wrap; gap: 44px 56px; align-items: flex-start;">
<div style="flex: 1 1 560px; min-width: 0;">
<div style="display: flex; align-items: center; gap: 14px; font-family: ${F.serif}; font-size: 18px; font-weight: 600; letter-spacing: 0.24em;">为了华语电影<span style="font-family: ${F.mono}; font-size: 15px; letter-spacing: 0.04em; border: 1.5px solid ${C.ink}; padding: 2px 8px 1px;">01</span></div>
<h1 style="margin: 20px 0 0; font-family: ${F.serif}; font-weight: 900; font-size: clamp(50px, 8.4vw, 124px); line-height: 1.04; letter-spacing: 0.01em;">中国电影的改开史</h1>
<div style="margin-top: 20px; font-size: 17px; line-height: 1.7; color: ${C.muted};">电影巨辩《为了华语电影》第 1 集 · 7 小时 22 分 · 老马 × 阿吴</div>
<div style="margin-top: 44px; font-family: ${F.serif}; font-weight: 700; font-size: clamp(26px, 3.1vw, 40px); line-height: 1.7;"><span style="border-bottom: 5px solid ${C.ref};">改了什么</span>，<span style="border-bottom: 5px solid ${C.cre};">没改什么</span>，<span style="border-bottom: 5px solid ${C.opn};">开放到哪一步</span>。</div>
<p style="margin: 22px 0 0; max-width: 720px; font-size: 17.5px; line-height: 1.95; color: ${C.ink2}; text-wrap: pretty;">这是节目的主线：中国电影从 80 年代到今天的变化，都可以用这三个问题来解释。发行放映和投资主体这些经济范畴的事改掉了大半，所以有了 2010 年代的爆发；内容管理始终没有动。往后看，节目估计会停在“只改经济范畴”和“维持现状”之间，更靠近后者，用节目的说法是“2.8、2.9”。</p>
</div>
<div style="flex: 0 1 340px; min-width: 0; background: ${C.card}; border: 1px solid ${C.ink};">
<div style="display: flex; justify-content: space-between; padding: 13px 20px 12px; border-bottom: 1px dashed ${C.ink}; font-size: 12px; letter-spacing: 0.22em;"><span>节目档案</span><span style="font-family: ${F.mono}; letter-spacing: 0.06em;">No. 01</span></div>
${meta.map(([k, v]) => `<div style="display: grid; grid-template-columns: 52px minmax(0, 1fr); gap: 12px; padding: 10px 20px; border-bottom: 1px solid ${C.rule}; font-size: 14.5px; line-height: 1.65;"><span style="color: ${C.cap};">${k}</span><span>${v}</span></div>`).join('')}
<div style="padding: 14px 20px 16px;"><div style="display: flex; gap: 2px; height: 16px;">${CL.map(c => `<span style="flex: ${c.min} 1 0; min-width: 0; box-sizing: border-box; border: 1px solid ${C.ink}; background: ${C.paper};"></span>`).join('')}</div><div style="margin-top: 8px; font-size: 12px; color: ${C.cap};">14 段，宽度按时长；正好像 14 盒拷贝</div></div>
</div>
</div>
<div style="margin-top: 56px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); gap: 28px 32px;">
${three.map(([k, n, sub, txt, m]) => `<div style="border-top: 6px solid ${CAT[k].c}; padding-top: 16px;"><div style="display: flex; align-items: center; gap: 10px;">${gl(CAT[k].g, CAT[k].c, 13)}<span style="font-family: ${F.serif}; font-size: 22px; font-weight: 700;">${n}</span></div><div style="margin-top: 6px; font-size: 13px; letter-spacing: 0.06em; color: ${CAT[k].t};">${sub} · ${m}</div><p style="margin: 10px 0 0; font-size: 15.5px; line-height: 1.85; color: ${C.ink2}; text-wrap: pretty;">${txt}</p></div>`).join('')}
</div>
<div style="margin-top: 28px; display: flex; flex-wrap: wrap; align-items: center; gap: 10px 22px; font-size: 13px; color: ${C.cap};"><span>颜色和形状全页一致：</span>${['reform', 'creation', 'opening', 'officials', 'neutral'].map(k => `<span style="display: inline-flex; align-items: center; gap: 7px; color: ${C.ink2};">${gl(CAT[k].g, CAT[k].c, 11)}${{ reform: '改革', creation: '创作', opening: '开放', officials: '管理者：官员、审查、分级', neutral: '中性：开场、问题、反思、大环境' }[k]}</span>`).join('')}</div>
<nav style="margin-top: 40px; display: flex; flex-wrap: wrap; gap: 8px;">${toc.map(([id, l, t]) => `<a href="#${id}" style="display: inline-flex; align-items: baseline; gap: 8px; padding: 7px 12px 6px; border: 1px solid ${C.rule2}; background: ${C.card}; color: ${C.ink}; font-size: 14px;" style-hover="border-color: ${C.ink}; color: ${C.ink};"><span style="font-family: ${F.mono}; font-weight: 600; font-size: 13px;">${l}</span>${t}</a>`).join('')}</nav>
</header>`;
}

// ===== B + C
function cHead() {
  const relay = GROUPS.map(g => { const p = PEAKS[g.k][0]; return `<span style="display: inline-flex; align-items: center; gap: 7px; padding: 5px 10px; border: 1px solid ${C.rule2}; background: ${C.card}; font-size: 13.5px;">${gl('sq', g.c, 9)}${g.name}<span style="font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${p[0]}</span></span>`; }).join(`<span style="color: ${C.faint};">→</span>`);
  return `<div style="display: flex; flex-wrap: wrap; align-items: flex-end; gap: 12px 18px; padding-bottom: 14px; border-bottom: 3px double ${C.ink};"><span style="flex: none; width: 38px; height: 38px; box-sizing: border-box; border: 1.5px solid ${C.ink}; display: flex; align-items: center; justify-content: center; font-family: ${F.mono}; font-size: 18px; font-weight: 600;">C</span><h3 id="relay" style="margin: 0; font-family: ${F.serif}; font-weight: 700; font-size: clamp(26px, 2.8vw, 34px);">话题接力</h3><span style="margin-left: auto; padding-bottom: 4px; font-size: 15px; color: ${C.muted};">每段时间在聊什么</span></div>
<div style="margin-top: 18px; font-family: ${F.serif}; font-size: clamp(19px, 2vw, 23px); font-weight: 600; line-height: 1.6;">节目按发行、制片、创作、开放、官员的顺序一棒接一棒。</div>
<div style="margin-top: 14px; display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px;">${relay}</div>`;
}
const KW = '发行放映：发行、院线、拷贝、分账、票房、影院、电影院、统购统销、三角债；体制与制片：制片厂、电影厂、国营、国有、指标、计划经济、市场经济、厂长、企业、自主权、出品、民营、资本、垄断；创作与代际：第三至第六代、启蒙、探索片、独立电影、地下电影、娱乐片、类型、题材、现实主义、写实、伤痕、商业片、艺术片；开放与进口：进口、好莱坞、引进、合拍、外资、WTO、买断、配额、美国、香港、港片、港台；审查与意识形态：审查、过审、送审、分级、意识形态、主旋律、尺度、少儿不宜、禁令、禁片、封杀、毙。';
const heatA = v => v <= 0 ? 0 : 0.08 + 0.92 * Math.pow(Math.min(v, 23) / 23, 0.8);

function bcDesktop() {
  const TW = 1036;
  const L1 = ST.filter(s => s.level === 1), L2 = ST.filter(s => s.level === 2);
  const ttl = s => esc(s.time + ' · 第 ' + s.clip + ' 段 ' + s.ct + ' · ' + s.label + '（' + SEC[s.sec].name + '）');
  const estV = s => [...s].reduce((a, ch) => a + (ch.charCodeAt(0) < 128 ? 7.4 : 12.75), 0) + 19;
  const TAGH = Math.ceil(Math.max(...L1.map(s => estV(s.label)))) + 6, LEAD = 30;
  const xs = spread(L1.map(s => s.t / T), 21 / TW, 10.5 / TW, 1 - 10.5 / TW);
  let tags = '', lines = '', marks = '';
  L1.forEach((s, k) => {
    const sec = SEC[s.sec];
    tags += `<div title="${ttl(s)}" style="position: absolute; left: ${pct(xs[k])}; bottom: 0; transform: translateX(-50%); writing-mode: vertical-rl; font-size: 12px; line-height: 1; letter-spacing: 0.06em; padding: 7px 3px; border: 1px solid ${C.ink}; border-top: 4px solid ${sec.c}; background: ${C.card}; color: ${C.ink}; white-space: nowrap; cursor: default;" style-hover="background: ${C.ink}; color: ${C.paper};">${esc(s.label)}</div>`;
    lines += `<line x1="${f2(xs[k] * 1000)}" y1="0" x2="${f2(s.t / T * 1000)}" y2="${LEAD}" stroke="${C.ink}" strokeOpacity="0.5" strokeWidth="1" vectorEffect="non-scaling-stroke"></line>`;
    marks += `<span style="position: absolute; left: ${pct(s.t / T)}; bottom: -3px; width: 6px; height: 6px; margin-left: -3px; border-radius: 50%; background: ${C.ink};"></span>`;
  });
  L2.forEach(s => { marks += `<div title="${ttl(s)}" style="position: absolute; left: ${pct(s.t / T)}; bottom: 0; width: 9px; height: 16px; margin-left: -4.5px; display: flex; justify-content: center; align-items: flex-end; cursor: help;"><span style="width: 1.5px; height: 10px; background: ${SEC[s.sec].t};"></span></div>`; });
  let clips = '';
  CL.forEach((c, i) => {
    const w = (c.e - c.s) / T, nar = w * TW < 30;
    clips += `<div title="${esc('第 ' + c.n + ' 段 · ' + c.start + '–' + c.end + ' · ' + c.min + ' 分钟 · ' + c.title)}" style="position: absolute; top: 0; bottom: 0; left: ${pct(c.s / T)}; width: ${pct(w)}; padding: 0 1px; box-sizing: border-box; cursor: help;"><div style="height: 100%; box-sizing: border-box; border: 1px solid ${C.ink}; background: ${C.card}; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; overflow: hidden;" style-hover="background: ${C.deep};"><span style="font-family: ${F.mono}; font-size: ${nar ? 10 : 16}px; font-weight: 600; line-height: 1;">${c.n}</span>${nar ? '' : `<span style="font-family: ${F.mono}; font-size: 11px; line-height: 1; color: ${C.cap};">${c.min}′</span>`}</div></div>`;
  });
  let bands = '';
  SECS.forEach(s => {
    const w = (s.e - s.s) / T, px = w * TW, dark = s.cat !== 'neutral';
    bands += `<div style="position: absolute; top: 0; bottom: 0; left: ${pct(s.s / T)}; width: ${pct(w)}; padding-right: 2px; box-sizing: border-box;"><div style="height: 100%; box-sizing: border-box; background: ${s.c}; color: ${dark ? C.card : C.ink}; padding: 7px 8px; overflow: hidden;">${px >= 34 ? `<div style="font-family: ${F.serif}; font-size: 13px; font-weight: 600; line-height: 1.3;">${esc(SHORT[s.id])}</div>` : ''}${px >= 130 ? `<div style="margin-top: 3px; font-family: ${F.mono}; font-size: 11px; white-space: nowrap;">${s.min}′ · ${s.share}%</div>` : px >= 70 ? `<div style="margin-top: 3px; font-family: ${F.mono}; font-size: 11px; white-space: nowrap;">${s.min}′</div>` : ''}</div></div>`;
  });
  const axis = () => { let a = ''; for (let m = 0; m <= 420; m += 30) a += `<div style="position: absolute; left: ${pct(m * 60 / T)}; top: 0; width: 1px; height: 6px; background: ${C.rule2};"></div><div style="position: absolute; left: ${pct(m * 60 / T)}; top: 9px; ${m ? 'transform: translateX(-50%);' : ''} font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${fmtHM(m)}</div>`; a += `<div style="position: absolute; right: 0; top: 0; width: 1px; height: 6px; background: ${C.rule2};"></div><div style="position: absolute; right: 0; top: 9px; font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">7:22</div>`; return `<div style="position: relative; height: 30px; border-top: 1px solid ${C.rule2};">${a}</div>`; };
  const G = 'display: grid; grid-template-columns: 128px minmax(0, 1fr); column-gap: 16px;';
  const lab = (t, sub, al = 'center') => `<div style="display: flex; flex-direction: column; justify-content: ${al}; gap: 4px;"><span style="font-size: 13px; letter-spacing: 0.12em; color: ${C.ink2};">${t}</span>${sub ? `<span style="font-size: 11.5px; line-height: 1.55; color: ${C.cap};">${sub}</span>` : ''}</div>`;
  const legend = ['reform', 'creation', 'opening', 'officials', 'neutral'].map(k => `<span style="display: inline-flex; align-items: center; gap: 6px;"><span style="width: 14px; height: 10px; background: ${CAT[k].c};"></span>${{ reform: '改革', creation: '创作', opening: '开放', officials: '管理者', neutral: '中性' }[k]}</span>`).join('');
  const secLines = SECS.slice(1).map(s => `<div style="position: absolute; top: 0; bottom: 0; left: ${pct(s.s / T)}; width: 1px; background: ${C.rule2};"></div>`).join('');
  let crows = '';
  GROUPS.forEach(g => {
    const peak = Math.max(...BINS.map(b => b.v[g.k]));
    let cells = '', notes = '';
    BINS.forEach(b => { const a = heatA(b.v[g.k]); cells += `<div style="position: absolute; top: 0; bottom: 0; left: ${pct(b.s / T)}; width: ${pct((b.e - b.s) / T)}; padding-right: 1px; box-sizing: border-box;"><div style="height: 100%; background: ${a ? rgba(g.c, a) : 'transparent'};"></div></div>`; });
    PEAKS[g.k].forEach(([st, note]) => {
      const b = BINS.find(x => x.a === st), v = b.v[g.k], right = b.s / T > 0.8;
      cells += `<div style="position: absolute; top: -2px; bottom: -2px; left: ${pct(b.s / T)}; width: ${pct((b.e - b.s) / T)}; box-sizing: border-box; border: 2px solid ${C.ink};"></div>`;
      notes += `<div style="position: absolute; ${right ? `right: ${pct(1 - b.e / T)}` : `left: ${pct(b.s / T)}`}; bottom: 4px; display: flex; gap: 6px; align-items: baseline; white-space: nowrap; font-size: 12px; color: ${C.ink};"><span style="font-family: ${F.mono}; font-weight: 600;">${v.toFixed(1)}</span><span style="font-family: ${F.mono}; color: ${C.cap};">${b.a}–${b.b}</span><span>${note}</span></div>`;
    });
    crows += `<div style="${G}"><div style="display: flex; align-items: center; gap: 8px; padding-top: 22px;">${gl('sq', g.c, 10)}<div><div style="font-family: ${F.serif}; font-size: 14px; font-weight: 600; line-height: 1.3;">${g.name}</div><div style="font-size: 11px; color: ${C.cap};">峰值 ${peak.toFixed(1)}</div></div></div><div style="position: relative; height: 54px;"><div style="position: absolute; left: 0; right: 0; top: 0; height: 22px;">${notes}</div><div style="position: absolute; left: 0; right: 0; top: 22px; bottom: 2px; background: rgba(29,27,24,0.035);">${secLines}${cells}</div></div></div>`;
  });
  return `<div style="margin-top: 36px; overflow-x: auto; padding-bottom: 8px;"><div style="min-width: 1180px;">
<div style="${G}">${lab('站点', `方框是 ${N1} 个主站；短刻度是 ${NST - N1} 个次站。悬停可看在第几段的几分几秒`, 'flex-end')}<div style="position: relative; height: ${TAGH + LEAD}px;"><div style="position: absolute; left: 0; right: 0; top: 0; height: ${TAGH}px;">${tags}</div><svg viewBox="0 0 1000 ${LEAD}" preserveAspectRatio="none" style="position: absolute; left: 0; top: ${TAGH}px; width: 100%; height: ${LEAD}px; overflow: visible;">${lines}</svg><div style="position: absolute; left: 0; right: 0; top: ${TAGH}px; height: ${LEAD}px;">${marks}</div>
</div></div>
<div style="${G}">${lab('平台 14 段', '悬停看段名')}<div><div style="height: 10px; background: repeating-linear-gradient(90deg, ${C.paper} 0 5px, transparent 5px 12px) 0 50% / 100% 4px no-repeat, ${C.ink};"></div><div style="position: relative; height: 52px;">${clips}</div></div></div>
<div style="${G} margin-top: 3px;">${lab('9 个板块', '按节目里的过渡句切分')}<div style="position: relative; height: 58px;">${bands}</div></div>
<div style="${G} margin-top: 10px;"><div></div><div style="display: flex; flex-wrap: wrap; gap: 6px 20px; font-size: 12.5px; color: ${C.cap};">${legend}<span>第 01 段、第 10 段各跨两个板块</span></div></div>
<div style="${G} margin-top: 12px;"><div style="font-size: 12px; color: ${C.cap};">全片时间</div>${axis()}</div>
<div style="margin-top: 52px;">${cHead()}</div>
<div style="margin-top: 14px;">${crows}</div>
<div style="${G} margin-top: 6px;"><div style="font-size: 12px; color: ${C.cap};">全片时间</div>${axis()}</div>
<div style="${G} margin-top: 6px;"><div></div><div style="display: flex; align-items: center; gap: 10px; font-size: 12px; color: ${C.cap};"><span style="font-family: ${F.mono};">0</span><span style="width: 160px; height: 10px; background: linear-gradient(90deg, rgba(29,27,24,0.08), ${C.ink});"></span><span style="font-family: ${F.mono};">23</span><span>每千字出现次数；粗框为峰值</span></div></div>
</div></div>`;
}

function bcMobile() {
  const H = 1820, k = H / T;
  const X = { clip: 38, sec: 67, heat: 79, lead: 135, lab: 157 };
  let h = '';
  for (let m = 0; m <= 420; m += 30) { const y = m * 60 * k; h += `<div style="position: absolute; left: 0; top: ${f1(y)}px; transform: translateY(-50%); font-family: ${F.mono}; font-size: 11px; color: ${C.cap};">${fmtHM(m)}</div><div style="position: absolute; left: ${X.clip}px; width: ${X.lead - X.clip}px; top: ${f1(y)}px; height: 1px; background: ${C.rule};"></div>`; }
  h += `<div style="position: absolute; left: 0; top: ${H}px; transform: translateY(-50%); font-family: ${F.mono}; font-size: 11px; color: ${C.cap};">7:22</div>`;
  CL.forEach(c => { const y = c.s * k, dy = (c.e - c.s) * k; h += `<div style="position: absolute; left: ${X.clip}px; width: 26px; top: ${f1(y)}px; height: ${f1(dy)}px; padding: 1px 0; box-sizing: border-box;"><div style="height: 100%; box-sizing: border-box; border: 1px solid ${C.ink}; background: ${C.card}; display: flex; align-items: center; justify-content: center; font-family: ${F.mono}; font-size: 11px; font-weight: 600;">${c.n}</div></div>`; });
  SECS.forEach(s => { h += `<div style="position: absolute; left: ${X.sec}px; width: 8px; top: ${f1(s.s * k)}px; height: ${f1((s.e - s.s) * k - 2)}px; background: ${s.c};"></div>`; });
  GROUPS.forEach((g, j) => { BINS.forEach(b => { const a = heatA(b.v[g.k]); if (!a) return; h += `<div style="position: absolute; left: ${X.heat + j * 11}px; width: 10px; top: ${f1(b.s * k)}px; height: ${f1((b.e - b.s) * k - 1)}px; background: ${rgba(g.c, a)};"></div>`; }); });
  const items = [];
  SECS.forEach(s => items.push({ t: s.s, o: 0, kind: 'sec', s }));
  ST.filter(s => s.level === 1).forEach(s => items.push({ t: s.t, o: 1, kind: 'st', s }));
  items.sort((a, b) => a.t - b.t || a.o - b.o);
  const AW = 190, est = str => [...str].reduce((a, ch) => a + (ch.charCodeAt(0) < 128 ? 7.2 : 13.3), 0);
  items.forEach(it => { it.h = it.kind === 'sec' ? Math.ceil(est(it.s.name + ' 00.0′') / AW) * 19 + 10 : Math.ceil((est(it.s.label) + 40) / AW) * 18 + 2; it.y = it.t * k; });
  const tops = vspread(items, H);
  let svg = '', labs = '';
  items.forEach((it, i) => {
    const cy = tops[i] + (it.kind === 'sec' ? 10 : it.h / 2);
    svg += `<line x1="0" y1="${f1(it.y)}" x2="22" y2="${f1(cy)}" stroke="${it.kind === 'sec' ? it.s.t : C.ink}" strokeOpacity="0.6" strokeWidth="1"></line>`;
    if (it.kind === 'sec') labs += `<div style="position: absolute; left: ${X.lab}px; right: 0; top: ${f1(tops[i])}px; padding-top: 4px; border-top: 2px solid ${it.s.c}; font-family: ${F.serif}; font-size: 14px; font-weight: 700; line-height: 1.35;">${esc(it.s.name)} <span style="font-family: ${F.mono}; font-size: 11px; font-weight: 400; color: ${C.cap};">${it.s.min}′</span></div>`;
    else labs += `<div style="position: absolute; left: ${X.lab}px; right: 0; top: ${f1(tops[i])}px; font-size: 13px; line-height: 18px;"><span style="font-family: ${F.mono}; font-size: 11px; color: ${C.cap}; margin-right: 6px;">${it.s.time.slice(0, -3)}</span>${esc(it.s.label)}</div>`;
  });
  const leg = GROUPS.map(g => `<span style="display: inline-flex; align-items: center; gap: 6px;">${gl('sq', g.c, 9)}${g.name}</span>`).join('');
  return `<div style="margin-top: 28px;">${cHead()}</div>
<div style="margin-top: 18px; display: flex; flex-wrap: wrap; gap: 6px 14px; font-size: 12.5px; color: ${C.ink2};">${leg}</div>
<p style="${S.cap}">左起：全片时间、平台 14 段、板块颜色、五组话题的热度（颜色越深，该组关键词每千字出现越多）、主站。</p>
<div style="position: relative; height: ${H}px; margin: 26px 0 12px;">${h}<svg width="22" height="${H}" style="position: absolute; left: ${X.lead}px; top: 0; overflow: visible;">${svg}</svg>${labs}</div>`;
}

function stationList() {
  let h = '';
  CL.forEach(c => {
    const [t1, t2] = c.title.split('｜');
    const rows = ST.filter(s => s.clip === c.n).map(s => {
      const sec = SEC[s.sec], one = s.level === 1;
      const row = `<div style="display: ${one ? 'grid' : '{{ stMinorGrid }}'}; grid-template-columns: 56px 40px 10px minmax(0, 1fr); gap: 8px; align-items: baseline; padding: 4px 0;"><span style="font-family: ${F.mono}; font-size: 12.5px; color: ${C.ink2};">${s.time}</span><span style="font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${s.ct}</span><span style="align-self: center; display: flex;">${gl(sec.g, sec.c, 8)}</span><span style="${one ? `font-family: ${F.serif}; font-size: 15px; font-weight: 600; color: ${C.ink};` : `font-size: 14px; color: ${C.muted};`} line-height: 1.55;">${esc(s.label)}</span></div>`;
      return row;
    }).join('');
    h += `<div style="break-inside: avoid; padding: 14px 0 20px; border-top: 2px solid ${C.ink};"><div style="display: flex; align-items: baseline; gap: 12px;"><span style="font-family: ${F.mono}; font-size: 22px; font-weight: 600; line-height: 1;">${c.n}</span><span style="font-family: ${F.serif}; font-size: 16px; font-weight: 700; line-height: 1.45;">${esc(t1)}</span></div><div style="margin-top: 5px; font-size: 13px; line-height: 1.6; color: ${C.muted};">${esc(t2 || '')}</div><div style="margin-top: 4px; font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${c.start}–${c.end} · ${c.min}′</div><div style="margin-top: 8px;">${rows}</div></div>`;
  });
  return `<div style="margin-top: 60px; display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px 20px; padding-bottom: 12px; border-bottom: 1px solid ${C.ink};"><h3 style="margin: 0; font-family: ${F.serif}; font-size: 24px; font-weight: 700;">按段落回听</h3><span style="font-size: 13.5px; color: ${C.cap};">每行依次是全片时间、该段内的时间、站点；宋体为主站</span><div role="button" onClick="{{ toggleSt }}" style="margin-left: auto; ${S.btn}" style-hover="${S.btnH}">{{ stBtn }}</div></div>
<div style="margin-top: 22px; columns: 300px; column-gap: 40px;">${h}</div>`;
}

function sectionB() {
  return `${secOpen('map', 'B', '节目地图')}${head('B', '节目地图', '七个多小时怎么走的')}
<p style="${S.intro}">先从 2024 年暑期档的两部电影提出问题，再依次讲计划经济怎么运转、发行怎么改、制片怎么改、几代导演怎么拍、对外怎么开放、管电影的官员是谁，最后是反思和预测。</p>
${openers()}
<div style="margin-top: 22px; font-family: ${F.serif}; font-size: clamp(20px, 2.2vw, 26px); font-weight: 600; line-height: 1.6;"><span style="color: ${C.ref};">改革</span>两块 129 分钟，<span style="color: ${C.opn};">开放</span>两块 103.5 分钟，<span style="color: ${C.cre};">创作</span>一块 97 分钟。</div>
<div style="display: {{ wideDisp }};">${bcDesktop()}<p style="${S.cap}">条宽按时长等比。板块按节目里的过渡句切分，误差约一分钟。话题热度每 10 分钟一格，五行同一色阶，用每千字出现次数而不是次数（最后一格只有两分半）。各组关键词——${KW}</p></div>
<div style="display: {{ narrowDisp }};">${bcMobile()}<p style="${S.cap}">各组关键词——${KW}</p></div>
${stationList()}
</section>`;
}

// ===== D
const PHASES = [{ n: '计划经济的尾声', a: 1978, b: 1992 }, { n: '半截改革', a: 1993, b: 2001 }, { n: '产业化', a: 2002, b: 2009 }, { n: '爆发与停滞', a: 2010, b: 2024 }];
const LOOSE = y => y === 1988 || y === 1989 || (y >= 2010 && y <= 2017);
const evMeta = [];
function dDesktop() {
  const TW = 1036, Y0 = 1976, SPAN = 49;
  const xY = y => (y - Y0) / SPAN;
  const xc = e => e.y < 1970 ? xY(1976.6) : xY(e.y + 0.5);
  const LANES = [{ k: 'reform', name: '改革', sub: '体制、发行、制片' }, { k: 'opening', name: '开放', sub: '进口片、外资、合拍' }, { k: 'creation', name: '创作与内容管理', sub: '代际、类型、审查' }, { k: 'context', name: '大环境', sub: '经济与政治背景' }];
  const TOP = 40, RA = 64, Z = 22, RB = 64, LH = RA + Z + RB, GAP = 14, LW = 150;
  const lanesEnd = TOP + LANES.length * (LH + GAP) - GAP;
  const HT = lanesEnd + 34;
  let lanes = '', labs = '';
  LANES.forEach((ln, li) => {
    const top = TOP + li * (LH + GAP), cat = CAT[ln.k];
    const evs = EV.filter(e => e.lane === ln.k);
    const groups = {}; evs.forEach(e => { (groups[e.y] = groups[e.y] || []).push(e); });
    let mk = '';
    Object.values(groups).forEach(g => {
      g.sort((a, b) => a.imp - b.imp);
      const offs = g.length === 1 ? [0] : g.length === 2 ? [-5, 5] : [-8, 0, 8];
      g.forEach((e, j) => {
        const x = xc(e), s = e.imp === 1 ? 11 : 8;
        mk += `<div title="${esc(e.y + ' · ' + LANE_NAME[e.lane] + ' · ' + e.text + (e.imp === 1 ? '' : '（次要事件）'))}" style="position: absolute; left: ${pct(x)}; top: ${RA + Z / 2 + offs[j]}px; width: 14px; height: 14px; margin: -7px 0 0 -7px; display: flex; align-items: center; justify-content: center; cursor: help; z-index: 2;">${gl(cat.g, cat.c, s, e.imp === 2)}</div>`;
        evMeta[e.i] = { x, top: top + RA + Z + 8 };
      });
    });
    const ones = evs.filter(e => e.imp === 1).sort((a, b) => a.y - b.y);
    const rows = [ones.filter((_, i) => i % 2 === 0), ones.filter((_, i) => i % 2 === 1)];
    let lb = '', ld = '';
    rows.forEach((r, ri) => {
      if (!r.length) return;
      const starts = spread(r.map(e => xc(e) - 7 / TW), (LW + 10) / TW, 0, 1 - LW / TW);
      r.forEach((e, j) => {
        const st = starts[j], x = xc(e);
        lb += `<div style="position: absolute; left: ${pct(st)}; ${ri === 0 ? `bottom: ${LH - RA}px; padding: 0 0 3px 7px;` : `top: ${RA + Z}px; padding: 3px 0 0 7px;`} width: ${LW}px; box-sizing: border-box; border-left: 1px solid ${cat.t}; font-size: 12.5px; line-height: 1.45; color: ${C.ink}; text-wrap: pretty; cursor: default;"><span style="font-family: ${F.mono}; font-weight: 600; color: ${cat.t}; margin-right: 5px;">${e.y}</span>${esc(e.text)}</div>`;
        ld += `<line x1="${f2(x * 1000)}" y1="${RA + Z / 2}" x2="${f2(st * 1000)}" y2="${ri === 0 ? RA : RA + Z}" stroke="${cat.t}" strokeWidth="1" vectorEffect="non-scaling-stroke"></line>`;
      });
    });
    lanes += `<div style="position: absolute; left: 0; right: 0; top: ${top}px; height: ${LH}px;"><div style="position: absolute; left: 0; right: 0; top: ${RA + Z / 2}px; height: 1px; background: ${cat.t}; opacity: 0.55;"></div><svg viewBox="0 0 1000 ${LH}" preserveAspectRatio="none" style="position: absolute; left: 0; top: 0; width: 100%; height: ${LH}px; overflow: visible;">${ld}</svg>${lb}${mk}</div>`;
    if (li) lanes += `<div style="position: absolute; left: 0; right: 0; top: ${top - GAP / 2}px; border-top: 1px dashed ${C.rule2};"></div>`;
    labs += `<div style="position: absolute; left: 0; right: 0; top: ${top + RA - 8}px;"><div style="display: flex; align-items: center; gap: 8px;">${gl(cat.g, cat.c, 12)}<span style="font-family: ${F.serif}; font-size: 16px; font-weight: 700; line-height: 1.3;">${ln.name}</span></div><div style="margin-top: 3px; padding-left: 20px; font-size: 12px; line-height: 1.5; color: ${C.cap};">${ln.sub}</div></div>`;
  });
  const hatch = `repeating-linear-gradient(135deg, rgba(29,27,24,0.10) 0 1px, transparent 1px 7px), rgba(29,27,24,0.035)`;
  const over = `<div style="position: absolute; left: ${pct(xY(1993))}; width: ${pct(2 / SPAN)}; top: ${TOP - 8}px; height: ${lanesEnd - TOP + 8}px; background: rgba(224,168,46,0.18); pointer-events: none;"></div>
<div style="position: absolute; left: ${pct(xY(1987.4))}; width: ${pct(2.4 / SPAN)}; top: ${TOP - 8}px; height: ${lanesEnd - TOP + 30}px; background: linear-gradient(90deg, rgba(29,27,24,0), rgba(29,27,24,0.09) 30%, rgba(29,27,24,0.09) 70%, rgba(29,27,24,0)); pointer-events: none;"></div>
<div style="position: absolute; left: ${pct(xY(2009.6))}; width: ${pct(8.6 / SPAN)}; top: ${TOP - 8}px; height: ${lanesEnd - TOP + 30}px; background: linear-gradient(90deg, rgba(29,27,24,0), rgba(29,27,24,0.09) 10%, rgba(29,27,24,0.09) 50%, rgba(29,27,24,0)); pointer-events: none;"></div>
<div style="position: absolute; right: ${pct(1 - xY(1993.5))}; top: 4px; display: flex; align-items: center; gap: 6px; padding: 4px 9px 3px; background: ${C.yel}; font-family: ${F.mono}; font-size: 12.5px; font-weight: 600; color: ${C.ink};">1993 · 25 次</div>
<div style="position: absolute; left: ${pct(xY(1994.5))}; top: 4px; display: flex; align-items: center; gap: 10px; white-space: nowrap;"><span style="padding: 4px 9px 3px; background: ${C.yel}; font-family: ${F.mono}; font-size: 12.5px; font-weight: 600; color: ${C.ink};">1994 · 18 次</span><span style="font-size: 12px; color: ${C.cap};">全片被提到最多的两个年份：发行改革、分账大片</span></div>
<div style="position: absolute; left: ${pct(xY(1987.6))}; top: ${lanesEnd + 10}px; font-size: 12px; color: ${C.muted}; white-space: nowrap;">↑ 节目认为相对宽松：1988 年前后至 1989 年上半年</div>
<div style="position: absolute; left: ${pct(xY(2010))}; top: ${lanesEnd + 10}px; font-size: 12px; color: ${C.muted}; white-space: nowrap;">↑ 节目认为相对宽松：2010 年之后的几年（节目没给终点）</div>`;
  let ax = '';
  for (let y = 1978; y <= 2024; y++) { const x = xY(y + 0.5), big = y % 5 === 0 || y === 2024; ax += `<div style="position: absolute; left: ${pct(x)}; top: 0; width: 1px; height: ${big ? 7 : 4}px; background: ${C.rule2};"></div>`; if (big) ax += `<div style="position: absolute; left: ${pct(x)}; top: 10px; transform: translateX(-50%); font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${y}</div>`; }
  ax += `<div style="position: absolute; left: ${pct(xY(1976.6))}; top: 10px; transform: translateX(-50%); font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">1956</div><div style="position: absolute; left: ${pct(xY(1977.3))}; top: -8px; transform: translateX(-50%); font-family: ${F.mono}; font-size: 14px; color: ${C.cap};">≈</div>`;
  const ph = PHASES.map(p => `<div style="position: absolute; left: ${pct(xY(p.a))}; width: ${pct((p.b + 1 - p.a) / SPAN)}; top: 0; padding: 0 3px; box-sizing: border-box;"><div style="height: 8px; border: 1px solid ${C.ink}; border-bottom: none;"></div><div style="margin-top: 6px; text-align: center; font-family: ${F.serif}; font-size: 14px; font-weight: 600; line-height: 1.3;">${p.n}</div><div style="text-align: center; font-family: ${F.mono}; font-size: 11.5px; color: ${C.cap};">${p.a}–${p.b}</div></div>`).join('');
  const G = 'display: grid; grid-template-columns: 128px minmax(0, 1fr); column-gap: 16px;';
  return `<div style="margin-top: 36px; overflow-x: auto; padding-bottom: 8px;"><div style="min-width: 1180px;">
<div style="${G}"><div style="position: relative; height: ${HT}px;">${labs}</div><div style="position: relative; height: ${HT}px;">${over}${lanes}
</div></div>
<div style="${G}"><div style="font-size: 12px; color: ${C.cap};">年份</div><div style="position: relative; height: 32px; border-top: 1px solid ${C.rule2};">${ax}</div></div>
<div style="${G} margin-top: 10px;"><div style="font-size: 12px; line-height: 1.5; color: ${C.cap};">分期为整理者所加</div><div style="position: relative; height: 54px;">${ph}</div></div>
</div></div>`;
}
function dList() {
  const chip = lane => { const c = CAT[lane]; return `<span style="flex: none; display: inline-flex; align-items: center; gap: 5px; padding: 1px 6px; border: 1px solid ${c.t}; font-size: 11.5px; line-height: 1.5; color: ${c.t}; white-space: nowrap;">${gl(c.g, c.c, 7)}${{ reform: '改革', opening: '开放', creation: '创作', context: '大环境' }[lane]}</span>`; };
  const years = [...new Set(EV.map(e => e.y))].sort((a, b) => a - b);
  const cols = PHASES.map((p, pi) => {
    const ys = years.filter(y => pi === 0 ? y <= p.b : y >= p.a && y <= p.b);
    const rows = ys.map(y => {
      const evs = EV.filter(e => e.y === y).sort((a, b) => a.imp - b.imp);
      const has1 = evs.some(e => e.imp === 1);
      const hl = y === 1993 || y === 1994;
      const items = evs.map(e => { const r = `<div style="display: ${e.imp === 1 ? 'flex' : '{{ evMinorFlex }}'}; align-items: flex-start; gap: 8px; padding: 2px 0;">${chip(e.lane)}<span style="font-size: 14px; line-height: 1.6; color: ${e.imp === 1 ? C.ink : C.muted};">${esc(e.text)}</span></div>`; return r; }).join('');
      const row = `<div style="display: ${has1 ? 'grid' : '{{ evMinorGrid }}'}; grid-template-columns: 54px minmax(0, 1fr); gap: 10px; padding: 9px 0; border-top: 1px solid ${C.rule};"><div><span style="font-family: ${F.mono}; font-size: 15px; font-weight: 600; ${hl ? `background: ${C.yel}; padding: 1px 5px;` : ''}">${y}</span>${LOOSE(y) ? `<div style="margin-top: 5px; font-size: 11px; color: ${C.muted}; padding: 0 3px; background: repeating-linear-gradient(135deg, rgba(29,27,24,0.12) 0 1px, transparent 1px 5px); width: max-content;">宽松期</div>` : ''}</div><div>${items}</div></div>`;
      return row;
    }).join('');
    return `<div><div style="padding-bottom: 8px; border-bottom: 2px solid ${C.ink};"><div style="font-family: ${F.serif}; font-size: 18px; font-weight: 700;">${p.n}</div><div style="font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${p.a}–${p.b}${pi === 0 ? '（另含 1956）' : ''}</div></div>${rows}</div>`;
  }).join('');
  return `<p style="${S.cap}">按年份排列，标签是泳道。黄色是全片被提到最多的两个年份（1993 年 25 次，1994 年 18 次）；“宽松期”是节目认为相对宽松的年份。</p><div style="margin-top: 22px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 28px 32px; align-items: start;">${cols}</div><p style="${S.cap}">阶段名为整理者所加，不是节目原话。</p>`;
}
function sectionD() {
  return `${secOpen('years', 'D', '四十五年')}${head('D', '四十五年', '四十五年里改了什么、放了什么')}
<p style="${S.intro}">四条泳道按节目的分法：“改革”指内部体制的变化——谁能拍、谁来发、钱怎么分；“开放”指和外部的关系——进口片、外资、合拍。创作与内容管理单列一道，大环境垫在最下面。</p>
<div style="display: {{ wideDisp }};">${dDesktop()}<p style="${S.cap}">年份以节目说法为准。实心标记为主要事件，空心为次要事件，悬停可看全文；1956 年的一条（舍饭寺会议）画在最左端。斜线色带是节目认为相对宽松的时期，边缘画虚是因为节目没有给出精确起止，第二条带的终点按 2017 年前后画。</p></div>
${filmStrip()}
<div style="margin-top: 28px; display: flex;"><div role="button" onClick="{{ toggleEv }}" style="${S.btn}" style-hover="${S.btnH}">{{ evBtn }}</div></div>
<div style="display: {{ evListDisp }};">${dList()}</div>
</section>`;
}

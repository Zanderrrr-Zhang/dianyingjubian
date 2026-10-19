const MD = 'src/episodes/yh05/handoff.md';
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
  return rows.map(r => Object.fromEntries(h.map((k, i) => [k.trim(), (r[i] || '').trim()])));
}
function sectionText(id) {
  const i = md.indexOf('### ' + id + ' '); if (i < 0) throw new Error('missing ' + id);
  const s = md.slice(i + 4); let e = s.length;
  const j = s.indexOf('\n### '), k = s.indexOf('\n## ');
  if (j >= 0) e = j; if (k >= 0 && k < e) e = k; return s.slice(0, e);
}
function blks(id) { return [...sectionText(id).matchAll(/```(csv|json)\n([\s\S]*?)```/g)].map(m => m[1] === 'csv' ? csv(m[2]) : JSON.parse(m[2])); }
function mdTable(id) { const rows = []; for (const l of sectionText(id).split('\n')) { if (!l.startsWith('|')) continue; const c = l.split('|').slice(1, -1).map(x => x.trim()); if (/^-+$/.test(c[0])) continue; rows.push(c); } rows.shift(); return rows; }
const D = {}; for (let i = 1; i <= 24; i++) D[i] = blks('D' + i);
const D25 = mdTable('D25');
const tS = s => { const p = s.split(':').map(Number); return p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 3600 + p[1] * 60; };
const T = tS('7:48:34');

const C = { bg: '#121417', bg2: '#181B1F', bg3: '#20242A', bar: '#07080A', fg: '#ECE6D8', fg2: '#D3CDBF', sub: '#B4AEA2', cap: '#8E897F', faint: '#5C5953', rule: 'rgba(236,230,216,0.13)', rule2: 'rgba(236,230,216,0.28)', rule3: 'rgba(236,230,216,0.5)', self: '#D9822B', aud: '#4F8A8B', none: '#6E6E6E', ind: '#3E5C76', meth: '#CFC8B4', ppl: '#6D5E7A', glow: '#FFF4D6', red: '#9A3B33' };
const F = { serif: "'Noto Serif SC', serif", sans: "'Noto Sans SC', sans-serif", mono: "'IBM Plex Mono', monospace" };
const PAD = 'clamp(20px, 5vw, 72px)';
const BOTH = `repeating-linear-gradient(135deg, ${C.self} 0 6px, ${C.aud} 6px 12px)`;
const TRK = { self: C.self, audience: C.aud, both: 'both', none: C.none };
const TRKN = { self: '满足自己', audience: '满足观众', both: '两轨之间', none: '其他或银河之前' };
const bgOf = c => c === 'both' ? `background: ${BOTH};` : `background: ${c};`;
const inkOn = c => (c === C.self || c === C.aud || c === C.meth || c === C.glow) ? C.bg : '#fff';
const GLOWBOX = `box-shadow: 0 0 0 1px ${C.glow}, 0 0 28px 6px rgba(255,244,214,0.28);`;
const GLOWTXT = `color: ${C.glow}; text-shadow: 0 0 22px rgba(255,244,214,0.55);`;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const f1 = n => (+n).toFixed(1);
const fmtHM = m => Math.floor(m / 60) + ':' + String(m % 60).padStart(2, '0');
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${(+a).toFixed(3)})`; };
const mono = s => `<span style="font-family: ${F.mono};">${s}</span>`;
const estW = (s, p = 12) => [...String(s)].reduce((a, ch) => a + (ch.charCodeAt(0) < 128 ? p * 0.6 : p), 0);
const nLines = (s, p, w) => Math.max(1, Math.ceil(estW(s, p) / w));
const sw = (col, w = 11, h = 11) => `<span style="display: inline-block; flex: none; width: ${w}px; height: ${h}px; ${bgOf(col)}"></span>`;
const shape = (g, s = 11, col = C.fg) => g === 'to' ? `<span title="杜琪峰单独导演" style="display: inline-block; flex: none; width: ${s}px; height: ${s}px; background: ${col};"></span>` : g === 'to_wai' ? `<span title="杜琪峰、韦家辉联合导演" style="display: inline-block; flex: none; width: ${Math.round(s * 1.3)}px; height: ${Math.round(s * 1.3)}px; background: ${col}; clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);"></span>` : `<span title="其他导演" style="display: inline-block; flex: none; width: ${s}px; height: ${s}px; border-radius: 50%; background: ${col};"></span>`;
const S = {
  h2: `margin: 0; font-family: ${F.serif}; font-weight: 700; font-size: clamp(30px, 3.6vw, 46px); line-height: 1.15; letter-spacing: 0.02em; color: ${C.fg};`,
  h3: `margin: 0; font-family: ${F.serif}; font-size: 21px; font-weight: 700; line-height: 1.4;`,
  intro: `margin: 24px 0 0; max-width: 880px; font-size: 17px; line-height: 1.9; color: ${C.fg2}; text-wrap: pretty;`,
  lead: `margin: 22px 0 0; max-width: 1100px; font-family: ${F.serif}; font-size: clamp(20px, 2.2vw, 26px); font-weight: 600; line-height: 1.6; text-wrap: pretty;`,
  cap: `margin: 16px 0 0; max-width: 1080px; font-size: 13px; line-height: 1.8; color: ${C.cap}; text-wrap: pretty;`,
  body: `font-size: 15px; line-height: 1.8; color: ${C.fg2}; text-wrap: pretty;`,
  btn: `user-select: none; font-family: ${F.sans}; font-size: 13.5px; letter-spacing: 0.04em; padding: 8px 14px; border: 1px solid ${C.rule3}; background: ${C.bg2}; color: ${C.fg}; cursor: pointer;`,
  btnH: `background: ${C.fg}; color: ${C.bg};`,
  chip: `display: inline-flex; align-items: center; gap: 5px; padding: 1px 7px; border: 1px solid ${C.rule2}; font-size: 11.5px; line-height: 1.6; letter-spacing: 0.04em; color: ${C.sub}; white-space: nowrap;`,
  card: `background: ${C.bg2}; border: 1px solid ${C.rule2};`,
  lab: `font-size: 12px; letter-spacing: 0.1em; color: ${C.cap};`
};
const WIDE = s => `<sc-if value="{{ isWide }}" hint-placeholder-val="{{ true }}">${s}</sc-if>`;
const NARROW = s => `<sc-if value="{{ isNarrow }}" hint-placeholder-val="{{ false }}">${s}</sc-if>`;
const CL = D[2][0].map(r => ({ n: r.clip, no: r.platform_no, title: r.title, s: tS(r.start), e: tS(r.end), min: r.minutes, start: r.start, end: r.end }));
const clipOf = t => CL.find(c => t >= c.s && t < c.e) || CL[CL.length - 1];
const ACC = { E: C.ind, F: C.meth, G: C.meth, H: C.meth, I: C.meth, J: 'both', K: C.self, L: C.self, M: C.self, N: C.self, O: 'both', P: 'both', Q: C.ppl, S: C.ind };
const PLATE = { E: '0:08:40', F: '0:33:56', G: '0:54:52', H: '1:00:48', I: '1:10:38', J: '1:29:14', K: '2:22:20', L: '3:09:03', M: '4:26:14', N: '5:15:36', O: '3:46:24', P: '6:13:55', Q: '6:53:27', S: '7:32:15' };
function letterBox(L) {
  const a = ACC[L]; let st = `border: 1.5px solid ${C.rule3}; color: ${C.fg};`;
  if (a === 'both') st = `background: ${BOTH}; color: ${C.bg}; border: 1.5px solid ${C.bg};`;
  else if (a) st = `background: ${a}; color: ${inkOn(a)}; border: 1.5px solid ${a};`;
  return `<span style="flex: none; width: 46px; height: 46px; box-sizing: border-box; ${st} display: flex; align-items: center; justify-content: center; font-family: ${F.mono}; font-size: 22px; font-weight: 600;">${a === 'both' ? `<span style="background: ${C.bg}; color: ${C.fg}; padding: 0 4px; line-height: 1.2;">${L}</span>` : L}</span>`;
}
const ct2 = t => { const c = clipOf(t), d = t - c.s; return { c, txt: `${Math.floor(d / 60)}:${String(d % 60).padStart(2, '0')}` }; };
function plate(full) {
  const { c, txt } = ct2(tS(full));
  return `<span title="从这里开始听" style="flex: none; display: inline-flex; flex-direction: column; align-items: center; padding: 5px 12px 6px; margin-bottom: 4px; background: ${C.bar}; border-top: 4px solid ${C.bar}; border-bottom: 4px solid ${C.bar}; box-shadow: inset 0 0 0 1px ${C.rule2}; line-height: 1.1;"><span style="font-family: ${F.serif}; font-size: 15px; font-weight: 700; color: ${C.fg};">第 ${+c.n} 段 ${txt}</span><span style="margin-top: 3px; font-family: ${F.mono}; font-size: 11px; color: ${C.cap};">全片 ${full}</span></span>`;
}
function head(L, title, q) {
  return `<div style="display: flex; flex-wrap: wrap; align-items: flex-end; gap: 12px 22px; padding-bottom: 16px; border-bottom: 1px solid ${C.rule3};">${letterBox(L)}<h2 style="${S.h2}">${title}</h2>${PLATE[L] ? plate(PLATE[L]) : ''}<span style="margin-left: auto; padding-bottom: 6px; font-size: 15px; color: ${C.sub};">${q}</span></div>`;
}
const secOpen = (id, L, title) => `<section id="${id}" data-screen-label="${L} ${title}" style="padding: clamp(56px, 7vw, 96px) ${PAD} clamp(56px, 7vw, 88px); border-top: 18px solid ${C.bar};">`;
function sub(title, note) { return `<div style="display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 16px; padding-bottom: 10px; border-bottom: 1px solid ${C.rule2};"><h3 style="${S.h3}">${title}</h3>${note ? `<span style="font-size: 13px; color: ${C.cap};">${note}</span>` : ''}</div>`; }
function quote(text, whoS, size = 21) {
  return `<figure style="margin: 0; padding: 16px 0 0; border-top: 1px solid ${C.rule2};"><blockquote style="margin: 0; font-family: ${F.serif}; font-size: ${size}px; font-weight: 600; line-height: 1.6; color: ${C.fg}; text-wrap: pretty;">“${esc(text)}”</blockquote><figcaption style="margin-top: 8px; font-size: 13px; color: ${C.cap};">—— ${esc(whoS)}</figcaption></figure>`;
}
const subtitleCard = (text, whoS, glow = false, size = 'clamp(22px, 2.6vw, 32px)') => `<div style="padding: 22px 26px; background: ${C.bar}; border-top: 10px solid #000; border-bottom: 10px solid #000; text-align: center;"><div style="font-family: ${F.serif}; font-size: ${size}; font-weight: 700; line-height: 1.6; letter-spacing: 0.04em; ${glow ? GLOWTXT : `color: ${C.fg};`} text-wrap: balance;">${esc(text)}</div>${whoS ? `<div style="margin-top: 10px; font-size: 13px; color: ${C.cap};">${esc(whoS)}</div>` : ''}</div>`;
const cap = t => `<p style="${S.cap}">${t}</p>`;
const lab = (k, v) => `<div style="${S.body}"><span style="${S.lab}">${k}</span><br>${v}</div>`;
const arrowR = (c = C.fg) => `<span aria-hidden="true" style="flex: none; align-self: center; width: 22px; height: 12px; background: ${c}; clip-path: polygon(0 42%, 64% 42%, 64% 0, 100% 50%, 64% 100%, 64% 58%, 0 58%);"></span>`;
const arrowD = (c = C.fg) => `<span aria-hidden="true" style="display: block; margin: 0 auto; width: 12px; height: 20px; background: ${c}; clip-path: polygon(42% 0, 58% 0, 58% 64%, 100% 64%, 50% 100%, 0 64%, 42% 64%);"></span>`;
const box = (t, extra = '') => `<div style="padding: 12px 14px; ${S.card} font-size: 14.5px; line-height: 1.65; color: ${C.fg2}; ${extra}">${t}</div>`;
const tbl = (cols, rows, widths, hl = []) => `<div style="margin-top: 14px; overflow-x: auto;"><div style="min-width: ${cols.length * 160}px; display: grid; grid-template-columns: ${widths}; border-top: 1px solid ${C.rule3};">${cols.map((c, i) => `<div style="padding: 9px 12px; border-bottom: 1px solid ${C.rule2}; font-size: 12.5px; letter-spacing: 0.08em; ${hl[i] ? `color: ${hl[i] === C.ind || hl[i] === C.ppl ? C.fg : hl[i]}; font-weight: 700; box-shadow: inset 0 3px 0 ${hl[i]};` : `color: ${C.cap};`}">${c}</div>`).join('')}${rows.map(r => r.map((v, i) => `<div style="padding: 10px 12px; border-bottom: 1px solid ${C.rule}; font-size: ${i ? 14.5 : 13.5}px; line-height: 1.65; ${i ? `color: ${C.fg2};` : `color: ${C.sub}; font-family: ${F.serif}; font-weight: 700;`}">${v}</div>`).join('')).join('')}</div></div>`;
const divider = (label, sub2) => `<div aria-hidden="true" style="padding: clamp(64px, 8vw, 104px) ${PAD} clamp(56px, 7vw, 88px); border-top: 18px solid ${C.bar}; background: radial-gradient(ellipse 40% 90% at 50% 0%, rgba(255,244,214,0.07), transparent 70%);"><div style="display: flex; align-items: center; gap: 18px;"><span style="flex: 1; height: 1px; background: ${C.rule2};"></span><span style="width: 141px; height: 60px; box-sizing: border-box; border-top: 8px solid ${C.bar}; border-bottom: 8px solid ${C.bar}; background: ${C.bg3}; box-shadow: 0 0 0 1px ${C.rule2}; position: relative;"><span style="position: absolute; left: 30%; top: 50%; width: 7px; height: 7px; margin-top: -3px; border-radius: 50%; background: ${C.self};"></span><span style="position: absolute; left: 66%; top: 40%; width: 7px; height: 7px; border-radius: 50%; background: ${C.aud};"></span></span><span style="flex: 1; height: 1px; background: ${C.rule2};"></span></div><div style="margin-top: 16px; text-align: center; font-family: ${F.serif}; font-size: 20px; font-weight: 700; letter-spacing: 0.16em;">${label}</div><div style="margin-top: 6px; text-align: center; font-size: 13px; color: ${C.cap};">${sub2}</div></div>`;
const tag = (t, k = 'prog') => `<span style="display: inline-block; flex: none; padding: 0 6px; font-size: 11px; line-height: 1.7; letter-spacing: 0.04em; white-space: nowrap; ${k === 'rep' ? `background: ${C.fg}; color: ${C.bg};` : k === 'org' ? `border: 1px dashed ${C.rule3}; color: ${C.sub};` : `border: 1px solid ${C.rule3}; color: ${C.sub};`}">${t}</span>`;

const HAVE = new Set((await ls('assets/yh05')).map(f => f.split('/').pop().replace(/\.jpg$/, '')));
const slotUse = {};
function slot(k, label, shape, fit) { const id = 'yh05-' + k; slotUse[id] = (slotUse[id] || 0) + 1; const sid = slotUse[id] > 1 ? id + '-' + slotUse[id] : id; return `<image-slot id="${sid}" ${HAVE.has(k) ? `src="assets/yh05/${k}.jpg"` : ''} shape="${shape}" ${fit ? `fit="${fit}"` : ''} placeholder="${esc(label)}"></image-slot>`; }
const poster = (k, title, w, extra = '') => `<div style="flex: none; position: relative; width: ${w}px; aspect-ratio: 2 / 3; background: ${C.bg3}; box-shadow: 0 0 0 1px ${C.rule2}; ${extra}">${slot('f-' + k, title, 'rect')}</div>`;
const photo = (k, name, w, h, extra = '') => `<div style="flex: none; position: relative; width: ${w}px; height: ${h}px; background: ${C.bg3}; box-shadow: 0 0 0 1px ${C.rule2}; ${w === h ? 'border-radius: 50%; overflow: hidden;' : ''} ${extra}">${slot('p-' + k, name, w === h ? 'circle' : 'rect')}</div>`;
const posterRow = (items, w = 96) => `<div style="margin-top: 22px; overflow-x: auto; padding-bottom: 6px;"><div style="display: flex; gap: 12px; width: max-content;">${items.map(([k, t, s2]) => `<figure style="margin: 0; width: ${w}px;">${poster(k, t, w)}<figcaption style="margin-top: 6px; font-size: 12px; line-height: 1.45; color: ${C.sub};"><span style="font-family: ${F.serif}; font-weight: 700; color: ${C.fg};">${esc(t)}</span>${s2 ? `<br>${esc(s2)}` : ''}</figcaption></figure>`).join('')}</div></div>`;
// ===== A cover
function cover() {
  const toc = [['map', 'B', '节目地图'], ['relay', 'C', '话题接力'], ['stars', 'D', '作品星图'], ['money', 'E', '谁出钱'], ['method', 'F', '大脑、拍板与执笔'], ['tracks', 'G', '两条轨'], ['machine', 'H', '命运机器'], ['turn', 'I', '转身'], ['early', 'J', '困局中找出路'], ['fulltime', 'K', '风格的起点'], ['ptu', 'L', '一个晚上'], ['election', 'M', '黑帮片的终点'], ['mad', 'N', '开天眼'], ['chance', 'O', '偶然与必然'], ['north', 'P', '北上'], ['people', 'Q', '人与演员'], ['debate', 'R', '他们在哪里读法不同'], ['coda', 'S', '未完成'], ['mentions', 'T', '谁被提得最多']];
  const meta = [['节目', '《电影巨辩》'], ['专辑', '付费专辑《为了华语电影》'], ['本集', '第 5 集《银河映像与杜琪峰》'], ['主持', '老马（magasa）、阿吴（LOOK）'], ['录制', '2025 年初，开头祝听众蛇年快乐'], ['时长', mono('7:48:34')], ['分段', '平台上切成 13 段（序号 46–58），内容是一期'], ['作品', '四十多部，1996–2023']];
  const terms = [['双轨制', '节目对银河类型策略的概括。杜琪峰的说法是“一种满足自己，一种满足观众”：前者多是风格强烈的犯罪片，后者多是爱情喜剧。'], ['承制', '受投资方委托拍片，拿固定的制作费，不承担票房盈亏。'], ['监制', '华语电影里常比导演更有决定权的职位，好莱坞没有精确对应的职位。'], ['接龙', '节目对银河编剧方式的叫法：先写一个开头，拍出来看效果，再往下写。'], ['飞纸仔', '香港片场的说法，指当天才发到手的剧本页。'], ['站位', '杜琪峰电影里多人静止对峙的构图。'], ['枪战片', '录像厅时代小黑板上的类型叫法，节目借来形容杜琪峰的一部分作品。'], ['话事人', '香港社团的首领。'], ['北上', '香港电影人到内地发展。'], ['九七', '1997 年香港回归。节目里的“九七情结”“回归恐惧症”指这一前后的社会情绪。'], ['心智游戏电影', '需要观众跟着解谜、重构时间和视点的电影。']];
  const people = [[18, 60, C.self, 200], [33, 44, C.aud, 340], [47, 66, C.self, 160], [58, 40, C.self, 20], [72, 62, C.aud, 250], [87, 46, C.aud, 110]];
  const fig = people.map(([x, y, c, a], i) => `<span style="position: absolute; left: ${x}%; top: ${y}%; width: 0; height: 0;">${i === 3 ? `<span style="position: absolute; left: -26px; bottom: 6px; width: 52px; height: 150px; background: linear-gradient(180deg, rgba(255,244,214,0) 0%, rgba(255,244,214,0.22) 100%); clip-path: polygon(42% 0, 58% 0, 100% 100%, 0 100%);"></span>` : ''}<span style="position: absolute; left: -22px; top: 6px; width: 44px; height: 8px; border-radius: 50%; background: rgba(0,0,0,0.55);"></span><span style="position: absolute; left: 0; top: 0; width: 26px; height: 1.5px; background: ${rgba(c, 0.7)}; transform-origin: 0 50%; transform: rotate(${a}deg);"></span><span style="position: absolute; left: -7px; top: -7px; width: 14px; height: 14px; border-radius: 50%; background: ${c}; ${i === 3 ? `box-shadow: 0 -4px 14px 2px rgba(255,244,214,0.45);` : ''}"></span></span>`).join('');
  const frame = `<div style="margin-top: clamp(36px, 5vw, 56px);"><div style="background: #000; padding: clamp(14px, 2vw, 26px) 0;"><div style="position: relative; aspect-ratio: 2.35 / 1; overflow: hidden; background: radial-gradient(ellipse 60% 70% at 58% 30%, rgba(255,244,214,0.06), transparent 70%), linear-gradient(180deg, #0F1215 0%, #15191D 62%, #101316 100%);">${slot('still-cover', '拖入一张银河电影的剧照（宽银幕 2.35:1）', 'rect')}<div style="position: absolute; left: 0; right: 0; bottom: 0; height: 40%; background: linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,0.7)); pointer-events: none;"></div><div style="position: absolute; left: 0; right: 0; bottom: 7%; pointer-events: none; text-align: center; padding: 0 6%; font-family: ${F.serif}; font-weight: 700; font-size: clamp(16px, 2.4vw, 34px); line-height: 1.5; letter-spacing: 0.06em; ${GLOWTXT}">如果没有他们，香港电影史将会苍白很多。</div><span style="position: absolute; right: 14px; top: 10px; pointer-events: none; font-family: ${F.mono}; font-size: 11px; color: ${C.cap};">2.35 : 1</span></div></div><div style="margin-top: 12px; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 6px 20px; font-size: 13.5px; color: ${C.sub};"><span>1996–2023 · 四十多部电影 · 一家只挣制作费的公司</span><span style="color: ${C.cap};">字幕：一位主持人，节目的结语</span></div></div>`;
  const archive = `<div style="flex: 0 1 380px; min-width: 0; background: ${C.bg2}; border-top: 8px solid ${C.bar}; border-bottom: 8px solid ${C.bar}; box-shadow: 0 0 0 1px ${C.rule2};"><div style="display: flex; justify-content: space-between; align-items: center; height: 44px; padding: 0 20px; font-size: 12px; letter-spacing: 0.22em; white-space: nowrap; color: ${C.sub}; border-bottom: 1px solid ${C.rule2};"><span>节目档案</span><span style="font-family: ${F.mono}; letter-spacing: 0.06em;">No. 05</span></div><div style="position: relative; aspect-ratio: 330 / 186; background: #000; border-bottom: 1px solid ${C.rule2};">${slot('logo', '银河映像的标志', 'rect', 'contain')}</div><div style="padding: 14px 20px; border-bottom: 1px solid ${C.rule}; display: flex; align-items: center; gap: 16px;">${photo('to', '杜琪峰', 72, 90)}<div><div style="font-family: ${F.serif}; font-size: 24px; font-weight: 900; line-height: 1.3;">杜琪峰</div><div style="margin-top: 4px; font-size: 13px; line-height: 1.6; color: ${C.cap};">银河映像的老板、导演、监制</div></div></div>${meta.map(([k, v]) => `<div style="display: grid; grid-template-columns: 52px minmax(0, 1fr); gap: 12px; padding: 8px 20px; border-bottom: 1px solid ${C.rule}; font-size: 14px; line-height: 1.65;"><span style="color: ${C.cap};">${k}</span><span style="color: ${C.fg2};">${v}</span></div>`).join('')}<div style="padding: 12px 20px 16px;"><div style="display: flex; gap: 2px;">${CL.map(c => `<span title="${esc('第 ' + c.n + ' 段 · 平台序号 ' + c.no + ' · ' + c.min + ' 分钟')}" style="flex: ${c.min} 1 0; min-width: 0; height: 18px; box-sizing: border-box; border-top: 4px solid ${C.bar}; border-bottom: 4px solid ${C.bar}; background: ${C.bg3}; box-shadow: 0 0 0 1px ${C.rule2};"></span>`).join('')}</div><div style="margin-top: 8px; font-size: 12px; color: ${C.cap};">13 段，宽度按时长</div></div></div>`;
  const top = `<div style="padding: clamp(22px, 3vw, 36px) ${PAD} clamp(40px, 5vw, 60px);">
${seriesNav({ color: C.cap })}
<div style="margin-top: clamp(36px, 5vw, 64px); display: flex; flex-wrap: wrap; gap: 44px 56px; align-items: flex-start;">
<div style="flex: 1 1 600px; min-width: 0;">
<div style="display: flex; align-items: center; gap: 14px; font-family: ${F.serif}; font-size: 18px; font-weight: 600; letter-spacing: 0.24em; color: ${C.sub};">为了华语电影<span style="font-family: ${F.mono}; font-size: 15px; letter-spacing: 0.04em; border: 1.5px solid ${C.rule3}; padding: 2px 8px 1px; color: ${C.fg};">05</span></div>
<h1 style="margin: 22px 0 0; font-family: ${F.serif}; font-weight: 900; font-size: clamp(52px, 8.4vw, 124px); line-height: 1.08; letter-spacing: 0.04em; color: ${C.fg};">银河映像<br>与杜琪峰</h1>
<div style="margin-top: 22px; font-size: 17px; line-height: 1.7; color: ${C.sub};">电影巨辩《为了华语电影》第 5 集 · 7 小时 48 分 · 老马 × 阿吴</div>
</div>
${archive}
</div>
${frame}
</div>`;
  const legend = [[C.self, '满足自己的一条轨：风格强烈的犯罪片'], [C.aud, '满足观众的一条轨：爱情喜剧、商业片'], ['both', '两轨之间'], [C.none, '银河之前或不属于任何一轨'], [C.ind, '公司史与产业'], [C.meth, '方法论'], [C.ppl, '人物与演员']];
  const paper = `<div style="padding: clamp(40px, 5vw, 64px) ${PAD} clamp(44px, 5vw, 64px); border-top: 18px solid ${C.bar};">
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr)); gap: 32px 64px; align-items: start;">
<p style="margin: 0; font-size: 17.5px; line-height: 1.95; color: ${C.fg2}; text-wrap: pretty;">节目认为杜琪峰的第一身份是公司老板，所以要讲银河，不只讲杜琪峰。这家公司自己不出钱，只挣制作费，三十年里金主一任接一任，杜琪峰两次把它买回来。它的创作是集体的、接龙式的：韦家辉出命运和斗智，杜琪峰出江湖情义和对现实的观察，游乃海在中间执笔。类型上是“双轨制”，一条轨满足自己，一条轨满足观众。节目认为最好的作品集中在 1998 到 2009 年，北上之后只有《毒战》算成功。</p>
<div style="display: grid; gap: 26px;">${quote('杜琪峰的第一身份是公司老板。', '节目，平台标题', 22)}${quote('银河映像是杜琪峰一生心血之所在。', '节目', 22)}${quote('他最讨厌听到的一句话，就是说香港电影死了。', '节目转述杜琪峰', 18)}</div>
</div>
<div style="margin-top: 52px;">${sub('先认几个词', '节目里反复出现')}<div style="margin-top: 6px; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr)); column-gap: 32px;">${terms.map(([k, v]) => `<div style="display: grid; grid-template-columns: 104px minmax(0, 1fr); gap: 12px; padding: 12px 0; border-bottom: 1px solid ${C.rule};"><span style="font-family: ${F.serif}; font-size: 16px; font-weight: 700; line-height: 1.5;">${k}</span><span style="font-size: 14px; line-height: 1.7; color: ${C.fg2}; text-wrap: pretty;">${v}</span></div>`).join('')}</div></div>
<div style="margin-top: 32px; display: flex; flex-wrap: wrap; align-items: center; gap: 10px 22px; font-size: 13px; color: ${C.cap};"><span>颜色全页一致：</span>${legend.map(([c, n]) => `<span style="display: inline-flex; align-items: center; gap: 7px; color: ${C.fg2};">${sw(c, 18, 12)}${n}</span>`).join('')}<span style="display: inline-flex; align-items: center; gap: 7px; color: ${C.fg2};"><span style="width: 18px; height: 12px; background: ${C.glow}; box-shadow: 0 0 10px 2px rgba(255,244,214,0.5);"></span>顶光白：每个模块最多一处</span></div>
<div style="margin-top: 12px; display: flex; flex-wrap: wrap; align-items: center; gap: 10px 22px; font-size: 13px; color: ${C.cap};"><span>形状表示导演：</span><span style="display: inline-flex; align-items: center; gap: 7px; color: ${C.fg2};">${shape('to', 11)}杜琪峰单独导演</span><span style="display: inline-flex; align-items: center; gap: 7px; color: ${C.fg2};">${shape('to_wai', 11)}杜琪峰、韦家辉联合导演</span><span style="display: inline-flex; align-items: center; gap: 7px; color: ${C.fg2};">${shape('other', 11)}其他导演（游达志署名、韦家辉、郑保瑞、罗永昌、游乃海、赵崇基等）</span></div>
<nav style="margin-top: 36px; display: flex; flex-wrap: wrap; gap: 8px;">${toc.map(([id, l, t]) => `<a href="#${id}" style="display: inline-flex; align-items: baseline; gap: 8px; padding: 7px 12px 6px; border: 1px solid ${C.rule2}; background: ${C.bg2}; color: ${C.fg}; font-size: 14px;" style-hover="border-color: ${C.fg}; color: ${C.fg};"><span style="font-family: ${F.mono}; font-weight: 600; font-size: 13px; color: ${C.cap};">${l}</span>${t}</a>`).join('')}</nav>
</div>`;
  return `<header id="cover" data-screen-label="A 封面" style="border-top: 18px solid ${C.bar};">${top}${paper}</header>`;
}

// ===== B + C
const SHORT = { b00: '开场', b01: '公司史一', b02: '公司史二', b03: '集体创作', b04: '接龙', b05: '双轨', b06: '主题', b07: '转变', b08: '吴宇森', b09: '署名', b10: '字头', b11: '两个', b12: '判决', b13: '暗花', b14: '非常突然', b15: '真心英雄', b16: '暗战', b17: '枪火', b18: '甜言', b19: '刘郑', b20: '辣手', b21: '左眼', b22: '暗战2', b23: 'PTU', b24: '大只佬', b25: '大事件', b26: '柔道', b27: '龙凤', b28: '黑社会一', b29: '二', b30: '黑社会三', b31: '放逐', b32: '跟踪', b33: '变幻', b34: '神探', b35: '蝶', b36: '文雀', b37: '复仇', b38: '意外', b39: '夺命金', b40: '车', b41: '单身', b42: '毒战', b43: '盲探', b44: '树大招风', b45: '三部', b46: '命案', b47: '人物', b48: '幕后', b49: '演员', b50: '总结' };
const SECW = { b09: 'w00', b10: 'w04', b11: 'w05', b12: 'w06', b13: 'w08', b14: 'w09', b15: 'w10', b16: 'w11', b17: 'w12', b18: 'w13', b19: 'w15', b20: 'w16', b21: 'w19', b22: 'w18', b23: 'w21', b24: 'w22', b25: 'w23', b26: 'w24', b27: 'w25', b28: 'w26', b29: 'w27', b30: 'w26', b31: 'w28', b32: 'w29', b33: 'w30', b34: 'w31', b35: 'w32', b36: 'w33', b37: 'w34', b38: 'w35', b39: 'w37', b40: 'w38', b41: 'w36', b42: 'w39', b43: 'w40', b44: 'w43', b45: 'w41', b46: 'w45' };
const WMAP = Object.fromEntries(D[5][0].map(w => [w.id, w]));
const CATC = { industry: C.ind, method: C.meth, people: C.ppl, end: C.ind };
const SEC = {}; D[1][0].forEach(r => { const w = WMAP[SECW[r.id]]; SEC[r.id] = { id: r.id, name: r.section, s: tS(r.start), e: tS(r.end), start: r.start, min: r.minutes, share: r.share_pct, cat: r.category, c: CATC[r.category] || TRK[w.track] }; });
const SECS = Object.values(SEC);
const tickCol = s => s.c === 'both' ? C.self : s.c;
const ST = D[3][0].map(r => ({ t: tS(r.time), time: r.time, clip: r.clip, ct: r.clip_time, label: r.label, sec: r.section, level: +r.level }));
const N1 = ST.filter(s => s.level === 1).length, NST = ST.length;
const GROUPS = [{ k: 'industry', name: '产业与资本', c: C.ind }, { k: 'create', name: '创作与编剧', c: '#CFC8B4' }, { k: 'narr', name: '叙事与斗智', c: '#A7A193' }, { k: 'fate', name: '命运与因果', c: '#BDB5A0' }, { k: 'form', name: '形式与调度', c: '#958F82' }, { k: 'jianghu', name: '江湖与义气', c: C.self }, { k: 'power', name: '警察、权力与政治', c: '#B0A99A' }, { k: 'hk', name: '香港与九七', c: '#86817A' }, { k: 'actor', name: '演员与明星', c: '#8E7E9C' }];
const BINS = D[4][0].map((r, i, a) => ({ s: tS(r.bin_start), e: i === a.length - 1 ? T : tS(r.bin_end), a: r.bin_start, b: r.bin_end, v: Object.fromEntries(GROUPS.map(g => [g.k, +r[g.k + '_per1k']])) }));
const PEAKS = {
  industry: [['0:10', '公司史：上市、分家、买回', 1, 'L'], ['7:30', '总结：产业崩盘与习作', 0, 'R']],
  create: [['0:40', '接龙与即兴', 1, 'L']],
  narr: [['1:00', '斗智、重复与含蓄', 1, 'L'], ['2:30', '《枪火》的做局', 0, 'L']],
  fate: [['3:50', '《大只佬》的因果法则', 1, 'R'], ['5:50', '《意外》', 0, 'L']],
  form: [['4:00', '《大事件》的七分钟长镜头', 1, 'R'], ['5:30', '《神探》的视点', 0, 'L']],
  jianghu: [['4:30', '《黑社会》的类型谱系，全片最高的一格', 1, 'L']],
  power: [['4:40', '《以和为贵》', 1, 'L'], ['3:10', '《PTU》的沉默蓝墙', 0, 'R']],
  hk: [['6:10', '北上与《毒战》', 1, 'R'], ['0:20', '北上海润', 0, null], ['1:40', '《恐怖鸡》', 0, null], ['5:40', '《文雀》', 0, null], ['6:30', '《树大招风》', 0, null]],
  actor: [['7:10', '逐个讲演员', 1, 'R'], ['0:50', '“角色去贴演员”', 0, 'L']]
};
const KW = '产业与资本：投资、老板、股东、股份、股权、上市、资金、票房、市场、产业、成本、片酬、发行、出品、版权、融资、赚钱、商业；创作与编剧：剧本、编剧、即兴、接龙、头脑风暴、集体创作、创作组、构思、桥段、高概念、概念；命运与因果：命运、宿命、因果、偶然、必然、意外、天意、无常、轮回、佛、上帝、命理；江湖与义气：江湖、义气、兄弟、情义、黑帮、黑社会、三合会、帮会、社团、武侠；警察、权力与政治：警察、警方、警队、体制、制度、权力、政治、审查、官方、官僚、法律、法治、规训、选举、招安、洗白；形式与调度：镜头、调度、构图、剪辑、站位、慢镜头、摄影、音效、配乐、声音、灯光、顶光、明暗、逆光、视点、宽银幕、画面、色彩；叙事与斗智：斗智、做局、诡计、悬念、重复、误导、反转、线索、叙事、结构、伏笔、误会、解谜、烧脑；演员与明星：演员、表演、演技、明星、选角、CP、偶像、片酬；香港与九七：九七、97、回归、大陆、内地、北上、本土、殖民、中英、香港人。“意外”“黑社会”既是片名也是普通词，都计入了密度。';
const HMAX = 27.22;
const heatA = v => v <= 0 ? 0 : 0.07 + 0.93 * Math.pow(Math.min(v, HMAX) / HMAX, 0.7);
const TW = 1152;
const heatGrad = (g, deg, sc) => `linear-gradient(${deg}deg, ${BINS.map(b => { const x0 = f1(sc(b.s)), x1 = f1(sc(b.e) - 1), x2 = f1(sc(b.e)); const al = heatA(b.v[g.k]); return `${al ? rgba(g.c, al) : 'transparent'} ${x0}px ${x1}px, transparent ${x1}px ${x2}px`; }).join(', ')})`;
const G2 = 'display: grid; grid-template-columns: 128px 1152px; column-gap: 16px;';
const xT = t => t / T * TW;
function cHead() {
  const relay = GROUPS.map(g => `<span style="display: inline-flex; align-items: center; gap: 7px; padding: 5px 10px; border: 1px solid ${C.rule2}; background: ${C.bg2}; font-size: 13.5px;">${sw(g.c, 9, 9)}${g.name}<span style="font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${PEAKS[g.k][0][0]}</span></span>`).join(`<span style="color: ${C.faint};">→</span>`);
  return `<div style="display: flex; flex-wrap: wrap; align-items: flex-end; gap: 12px 18px; padding-bottom: 14px; border-bottom: 1px solid ${C.rule3};"><span style="flex: none; width: 38px; height: 38px; box-sizing: border-box; border: 1.5px solid ${C.rule3}; display: flex; align-items: center; justify-content: center; font-family: ${F.mono}; font-size: 18px; font-weight: 600;">C</span><h3 id="relay" style="margin: 0; font-family: ${F.serif}; font-weight: 700; font-size: clamp(26px, 2.8vw, 34px);">话题接力</h3><span style="margin-left: auto; padding-bottom: 4px; font-size: 15px; color: ${C.sub};">每段时间在聊什么</span></div>
<div style="margin-top: 18px; font-family: ${F.serif}; font-size: clamp(19px, 2vw, 23px); font-weight: 600; line-height: 1.6; text-wrap: pretty;">第一个小时谈钱和方法，中间六个小时逐部谈片，命运、江湖和权力轮流登场，最后一个小时谈人。</div>
<div style="margin-top: 14px; display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px;"><span style="font-size: 12.5px; color: ${C.cap};">九组按主峰出现的先后排列</span>${relay}</div>`;
}
function axisRow() {
  let a = '';
  for (let m = 0; m <= 450; m += 30) a += `<div style="position: absolute; left: ${f1(xT(m * 60))}px; top: 0; width: 1px; height: 6px; background: ${C.rule2};"></div><div style="position: absolute; left: ${f1(xT(m * 60))}px; top: 9px; ${m ? 'transform: translateX(-50%);' : ''} font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${fmtHM(m)}</div>`;
  a += `<div style="position: absolute; right: 0; top: 0; width: 1px; height: 6px; background: ${C.rule2};"></div><div style="position: absolute; right: 0; top: 24px; font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">7:48</div>`;
  return `<div style="position: relative; height: 42px; border-top: 1px solid ${C.rule2};">${a}</div>`;
}
const secTxt = s => s.c === 'both' ? `background: ${C.bg}; color: ${C.fg}; padding: 1px 4px; display: inline-block;` : `color: ${inkOn(s.c)};`;
function bcDesktop() {
  const L1 = ST.filter(s => s.level === 1), L2 = ST.filter(s => s.level === 2);
  const ttl = s => esc(s.time + ' · 第 ' + s.clip + ' 段 ' + s.ct + ' · ' + s.label + '（' + SEC[s.sec].name + '）');
  const lanes = [], pos = [];
  const fits = (k, l, r) => !(lanes[k] || []).some(([p, q]) => l < q + 4 && r + 4 > p);
  L1.forEach(s => { const x = xT(s.t), w = Math.ceil(estW(s.label, 11.5) + 20); const opts = [[x, x + w, true], [x - w, x, false]].filter(([l, r]) => l >= 0 && r <= TW); let k = 0, pick = null; while (!pick) { for (const o of opts) if (fits(k, o[0], o[1])) { pick = o; break; } if (!pick) k++; } (lanes[k] = lanes[k] || []).push([pick[0], pick[1]]); pos.push({ s, x, w, left: pick[0], k, la: pick[2] }); });
  const NL = lanes.length, LH = 22, BASE = 18, H = NL * LH + BASE + 2;
  let leads = '', tags = '', ticks = '';
  pos.forEach(p => {
    const b = BASE + p.k * LH, sec = SEC[p.s.sec];
    leads += `<div style="position: absolute; left: ${f1(p.x)}px; bottom: 0; width: 1px; height: ${b}px; background: ${C.rule2};"></div>`;
    tags += `<div title="${ttl(p.s)}" style="position: absolute; left: ${f1(p.left)}px; bottom: ${b}px; height: 19px; box-sizing: border-box; border: 1px solid ${C.rule3}; ${p.la ? 'border-left' : 'border-right'}: 5px solid ${tickCol(sec)}; background: ${C.bg2}; padding: 0 5px; font-size: 11.5px; line-height: 17px; white-space: nowrap;">${esc(p.s.label)}</div>`;
  });
  L2.forEach(s => { ticks += `<div title="${ttl(s)}" style="position: absolute; left: ${f1(xT(s.t) - 4.5)}px; bottom: 0; width: 9px; height: 15px; display: flex; justify-content: center; align-items: flex-end; cursor: help;"><span style="width: 1.5px; height: 9px; background: ${tickCol(SEC[s.sec])};"></span></div>`; });
  let clips = '';
  CL.forEach(c => { const l = xT(c.s), w = xT(c.e - c.s); clips += `<div title="${esc('第 ' + c.n + ' 段 · 平台序号 ' + c.no + ' · ' + c.start + '–' + c.end + ' · ' + c.min + ' 分钟 · ' + c.title)}" style="position: absolute; top: 0; bottom: 0; left: ${f1(l)}px; width: ${f1(w)}px; padding: 0 1px; box-sizing: border-box; cursor: help;"><div style="height: 100%; box-sizing: border-box; border-top: 7px solid ${C.bar}; border-bottom: 7px solid ${C.bar}; background: ${C.bg3}; box-shadow: inset 0 0 0 1px ${C.rule2}; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px;" style-hover="background: #2A2F36;"><span style="font-family: ${F.mono}; font-size: 15px; font-weight: 600; line-height: 1;">${+c.n}</span><span style="font-size: 10.5px; line-height: 1.1; color: ${C.cap}; white-space: nowrap;">平台 ${c.no}${w > 96 ? ' · ' + c.min + '′' : ''}</span></div></div>`; });
  let bands = '';
  SECS.forEach(s => {
    const l = xT(s.s), w = xT(s.e - s.s), nm = SHORT[s.id];
    bands += `<div title="${esc(s.name + ' · ' + s.start + ' 起 · ' + s.min + ' 分钟 · ' + s.share + '%')}" style="position: absolute; top: 0; bottom: 0; left: ${f1(l)}px; width: ${f1(w)}px; padding-right: 1.5px; box-sizing: border-box;"><div style="height: 100%; box-sizing: border-box; ${bgOf(s.c)} padding: 6px 3px; overflow: hidden;">${w >= nm.length * 12 + 8 ? `<div style="font-family: ${F.serif}; font-size: 12px; font-weight: 700; line-height: 1.3; white-space: nowrap; ${secTxt(s)}">${esc(nm)}</div>` : ''}${w >= 34 ? `<div style="margin-top: 4px; font-family: ${F.mono}; font-size: 10.5px; white-space: nowrap; ${secTxt(s)}">${w >= 90 ? s.min + '′ · ' + s.share + '%' : Math.round(s.min) + '′'}</div>` : ''}</div></div>`;
  });
  const pk0 = xT(tS('3:09:03')), pk1 = xT(tS('5:05:03'));
  const bracket = `<div style="position: absolute; left: ${f1(pk0)}px; width: ${f1(pk1 - pk0)}px; top: 4px; height: 10px; box-sizing: border-box; border: 1.5px solid ${C.fg}; border-top: none;"></div><div style="position: absolute; left: ${f1((pk0 + pk1) / 2)}px; top: 18px; transform: translateX(-50%); white-space: nowrap; font-family: ${F.serif}; font-size: 14px; font-weight: 700;">巅峰期，近两个小时 <span style="font-family: ${F.mono}; font-size: 11.5px; font-weight: 400; color: ${C.cap};">3:09–5:05</span></div>`;
  const labC = (t, sb, al = 'center') => `<div style="display: flex; flex-direction: column; justify-content: ${al}; gap: 4px;"><span style="font-size: 13px; letter-spacing: 0.12em; color: ${C.fg2};">${t}</span>${sb ? `<span style="font-size: 11.5px; line-height: 1.55; color: ${C.cap};">${sb}</span>` : ''}</div>`;
  const legend = [[C.ind, '公司史与产业'], [C.meth, '方法论'], [C.self, '满足自己的作品'], [C.aud, '满足观众的作品'], ['both', '两轨之间'], [C.none, '银河之前'], [C.ppl, '人物与演员']].map(([c, n]) => `<span style="display: inline-flex; align-items: center; gap: 6px;">${sw(c, 14, 10)}${n}</span>`).join('');
  let crows = '';
  GROUPS.forEach(g => {
    const peak = Math.max(...BINS.map(b => b.v[g.k]));
    let cells = '', notes = '';
    cells += `<div style="position: absolute; inset: 0; background: ${heatGrad(g, 90, xT)};"></div>`;
    PEAKS[g.k].forEach(([st, note, kind, side]) => {
      const b = BINS.find(x => x.a === st), v = b.v[g.k];
      cells += `<div title="${esc(g.name + ' · ' + b.a + '–' + b.b + ' · ' + v + ' · ' + note)}" style="position: absolute; top: -2px; bottom: -2px; left: ${f1(xT(b.s))}px; width: ${f1(xT(b.e - b.s))}px; box-sizing: border-box; border: ${kind === 1 ? `2px solid ${C.fg}` : `1.5px dashed ${C.fg}`};"></div>`;
      if (side) notes += `<div style="position: absolute; ${side === 'R' ? `right: ${f1(TW - xT(b.e))}px` : `left: ${f1(xT(b.s))}px`}; bottom: 4px; display: flex; gap: 6px; align-items: baseline; white-space: nowrap; font-size: 12px; color: ${C.fg};"><span style="font-family: ${F.mono}; font-weight: 600;">${v.toFixed(1)}</span><span style="font-family: ${F.mono}; color: ${C.cap};">${b.a}–${b.b}</span><span>${note}</span></div>`;
    });
    crows += `<div style="${G2}"><div style="display: flex; align-items: center; gap: 8px; padding-top: 22px;">${sw(g.c, 10, 10)}<div><div style="font-family: ${F.serif}; font-size: 14px; font-weight: 600; line-height: 1.3;">${g.name}</div><div style="font-size: 11px; color: ${C.cap};">峰值 ${peak.toFixed(1)}</div></div></div><div style="position: relative; height: 56px;"><div style="position: absolute; left: 0; right: 0; top: 0; height: 22px;">${notes}</div><div style="position: absolute; left: 0; right: 0; top: 22px; bottom: 4px; background: rgba(236,230,216,0.035);">${cells}</div></div></div>`;
  });
  return `<div style="margin-top: 36px; overflow-x: auto; padding-bottom: 8px;"><div style="width: 1296px;">
<div style="${G2}">${labC('站点', `方框是 ${N1} 个主站，贴着时间轴的短刻度是 ${NST - N1} 个次站。悬停可看在第几段的几分几秒`, 'flex-end')}<div style="position: relative; height: ${H}px;">${leads}${ticks}${tags}</div></div>
<div style="${G2} margin-top: 6px;">${labC('平台 13 段', '格宽等于该段时长')}<div style="position: relative; height: 50px;">${clips}</div></div>
<div style="${G2} margin-top: 4px;">${labC('51 个板块', '按节目里的过渡句切分')}<div style="position: relative; height: 58px;">${bands}</div></div>
<div style="${G2}"><div></div><div style="position: relative; height: 42px;">${bracket}</div></div>
<div style="${G2} margin-top: 4px;"><div></div><div style="display: flex; flex-wrap: wrap; gap: 6px 18px; font-size: 12.5px; color: ${C.cap};">${legend}<span>讲作品的板块按该片的轨道着色，合讲几部时按第一部</span></div></div>
<div style="${G2} margin-top: 6px;"><div></div><div style="font-size: 12.5px; color: ${C.cap};">13 段各含的板块数：3、3、3、7、2、5、1、4、3、5、5、6、4。</div></div>
<div style="${G2} margin-top: 12px;"><div style="font-size: 12px; color: ${C.cap};">全片时间</div>${axisRow()}</div>
</div></div>
<div style="margin-top: 52px;">${cHead()}</div>
<div style="margin-top: 14px; overflow-x: auto; padding-bottom: 8px;"><div style="width: 1296px;">
<div>${crows}</div>
<div style="${G2} margin-top: 6px;"><div style="font-size: 12px; color: ${C.cap};">全片时间</div>${axisRow()}</div>
<div style="${G2} margin-top: 2px;"><div></div><div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px; font-size: 12px; color: ${C.cap};"><span style="font-family: ${F.mono};">0</span><span style="width: 160px; height: 10px; background: linear-gradient(90deg, rgba(236,230,216,0.07), ${C.fg});"></span><span style="font-family: ${F.mono};">27.2</span><span>每千字出现次数，九行同一色阶；实线框为各组的峰，虚线框为第二个峰（“香港与九七”有几格都在 5 左右，只框不注）</span></div></div>
</div></div>`;
}
function bcMobile() {
  const H = 1900, k = H / T;
  const X = { clip: 38, sec: 64, heat: 76, lead: 168, lab: 192 };
  let h = '';
  for (let m = 0; m <= 450; m += 30) { const y = m * 60 * k; h += `<div style="position: absolute; left: 0; top: ${f1(y)}px; transform: translateY(-50%); font-family: ${F.mono}; font-size: 11px; color: ${C.cap};">${fmtHM(m)}</div><div style="position: absolute; left: ${X.clip}px; width: ${X.lead - X.clip}px; top: ${f1(y)}px; height: 1px; background: ${C.rule};"></div>`; }
  CL.forEach(c => { const y = c.s * k, dy = (c.e - c.s) * k; h += `<div style="position: absolute; left: ${X.clip}px; width: 24px; top: ${f1(y)}px; height: ${f1(dy)}px; padding: 1px 0; box-sizing: border-box;"><div style="height: 100%; box-sizing: border-box; border: 1px solid ${C.rule3}; background: ${C.bg3}; display: flex; align-items: center; justify-content: center; font-family: ${F.mono}; font-size: 11px; font-weight: 600;">${+c.n}</div></div>`; });
  SECS.forEach(s => { h += `<div style="position: absolute; left: ${X.sec}px; width: 8px; top: ${f1(s.s * k)}px; height: ${f1((s.e - s.s) * k - 1.5)}px; ${bgOf(s.c)}"></div>`; });
  GROUPS.forEach((g, j) => { h += `<div style="position: absolute; left: ${X.heat + j * 10}px; width: 9px; top: 0; height: ${f1(T * k)}px; background: ${heatGrad(g, 180, t => t * k)};"></div>`; });
  const pk0 = tS('3:09:03') * k, pk1 = tS('5:05:03') * k;
  h += `<div style="position: absolute; left: 30px; width: 5px; top: ${f1(pk0)}px; height: ${f1(pk1 - pk0)}px; box-sizing: border-box; border: 1.5px solid ${C.fg}; border-right: none;"></div><div style="position: absolute; left: 0; top: ${f1((pk0 + pk1) / 2)}px; width: 28px; transform: translateY(-50%); font-size: 11px; line-height: 1.3; text-align: center;">巅<br>峰<br>期</div>`;
  const items = [];
  SECS.forEach(s => items.push({ t: s.s, o: 0, kind: 'sec', s }));
  
  items.sort((a, b) => a.t - b.t || a.o - b.o);
  const AW = 150;
  items.forEach(it => { it.h = it.kind === 'sec' ? Math.ceil(estW(it.s.name + ' 00.0′', 14) / AW) * 19 + 10 : Math.ceil((estW(it.s.label, 13) + 40) / AW) * 18 + 2; it.y = it.t * k; });
  const out = []; let prev = -1e9;
  items.forEach(it => { const top = Math.max(0, it.y - it.h / 2, prev); out.push(top); prev = top + it.h + 3; });
  const HH = Math.max(H, prev + 10);
  let svg = '', labs = '';
  items.forEach((it, i) => {
    const cy = out[i] + (it.kind === 'sec' ? 10 : it.h / 2);
    svg += `<line x1="0" y1="${f1(it.y)}" x2="22" y2="${f1(cy)}" stroke="${it.kind === 'sec' ? tickCol(it.s) : C.fg}" strokeOpacity="0.5" strokeWidth="1"></line>`;
    if (it.kind === 'sec') labs += `<div style="position: absolute; left: ${X.lab}px; right: 0; top: ${f1(out[i])}px; padding-top: 4px; border-top: 2px solid ${tickCol(it.s)}; font-family: ${F.serif}; font-size: 14px; font-weight: 700; line-height: 1.35;">${esc(it.s.name)} <span style="font-family: ${F.mono}; font-size: 11px; font-weight: 400; color: ${C.cap};">${it.s.min}′</span></div>`;
    else labs += `<div style="position: absolute; left: ${X.lab}px; right: 0; top: ${f1(out[i])}px; font-size: 13px; line-height: 18px; color: ${C.fg2};"><span style="font-family: ${F.mono}; font-size: 11px; color: ${C.cap}; margin-right: 6px;">${it.s.time.length > 5 ? it.s.time.slice(0, -3) : it.s.time}</span>${esc(it.s.label)}</div>`;
  });
  const leg = GROUPS.map(g => `<span style="display: inline-flex; align-items: center; gap: 6px;">${sw(g.c, 9, 9)}${g.name}</span>`).join('');
  return `<div style="margin-top: 28px;">${cHead()}</div>
<div style="margin-top: 18px; display: flex; flex-wrap: wrap; gap: 6px 14px; font-size: 12.5px; color: ${C.fg2};">${leg}</div>
<p style="${S.cap}">左起：全片时间、平台 13 段、板块颜色、九组话题的热度（从左到右与上面图例同序，越亮该组关键词每千字出现越多）、板块名。各站点见下方“按段落回听”。</p>
<div style="position: relative; height: ${f1(HH)}px; margin: 26px 0 12px;">${h}<svg width="22" height="${f1(HH)}" style="position: absolute; left: ${X.lead}px; top: 0; overflow: visible;">${svg}</svg>${labs}</div>`;
}
function stationList() {
  let h = '';
  CL.forEach(c => {
    const [t1, t2] = c.title.split('｜');
    const rows = ST.filter(s => s.clip === c.n).map(s => {
      const sec = SEC[s.sec], one = s.level === 1;
      return `<div style="display: ${one ? 'grid' : '{{ stMinorGrid }}'}; grid-template-columns: 56px 40px 8px minmax(0, 1fr); gap: 8px; align-items: baseline; padding: 4px 0; font: 12px/1.55 ${F.mono}; color: ${C.cap};"><span>${s.time}</span><span>${s.ct}</span><span style="width: 8px; height: 8px; align-self: center; ${bgOf(sec.c)}"></span><span style="font: ${one ? `600 15px/1.55 ${F.serif}; color: ${C.fg}` : `14px/1.55 ${F.sans}; color: ${C.sub}`};">${esc(s.label)}</span></div>`;
    }).join('');
    h += `<div style="break-inside: avoid; margin-bottom: 22px; background: ${C.bg2}; border: 1px solid ${C.rule2};"><div style="display: grid; grid-template-columns: 58px minmax(0, 1fr); border-bottom: 1px solid ${C.rule2}; background: ${C.bg3};"><div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; background: ${C.bar}; color: ${C.fg};"><span style="font-size: 11px; letter-spacing: 0.1em; line-height: 1;">第</span><span style="font-family: ${F.mono}; font-size: 22px; font-weight: 600; line-height: 1;">${+c.n}</span><span style="font-size: 11px; letter-spacing: 0.1em; line-height: 1;">段</span></div><div style="padding: 10px 14px;"><div style="font-family: ${F.serif}; font-size: 15.5px; font-weight: 700; line-height: 1.45; text-wrap: pretty;">${esc(t1)}</div><div style="margin-top: 3px; font-size: 12.5px; line-height: 1.55; color: ${C.sub};">${esc(t2 || '')}</div><div style="margin-top: 3px; font-family: ${F.mono}; font-size: 11.5px; color: ${C.cap};">平台序号 ${c.no} · ${c.start}–${c.end} · ${c.min}′</div></div></div><div style="padding: 8px 14px 10px;">${rows}</div></div>`;
  });
  return `<div style="margin-top: 60px; display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px 20px; padding-bottom: 12px; border-bottom: 1px solid ${C.rule2};"><h3 style="margin: 0; font-family: ${F.serif}; font-size: 24px; font-weight: 700;">按段落回听</h3><span style="font-size: 13.5px; color: ${C.cap};">每行依次是全片时间、该段内的时间、站点；宋体为主站。只精确到分钟的站点，段内时间是按整分推算的</span><div role="button" onClick="{{ toggleSt }}" style="margin-left: auto; ${S.btn}" style-hover="${S.btnH}">{{ stBtn }}</div></div>
<div style="margin-top: 22px; columns: 320px; column-gap: 24px;">${h}</div>`;
}
function sectionB() {
  return `${secOpen('map', 'B', '节目地图')}${head('B', '节目地图', '近八个小时怎么走的')}
<p style="${S.intro}">先用 34 分钟讲公司史；再用 55 分钟讲工作模式、类型、主题和杜琪峰的转变；然后用约 320 分钟从 1996 年的创业作逐部讲到 2023 年的《命案》；最后 55 分钟讲人物、演员和总结。</p>
<div style="${S.lead}">三分之二的时间在讲作品；<span style="border-bottom: 4px solid ${C.self};">《黑社会》两集、《PTU》、《神探》、《枪火》</span>四部片占了全片四分之一。</div>
${WIDE(`<div>${bcDesktop()}<p style="${S.cap}">条宽按时长等比。板块按节目里的过渡句切分，误差约一分钟；板块的分类名为整理者所加。话题热度每 10 分钟一格，用每千字出现次数而不是次数（最后一格不满 10 分钟）。各组关键词——${KW}</p></div>`)}
${NARROW(`<div>${bcMobile()}<p style="${S.cap}">各组关键词——${KW}</p></div>`)}
${stationList()}
</section>`;
}

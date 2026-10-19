const MD = 'src/episodes/hy06/handoff.md';
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
const D = {}; for (let i = 1; i <= 21; i++) D[i] = blks('D' + i);
const D21 = mdTable('D21');
const tS = s => { const p = s.split(':').map(Number); return p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 3600 + p[1] * 60; };
const T = tS('5:01:42');

const C = { bg: '#1D0A0C', bg2: '#2B1013', bg3: '#3B171B', bar: '#0D0405', fg: '#F4E8D4', fg2: '#E4D2BA', sub: '#C9AE95', cap: '#AE937D', faint: '#6F5450', rule: 'rgba(244,232,212,0.12)', rule2: 'rgba(244,232,212,0.26)', rule3: 'rgba(244,232,212,0.5)',
  love: '#B5212E', rev: '#1E5C4B', amb: '#DBA93E', rel: '#8E9097', car: '#56677A', ori: '#D3BF8C', form: '#36698A', act: '#EADBC1', craft: '#9E5A31', glow: '#FFDC9C',
  loveT: '#F07F84', revT: '#78C9A9', formT: '#9CC4E0', craftT: '#DE9C6E', carT: '#A9B6C6', relT: '#BEC0C6', loveM: '#D6303D', revM: '#2E8E70', ambBg: '#0E1C17', ambBg2: '#16291F' };
const F = { serif: "'Noto Serif SC', serif", sans: "'Noto Sans SC', sans-serif", mono: "'IBM Plex Mono', monospace" };
const PAD = 'clamp(20px, 5vw, 72px)';
const TC = { release: C.rel, origin: C.ori, love: C.love, revenge: C.rev, form: C.form, acting: C.act, craft: C.craft, staging: C.amb, career: C.car };
const TT = { release: C.relT, origin: C.ori, love: C.loveT, revenge: C.revT, form: C.formT, acting: C.act, craft: C.craftT, staging: C.amb, career: C.carT };
const TN = { release: '重映与传播', origin: '缘起与文学', love: '爱情与未完成', revenge: '复仇', form: '重复、留白与穿帮', acting: '表演', craft: '美术与摄影', staging: '调度与上海', career: '王家卫总评' };
const LIGHT = new Set([C.rel, C.ori, C.act, C.amb, C.glow, C.fg]);
const STRIPE = `repeating-linear-gradient(90deg, ${C.rev} 0 5px, #0A2219 5px 6.5px)`;
const fillK = k => k === 'revenge' ? `background: ${STRIPE};` : `background: ${TC[k]};`;
const inkK = k => LIGHT.has(TC[k]) ? C.bg : '#fff';
const mk = k => k === 'revenge' ? C.revM : k === 'love' ? C.loveM : TC[k];
const GLOWBOX = `box-shadow: 0 0 0 1px rgba(255,220,156,0.85), 0 0 36px 8px rgba(255,220,156,0.2);`;
const GLOWTXT = `color: ${C.glow}; text-shadow: 0 0 22px rgba(255,220,156,0.55);`;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const f1 = n => (+n).toFixed(1);
const fmtHM = m => Math.floor(m / 60) + ':' + String(m % 60).padStart(2, '0');
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${(+a).toFixed(3)})`; };
const mixHex = (a, b, t) => { const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join(''); };
const mono = s => `<span style="font-family: ${F.mono};">${s}</span>`;
const estW = (s, p = 12) => [...String(s)].reduce((a, ch) => a + (ch.charCodeAt(0) < 128 ? p * 0.6 : p), 0);
const swK = (k, w = 12, h = 12) => `<span style="display: inline-block; flex: none; width: ${w}px; height: ${h}px; ${fillK(k)}"></span>`;
const swC = (c, w = 12, h = 12) => `<span style="display: inline-block; flex: none; width: ${w}px; height: ${h}px; background: ${c};"></span>`;
const circ = (s = 11, c = C.loveM, extra = '') => `<span style="display: inline-block; flex: none; width: ${s}px; height: ${s}px; border-radius: 50%; background: ${c}; ${extra}"></span>`;
const sq = (s = 11, extra = '') => `<span style="display: inline-block; flex: none; width: ${s}px; height: ${s}px; box-sizing: border-box; background: ${C.rev}; border: 1.5px solid ${C.revT}; ${extra}"></span>`;
const S = {
  h2: `margin: 0; font-family: ${F.serif}; font-weight: 700; font-size: clamp(30px, 3.6vw, 46px); line-height: 1.15; letter-spacing: 0.02em; color: ${C.fg};`,
  h3: `margin: 0; font-family: ${F.serif}; font-size: 21px; font-weight: 700; line-height: 1.4; color: ${C.fg};`,
  intro: `margin: 24px 0 0; max-width: 880px; font-size: 17px; line-height: 1.9; color: ${C.fg2}; text-wrap: pretty;`,
  lead: `margin: 22px 0 0; max-width: 1100px; font-family: ${F.serif}; font-size: clamp(20px, 2.2vw, 26px); font-weight: 600; line-height: 1.6; color: ${C.fg}; text-wrap: pretty;`,
  cap: `margin: 16px 0 0; max-width: 1080px; font-size: 13px; line-height: 1.8; color: ${C.cap}; text-wrap: pretty;`,
  body: `font-size: 15px; line-height: 1.8; color: ${C.fg2}; text-wrap: pretty;`,
  sm: `font-size: 14px; line-height: 1.7; color: ${C.fg2}; text-wrap: pretty;`,
  xs: `font-size: 12.5px; line-height: 1.65; color: ${C.cap}; text-wrap: pretty;`,
  btn: `user-select: none; font-family: ${F.sans}; font-size: 13.5px; letter-spacing: 0.04em; padding: 8px 14px; border: 1px solid ${C.rule3}; cursor: pointer; transition: background 0.6s, color 0.6s;`,
  lab: `font-size: 12px; letter-spacing: 0.1em; color: ${C.cap};`,
  t16: `font-family: ${F.serif}; font-size: 16px; font-weight: 700; line-height: 1.45; color: ${C.fg};`,
  t18: `font-family: ${F.serif}; font-size: 18px; font-weight: 700; line-height: 1.45; color: ${C.fg};`
};
const WIDE = s => `<sc-if value="{{ isWide }}" hint-placeholder-val="{{ true }}">${s}</sc-if>`;
const NARROW = s => `<sc-if value="{{ isNarrow }}" hint-placeholder-val="{{ false }}">${s}</sc-if>`;
const HAVE = Object.fromEntries((await ls('assets/hy06')).map(f => { const n = f.split('/').pop(); return [n.replace(/\.\w+$/, ''), n]; }));
const slotUse = {};
function slot(k, label, shape = 'rect') { const id = 'hy06-' + k; slotUse[id] = (slotUse[id] || 0) + 1; const sid = slotUse[id] > 1 ? id + '-' + slotUse[id] : id; return `<image-slot id="${sid}" ${HAVE[k] ? `src="assets/hy06/${HAVE[k]}"` : ''} shape="${shape}" placeholder="${esc(label)}"></image-slot>`; }
const pic = (k, label, cap2 = '', ratio = '1.66 / 1', extra = '') => `<figure style="margin: 0; min-width: 0; ${extra}"><div style="background: #000; padding: clamp(8px, 1.2vw, 16px) 0; box-shadow: 0 0 0 1px ${C.rule2};"><div style="position: relative; aspect-ratio: ${ratio}; overflow: hidden; background: ${C.bg3};">${slot(k, label)}</div></div>${cap2 ? `<figcaption style="margin-top: 10px; display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 4px 8px; text-align: center; font-family: ${F.serif}; font-size: 14px; line-height: 1.6; letter-spacing: 0.04em; color: ${C.fg2}; text-wrap: balance;">${cap2}</figcaption>` : ''}</figure>`;
const still = (k, label, cap2 = '', ratio = '1.66 / 1', extra = '') => pic('s-' + k, label, cap2, ratio, extra);
const stills = (items, min = 360) => `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, ${min}px), 1fr)); gap: 18px; align-items: start;">${items.join('')}</div>`;
const poster = (k, title, w, extra = '') => `<div style="flex: none; position: relative; width: ${w}; aspect-ratio: 2 / 3; overflow: hidden; background: ${C.bg3}; box-shadow: 0 0 0 1px ${C.rule2}; ${extra}">${slot('f-' + k, title)}</div>`;
const portrait = (k, name, w, ratio = '3 / 4', extra = '') => `<div style="flex: none; position: relative; width: ${w}; max-width: 100%; aspect-ratio: ${ratio}; overflow: hidden; background: ${C.bg3}; box-shadow: 0 0 0 1px ${C.rule2}; ${extra}">${slot('p-' + k, name)}</div>`;
const mini = (k, name, s = 40) => `<span style="flex: none; position: relative; display: block; width: ${s}px; height: ${s}px; border-radius: 50%; overflow: hidden; background: ${C.bg3}; box-shadow: 0 0 0 1px ${C.rule3};">${slot('p-' + k, name, 'circle')}</span>`;
const face = (k, name, s = 64, sub2 = '') => `<figure style="margin: 0; flex: none; width: ${s + 22}px; display: flex; flex-direction: column; align-items: center; gap: 7px;">${mini(k, name, s)}<figcaption style="text-align: center; font-size: 12.5px; line-height: 1.45; color: ${C.fg};">${esc(name)}${sub2 ? `<br><span style="color: ${C.cap};">${esc(sub2)}</span>` : ''}</figcaption></figure>`;
const faces = (list, s = 48) => `<div style="display: flex; flex-wrap: wrap; gap: 6px 4px; margin-bottom: 10px;">${list.map(([k, n, s2]) => face(k, n, s, s2 || '')).join('')}</div>`;
const WT = Object.fromEntries(D[18][0].map(w => [w.id, w.title]));
const REFK = { '《小城之春》': 'xczc', '《董夫人》': 'dfr', '《相见恨晚》': 'xjhw', '《深锁春光一院愁》': 'sscg', '《浮云》': 'fy', '《后窗》': 'hc', '《迷魂记》': 'mhj' };
const DK = { '侯孝贤': 'hou', '杨德昌': 'yang', '杜琪峰、韦家辉': 'to', '侯麦': 'rohmer', '洪常秀': 'hong', '王家卫': 'wkw' };
const SK = { '潘迪华': 'pan', '钱似莺': 'chin', '萧炳林': 'siu' };
const PK = { '张曼玉': 'maggie', '梁朝伟': 'tony', '杜可风': 'doyle', '张叔平': 'chang', '李屏宾': 'lee', '昆汀': 'qt', '刘以鬯': 'liu', '张耀扬': 'roy', '戈达尔': 'godard', '潘迪华': 'pan', '侯孝贤': 'hou', '杨德昌': 'yang', '安东尼奥尼': 'anton', '张国荣': 'leslie', '杜琪峰': 'to', '布列松': 'bresson', '希区柯克': 'hitch', '奥逊·威尔斯': 'welles' };
const wkKey = t => ([['2046', 'w08'], ['手', 'w09'], ['蓝莓', 'w10'], ['宗师', 'w11'], ['繁花', 'w12'], ['东邪', 'w04'], ['春光', 'w06'], ['花样', 'w07'], ['堕落', 'w05'], ['重庆', 'w03'], ['阿飞', 'w02']].find(([s]) => t.includes(s)) || [])[1];
const grid = (min, gap = '14px') => `display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, ${min}px), 1fr)); gap: ${gap};`;
const gridF = (min, gap = '14px') => `display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, ${min}px), 1fr)); gap: ${gap};`;
const card = (inner, extra = '') => `<div style="padding: 14px 16px; background: ${C.bg2}; border: 1px solid ${C.rule2}; ${extra}">${inner}</div>`;
const dcard = (inner, extra = '') => `<div style="padding: 14px 16px; border: 1.5px dashed ${C.rule3}; ${extra}">${inner}</div>`;
const tag = (t, k = 'prog') => `<span style="display: inline-block; flex: none; padding: 0 6px; font-size: 11px; line-height: 1.7; letter-spacing: 0.04em; white-space: nowrap; ${k === 'rep' ? `background: ${C.fg}; color: ${C.bg};` : k === 'org' ? `border: 1px dashed ${C.rule3}; color: ${C.sub};` : k === 'amb' ? `background: ${C.amb}; color: ${C.bg};` : `border: 1px solid ${C.rule3}; color: ${C.sub};`}">${t}</span>`;
const PROG = tag('节目说法'), REP = tag('报道', 'rep'), PUB = tag('公开资料', 'rep'), ORG = tag('为整理者所加', 'org');
const who = t => `<div style="margin-top: 8px; font-size: 12.5px; color: ${C.cap};">—— ${t}</div>`;
const quote = (text, whoS, size = 21, col = C.fg) => `<figure style="margin: 0; padding: 16px 0 0; border-top: 1px solid ${C.rule2};"><blockquote style="margin: 0; font-family: ${F.serif}; font-size: ${size}px; font-weight: 600; line-height: 1.6; color: ${col}; text-wrap: pretty;">“${esc(text)}”</blockquote><figcaption style="margin-top: 8px; font-size: 13px; color: ${C.cap};">—— ${esc(whoS)}</figcaption></figure>`;
const subtitleCard = (text, whoS, glow = false, size = 'clamp(21px, 2.4vw, 30px)') => `<div style="padding: 24px 28px; background: ${C.bar}; border-style: solid; border-color: #000; border-width: 10px 0; text-align: center; ${glow ? GLOWBOX : ''}"><div style="font-family: ${F.serif}; font-size: ${size}; font-weight: 700; line-height: 1.6; letter-spacing: 0.04em; ${glow ? GLOWTXT : `color: ${C.fg};`} text-wrap: balance;">${esc(text)}</div>${whoS ? `<div style="margin-top: 10px; font-size: 13px; color: ${C.cap};">${esc(whoS)}</div>` : ''}</div>`;
const cap = t => `<p style="${S.cap}">${t}</p>`;
const lit = (inner, extra = '') => `<div style="position: relative; padding-top: 36px; ${extra}"><span aria-hidden="true" style="position: absolute; left: 50%; top: 0; width: 70%; height: 200px; transform: translateX(-50%); background: radial-gradient(ellipse 50% 100% at 50% 0%, rgba(255,220,156,0.16), rgba(255,220,156,0) 72%); pointer-events: none;"></span><span aria-hidden="true" style="position: absolute; left: 50%; top: 5px; width: 9px; height: 9px; margin-left: -4.5px; border-radius: 50%; background: ${C.glow}; box-shadow: 0 0 16px 5px rgba(255,220,156,0.6);"></span><div style="position: relative;">${inner}</div></div>`;
const arrowR = (c = C.cap) => `<span aria-hidden="true" style="flex: none; align-self: center; width: 20px; height: 11px; background: ${c}; clip-path: polygon(0 42%, 64% 42%, 64% 0, 100% 50%, 64% 100%, 64% 58%, 0 58%);"></span>`;
const arrowD = (c = C.cap, h = 20) => `<span aria-hidden="true" style="display: block; margin: 0 auto; width: 11px; height: ${h}px; background: ${c}; clip-path: polygon(42% 0, 58% 0, 58% 64%, 100% 64%, 50% 100%, 0 64%, 42% 64%);"></span>`;
function sub(title, note, id) { return `<div ${id ? `id="${id}"` : ''} style="display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 16px; padding-bottom: 10px; border-bottom: 1px solid ${C.rule2};"><h3 style="${S.h3}">${title}</h3>${note ? `<span style="font-size: 13px; color: ${C.cap};">${note}</span>` : ''}</div>`; }
const tbl = (cols, rows, widths, minW = 640, hl = []) => `<div style="margin-top: 14px; overflow-x: auto;"><div style="min-width: ${minW}px; display: grid; grid-template-columns: ${widths}; border-top: 1px solid ${C.rule3};">${cols.map((c, i) => `<div style="padding: 9px 12px; border-bottom: 1px solid ${C.rule2}; font-size: 12.5px; letter-spacing: 0.08em; ${hl[i] ? `color: ${C.fg}; font-weight: 700; box-shadow: inset 0 3px 0 ${hl[i]};` : `color: ${C.cap};`}">${c}</div>`).join('')}${rows.map(r => r.map((v, i) => `<div style="padding: 10px 12px; border-bottom: 1px solid ${C.rule}; font-size: ${i ? 14.5 : 14}px; line-height: 1.65; ${i ? `color: ${C.fg2};` : `color: ${C.fg}; font-family: ${F.serif}; font-weight: 700;`}">${v}</div>`).join('')).join('')}</div></div>`;

// ---- module chrome
const ACC = { D: 'split', E: C.form, F: C.rel, G: C.ori, H: C.love, I: C.form, J: C.form, K: C.act, L: C.craft, M: C.amb, N: C.amb, O: C.amb, P: C.car, Q: C.car };
const ZONE = { B: '全片', C: '全片', D: '片内', E: '片内', F: '片外', G: '片内', H: '片内', I: '片内', J: '片内', K: '片内', L: '片内', M: '片内', N: '片内', O: '片内', P: '片外', Q: '片外', R: '附录', S: '附录' };
const PLATE = { D: '1:25:06', E: '2:06:47', F: '0:21:20', G: '0:37:30', H: '0:55:04', I: '2:25:48', J: '2:38:18', K: '2:54:49', L: '3:25:51', M: '3:55:12', N: '4:08:21', O: '4:34:22', P: '4:42:23' };
const PATF = [
  c => `repeating-linear-gradient(90deg, ${c} 0 2px, transparent 2px 9px)`,
  c => `conic-gradient(${c} 25%, transparent 0 50%, ${c} 0 75%, transparent 0) 0 0 / 10px 10px`,
  c => `radial-gradient(circle, ${c} 2.2px, transparent 2.7px) 0 0 / 12px 12px`,
  c => `repeating-linear-gradient(45deg, ${c} 0 3px, transparent 3px 10px)`,
  c => `radial-gradient(circle, transparent 2.6px, ${c} 3px 4.2px, transparent 4.6px) 0 0 / 14px 14px, radial-gradient(circle, ${c} 1.4px, transparent 1.9px) 7px 7px / 14px 14px`,
  c => `linear-gradient(135deg, ${c} 25%, transparent 25%) -6px 0 / 12px 12px, linear-gradient(225deg, ${c} 25%, transparent 25%) -6px 0 / 12px 12px`,
  c => `repeating-linear-gradient(0deg, ${c} 0 1.5px, transparent 1.5px 4.5px)`,
  c => `conic-gradient(from 45deg, ${c} 25%, transparent 0 50%, ${c} 0 75%, transparent 0) 0 0 / 14px 14px`,
  c => `repeating-linear-gradient(90deg, ${c} 0 6px, transparent 6px 8px, ${c} 8px 9px, transparent 9px 16px)`,
  c => `radial-gradient(circle, transparent 2px, ${c} 2.4px 3.4px, transparent 3.8px) 0 0 / 11px 11px`
];
const PATM = { B: [2, C.fg, 0.2], E: [4, C.formT, 0.5], F: [6, C.relT, 0.42], G: [1, C.ori, 0.34], H: [5, C.loveT, 0.42], I: [9, C.formT, 0.5], J: [7, C.formT, 0.36], K: [2, C.act, 0.34], L: [3, C.craftT, 0.45], M: [0, C.amb, 0.5], N: [8, C.amb, 0.45], O: [4, C.amb, 0.42], P: [6, C.carT, 0.45], Q: [1, C.carT, 0.32], S: [9, C.fg, 0.24] };
const FLOWER = c => [[50, 22], [50, 78], [22, 50], [78, 50]].map(([x, y]) => `radial-gradient(circle at ${x}% ${y}%, ${c} 2.2px, transparent 2.8px) 0 0 / 18px 18px`).join(', ') + `, radial-gradient(circle at 50% 50%, ${C.amb} 1.4px, transparent 1.9px) 0 0 / 18px 18px`;
const LATTICE = c => `repeating-linear-gradient(45deg, ${c} 0 1.4px, transparent 1.4px 10px), repeating-linear-gradient(-45deg, ${c} 0 1.4px, transparent 1.4px 10px)`;
const BANDK = { B: 0, E: 1, F: 2, G: 0, H: 1, I: 2, J: 0, K: 1, L: 2, M: 0, N: 1, O: 2, P: 0, Q: 1, S: 2 };
function band(L) {
  let pat, ground;
  if (L === 'D' || L === 'R') { pat = `repeating-linear-gradient(90deg, ${C.loveM} 0 9px, ${C.bar} 9px 12px, ${C.revM} 12px 21px, ${C.bar} 21px 24px)`; ground = C.bar; }
  else { const k = BANDK[L]; ground = ['#6A111A', '#123C31', '#6A111A'][k]; pat = k === 0 ? FLOWER(rgba(C.fg, 0.62)) : k === 1 ? FLOWER(rgba(C.amb, 0.75)) : LATTICE(rgba(C.amb, 0.55)); }
  return `<div aria-hidden="true" style="height: 18px; border-style: solid; border-color: ${C.bar}; border-width: 4px 0; background: ${pat}, ${ground};"></div>`;
}
const CURTAIN = `repeating-linear-gradient(90deg, #4E0A12 0, #8E1722 14px, #C22F3A 22px, #9A1A25 30px, #5C0D16 42px, #3E070E 50px)`;
const divider = (label, sub2) => `<div aria-hidden="true" style="padding: clamp(72px, 9vw, 120px) ${PAD}; border-top: 18px solid ${C.bar}; background: linear-gradient(180deg, rgba(13,4,5,0.88), rgba(13,4,5,0) 32%, rgba(13,4,5,0) 62%, rgba(13,4,5,0.92)), radial-gradient(ellipse 34% 70% at 50% 16%, rgba(255,220,156,0.3), transparent 70%), ${CURTAIN};"><div style="margin: 0 auto; max-width: 560px; padding: 22px 28px; background: #000; box-shadow: 0 12px 44px rgba(0,0,0,0.65); text-align: center;"><div style="font-family: ${F.serif}; font-size: 22px; font-weight: 700; letter-spacing: 0.2em; color: ${C.fg};">${label}</div><div style="margin-top: 8px; font-size: 13px; line-height: 1.7; color: ${C.sub}; text-wrap: balance;">${sub2}</div></div></div>`;
function door(L, big = true) {
  const a = ACC[L], w = big ? 42 : 34, h = big ? 64 : 52;
  const fill = a === 'split' ? `background: linear-gradient(90deg, ${C.love} 50%, ${C.rev} 50%);` : a ? `background: ${a};` : `box-shadow: inset 0 0 0 1px ${C.rule2};`;
  const ink = a && a !== 'split' && LIGHT.has(a) ? C.bg : C.fg;
  const bd = a && a !== 'split' ? a : C.rule3;
  return `<span style="flex: none; width: ${w}px; height: ${h}px; box-sizing: border-box; border-style: solid; border-color: ${bd}; border-width: 5px 1.5px; padding: 4px; display: flex;"><span style="flex: 1; ${fill} display: flex; align-items: center; justify-content: center; font-family: ${F.mono}; font-size: ${big ? 19 : 16}px; font-weight: 600; color: ${ink};">${L}</span></span>`;
}
const CL = D[2][0].map(r => ({ n: r.clip, no: r.platform_no, title: r.title, s: tS(r.start), e: tS(r.end), min: +r.minutes, start: r.start, end: r.end }));
const clipOf = t => CL.find(c => t >= c.s && t < c.e) || CL[CL.length - 1];
const ct2 = t => { const c = clipOf(t), d = t - c.s; return { c, txt: `${Math.floor(d / 60)}:${String(d % 60).padStart(2, '0')}` }; };
function plate(full) {
  const { c, txt } = ct2(tS(full));
  return `<span title="从这里开始听" style="flex: none; display: inline-flex; flex-direction: column; align-items: center; padding: 5px 12px 6px; margin-bottom: 4px; background: ${C.bar}; border-style: solid; border-color: ${C.bar}; border-width: 4px 0; box-shadow: inset 0 0 0 1px ${C.rule2}; line-height: 1.1;"><span style="font-family: ${F.serif}; font-size: 15px; font-weight: 700; color: ${C.fg};">第 ${+c.n} 段 ${txt}</span><span style="margin-top: 3px; font-family: ${F.mono}; font-size: 11px; color: ${C.cap};">全片 ${full}</span></span>`;
}
function head(L, title, q) {
  return `<div style="display: flex; flex-wrap: wrap; align-items: flex-end; gap: 12px 18px; padding-bottom: 16px; border-bottom: 1px solid ${C.rule3};">${door(L)}<span style="writing-mode: vertical-rl; font-size: 12px; letter-spacing: 0.32em; line-height: 1; color: ${C.cap}; padding-bottom: 3px;">${ZONE[L]}</span><h2 style="${S.h2}">${title}</h2>${PLATE[L] ? plate(PLATE[L]) : ''}<span style="margin-left: auto; padding-bottom: 6px; font-size: 15px; color: ${C.sub};">${q}</span></div>`;
}
const secOpen = (id, L, title, bg) => `${band(L)}<section id="${id}" data-screen-label="${L} ${title}" style="padding: clamp(56px, 7vw, 96px) ${PAD} clamp(56px, 7vw, 88px); ${bg ? `background: ${bg};` : ''}">`;
const dividerOld = (label, sub2) => `<div aria-hidden="true" style="padding: clamp(64px, 8vw, 104px) ${PAD} clamp(56px, 7vw, 88px); border-top: 18px solid ${C.bar}; background: radial-gradient(ellipse 30% 90% at 50% 0%, rgba(255,220,156,0.08), transparent 70%);"><div style="display: flex; align-items: flex-end; gap: 18px;"><span style="flex: 1; height: 1px; background: ${C.rule2};"></span><span style="position: relative; width: 58px; height: 92px; box-sizing: border-box; border-style: solid; border-color: ${C.bar}; border-width: 7px 5px; background: linear-gradient(180deg, #120D0B, #241B16); box-shadow: 0 0 0 1px ${C.rule2};"><span style="position: absolute; left: 50%; top: 6px; width: 5px; height: 5px; margin-left: -2.5px; border-radius: 50%; background: ${C.amb}; box-shadow: 0 0 10px 3px rgba(219,169,62,0.5);"></span><span style="position: absolute; left: 21px; bottom: 6px; width: 6px; height: 6px; border-radius: 50%; background: ${C.loveM};"></span><span style="position: absolute; left: 29px; bottom: 6px; width: 6px; height: 6px; background: ${C.revM};"></span></span><span style="flex: 1; height: 1px; background: ${C.rule2};"></span></div><div style="margin-top: 16px; text-align: center; font-family: ${F.serif}; font-size: 20px; font-weight: 700; letter-spacing: 0.16em;">${label}</div><div style="margin-top: 6px; text-align: center; font-size: 13px; color: ${C.cap}; text-wrap: balance;">${sub2}</div></div>`;

// ---- shared data
const SEC = {}; D[1][0].forEach(r => { SEC[r.id] = { id: r.id, name: r.section, s: tS(r.start), e: tS(r.end), start: r.start, min: +r.minutes, share: r.share_pct, cat: r.category, k: r.tone, clip: r.clip, ct: r.clip_start }; });
const SECS = Object.values(SEC);
const ST = D[3][0].map(r => ({ t: tS(r.time), time: r.time, clip: r.clip, ct: r.clip_time, label: r.label, sec: r.section, level: +r.level }));
const N1 = ST.filter(s => s.level === 1).length, NST = ST.length;

// ===== A cover
function corridor() {
  const W = 400, H = 560, fx0 = 176, fx1 = 224, fy0 = 150, fy1 = 266;
  const P = (t, sd, h) => { const x = sd === 'L' ? fx0 * t : W - (W - fx1) * t; const top = fy0 * t, bot = H - (H - fy1) * t; return [x, top + h * (bot - top)]; };
  const pt = p => p.map(v => v.toFixed(1)).join(',');
  let g = `<rect x="0" y="0" width="${W}" height="${H}" fill="#0C0908"></rect>`;
  g += `<polygon points="0,0 ${fx0},${fy0} ${fx0},${fy1} 0,${H}" fill="#221915"></polygon><polygon points="${W},0 ${fx1},${fy0} ${fx1},${fy1} ${W},${H}" fill="#1B1411"></polygon><polygon points="0,0 ${W},0 ${fx1},${fy0} ${fx0},${fy0}" fill="#120D0B"></polygon><polygon points="0,${H} ${W},${H} ${fx1},${fy1} ${fx0},${fy1}" fill="#2A201A"></polygon>`;
  [[0.1, 0.1], [0.36, 0.07], [0.56, 0.05], [0.7, 0.035]].forEach(([t, dt]) => ['L', 'R'].forEach(sd => { const q = [P(t, sd, 0.28), P(t + dt, sd, 0.28), P(t + dt, sd, 1), P(t, sd, 1)]; g += `<polygon points="${q.map(pt).join(' ')}" fill="#0D0405" stroke="rgba(244,232,212,0.14)" strokeWidth="1"></polygon>`; }));
  [0.3, 0.52, 0.68, 0.8].forEach((t, i) => { const a = P(t, 'L', 0), b = P(t, 'R', 1); g += `<rect x="${f1(a[0])}" y="${f1(a[1])}" width="${f1(b[0] - a[0])}" height="${f1(b[1] - a[1])}" fill="none" stroke="rgba(244,232,212,${(0.07 + i * 0.03).toFixed(2)})" strokeWidth="${(2.2 - i * 0.4).toFixed(1)}"></rect>`; });
  g += `<rect x="${fx0}" y="${fy0}" width="${fx1 - fx0}" height="${fy1 - fy0}" fill="#060403" stroke="rgba(244,232,212,0.2)" strokeWidth="1"></rect>`;
  const ly = fy0 * 0.84 + 12, fyF = H - (H - fy1) * 0.84;
  g += `<defs><radialGradient id="hy06-cone" cx="200" cy="${ly}" r="230" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#FFDC9C" stopOpacity="0.32"></stop><stop offset="1" stopColor="#FFDC9C" stopOpacity="0"></stop></radialGradient><radialGradient id="hy06-pool" cx="200" cy="${f1(fyF)}" r="60" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#FFDC9C" stopOpacity="0.42"></stop><stop offset="1" stopColor="#FFDC9C" stopOpacity="0"></stop></radialGradient><radialGradient id="hy06-halo" cx="200" cy="${ly}" r="30" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#FFDC9C" stopOpacity="0.9"></stop><stop offset="1" stopColor="#FFDC9C" stopOpacity="0"></stop></radialGradient></defs>`;
  g += `<polygon points="195,${ly} 205,${ly} 262,${f1(fyF + 6)} 138,${f1(fyF + 6)}" fill="url(#hy06-cone)"></polygon><ellipse cx="200" cy="${f1(fyF)}" rx="60" ry="11" fill="url(#hy06-pool)"></ellipse>`;
  g += `<line x1="200" y1="${fy0 * 0.84}" x2="200" y2="${ly - 3}" stroke="rgba(244,232,212,0.4)" strokeWidth="1"></line><circle cx="200" cy="${ly}" r="30" fill="url(#hy06-halo)"></circle><circle cx="200" cy="${ly}" r="3.6" fill="#FFDC9C"></circle>`;
  g += `<circle cx="192" cy="${f1(fyF - 6)}" r="5" fill="${C.loveM}"></circle><rect x="201" y="${f1(fyF - 14)}" width="9" height="9" fill="${C.rev}" stroke="${C.revT}" strokeWidth="1.2"></rect>`;
  return `<figure style="margin: 0; flex: 0 1 380px; min-width: 0;"><div style="border-style: solid; border-color: ${C.bar}; border-width: 12px 9px; box-shadow: 0 0 0 1px ${C.rule2}, inset 0 0 0 1px ${C.rule};"><svg viewBox="0 0 400 560" style="display: block; width: 100%; height: auto;" role="img" aria-label="一条窄长的暗色走廊，尽头一盏顶灯，灯下一个胭脂红的圆点和一个墨绿的方点靠得很近">${g}</svg></div><figcaption style="margin-top: 12px; display: flex; flex-wrap: wrap; justify-content: center; gap: 4px 12px; font-size: 13.5px; letter-spacing: 0.08em; color: ${C.amb};"><span>1962 香港</span><span>·</span><span>1963 新加坡</span><span>·</span><span>1966 香港与吴哥窟</span></figcaption></figure>`;
}
const TOC = [['map', 'B', '节目地图'], ['relay', 'C', '话题接力'], ['readings', 'D', '两种读法'], ['copies', 'E', '复制的复制'], ['fame', 'F', '名声的路线'], ['origin', 'G', '从美食故事里长出来'], ['unfinished', 'H', '未完成'], ['blank', 'I', '留白'], ['gaffes', 'J', '穿帮'], ['acting', 'K', '垂眸与一瞥'], ['craft', 'L', '俗艳与美'], ['staging', 'M', '一切都在摇摆'], ['shanghai', 'N', '混血儿'], ['angkor', 'O', '四散'], ['floating', 'P', '一部半与悬浮'], ['works', 'Q', '作品年表'], ['debate', 'R', '他们在哪里读法不同'], ['mentions', 'S', '谁被提得最多']];
function termsList() {
  const s = md.slice(md.indexOf('**需要解释给读者的术语**'), md.indexOf('**时间戳的口径**'));
  return [...s.matchAll(/^\s+- (.+?)：(.+)$/gm)].map(m => [m[1], m[2]]);
}
const CAST = [['wkw', '王家卫', '编剧、导演'], ['tony', '梁朝伟', '演周慕云'], ['maggie', '张曼玉', '演苏丽珍'], ['pan', '潘迪华', '演孙太太'], ['chang', '张叔平', '美术、服装、剪辑'], ['doyle', '杜可风', '摄影'], ['lee', '李屏宾', '摄影'], ['liu', '刘以鬯', '小说《对倒》作者']];
function heroPoster() {
  return `<figure style="margin: 0; flex: 0 1 420px; min-width: 0; display: flex; gap: 18px; align-items: flex-start;"><div style="flex: 1; min-width: 0;"><div style="border-style: solid; border-color: ${C.bar}; border-width: 12px 9px; box-shadow: 0 0 0 1px ${C.rule2}, 0 24px 60px rgba(0,0,0,0.5);">${poster('w07', '《花样年华》海报', '100%', 'box-shadow: none;')}</div><figcaption style="margin-top: 12px; display: flex; flex-wrap: wrap; justify-content: center; gap: 4px 12px; font-size: 13.5px; letter-spacing: 0.08em; color: ${C.amb};"><span>1962 香港</span><span>·</span><span>1963 新加坡</span><span>·</span><span>1966 香港与吴哥窟</span></figcaption></div><div aria-hidden="true" style="flex: none; writing-mode: vertical-rl; font-family: ${F.serif}; font-size: clamp(34px, 3.6vw, 52px); font-weight: 900; letter-spacing: 0.3em; line-height: 1; color: ${C.loveT};">花樣年華</div></figure>`;
}
function cover() {
  const meta = [['节目', '《电影巨辩》'], ['专辑', '付费专辑《为了华语电影》'], ['本集', '第 6 集《〈花样年华〉与王家卫》'], ['主持', '老马（magasa）、阿吴（LOOK）'], ['录制', '2025 年初，《花样年华》25 周年修复版在内地重映期间'], ['时长', mono('5:01:42')], ['分段', '平台上切成 8 段（序号 59–66），内容是一期'], ['影片', '《花样年华》，2000 年，王家卫编导，梁朝伟、张曼玉主演']];
  const archive = `<div style="background: ${C.bg2}; border-style: solid; border-color: ${C.bar}; border-width: 8px 0; box-shadow: 0 0 0 1px ${C.rule2};"><div style="display: flex; justify-content: space-between; align-items: center; height: 44px; padding: 0 20px; font-size: 12px; letter-spacing: 0.22em; white-space: nowrap; color: ${C.sub}; border-bottom: 1px solid ${C.rule2};"><span>节目档案</span><span style="font-family: ${F.mono}; letter-spacing: 0.06em;">No. 06</span></div>${meta.map(([k, v]) => `<div style="display: grid; grid-template-columns: 52px minmax(0, 1fr); gap: 12px; padding: 8px 20px; border-bottom: 1px solid ${C.rule}; font-size: 14px; line-height: 1.65;"><span style="color: ${C.cap};">${k}</span><span style="color: ${C.fg2};">${v}</span></div>`).join('')}<div style="padding: 12px 20px 16px;"><div style="display: flex; gap: 2px;">${CL.map(c => `<span title="${esc('第 ' + c.n + ' 段 · 平台序号 ' + c.no + ' · ' + c.min + ' 分钟')}" style="flex: ${c.min} 1 0; min-width: 0; height: 18px; box-sizing: border-box; border-style: solid; border-color: ${C.bar}; border-width: 4px 0; background: ${C.bg3}; box-shadow: 0 0 0 1px ${C.rule2};"></span>`).join('')}</div><div style="margin-top: 8px; font-size: 12px; color: ${C.cap};">8 段，宽度按时长</div></div></div>`;
  const top = `<div style="padding: clamp(22px, 3vw, 36px) ${PAD} clamp(40px, 5vw, 60px);">
${seriesNav({ color: C.cap })}
<div style="margin-top: clamp(36px, 5vw, 64px); display: flex; flex-wrap: wrap; gap: 44px 64px; align-items: flex-start;">
<div style="flex: 1 1 560px; min-width: 0;">
<div style="display: flex; align-items: center; gap: 14px; font-family: ${F.serif}; font-size: 18px; font-weight: 600; letter-spacing: 0.24em; color: ${C.sub};">为了华语电影<span style="font-family: ${F.mono}; font-size: 15px; letter-spacing: 0.04em; border: 1.5px solid ${C.rule3}; padding: 2px 8px 1px; color: ${C.fg};">06</span></div>
<h1 style="margin: 22px 0 0; font-family: ${F.serif}; font-weight: 900; font-size: clamp(46px, 7.4vw, 108px); line-height: 1.12; letter-spacing: 0.03em; color: ${C.fg};">《花样年华》<br>与王家卫</h1>
<div style="margin-top: 22px; font-size: 17px; line-height: 1.7; color: ${C.sub}; text-wrap: pretty;">电影巨辩《为了华语电影》第 6 集 · 5 小时 1 分 · 只聊一部电影 · 老马 × 阿吴</div>
<div style="margin-top: clamp(40px, 6vw, 84px); padding-top: 22px; border-top: 1px solid ${C.rule2}; max-width: 640px;"><div style="font-family: ${F.serif}; font-weight: 900; font-size: clamp(30px, 3.6vw, 48px); line-height: 1.3; letter-spacing: 0.06em; color: ${C.fg};">情感的未完成状态。</div><div style="margin-top: 12px; font-size: 15.5px; line-height: 1.8; color: ${C.fg2}; text-wrap: pretty;">节目认为，这是王家卫一辈子在拍的东西，《花样年华》把它推到了极致。</div></div>
</div>
${heroPoster()}
</div>
</div>`;
  const terms = termsList();
  const legendT = ['release', 'origin', 'love', 'revenge', 'form', 'acting', 'craft', 'staging', 'career'].map(k => `<span style="display: inline-flex; align-items: center; gap: 7px; color: ${C.fg2};">${swK(k, 18, 12)}${k === 'release' ? '片外：重映、名声、产业' : k === 'career' ? '片外：王家卫本人' : k === 'staging' ? '60 年代、上海、调度与结尾' : k === 'revenge' ? '复仇、黑暗面的读法（加竖条纹）' : k === 'love' ? '爱情、想象的读法' : TN[k]}</span>`).join('');
  const paper = `<div style="padding: clamp(40px, 5vw, 64px) ${PAD} clamp(44px, 5vw, 64px); border-top: 18px solid ${C.bar};">
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr)); gap: 36px 64px; align-items: start;">
<div style="display: grid; gap: 22px;"><p style="margin: 0; font-size: 17.5px; line-height: 1.95; color: ${C.fg2}; text-wrap: pretty;">节目认为《花样年华》差不多就是王家卫电影生涯的“收官之作”。它的核心是王家卫一辈子在拍的东西：情感的未完成状态。两对夫妻的出轨都不拍，主角的爱情靠扮演、彩排、一起写武侠小说在想象中发生，又在想象中结束。王家卫原本要拍的是周慕云向苏丽珍复仇的故事，因为赶戛纳、超支、同时筹备《2046》，结尾没拍成，复仇线被淡化，留下的暧昧反而成就了一部经典。节目最后的判断是：王家卫是专属于上世纪 90 年代的导演，进入新世纪只拍了“一部半”电影，成了一个“悬浮”的、被抽空内容的美学符号。</p>
<div style="padding: 16px 18px; background: ${C.bg2}; border: 1px solid ${C.rule2};"><div style="${S.lab}">影片</div><p style="margin: 8px 0 0; font-size: 15px; line-height: 1.85; color: ${C.fg2}; text-wrap: pretty;">故事从 <span style="color: ${C.amb};">1962</span> 年的香港开始：周慕云夫妇和苏丽珍（陈太太）夫妇同一天搬进隔壁的两套房子，两人渐渐发现各自的配偶出轨了；他们扮演对方的配偶，一起写武侠小说，感情在克制中发生，最后周慕云去了新加坡。<span style="color: ${C.amb};">1963</span> 年苏丽珍去新加坡找他，没有见面；<span style="color: ${C.amb};">1966</span> 年两人先后回到旧居，没有相遇；结尾周慕云在柬埔寨吴哥窟对着墙上的洞口说出秘密。周太太和陈先生在片中从不露脸。</p></div></div>
<div style="display: grid; gap: 26px;">${archive}${quote('差不多就是王家卫电影生涯的收官之作。', '一位主持人', 22)}${quote('王家卫的任务，是战胜自己的模仿者。', '节目，第 1 段的平台标题', 19)}</div>
</div>
<div style="margin-top: 52px;">${sub('片中与片后的人', '演员、主创和原著作者；照片多为近年所摄')}<div style="margin-top: 18px; display: flex; flex-wrap: wrap; gap: 20px 10px;">${CAST.map(([k, n, s2]) => face(k, n, 84, s2)).join('')}</div></div>
<div style="margin-top: 52px;">${sub('先认几个词', '节目里反复出现')}<div style="margin-top: 6px; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 380px), 1fr)); column-gap: 32px;">${terms.map(([k, v]) => `<div style="display: grid; grid-template-columns: 112px minmax(0, 1fr); gap: 12px; padding: 12px 0; border-bottom: 1px solid ${C.rule};"><span style="font-family: ${F.serif}; font-size: 15.5px; font-weight: 700; line-height: 1.5;">${esc(k)}</span><span style="font-size: 14px; line-height: 1.7; color: ${C.fg2}; text-wrap: pretty;">${esc(v)}</span></div>`).join('')}</div></div>
<div style="margin-top: 32px; display: flex; flex-wrap: wrap; align-items: center; gap: 10px 22px; font-size: 13px; color: ${C.cap};"><span>颜色全页一致：</span>${legendT}</div>
<div style="margin-top: 12px; display: flex; flex-wrap: wrap; align-items: center; gap: 10px 22px; font-size: 13px; color: ${C.cap};"><span>颜色之外的区分：</span><span style="display: inline-flex; align-items: center; gap: 7px; color: ${C.fg2};">${circ(12)}圆：爱情的读法</span><span style="display: inline-flex; align-items: center; gap: 7px; color: ${C.fg2};">${sq(12)}方：复仇的读法</span><span style="display: inline-flex; align-items: center; gap: 7px; color: ${C.fg2};"><span style="width: 18px; height: 12px; background: ${STRIPE};"></span>竖条纹：讲复仇的板块</span><span style="display: inline-flex; align-items: center; gap: 7px; color: ${C.fg2};"><span style="width: 9px; height: 9px; border-radius: 50%; background: ${C.glow}; box-shadow: 0 0 10px 3px rgba(255,220,156,0.55);"></span>顶灯光：每个模块最多一处</span><span style="display: inline-flex; align-items: center; gap: 7px; color: ${C.amb};">琥珀色的年份：片中年份</span></div>
<nav style="margin-top: 36px; display: flex; flex-wrap: wrap; gap: 8px;">${TOC.map(([id, l, t]) => `<a href="#${id}" style="display: inline-flex; align-items: baseline; gap: 8px; padding: 7px 12px 6px; border: 1px solid ${C.rule2}; background: ${C.bg2}; color: ${C.fg}; font-size: 14px; transition: border-color 0.6s;" style-hover="border-color: ${C.fg}; color: ${C.fg};"><span style="font-family: ${F.mono}; font-weight: 600; font-size: 13px; color: ${C.cap};">${l}</span>${t}</a>`).join('')}</nav>
</div>`;
  return `<header id="cover" data-screen-label="A 封面" style="border-top: 18px solid ${C.bar}; background: radial-gradient(ellipse 45% 40% at 78% 0%, rgba(255,220,156,0.13), transparent 70%), ${LATTICE(rgba(C.fg, 0.028))};">${top}<div style="padding: 0 ${PAD} clamp(44px, 5vw, 64px);">${still('hero', '剧照：横幅画面，建议用走廊、楼梯或面档的镜头', '', '2.39 / 1')}</div>${paper}</header>`;
}

// ===== B + C
const SHORT = { b00: '开场', b01: '修复版', b02: '便利店短片', b03: '品牌经营', b04: '地位', b05: '阿飞与 1994', b06: '饱和攻击', b07: '戈达尔', b08: '在海外', b09: '创作缘起', b10: '拉美文学', b11: '刘以鬯', b12: '改编策略', b13: '三段字幕', b14: '不是情节剧', b15: '类型片', b16: '煽情原理', b17: '影史参照', b18: '希区柯克', b19: '未完成', b20: '正向负向', b21: '创作心理', b22: '两种读法', b23: '原构思', b24: '按复仇演', b25: '赶工超支', b26: '放弃复仇', b27: '根本不懂', b28: '三点启发', b29: '两场床戏', b30: '吴哥重逢', b31: '儿子', b32: '戒指', b33: '重复母题', b34: '物件配乐', b35: '七次扮演', b36: '彩排', b37: '前三十分钟', b38: '谁爱得多', b39: '耳环电饭煲', b40: '撞包', b41: '奖项', b42: '梁朝伟', b43: '三个层次', b44: '张曼玉', b45: '十五个月', b46: '只闻其声', b47: '张叔平', b48: '旗袍', b49: '摄影师', b50: '局部色彩', b51: '烟与雨', b52: '构图', b53: '买面', b54: '告别', b55: '上海声音', b56: '上海话', b57: '食物', b58: '邻里', b59: '结尾政治', b60: '四散', b61: '吴哥窟', b62: '祛魅', b63: '一部半', b64: '早夭', b65: '90 年代', b66: '悬浮' };
const GROUPS = [{ k: 'release', tone: 'release', name: '重映与传播', c: C.rel }, { k: 'lit', tone: 'origin', name: '文学与改编', c: C.ori }, { k: 'love', tone: 'love', name: '爱情与未完成', c: '#D2323F' }, { k: 'revenge', tone: 'revenge', name: '复仇与构思', c: '#2F9474' }, { k: 'repeat', tone: 'form', name: '重复与扮演', c: '#4F8DB8' }, { k: 'acting', tone: 'acting', name: '表演', c: C.act }, { k: 'form', tone: 'craft', name: '视听与形式', c: '#C0703F' }, { k: 'shhk', tone: 'staging', name: '上海、香港与九七', c: C.amb }];
const BINS = D[4][0].map((r, i, a) => ({ s: tS(r.bin_start), e: i === a.length - 1 ? T : tS(r.bin_end), a: r.bin_start, b: i === a.length - 1 ? '5:01' : r.bin_end, last: i === a.length - 1, v: Object.fromEntries(GROUPS.map(g => [g.k, +r[g.k + '_per1k']])) }));
const PEAKS = { release: [['0:20', '国际地位、电影节'], ['0:10', '老片重映']], lit: [['0:40', '刘以鬯、新感觉派、改编策略']], love: [['1:10', '主题：情感的未完成状态'], ['1:00', '煽情的原理、影史参照']], revenge: [['1:40', '放弃复仇、“王家卫根本不懂《花样年华》”'], ['1:30', '赶工与没拍成的结尾']], repeat: [['2:10', '三对出轨与七次扮演'], ['2:20', '彩排']], acting: [['3:00', '梁朝伟的眼神、最后一次扮演'], ['3:10', '张曼玉']], form: [['3:50', '构图、顶灯、买面'], ['3:30', '旗袍、摄影']], shhk: [['4:10', '谁说上海话，全片所有组里最高的一格'], ['4:20', '食物、三趟快车']] };
const KW = (md.match(/- \*\*关键词组包含的词\*\*：(.+)/) || ['', ''])[1];
const HMAX = 35.13;
const heatA = (v, last) => v <= 0 ? 0 : (0.07 + 0.93 * Math.pow(Math.min(v, HMAX) / HMAX, 0.62)) * (last ? 0.45 : 1);
const TW = 1152;
const G2 = 'display: grid; grid-template-columns: 128px 1152px; column-gap: 16px;';
const xT = t => t / T * TW;
const heatGrad = (g, deg, sc) => `linear-gradient(${deg}deg, ${BINS.map(b => { const x0 = f1(sc(b.s)), x1 = f1(sc(b.e) - 1), x2 = f1(sc(b.e)); const al = heatA(b.v[g.k], b.last); return `${al ? rgba(g.c, al) : 'transparent'} ${x0}px ${x1}px, transparent ${x1}px ${x2}px`; }).join(', ')})`;
function cHead() {
  const relay = GROUPS.map(g => `<span style="display: inline-flex; align-items: center; gap: 7px; padding: 5px 10px; border: 1px solid ${C.rule2}; background: ${C.bg2}; font-size: 13.5px;">${swK(g.tone, 9, 9)}${g.name}<span style="font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${PEAKS[g.k][0][0]}</span></span>`).join(`<span style="color: ${C.faint};">→</span>`);
  return `<div id="relay" style="display: flex; flex-wrap: wrap; align-items: flex-end; gap: 12px 18px; padding-bottom: 14px; border-bottom: 1px solid ${C.rule3};">${door('C', false)}<h3 style="margin: 0; font-family: ${F.serif}; font-weight: 700; font-size: clamp(26px, 2.8vw, 34px);">话题接力</h3><span style="margin-left: auto; padding-bottom: 4px; font-size: 15px; color: ${C.sub};">每段时间在聊什么</span></div>
<div style="margin-top: 18px; max-width: 1100px; font-family: ${F.serif}; font-size: clamp(19px, 2vw, 23px); font-weight: 600; line-height: 1.6; text-wrap: pretty;">前一个小时谈名声和文学，第二个小时谈主题和复仇，第三个小时谈重复和表演，第四个小时谈手艺，最后一个小时谈上海和王家卫本人。</div>
<div style="margin-top: 14px; display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px;"><span style="font-size: 12.5px; color: ${C.cap};">八组按主峰出现的先后排列</span>${relay}</div>`;
}
function axisRow() {
  let a = '';
  for (let m = 0; m <= 300; m += 30) a += `<div style="position: absolute; left: ${f1(xT(m * 60))}px; top: 0; width: 1px; height: 6px; background: ${C.rule2};"></div><div style="position: absolute; left: ${f1(xT(m * 60))}px; top: 9px; ${m ? 'transform: translateX(-50%);' : ''} font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${fmtHM(m)}</div>`;
  a += `<div style="position: absolute; right: 0; top: 0; width: 1px; height: 6px; background: ${C.rule2};"></div><div style="position: absolute; right: 0; top: 24px; font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">5:01:42</div>`;
  return `<div style="position: relative; height: 42px; border-top: 1px solid ${C.rule2};">${a}</div>`;
}
const stTitle = s => esc(`${s.time} · 第 ${+s.clip} 段 ${s.ct} · ${s.label}`);
function bcDesktop() {
  const L1 = ST.filter(s => s.level === 1), L2 = ST.filter(s => s.level === 2);
  const lanes = [], pos = [];
  const fits = (k, l, r) => !(lanes[k] || []).some(([p, q]) => l < q + 4 && r + 4 > p);
  L1.forEach(s => { const x = xT(s.t), txt = SHORT[s.sec], w = Math.ceil(estW(txt, 11.5) + 18); const opts = [[x, x + w, true], [x - w, x, false]].filter(([l, r]) => l >= 0 && r <= TW); let k = 0, pick = null; while (!pick) { for (const o of opts) if (fits(k, o[0], o[1])) { pick = o; break; } if (!pick) k++; } (lanes[k] = lanes[k] || []).push([pick[0], pick[1]]); pos.push({ s, x, txt, left: pick[0], k, la: pick[2] }); });
  const NL = lanes.length, LH = 22, BASE = 18, H = NL * LH + BASE + 2;
  let leads = '', tags = '', ticks = '';
  pos.forEach(p => {
    const b = BASE + p.k * LH, k = SEC[p.s.sec].k;
    leads += `<div style="position: absolute; left: ${f1(p.x)}px; bottom: 0; width: 1px; height: ${b}px; background: ${C.rule2};"></div>`;
    tags += `<div title="${stTitle(p.s)}" style="position: absolute; left: ${f1(p.left)}px; bottom: ${b}px; height: 19px; box-sizing: border-box; border: 1px solid ${C.rule3}; ${p.la ? 'border-left' : 'border-right'}: 5px solid ${mk(k)}; background: ${C.bg2}; padding: 0 5px; font-size: 11.5px; line-height: 17px; white-space: nowrap; cursor: help;">${esc(p.txt)}</div>`;
  });
  L2.forEach(s => { ticks += `<div title="${stTitle(s)}" style="position: absolute; left: ${f1(xT(s.t) - 4.5)}px; bottom: 0; width: 9px; height: 15px; display: flex; justify-content: center; align-items: flex-end; cursor: help;"><span style="width: 1.5px; height: 9px; background: ${mk(SEC[s.sec].k)};"></span></div>`; });
  let clips = '';
  CL.forEach(c => { const l = xT(c.s), w = xT(c.e - c.s), t1 = c.title.split('｜')[0]; clips += `<div title="${esc('第 ' + c.n + ' 段 · 平台序号 ' + c.no + ' · ' + c.start + '–' + c.end + ' · ' + c.min + ' 分钟 · ' + c.title)}" style="position: absolute; top: 0; bottom: 0; left: ${f1(l)}px; width: ${f1(w)}px; padding: 0 1px; box-sizing: border-box; cursor: help;"><div style="height: 100%; box-sizing: border-box; border-style: solid; border-color: ${C.bar}; border-width: 6px 0; background: ${C.bg3}; box-shadow: inset 0 0 0 1px ${C.rule2}; padding: 5px 8px; overflow: hidden;" style-hover="background: #4A1D22;"><div style="display: flex; align-items: baseline; gap: 6px; white-space: nowrap;"><span style="font-family: ${F.mono}; font-size: 15px; font-weight: 600;">${+c.n}</span><span style="font-size: 10.5px; color: ${C.cap};">平台 ${c.no} · ${Math.round(c.min)}′</span></div><div style="margin-top: 3px; font-size: 11px; line-height: 1.4; color: ${C.fg2};">${esc(t1)}</div></div></div>`; });
  const a0 = xT(SEC.b14.s), a1 = xT(SEC.b22.s), a2 = xT(SEC.b32.e);
  const bracket = `<div style="position: absolute; left: ${f1(a0)}px; width: ${f1(a1 - a0)}px; bottom: 0; height: 9px; box-sizing: border-box; border-style: solid; border-color: ${C.loveM}; border-width: 2.5px 0 0 2.5px;"></div><div style="position: absolute; left: ${f1(a1)}px; width: ${f1(a2 - a1)}px; bottom: 0; height: 9px; box-sizing: border-box; border-style: solid; border-color: ${C.revM}; border-width: 2.5px 2.5px 0 0;"></div><div style="position: absolute; left: ${f1((a0 + a2) / 2)}px; bottom: 14px; transform: translateX(-50%); white-space: nowrap; font-family: ${F.serif}; font-size: 14px; font-weight: 700;"><span style="color: ${C.loveT};">先讲未完成的爱情</span>，<span style="color: ${C.revT};">再讲被放弃的复仇</span> <span style="font-family: ${F.mono}; font-size: 11px; font-weight: 400; color: ${C.cap};">0:55–2:07</span></div>`;
  let bands = '';
  SECS.forEach(s => { const l = xT(s.s), w = xT(s.e - s.s); bands += `<div title="${esc(s.name + ' · ' + s.start + ' 起 · ' + s.min + ' 分钟 · ' + s.share + '% · ' + TN[s.k])}" style="position: absolute; top: 0; bottom: 0; left: ${f1(l)}px; width: ${f1(w)}px; padding-right: 1.5px; box-sizing: border-box; cursor: help;"><div style="height: 100%; box-sizing: border-box; ${fillK(s.k)} padding: 6px 2px 0; overflow: hidden; text-align: center;">${w >= 22 ? `<span style="font-family: ${F.mono}; font-size: 10.5px; white-space: nowrap; ${s.k === 'revenge' ? `background: ${C.rev}; padding: 0 2px; color: #fff;` : `color: ${inkK(s.k)};`}">${Math.round(s.min)}′</span>` : ''}</div></div>`; });
  const r0 = xT(SEC.b22.s), r1 = xT(SEC.b32.e), e0 = xT(SEC.b39.s), e1 = xT(SEC.b39.e);
  const notes = `<div style="position: absolute; left: ${f1(r0)}px; width: ${f1(r1 - r0)}px; top: 2px; height: 7px; box-sizing: border-box; border-style: solid; border-color: ${C.revT}; border-width: 0 1.5px 1.5px;"></div><div style="position: absolute; left: ${f1((r0 + r1) / 2)}px; top: 14px; transform: translateX(-50%); white-space: nowrap; font-size: 12.5px; color: ${C.fg2};"><b style="color: ${C.revT};">②</b> 讲复仇的 11 个板块合计约 42 分钟，正好是第 3 段整段</div><div style="position: absolute; left: ${f1(e0)}px; width: ${f1(e1 - e0)}px; top: 2px; height: 7px; box-sizing: border-box; border-style: solid; border-color: ${C.glow}; border-width: 0 1.5px 1.5px;"></div><div style="position: absolute; left: ${f1(e0)}px; top: 14px; white-space: nowrap; font-size: 12.5px; ${GLOWTXT}"><b>③</b> 单个板块最长：耳环与电饭煲，11.8 分钟</div>`;
  const i0 = xT(SEC.b09.s), i1 = xT(SEC.b59.s);
  const inout = `<div style="position: absolute; left: 0; width: ${f1(i0)}px; top: 22px; height: 2px; background: ${C.rel};"></div><div style="position: absolute; left: ${f1(i0)}px; width: ${f1(i1 - i0)}px; top: 22px; height: 2px; background: ${C.fg2};"></div><div style="position: absolute; left: ${f1(i1)}px; right: 0; top: 22px; height: 2px; background: ${C.carT};"></div>${[[i0, '走进片内 0:37'], [i1, '走出片外 4:34']].map(([x, t]) => `<div style="position: absolute; left: ${f1(x - 1)}px; top: 15px; width: 2px; height: 16px; background: ${C.fg};"></div><div style="position: absolute; left: ${f1(x)}px; top: 32px; transform: translateX(-50%); white-space: nowrap; font-size: 12px; color: ${C.fg};">${t}</div>`).join('')}<div style="position: absolute; left: 0; top: 2px; font-size: 12px; color: ${C.relT}; white-space: nowrap;">片外：重映与名声</div><div style="position: absolute; left: ${f1((i0 + i1) / 2)}px; top: 2px; transform: translateX(-50%); font-size: 12px; color: ${C.fg}; white-space: nowrap;"><b>①</b> 片内：约四分之三的时间在讲这一部片</div><div style="position: absolute; right: 0; top: 2px; font-size: 12px; color: ${C.carT}; white-space: nowrap;">片外：王家卫</div>`;
  const labC = (t, sb, al = 'center') => `<div style="display: flex; flex-direction: column; justify-content: ${al}; gap: 4px;"><span style="font-size: 13px; letter-spacing: 0.12em; color: ${C.fg2};">${t}</span>${sb ? `<span style="font-size: 11.5px; line-height: 1.55; color: ${C.cap};">${sb}</span>` : ''}</div>`;
  const legend = ['release', 'origin', 'love', 'revenge', 'form', 'acting', 'craft', 'staging', 'career'].map(k => `<span style="display: inline-flex; align-items: center; gap: 6px;">${swK(k, 14, 10)}${TN[k]}</span>`).join('');
  let crows = '';
  GROUPS.forEach(g => {
    const peak = Math.max(...BINS.map(b => b.v[g.k]));
    let cells = `<div style="position: absolute; inset: 0; background: ${heatGrad(g, 90, xT)};"></div>`;
    const pk = PEAKS[g.k].map(([st, note], j) => { const b = BINS.find(x => x.a === st); return { b, v: b.v[g.k], note, j }; });
    pk.forEach(({ b, v, note, j }) => { cells += `<div title="${esc(g.name + ' · ' + b.a + '–' + b.b + ' · ' + v + ' · ' + note)}" style="position: absolute; top: -2px; bottom: -2px; left: ${f1(xT(b.s))}px; width: ${f1(xT(b.e - b.s))}px; box-sizing: border-box; border: ${j === 0 ? `2px solid ${C.fg}` : `1.5px dashed ${C.fg}`};"></div>`; });
    const m = pk[0], s2 = pk[1];
    const txt = `<span style="font-family: ${F.mono}; font-weight: 600;">${m.v.toFixed(1)}</span><span style="font-family: ${F.mono}; color: ${C.cap};">${m.b.a}–${m.b.b}</span><span>${esc(m.note)}</span>${s2 ? `<span style="color: ${C.cap};">· 次峰 <span style="font-family: ${F.mono};">${s2.b.a} ${s2.v.toFixed(1)}</span> ${esc(s2.note)}</span>` : ''}`;
    const xs = xT(m.b.s), right = xs + 470 > TW;
    const note = `<div style="position: absolute; ${right ? `right: ${f1(TW - xT(m.b.e))}px` : `left: ${f1(xs)}px`}; bottom: 4px; display: flex; gap: 6px; align-items: baseline; white-space: nowrap; font-size: 12px; color: ${C.fg};">${txt}</div>`;
    crows += `<div style="${G2}"><div style="display: flex; align-items: center; gap: 8px; padding-top: 22px;">${swK(g.tone, 10, 10)}<div><div style="font-family: ${F.serif}; font-size: 14px; font-weight: 600; line-height: 1.3;">${g.name}</div><div style="font-size: 11px; color: ${C.cap};">峰值 ${peak.toFixed(1)}</div></div></div><div style="position: relative; height: 58px;"><div style="position: absolute; left: 0; right: 0; top: 0; height: 22px;">${note}</div><div style="position: absolute; left: 0; right: 0; top: 22px; bottom: 4px; background: rgba(244,232,212,0.035);">${cells}</div></div></div>`;
  });
  return `<div style="margin-top: 36px; overflow-x: auto; padding-bottom: 8px;"><div style="width: 1296px;">
<div style="${G2}">${labC('站点', `方框是 ${N1} 个板块的起点，贴着时间轴的短刻度是 ${NST - N1} 个细节站点。悬停可看全片时间和第几段的几分几秒`, 'flex-end')}<div style="position: relative; height: ${H}px;">${leads}${ticks}${tags}</div></div>
<div style="${G2} margin-top: 6px;">${labC('平台 8 段', '格宽等于该段时长；写平台标题的前半句')}<div style="position: relative; height: 92px;">${clips}</div></div>
<div style="${G2}"><div></div><div style="position: relative; height: 40px;">${bracket}</div></div>
<div style="${G2}">${labC('67 个板块', '按节目里的过渡句切分；数字是分钟')}<div style="position: relative; height: 50px;">${bands}</div></div>
<div style="${G2}"><div></div><div style="position: relative; height: 38px;">${notes}</div></div>
<div style="${G2} margin-top: 6px;">${labC('片外与片内', '')}<div style="position: relative; height: 52px;">${inout}</div></div>
<div style="${G2} margin-top: 8px;"><div></div><div style="display: flex; flex-wrap: wrap; gap: 6px 18px; font-size: 12.5px; color: ${C.cap};">${legend}</div></div>
<div style="${G2} margin-top: 6px;"><div></div><div style="font-size: 12.5px; color: ${C.cap};">8 段各含的板块数：10、12、11、8、6、6、6、8。</div></div>
<div style="${G2} margin-top: 12px;"><div style="font-size: 12px; color: ${C.cap};">全片时间</div>${axisRow()}</div>
</div></div>
<div style="margin-top: 52px;">${cHead()}</div>
<div style="margin-top: 14px; overflow-x: auto; padding-bottom: 8px;"><div style="width: 1296px;">
<div>${crows}</div>
<div style="${G2} margin-top: 6px;"><div style="font-size: 12px; color: ${C.cap};">全片时间</div>${axisRow()}</div>
<div style="${G2} margin-top: 2px;"><div></div><div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px; font-size: 12px; color: ${C.cap};"><span style="font-family: ${F.mono};">0</span><span style="width: 160px; height: 10px; background: linear-gradient(90deg, rgba(244,232,212,0.07), ${C.fg});"></span><span style="font-family: ${F.mono};">35.1</span><span>每千字出现次数，八行同一色阶；实线框为各组的峰，虚线框为第二个峰；最后一格只有 1 分 42 秒，颜色已减淡</span></div></div>
</div></div>`;
}
function bcMobile() {
  const H = 1900, k = H / T;
  const X = { clip: 36, sec: 62, heat: 74, lead: 156, lab: 178 };
  let h = '';
  for (let m = 0; m <= 300; m += 30) { const y = m * 60 * k; h += `<div style="position: absolute; left: 0; top: ${f1(y)}px; transform: translateY(-50%); font-family: ${F.mono}; font-size: 11px; color: ${C.cap};">${fmtHM(m)}</div><div style="position: absolute; left: ${X.clip}px; width: ${X.lead - X.clip}px; top: ${f1(y)}px; height: 1px; background: ${C.rule};"></div>`; }
  CL.forEach(c => { const y = c.s * k, dy = (c.e - c.s) * k; h += `<div style="position: absolute; left: ${X.clip}px; width: 22px; top: ${f1(y)}px; height: ${f1(dy)}px; padding: 1px 0; box-sizing: border-box;"><div style="height: 100%; box-sizing: border-box; border: 1px solid ${C.rule3}; background: ${C.bg3}; display: flex; align-items: center; justify-content: center; font-family: ${F.mono}; font-size: 11px; font-weight: 600;">${+c.n}</div></div>`; });
  SECS.forEach(s => { h += `<div style="position: absolute; left: ${X.sec}px; width: 9px; top: ${f1(s.s * k)}px; height: ${f1((s.e - s.s) * k - 1.5)}px; ${s.k === 'revenge' ? `background: repeating-linear-gradient(0deg, ${C.rev} 0 4px, #0A2219 4px 5.5px);` : `background: ${TC[s.k]};`}"></div>`; });
  GROUPS.forEach((g, j) => { h += `<div style="position: absolute; left: ${X.heat + j * 10}px; width: 9px; top: 0; height: ${f1(T * k)}px; background: ${heatGrad(g, 180, t => t * k)};"></div>`; });
  const pk0 = SEC.b14.s * k, pk1 = SEC.b22.s * k, pk2 = SEC.b32.e * k;
  h += `<div style="position: absolute; left: 30px; width: 5px; top: ${f1(pk0)}px; height: ${f1(pk1 - pk0)}px; box-sizing: border-box; border: 2px solid ${C.loveM}; border-right: none;"></div><div style="position: absolute; left: 30px; width: 5px; top: ${f1(pk1)}px; height: ${f1(pk2 - pk1)}px; box-sizing: border-box; border: 2px solid ${C.revM}; border-right: none;"></div>`;
  const items = SECS.map(s => ({ s, y: s.s * k, h: Math.ceil(estW(s.name + ' 00′', 14) / 180) * 19 + 10 }));
  const out = []; let prev = -1e9;
  items.forEach(it => { const top = Math.max(0, it.y - it.h / 2, prev); out.push(top); prev = top + it.h + 3; });
  const HH = Math.max(H, prev + 10);
  let svg = '', labs = '';
  items.forEach((it, i) => {
    const cy = out[i] + 10;
    svg += `<line x1="0" y1="${f1(it.y)}" x2="22" y2="${f1(cy)}" stroke="${mk(it.s.k)}" strokeOpacity="0.6" strokeWidth="1"></line>`;
    labs += `<div style="position: absolute; left: ${X.lab}px; right: 0; top: ${f1(out[i])}px; padding-top: 4px; border-top: 2px solid ${mk(it.s.k)}; font-family: ${F.serif}; font-size: 14px; font-weight: 700; line-height: 1.35;">${esc(it.s.name)} <span style="font-family: ${F.mono}; font-size: 11px; font-weight: 400; color: ${C.cap};">${it.s.min}′</span></div>`;
  });
  const leg = GROUPS.map(g => `<span style="display: inline-flex; align-items: center; gap: 6px;">${swK(g.tone, 9, 9)}${g.name}</span>`).join('');
  return `<div style="margin-top: 28px; display: grid; gap: 8px; font-size: 14px; line-height: 1.6; color: ${C.fg2};"><div><b>①</b> 约四分之三的时间在讲这一部片（0:37 走进片内，4:34 走出片外）。</div><div><b style="color: ${C.revT};">②</b> 讲复仇的 11 个板块合计约 42 分钟，正好是第 3 段整段。</div><div style="${GLOWTXT}"><b>③</b> 单个板块最长的是耳环与电饭煲，11.8 分钟。</div></div>
<div style="margin-top: 28px;">${cHead()}</div>
<div style="margin-top: 18px; display: flex; flex-wrap: wrap; gap: 6px 14px; font-size: 12.5px; color: ${C.fg2};">${leg}</div>
<p style="${S.cap}">左起：全片时间、平台 8 段、板块颜色（左侧红绿括号是先爱情、后复仇的 0:55–2:07）、八组话题的热度（从左到右与上面图例同序，越亮该组关键词每千字出现越多）、板块名。各站点见下方“按段落回听”。</p>
<div style="position: relative; height: ${f1(HH)}px; margin: 26px 0 12px;">${h}<svg width="22" height="${f1(HH)}" style="position: absolute; left: ${X.lead}px; top: 0; overflow: visible;">${svg}</svg>${labs}</div>`;
}
function stationList() {
  let h = '';
  CL.forEach(c => {
    const [t1, t2] = c.title.split('｜');
    const rows = ST.filter(s => s.clip === c.n).map(s => {
      const k = SEC[s.sec].k, one = s.level === 1;
      return `<div style="display: ${one ? 'grid' : '{{ stMinorGrid }}'}; grid-template-columns: 56px 40px 8px minmax(0, 1fr); gap: 8px; align-items: baseline; padding: 4px 0; font: 12px/1.55 ${F.mono}; color: ${C.cap};"><span>${s.time}</span><span>${s.ct}</span><span style="width: 8px; height: 8px; align-self: center; ${fillK(k)}"></span><span style="font: ${one ? `600 15px/1.55 ${F.serif}; color: ${C.fg}` : `14px/1.55 ${F.sans}; color: ${C.sub}`};">${esc(s.label)}</span></div>`;
    }).join('');
    h += `<div style="break-inside: avoid; margin-bottom: 22px; background: ${C.bg2}; border: 1px solid ${C.rule2};"><div style="display: grid; grid-template-columns: 58px minmax(0, 1fr); border-bottom: 1px solid ${C.rule2}; background: ${C.bg3};"><div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; background: ${C.bar}; color: ${C.fg};"><span style="font-size: 11px; letter-spacing: 0.1em; line-height: 1;">第</span><span style="font-family: ${F.mono}; font-size: 22px; font-weight: 600; line-height: 1;">${+c.n}</span><span style="font-size: 11px; letter-spacing: 0.1em; line-height: 1;">段</span></div><div style="padding: 10px 14px;"><div style="font-family: ${F.serif}; font-size: 15.5px; font-weight: 700; line-height: 1.45; text-wrap: pretty;">${esc(t1)}</div><div style="margin-top: 3px; font-size: 12.5px; line-height: 1.55; color: ${C.sub};">${esc(t2 || '')}</div><div style="margin-top: 3px; font-family: ${F.mono}; font-size: 11.5px; color: ${C.cap};">平台序号 ${c.no} · ${c.start}–${c.end} · ${c.min}′</div></div></div><div style="padding: 8px 14px 10px;">${rows}</div></div>`;
  });
  return `<div style="margin-top: 60px; display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px 20px; padding-bottom: 12px; border-bottom: 1px solid ${C.rule2};"><h3 style="margin: 0; font-family: ${F.serif}; font-size: 24px; font-weight: 700;">按段落回听</h3><span style="font-size: 13.5px; color: ${C.cap};">每行依次是全片时间、该段内的时间、站点；宋体为 ${N1} 个板块的起点，其余为细节站点</span><div role="button" onClick="{{ toggleSt }}" style="margin-left: auto; ${S.btn} background: ${C.bg2}; color: ${C.fg};" style-hover="background: ${C.fg}; color: ${C.bg};">{{ stBtn }}</div></div>
<div style="margin-top: 22px; columns: 320px; column-gap: 24px;">${h}</div>`;
}
function sectionB() {
  return `${secOpen('map', 'B', '节目地图')}${head('B', '节目地图', '五个小时怎么走的')}
<p style="${S.intro}">先用约 37 分钟讲重映、地位和国际声誉；约 18 分钟讲创作缘起和文学积累；约 72 分钟讲类型、主题和复仇构思；约 48 分钟讲重复、扮演、留白和穿帮；约 31 分钟讲表演；约 29 分钟讲美术、摄影和剪辑；约 39 分钟讲两场场面调度和片中的上海元素；最后约 27 分钟讲结尾和王家卫本人。这一期只聊一部电影，是一次切片：从片外走进片内，最后再走出来。</p>
<div style="${S.lead}">约四分之三的时间在讲这一部片。<span style="font-family: ${F.sans}; font-size: 14px; font-weight: 400; color: ${C.cap};">（整理者按板块估算：约 230 分钟讲片子本身，约 71 分钟讲重映、声誉、文学和王家卫本人）</span></div>
${WIDE(`<div>${bcDesktop()}<p style="${S.cap}">条宽按时长等比。板块按节目里的过渡句切分，误差约一分钟；板块名、八个内容类别和“爱情／复仇”的划分为整理者所加。话题热度每 10 分钟一格，用每千字出现次数而不是次数。“上海”“香港”在讲人物背景时出现得极密，所以第八组的峰特别高；“喜欢”既是爱情词也是日常用语，“爱情与未完成”的数值偏高一些。各组关键词——${esc(KW)}</p></div>`)}
${NARROW(`<div>${bcMobile()}<p style="${S.cap}">板块名、内容类别和“爱情／复仇”的划分为整理者所加。各组关键词——${esc(KW)}</p></div>`)}
${stationList()}
</section>`;
}

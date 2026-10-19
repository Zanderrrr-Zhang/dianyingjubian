const MD = 'src/episodes/hjx08/handoff.md';
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
const D = {}; for (let i = 1; i <= 20; i++) D[i] = blks('D' + i);
const D20 = mdTable('D20');
const hms = s => { const p = s.split(':').map(Number); return p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + p[1]; };
const hm = s => { const [h, m] = s.split(':').map(Number); return h * 3600 + m * 60; };
const T = hms('5:53:10');
const TERMS = (() => { const a = md.indexOf('**需要解释给读者的术语**'), b = md.indexOf('**时间戳的口径**'); return md.slice(a, b).split('\n').filter(l => /^\s+- /.test(l)).map(l => { const t = l.replace(/^\s+- /, ''); const i = t.indexOf('：'); return [t.slice(0, i), t.slice(i + 1)]; }); })();
const KW = (() => { const a = md.indexOf('**关键词组包含的词**：'); return md.slice(a + '**关键词组包含的词**：'.length).split('\n')[0].trim(); })();

const C = { ink: '#1B1B1B', ink2: '#2C2B28', paper: '#F2EFE8', card: '#FBFAF6', deep: '#E6E0D2', wall: '#E9E5DC', muted: '#4A4842', cap: '#5F5C55', faint: '#8F8B82', rule: 'rgba(27,27,27,0.14)', rule2: 'rgba(27,27,27,0.3)' };
const PH = { overview: '#E6E0D2', life: '#A47A4B', pioneer: '#D4572A', city: '#6E7B85', turn: '#A3A39A', mind: '#2E4A73', main: '#5B4E6E', close: '#222222' };
const PHT = { overview: '#8F8B82', life: '#A47A4B', pioneer: '#D4572A', city: '#6E7B85', turn: '#85857C', mind: '#2E4A73', main: '#5B4E6E', close: '#222222' };
const PHN = { overview: '总论', life: '生平与西影', pioneer: '先锋三部曲', city: '城市三部曲与《五魁》', turn: '转向', mind: '心理三部曲', main: '监制与主旋律', close: '演员与总评' };
const PHD = { overview: '纸白：会议室的白', life: '黄土：西安', pioneer: '橘红：《黑炮事件》里重新上色的机器', city: '青砖灰：住宅楼、文化馆、城墙', turn: '水泥灰：水塔', mind: '深蓝：《轮回》最后的幻灭', main: '铅紫', close: '墨黑：会议室里的那只黑钟' };
const PHK = Object.keys(PH);
const LIGHT = new Set(['overview', 'life', 'turn']);
const onPH = p => LIGHT.has(p) ? C.ink : '#fff';
const KN = { film: '作品分析', era: '时代背景', life: '生平与产业', idea: '理论与总评' };
const KCLIP = { film: '', era: 'clip-path: polygon(50% 0, 100% 100%, 0 100%);', life: 'border-radius: 50%;', idea: 'clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);' };
const F = { serif: "'Noto Serif SC', serif", sans: "'Noto Sans SC', sans-serif", mono: "'IBM Plex Mono', 'Noto Sans SC', monospace", type: "'Courier Prime', 'Courier New', monospace" };
const PAD = 'clamp(20px, 5vw, 72px)';
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const f1 = n => (+n).toFixed(1);
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${(+a).toFixed(3)})`; };
const estW = (s, p = 12) => [...String(s)].reduce((a, ch) => a + (ch.charCodeAt(0) < 128 ? p * 0.6 : p), 0);
const fmtHM = m => Math.floor(m / 60) + ':' + String(m % 60).padStart(2, '0');
const mono = s => `<span style="font-family: ${F.mono};">${s}</span>`;
const WIDE = s => `<sc-if value="{{ isWide }}" hint-placeholder-val="{{ true }}">${s}</sc-if>`;
const NARROW = s => `<sc-if value="{{ isNarrow }}" hint-placeholder-val="{{ false }}">${s}</sc-if>`;
const S = {
  h2: `margin: 0; font-family: ${F.serif}; font-weight: 700; font-size: clamp(28px, 3.4vw, 44px); line-height: 1.2; letter-spacing: 0.02em;`,
  h3: `margin: 0; font-family: ${F.serif}; font-size: 20px; font-weight: 700; line-height: 1.4;`,
  intro: `margin: 22px 0 0; max-width: 900px; font-size: 16.5px; line-height: 1.9; color: ${C.ink2}; text-wrap: pretty;`,
  lead: `margin: 20px 0 0; max-width: 1100px; font-family: ${F.serif}; font-size: clamp(19px, 2vw, 24px); font-weight: 600; line-height: 1.65; text-wrap: pretty;`,
  cap: `margin: 14px 0 0; max-width: 1080px; font-size: 12.5px; line-height: 1.8; color: ${C.cap}; text-wrap: pretty;`,
  body: `font-size: 14.5px; line-height: 1.8; color: ${C.ink2}; text-wrap: pretty;`,
  sm: `font-size: 13px; line-height: 1.7; color: ${C.ink2}; text-wrap: pretty;`,
  btn: `user-select: none; font-family: ${F.sans}; font-size: 13px; letter-spacing: 0.04em; padding: 7px 14px; border: 1px solid ${C.ink}; background: ${C.card}; color: ${C.ink}; cursor: pointer;`,
  btnH: `background: ${C.ink}; color: ${C.paper};`,
  chip: `display: inline-flex; align-items: center; gap: 5px; padding: 0 7px; border: 1px solid ${C.rule2}; font-size: 11.5px; line-height: 1.7; letter-spacing: 0.03em; color: ${C.cap}; white-space: nowrap;`,
  card: `background: ${C.card}; border: 1px solid ${C.ink};`,
  lab: `font-size: 12px; letter-spacing: 0.08em; color: ${C.cap};`,
  ttl: `font-family: ${F.serif}; font-size: 16.5px; font-weight: 700; line-height: 1.45;`
};
const hatchLine = p => LIGHT.has(p) ? 'rgba(27,27,27,0.45)' : 'rgba(255,255,255,0.55)';
const phBgV = (p, era) => era ? `repeating-linear-gradient(135deg, transparent 0 3px, ${hatchLine(p)} 3px 4.5px), ${PH[p]}` : PH[p];
const phBg = (p, era) => `background: ${phBgV(p, era)};`;
const BTAGS = [], BBLK = [], MBLK = [];
const phEdge = p => p === 'overview' ? `box-shadow: inset 0 0 0 1px ${C.ink};` : '';
const sw = (p, w = 14, h = 10, era) => `<span style="display: inline-block; flex: none; width: ${w}px; height: ${h}px; ${phBg(p, era)} ${phEdge(p)}"></span>`;
const shape = (k, z = 9, col = C.ink) => `<span style="display: inline-block; flex: none; width: ${z}px; height: ${z}px; background: ${col}; ${KCLIP[k]}"></span>`;
const tier = (t, z = 11) => t == null ? `<span style="display: inline-flex; align-items: center; gap: 2px;">${[0, 1, 2, 3, 4].map(() => `<span style="width: ${z}px; height: ${z}px; box-sizing: border-box; border: 1px dashed ${C.faint};"></span>`).join('')}<span style="margin-left: 6px; font-size: 11.5px; color: ${C.cap};">节目没有评价</span></span>` : `<span title="第 ${t} 档" style="display: inline-flex; align-items: center; gap: 2px;">${[1, 2, 3, 4, 5].map(i => `<span style="width: ${z}px; height: ${z}px; box-sizing: border-box; border: 1px solid ${C.ink}; background: ${i <= t ? C.ink : 'transparent'};"></span>`).join('')}<span style="margin-left: 6px; font-family: ${F.mono}; font-size: 11.5px; color: ${C.cap};">${t}/5</span></span>`;
const clock = (z = 28) => `<svg viewBox="0 0 40 40" style="flex: none; display: block; width: ${typeof z === 'number' ? z + 'px' : z}; height: ${typeof z === 'number' ? z + 'px' : z};"><circle cx="20" cy="20" r="20" fill="${C.ink}"></circle><path d="M20 20 V7.5 M20 20 L29 25" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" fill="none"></path></svg>`;
const clockNote = (text, whoS, size = 20) => `<div style="display: flex; gap: 16px; align-items: flex-start;">${clock(size + 18)}<div><div style="font-family: ${F.serif}; font-size: ${size}px; font-weight: 700; line-height: 1.55; text-wrap: pretty;">${text}</div>${whoS ? `<div style="margin-top: 6px; font-size: 12.5px; color: ${C.cap};">—— ${esc(whoS)}</div>` : ''}</div></div>`;
const domino = (col, w, h, rot = 0, line = 'rgba(27,27,27,0.55)', ex = '') => `<span style="flex: none; display: block; width: ${w}; height: ${h}; box-sizing: border-box; border: 1.5px solid ${C.ink}; background: linear-gradient(${line}, ${line}) 50% 50% / 62% 1.5px no-repeat, ${col}; transform-origin: 100% 100%; ${rot ? `transform: rotate(${rot}deg);` : ''} ${ex}"></span>`;
const domRow = (n, col = C.card, w = '10px', h = '24px', gap = 9) => `<div style="display: flex; align-items: flex-end; gap: ${gap}px;">${Array.from({ length: n }, (_, i) => domino(col, w, h, i === n - 1 ? 62 : 0)).join('')}</div>`;
const seamOld = () => `<div aria-hidden="true" style="padding: clamp(56px, 7vw, 92px) ${PAD} 0; display: flex; align-items: flex-end; gap: 18px;"><span style="flex: 1; height: 1px; background: ${C.rule2};"></span>${domRow(9)}<span style="width: 26px;"></span></div>`;
const dividerOld = (label, sub2) => `<div aria-hidden="true" style="margin-top: clamp(72px, 9vw, 120px); padding: 40px ${PAD} 44px; background: ${C.wall}; border-top: 1px solid ${C.ink}; border-bottom: 1px solid ${C.ink};"><div style="display: flex; align-items: flex-end; justify-content: center; gap: 22px;"><span style="flex: 1; height: 1px; background: ${C.ink};"></span>${domRow(13, C.card, '13px', '34px', 11)}<span style="width: 30px;"></span><span style="flex: 1; height: 1px; background: ${C.ink};"></span></div><div style="margin-top: 18px; text-align: center; font-family: ${F.serif}; font-size: 21px; font-weight: 700; letter-spacing: 0.18em;">${label}</div><div style="margin-top: 6px; text-align: center; font-size: 13px; color: ${C.cap};">${sub2}</div></div>`;
const CL = D[2][0].map(r => ({ n: +r.clip, no: r.platform_no, title: r.title, s: hms(r.start), e: hms(r.end), min: r.minutes, start: r.start, end: r.end }));
const clipOf = t => CL.find(c => t >= c.s && t < c.e) || CL[CL.length - 1];
const SECS = D[1][0].map(r => ({ id: r.id, name: r.section, s: hms(r.start), e: hms(r.end), min: +r.minutes, share: +r.share_pct, ph: r.phase, kind: r.kind, work: r.work, clip: +r.clip }));
const SEC = Object.fromEntries(SECS.map(s => [s.id, s]));
const phAt = t => (SECS.find(s => t >= s.s && t < s.e) || SECS[SECS.length - 1]).ph;
const ST = D[3][0].map(r => ({ t: hms(r.time), time: r.time, clip: +r.clip, ct: r.clip_time, label: r.label, sec: r.section, level: +r.level }));
const L1 = ST.filter(s => s.level === 1), L2 = ST.filter(s => s.level === 2);
const N1 = L1.length, NST = ST.length;
const PHR = []; SECS.forEach(s => { const l = PHR[PHR.length - 1]; if (l && l.ph === s.ph) l.e = s.e; else PHR.push({ ph: s.ph, s: s.s, e: s.e }); }); PHR.forEach(r => r.min = (r.e - r.s) / 60);
const WSP = []; SECS.forEach(s => { if (!s.work) return; const l = WSP[WSP.length - 1]; if (l && l.work === s.work && l.e === s.s) l.e = s.e; else WSP.push({ work: s.work, s: s.s, e: s.e, ph: s.ph }); }); WSP.forEach(w => { w.min = (w.e - w.s) / 60; w.name = w.work === '建党伟业等' ? '《建党伟业》等' : '《' + w.work + '》'; });
const ACC = { G: 'life', H: 'pioneer', I: 'pioneer', J: 'city', K: 'turn', L: 'mind', M: 'main', N: 'close', O: 'close', F: 'close' };
const PLATE = { D: '0:31:02', F: '5:44:27', G: '0:23:05', H: '0:50:16', I: '1:29:52', J: '2:16:18', K: '3:32:10', L: '4:04:21', M: '4:55:24', N: '5:25:25', O: '5:39:28' };
function door(L) {
  const bg = C.card, fg = C.ink;
  return `<span style="flex: none; position: relative; width: 46px; height: 66px; box-sizing: border-box; border: 1.5px solid ${C.ink}; border-bottom-width: 5px; background: ${bg}; color: ${fg}; display: flex; align-items: center; justify-content: center; font-family: ${F.type}; font-size: 27px; font-weight: 700; padding-bottom: 8px;">${L}<span style="position: absolute; right: 6px; top: 38px; width: 5px; height: 5px; border-radius: 50%; background: ${fg};"></span></span>`;
}
function plate(full) {
  const t = hms(full), c = clipOf(t), ct = t - c.s;
  return `<span title="从这里开始听" style="flex: none; display: inline-flex; flex-direction: column; align-items: center; padding: 5px 12px 6px; margin-bottom: 4px; background: ${C.card}; border: 1.5px solid ${C.ink}; line-height: 1.1;"><span style="font-family: ${F.serif}; font-size: 14.5px; font-weight: 700;">第 ${c.n} 段 ${Math.floor(ct / 60)}:${String(ct % 60).padStart(2, '0')}</span><span style="margin-top: 3px; font-family: ${F.mono}; font-size: 11px; color: ${C.cap};">全片 ${full}</span></span>`;
}
function headOld(L, title, q) {
  return `<div style="display: flex; flex-wrap: wrap; align-items: flex-end; gap: 12px 20px; padding-bottom: 16px; border-bottom: 2px solid ${C.ink};">${door(L)}<h2 style="${S.h2}">${title}</h2>${PLATE[L] ? plate(PLATE[L]) : ''}<span style="margin-left: auto; padding-bottom: 6px; font-size: 14.5px; color: ${C.muted};">${q}</span></div>`;
}
const secOpenOld = (id, L, title) => `<section id="${id}" data-screen-label="${L} ${title}" style="padding: clamp(48px, 6vw, 80px) ${PAD} 0;">`;
const sub = (title, note) => `<div style="display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 16px; padding-bottom: 9px; border-bottom: 1px solid ${C.ink};"><h3 style="${S.h3}">${title}</h3>${note ? `<span style="font-size: 12.5px; color: ${C.cap};">${note}</span>` : ''}</div>`;
const block = (title, note, inner, mt = 52) => `<div style="margin-top: ${mt}px;">${sub(title, note)}${inner}</div>`;
const quote = (text, whoS, size = 20) => `<figure style="margin: 0; padding: 14px 0 0; border-top: 1px solid ${C.ink};"><blockquote style="margin: 0; font-family: ${F.serif}; font-size: ${size}px; font-weight: 600; line-height: 1.6; text-wrap: pretty;">“${esc(text)}”</blockquote><figcaption style="margin-top: 7px; font-size: 12.5px; color: ${C.cap};">—— ${esc(whoS)}</figcaption></figure>`;
const chip = t => `<span style="${S.chip}">${esc(t)}</span>`;
const cap = t => `<p style="${S.cap}">${t}</p>`;
const grid = (min, inner, gap = '14px', mt = 18) => `<div style="margin-top: ${mt}px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, ${min}px), 1fr)); gap: ${gap}; align-items: stretch;">${inner}</div>`;
const card = (inner, ex = '') => `<div style="${S.card} padding: 14px 16px 16px; ${ex}">${inner}</div>`;
const tc = (title, text, ex = '', tag = '') => card(`${tag ? `<div style="margin-bottom: 6px;">${chip(tag)}</div>` : ''}<div style="${S.ttl}">${title}</div>${text ? `<div style="margin-top: 6px; ${S.sm}">${text}</div>` : ''}`, ex);
const arrowR = (c = C.ink) => `<span aria-hidden="true" style="flex: none; align-self: center; width: 20px; height: 12px; background: ${c}; clip-path: polygon(0 42%, 64% 42%, 64% 0, 100% 50%, 64% 100%, 64% 58%, 0 58%);"></span>`;
const arrowD = (c = C.ink) => `<span aria-hidden="true" style="display: block; margin: 0 auto; width: 12px; height: 20px; background: ${c}; clip-path: polygon(42% 0, 58% 0, 58% 64%, 100% 64%, 50% 100%, 0 64%, 42% 64%);"></span>`;
const pair = (a, b, la = '一位主持人', lb = '另一位主持人', mid = '') => `<div style="margin-top: 16px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 12px;">${card(`<div style="${S.lab}">${esc(la)}</div><div style="margin-top: 6px; ${S.body}">${esc(a)}</div>`)}${card(`<div style="${S.lab}">${esc(lb)}</div><div style="margin-top: 6px; ${S.body}">${esc(b)}</div>`)}</div>${mid ? `<div style="margin-top: 8px; font-size: 13px; color: ${C.cap};">${mid}</div>` : ''}`;
const chain = (items, horiz = true) => horiz ? `<div style="margin-top: 18px; display: flex; flex-wrap: wrap; align-items: stretch; gap: 8px;">${items.map((t, i) => `${i ? arrowR() : ''}<div style="flex: 1 1 150px; min-width: 0; ${S.card} padding: 10px 12px; ${S.sm}">${t}</div>`).join('')}</div>` : `<div style="margin-top: 16px; display: grid; gap: 6px; max-width: 760px;">${items.map((t, i) => `${i ? arrowD(C.faint) : ''}<div style="${S.card} padding: 10px 14px; ${S.sm}">${t}</div>`).join('')}</div>`;
const bullets = items => `<ul style="margin: 12px 0 0; padding: 0; list-style: none; display: grid; gap: 7px;">${items.map(t => `<li style="display: grid; grid-template-columns: 14px minmax(0, 1fr); gap: 8px; ${S.sm}"><span style="margin-top: 8px; width: 6px; height: 6px; background: ${C.ink};"></span><span>${t}</span></li>`).join('')}</ul>`;
const W5 = D[5][0].works;
const WK = id => W5.find(w => w.id === id);

// ===== A cover
function cover() {
  const seq = ['w01', 'w02', 'w03', 'w04', 'w05', 'w06', 'w07', 'w08', 'w09', 'w10', 'w11', 'w12', 'w13'].map(WK);
  const toc = [['map', 'B', '节目地图'], ['relay', 'C', '话题接力'], ['career', 'D', '从批判到加入'], ['cuowei', 'E', '错位'], ['xiying', 'G', '一个边缘厂'], ['heipao', 'H', '两架机器'], ['robot', 'I', '机器人与倒爷'], ['city', 'J', '权、钱、文化'], ['ambush', 'K', '荒诞的正能量'], ['mind', 'L', '没有能力把握这个时代'], ['producer', 'M', '全军覆没'], ['actors', 'N', '形象第一'], ['absurd', 'O', '中国的荒诞'], ['eras', 'P', '时代小课'], ['debate', 'Q', '他们在哪里看法不同'], ['power', 'F', '知识分子与权力'], ['mentions', 'R', '谁被提得最多']];
  const meta = [['节目', '《电影巨辩》'], ['专辑', '付费专辑《为了华语电影》'], ['本集', '第 8 集《黄建新与体制》'], ['主持', '老马（magasa）、阿吴（LOOK）'], ['录制', '2025 年'], ['时长', mono('5:53:10')], ['分段', '平台上切成 10 段（序号 81–90），内容是一期'], ['作品', '十二部个人长片、四部主旋律、两部短片']];
  const band = `<div style="display: flex; height: 10px; border-bottom: 1px solid ${C.ink};">${PHR.map(r => `<span title="${esc(PHN[r.ph] + ' ' + f1(r.min) + ' 分钟')}" style="flex: ${f1(r.min)} 1 0; ${phBg(r.ph)}"></span>`).join('')}</div>`;
  const seats = n => `<div style="display: flex; justify-content: space-around; padding: 0 3%;">${Array.from({ length: n }, () => `<span style="flex: none; width: clamp(9px, 1.3vw, 17px); height: clamp(9px, 1.3vw, 17px); border-radius: 50%; box-sizing: border-box; border: 1.5px solid ${C.ink}; background: ${C.paper};"></span>`).join('')}</div>`;
  const doms = seq.map((w, i) => `<span title="${esc(w.year + ' ' + w.title)}" style="display: block; flex: none;">${domino(PH[w.phase], 'clamp(9px, 1.9vw, 26px)', 'clamp(38px, 6.2vw, 84px)', i === seq.length - 1 ? 54 : 0, LIGHT.has(w.phase) ? 'rgba(27,27,27,0.6)' : 'rgba(255,255,255,0.75)')}</span>`).join('');
  const table = `<div style="margin-top: clamp(40px, 5vw, 64px); display: flex; align-items: center; gap: clamp(10px, 2vw, 26px);">${clock('clamp(34px, 5vw, 70px)')}<div style="flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 10px;">${seats(13)}<div style="height: clamp(104px, 13vw, 180px); box-sizing: border-box; background: ${C.card}; border: 1.5px solid ${C.ink}; display: flex; align-items: flex-end; justify-content: center; gap: clamp(4px, 1.1vw, 15px); padding: 0 4% clamp(16px, 2.6vw, 36px);">${doms}</div>${seats(13)}</div></div>
<div style="margin-top: 14px; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 6px 14px; font-size: 13.5px;"><span style="display: inline-flex; align-items: center; gap: 6px;">${sw('pioneer')}${mono('1985')}《黑炮事件》</span><span style="color: ${C.faint};">——</span><span style="display: inline-flex; align-items: center; gap: 6px;">${sw('mind')}${mono('2005')}《求求你表扬我》</span><span style="color: ${C.faint};">——</span><span style="display: inline-flex; align-items: center; gap: 6px;">${sw('main')}${mono('2009')}《建国大业》</span></div>
<p style="${S.cap} text-align: center; margin-left: auto; margin-right: auto;">俯视的一张长条会议桌，桌头一只黑钟。桌上十三块骨牌是他从《黑炮事件》到《建国大业》的十三部电影，按年份排，颜色是各自所属的阶段；最后一块正在倒下。</p>`;
  const archive = `<div style="flex: 0 1 360px; min-width: 0; ${S.card}"><div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; border-bottom: 1.5px solid ${C.ink}; font-size: 12px; letter-spacing: 0.2em;"><span>节目档案</span><span style="font-family: ${F.type}; font-size: 14px; letter-spacing: 0.04em;">No. 08</span></div>${meta.map(([k, v]) => `<div style="display: grid; grid-template-columns: 50px minmax(0, 1fr); gap: 12px; padding: 8px 20px; border-bottom: 1px solid ${C.rule}; font-size: 14px; line-height: 1.65;"><span style="color: ${C.cap};">${k}</span><span>${v}</span></div>`).join('')}<div style="padding: 12px 20px 16px;"><div style="display: flex; gap: 2px;">${CL.map(c => `<span title="${esc('第 ' + c.n + ' 段 · 平台序号 ' + c.no + ' · ' + c.min + ' 分钟')}" style="flex: ${c.min} 1 0; min-width: 0; height: 22px; box-sizing: border-box; border: 1px solid ${C.ink}; background: ${C.paper}; display: flex; align-items: center; justify-content: center; font-family: ${F.type}; font-size: 11px;">${c.n}</span>`).join('')}</div><div style="margin-top: 7px; font-size: 12px; color: ${C.cap};">10 段，宽度按时长</div></div></div>`;
  const top = `<div style="padding: clamp(20px, 3vw, 34px) ${PAD} clamp(40px, 5vw, 60px); border-bottom: 1px solid ${C.ink};">
${seriesNav({ color: C.cap })}
<div style="margin-top: clamp(36px, 5vw, 64px); display: flex; flex-wrap: wrap; gap: 44px 56px; align-items: flex-start;">
<div style="flex: 1 1 600px; min-width: 0;">
<div style="display: flex; align-items: center; gap: 14px; font-family: ${F.serif}; font-size: 17px; font-weight: 600; letter-spacing: 0.24em;">为了华语电影<span style="font-family: ${F.type}; font-size: 16px; font-weight: 700; letter-spacing: 0.04em; border: 1.5px solid ${C.ink}; padding: 1px 8px 0;">08</span></div>
<h1 style="margin: 20px 0 0; font-family: ${F.serif}; font-weight: 900; font-size: clamp(54px, 8.6vw, 128px); line-height: 1.05; letter-spacing: 0.04em;">黄建新与体制</h1>
<div style="margin-top: 20px; font-size: 16.5px; line-height: 1.7; color: ${C.muted};">从批判到加入｜电影巨辩《为了华语电影》第 8 集 · 5 小时 53 分 · 老马 × 阿吴</div>
<div style="margin-top: 42px; max-width: 800px; font-family: ${F.serif}; font-weight: 700; font-size: clamp(24px, 2.8vw, 36px); line-height: 1.6; text-wrap: pretty;">“时代在前进，一部分的制度和人，留在了原地。”</div>
<div style="margin-top: 12px; font-size: 14.5px; color: ${C.cap};">节目认为，“错位”两个字可以概括黄建新绝大多数电影的主旨。</div>
</div>
<div style="flex: 0 1 560px; min-width: 0; display: flex; flex-wrap: wrap; gap: 18px; align-items: flex-start;"><figure style="margin: 0; flex: 0 1 180px; min-width: 150px;"><div style="position: relative; aspect-ratio: 3 / 4; overflow: hidden; background: ${C.deep}; box-shadow: 0 0 0 1.5px ${C.ink};">${slot('p-hjx', '黄建新照片')}</div><figcaption style="margin-top: 8px; font-size: 12px; line-height: 1.5; color: ${C.cap};">黄建新，2025 年在第 30 届釜山国际电影节</figcaption></figure>${archive}</div>
</div>
${table}
</div>`;
  const legPh = PHK.map(p => `<div style="display: grid; grid-template-columns: 30px minmax(0, 1fr); gap: 10px; align-items: center; padding: 6px 0; border-bottom: 1px solid ${C.rule};">${sw(p, 30, 16)}<span style="font-size: 13.5px;"><b style="font-weight: 700;">${PHN[p]}</b><span style="color: ${C.cap};">　${PHD[p]}</span></span></div>`).join('');
  const legK = Object.keys(KN).map(k => `<span style="display: inline-flex; align-items: center; gap: 7px;">${shape(k, 11)}${KN[k]}</span>`).join('') + `<span style="display: inline-flex; align-items: center; gap: 7px;">${sw('city', 26, 14, true)}细斜线：时代背景，节目停下来给年轻听众补课</span>`;
  const paper = `<div style="padding: clamp(40px, 5vw, 64px) ${PAD} clamp(44px, 5vw, 64px); border-bottom: 1px solid ${C.ink};">
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr)); gap: 32px 64px; align-items: start;">
<p style="margin: 0; font-size: 17px; line-height: 1.95; color: ${C.ink2}; text-wrap: pretty;">节目认为黄建新是第五代里和改革开放结合最紧密、也最重要的一位导演，整体成就超越张艺谋、陈凯歌，只是西方影展“消化”不了他。他不去乡村和历史里寻根，而在当下的城市里寻根，所以能直接面对体制本身。节目逐部讲了他的作品：《黑炮事件》用“后社会主义”来读，《背靠背，脸对脸》是巅峰，《埋伏》是最后一部保持水准的，《说出你的秘密》《睡不着》是最差的两部，《求求你表扬我》是最后一部个人作品。2009 年起他成了主旋律大片的监制和推手，节目对此相当尖锐。结尾把他的转变放回中国知识分子与权力的长线：士大夫的帝师梦、救亡压倒启蒙、价值真空，以及“有所不为”。</p>
<div style="display: grid; gap: 24px;">${quote('我和老马都认为，黄建新是最重要的一位第五代导演。', '阿吴', 21)}${quote('那不是黄建新个人能力的问题，是西方影展的问题。', '节目', 21)}</div>
</div>
<div style="margin-top: 52px;">${sub('先认几个词', '节目里反复出现')}<div style="margin-top: 4px; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 380px), 1fr)); column-gap: 32px;">${TERMS.map(([k, v]) => `<div style="display: grid; grid-template-columns: 118px minmax(0, 1fr); gap: 12px; padding: 11px 0; border-bottom: 1px solid ${C.rule};"><span style="font-family: ${F.serif}; font-size: 15px; font-weight: 700; line-height: 1.5;">${esc(k)}</span><span style="font-size: 13.5px; line-height: 1.7; color: ${C.ink2}; text-wrap: pretty;">${esc(v)}</span></div>`).join('')}</div></div>
<div style="margin-top: 44px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr)); gap: 28px 56px;">
<div>${sub('颜色：黄建新创作的八个阶段', '全页一致；橘红一路褪成深蓝，最后落进铅紫')}<div style="margin-top: 4px;">${legPh}</div></div>
<div>${sub('其他记号', '')}<div style="margin-top: 12px; display: grid; gap: 12px; font-size: 13.5px;"><div style="display: flex; flex-wrap: wrap; gap: 8px 18px; align-items: center;"><span style="color: ${C.cap};">板块类型</span>${legK}</div><div style="display: flex; align-items: center; gap: 10px;">${tier(3)}<span>五格评价：填满几格就是第几档，档位为整理者根据节目评语归档</span></div><div style="display: flex; align-items: center; gap: 10px;">${clock(20)}<span>黑钟：全页的强调记号，每个模块最多一处</span></div><div style="display: flex; align-items: center; gap: 10px;">${domRow(5, C.card, '7px', '18px', 5)}<span style="margin-left: 8px;">模块之间的一排骨牌，最后一块倒下</span></div><div style="color: ${C.cap}; font-size: 12.5px; line-height: 1.7;">阶段、类型和板块名为整理者所加。这一页刻意不用绿色：节目讲《黑炮事件》“刻意去掉了蓝绿色”。</div></div></div>
</div>
<nav style="margin-top: 40px; display: flex; flex-wrap: wrap; gap: 8px;">${toc.map(([id, l, t]) => `<a href="#${id}" style="display: inline-flex; align-items: baseline; gap: 8px; padding: 6px 12px 5px; border: 1px solid ${C.rule2}; background: ${C.card}; color: ${C.ink}; font-size: 13.5px;"><span style="font-family: ${F.type}; font-weight: 700; font-size: 14px;">${l}</span>${t}</a>`).join('')}</nav>
</div>`;
  return `${band}<header id="cover" data-screen-label="A 封面">${top}${coverWall()}${paper}</header>`;
}

// ===== B + C
const TW = 1152;
const X = t => t / T * TW;
const G2 = 'display: grid; grid-template-columns: 128px 1152px; column-gap: 16px;';
const ttl = s => esc(`${s.time} · 第 ${s.clip} 段 ${s.ct} · ${s.label}`);
const GROUPS = [{ k: 'era', name: '时代与思潮' }, { k: 'system', name: '体制与官场' }, { k: 'intel', name: '知识分子' }, { k: 'absurd', name: '荒诞与讽刺' }, { k: 'form', name: '形式与视听' }, { k: 'industry', name: '产业与主旋律' }, { k: 'belief', name: '信仰与道德' }, { k: 'acting', name: '演员与表演' }];
const BINS = D[4][0].map((r, i, a) => ({ s: hm(r.bin_start), e: i === a.length - 1 ? T : hm(r.bin_end), a: r.bin_start, b: r.bin_end, v: Object.fromEntries(GROUPS.map(g => [g.k, +r[g.k + '_per1k']])) }));
const PEAKS = { era: [['0:10', 1], ['0:00', 0]], system: [['2:50', 1], ['1:30', 0]], intel: [['1:20', 1], ['4:10', 0]], absurd: [['5:40', 1], ['3:10', 0]], form: [['1:10', 1], ['0:10', 0]], industry: [['5:00', 1], ['5:10', 0]], belief: [['5:50', 1], ['4:30', 0]], acting: [['5:20', 1], ['5:30', 0]] };
const CNOTE = {
  era: [['0:10', 'L', '17.75 新启蒙与寻根文学；左边一格 11.27 是第二个峰']],
  system: [['2:50', 'L', '16.11 《背靠背》的官本位和政治逻辑'], ['1:30', 'L', '15.17 《错位》的技术型干部和开会']],
  intel: [['1:20', 'L', '9.40 80 年代的知识分子电影'], ['4:10', 'L', '6.35 “知识分子系列”']],
  absurd: [['5:40', 'R', '6.89 中国的荒诞'], ['3:10', 'L', '4.45 突降法']],
  form: [['1:10', 'L', '16.09 《黑炮》的色彩和仰拍'], ['0:10', 'L', '8.14 第五代的造型象征']],
  industry: [['5:00', 'R', '20.11 为什么转做监制；右边一格 14.08 主旋律']],
  belief: [['5:50', 'R', '13.68 价值真空（末格只有约 3 分钟）'], ['4:30', 'R', '7.69 《求求你表扬我》的信仰与道德']],
  acting: [['5:20', 'R', '12.21；右边一格 12.07']]
};
const HMAX = 20.11;
const heatA = v => v <= 0 ? 0 : 0.06 + 0.94 * Math.pow(Math.min(v, HMAX) / HMAX, 0.75);
const heatStops = (g, dir, fadeLast) => `linear-gradient(${dir}, ${BINS.map((b, i) => `${rgba(C.ink, heatA(b.v[g.k]) * (fadeLast && i === BINS.length - 1 ? 0.5 : 1))} ${f1(b.s / T * 100)}% ${f1(b.e / T * 100)}%`).join(', ')})`;
function axisRow() {
  let a = '';
  for (let m = 0; m <= 330; m += 30) a += `<div style="position: absolute; left: ${f1(X(m * 60))}px; top: 0; width: 1px; height: 6px; background: ${C.rule2};"></div><div style="position: absolute; left: ${f1(X(m * 60))}px; top: 9px; ${m ? 'transform: translateX(-50%);' : ''} font-family: ${F.mono}; font-size: 11.5px; color: ${C.cap};">${fmtHM(m)}</div>`;
  a += `<div style="position: absolute; right: 0; top: 0; width: 1px; height: 6px; background: ${C.rule2};"></div><div style="position: absolute; right: 0; top: 24px; font-family: ${F.mono}; font-size: 11.5px; color: ${C.cap};">5:53:10</div>`;
  return `<div style="position: relative; height: 42px; border-top: 1px solid ${C.rule2};">${a}</div>`;
}
const numMark = n => `<span style="flex: none; display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px; border-radius: 50%; background: ${C.ink}; color: #fff; font-family: ${F.mono}; font-size: 10.5px; font-weight: 600; line-height: 1;">${n}</span>`;
const lab = (t, sb) => `<div style="display: flex; flex-direction: column; justify-content: center; gap: 4px;"><span style="font-size: 12.5px; letter-spacing: 0.1em; color: ${C.ink2};">${t}</span>${sb ? `<span style="font-size: 11px; line-height: 1.55; color: ${C.cap};">${sb}</span>` : ''}</div>`;
function cHead() {
  return `<div style="display: flex; flex-wrap: wrap; align-items: flex-end; gap: 12px 18px; padding-bottom: 14px; border-bottom: 2px solid ${C.ink};">${door('C')}<h2 id="relay" style="${S.h2}">话题接力</h2><span style="margin-left: auto; padding-bottom: 6px; font-size: 14.5px; color: ${C.muted};">每段时间在聊什么</span></div>
<div style="${S.lead}">第一个小时讲时代和出身，第二个小时讲形式和知识分子，第三个小时讲官场，第四、五个小时讲转向和迷茫，最后一个小时讲产业、演员和荒诞。</div>`;
}
function bDesktop() {
  const lanes = [], pos = [];
  const fits = (k, l, r) => !(lanes[k] || []).some(([p, q]) => l < q + 4 && r + 4 > p);
  L1.forEach(s => { const x = X(s.t), w = Math.ceil(estW(s.label, 11.5) + 18); const opts = [[x, x + w, true], [x - w, x, false]].filter(([l, r]) => l >= 0 && r <= TW); let k = 0, pick = null; while (!pick) { for (const o of opts) if (fits(k, o[0], o[1])) { pick = o; break; } if (!pick) k++; } (lanes[k] = lanes[k] || []).push([pick[0], pick[1]]); pos.push({ s, x, k, la: pick[2] }); });
  const LH = 21, BASE = 16, H = lanes.length * LH + BASE;
  let lead = '', tags = '', ticks = '';
  pos.forEach(p => { const b = BASE + p.k * LH, sec = SEC[p.s.sec]; lead += `M${f1(p.x)} ${H - b}V${H}`; BTAGS.push([p.s.label, p.s.time, p.s.clip, p.s.ct, +f1(p.la ? p.x : TW - p.x), p.la ? 1 : 0, b, PHT[sec.ph]]); });
  tags = `<sc-for list="{{ bTags }}" as="t" hint-placeholder-count="1"><div title="{{ t.title }}" style="position: absolute; left: {{ t.left }}; right: {{ t.right }}; bottom: {{ t.bottom }}; border-left: {{ t.bl }}; border-right: {{ t.br }}; height: 18px; padding: 0 5px; border-top: 1px solid ${C.ink}; border-bottom: 1px solid ${C.ink}; box-sizing: border-box; background: ${C.card}; white-space: nowrap; font-size: 11.5px; line-height: 16px;">{{ t.label }}</div></sc-for>`;
  const tk = {}; L2.forEach(s => { const ph = SEC[s.sec].ph; tk[ph] = (tk[ph] || '') + `M${f1(X(s.t))} ${H - 12}V${H}`; });
  ticks = Object.entries(tk).map(([ph, d]) => `<path d="${d}" stroke="${PHT[ph]}" strokeWidth="1.6" fill="none"></path>`).join('');
  const svg = `<svg width="${TW}" height="${H}" style="position: absolute; left: 0; top: 0; pointer-events: none;"><path d="${lead}" stroke="${C.ink}" strokeOpacity="0.3" strokeWidth="1" fill="none"></path>${ticks}</svg>`;
  let works = '';
  WSP.forEach(w => { const l = X(w.s), wd = X(w.e) - l, big = w.work === '黑炮事件' || w.work === '背靠背，脸对脸'; const full = `${w.name} ${f1(w.min)}′`, pad = big ? 30 : 4, sn = w.work === '背靠背，脸对脸' ? '《背靠背》' : w.name; const txt = wd > estW(full, 11.5) + pad + 10 ? full : wd > estW(w.name, 11.5) + pad ? w.name : wd > estW(sn, 11.5) + pad ? sn : ''; works += `<div title="${esc(w.name + ' · ' + f1(w.min) + ' 分钟')}" style="position: absolute; left: ${f1(l)}px; width: ${f1(wd - 1)}px; bottom: 0; height: 30px; display: flex; flex-direction: column; justify-content: flex-end; gap: 3px;"><div style="display: flex; align-items: center; gap: 4px; white-space: nowrap; overflow: hidden; font-size: 11.5px; ${big ? 'font-weight: 700;' : `color: ${C.ink2};`}">${big ? numMark(2) : ''}${esc(txt)}</div><div style="height: ${big ? 5 : 3}px; background: ${PHT[w.ph]};"></div></div>`; });
  const mel = SECS.find(s => s.id === 'b104');
  works += `<div style="position: absolute; right: ${f1(TW - X(mel.e))}px; bottom: 8px; display: flex; align-items: center; gap: 4px; white-space: nowrap; font-size: 11.5px; font-weight: 700;">${numMark(3)}《建国大业》等主旋律四部 6.5′ →</div>`;
  let clips = '';
  CL.forEach(c => { const l = X(c.s), w = X(c.e) - l, [t1] = c.title.split('｜'); clips += `<div title="${esc('第 ' + c.n + ' 段 · 平台序号 ' + c.no + ' · ' + c.start + '–' + c.end + ' · ' + c.title)}" style="position: absolute; top: 0; bottom: 0; left: ${f1(l)}px; width: ${f1(w - 2)}px; box-sizing: border-box; border: 1px solid ${C.ink}; background: ${C.card}; padding: 5px 6px; overflow: hidden;"><div style="display: flex; align-items: baseline; gap: 6px; white-space: nowrap;"><span style="font-family: ${F.type}; font-size: 15px; font-weight: 700;">${c.n}</span><span style="font-size: 10.5px; color: ${C.cap};">平台 ${c.no}</span></div><div style="font-family: ${F.mono}; font-size: 10.5px; color: ${C.cap};">${c.min}′</div><div style="margin-top: 2px; font-size: 11px; line-height: 1.4; color: ${C.ink2};">${esc(t1)}</div></div>`; });
  let blocks = '';
  const shp = { film: '', era: '', life: '', idea: '' };
  SECS.forEach(s => { const l = X(s.s), w = X(s.e) - l, cx = l + w / 2, r = w >= 7 ? 3.2 : 2.2; shp[s.kind] += s.kind === 'film' ? `M${f1(cx - r)} ${f1(4.5 - r)}h${f1(2 * r)}v${f1(2 * r)}h${f1(-2 * r)}Z` : s.kind === 'era' ? `M${f1(cx)} ${f1(4.5 - r)}L${f1(cx + r * 1.1)} ${f1(4.5 + r)}L${f1(cx - r * 1.1)} ${f1(4.5 + r)}Z` : s.kind === 'life' ? `M${f1(cx - r)} 4.5a${r} ${r} 0 1 0 ${f1(2 * r)} 0a${r} ${r} 0 1 0 ${f1(-2 * r)} 0Z` : `M${f1(cx)} ${f1(4.5 - r * 1.25)}L${f1(cx + r * 1.1)} 4.5L${f1(cx)} ${f1(4.5 + r * 1.25)}L${f1(cx - r * 1.1)} 4.5Z`; blocks += ''; BBLK.push([`${s.id} · ${s.name} · ${s.min}′ · ${PHN[s.ph]} · ${KN[s.kind]}`, +f1(l), +f1(Math.max(1.5, w - 1)), s.ph, s.kind === 'era' ? 1 : 0]); });
  blocks = `<svg width="${TW}" height="10" style="position: absolute; left: 0; top: 0;">${Object.values(shp).map(d => `<path d="${d}" fill="${C.ink}"></path>`).join('')}</svg><sc-for list="{{ bBlocks }}" as="k" hint-placeholder-count="1"><div title="{{ k.title }}" style="position: absolute; top: 12px; bottom: 0; left: {{ k.left }}; width: {{ k.width }}; background: {{ k.bg }}; box-shadow: {{ k.sh }};"></div></sc-for>`;
  let phases = '';
  PHR.forEach(r => { const l = X(r.s), w = X(r.e) - l, nm = PHN[r.ph], pio = r.ph === 'pioneer'; phases += `<div style="position: absolute; top: 0; left: ${f1(l)}px; width: ${f1(w - 2)}px; border-top: ${pio ? 5 : 3}px solid ${PHT[r.ph]}; padding-top: 4px; overflow: hidden; white-space: nowrap;"><div style="display: flex; align-items: center; gap: 4px; font-family: ${F.serif}; font-size: 12.5px; font-weight: 700;">${pio ? numMark(1) : ''}${esc(nm)}</div><div style="font-family: ${F.mono}; font-size: 11px; color: ${C.cap};">${f1(r.min)}′${w > 100 ? ' · ' + f1(r.min / (T / 60) * 100) + '%' : ''}</div></div>`; });
  const p1 = f1(hms('4:04:21') / T * 100), p2 = f1(hms('4:55:24') / T * 100);
  const arc = `<div style="position: relative; height: 30px;"><div style="position: absolute; left: 0; right: 0; top: 6px; height: 4px; background: linear-gradient(90deg, ${PH.pioneer} 0%, ${PH.mind} ${p1}%, ${PH.main} ${p2}%, ${PH.main} 100%);"></div><div style="position: absolute; left: ${p1}%; top: 0; width: 1px; height: 16px; background: ${C.ink};"></div><div style="position: absolute; left: ${p2}%; top: 0; width: 1px; height: 16px; background: ${C.ink};"></div><div style="position: absolute; left: calc(${p1}% + 4px); top: 13px; font-family: ${F.mono}; font-size: 10.5px; color: ${C.cap};">4:04</div><div style="position: absolute; left: calc(${p2}% + 4px); top: 13px; font-family: ${F.mono}; font-size: 10.5px; color: ${C.cap};">4:55</div><div style="position: absolute; left: 0; top: 13px; font-family: ${F.serif}; font-size: 12.5px; font-weight: 700;">从批判到加入 →</div></div>`;
  const legend = PHK.map(p => `<span style="display: inline-flex; align-items: center; gap: 6px;">${sw(p, 14, 10)}${PHN[p]}</span>`).join('') + Object.keys(KN).map(k => `<span style="display: inline-flex; align-items: center; gap: 6px;">${shape(k, 9)}${KN[k]}</span>`).join('') + `<span style="display: inline-flex; align-items: center; gap: 6px;">${sw('city', 18, 10, true)}时代背景加细斜线</span>`;
  let crows = '';
  GROUPS.forEach(g => {
    const peak = Math.max(...BINS.map(b => b.v[g.k]));
    let marks = '', notes = '';
    PEAKS[g.k].forEach(([st, kind]) => { const b = BINS.find(x => x.a === st), l = X(b.s), w = X(b.e) - l, ph = phAt((b.s + b.e) / 2); marks += `<div style="position: absolute; top: -2px; bottom: -2px; left: ${f1(l)}px; width: ${f1(w)}px; box-sizing: border-box; border: ${kind ? `2px solid ${C.ink}` : `1.5px dashed ${C.ink}`};"></div>${kind ? `<span title="${esc('峰值所在阶段：' + PHN[ph])}" style="position: absolute; left: ${f1(l + w / 2 - 5)}px; top: 50%; margin-top: -5px; width: 10px; height: 10px; border-radius: 50%; background: ${PH[ph]}; box-shadow: 0 0 0 1.5px #fff, 0 0 0 2.5px ${C.ink};"></span>` : ''}`; });
    CNOTE[g.k].forEach(([st, side, txt]) => { const b = BINS.find(x => x.a === st), sp = txt.indexOf(' '); notes += `<div style="position: absolute; ${side === 'R' ? `right: ${f1(TW - X(b.e))}px;` : `left: ${f1(X(b.s))}px;`} bottom: 3px; white-space: nowrap; font-size: 12px;"><b style="font-family: ${F.mono}; font-weight: 600;">${txt.slice(0, sp > 0 && /^\d/.test(txt) ? sp : 0)}</b><span style="font-family: ${F.mono}; font-size: 11px; color: ${C.cap}; margin: 0 6px;">${b.a}–${b.b}</span>${esc(sp > 0 && /^\d/.test(txt) ? txt.slice(sp + 1) : txt)}</div>`; });
    crows += `<div style="${G2}"><div style="display: flex; flex-direction: column; justify-content: flex-end; padding-bottom: 8px;"><span style="font-family: ${F.serif}; font-size: 14px; font-weight: 700;">${g.name}</span><span style="font-size: 11px; color: ${C.cap};">峰值 ${peak.toFixed(2)}</span></div><div style="position: relative; height: 60px;"><div style="position: absolute; left: 0; right: 0; top: 0; height: 24px;">${notes}</div><div style="position: absolute; left: 0; right: 0; top: 24px; bottom: 4px; background: ${heatStops(g, '90deg', true)}, rgba(27,27,27,0.03);">${marks}</div></div></div>`;
  });
  return `<div style="margin-top: 34px; overflow-x: auto; padding-bottom: 8px;"><div style="width: 1296px;">
<div style="${G2}">${lab('站点', `方框是 ${N1} 个板块的起点；贴着下沿的短刻度是 ${NST - N1} 个细节站点。悬停可看全片时间和第几段几分几秒`)}<div style="position: relative; height: ${H}px;">${svg}${ticks}${tags}</div></div>
<div style="${G2} margin-top: 8px;">${lab('作品', '讲单部作品的连续板块')}<div style="position: relative; height: 30px;">${works}</div></div>
<div style="${G2} margin-top: 8px;">${lab('平台 10 段', '格宽等于该段时长')}<div style="position: relative; height: 106px;">${clips}</div></div>
<div style="${G2} margin-top: 6px;">${lab('115 个板块', '颜色按阶段，小记号按类型')}<div style="position: relative; height: 50px;">${blocks}</div></div>
<div style="${G2} margin-top: 6px;">${lab('八个阶段', '为整理者所加')}<div style="position: relative; height: 42px;">${phases}</div></div>
<div style="${G2} margin-top: 4px;"><div></div>${arc}</div>
<div style="${G2} margin-top: 6px;"><div style="font-size: 12px; color: ${C.cap}; padding-top: 2px;">全片时间</div>${axisRow()}</div>
<div style="${G2} margin-top: 4px;"><div></div><div style="display: flex; flex-wrap: wrap; gap: 6px 16px; font-size: 12px; color: ${C.cap};">${legend}</div></div>
</div></div>
<div style="margin-top: 64px;">${cHead()}</div>
<div style="margin-top: 22px; overflow-x: auto; padding-bottom: 8px;"><div style="width: 1296px;">
${crows}
<div style="${G2} margin-top: 6px;"><div style="font-size: 12px; color: ${C.cap}; padding-top: 2px;">全片时间</div>${axisRow()}</div>
<div style="${G2} margin-top: 2px;"><div></div><div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px; font-size: 12px; color: ${C.cap};"><span style="font-family: ${F.mono};">0</span><span style="width: 160px; height: 10px; background: linear-gradient(90deg, rgba(27,27,27,0.06), ${C.ink});"></span><span style="font-family: ${F.mono};">20.1</span><span>每千字出现次数，八行同一墨色色阶；实线框是各组的峰，圆点是峰所在阶段的颜色；虚线框是第二个峰；最后一格只有约 3 分钟，已淡化</span></div></div>
</div></div>`;
}
function bMobile() {
  const H = 1900, k = H / T, XC = { clip: 34, blk: 62, heat: 80, lead: 156, lab: 172 };
  let h = '';
  for (let m = 0; m <= 330; m += 30) { const y = m * 60 * k; h += `<div style="position: absolute; left: 0; top: ${f1(y)}px; transform: translateY(-50%); font-family: ${F.mono}; font-size: 10.5px; color: ${C.cap};">${fmtHM(m)}</div><div style="position: absolute; left: ${XC.clip}px; width: ${XC.lead - XC.clip}px; top: ${f1(y)}px; height: 1px; background: ${C.rule};"></div>`; }
  CL.forEach(c => { h += `<div style="position: absolute; left: ${XC.clip}px; width: 24px; top: ${f1(c.s * k)}px; height: ${f1((c.e - c.s) * k - 2)}px; box-sizing: border-box; border: 1px solid ${C.ink}; background: ${C.card}; display: flex; align-items: center; justify-content: center; font-family: ${F.type}; font-size: 12px; font-weight: 700;">${c.n}</div>`; });
  SECS.forEach(s => { MBLK.push([+f1(s.s * k), +f1(Math.max(1, (s.e - s.s) * k - 1)), s.ph, s.kind === 'era' ? 1 : 0]); });
  h += `<sc-for list="{{ mBlocks }}" as="k" hint-placeholder-count="1"><div style="position: absolute; left: ${XC.blk}px; width: 12px; top: {{ k.top }}; height: {{ k.height }}; background: {{ k.bg }}; box-shadow: {{ k.sh }};"></div></sc-for>`;
  GROUPS.forEach((g, j) => { h += `<div style="position: absolute; left: ${XC.heat + j * 9}px; width: 8px; top: 0; height: ${H}px; background: ${heatStops(g, '180deg', true)}, rgba(27,27,27,0.03);"></div>`; });
  const items = [];
  PHR.forEach(r => items.push({ t: r.s, o: 0, ph: r.ph, txt: PHN[r.ph], min: r.min, big: 1 }));
  WSP.forEach(w => items.push({ t: w.s, o: 1, ph: w.ph, txt: w.name, min: w.min }));
  items.sort((a, b) => a.t - b.t || a.o - b.o);
  const AW = 170; let prev = -1e9, svg = '', labs = '';
  items.forEach(it => { const hh = it.big ? 26 : Math.ceil(estW(it.txt + ' 00.0′', 13) / AW) * 18 + 2, y = it.t * k, top = Math.max(0, y - 4, prev); prev = top + hh + 3; svg += `<line x1="0" y1="${f1(y)}" x2="16" y2="${f1(top + 9)}" stroke="${PHT[it.ph]}" strokeWidth="1"></line>`; labs += it.big ? `<div style="position: absolute; left: ${XC.lab}px; right: 0; top: ${f1(top)}px; padding-top: 3px; border-top: 3px solid ${PHT[it.ph]}; font-family: ${F.serif}; font-size: 14px; font-weight: 700; line-height: 1.3;">${esc(it.txt)} <span style="font-family: ${F.mono}; font-size: 11px; font-weight: 400; color: ${C.cap};">${f1(it.min)}′</span></div>` : `<div style="position: absolute; left: ${XC.lab}px; right: 0; top: ${f1(top)}px; font-size: 13px; line-height: 18px;">${esc(it.txt)} <span style="font-family: ${F.mono}; font-size: 11px; color: ${C.cap};">${f1(it.min)}′</span></div>`; });
  const HH = Math.max(H, prev + 10);
  return `<div style="margin-top: 26px; display: flex; flex-wrap: wrap; gap: 6px 14px; font-size: 12px; color: ${C.ink2};">${PHK.map(p => `<span style="display: inline-flex; align-items: center; gap: 6px;">${sw(p, 12, 9)}${PHN[p]}</span>`).join('')}</div>
<p style="${S.cap}">左起：全片时间、平台 10 段、115 个板块（颜色按阶段，细斜线是时代背景）、八组话题的热度（依次是${GROUPS.map(g => g.name).join('、')}，越深表示该组关键词每千字出现越多），右边是阶段和作品。</p>
<div style="position: relative; height: ${f1(HH)}px; margin: 22px 0 12px;">${h}<svg width="16" height="${f1(HH)}" style="position: absolute; left: ${XC.lead}px; top: 0; overflow: visible;">${svg}</svg>${labs}</div>
<div style="margin-top: 40px;">${cHead()}${cap('手机上，八组话题的热度画在上面纵向图的八列里。各组的峰：')}<div style="margin-top: 8px; display: grid; gap: 4px;">${GROUPS.map(g => `<div style="display: grid; grid-template-columns: 92px minmax(0, 1fr); gap: 8px; padding: 5px 0; border-bottom: 1px solid ${C.rule}; font-size: 13px; line-height: 1.6;"><b style="font-family: ${F.serif};">${g.name}</b><span>${CNOTE[g.k].map(([st, , txt]) => `<span style="font-family: ${F.mono}; font-size: 11.5px; color: ${C.cap};">${st}</span> ${esc(txt)}`).join('；')}</span></div>`).join('')}</div></div>`;
}
const ST_DATA = CL.map(c => { const [t1, t2] = c.title.split('｜'); return { n: c.n, t1, t2: t2 || '', meta: `平台序号 ${c.no} · ${c.start}–${c.end} · ${c.min}′`, rows: ST.filter(s => s.clip === c.n).map(s => [s.time, s.ct, s.label, s.level, PHT[SEC[s.sec].ph], SEC[s.sec].kind]) }; });
function stationList() {
  const h = `<sc-for list="{{ stClips }}" as="c" hint-placeholder-count="10"><div style="break-inside: avoid; margin-bottom: 24px; ${S.card}"><div style="display: grid; grid-template-columns: 54px minmax(0, 1fr); border-bottom: 1px solid ${C.ink}; background: ${C.wall};"><div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; background: ${C.ink}; color: ${C.paper};"><span style="font-size: 10.5px; letter-spacing: 0.1em; line-height: 1;">第</span><span style="font-family: ${F.type}; font-size: 22px; font-weight: 700; line-height: 1;">{{ c.n }}</span><span style="font-size: 10.5px; letter-spacing: 0.1em; line-height: 1;">段</span></div><div style="padding: 9px 13px;"><div style="font-family: ${F.serif}; font-size: 15px; font-weight: 700; line-height: 1.45; text-wrap: pretty;">{{ c.t1 }}</div><div style="margin-top: 3px; font-size: 12.5px; line-height: 1.55; color: ${C.muted};">{{ c.t2 }}</div><div style="margin-top: 3px; font-family: ${F.mono}; font-size: 11px; color: ${C.cap};">{{ c.meta }}</div></div></div><div style="padding: 8px 13px 10px;"><sc-for list="{{ c.rows }}" as="s" hint-placeholder-count="8"><div style="display: grid; grid-template-columns: 54px 38px 14px minmax(0, 1fr); gap: 6px; align-items: baseline; padding: 3px 0; font-family: ${F.mono}; font-size: 11.5px; line-height: 1.55; color: ${C.cap};"><span>{{ s.time }}</span><span>{{ s.ct }}</span><span style="align-self: center; display: flex; justify-content: center;"><span style="width: {{ s.mw }}; height: {{ s.mh }}; background: {{ s.col }}; clip-path: {{ s.cp }}; border-radius: {{ s.br }};"></span></span><span style="font-family: {{ s.ff }}; font-size: {{ s.fs }}; font-weight: {{ s.fw }}; color: {{ s.fc }};">{{ s.label }}</span></div></sc-for></div></div></sc-for>`;
  return `<div style="margin-top: 60px; display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px 20px; padding-bottom: 12px; border-bottom: 1px solid ${C.ink};"><h3 style="margin: 0; font-family: ${F.serif}; font-size: 23px; font-weight: 700;">按段落回听</h3><span style="font-size: 13px; color: ${C.cap};">每行依次是全片时间、该段内的时间、站点；宋体是板块起点，记号表示板块类型，颜色表示阶段</span><div role="button" onClick="{{ toggleSt }}" style="margin-left: auto; ${S.btn}" style-hover="${S.btnH}">{{ stBtn }}</div></div>
<div style="margin-top: 22px; columns: 330px; column-gap: 26px;">${h}</div>`;
}
function sectionB() {
  return `${secOpen('map', 'B', '节目地图')}${head('B', '节目地图', '六个小时怎么走的')}
<p style="${S.intro}">节目先用约 23 分钟讲“为什么是黄建新”，约 24 分钟讲他的早年和西影，然后按作品一部一部往前走：先锋三部曲约 90 分钟，城市三部曲与《五魁》约 76 分钟，转向约 32 分钟，心理三部曲约 51 分钟，监制与主旋律约 30 分钟，最后约 28 分钟讲演员和总评。</p>
<div style="margin-top: 22px; display: grid; gap: 10px; max-width: 1100px;">${[['1', '先锋三部曲讲了约一个半小时，是八个阶段里最长的。', '89.5 分钟，占 25.3%'], ['2', '单部作品讲得最长的是《黑炮事件》，约 37.5 分钟；《背靠背，脸对脸》占了整整一段，32.9 分钟。', ''], ['3', '主旋律四部合起来不到 7 分钟，“我们就不打算仔细聊这几部电影了”。', '6.5 分钟']].map(([n, t, s]) => `<div style="display: flex; gap: 12px; align-items: baseline;"><span style="position: relative; top: 2px;">${numMark(n)}</span><span style="font-family: ${F.serif}; font-size: clamp(17px, 1.8vw, 21px); font-weight: 600; line-height: 1.6; text-wrap: pretty;">${t}${s ? `<span style="margin-left: 10px; font-family: ${F.sans}; font-size: 13px; font-weight: 400; color: ${C.cap};">${s}</span>` : ''}</span></div>`).join('')}</div>
${WIDE(`<div>${bDesktop()}${cap(`条宽按时长等比。板块按节目里的过渡句切分，误差约一分钟；阶段、类型、板块名为整理者所加。话题热度每 10 分钟一格，用每千字出现次数而不是次数（最后一格只有约 3 分钟、877 字）。关键词组是整理者定的，“改革”“政治”“红色”这类词在不同语境里意思不同，数值只看相对高低。各组关键词——${esc(KW)}`)}</div>`)}
${NARROW(`<div>${bMobile()}${cap(`关键词组是整理者定的，数值只看相对高低。各组关键词——${esc(KW)}`)}</div>`)}
${stationList()}
</section>`;
}

// ===== images + colour
const IMGS = Object.fromEntries((await ls('assets/hjx08')).map(f => { const n = f.split('/').pop(); return [n.replace(/\.\w+$/, ''), n]; }));
const slotN = {};
const slot = (k, label, shape = 'rect') => { slotN[k] = (slotN[k] || 0) + 1; const id = 'hjx08-' + k + (slotN[k] > 1 ? '-' + slotN[k] : ''); return `<image-slot id="${id}" ${IMGS[k] ? `src="assets/hjx08/${IMGS[k]}"` : ''} shape="${shape}" placeholder="${esc(label)}" style="position: absolute; inset: 0; width: 100%; height: 100%;"></image-slot>`; };
const poster = (k, t, w = 100, ex = '') => `<div style="flex: none; position: relative; width: ${w}px; aspect-ratio: 2 / 3; background: ${C.deep}; color: ${C.ink}; box-shadow: 0 0 0 1px ${C.ink}; overflow: hidden; ${ex}">${slot(k, t + ' 海报')}</div>`;
const posterCap = (k, t, cp, w = 76) => `<figure style="margin: 0; flex: none; width: ${w}px;">${poster(k, t.replace(/[《》]/g, ''), w)}<figcaption style="margin-top: 6px; font-size: 12px; line-height: 1.4;"><b style="font-family: ${F.serif};">${esc(t)}</b>${cp ? `<br><span style="font-size: 11px; color: ${C.cap};">${esc(cp)}</span>` : ''}</figcaption></figure>`;
const face = (k, name, note = '', z = 64, dark = false, inheritColor = false) => `<figure style="margin: 0; flex: none; width: ${Math.max(z, 84)}px; display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center;"><div style="position: relative; width: ${z}px; height: ${z}px; border-radius: 50%; overflow: hidden; background: ${dark ? 'rgba(255,255,255,0.14)' : C.deep}; ${inheritColor ? '' : `color: ${dark ? '#fff' : C.ink};`} box-shadow: 0 0 0 ${dark ? 2 : 1.5}px ${dark ? C.card : C.ink};">${slot(k, name, 'circle')}</div><figcaption style="font-size: 12.5px; line-height: 1.45;"><b style="font-family: ${F.serif}; font-weight: 700;">${esc(name)}</b>${note ? `<br><span style="font-size: 11.5px; ${dark ? '' : `color: ${C.cap};`}">${esc(note)}</span>` : ''}</figcaption></figure>`;
const faces = (arr, gap = 14, mt = 16) => `<div style="margin-top: ${mt}px; display: flex; flex-wrap: wrap; gap: ${gap}px; align-items: flex-start;">${arr.join('')}</div>`;
const mini = (k, name, z = 36) => `<span style="flex: none; position: relative; display: block; width: ${z}px; height: ${z}px; border-radius: 50%; overflow: hidden; background: ${C.deep}; color: ${C.ink}; box-shadow: 0 0 0 1.5px ${C.ink};">${slot(k, name, 'circle')}</span>`;
const vPosters = (items, w = 92) => `<div style="flex: none; display: flex; align-items: flex-end; gap: 10px; padding: 0 10px 2px 0;">${items.map(([k, t], i) => poster(k, t, w, `box-shadow: 0 0 0 2px ${C.card}; ${i === items.length - 1 && items.length > 1 ? 'transform: rotate(6deg); transform-origin: 100% 100%;' : ''}`)).join('')}</div>`;
const vPortrait = (k, name, note = '', textColor = '') => `<figure style="margin: 0; flex: none; width: 118px;"><div style="position: relative; aspect-ratio: 3 / 4; overflow: hidden; background: rgba(255,255,255,0.15); box-shadow: 0 0 0 2px ${C.card}; ${textColor ? `color: ${textColor};` : ''}">${slot(k, name + '照片')}</div><figcaption style="margin-top: 6px; font-size: 12px; line-height: 1.4;"><b style="font-family: ${F.serif};">${esc(name)}</b>${note ? ' · ' + esc(note) : ''}</figcaption></figure>`;
const BAND = { overview: '#1B1B1B', life: '#8E6640', pioneer: '#B84A22', city: '#5E6A73', turn: '#A3A39A', mind: '#2E4A73', main: '#5B4E6E', close: '#2A2A2A' };
const TINT = { overview: C.paper, life: '#EFE5D6', pioneer: '#F6E2D8', city: '#E2E6E9', turn: '#E9E9E3', mind: '#DEE5F0', main: '#E7E2EC', close: '#E6E2DA' };
const phOf = L => ACC[L] || 'overview';
function head(L, title, q, vis = '') {
  const p = phOf(L), fg = p === 'turn' ? C.ink : '#fff';
  return `<div style="margin: 0 calc(-1 * ${PAD}); padding: clamp(30px, 4vw, 52px) ${PAD} clamp(24px, 3vw, 34px); background: ${BAND[p]}; color: ${fg}; display: flex; flex-wrap: wrap; align-items: flex-end; gap: 20px 28px;">${door(L)}<div style="flex: 1 1 380px; min-width: 0;"><h2 style="${S.h2} color: ${fg};">${title}</h2><div style="margin-top: 12px; display: flex; flex-wrap: wrap; align-items: center; gap: 10px 16px;"><span style="font-size: 15px; line-height: 1.6;">${q}</span>${PLATE[L] ? plate(PLATE[L]) : ''}</div></div>${vis}</div>`;
}
const secOpen = (id, L, title) => `<section id="${id}" data-screen-label="${L} ${title}" style="padding: 0 ${PAD} clamp(56px, 7vw, 88px); background: ${TINT[phOf(L)]};">`;
const seam = () => `<div aria-hidden="true" style="padding: 28px ${PAD}; display: flex; align-items: flex-end; gap: 18px;"><span style="flex: 1; height: 1px; background: ${C.rule2};"></span>${domRow(9)}<span style="width: 26px;"></span></div>`;
const DIVX = {
  '生平与先锋三部曲': ['pioneer', 'posters', [['f-w01', '黑炮事件'], ['f-w02', '错位'], ['f-w03', '轮回']], 118],
  '城市、转向与迷茫': ['city', 'posters', [['f-w04', '站直啰，别趴下'], ['f-w06', '背靠背，脸对脸'], ['f-w07', '红灯停，绿灯行'], ['f-w05', '五魁'], ['f-w08', '埋伏'], ['f-w10', '睡不着'], ['f-w09', '说出你的秘密'], ['f-w11', '谁说我不在乎'], ['f-w12', '求求你表扬我']], 86],
  '监制、演员与荒诞': ['main', 'posters', [['f-w13', '建国大业'], ['f-jd', '建党伟业'], ['f-jj', '建军大业'], ['f-jszk', '决胜时刻'], ['f-1921', '1921']], 104],
  '补课与收尾': ['close', 'faces', [['p-ws', '王朔', '55 次'], ['p-fg', '冯巩', '45 次'], ['p-nzh', '牛振华', '34 次'], ['p-wtm', '吴天明', '33 次'], ['p-zym', '张艺谋', '30 次'], ['p-wzw', '王志文', '18 次'], ['p-ckg', '陈凯歌', '16 次']], 72]
};
const divider = (label, sub2) => { const [p, mode, items, w] = DIVX[label]; const vis = mode === 'posters' ? items.map(([k, t], i) => poster(k, t, w, `box-shadow: 0 0 0 2px ${C.card}; ${i === items.length - 1 ? 'transform: rotate(8deg); transform-origin: 100% 100%;' : ''}`)).join('') : items.map(([k, n, m]) => face(k, n, m, w, true)).join('');
  return `<div style="margin-top: 0; padding: clamp(48px, 6vw, 80px) ${PAD} 0; background: ${BAND[p]}; color: #fff;"><div style="display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 28px 40px;"><div style="flex: 1 1 300px; min-width: 0; padding-bottom: clamp(28px, 4vw, 48px);"><div style="font-family: ${F.serif}; font-size: clamp(30px, 4vw, 52px); font-weight: 900; letter-spacing: 0.08em; line-height: 1.2;">${label}</div><div style="margin-top: 12px; font-size: 14.5px; line-height: 1.7;">${sub2}</div>${mode === 'faces' ? '<div style="margin-top: 6px; font-size: 13px; line-height: 1.7;">右边是节目里被提到最多的几个人，不含黄建新本人</div>' : ''}</div><div style="flex: 0 1 auto; min-width: 0; display: flex; flex-wrap: wrap; align-items: flex-end; gap: clamp(8px, 1.2vw, 14px); padding: 12px 22px ${mode === 'faces' ? 28 : 0}px 4px;">${vis}</div></div><div style="height: 14px; margin: 0 calc(-1 * ${PAD}); background: ${C.ink};"></div></div>`; };
const FILMK = id => WK(id).title.includes('建党') ? 'f-jd' : 'f-' + id;
function coverWall() {
  const extra = [['f-jd', '《建党伟业》', '2011', 'main'], ['f-jj', '《建军大业》', '2017', 'main'], ['f-jszk', '《决胜时刻》', '2019', 'main'], ['f-1921', '《1921》', '2021', 'main']];
  const base = W5.filter(w => !/建党|失眠|小雨/.test(w.title)).map(w => [FILMK(w.id), w.title, String(w.year), w.phase]);
  const tiles = base.concat(extra).map(([k, t, y, p]) => `<figure style="margin: 0; min-width: 0;"><div style="position: relative; width: 100%; aspect-ratio: 2 / 3; overflow: hidden; background: #3A3936; color: #fff;">${slot(k, t.replace(/[《》]/g, '') + ' 海报')}</div><div style="height: 5px; margin-top: 7px; background: ${PH[p]};"></div><figcaption style="margin-top: 6px; font-size: 12px; line-height: 1.45;"><span style="font-family: ${F.mono}; font-size: 11px;">${esc(y)}</span><br><b style="font-family: ${F.serif}; font-size: 13px;">${esc(t)}</b></figcaption></figure>`).join('');
  return `<div style="padding: clamp(36px, 5vw, 56px) ${PAD}; background: ${C.ink}; color: #fff;"><div style="display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 16px; padding-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.35);"><h3 style="${S.h3} color: #fff;">片目</h3><span style="font-size: 12.5px;">十二部个人长片和 2009 年以后的主旋律，按年份；色条是阶段。空着的图框可以拖入海报</span></div><div style="margin-top: 22px; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 104px), 1fr)); gap: 20px 14px;">${tiles}</div></div>`;
}

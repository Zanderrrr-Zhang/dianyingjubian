const MD = 'src/episodes/jia04/handoff.md';
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
const D = {}; for (let i = 1; i <= 23; i++) D[i] = blks('D' + i);
const D24 = mdTable('D24');
const hms = s => { const p = s.split(':').map(Number); return p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + p[1]; };
const hm = s => { const [h, m] = s.split(':').map(Number); return h * 3600 + m * 60; };
const T = hms('4:46:25');

const C = { ink: '#1B1C1E', ink2: '#2B2B29', paper: '#F4F0E6', card: '#FAF7EF', deep: '#E9E3D5', muted: '#4D4943', cap: '#655E54', faint: '#8E877A', rule: 'rgba(27,28,30,0.15)', rule2: 'rgba(27,28,30,0.32)', now: '#A8442F', past: '#5F7A8C', coal: '#2A2C2E', loess: '#B8975A', end: '#B8B2A6', yel: '#F0B429', neu: '#77705F', grey: '#E2DED5' };
const DK = { fg: '#F4F0E6', sub: 'rgba(244,240,230,0.78)', rule: 'rgba(244,240,230,0.2)', rule2: 'rgba(244,240,230,0.42)' };
const F = { serif: "'Noto Serif SC', serif", sans: "'Noto Sans SC', sans-serif", mono: "'IBM Plex Mono', 'Noto Sans SC', monospace" };
const PAD = 'clamp(20px, 5vw, 72px)';
const MIX = `repeating-linear-gradient(135deg, ${C.now} 0 7px, ${C.past} 7px 14px)`;
const tile = (w, h, inner) => `url('data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${inner}</svg>`)}')`;
const dot = (x, y, r, c) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
const W_ = 'rgba(255,255,255,0.38)', K_ = 'rgba(0,0,0,0.34)';
const TEX = {
  '16': tile(12, 12, dot(2, 2, 1.2, W_) + dot(8, 5, 1, W_) + dot(5, 10, 1.1, W_) + dot(10.5, 1, 0.8, W_) + dot(6, 1.5, 1.2, K_) + dot(11, 9, 1.1, K_) + dot(1.5, 7, 1, K_) + dot(8, 11, 0.7, K_)),
  '35': tile(6, 6, dot(1, 1, 0.6, W_) + dot(4, 3.5, 0.55, W_) + dot(3.5, 0.8, 0.55, K_) + dot(1.5, 4.5, 0.55, K_)),
  'dv': tile(4, 3, `<rect x="0" y="0" width="4" height="1" fill="rgba(255,255,255,0.32)"/>`),
  'hd': tile(10, 8, dot(2, 2, 0.6, 'rgba(255,255,255,0.24)') + dot(7, 6, 0.6, 'rgba(255,255,255,0.24)')),
  'dg': ''
};
const WIDE = s => `<sc-if value="{{ isWide }}" hint-placeholder-val="{{ true }}">${s}</sc-if>`;
const NARROW = s => `<sc-if value="{{ isNarrow }}" hint-placeholder-val="{{ false }}">${s}</sc-if>`;
const TEXN = { '16': ['16 毫米胶片', '最粗的颗粒'], '35': ['35 毫米胶片', '细颗粒'], 'dv': ['DV', '横向扫描线'], 'hd': ['高清数字', '平滑，略带噪点'], 'dg': ['数字', '平滑'], 'dgf': ['数字，部分胶片', '平滑夹一小段颗粒'] };
const FMT = { w02: '16', w03: '35', w05: 'dv', w06: 'hd', w08: 'dv', w13: 'dg', w15: 'dgf' };
function fill(col, tex) {
  if (col === 'mix') return `background: ${MIX};`;
  if (tex === 'dgf') return `background: linear-gradient(90deg, ${col} 0 62%, transparent 62% 80%, ${col} 80%), ${TEX['16']}, ${col};`;
  const t = TEX[tex]; return `background: ${t ? t + ', ' : ''}${col};`;
}
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const f1 = n => (+n).toFixed(1), f2 = n => (+n).toFixed(2);
const fmtHM = m => Math.floor(m / 60) + ':' + String(m % 60).padStart(2, '0');
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${(+a).toFixed(3)})`; };
const mono = s => `<span style="font-family: ${F.mono};">${s}</span>`;
const HAVE = new Set((await ls('assets/jia04')).map(f => f.split('/').pop().replace(/\.jpg$/, '')));
const slotUse = {};
function slot(k, label, shape) { const id = 'jia04-' + k; slotUse[id] = (slotUse[id] || 0) + 1; const sid = slotUse[id] > 1 ? id + '-' + slotUse[id] : id; return `<image-slot id="${sid}" ${HAVE.has(k) ? `src="assets/jia04/${k}.jpg"` : ''} shape="${shape}" placeholder="${esc(label)}"></image-slot>`; }
const poster = (k, title, w, extra = '') => `<div style="flex: none; position: relative; width: ${w}px; aspect-ratio: 2 / 3; background: ${C.deep}; box-shadow: 0 0 0 1px ${C.ink}; ${extra}">${slot('f-' + k, title, 'rect')}</div>`;
const photo = (k, name, w, h, extra = '') => `<div style="flex: none; position: relative; width: ${w}px; height: ${h}px; background: ${C.deep}; box-shadow: 0 0 0 1px ${C.ink}; ${w === h ? 'border-radius: 50%; overflow: hidden;' : ''} ${extra}">${slot('p-' + k, name, w === h ? 'circle' : 'rect')}</div>`;
const withPoster = (k, title, inner, w = 132) => `<div style="margin-top: 24px; display: flex; flex-wrap: wrap; gap: 20px 32px; align-items: flex-start;">${poster(k, title, w)}<div style="flex: 1 1 420px; min-width: 0;">${inner}</div></div>`;
const LIN = [[['hou', '侯孝贤']], [['wkw', '王家卫']], [['huangjx', '黄建新']], [['zhangyuan', '张元'], ['louye', '娄烨']], [['jiazk', '贾樟柯']]];
const ACT = { '姜武': 'jiangwu', '王宝强': 'wangbq', '赵涛': 'zhaotao', '罗蓝山': 'luolanshan' };
const estW = (s, p = 12) => [...String(s)].reduce((a, ch) => a + (ch.charCodeAt(0) < 128 ? p * 0.6 : p), 0);
const nLines = (s, p, w) => Math.max(1, Math.ceil(estW(s, p) / w));
const sw = (col, w = 11, h = 11, tex) => `<span style="display: inline-block; flex: none; width: ${w}px; height: ${h}px; ${fill(col, tex)}${col === C.end ? ` box-shadow: inset 0 0 0 1px ${C.faint};` : ''}"></span>`;
const holes = (h = 7, bg = C.paper) => `<div style="flex: none; height: ${h}px; background: repeating-linear-gradient(90deg, transparent 0 4px, ${bg} 4px 9px, transparent 9px 13px) 0 50% / 100% ${Math.max(2, h - 4)}px no-repeat;"></div>`;
const S = {
  h2: `margin: 0; font-family: ${F.serif}; font-weight: 700; font-size: clamp(30px, 3.6vw, 46px); line-height: 1.15; letter-spacing: 0.02em;`,
  h3: `margin: 0; font-family: ${F.serif}; font-size: 21px; font-weight: 700; line-height: 1.4;`,
  intro: `margin: 24px 0 0; max-width: 880px; font-size: 17px; line-height: 1.9; color: ${C.ink2}; text-wrap: pretty;`,
  lead: `margin: 22px 0 0; max-width: 1100px; font-family: ${F.serif}; font-size: clamp(20px, 2.2vw, 26px); font-weight: 600; line-height: 1.6; text-wrap: pretty;`,
  cap: `margin: 16px 0 0; max-width: 1080px; font-size: 13px; line-height: 1.8; color: ${C.cap}; text-wrap: pretty;`,
  body: `font-size: 15px; line-height: 1.8; color: ${C.ink2}; text-wrap: pretty;`,
  btn: `user-select: none; font-family: ${F.sans}; font-size: 13.5px; letter-spacing: 0.04em; padding: 8px 14px; border: 1px solid ${C.ink}; background: ${C.card}; color: ${C.ink}; cursor: pointer;`,
  btnH: `background: ${C.ink}; color: ${C.paper};`,
  chip: `display: inline-flex; align-items: center; gap: 5px; padding: 1px 7px; border: 1px solid ${C.rule2}; font-size: 11.5px; line-height: 1.6; letter-spacing: 0.04em; color: ${C.cap}; white-space: nowrap;`,
  card: `background: ${C.card}; border: 1px solid ${C.ink};`,
  lab: `font-size: 12px; letter-spacing: 0.1em; color: ${C.cap};`
};
const CL = D[2][0].map(r => ({ n: r.clip, no: r.platform_no, title: r.title, s: hms(r.start), e: hms(r.end), min: r.minutes, start: r.start, end: r.end }));
const clipOf = t => CL.find(c => t >= c.s && t < c.e) || CL[CL.length - 1];
const ACC = { E: 'mix', F: C.coal, G: C.coal, H: C.loess, I: C.loess, J: C.now, K: C.now, L: C.now, O: C.past, P: C.past, Q: C.end };
const PLATE = { E: '0:00:00', F: '1:03:29', G: '0:46:59', H: '1:15:49', I: '1:34:20', J: '1:57:51', K: '3:02:52', L: '3:43:00', M: '4:36:26', O: '3:19:10', P: '4:08:16', Q: '4:41:00' };
function letterBox(L) {
  const a = ACC[L]; let bg = 'transparent', fg = C.ink;
  if (a === 'mix') { bg = MIX; fg = '#fff'; } else if (a) { bg = a; fg = (a === C.loess || a === C.end) ? C.ink : '#fff'; }
  if (L === 'M') bg = `linear-gradient(90deg, ${C.now} 0 50%, ${C.past} 50%)`, fg = '#fff';
  return `<span style="flex: none; width: 46px; height: 46px; box-sizing: border-box; border: 1.5px solid ${C.ink}; background: ${bg}; color: ${fg}; display: flex; align-items: center; justify-content: center; font-family: ${F.mono}; font-size: 22px; font-weight: 600;">${L}</span>`;
}
function plate(full) {
  const t = hms(full), c = clipOf(t), ct = t - c.s;
  return `<span title="从这里开始听" style="flex: none; display: inline-flex; flex-direction: column; align-items: center; padding: 5px 12px 6px; margin-bottom: 4px; background: ${C.card}; border: 1.5px solid ${C.ink}; box-shadow: inset 0 0 0 3px ${C.card}, inset 0 0 0 4px ${C.rule2}; line-height: 1.1;"><span style="font-family: ${F.serif}; font-size: 15px; font-weight: 700;">第 ${c.n} 段 ${Math.floor(ct / 60)}:${String(ct % 60).padStart(2, '0')}</span><span style="margin-top: 3px; font-family: ${F.mono}; font-size: 11px; color: ${C.cap};">全片 ${full}</span></span>`;
}
function head(L, title, q) {
  return `<div style="display: flex; flex-wrap: wrap; align-items: flex-end; gap: 12px 22px; padding-bottom: 16px; border-bottom: 3px double ${C.ink};">${letterBox(L)}<h2 style="${S.h2}">${title}</h2>${PLATE[L] ? plate(PLATE[L]) : ''}<span style="margin-left: auto; padding-bottom: 6px; font-size: 15px; color: ${C.muted};">${q}</span></div>`;
}
// 全页是一张测绘图：底上一层淡网格（同封面）
const GRID = `linear-gradient(90deg, rgba(27,28,30,0.045) 1px, transparent 1px) 0 0 / 56px 56px, linear-gradient(180deg, rgba(27,28,30,0.045) 1px, transparent 1px) 0 0 / 56px 56px, ${C.paper}`;
// 素材带：有颜色归属的模块开头放一段胶片。砖红 = 拍当下，灰蓝 = 回望；讲具体作品的模块用该片的载体纹理（D13）。
// 回望的模块整块铺一层灰蓝，对应封面图例“下半灰蓝是回望”。
const REEL = { F: { col: C.coal, label: '崛起、独立与妥协' }, G: { col: C.coal, label: '崛起、独立与妥协' }, H: { col: C.loess, label: '科长宇宙' }, I: { col: C.loess, label: '科长宇宙' },
  J: { col: C.now, film: '《小武》', w: 'w02' }, K: { col: C.now, film: '《三峡好人》', w: 'w08' }, L: { col: C.now, film: '《天注定》', w: 'w13' }, M: { col: 'split', label: '拍当下 ｜ 回望' },
  O: { col: C.past, label: '回望过去的作品' }, P: { col: C.past, film: '《江湖儿女》', w: 'w15' }, Q: { col: C.end, label: '小结与结局' } };
const PAST = new Set(['O', 'P']);
function reel(L) {
  const r = REEL[L], tex = r.w ? FMT[r.w] : '';
  const label = r.film ? `${r.film} · ${D[13][0].find(x => x.film === r.film).format}` : r.label;
  const bg = r.col === 'split' ? `linear-gradient(90deg, ${C.now} 0 50%, ${C.past} 50%)`
    : tex === 'dgf' ? `linear-gradient(90deg, ${r.col} 0 62%, transparent 62% 80%, ${r.col} 80%), ${TEX['16']}, ${r.col}`
    : `${TEX[tex] ? TEX[tex] + ', ' : ''}${r.col}`;
  return `<div aria-hidden="true" style="position: relative; margin: 0 calc(-1 * ${PAD}); display: flex; flex-direction: column; background: ${C.ink};">${holes(9)}<div style="height: 18px; margin: 0 4px; background: repeating-linear-gradient(90deg, transparent 0 84px, ${C.ink} 84px 88px), ${bg};"></div>${holes(9)}<span style="position: absolute; right: ${PAD}; top: 50%; transform: translateY(-50%); max-width: calc(100% - 2 * ${PAD}); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding: 1px 9px; background: ${C.paper}; border: 1px solid ${C.ink}; font-size: 12px; line-height: 18px; color: ${C.ink};"><span style="font-family: ${F.mono}; font-weight: 600;">${L}</span>　${esc(label)}</span></div>`;
}
const secOpen = (id, L, title) => REEL[L]
  ? `<section id="${id}" data-screen-label="${L} ${title}" style="margin-top: clamp(64px, 8vw, 104px); padding: 0 ${PAD} ${PAST.has(L) ? 'clamp(56px, 7vw, 88px)' : '0'}; ${PAST.has(L) ? `background: ${rgba(C.past, 0.09)};` : ''}">${reel(L)}<div style="height: clamp(44px, 5.5vw, 72px);"></div>`
  : `<section id="${id}" data-screen-label="${L} ${title}" style="padding: clamp(64px, 8vw, 104px) ${PAD} 0;">`;
function sub(title, note) { return `<div style="display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 16px; padding-bottom: 10px; border-bottom: 1px solid ${C.ink};"><h3 style="${S.h3}">${title}</h3>${note ? `<span style="font-size: 13px; color: ${C.cap};">${note}</span>` : ''}</div>`; }
function quote(text, whoS, size = 21) {
  return `<figure style="margin: 0; padding: 16px 0 0; border-top: 1px solid ${C.ink};"><blockquote style="margin: 0; font-family: ${F.serif}; font-size: ${size}px; font-weight: 600; line-height: 1.6; text-wrap: pretty;">“${esc(text)}”</blockquote><figcaption style="margin-top: 8px; font-size: 13px; color: ${C.cap};">—— ${esc(whoS)}</figcaption></figure>`;
}
const who = t => `<span style="${S.chip}">${esc(t)}</span>`;
const cap = t => `<p style="${S.cap}">${t}</p>`;
const arrowR = (c = C.ink) => `<span aria-hidden="true" style="flex: none; align-self: center; width: 22px; height: 12px; background: ${c}; clip-path: polygon(0 42%, 64% 42%, 64% 0, 100% 50%, 64% 100%, 64% 58%, 0 58%);"></span>`;
const arrowD = (c = C.ink) => `<span aria-hidden="true" style="display: block; margin: 0 auto; width: 12px; height: 20px; background: ${c}; clip-path: polygon(42% 0, 58% 0, 58% 64%, 100% 64%, 50% 100%, 0 64%, 42% 64%);"></span>`;
const miniStrip = (w = 200) => `<div style="width: ${w}px; display: flex; flex-direction: column; background: ${C.ink};">${holes(6)}<div style="display: flex; gap: 3px; padding: 0 3px; height: 26px;">${['16', '35', 'dv', 'hd', 'dg'].map(t => `<span style="flex: 1; ${fill(C.neu, t)}"></span>`).join('')}</div>${holes(6)}</div>`;
const divider = (label, sub2) => `<div aria-hidden="true" style="padding: clamp(72px, 9vw, 120px) ${PAD} 0;"><div style="display: flex; align-items: center; gap: 18px;"><span style="flex: 1; height: 1px; background: ${C.ink};"></span>${miniStrip(200)}<span style="flex: 1; height: 1px; background: ${C.ink};"></span></div><div style="margin-top: 16px; text-align: center; font-family: ${F.serif}; font-size: 20px; font-weight: 700; letter-spacing: 0.16em;">${label}</div><div style="margin-top: 6px; text-align: center; font-size: 13px; color: ${C.cap};">${sub2}</div></div>`;
const texLegend = (extra = '') => `<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px 18px; font-size: 12.5px; color: ${C.ink2};"><span style="color: ${C.cap};">载体纹理</span>${['16', '35', 'dv', 'hd', 'dg'].map(t => `<span style="display: inline-flex; align-items: center; gap: 6px;">${sw(C.neu, 22, 13, t)}${TEXN[t][0]}<span style="color: ${C.cap};">${TEXN[t][1]}</span></span>`).join('')}${extra}</div>`;

// ===== A cover
function cover() {
  const toc = [['map', 'B', '节目地图'], ['relay', 'C', '话题接力'], ['risefall', 'D', '起落'], ['fengliu', 'E', '一部用旧素材拼成的新片'], ['underground', 'F', '从地下到主流'], ['rise', 'G', '崛起'], ['universe', 'H', '科长宇宙'], ['zhaotao', 'I', '固定的坐标'], ['xiaowu', 'J', '出道即巅峰'], ['sanxia', 'K', '可遇不可求'], ['oral', 'O', '口述历史'], ['tzd', 'L', '四个故事'], ['jianghu', 'P', '哪有什么江湖'], ['onlynow', 'M', '只能拍当下'], ['debate', 'N', '他们在哪里读法不同'], ['ending', 'Q', '结局'], ['mentions', 'R', '谁被提得最多'], ['numbers', 'S', '数字']];
  const meta = [['节目', '《电影巨辩》'], ['专辑', '付费专辑《为了华语电影》'], ['本集', '第 4 集《褒贬贾樟柯——独立与妥协》'], ['主持', '老马（magasa）、阿吴（LOOK）'], ['录制', '2024 年 12 月底'], ['时长', mono('4:46:25')], ['分段', '平台上切成 7 段播出（序号 39–45），内容是一期'], ['作品', '十七部，另谈到两部没拍成的']];
  const terms = [['科长', '主持人和中文影迷对贾樟柯的昵称，节目里说了六百多次。下文的“科长”即贾樟柯。'], ['第五代、第六代', '大陆导演的代际叫法。第五代指 80 年代出道的陈凯歌、张艺谋等；第六代指 90 年代出道的张元、王小帅、娄烨、贾樟柯等。'], ['地下电影', '90 年代未经审批拍摄、不能在国内公映的电影，后来多称独立电影。'], ['龙标', '影片通过审查后获得的公映许可标志。'], ['主竞赛、一种关注', '戛纳电影节的两个单元。'], ['金狮奖', '威尼斯电影节的最高奖。'], ['故乡三部曲', '《小武》《站台》《任逍遥》，都发生在山西。节目说这是事后的命名。'], ['拾得影像', 'found footage，用现成的影像重新剪辑成新作品。'], ['口述历史', '让当事人对着镜头讲自己经历的纪录片类型。'], ['漫游', '人物没有明确目的地游荡，叙事不按单一因果链推进。'], ['并置', '把两样东西放在一起，让它们互相说明。节目用这个词很多。'], ['概念先行', '先有想表达的观念，再去找画面和故事。节目用它来批评。'], ['老中', '近年的网络用语，指很传统的中国式观念。节目用它来批评。']];
  const legend = [['mix', '《风流一代》：旧素材加当下'], [C.now, '拍当下、赶上现场的作品'], [C.past, '回望过去的作品'], [C.coal, '崛起、独立与妥协'], [C.loess, '科长宇宙'], [C.end, '小结与结局']];
  const segs = ['16', '35', 'dv', 'hd', 'dg'];
  const notch = (y, r) => `mask: radial-gradient(circle at 0 ${y}, transparent ${r}px, #000 ${r + 0.5}px) left / 51% 100% no-repeat, radial-gradient(circle at 100% ${y}, transparent ${r}px, #000 ${r + 0.5}px) right / 51% 100% no-repeat;`;
  const grid = `linear-gradient(90deg, rgba(27,28,30,0.045) 1px, transparent 1px) 0 0 / 56px 56px, linear-gradient(180deg, rgba(27,28,30,0.045) 1px, transparent 1px) 0 0 / 56px 56px, ${C.paper}`;
  const archive = `<div style="flex: 0 1 360px; min-width: 0;"><div style="background: ${C.card}; box-shadow: 0 0 0 1px ${C.ink}; ${notch('52px', 9)}">
<div style="display: flex; justify-content: space-between; align-items: center; height: 52px; padding: 0 22px; box-sizing: border-box; font-size: 12px; letter-spacing: 0.22em;"><span>节目档案</span><span style="font-family: ${F.mono}; letter-spacing: 0.06em;">No. 04</span></div>
<div style="margin: 0 14px; border-top: 1.5px dashed ${C.ink};"></div>
<div style="padding: 14px 22px 14px; border-bottom: 1px solid ${C.rule}; display: flex; align-items: center; gap: 16px;">${photo('jiazk', '贾樟柯', 72, 90)}<div><div style="font-family: ${F.serif}; font-size: 26px; font-weight: 900; line-height: 1.3;">贾樟柯</div><div style="margin-top: 4px; font-size: 13px; color: ${C.cap};">1970 年生 · 人称“科长”</div></div></div>
${meta.map(([k, v]) => `<div style="display: grid; grid-template-columns: 52px minmax(0, 1fr); gap: 12px; padding: 9px 22px; border-bottom: 1px solid ${C.rule}; font-size: 14.5px; line-height: 1.65;"><span style="color: ${C.cap};">${k}</span><span>${v}</span></div>`).join('')}
<div style="padding: 14px 22px 18px;"><div style="display: flex; gap: 2px;">${CL.map(c => `<span title="${esc('第 ' + c.n + ' 段 · 平台序号 ' + c.no + ' · ' + c.min + ' 分钟')}" style="flex: ${c.min} 1 0; min-width: 0; height: 22px; display: flex; flex-direction: column; background: ${C.ink};">${holes(5)}<span style="flex: 1; margin: 0 2px; background: ${C.paper};"></span>${holes(5)}</span>`).join('')}</div><div style="margin-top: 8px; font-size: 12px; color: ${C.cap};">7 段，宽度按时长</div></div>
</div></div>`;
  const strip = `<div style="position: relative; margin-top: clamp(40px, 5vw, 64px);">
<div style="display: flex; flex-direction: column; background: ${C.ink};">${holes(10)}<div style="display: flex; gap: 4px; padding: 0 4px; height: clamp(120px, 13vw, 176px);">${segs.map(t => `<div style="flex: 1 1 0; display: flex; flex-direction: column;"><div style="flex: 1; ${fill(C.now, t)}"></div><div style="flex: 1; ${fill(C.past, t)}"></div></div>`).join('')}</div>${holes(10)}</div>
<div aria-hidden="true" style="position: absolute; left: -12px; right: -12px; top: 50%; height: 2px; margin-top: -1px; background: ${C.paper}; box-shadow: 0 0 0 1px ${C.ink};"></div>
<div style="position: absolute; left: 22px; top: 18px; bottom: 18px; display: flex; flex-direction: column; justify-content: space-between; color: #fff; font-family: ${F.serif}; font-weight: 700; font-size: clamp(18px, 2vw, 24px); letter-spacing: 0.2em; pointer-events: none;"><span>当下</span><span>回望</span></div>
<div style="position: absolute; right: 18px; top: 50%; transform: translateY(-50%); padding: 3px 10px; background: ${C.paper}; border: 1px solid ${C.ink}; font-family: ${F.mono}; font-size: 12.5px;">水位线 156 米</div>
</div>
<div style="display: flex; gap: 4px; padding: 10px 4px 0;">${segs.map(t => `<div style="flex: 1 1 0; min-width: 0; font-size: 12.5px; line-height: 1.5; color: ${C.cap};"><span style="font-family: ${F.serif}; font-size: 14px; font-weight: 700; color: ${C.ink};">${TEXN[t][0]}</span><br>${TEXN[t][1]}</div>`).join('')}</div>
<p style="${S.cap}">一条素材带，从左到右颗粒由粗变细，对应他用过的载体；上半砖红是拍当下，下半灰蓝是回望，全页沿用。水位线取自节目提到的三峡水库一次蓄水高度。</p>`;
  const top = `<div style="background: ${grid}; padding: clamp(22px, 3vw, 36px) ${PAD} clamp(40px, 5vw, 60px); border-bottom: 1px solid ${C.ink};">
${seriesNav({ color: C.cap })}
<div style="margin-top: clamp(36px, 5vw, 64px); display: flex; flex-wrap: wrap; gap: 44px 56px; align-items: flex-start;">
<div style="flex: 1 1 600px; min-width: 0;">
<div style="display: flex; align-items: center; gap: 14px; font-family: ${F.serif}; font-size: 18px; font-weight: 600; letter-spacing: 0.24em;">为了华语电影<span style="font-family: ${F.mono}; font-size: 15px; letter-spacing: 0.04em; border: 1.5px solid ${C.ink}; padding: 2px 8px 1px;">04</span></div>
<h1 style="margin: 22px 0 0; font-family: ${F.serif}; font-weight: 900; font-size: clamp(56px, 9vw, 132px); line-height: 1.05; letter-spacing: 0.04em;">褒贬贾樟柯</h1>
<div style="margin-top: 22px; font-size: 17px; line-height: 1.7; color: ${C.muted};">独立与妥协 · 电影巨辩《为了华语电影》第 4 集 · 4 小时 46 分 · 老马 × 阿吴</div>
<div style="margin-top: 44px; max-width: 780px; font-family: ${F.serif}; font-weight: 700; font-size: clamp(24px, 2.8vw, 36px); line-height: 1.65; text-wrap: pretty;">他最好的作品，都是站在<span style="background: linear-gradient(transparent 56%, ${C.yel} 56% 92%, transparent 92%);">现场</span>拍出来的。</div>
</div>
${archive}
</div>
${strip}
</div>`;
  const paper = `<div style="padding: clamp(40px, 5vw, 64px) ${PAD} clamp(44px, 5vw, 64px); border-bottom: 3px double ${C.ink};">
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr)); gap: 32px 64px; align-items: start;">
<p style="margin: 0; font-size: 17.5px; line-height: 1.95; color: ${C.ink2}; text-wrap: pretty;">节目对贾樟柯有褒有贬。他最好的三部，《小武》《三峡好人》《天注定》，都是站在现场、被正在发生的现实撞出来的；他一离开当下去拍历史、拍传奇、呼唤传统情义，或者概念先行、符号过密，作品就失去力量。另一条线是独立与妥协：从交罚款求解禁的地下导演，到每部必进戛纳的主流人物，节目不相信有人能“游刃有余”。结尾落在新片《风流一代》：他关心了二十多年的命题，普通人和滚滚向前的时代车轮，告一段落了。</p>
<div style="display: grid; gap: 26px;">${quote('他一旦违背这个方法，拍出来的东西就不太有能量。', '一位主持人', 22)}${quote('所有的游刃有余、长袖善舞的表象背后，都是看不见的更大的妥协。', '一位主持人', 22)}</div>
</div>
<div style="margin-top: 52px;">${sub('先认几个词', '节目里反复出现')}<div style="margin-top: 6px; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr)); column-gap: 32px;">${terms.map(([k, v]) => `<div style="display: grid; grid-template-columns: 112px minmax(0, 1fr); gap: 12px; padding: 12px 0; border-bottom: 1px solid ${C.rule};"><span style="font-family: ${F.serif}; font-size: 16px; font-weight: 700; line-height: 1.5;">${k}</span><span style="font-size: 14px; line-height: 1.7; color: ${C.ink2}; text-wrap: pretty;">${v}</span></div>`).join('')}</div></div>
<div style="margin-top: 32px; display: flex; flex-wrap: wrap; align-items: center; gap: 10px 22px; font-size: 13px; color: ${C.cap};"><span>颜色全页一致：</span>${legend.map(([c, n]) => `<span style="display: inline-flex; align-items: center; gap: 7px; color: ${C.ink2};">${sw(c, 18, 12)}${n}</span>`).join('')}<span style="display: inline-flex; align-items: center; gap: 7px; color: ${C.ink2};">${sw(C.yel, 18, 12)}信号黄：每个模块最多一处</span></div>
<div style="margin-top: 14px;">${texLegend(`<span style="color: ${C.cap};">纹理为整理者所加，节目没讲到载体的作品不加纹理</span>`)}</div>
<nav style="margin-top: 36px; display: flex; flex-wrap: wrap; gap: 8px;">${toc.map(([id, l, t]) => `<a href="#${id}" style="display: inline-flex; align-items: baseline; gap: 8px; padding: 7px 12px 6px; border: 1px solid ${C.rule2}; background: ${C.card}; color: ${C.ink}; font-size: 14px;" style-hover="border-color: ${C.ink}; color: ${C.ink};"><span style="font-family: ${F.mono}; font-weight: 600; font-size: 13px;">${l}</span>${t}</a>`).join('')}</nav>
</div>`;
  return `<div style="height: 12px; background: ${MIX}; border-bottom: 1px solid ${C.ink};"></div><header id="cover" data-screen-label="A 封面">${top}${paper}</header>`;
}

// ===== B + C
const SHORT = { b00: '风流一代', b01: '崛起', b02: '身份', b03: '结构', b04: '演员', b05: '符号', b06: '小武', b07: '站台', b08: '任逍遥', b09: '世界', b10: '三峡好人', b11: '二十四城记', b12: '海上传奇', b13: '天注定', b14: '山河故人', b15: '江湖儿女', b16: '纪录片', b17: '一直游', b18: '短片', b19: '结局' };
const CATC = { new: 'mix', rise: C.coal, universe: C.loess, end: C.end };
const SECFMT = { b06: '16', b07: '35', b08: 'dv', b09: 'hd', b10: 'dv', b13: 'dg', b15: 'dgf' };
const SEC = {}; D[1][0].forEach(r => { SEC[r.id] = { id: r.id, name: r.section, s: hms(r.start), e: hms(r.end), min: r.minutes, share: r.share_pct, cat: r.category, mode: r.mode, c: r.mode === 'now' ? C.now : r.mode === 'past' ? C.past : r.mode === 'mix' ? 'mix' : (CATC[r.category] || C.faint), tex: SECFMT[r.id] }; });
const SECS = Object.values(SEC);
const B18SPLIT = ((hms('4:35:01') - SEC.b18.s) / (SEC.b18.e - SEC.b18.s) * 100).toFixed(1);
const secFill = s => s.id === 'b18' ? `background: linear-gradient(90deg, ${C.now} 0 ${B18SPLIT}%, ${C.past} ${B18SPLIT}% 100%);` : fill(s.c, s.tex) + (s.c === C.end ? ` box-shadow: inset 0 0 0 1px ${C.faint};` : '');
const secFlat = s => s.id === 'b18' ? `background: linear-gradient(90deg, ${C.now} 0 ${B18SPLIT}%, ${C.past} ${B18SPLIT}% 100%);` : s.c === 'mix' ? `background: ${MIX};` : `background: ${s.c};`;
const onDark = c => c === C.now || c === C.past || c === C.coal || c === 'mix';
const tickCol = s => s.c === 'mix' ? C.ink : s.c === C.end ? C.faint : s.c;
const ST = D[3][0].map(r => ({ t: hms(r.time), time: r.time, clip: r.clip, ct: r.clip_time, label: r.label, sec: r.section, level: +r.level }));
const N1 = ST.filter(s => s.level === 1).length, NST = ST.length;
const GROUPS = [{ k: 'fest', name: '电影节与产业', c: '#4F4A42' }, { k: 'system', name: '体制、审查与独立', c: C.coal }, { k: 'form', name: '形式与技法', c: '#73695A' }, { k: 'act', name: '演员与表演', c: '#8F7B55' }, { k: 'symbol', name: '符号与观念', c: C.loess }, { k: 'real', name: '现实与纪录', c: '#5E5A50' }, { k: 'home', name: '情义、故乡与江湖', c: C.past }, { k: 'modern', name: '时代与现代化', c: C.now }];
const BINS = D[4][0].map((r, i, a) => ({ s: hm(r.bin_start), e: i === a.length - 1 ? T : hm(r.bin_end), a: r.bin_start, b: r.bin_end, v: Object.fromEntries(GROUPS.map(g => [g.k, +r[g.k + '_per1k']])) }));
const PEAKS = {
  fest: [['0:50', '第六代在电影节上', 1, 'L']],
  system: [['1:00', '地下电影与罚款', 1, 'L'], ['3:40', '《天注定》的审查', 0, 'L']],
  form: [['1:20', '三段式、漫游与空间', 1, 'L'], ['2:50', '《世界》的景观', 0, 'L']],
  act: [['1:30', '业余演员与赵涛', 1, 'L']],
  symbol: [['2:50', '《世界》', 1, 'R'], ['3:00', '《三峡好人》的魔幻场景', 0, 'L']],
  real: [['3:20', '《二十四城记》', 1, 'L'], ['3:00', '《三峡好人》', 0, 'R']],
  home: [['4:10', '《江湖儿女》', 1, 'R']],
  modern: [['4:40', '结局：新的时代命题', 1, 'R'], ['3:00', '《三峡好人》', 0, 'L']]
};
const KW = '时代与现代化：现代化、现代性、全球化、时代、改革、发展、变迁、变革、拆迁、移民、流动、进步；体制、审查与独立：审查、过审、龙标、电影局、地下、体制、权力、官方、主流、独立、妥协、合法、枪毙、解禁、被禁、禁令；电影节与产业：戛纳、威尼斯、柏林、金狮、金棕榈、主竞赛、一种关注、电影节、投资、版权、成本、票房、市场、产业、院线、出品；形式与技法：镜头、调度、剪辑、素材、声音、配乐、构图、摄影、胶片、DV、数字、画面、叙事、结构、三段、漫游、空间、画幅、字幕；演员与表演：演员、表演、演技、业余、台词、哭戏、明星、口音、配音；符号与观念：符号、概念、观念、隐喻、象征、魔幻、超现实、装置、景观、金句、嘴替、说教、主题先行；情义、故乡与江湖：情义、情谊、传统、故乡、家乡、老家、回家、爱情、亲情、友情、感情、江湖、怀旧、血缘、老中、方言、义气；现实与纪录：现实、写实、纪录片、真实、口述、历史、现场、记录。';
const HMAX = 17.22;
const heatA = v => v <= 0 ? 0 : 0.08 + 0.92 * Math.pow(Math.min(v, HMAX) / HMAX, 0.8);
const TW = 1152;
const G2 = 'display: grid; grid-template-columns: 128px 1152px; column-gap: 16px;';
function cHead() {
  const order = GROUPS.map(g => [g, PEAKS[g.k].find(p => p[2] === 1)[0]]);
  const relay = order.map(([g, t]) => `<span style="display: inline-flex; align-items: center; gap: 7px; padding: 5px 10px; border: 1px solid ${C.rule2}; background: ${C.card}; font-size: 13.5px;">${sw(g.c, 9, 9)}${g.name}<span style="font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${t}</span></span>`).join(`<span style="color: ${C.faint};">→</span>`);
  return `<div style="display: flex; flex-wrap: wrap; align-items: flex-end; gap: 12px 18px; padding-bottom: 14px; border-bottom: 3px double ${C.ink};"><span style="flex: none; width: 38px; height: 38px; box-sizing: border-box; border: 1.5px solid ${C.ink}; display: flex; align-items: center; justify-content: center; font-family: ${F.mono}; font-size: 18px; font-weight: 600;">C</span><h3 id="relay" style="margin: 0; font-family: ${F.serif}; font-weight: 700; font-size: clamp(26px, 2.8vw, 34px);">话题接力</h3><span style="margin-left: auto; padding-bottom: 4px; font-size: 15px; color: ${C.muted};">每段时间在聊什么</span></div>
<div style="margin-top: 18px; font-family: ${F.serif}; font-size: clamp(19px, 2vw, 23px); font-weight: 600; line-height: 1.6; text-wrap: pretty;">第一个小时谈新片和电影节，第二个小时谈方法和演员，第三个小时谈符号和现实，最后一个小时谈审查、江湖和结局。</div>
<div style="margin-top: 14px; display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px;"><span style="font-size: 12.5px; color: ${C.cap};">八组按主峰出现的先后排列</span>${relay}</div>`;
}
function axisRow() {
  let a = '';
  for (let m = 0; m <= 270; m += 30) a += `<div style="position: absolute; left: ${f1(m * 60 / T * TW)}px; top: 0; width: 1px; height: 6px; background: ${C.rule2};"></div><div style="position: absolute; left: ${f1(m * 60 / T * TW)}px; top: 9px; ${m ? 'transform: translateX(-50%);' : ''} font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${fmtHM(m)}</div>`;
  a += `<div style="position: absolute; right: 0; top: 0; width: 1px; height: 6px; background: ${C.rule2};"></div><div style="position: absolute; right: 0; top: 24px; font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">4:46</div>`;
  return `<div style="position: relative; height: 42px; border-top: 1px solid ${C.rule2};">${a}</div>`;
}
function bcDesktop() {
  const L1 = ST.filter(s => s.level === 1), L2 = ST.filter(s => s.level === 2);
  const ttl = s => esc(s.time + ' · 第 ' + s.clip + ' 段 ' + s.ct + ' · ' + s.label + '（' + SEC[s.sec].name + '）');
  const lanes = [], pos = [];
  const fits = (k, l, r) => !(lanes[k] || []).some(([p, q]) => l < q + 5 && r + 5 > p);
  L1.forEach(s => { const x = s.t / T * TW, w = Math.ceil(estW(s.label, 12) + 24); const opts = [[x, x + w, true], [x - w, x, false]].filter(([l, r]) => l >= 0 && r <= TW); let k = 0, pick = null; while (!pick) { for (const o of opts) if (fits(k, o[0], o[1])) { pick = o; break; } if (!pick) k++; } (lanes[k] = lanes[k] || []).push([pick[0], pick[1]]); pos.push({ s, x, w, left: pick[0], k, la: pick[2] }); });
  const NL = lanes.length, LH = 24, BASE = 18, H = NL * LH + BASE + 2;
  let leads = '', tags = '', ticks = '';
  pos.forEach(p => {
    const b = BASE + p.k * LH, sec = SEC[p.s.sec];
    leads += `<div style="position: absolute; left: ${f1(p.x)}px; bottom: 0; width: 1px; height: ${b}px; background: ${rgba(C.ink, 0.42)};"></div><span style="position: absolute; left: ${f1(p.x - 2.5)}px; bottom: -2.5px; width: 5px; height: 5px; border-radius: 50%; background: ${C.ink};"></span>`;
    tags += `<div title="${ttl(p.s)}" style="position: absolute; left: ${f1(p.left)}px; bottom: ${b}px; height: 20px; display: flex; ${p.la ? '' : 'flex-direction: row-reverse;'} box-sizing: border-box; border: 1px solid ${C.ink}; background: ${C.card}; color: ${C.ink}; white-space: nowrap; cursor: default;" style-hover="background: ${C.ink}; color: ${C.paper};"><span style="flex: none; width: 6px; ${secFlat(sec)}"></span><span style="padding: 0 6px; font-size: 12px; line-height: 18px;">${esc(p.s.label)}</span></div>`;
  });
  L2.forEach(s => { const x = s.t / T * TW; ticks += `<div title="${ttl(s)}" style="position: absolute; left: ${f1(x - 4.5)}px; bottom: 0; width: 9px; height: 15px; display: flex; justify-content: center; align-items: flex-end; cursor: help;"><span style="width: 1.5px; height: 9px; background: ${tickCol(SEC[s.sec])};"></span></div>`; });
  let clips = '';
  CL.forEach(c => { const l = c.s / T * TW, w = (c.e - c.s) / T * TW; clips += `<div title="${esc('第 ' + c.n + ' 段 · 平台序号 ' + c.no + ' · ' + c.start + '–' + c.end + ' · ' + c.min + ' 分钟 · ' + c.title)}" style="position: absolute; top: 0; bottom: 0; left: ${f1(l)}px; width: ${f1(w)}px; padding: 0 1px; box-sizing: border-box; cursor: help;"><div style="height: 100%; display: flex; flex-direction: column; background: ${C.ink};">${holes(7)}<div style="flex: 1; margin: 0 3px; background: ${C.card}; display: flex; align-items: center; justify-content: center; gap: 8px;" style-hover="background: ${C.deep};"><span style="font-family: ${F.mono}; font-size: 16px; font-weight: 600; line-height: 1;">${c.n}</span><span style="font-size: 11px; line-height: 1; color: ${C.cap}; white-space: nowrap;">平台 ${c.no} · ${c.min}′</span></div>${holes(7)}</div></div>`; });
  let bands = '';
  SECS.forEach(s => {
    const l = s.s / T * TW, w = (s.e - s.s) / T * TW, nm = SHORT[s.id], dk = onDark(s.c) || s.id === 'b18';
    const txt = s.c === 'mix' ? `background: ${C.card}; color: ${C.ink}; padding: 2px 5px; display: inline-block;` : `color: ${dk ? '#fff' : C.ink};`;
    bands += `<div title="${esc(s.name + ' · ' + s.min + ' 分钟 · ' + s.share + '%')}" style="position: absolute; top: 0; bottom: 0; left: ${f1(l)}px; width: ${f1(w)}px; padding-right: 2px; box-sizing: border-box;"><div style="height: 100%; box-sizing: border-box; ${secFill(s)} padding: 7px 5px; overflow: hidden;">${w >= nm.length * 13 + 12 ? `<div style="font-family: ${F.serif}; font-size: 13px; font-weight: 700; line-height: 1.3; white-space: nowrap; ${txt}">${esc(nm)}</div>` : ''}${w >= 44 ? `<div style="margin-top: 4px; font-family: ${F.mono}; font-size: 11px; white-space: nowrap; ${txt}">${w >= 120 ? s.min + '′ · ' + s.share + '%' : Math.round(s.min) + '′'}</div>` : ''}</div></div>`;
  });
  const lab = (t, sb, al = 'center') => `<div style="display: flex; flex-direction: column; justify-content: ${al}; gap: 4px;"><span style="font-size: 13px; letter-spacing: 0.12em; color: ${C.ink2};">${t}</span>${sb ? `<span style="font-size: 11.5px; line-height: 1.55; color: ${C.cap};">${sb}</span>` : ''}</div>`;
  const legend = [['mix', '《风流一代》'], [C.coal, '崛起与身份'], [C.loess, '科长宇宙'], [C.now, '拍当下的作品'], [C.past, '回望的作品'], [C.end, '小结与结局']].map(([c, n]) => `<span style="display: inline-flex; align-items: center; gap: 6px;">${sw(c, 14, 10)}${n}</span>`).join('');
  const secLines = SECS.slice(1).map(s => `<div style="position: absolute; top: 0; bottom: 0; left: ${f1(s.s / T * TW)}px; width: 1px; background: ${C.rule2};"></div>`).join('');
  let crows = '';
  GROUPS.forEach(g => {
    const peak = Math.max(...BINS.map(b => b.v[g.k]));
    let cells = '', notes = '';
    BINS.forEach(b => { const a = heatA(b.v[g.k]); if (a) cells += `<div title="${esc(g.name + ' · ' + b.a + '–' + b.b + ' · 每千字 ' + b.v[g.k])}" style="position: absolute; top: 0; bottom: 0; left: ${f1(b.s / T * TW)}px; width: ${f1((b.e - b.s) / T * TW - 1)}px; background: ${rgba(g.c, a)};"></div>`; });
    PEAKS[g.k].forEach(([st, note, kind, side]) => {
      const b = BINS.find(x => x.a === st), v = b.v[g.k];
      cells += `<div style="position: absolute; top: -2px; bottom: -2px; left: ${f1(b.s / T * TW)}px; width: ${f1((b.e - b.s) / T * TW)}px; box-sizing: border-box; border: ${kind === 1 ? `2px solid ${C.ink}` : `1.5px dashed ${C.ink}`}; pointer-events: none;"></div>`;
      notes += `<div style="position: absolute; ${side === 'R' ? `right: ${f1(TW - b.e / T * TW)}px` : `left: ${f1(b.s / T * TW)}px`}; bottom: 4px; display: flex; gap: 6px; align-items: baseline; white-space: nowrap; font-size: 12px; color: ${C.ink};"><span style="font-family: ${F.mono}; font-weight: 600;">${v.toFixed(1)}</span><span style="font-family: ${F.mono}; color: ${C.cap};">${b.a}–${b.b}</span><span>${note}</span></div>`;
    });
    crows += `<div style="${G2}"><div style="display: flex; align-items: center; gap: 8px; padding-top: 22px;">${sw(g.c, 10, 10)}<div><div style="font-family: ${F.serif}; font-size: 14px; font-weight: 600; line-height: 1.3;">${g.name}</div><div style="font-size: 11px; color: ${C.cap};">峰值 ${peak.toFixed(1)}</div></div></div><div style="position: relative; height: 58px;"><div style="position: absolute; left: 0; right: 0; top: 0; height: 22px;">${notes}</div><div style="position: absolute; left: 0; right: 0; top: 22px; bottom: 3px; background: rgba(27,28,30,0.035);">${cells}</div></div></div>`;
  });
  return `<div style="margin-top: 36px; overflow-x: auto; padding-bottom: 8px;"><div style="width: 1296px;">
<div style="${G2}">${lab('站点', `方框是 ${N1} 个主站，贴着时间轴的短刻度是 ${NST - N1} 个次站。悬停可看在第几段的几分几秒`, 'flex-end')}<div style="position: relative; height: ${H}px;">${leads}${ticks}${tags}</div></div>
<div style="${G2} margin-top: 6px;">${lab('平台 7 段', '格宽等于该段时长')}<div style="position: relative; height: 54px;">${clips}</div></div>
<div style="${G2} margin-top: 4px;">${lab('20 个板块', '按节目里的过渡句切分')}<div style="position: relative; height: 60px;">${bands}</div></div>
<div style="${G2} margin-top: 10px;"><div></div><div style="display: flex; flex-wrap: wrap; gap: 6px 18px; font-size: 12.5px; color: ${C.cap};">${legend}<span>作品板块叠加载体纹理（图例见封面）；“短片”一格左砖红右灰蓝，对应《小山回家》《河上的爱情》</span></div></div>
<div style="${G2} margin-top: 6px;"><div></div><div style="font-size: 12.5px; color: ${C.cap};">第 1 段是一个板块；第 2 段两个；第 3 段三个；第 4 段两个；第 5 段三个；第 6 段四个；第 7 段五个。</div></div>
<div style="${G2} margin-top: 12px;"><div style="font-size: 12px; color: ${C.cap};">全片时间</div>${axisRow()}</div>
</div></div>
<div style="margin-top: 52px;">${cHead()}</div>
<div style="margin-top: 14px; overflow-x: auto; padding-bottom: 8px;"><div style="width: 1296px;">
<div>${crows}</div>
<div style="${G2} margin-top: 6px;"><div style="font-size: 12px; color: ${C.cap};">全片时间</div>${axisRow()}</div>
<div style="${G2} margin-top: 2px;"><div></div><div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px; font-size: 12px; color: ${C.cap};"><span style="font-family: ${F.mono};">0</span><span style="width: 160px; height: 10px; background: linear-gradient(90deg, rgba(27,28,30,0.08), ${C.ink});"></span><span style="font-family: ${F.mono};">17.2</span><span>每千字出现次数，八行同一色阶；实线框为各组的峰，虚线框为第二个峰</span></div></div>
</div></div>`;
}
function bcMobile() {
  const H = 1500, k = H / T;
  const X = { clip: 38, sec: 67, heat: 79, lead: 161, lab: 183 };
  let h = '';
  for (let m = 0; m <= 270; m += 30) { const y = m * 60 * k; h += `<div style="position: absolute; left: 0; top: ${f1(y)}px; transform: translateY(-50%); font-family: ${F.mono}; font-size: 11px; color: ${C.cap};">${fmtHM(m)}</div><div style="position: absolute; left: ${X.clip}px; width: ${X.lead - X.clip}px; top: ${f1(y)}px; height: 1px; background: ${C.rule};"></div>`; }
  CL.forEach(c => { const y = c.s * k, dy = (c.e - c.s) * k; h += `<div style="position: absolute; left: ${X.clip}px; width: 26px; top: ${f1(y)}px; height: ${f1(dy)}px; padding: 1px 0; box-sizing: border-box;"><div style="height: 100%; box-sizing: border-box; border: 1px solid ${C.ink}; background: ${C.card}; display: flex; align-items: center; justify-content: center; font-family: ${F.mono}; font-size: 11px; font-weight: 600;">${c.n}</div></div>`; });
  SECS.forEach(s => { h += `<div style="position: absolute; left: ${X.sec}px; width: 8px; top: ${f1(s.s * k)}px; height: ${f1((s.e - s.s) * k - 2)}px; ${secFlat(s)}"></div>`; });
  GROUPS.forEach((g, j) => { BINS.forEach(b => { const a = heatA(b.v[g.k]); if (!a) return; h += `<div style="position: absolute; left: ${X.heat + j * 10}px; width: 9px; top: ${f1(b.s * k)}px; height: ${f1((b.e - b.s) * k - 1)}px; background: ${rgba(g.c, a)};"></div>`; }); });
  const items = [];
  SECS.forEach(s => items.push({ t: s.s, o: 0, kind: 'sec', s }));
  ST.filter(s => s.level === 1).forEach(s => items.push({ t: s.t, o: 1, kind: 'st', s }));
  items.sort((a, b) => a.t - b.t || a.o - b.o);
  const AW = 165;
  items.forEach(it => { it.h = it.kind === 'sec' ? Math.ceil(estW(it.s.name + ' 00.0′', 14) / AW) * 19 + 10 : Math.ceil((estW(it.s.label, 13) + 40) / AW) * 18 + 2; it.y = it.t * k; });
  const out = []; let prev = -1e9;
  items.forEach(it => { const top = Math.max(0, it.y - it.h / 2, prev); out.push(top); prev = top + it.h + 3; });
  const HH = Math.max(H, prev + 10);
  let svg = '', labs = '';
  items.forEach((it, i) => {
    const cy = out[i] + (it.kind === 'sec' ? 10 : it.h / 2);
    svg += `<line x1="0" y1="${f1(it.y)}" x2="22" y2="${f1(cy)}" stroke="${it.kind === 'sec' ? tickCol(it.s) : C.ink}" strokeOpacity="0.6" strokeWidth="1"></line>`;
    if (it.kind === 'sec') labs += `<div style="position: absolute; left: ${X.lab}px; right: 0; top: ${f1(out[i])}px; padding-top: 4px; border-top: 2px solid ${tickCol(it.s)}; font-family: ${F.serif}; font-size: 14px; font-weight: 700; line-height: 1.35;">${esc(it.s.name)} <span style="font-family: ${F.mono}; font-size: 11px; font-weight: 400; color: ${C.cap};">${it.s.min}′</span></div>`;
    else labs += `<div style="position: absolute; left: ${X.lab}px; right: 0; top: ${f1(out[i])}px; font-size: 13px; line-height: 18px;"><span style="font-family: ${F.mono}; font-size: 11px; color: ${C.cap}; margin-right: 6px;">${it.s.time.slice(0, -3)}</span>${esc(it.s.label)}</div>`;
  });
  const leg = GROUPS.map(g => `<span style="display: inline-flex; align-items: center; gap: 6px;">${sw(g.c, 9, 9)}${g.name}</span>`).join('');
  return `<div style="margin-top: 28px;">${cHead()}</div>
<div style="margin-top: 18px; display: flex; flex-wrap: wrap; gap: 6px 14px; font-size: 12.5px; color: ${C.ink2};">${leg}</div>
<p style="${S.cap}">左起：全片时间、平台 7 段、板块颜色、八组话题的热度（从左到右与上面图例同序，颜色越深该组关键词每千字出现越多）、主站。</p>
<div style="position: relative; height: ${f1(HH)}px; margin: 26px 0 12px;">${h}<svg width="22" height="${f1(HH)}" style="position: absolute; left: ${X.lead}px; top: 0; overflow: visible;">${svg}</svg>${labs}</div>`;
}
function stationList() {
  let h = '';
  CL.forEach(c => {
    const [t1, t2] = c.title.split('｜');
    const rows = ST.filter(s => s.clip === c.n).map(s => {
      const sec = SEC[s.sec], one = s.level === 1;
      return `<div style="display: ${one ? 'grid' : '{{ stMinorGrid }}'}; grid-template-columns: 56px 40px 8px minmax(0, 1fr); gap: 8px; align-items: baseline; padding: 4px 0; font: 12px/1.55 ${F.mono}; color: ${C.cap};"><span>${s.time}</span><span>${s.ct}</span><span style="width: 8px; height: 8px; align-self: center; ${secFlat(sec)}"></span><span style="font: ${one ? `600 15px/1.55 ${F.serif}; color: ${C.ink}` : `14px/1.55 ${F.sans}; color: ${C.muted}`};">${esc(s.label)}</span></div>`;
    }).join('');
    h += `<div style="break-inside: avoid; margin-bottom: 26px; background: ${C.card}; border: 1px solid ${C.ink};"><div style="display: grid; grid-template-columns: 58px minmax(0, 1fr); border-bottom: 1px solid ${C.ink}; background: ${C.deep};"><div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; background: ${C.ink}; color: ${C.paper};"><span style="font-size: 11px; letter-spacing: 0.1em; line-height: 1;">第</span><span style="font-family: ${F.mono}; font-size: 22px; font-weight: 600; line-height: 1;">${c.n}</span><span style="font-size: 11px; letter-spacing: 0.1em; line-height: 1;">段</span></div><div style="padding: 10px 14px;"><div style="font-family: ${F.serif}; font-size: 15.5px; font-weight: 700; line-height: 1.45; text-wrap: pretty;">${esc(t1)}</div><div style="margin-top: 3px; font-size: 12.5px; line-height: 1.55; color: ${C.muted};">${esc(t2 || '')}</div><div style="margin-top: 3px; font-family: ${F.mono}; font-size: 11.5px; color: ${C.cap};">平台序号 ${c.no} · ${c.start}–${c.end} · ${c.min}′</div></div></div><div style="padding: 8px 14px 10px;">${rows}</div></div>`;
  });
  return `<div style="margin-top: 60px; display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px 20px; padding-bottom: 12px; border-bottom: 1px solid ${C.ink};"><h3 style="margin: 0; font-family: ${F.serif}; font-size: 24px; font-weight: 700;">按段落回听</h3><span style="font-size: 13.5px; color: ${C.cap};">每行依次是全片时间、该段内的时间、站点；宋体为主站</span><div role="button" onClick="{{ toggleSt }}" style="margin-left: auto; ${S.btn}" style-hover="${S.btnH}">{{ stBtn }}</div></div>
<div style="margin-top: 22px; columns: 320px; column-gap: 28px;">${h}</div>`;
}
function sectionB() {
  return `${secOpen('map', 'B', '节目地图')}${head('B', '节目地图', '近五个小时怎么走的')}
<p style="${S.intro}">节目是倒着进入的：先用 47 分钟拆最新的《风流一代》，再用 71 分钟搭框架，讲他怎么崛起、怎么从地下到主流、他的“宇宙”；然后用 159 分钟从《小武》逐部讲到短片；最后 10 分钟是小结和结局。</p>
<div style="${S.lead}">新片一部聊了 47 分钟（16%）；搭框架 71 分钟（25%）；逐部讲作品 159 分钟（55%）；<span style="border-bottom: 4px solid ${C.now};">《小武》一部 30 分钟</span>。</div>
${WIDE(`<div>${bcDesktop()}<p style="${S.cap}">条宽按时长等比。板块按节目里的过渡句切分，误差约一分钟；板块颜色中的“当下、回望”为整理者所加。话题热度每 10 分钟一格，用每千字出现次数而不是次数（最后一格不满 7 分钟）。各组关键词——${KW}</p></div>`)}
${NARROW(`<div>${bcMobile()}<p style="${S.cap}">各组关键词——${KW}</p></div>`)}
${stationList()}
</section>`;
}

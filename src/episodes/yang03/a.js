const MD = 'src/episodes/yang03/handoff.md';
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
const hms = s => { const p = s.split(':').map(Number); return p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + p[1]; };
const hm = s => { const [h, m] = s.split(':').map(Number); return h * 3600 + m * 60; };
const T = hms('8:05:45');

const C = { ink: '#1A1C1E', ink2: '#2B2B29', paper: '#F5F1E8', card: '#FBF9F3', deep: '#ECE6D9', muted: '#4D4943', cap: '#655E54', faint: '#8E877A', rule: 'rgba(26,28,30,0.15)', rule2: 'rgba(26,28,30,0.32)', t80: '#2F7F79', gl: '#1E2B4A', o90: '#C26A2E', life: '#7A6A55', ctx: '#6B8299', theme: '#8E5572', after: '#A89B88', neu: '#B8B2A6', yel: '#F2C230' };
const DK = { fg: '#F5F1E8', sub: 'rgba(245,241,232,0.76)', rule: 'rgba(245,241,232,0.2)', rule2: 'rgba(245,241,232,0.42)', deep: '#16203A', card: '#253458' };
const F = { serif: "'Noto Serif SC', serif", sans: "'Noto Sans SC', sans-serif", mono: "'IBM Plex Mono', 'Noto Sans SC', monospace", brush: "'Ma Shan Zheng', 'Noto Serif SC', serif" };
const PAD = 'clamp(20px, 5vw, 72px)';
const CAT = {
  frame: { c: C.neu, g: 'ba', name: '立题与总结' },
  life: { c: C.life, g: 'hx', name: '其人' },
  context: { c: C.ctx, g: 'sq', name: '新电影背景' },
  theme: { c: C.theme, g: 'pe', name: '母题与风格' },
  film80: { c: C.t80, g: 'ci', name: '八十年代的作品' },
  guling: { c: C.gl, g: 'di', name: '《牯岭街》' },
  film90: { c: C.o90, g: 'tr', name: '九十年代之后的作品' },
  after: { c: C.after, g: 'sq', hollow: true, name: '身后事' }
};
const DARK = new Set([C.t80, C.gl, C.o90, C.life, C.ctx, C.theme]);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pct = f => (f * 100).toFixed(3) + '%';
const f1 = n => (+n).toFixed(1), f2 = n => (+n).toFixed(2);
const fmtHM = m => Math.floor(m / 60) + ':' + String(m % 60).padStart(2, '0');
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${(+a).toFixed(3)})`; };
const mono = s => `<span style="font-family: ${F.mono};">${s}</span>`;
const HAVE = new Set('f-bb f-bq f-dl f-ez f-ft f-fy f-gl f-gy f-ht f-kb f-ls f-mg f-mh f-mj f-qf f-qm f-tq f-xc f-yg f-yy p-angelo p-anton p-cai p-changchen p-chenkg p-doyle p-fass p-herzog p-hou p-huangjx p-jiazk p-kies p-kubrick p-lee p-liye p-louye p-lynch p-naruse p-ozu p-resnais p-song p-sylvia p-wangbing p-wkw p-wunj p-yang p-zhangym'.split(' '));
const slotUse = {};
function slot(k, label, shape) { const id = 'yang03-' + k; slotUse[id] = (slotUse[id] || 0) + 1; const sid = slotUse[id] > 1 ? id + '-' + slotUse[id] : id; return `<image-slot id="${sid}" ${HAVE.has(k) ? `src="assets/yang03/${k}.jpg"` : ''} shape="${shape}" placeholder="${esc(label)}"></image-slot>`; }
const poster = (k, title, w, extra = '') => `<div style="flex: none; position: relative; width: ${w}; aspect-ratio: 2 / 3; background: ${C.deep}; box-shadow: 0 0 0 1px ${C.ink}; ${extra}">${slot('f-' + k, title, 'rect')}</div>`;
const photo = (k, name, w, h, extra = '') => `<div style="flex: none; position: relative; width: ${w}px; height: ${h}px; background: ${C.deep}; box-shadow: 0 0 0 1px ${C.ink}; ${w === h ? 'border-radius: 50%; overflow: hidden;' : ''} ${extra}">${slot('p-' + k, name, w === h ? 'circle' : 'rect')}</div>`;
const WKEY = { w01: 'fp', w02: 'gy', w03: 'ht', w04: 'qm', w05: 'kb', w06: 'gl', w07: 'dl', w08: 'mj', w09: 'yy', w10: 'zf' };
const withPoster = (k, title, inner, w = 132) => `<div style="margin-top: 24px; display: flex; flex-wrap: wrap; gap: 20px 32px; align-items: flex-start;">${poster(k, title, w + 'px')}<div style="flex: 1 1 420px; min-width: 0;">${inner}</div></div>`;
const CLIP = { di: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)', tr: 'polygon(50% 0, 100% 100%, 0 100%)', hx: 'polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%)', pe: 'polygon(50% 0, 100% 38%, 81% 100%, 19% 100%, 0 38%)' };
function gl(g, c, s = 10, hollow = false, bg = C.paper) {
  const neu = c === C.neu;
  const b = `display: inline-block; flex: none; width: ${s}px; height: ${g === 'ba' ? Math.max(4, Math.round(s * 0.5)) : s}px; box-sizing: border-box;`;
  if (g === 'sq' || g === 'ci' || g === 'ba') {
    const fill = hollow ? `background: ${bg}; border: 1.5px solid ${neu ? C.faint : c};` : `background: ${c};${neu ? ` border: 1px solid ${C.faint};` : ''}`;
    return `<span style="${b} ${g === 'ci' ? 'border-radius: 50%;' : ''} ${fill}"></span>`;
  }
  return `<span style="${b} background: ${c}; clip-path: ${CLIP[g]};"></span>`;
}
const glc = (k, s = 10, bg) => gl(CAT[k].g, CAT[k].c, s, !!CAT[k].hollow, bg);
const notch = (y, r) => `mask: radial-gradient(circle at 0 ${y}, transparent ${r}px, #000 ${r + 0.5}px) left / 51% 100% no-repeat, radial-gradient(circle at 100% ${y}, transparent ${r}px, #000 ${r + 0.5}px) right / 51% 100% no-repeat;`;
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
const STRIPE = `<div style="height: 12px; background: repeating-linear-gradient(90deg, ${C.t80} 0 22px, ${C.paper} 22px 26px, ${C.gl} 26px 48px, ${C.paper} 48px 52px, ${C.o90} 52px 74px, ${C.paper} 74px 78px); border-bottom: 1px solid ${C.ink};"></div>`;
const PLATE = { G: ['01', '1:59', '0:01:59'], F: ['01', '12:45', '0:12:45'], H: ['02', '8:07', '0:46:38'], I: ['02', '20:55', '0:59:26'], J: ['03', '0:21', '1:20:48'], K: ['03', '21:54', '1:42:21'], L: ['03', '37:10', '1:57:37'], D: ['04', '0:00', '2:05:47'], M: ['05', '0:22', '2:40:48'], N: ['07', '25:18', '3:58:38'], E: ['08', '0:24', '4:23:22'], O: ['10', '0:08', '5:57:24'], P: ['11', '3:56', '6:45:36'], Q: ['12', '14:11', '7:37:39'] };
const plate = ([c, t, full], dk) => `<span title="从这里开始听" style="flex: none; display: inline-flex; flex-direction: column; align-items: center; padding: 5px 12px 6px; margin-bottom: 4px; background: ${dk ? 'transparent' : C.card}; border: 1.5px solid ${dk ? DK.fg : C.ink}; box-shadow: inset 0 0 0 3px ${dk ? C.gl : C.card}, inset 0 0 0 4px ${dk ? DK.rule2 : C.rule2}; line-height: 1.1;"><span style="font-family: ${F.serif}; font-size: 15px; font-weight: 700;">第 ${c} 段 ${t}</span><span style="margin-top: 3px; font-family: ${F.mono}; font-size: 11px; color: ${dk ? DK.sub : C.cap};">全片 ${full}</span></span>`;
const S = {
  h2: `margin: 0; font-family: ${F.serif}; font-weight: 700; font-size: clamp(30px, 3.6vw, 46px); line-height: 1.15; letter-spacing: 0.02em;`,
  h3: `margin: 0; font-family: ${F.serif}; font-size: 21px; font-weight: 700; line-height: 1.4;`,
  intro: `margin: 24px 0 0; max-width: 860px; font-size: 17px; line-height: 1.9; color: ${C.ink2}; text-wrap: pretty;`,
  lead: `margin: 22px 0 0; max-width: 1100px; font-family: ${F.serif}; font-size: clamp(20px, 2.2vw, 26px); font-weight: 600; line-height: 1.6; text-wrap: pretty;`,
  cap: `margin: 16px 0 0; max-width: 1060px; font-size: 13px; line-height: 1.8; color: ${C.cap}; text-wrap: pretty;`,
  body: `font-size: 15px; line-height: 1.8; color: ${C.ink2}; text-wrap: pretty;`,
  btn: `user-select: none; font-family: ${F.sans}; font-size: 13.5px; letter-spacing: 0.04em; padding: 8px 14px; border: 1px solid ${C.ink}; background: ${C.card}; color: ${C.ink}; cursor: pointer;`,
  btnH: `background: ${C.ink}; color: ${C.paper};`,
  chip: `display: inline-flex; align-items: center; gap: 5px; padding: 1px 7px; border: 1px solid ${C.rule2}; font-size: 11.5px; line-height: 1.6; letter-spacing: 0.04em; color: ${C.cap}; white-space: nowrap;`
};
const G2 = 'display: grid; grid-template-columns: 128px minmax(0, 1fr); column-gap: 16px;';
function head(letter, title, q, dk) {
  const ink = dk ? DK.fg : C.ink;
  return `<div style="display: flex; flex-wrap: wrap; align-items: flex-end; gap: 12px 22px; padding-bottom: 16px; border-bottom: 3px double ${ink};"><span style="flex: none; width: 46px; height: 46px; box-sizing: border-box; border: 1.5px solid ${ink}; display: flex; align-items: center; justify-content: center; font-family: ${F.mono}; font-size: 22px; font-weight: 600;">${letter}</span><h2 style="${S.h2}">${title}</h2>${PLATE[letter] ? plate(PLATE[letter], dk) : ''}<span style="margin-left: auto; padding-bottom: 6px; font-size: 15px; color: ${dk ? DK.sub : C.muted};">${q}</span></div>`;
}
const secOpen = (id, letter, title) => `<section id="${id}" data-screen-label="${letter} ${title}" style="padding: clamp(64px, 8vw, 104px) ${PAD} 0;">`;
function sub(title, note, dk) { return `<div style="display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 16px; padding-bottom: 10px; border-bottom: 1px solid ${dk ? DK.fg : C.ink};"><h3 style="${S.h3}">${title}</h3>${note ? `<span style="font-size: 13px; color: ${dk ? DK.sub : C.cap};">${note}</span>` : ''}</div>`; }
function quote(text, whoS, size = 21, dk) {
  return `<figure style="margin: 0; padding: 18px 0 0; border-top: 1px solid ${dk ? DK.fg : C.ink};"><blockquote style="margin: 0; font-family: ${F.serif}; font-size: ${size}px; font-weight: 600; line-height: 1.6; text-wrap: pretty;">${esc(text)}</blockquote><figcaption style="margin-top: 8px; font-size: 13px; color: ${dk ? DK.sub : C.cap};">—— ${esc(whoS)}</figcaption></figure>`;
}
const who = (t, dk) => `<span style="${S.chip}${dk ? ` border-color: ${DK.rule2}; color: ${DK.sub};` : ''}">${esc(t)}</span>`;
const tag2 = (t, dk) => `<span style="flex: none; padding: 0 5px; border: 1px solid ${dk ? DK.fg : C.ink2}; font-size: 11px; line-height: 1.6; white-space: nowrap;">${t}</span>`;
const tunnel = (label, sub2) => `<div aria-hidden="true" style="padding: clamp(72px, 9vw, 120px) ${PAD} 0; display: flex; flex-direction: column; align-items: center; gap: 16px; text-align: center;"><div style="width: 176px; height: 104px; box-sizing: border-box; border: 1.5px solid ${C.ink}; box-shadow: inset 0 0 0 10px ${C.paper}, inset 0 0 0 11px ${C.rule2}, inset 0 0 0 21px ${C.paper}, inset 0 0 0 22px ${C.rule2}, inset 0 0 0 32px ${C.paper}, inset 0 0 0 33px ${C.rule}, inset 0 0 0 52px ${C.paper}, inset 0 0 0 53px ${C.rule};"></div><div style="font-family: ${F.serif}; font-size: 20px; font-weight: 700; letter-spacing: 0.16em;">${label}</div><div style="font-size: 13px; color: ${C.cap};">${sub2}</div></div>`;

const SHORT = { b00: '立题', b01: '其人', b02: '品味', b03: '与侯孝贤', b04: '新电影', b05: '母题', b06: '早期', b07: '指望', b08: '海滩', b09: '青梅', b10: '恐怖分子', b11: '牯岭街', b12: '独立时代', b13: '麻将', b14: '舞台剧', b15: '一一', b16: '身后事', b17: '总结' };
const SEC = {}; D[1][0].forEach(r => { SEC[r.id] = Object.assign({}, CAT[r.category], { id: r.id, name: r.section, s: hms(r.start), e: hms(r.end), min: r.minutes, share: r.share_pct, cat: r.category }); });
const SECS = Object.values(SEC);
const CL = D[2][0].map(r => ({ n: r.clip, title: r.title, s: hms(r.start), e: hms(r.end), min: r.minutes, start: r.start, end: r.end }));
const ST = D[3][0].map((r, i) => ({ i, t: hms(r.time), time: r.time, clip: r.clip, ct: r.clip_time, label: r.label, sec: r.section, level: +r.level }));
const N1 = ST.filter(s => s.level === 1).length, NST = ST.length;
const GROUPS = [{ k: 'growth', name: '成长与理想', c: C.yel }, { k: 'politics', name: '历史与政治', c: C.gl }, { k: 'city', name: '城市与现代化', c: C.t80 }, { k: 'culture', name: '儒家与文化批判', c: C.o90 }, { k: 'form', name: '形式与技法', c: C.theme }, { k: 'industry', name: '产业与制片', c: C.life }];
const BINS = D[4][0].map((r, i, a) => ({ s: hm(r.bin_start), e: i === a.length - 1 ? T : hm(r.bin_end), a: r.bin_start, b: r.bin_end, v: Object.fromEntries(GROUPS.map(g => [g.k, +r[g.k + '_per1k']])) }));
const PEAKS = { growth: [['1:40', '总论“成长”母题', 1, 'L']], politics: [['5:10', '《牯岭街》里的外省人与帮派', 1, 'R'], ['5:40', '转型正义', 0, 'L']], city: [['3:40', '《恐怖分子》的城市空间', 0, 'L'], ['7:40', '总结时比较大陆的城市电影', 1, 'R']], culture: [['6:00', '《独立时代》', 1, 'L']], form: [['4:10', '《恐怖分子》的表演', 1, 'L']], industry: [['4:30', '《牯岭街》的钱从哪来', 1, 'L']] };
const RELAY = [['growth', '1:40'], ['form', '4:10'], ['industry', '4:30'], ['politics', '5:10'], ['culture', '6:00'], ['city', '7:40']];
const KW = '成长与理想：成长、理想主义、理想、青春、少年、梦想、纯真、幻灭、启蒙、觉醒、希望、信念；历史与政治：威权、解严、戒严、白色恐怖、审查、政治、外省、本省、眷村、国民党、体制、权力、转型正义、民主、警备、官僚、意识形态、二二八；城市与现代化：城市、都市、现代化、现代性、资本主义、全球化、消费、广告、空间、玻璃、疏离、科技、经济、商业、产业；儒家与文化批判：儒家、传统、五四、孔夫子、论语、国民性、伪善、虚伪、真假、真和假、真与假、人情、服从、老中、中国文化、文化传统；形式与技法：镜头、调度、剪辑、声音、画外、构图、表演、演员、摄影、分镜、配乐、台词、结构、叙事、剧本、画面、视角、视点；产业与制片：投资、票房、中影、版权、发行、成本、资金、片商、预算、市场、合拍、制片、预售、公司。';
const HMAX = 20.41;
const heatA = v => v <= 0 ? 0 : 0.08 + 0.92 * Math.pow(Math.min(v, HMAX) / HMAX, 0.8);
const catMin = k => SECS.filter(s => s.cat === k).reduce((a, s) => a + +s.min, 0);

// ===== A cover
function cover() {
  const toc = [['map', 'B', '节目地图'], ['relay', 'C', '话题接力'], ['ladder', 'D', '往上走的阶梯'], ['taiwan', 'G', '为什么是台湾'], ['kid', 'F', '东亚满分小孩'], ['taste', 'H', '他喜欢谁'], ['two', 'I', '两个人的三十年'], ['chain', 'J', '从体制里出来的'], ['growth', 'K', '成长'], ['lines', 'L', '每部片都有的'], ['beach', 'M', '娜拉出走之后'], ['terror', 'N', '两个结局'], ['guling', 'E', '牯岭街'], ['indep', 'O', '十个人的真与假'], ['yiyi', 'P', '一一'], ['beside', 'Q', '把他放在谁旁边'], ['debate', 'R', '他们在哪里吵'], ['mentions', 'S', '谁被提得最多'], ['ledger', 'T', '账本']];
  const meta = [['节目', '《电影巨辩》'], ['专辑', '付费专辑《为了华语电影》'], ['本集', '第 3 集《杨德昌，爱与希望之梦》'], ['主持', '老马（magasa）、阿吴（LOOK）'], ['录制', '推断在 2024 年 10 月中旬以后'], ['时长', mono('8:05:45')], ['分段', '平台上切成 12 段播出，内容是一期'], ['作品', '十部，含未完成的《追风》']];
  const parts = [['film80', '八十年代的作品', '《浮萍》到《恐怖分子》'], ['guling', '《牯岭街》', '一部片'], ['film90', '九十年代之后', '《独立时代》到《一一》']].map(([k, n, d]) => [k, n, d, +catMin(k).toFixed(1)]);
  const terms = [['台湾新电影', '1982 年到 1987 年前后的一场电影运动，杨德昌和侯孝贤是代表人物。'], ['中影', '这里指台湾的中央电影公司，当时是国民党的宣传单位，和大陆的中影无关。'], ['集锦片', '几位导演各拍一段、拼成一部的电影。《光阴的故事》《儿子的大玩偶》都是。'], ['解严', '1987 年台湾解除戒严。节目把它当作一条分界线。'], ['外省人、本省人', '1949 年前后从大陆到台湾的人及其后代，与此前世居台湾的人。'], ['眷村', '安置军人家属的聚居区。'], ['成长小说', '18 世纪起源于德国的一类小说，写年轻人在成长中与社会的关系。节目用它来理解杨德昌。'], ['隧道视野', '学者叶月瑜的概念，指远景镜头里由门、窗、廊等层层框架形成的纵深视野。'], ['声画错置', '画面和声音来自不同的场景。节目说这是他的招牌手法。'], ['转型正义', '威权体制转向民主之后，对历史真相的清理。']];
  const legend = ['frame', 'life', 'context', 'theme', 'film80', 'guling', 'film90', 'after'];
  const hero = `<div style="position: relative; overflow: hidden; background: linear-gradient(90deg, rgba(245,241,232,0.045) 1px, transparent 1px) 0 0 / 56px 56px, linear-gradient(180deg, rgba(245,241,232,0.045) 1px, transparent 1px) 0 0 / 56px 56px, ${C.gl}; color: ${DK.fg}; padding: clamp(22px, 3vw, 36px) ${PAD} clamp(40px, 5vw, 60px);">
<div aria-hidden="true" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; pointer-events: none; background: radial-gradient(ellipse 80% 120% at 4% 100%, rgba(242,194,48,0.36), rgba(242,194,48,0.17) 45%, rgba(242,194,48,0.05) 85%); clip-path: polygon(2.6% 100%, 6.4% 100%, 66% 0, 9% 0);"></div>
<div aria-hidden="true" style="position: absolute; left: 3%; bottom: -14px; width: 26px; height: 70px; box-sizing: border-box; border: 1.5px solid rgba(245,241,232,0.55); border-top: 4px solid rgba(242,194,48,0.8); border-radius: 3px; transform: rotate(32deg); transform-origin: 50% 100%;"></div>
<div style="position: relative;">
${seriesNav({ color: DK.sub })}
<div style="margin-top: clamp(36px, 5vw, 64px); display: flex; flex-wrap: wrap; gap: 44px 56px; align-items: flex-start;">
<div style="flex: 1 1 600px; min-width: 0;">
<div style="display: flex; align-items: center; gap: 14px; font-family: ${F.serif}; font-size: 18px; font-weight: 600; letter-spacing: 0.24em;">为了华语电影<span style="font-family: ${F.mono}; font-size: 15px; letter-spacing: 0.04em; border: 1.5px solid ${DK.fg}; padding: 2px 8px 1px;">03</span></div>
<h1 style="margin: 22px 0 0; font-family: ${F.serif}; font-weight: 900; font-size: clamp(48px, 7.6vw, 116px); line-height: 1.1; letter-spacing: 0.01em;">杨德昌：<br>爱与希望之梦</h1>
<div style="margin-top: 22px; font-size: 17px; line-height: 1.7; color: ${DK.sub};">电影巨辩《为了华语电影》第 3 集 · 8 小时 6 分 · 老马 × 阿吴</div>
<div style="margin-top: 44px; max-width: 780px; font-family: ${F.serif}; font-weight: 700; font-size: clamp(24px, 2.8vw, 36px); line-height: 1.65; text-wrap: pretty;">他把华人社会的现代化转型，第一次拍成了电影。</div>
</div>
<div style="flex: 0 1 350px; min-width: 0; color: ${C.ink};">
<div style="background: ${C.card}; ${notch('52px', 9)}">
<div style="display: flex; justify-content: space-between; align-items: center; height: 52px; padding: 0 22px; box-sizing: border-box; font-size: 12px; letter-spacing: 0.22em;"><span>节目档案</span><span style="font-family: ${F.mono}; letter-spacing: 0.06em;">No. 03</span></div>
<div style="margin: 0 14px; border-top: 1.5px dashed ${C.ink};"></div>
<div style="display: flex; gap: 14px; align-items: flex-end; padding: 14px 22px 12px; border-bottom: 1px solid ${C.rule};">${photo('yang', '杨德昌', 76, 96)}<div><div style="font-family: ${F.serif}; font-size: 22px; font-weight: 900;">杨德昌</div><div style="font-family: ${F.mono}; font-size: 12.5px; color: ${C.cap};">1947–2007</div></div></div>
${meta.map(([k, v]) => `<div style="display: grid; grid-template-columns: 52px minmax(0, 1fr); gap: 12px; padding: 10px 22px; border-bottom: 1px solid ${C.rule}; font-size: 14.5px; line-height: 1.65;"><span style="color: ${C.cap};">${k}</span><span>${v}</span></div>`).join('')}
<div style="padding: 14px 22px 18px;"><div style="display: flex; gap: 2px;">${CL.map(c => `<span title="${esc('第 ' + c.n + ' 段 · ' + c.min + ' 分钟')}" style="flex: ${c.min} 1 0; min-width: 0; height: 20px; box-sizing: border-box; border: 1px solid ${C.ink}; background: ${C.paper}; ${notch('50%', 3)}"></span>`).join('')}</div><div style="margin-top: 8px; font-size: 12px; color: ${C.cap};">12 段，宽度按时长</div></div>
</div>
</div>
</div>
<div style="margin-top: 60px;"><div style="font-size: 12.5px; letter-spacing: 0.14em; color: ${DK.sub};">逐部讲作品约 318 分钟，分三段着色，全页通用</div><div style="margin-top: 12px; display: flex; gap: 4px;">${parts.map(([k, n, d, m]) => `<div style="flex: ${m} 1 0; min-width: 0;"><div style="height: 14px; background: ${CAT[k].c}; ${k === 'guling' ? `box-shadow: inset 0 0 0 1.5px ${DK.rule2};` : ''}"></div><div style="margin-top: 10px; display: flex; flex-wrap: wrap; align-items: center; gap: 4px 8px;">${k === 'guling' ? gl('di', DK.fg, 10) : glc(k, 10)}<span style="font-family: ${F.serif}; font-size: 16px; font-weight: 700;">${n}</span><span style="font-family: ${F.mono}; font-size: 12px; color: ${DK.sub};">${m}′</span></div><div style="margin-top: 2px; font-size: 12.5px; color: ${DK.sub};">${d}</div></div>`).join('')}</div></div>
</div>
</div>`;
  const paper = `<div style="background: linear-gradient(90deg, rgba(26,28,30,0.045) 1px, transparent 1px) 0 0 / 56px 56px, linear-gradient(180deg, rgba(26,28,30,0.045) 1px, transparent 1px) 0 0 / 56px 56px, ${C.paper}; padding: clamp(40px, 5vw, 64px) ${PAD} clamp(44px, 5vw, 64px); border-bottom: 3px double ${C.ink};">
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr)); gap: 32px 64px; align-items: start;">
<p style="margin: 0; font-size: 17.5px; line-height: 1.95; color: ${C.ink2}; text-wrap: pretty;">节目认为华语电影的最高成就就是侯孝贤和杨德昌两个人。杨德昌借西方启蒙以来的“成长”母题和理性思辨，第一次把华人社会的现代化转型拍成了电影：从威权到开放，从传统社会到全球化的资本主义社会。他的主题一级一级往上走：个人成长、两性与婚姻、城市生活、历史与政治、文化底色，最后在《一一》里汇总。节目对他这个人有保留，对《独立时代》《麻将》有批评，但结论是这场转型至今没有完成，所以他没有过时。</p>
<div style="display: grid; gap: 26px;">${quote('电影史上最优秀最杰出的华人导演，就是侯孝贤和杨德昌，再也没有其他人了。', '一位主持人', 22)}${quote('继续乐观地生活在这个充满悲剧的世界。', '节目的结语，也是最后一段的标题', 22)}</div>
</div>
<div style="margin-top: 52px;">${sub('本期片目', '十部作品，底下的色条是所属阶段；空白图位可以拖入图片')}<div style="margin-top: 16px; display: grid; grid-template-columns: repeat(auto-fill, minmax(96px, 1fr)); gap: 16px 14px;">${D[5][0].map(w => `<a href="#ladder" style="min-width: 0; color: ${C.ink};">${poster(WKEY[w.id], w.title, '100%')}<div style="margin-top: 8px; height: 4px; background: ${CAT[w.group].c}; ${w.group === 'after' ? `box-shadow: inset 0 0 0 1px ${C.life};` : ''}"></div><div style="margin-top: 6px; font-family: ${F.serif}; font-size: 13.5px; font-weight: 700; line-height: 1.4;">${esc(w.title)}</div><div style="font-family: ${F.mono}; font-size: 11.5px; color: ${C.cap};">${w.year}</div></a>`).join('')}</div></div>
<div style="margin-top: 52px;">${sub('先认几个词', '节目里反复出现')}<div style="margin-top: 6px; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); column-gap: 32px;">${terms.map(([k, v]) => `<div style="display: grid; grid-template-columns: 96px minmax(0, 1fr); gap: 12px; padding: 12px 0; border-bottom: 1px solid ${C.rule};"><span style="font-family: ${F.serif}; font-size: 16px; font-weight: 700; line-height: 1.5;">${k}</span><span style="font-size: 14px; line-height: 1.7; color: ${C.ink2}; text-wrap: pretty;">${v}</span></div>`).join('')}</div></div>
<div style="margin-top: 32px; display: flex; flex-wrap: wrap; align-items: center; gap: 10px 22px; font-size: 13px; color: ${C.cap};"><span>颜色和形状全页一致：</span>${legend.map(k => `<span style="display: inline-flex; align-items: center; gap: 7px; color: ${C.ink2};">${glc(k, 11)}${CAT[k].name}</span>`).join('')}<span style="display: inline-flex; align-items: center; gap: 7px; color: ${C.ink2};"><span style="width: 18px; height: 11px; background: ${C.yel};"></span>手电筒黄：每个模块最多一处强调</span></div>
<nav style="margin-top: 36px; display: flex; flex-wrap: wrap; gap: 8px;">${toc.map(([id, l, t]) => `<a href="#${id}" style="display: inline-flex; align-items: baseline; gap: 8px; padding: 7px 12px 6px; border: 1px solid ${C.rule2}; background: ${C.card}; color: ${C.ink}; font-size: 14px;" style-hover="border-color: ${C.ink}; color: ${C.ink};"><span style="font-family: ${F.mono}; font-weight: 600; font-size: 13px;">${l}</span>${t}</a>`).join('')}</nav>
</div>`;
  return `${STRIPE}<header id="cover" data-screen-label="A 封面">${hero}${paper}</header>`;
}

// ===== B + C
function cHead() {
  const relay = RELAY.map(([k, t]) => { const g = GROUPS.find(x => x.k === k); return `<span style="display: inline-flex; align-items: center; gap: 7px; padding: 5px 10px; border: 1px solid ${C.rule2}; background: ${C.card}; font-size: 13.5px;">${gl('sq', g.c, 9)}${g.name}<span style="font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${t}</span></span>`; }).join(`<span style="color: ${C.faint};">→</span>`);
  return `<div style="display: flex; flex-wrap: wrap; align-items: flex-end; gap: 12px 18px; padding-bottom: 14px; border-bottom: 3px double ${C.ink};"><span style="flex: none; width: 38px; height: 38px; box-sizing: border-box; border: 1.5px solid ${C.ink}; display: flex; align-items: center; justify-content: center; font-family: ${F.mono}; font-size: 18px; font-weight: 600;">C</span><h3 id="relay" style="margin: 0; font-family: ${F.serif}; font-weight: 700; font-size: clamp(26px, 2.8vw, 34px);">话题接力</h3><span style="margin-left: auto; padding-bottom: 4px; font-size: 15px; color: ${C.muted};">每段时间在聊什么</span></div>
<div style="margin-top: 18px; font-family: ${F.serif}; font-size: clamp(19px, 2vw, 23px); font-weight: 600; line-height: 1.6; text-wrap: pretty;">前两个小时谈人和母题，中间谈形式，《牯岭街》先谈钱再谈政治，《独立时代》谈文化，结尾又回到城市。</div>
<div style="margin-top: 14px; display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px;"><span style="font-size: 12.5px; color: ${C.cap};">各组峰值出现的顺序</span>${relay}</div>`;
}
function bcDesktop() {
  const TW = 1136;
  const L1 = ST.filter(s => s.level === 1), L2 = ST.filter(s => s.level === 2);
  const ttl = s => esc(s.time + ' · 第 ' + s.clip + ' 段 ' + s.ct + ' · ' + s.label + '（' + SEC[s.sec].name + '）');
  const estV = s => [...s].reduce((a, ch) => a + (ch.charCodeAt(0) < 128 ? 7.4 : 12.75), 0) + 19;
  const TAGH = Math.ceil(Math.max(...L1.map(s => estV(s.label)))) + 6, LEAD = 30;
  const xs = spread(L1.map(s => s.t / T), 20.5 / TW, 10.5 / TW, 1 - 10.5 / TW);
  let tags = '', lines = '', marks = '';
  L1.forEach((s, k) => {
    const sec = SEC[s.sec];
    tags += `<div title="${ttl(s)}" style="position: absolute; left: ${pct(xs[k])}; bottom: 0; transform: translateX(-50%); writing-mode: vertical-rl; font-size: 12px; line-height: 1; letter-spacing: 0.06em; padding: 7px 3px; border: 1px solid ${C.ink}; border-top: 4px solid ${sec.c}; border-radius: 2px; background: ${C.card}; color: ${C.ink}; white-space: nowrap; cursor: default;" style-hover="background: ${C.ink}; color: ${C.paper};">${esc(s.label)}</div>`;
    lines += `<line x1="${f2(xs[k] * 1000)}" y1="0" x2="${f2(s.t / T * 1000)}" y2="${LEAD}" stroke="${C.ink}" strokeOpacity="0.5" strokeWidth="1" vectorEffect="non-scaling-stroke"></line>`;
    marks += `<span style="position: absolute; left: ${pct(s.t / T)}; bottom: -3px; width: 6px; height: 6px; margin-left: -3px; border-radius: 50%; background: ${C.ink};"></span>`;
  });
  L2.forEach(s => { const c = SEC[s.sec].c; marks += `<div title="${ttl(s)}" style="position: absolute; left: ${pct(s.t / T)}; bottom: 0; width: 9px; height: 16px; margin-left: -4.5px; display: flex; justify-content: center; align-items: flex-end; cursor: help;"><span style="width: 1.5px; height: 10px; background: ${c === C.neu || c === C.after ? C.faint : c};"></span></div>`; });
  let clips = '';
  CL.forEach(c => {
    const w = (c.e - c.s) / T;
    clips += `<div title="${esc('第 ' + c.n + ' 段 · ' + c.start + '–' + c.end + ' · ' + c.min + ' 分钟 · ' + c.title)}" style="position: absolute; top: 0; bottom: 0; left: ${pct(c.s / T)}; width: ${pct(w)}; padding: 0 1px; box-sizing: border-box; cursor: help;"><div style="height: 100%; box-sizing: border-box; border: 1px solid ${C.ink}; background: ${C.card}; display: flex; align-items: center; justify-content: center; gap: 7px; ${notch('50%', 6)}" style-hover="background: ${C.deep};"><span style="font-family: ${F.mono}; font-size: 16px; font-weight: 600; line-height: 1;">${c.n}</span><span style="align-self: stretch; margin: 9px 0; border-left: 1px dashed ${C.rule2};"></span><span style="font-family: ${F.mono}; font-size: 11px; line-height: 1; color: ${C.cap};">${c.min}′</span></div></div>`;
  });
  let bands = '';
  SECS.forEach(s => {
    const w = (s.e - s.s) / T, px = w * TW, dark = DARK.has(s.c), nm = SHORT[s.id];
    bands += `<div title="${esc(s.name + ' · ' + s.min + ' 分钟 · ' + s.share + '%')}" style="position: absolute; top: 0; bottom: 0; left: ${pct(s.s / T)}; width: ${pct(w)}; padding-right: 2px; box-sizing: border-box;"><div style="height: 100%; box-sizing: border-box; background: ${s.c}; ${s.hollow ? `box-shadow: inset 0 0 0 1.5px ${C.life};` : ''} color: ${dark ? C.card : C.ink}; padding: 7px 5px; overflow: hidden;">${px >= nm.length * 13 + 8 ? `<div style="font-family: ${F.serif}; font-size: 13px; font-weight: 600; line-height: 1.3; white-space: nowrap;">${esc(nm)}</div>` : ''}${px >= 120 ? `<div style="margin-top: 3px; font-family: ${F.mono}; font-size: 11px; white-space: nowrap;">${s.min}′ · ${s.share}%</div>` : px >= 40 ? `<div style="margin-top: 3px; font-family: ${F.mono}; font-size: 11px; white-space: nowrap;">${Math.round(s.min)}′</div>` : ''}</div></div>`;
  });
  const axis = () => { let a = ''; for (let m = 0; m <= 480; m += 30) a += `<div style="position: absolute; left: ${pct(m * 60 / T)}; top: 0; width: 1px; height: 6px; background: ${C.rule2};"></div><div style="position: absolute; left: ${pct(m * 60 / T)}; top: 9px; ${m ? 'transform: translateX(-50%);' : ''} font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${fmtHM(m)}</div>`; a += `<div style="position: absolute; right: 0; top: 0; width: 1px; height: 6px; background: ${C.rule2};"></div><div style="position: absolute; right: 0; top: 22px; font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">8:06</div>`; return `<div style="position: relative; height: 40px; border-top: 1px solid ${C.rule2};">${a}</div>`; };
  const lab = (t, sb, al = 'center') => `<div style="display: flex; flex-direction: column; justify-content: ${al}; gap: 4px;"><span style="font-size: 13px; letter-spacing: 0.12em; color: ${C.ink2};">${t}</span>${sb ? `<span style="font-size: 11.5px; line-height: 1.55; color: ${C.cap};">${sb}</span>` : ''}</div>`;
  const legend = ['frame', 'life', 'context', 'theme', 'film80', 'guling', 'film90', 'after'].map(k => `<span style="display: inline-flex; align-items: center; gap: 6px;">${glc(k, 10)}${CAT[k].name}</span>`).join('');
  const secLines = SECS.slice(1).map(s => `<div style="position: absolute; top: 0; bottom: 0; left: ${pct(s.s / T)}; width: 1px; background: ${C.rule2};"></div>`).join('');
  let crows = '';
  GROUPS.forEach(g => {
    const peak = Math.max(...BINS.map(b => b.v[g.k]));
    let cells = '', notes = '';
    BINS.forEach(b => { const a = heatA(b.v[g.k]); cells += `<div title="${esc(g.name + ' · ' + b.a + '–' + b.b + ' · 每千字 ' + b.v[g.k])}" style="position: absolute; top: 0; bottom: 0; left: ${pct(b.s / T)}; width: ${pct((b.e - b.s) / T)}; padding-right: 1px; box-sizing: border-box;"><div style="height: 100%; background: ${a ? rgba(g.c, a) : 'transparent'};"></div></div>`; });
    PEAKS[g.k].forEach(([st, note, kind, side]) => {
      const b = BINS.find(x => x.a === st), v = b.v[g.k];
      cells += `<div style="position: absolute; top: -2px; bottom: -2px; left: ${pct(b.s / T)}; width: ${pct((b.e - b.s) / T)}; box-sizing: border-box; border: ${kind === 1 ? `2px solid ${C.ink}` : `1.5px dashed ${C.ink}`}; pointer-events: none;"></div>`;
      notes += `<div style="position: absolute; ${side === 'R' ? `right: ${pct(1 - b.e / T)}` : `left: ${pct(b.s / T)}`}; bottom: 4px; display: flex; gap: 6px; align-items: baseline; white-space: nowrap; font-size: 12px; color: ${C.ink};"><span style="font-family: ${F.mono}; font-weight: 600;">${v.toFixed(1)}</span><span style="font-family: ${F.mono}; color: ${C.cap};">${b.a}–${b.b}</span><span>${note}</span></div>`;
    });
    crows += `<div style="${G2}"><div style="display: flex; align-items: center; gap: 8px; padding-top: 22px;">${gl('sq', g.c, 10)}<div><div style="font-family: ${F.serif}; font-size: 14px; font-weight: 600; line-height: 1.3;">${g.name}</div><div style="font-size: 11px; color: ${C.cap};">峰值 ${peak.toFixed(1)}</div></div></div><div style="position: relative; height: 56px;"><div style="position: absolute; left: 0; right: 0; top: 0; height: 22px;">${notes}</div><div style="position: absolute; left: 0; right: 0; top: 22px; bottom: 2px; background: rgba(26,28,30,0.035);">${secLines}${cells}</div></div></div>`;
  });
  return `<div style="margin-top: 36px; overflow-x: auto; padding-bottom: 8px;"><div style="min-width: 1280px;">
<div style="${G2}">${lab('站点', `方框是 ${N1} 个主站，短刻度是 ${NST - N1} 个次站。悬停可看在第几段的几分几秒`, 'flex-end')}<div style="position: relative; height: ${TAGH + LEAD}px;"><div style="position: absolute; left: 0; right: 0; top: 0; height: ${TAGH}px;">${tags}</div><svg viewBox="0 0 1000 ${LEAD}" preserveAspectRatio="none" style="position: absolute; left: 0; top: ${TAGH}px; width: 100%; height: ${LEAD}px; overflow: visible;">${lines}</svg><div style="position: absolute; left: 0; right: 0; top: ${TAGH}px; height: ${LEAD}px;">${marks}</div></div></div>
<div style="${G2}">${lab('平台 12 段', '12 格胶片，悬停看段名')}<div style="padding-top: 6px;"><div style="position: relative; height: 50px;">${clips}</div></div></div>
<div style="${G2} margin-top: 4px;">${lab('18 个板块', '按节目里的过渡句切分')}<div style="position: relative; height: 58px;">${bands}</div></div>
<div style="${G2} margin-top: 10px;"><div></div><div style="display: flex; flex-wrap: wrap; gap: 6px 18px; font-size: 12.5px; color: ${C.cap};">${legend}</div></div>
<div style="${G2} margin-top: 6px;"><div></div><div style="font-size: 12.5px; color: ${C.cap};">第 1、2、3、4、10、11、12 段各跨两个或三个板块；第 8、9 两段合起来是一个板块（《牯岭街》）。</div></div>
<div style="${G2} margin-top: 12px;"><div style="font-size: 12px; color: ${C.cap};">全片时间</div>${axis()}</div>
<div style="margin-top: 52px;">${cHead()}</div>
<div style="margin-top: 14px;">${crows}</div>
<div style="${G2} margin-top: 6px;"><div style="font-size: 12px; color: ${C.cap};">全片时间</div>${axis()}</div>
<div style="${G2} margin-top: 2px;"><div></div><div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px; font-size: 12px; color: ${C.cap};"><span style="font-family: ${F.mono};">0</span><span style="width: 160px; height: 10px; background: linear-gradient(90deg, rgba(26,28,30,0.08), ${C.ink});"></span><span style="font-family: ${F.mono};">20.4</span><span>每千字出现次数，六行同一色阶；实线框为各组峰值，虚线框为第二个峰</span></div></div>
</div></div>`;
}
function bcMobile() {
  const H = 2100, k = H / T;
  const X = { clip: 38, sec: 67, heat: 79, lead: 147, lab: 169 };
  let h = '';
  for (let m = 0; m <= 480; m += 30) { const y = m * 60 * k; h += `<div style="position: absolute; left: 0; top: ${f1(y)}px; transform: translateY(-50%); font-family: ${F.mono}; font-size: 11px; color: ${C.cap};">${fmtHM(m)}</div><div style="position: absolute; left: ${X.clip}px; width: ${X.lead - X.clip}px; top: ${f1(y)}px; height: 1px; background: ${C.rule};"></div>`; }
  CL.forEach(c => { const y = c.s * k, dy = (c.e - c.s) * k; h += `<div style="position: absolute; left: ${X.clip}px; width: 26px; top: ${f1(y)}px; height: ${f1(dy)}px; padding: 1px 0; box-sizing: border-box;"><div style="height: 100%; box-sizing: border-box; border: 1px solid ${C.ink}; background: ${C.card}; display: flex; align-items: center; justify-content: center; font-family: ${F.mono}; font-size: 11px; font-weight: 600;">${c.n}</div></div>`; });
  SECS.forEach(s => { h += `<div style="position: absolute; left: ${X.sec}px; width: 8px; top: ${f1(s.s * k)}px; height: ${f1((s.e - s.s) * k - 2)}px; background: ${s.c};"></div>`; });
  GROUPS.forEach((g, j) => { BINS.forEach(b => { const a = heatA(b.v[g.k]); if (!a) return; h += `<div style="position: absolute; left: ${X.heat + j * 11}px; width: 10px; top: ${f1(b.s * k)}px; height: ${f1((b.e - b.s) * k - 1)}px; background: ${rgba(g.c, a)};"></div>`; }); });
  const items = [];
  SECS.forEach(s => items.push({ t: s.s, o: 0, kind: 'sec', s }));
  ST.filter(s => s.level === 1).forEach(s => items.push({ t: s.t, o: 1, kind: 'st', s }));
  items.sort((a, b) => a.t - b.t || a.o - b.o);
  const AW = 180, est = str => [...str].reduce((a, ch) => a + (ch.charCodeAt(0) < 128 ? 7.2 : 13.3), 0);
  items.forEach(it => { it.h = it.kind === 'sec' ? Math.ceil(est(it.s.name + ' 00.0′') / AW) * 19 + 10 : Math.ceil((est(it.s.label) + 40) / AW) * 18 + 2; it.y = it.t * k; });
  const tops = vspread(items, H);
  let svg = '', labs = '';
  items.forEach((it, i) => {
    const cy = tops[i] + (it.kind === 'sec' ? 10 : it.h / 2);
    svg += `<line x1="0" y1="${f1(it.y)}" x2="22" y2="${f1(cy)}" stroke="${it.kind === 'sec' ? (it.s.c === C.neu ? C.faint : it.s.c) : C.ink}" strokeOpacity="0.6" strokeWidth="1"></line>`;
    if (it.kind === 'sec') labs += `<div style="position: absolute; left: ${X.lab}px; right: 0; top: ${f1(tops[i])}px; padding-top: 4px; border-top: 2px solid ${it.s.c}; font-family: ${F.serif}; font-size: 14px; font-weight: 700; line-height: 1.35;">${esc(it.s.name)} <span style="font-family: ${F.mono}; font-size: 11px; font-weight: 400; color: ${C.cap};">${it.s.min}′</span></div>`;
    else labs += `<div style="position: absolute; left: ${X.lab}px; right: 0; top: ${f1(tops[i])}px; font-size: 13px; line-height: 18px;"><span style="font-family: ${F.mono}; font-size: 11px; color: ${C.cap}; margin-right: 6px;">${it.s.time.slice(0, -3)}</span>${esc(it.s.label)}</div>`;
  });
  const leg = GROUPS.map(g => `<span style="display: inline-flex; align-items: center; gap: 6px;">${gl('sq', g.c, 9)}${g.name}</span>`).join('');
  return `<div style="margin-top: 28px;">${cHead()}</div>
<div style="margin-top: 18px; display: flex; flex-wrap: wrap; gap: 6px 14px; font-size: 12.5px; color: ${C.ink2};">${leg}</div>
<p style="${S.cap}">左起：全片时间、平台 12 段、板块颜色、六组话题的热度（颜色越深，该组关键词每千字出现越多）、主站。</p>
<div style="position: relative; height: ${H}px; margin: 26px 0 12px;">${h}<svg width="22" height="${H}" style="position: absolute; left: ${X.lead}px; top: 0; overflow: visible;">${svg}</svg>${labs}</div>`;
}
function stationList() {
  let h = '';
  CL.forEach(c => {
    const [t1, t2] = c.title.split('｜');
    const rows = ST.filter(s => s.clip === c.n).map(s => {
      const sec = SEC[s.sec], one = s.level === 1;
      return `<div style="display: ${one ? 'grid' : '{{ stMinorGrid }}'}; grid-template-columns: 56px 40px 10px minmax(0, 1fr); gap: 8px; align-items: baseline; padding: 4px 0;"><span style="font-family: ${F.mono}; font-size: 12.5px; color: ${C.ink2};">${s.time}</span><span style="font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${s.ct}</span><span style="align-self: center; display: flex;">${glc(sec.cat, 8, C.card)}</span><span style="${one ? `font-family: ${F.serif}; font-size: 15px; font-weight: 600; color: ${C.ink};` : `font-size: 14px; color: ${C.muted};`} line-height: 1.55;">${esc(s.label)}</span></div>`;
    }).join('');
    h += `<div style="break-inside: avoid; margin-bottom: 26px; background: ${C.card}; border: 1px solid ${C.ink};"><div style="display: grid; grid-template-columns: 58px minmax(0, 1fr); ${notch('50%', 7)} border-bottom: 1px solid ${C.ink}; background: ${C.deep};"><div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; border-right: 1.5px dashed ${C.ink};"><span style="font-size: 11px; letter-spacing: 0.1em; line-height: 1; color: ${C.cap};">第</span><span style="font-family: ${F.mono}; font-size: 22px; font-weight: 600; line-height: 1;">${c.n}</span><span style="font-size: 11px; letter-spacing: 0.1em; line-height: 1; color: ${C.cap};">段</span></div><div style="padding: 10px 14px;"><div style="font-family: ${F.serif}; font-size: 15.5px; font-weight: 700; line-height: 1.45; text-wrap: pretty;">${esc(t1)}</div><div style="margin-top: 3px; font-size: 12.5px; line-height: 1.55; color: ${C.muted};">${esc(t2 || '')}</div><div style="margin-top: 3px; font-family: ${F.mono}; font-size: 11.5px; color: ${C.cap};">${c.start}–${c.end} · ${c.min}′</div></div></div><div style="padding: 8px 14px 10px;">${rows}</div></div>`;
  });
  return `<div style="margin-top: 60px; display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px 20px; padding-bottom: 12px; border-bottom: 1px solid ${C.ink};"><h3 style="margin: 0; font-family: ${F.serif}; font-size: 24px; font-weight: 700;">按段落回听</h3><span style="font-size: 13.5px; color: ${C.cap};">每行依次是全片时间、该段内的时间、站点；宋体为主站</span><div role="button" onClick="{{ toggleSt }}" style="margin-left: auto; ${S.btn}" style-hover="${S.btnH}">{{ stBtn }}</div></div>
<div style="margin-top: 22px; columns: 320px; column-gap: 28px;">${h}</div>`;
}
function sectionB() {
  return `${secOpen('map', 'B', '节目地图')}${head('B', '节目地图', '八个小时怎么走的')}
<p style="${S.intro}">先用两个小时讲人、讲台湾新电影的背景、讲他的母题；再用五个多小时逐部讲作品，其中《牯岭街少年杀人事件》一部就讲了 94 分钟；最后讲身后事，并拿他和李安、侯孝贤、大陆导演比较。</p>
<div style="${S.lead}">进入第一部作品之前聊了 2 小时 6 分；逐部讲作品约 318 分钟，占 65%；<span style="color: ${C.gl}; border-bottom: 4px solid ${C.gl};">《牯岭街》一部 94 分钟，占 19%</span>。</div>
<div style="display: {{ wideDisp }};">${bcDesktop()}<p style="${S.cap}">条宽按时长等比。板块按节目里的过渡句切分，误差约一分钟。话题热度每 10 分钟一格，用每千字出现次数而不是次数（最后一格不满 6 分钟）。各组关键词——${KW}</p></div>
<div style="display: {{ narrowDisp }};">${bcMobile()}<p style="${S.cap}">各组关键词——${KW}</p></div>
${stationList()}
</section>`;
}

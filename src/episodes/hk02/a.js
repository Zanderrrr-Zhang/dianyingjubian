const MD = 'src/episodes/hk02/handoff.md';
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
const D21 = mdTable('D21');

const hms = s => { const p = s.split(':').map(Number); return p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + p[1]; };
const hm = s => { const [h, m] = s.split(':').map(Number); return h * 3600 + m * 60; };
const T = hms('7:18:33');

const C = { ink: '#1A1C1E', ink2: '#2B2B29', paper: '#F5F1E8', card: '#FBF9F3', deep: '#ECE6D9', muted: '#4D4943', cap: '#655E54', faint: '#8E877A', rule: 'rgba(26,28,30,0.15)', rule2: 'rgba(26,28,30,0.32)', tr: '#5B5F97', co: '#B5462F', l1: '#5FA8A0', l2: '#1F7A72', ctx: '#7A6A55', act: '#8E5572', neu: '#B8B2A6', yel: '#F2C230' };
const F = { serif: "'Noto Serif SC', serif", sans: "'Noto Sans SC', sans-serif", mono: "'IBM Plex Mono', 'Noto Sans SC', monospace" };
const PAD = 'clamp(20px, 5vw, 72px)';
const CAT = {
  neutral: { c: C.neu, t: C.cap, g: 'ba', name: '中性' },
  transition: { c: C.tr, t: C.tr, g: 'ci', name: '过渡期' },
  coprod: { c: C.co, t: C.co, g: 'sq', name: '合拍片与北上' },
  local1: { c: C.l1, t: C.ink2, g: 'di', name: '本土第一阶段' },
  context: { c: C.ctx, t: C.ctx, g: 'hx', name: '社会与政策' },
  local2: { c: C.l2, t: C.l2, g: 'tr', name: '新本土电影' },
  actors: { c: C.act, t: C.act, g: 'pe', name: '演员' }
};
const DARK = new Set([C.tr, C.co, C.l2, C.ctx, C.act, C.ink]);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pct = f => (f * 100).toFixed(3) + '%';
const f1 = n => (+n).toFixed(1), f2 = n => (+n).toFixed(2);
const fmtHM = m => Math.floor(m / 60) + ':' + String(m % 60).padStart(2, '0');
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${(+a).toFixed(3)})`; };
const mono = s => `<span style="font-family: ${F.mono};">${s}</span>`;
F.brush = "'Ma Shan Zheng', 'Noto Serif SC', serif";
const HAVE = new Set(['wjd', 'ynwm', 'zyhl', 'ss', 'dlt', 'nsrj', 'mlr', 'dszp', 'tcl', 'sjy', 'zspl', 'jlcz', 'hermanyau', 'annhui', 'wilsonyip', 'wkw', 'tsui', 'andrewlau', 'peterchan', 'chow', 'pang', 'gordonchan', 'dantelam', 'derekyee', 'leonlai', 'sammi', 'ekin', 'miriam', 'shawn', 'dayo', 'anthony', 'louis', 'stephy', 'benyuen', 'taibo', 'philip']);
const FK = { '《无间道》': 'wjd', '《香港制造》': 'xgzz', '《狂舞派》': 'kwp', '《僵尸》': 'js', '《一念无明》': 'ynwm', '《踏血寻梅》': 'txxm', '《正义回廊》': 'zyhl', '《死尸死时四十四》': 'sss', '《金都》': 'jd', '《填词L》': 'tcl', '《毒舌大状》': 'dsdz', '《饭戏攻心》': 'fxgx', '《麦路人》': 'mlr', '《浊水漂流》': 'zspl', '《沦落人》': 'llr', '《手卷烟》': 'sjy', '《年少日记》': 'nsrj', '《白日之下》': 'brzx', '《翠丝》': 'cs', '《叔·叔》': 'ss', '《九龙城寨之围城》': 'jlcz', '《打擂台》': 'dlt', '《文雀》': 'wq', '《低俗喜剧》': 'dszp' };
const PK = { 许鞍华: 'annhui', 邱礼涛: 'hermanyau', 彭浩翔: 'pang', 周星驰: 'chow', 陈可辛: 'peterchan', 徐克: 'tsui', 王家卫: 'wkw', 刘伟强: 'andrewlau', 叶伟信: 'wilsonyip', 陈木胜: 'bennychan', 尔冬升: 'derekyee', 陈嘉上: 'gordonchan', 林超贤: 'dantelam', 黎明: 'leonlai', 郑伊健: 'ekin', 郑秀文: 'sammi', 杨千嬅: 'miriam', 余文乐: 'shawn', 黄秋生: 'anthony', 黄子华: 'dayo', 张继聪: 'louis', 邓丽欣: 'stephy', 袁富华: 'benyuen', 太保: 'taibo', 姜皓文: 'philip' };
const slotUse = {};
function slot(kind, k, label, shape) { const id = `hk02-${kind}-${k}`; slotUse[id] = (slotUse[id] || 0) + 1; const sid = slotUse[id] > 1 ? id + '-' + slotUse[id] : id; return `<image-slot id="${sid}" ${HAVE.has(k) ? `src="assets/hk02/${kind}-${k}.jpg"` : ''} shape="${shape}" placeholder="${esc(label)}"></image-slot>`; }
const poster = (title, w, extra = '') => `<div style="flex: none; position: relative; width: ${w}; aspect-ratio: 2 / 3; background: ${C.deep}; box-shadow: 0 0 0 1px ${C.ink}; ${extra}">${slot('f', FK[title] || title, title, 'rect')}</div>`;
const photo = (name, w, h, extra = '') => `<div style="flex: none; position: relative; width: ${w}px; height: ${h}px; background: ${C.deep}; box-shadow: 0 0 0 1px ${C.ink}; ${w === h ? 'border-radius: 50%;' : ''} ${extra}">${slot('p', PK[name] || name, name, w === h ? 'circle' : 'rect')}</div>`;
const RWB = `<div style="height: 12px; background: repeating-linear-gradient(90deg, ${C.co} 0 18px, ${C.paper} 18px 24px, ${C.tr} 24px 42px, ${C.paper} 42px 48px); border-bottom: 1px solid ${C.ink};"></div>`;
const PLATE = { D: ['01', '3:18', '0:03:18'], E: ['01', '15:02', '0:15:02'], F: ['01', '22:46', '0:22:46'], G: ['02', '0:19', '0:42:24'], H: ['03', '20:41', '1:33:01'], I: ['04', '0:25', '2:00:48'], N: ['05', '21:15', '2:46:59'], L: ['06', '0:20', '3:08:43'], M: ['07', '22:53', '4:20:53'], J: ['08', '9:46', '4:44:08'], K: ['10', '34:55', '6:26:33'], O: ['11', '0:28', '6:38:22'], P: ['11', '17:22', '6:55:16'] };
const plate = ([c, t, full]) => `<span title="从这里开始听" style="flex: none; display: inline-flex; flex-direction: column; align-items: center; padding: 5px 12px 6px; margin-bottom: 4px; background: ${C.card}; border: 2px solid ${C.ink}; border-radius: 9px; box-shadow: inset 0 0 0 3px ${C.card}, inset 0 0 0 4px ${C.rule2}; line-height: 1.1;"><span style="font-family: ${F.brush}; font-size: 21px; color: ${C.ink};">第 ${c} 段 ${t}</span><span style="margin-top: 3px; font-family: ${F.mono}; font-size: 11px; color: ${C.cap};">全片 ${full}</span></span>`;
const CLIP = { di: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)', tr: 'polygon(50% 0, 100% 100%, 0 100%)', hx: 'polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%)', pe: 'polygon(50% 0, 100% 38%, 81% 100%, 19% 100%, 0 38%)' };
function gl(g, c, s = 10, hollow = false) {
  const neu = c === C.neu;
  const b = `display: inline-block; flex: none; width: ${s}px; height: ${g === 'ba' ? Math.max(4, Math.round(s * 0.5)) : s}px; box-sizing: border-box;`;
  if (g === 'sq' || g === 'ci' || g === 'ba') {
    const fill = hollow ? `background: ${C.paper}; border: 1.5px solid ${neu ? C.faint : c};` : `background: ${c};${neu ? ` border: 1px solid ${C.faint};` : ''}`;
    return `<span style="${b} ${g === 'ci' ? 'border-radius: 50%;' : ''} ${fill}"></span>`;
  }
  const cp = `clip-path: ${CLIP[g]};`;
  if (!hollow) return `<span style="${b} background: ${c}; ${cp}"></span>`;
  const ins = g === 'tr' ? 'left: 2.6px; right: 2.6px; top: 4px; bottom: 1.5px;' : 'left: 2px; right: 2px; top: 2px; bottom: 2px;';
  return `<span style="${b} position: relative; background: ${c}; ${cp}"><span style="position: absolute; ${ins} background: ${C.paper}; ${cp}"></span></span>`;
}
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
function head(letter, title, q) {
  return `<div style="display: flex; flex-wrap: wrap; align-items: flex-end; gap: 12px 22px; padding-bottom: 16px; border-bottom: 3px double ${C.ink};"><span style="flex: none; width: 46px; height: 46px; box-sizing: border-box; border: 1.5px solid ${C.ink}; display: flex; align-items: center; justify-content: center; font-family: ${F.mono}; font-size: 22px; font-weight: 600;">${letter}</span><h2 style="${S.h2}">${title}</h2>${PLATE[letter] ? plate(PLATE[letter]) : ''}<span style="margin-left: auto; padding-bottom: 6px; font-size: 15px; color: ${C.muted};">${q}</span></div>`;
}
const secOpen = (id, letter, title) => `<section id="${id}" data-screen-label="${letter} ${title}" style="padding: clamp(64px, 8vw, 104px) ${PAD} 0;">`;
function sub(title, note) { return `<div style="display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 16px; padding-bottom: 10px; border-bottom: 1px solid ${C.ink};"><h3 style="${S.h3}">${title}</h3>${note ? `<span style="font-size: 13px; color: ${C.cap};">${note}</span>` : ''}</div>`; }
function quote(text, who, size = 21) {
  return `<figure style="margin: 0; padding: 18px 0 0; border-top: 1px solid ${C.ink};"><blockquote style="margin: 0; font-family: ${F.serif}; font-size: ${size}px; font-weight: 600; line-height: 1.6; color: ${C.ink}; text-wrap: pretty;">${esc(text)}</blockquote><figcaption style="margin-top: 8px; font-size: 13px; color: ${C.cap};">—— ${esc(who)}</figcaption></figure>`;
}
const who = t => `<span style="${S.chip}">${esc(t)}</span>`;
const gloss = (w, m) => `<div style="margin-top: 8px; font-size: 12.5px; line-height: 1.6; color: ${C.cap};"><span style="font-family: ${F.serif}; font-weight: 700; color: ${C.ink2};">${w}</span>　${m}</div>`;

const SHORT = { b0: '立题', b1: '背景', b2: '过渡期', b3: 'CEPA 与合拍片', b4: '本土电影第一阶段', b5: '2013 后的背景', b6: '新本土电影', b7: '演员', b8: '结语' };
const SEC = {}; D[1][0].forEach(r => { SEC[r.id] = Object.assign({}, CAT[r.category], { id: r.id, name: r.section, s: hms(r.start), e: hms(r.end), min: r.minutes, share: r.share_pct, cat: r.category }); });
const SECS = Object.values(SEC);
const CL = D[2][0].map(r => ({ n: r.clip, title: r.title, s: hms(r.start), e: hms(r.end), min: r.minutes, start: r.start, end: r.end }));
const ST = D[3][0].map((r, i) => ({ i, t: hms(r.time), time: r.time, clip: r.clip, ct: r.clip_time, label: r.label, sec: r.section, level: +r.level }));
const N1 = ST.filter(s => s.level === 1).length, NST = ST.length;
const GROUPS = [{ k: 'local', name: '本土与身份', c: C.l2 }, { k: 'industry', name: '产业与市场', c: C.tr }, { k: 'coprod', name: '合拍与审查', c: C.co }, { k: 'genre', name: '类型片', c: C.l1 }, { k: 'social', name: '社会议题', c: C.ctx }];
const BINS = D[4][0].map((r, i, a) => ({ s: hm(r.bin_start), e: i === a.length - 1 ? T : hm(r.bin_end), a: r.bin_start, b: r.bin_end, v: Object.fromEntries(GROUPS.map(g => [g.k, +r[g.k + '_per1k']])) }));
const PEAKS = { local: [['0:10', '在定义本土电影', 1], ['3:00', '保育运动，回升', 0], ['7:10', '结尾又回升', 0]], industry: [['1:40', '出口电影与“新埠片”', 1]], coprod: [['1:30', 'CEPA', 1]], genre: [['2:40', '第二个高地：卧底、赌片、情色、鬼片', 2], ['5:00', '《僵尸》', 1]], social: [['6:30', '非血缘共同体与族裔', 1]] };
const RELAY = [['local', '0:10'], ['coprod', '1:30'], ['industry', '1:40'], ['genre', '5:00'], ['social', '6:30']];
const KW = '本土与身份：本土、身份、认同、主体性、香港人、保育、怀旧、香港性、香港意识、香港精神；产业与市场：票房、市场、投资、成本、公司、发行、影碟、片酬、资助、基金、产业、老板、制片；合拍与审查：合拍片、CEPA、北上、审查、过审、引进、分账；类型片：警匪、黑帮、卧底、鬼片、僵尸、恐怖、动作、喜剧、赌片、三级、类型、武侠、功夫；社会议题：社会问题、底层、边缘、阶层、贫富、地产、血缘、共同体、族裔、南亚、新移民、弱势、女性、性少数、无家可归、精神病、躁郁、揽炒、新自由主义、公屋、中产。';
const HMAX = 21.1;
const heatA = v => v <= 0 ? 0 : 0.08 + 0.92 * Math.pow(Math.min(v, HMAX) / HMAX, 0.8);

// ===== A cover
function cover() {
  const toc = [['map', 'B', '节目地图'], ['relay', 'C', '话题接力'], ['years', 'D', '二十七年'], ['lead', 'E', '谁唱主角'], ['five', 'F', '五重属性'], ['survive', 'G', '为卖碟拍电影'], ['legs', 'H', '两条腿'], ['north', 'I', '北上的人'], ['genres', 'N', '过不了审的类型'], ['three', 'L', '三种姿态'], ['money', 'M', '钱从哪来'], ['dream', 'J', '去到几尽'], ['blood', 'K', '血缘之外'], ['actors', 'O', '消失的明星'], ['road', 'P', '越走越窄，还是越走越宽'], ['mentions', 'Q', '谁被提得最多'], ['ledger', 'R', '账本']];
  const meta = [['节目', '《电影巨辩》'], ['专辑', '付费专辑《为了华语电影》'], ['本集', '第 2 集《香港特区电影，始于 1997》'], ['主持', '老马（magasa）、阿吴（LOOK）'], ['录制', '2024 年 10 月初'], ['时长', mono('7:18:33')], ['分段', '平台上切成 11 段播出，内容是一期'], ['跨度', '1993–2024，重点在 1997 年以后']];
  const three = [
    [[CAT.transition], '过渡期', '1997–2003', '海外市场崩盘，靠影碟、电视和经营艺人活下来。节目认为这时的创作反而到了一个高点，《无间道》是“最后的辉煌”。', '一个板块 · 51 分钟', C.tr],
    [[CAT.coprod], '合拍片与北上', '2003 年 CEPA 以后', '合拍片成了唯一的市场，一线导演北上。节目说它让一批精英吃了二十年老本，只造出余文乐一个明星。', '一个板块 · 53 分钟', C.co],
    [[CAT.local1, CAT.local2], '本土电影', '2004–2012 · 2013–2024', '留下的人先拍过不了审的类型片；2013 年以后，学院出身的新导演靠政府资助，把内核换成社会议题和“去到几尽”。', '两个板块加背景 · 252 分钟', `linear-gradient(90deg, ${C.l1} 50%, ${C.l2} 50%)`]
  ];
  const terms = [['香港特区电影', '节目对 1997 年回归以后香港电影的统称，两个时间节点是 1997 年和 2003 年。'], ['CEPA', '2003 年香港和内地签的自由贸易协议。它让香港与内地的合拍片享受国产片待遇。'], ['合拍片', '香港公司和内地公司合作、按内地规则审批的影片。节目说它后来成了港片唯一的市场。'], ['本土电影', '节目的定义是“主要针对香港本土市场的电影”，看题材和受众，不看法律身份。法律上是合拍片的也可以是本土片。'], ['北上', '香港电影人去内地拍片。'], ['红裤子', '片场学徒出身、师傅带徒弟逐级升上来的电影人。和它相对的是“学院派”。'], ['去到几尽', '粤语，意思是“可以做到多彻底、付出多少”。出自《狂舞派》，节目认为它是当下港片最核心的态度。'], ['揽炒', '粤语，玉石俱焚。']];
  const xY = y => 60 + (y - 1993) / 31 * 1080;
  const tx = (x, y, t, c, anchor = 'middle', size = 15, w = 500) => `<text x="${f1(x)}" y="${y}" textAnchor="${anchor}" fill="${c}" style="font-family: ${F.sans}; font-size: ${size}px; font-weight: ${w};">${t}</text>`;
  const fork = `<svg viewBox="0 0 1200 196" style="display: block; width: 100%; height: auto; overflow: visible;">
<line x1="60" y1="98" x2="${f1(xY(1997))}" y2="98" stroke="${C.faint}" strokeWidth="3" strokeDasharray="2 6"></line>
<line x1="${f1(xY(1997))}" y1="98" x2="${f1(xY(2003))}" y2="98" stroke="${C.tr}" strokeWidth="10"></line>
<path d="M ${f1(xY(2003))} 98 C 470 98, 455 40, 525 40 L 1140 40" fill="none" stroke="${C.co}" strokeWidth="10"></path>
<path d="M ${f1(xY(2003))} 98 C 470 98, 455 156, 525 156 L ${f1(xY(2013))} 156" fill="none" stroke="${C.l1}" strokeWidth="10"></path>
<line x1="${f1(xY(2013))}" y1="156" x2="1140" y2="156" stroke="${C.l2}" strokeWidth="10"></line>
<circle cx="${f1(xY(1997))}" cy="98" r="7" fill="${C.paper}" stroke="${C.ink}" strokeWidth="2"></circle>
<circle cx="${f1(xY(2003))}" cy="98" r="7" fill="${C.paper}" stroke="${C.ink}" strokeWidth="2"></circle>
<circle cx="${f1(xY(2013))}" cy="156" r="7" fill="${C.paper}" stroke="${C.ink}" strokeWidth="2"></circle>
${tx((60 + xY(1997)) / 2, 84, '黄金年代的尾声', C.cap, 'middle', 14, 400)}
${tx((xY(1997) + xY(2003)) / 2, 84, '过渡期', C.tr, 'middle', 16, 700)}
${tx(xY(1997), 126, '1997', C.ink, 'middle', 14, 600)}
${tx(xY(2003), 126, '2003 · CEPA', C.ink, 'middle', 14, 600)}
${tx(540, 26, '北上：合拍片二十年', C.co, 'start', 16, 700)}
${tx(540, 186, '本土第一阶段 2004–2012', C.ink2, 'start', 16, 700)}
${tx(xY(2013) + 16, 186, '新本土电影 2013–2024', C.l2, 'start', 16, 700)}
${tx(1140, 26, '“本土的归本土，合拍的归合拍。”', C.ink, 'end', 15, 600)}
</svg>`;
  const legend = [['transition', '过渡期 1997–2003'], ['coprod', '合拍片与北上'], ['local1', '本土第一阶段 2004–2012'], ['local2', '新本土电影 2013–2024'], ['context', '社会与政策背景'], ['actors', '演员'], ['neutral', '中性：立题、背景、结语']];
  const wallF = [['《无间道》', 'transition'], ['《打擂台》', 'local1'], ['《低俗喜剧》', 'local1'], ['《一念无明》', 'local2'], ['《正义回廊》', 'local2'], ['《年少日记》', 'local2'], ['《毒舌大状》', 'local2'], ['《九龙城寨之围城》', 'local2']];
  const pwall = `<div style="margin-top: 48px; padding: 18px clamp(14px, 2vw, 24px) 22px; background: ${C.ink}; color: ${C.paper}; box-shadow: inset 0 0 0 6px ${C.ink}, inset 0 0 0 7px rgba(245,241,232,0.35);"><div style="display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 16px;"><span style="font-family: ${F.brush}; font-size: 30px; line-height: 1.2;">本期片目</span><span style="font-size: 12.5px; color: rgba(245,241,232,0.75);">节目重点谈到的几部，从过渡期到新本土电影；底下的色块是所属阶段</span></div><div style="margin-top: 16px; display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 16px 14px;">${wallF.map(([t, k]) => `<div style="min-width: 0;">${poster(t, '100%', `box-shadow: 0 0 0 1px rgba(245,241,232,0.5);`)}<div style="margin-top: 8px; height: 4px; background: ${CAT[k].c};"></div><div style="margin-top: 6px; font-family: ${F.serif}; font-size: 13.5px; font-weight: 700; line-height: 1.4;">${t}</div></div>`).join('')}</div></div>`;
  return `${RWB}<header id="cover" data-screen-label="A 封面" style="background: linear-gradient(90deg, rgba(26,28,30,0.05) 1px, transparent 1px) 0 0 / 56px 72px, linear-gradient(180deg, rgba(26,28,30,0.05) 1px, transparent 1px) 0 0 / 56px 72px, ${C.paper}; padding: clamp(22px, 3vw, 36px) ${PAD} clamp(44px, 5vw, 64px); border-bottom: 3px double ${C.ink};">
${seriesNav({ color: C.cap })}
<div style="margin-top: clamp(36px, 5vw, 64px); display: flex; flex-wrap: wrap; gap: 44px 56px; align-items: flex-start;">
<div style="flex: 1 1 600px; min-width: 0;">
<div style="display: flex; align-items: center; gap: 14px; font-family: ${F.serif}; font-size: 18px; font-weight: 600; letter-spacing: 0.24em;">为了华语电影<span style="font-family: ${F.mono}; font-size: 15px; letter-spacing: 0.04em; border: 1.5px solid ${C.ink}; padding: 2px 8px 1px;">02</span></div>
<h1 style="margin: 20px 0 0; font-family: ${F.serif}; font-weight: 900; font-size: clamp(46px, 7.4vw, 112px); line-height: 1.1; letter-spacing: 0.01em; text-wrap: balance;">香港特区电影，始于 <span style="background: ${C.yel}; padding: 0 0.12em; border-radius: 4px;">1997</span></h1>
<div style="margin-top: 20px; font-size: 17px; line-height: 1.7; color: ${C.muted};">电影巨辩《为了华语电影》第 2 集 · 7 小时 18 分 · 老马 × 阿吴</div>
<div style="margin-top: 14px; display: inline-flex; flex-wrap: wrap; align-items: center; gap: 4px 14px; padding: 6px 14px; background: ${C.card}; border: 2px solid ${C.ink}; border-radius: 4px; box-shadow: inset 0 0 0 2px ${C.card}, inset 0 0 0 3px ${C.ink};"><span style="font-family: ${F.serif}; font-size: 16px; font-weight: 700; letter-spacing: 0.1em;">香港特區電影</span><span style="font-family: ${F.mono}; font-size: 12.5px; font-weight: 600; letter-spacing: 0.14em;">HONG KONG SAR CINEMA · SINCE 1997</span></div>
<div style="margin-top: 44px; font-family: ${F.serif}; font-weight: 700; font-size: clamp(26px, 3.1vw, 40px); line-height: 1.75;"><span style="border-bottom: 5px solid ${C.tr};">丢了海外</span>，<span style="border-bottom: 5px solid ${C.co};">北上二十年</span>，<span style="padding-bottom: 5px; background: linear-gradient(90deg, ${C.l1} 50%, ${C.l2} 50%) 0 100% / 100% 5px no-repeat;">又回到本土</span>。</div>
<p style="margin: 22px 0 0; max-width: 740px; font-size: 17.5px; line-height: 1.95; color: ${C.ink2}; text-wrap: pretty;">节目把 1997 年以后的香港电影叫作“香港特区电影”。过渡期（1997–2003）丢了海外市场，靠卖碟和经营艺人活下来，创作反而到了一个高点。CEPA 之后，合拍片成了唯一的市场，让一批精英吃了二十年老本，没有造出新明星。2013 年以来，学院出身的新导演靠政府资助拍低成本本土片，把港片的内核从娱乐换成了社会议题和“去到几尽”的主体性。节目对它乐观，因为它在往前走；同时提醒，本土性可能越走越窄，也可能越走越宽。</p>
</div>
<div style="flex: 0 1 350px; min-width: 0;">
<div style="background: ${C.card}; border: 1px solid ${C.ink}; ${notch('52px', 9)}">
<div style="display: flex; justify-content: space-between; align-items: center; height: 52px; padding: 0 22px; box-sizing: border-box; font-size: 12px; letter-spacing: 0.22em;"><span style="display: inline-flex; align-items: baseline; gap: 10px;"><span style="font-family: ${F.brush}; font-size: 22px; letter-spacing: 0.04em;">戲飛</span>节目档案</span><span style="font-family: ${F.mono}; letter-spacing: 0.06em;">No. 02</span></div>
<div style="margin: 0 14px; border-top: 1.5px dashed ${C.ink};"></div>
${meta.map(([k, v]) => `<div style="display: grid; grid-template-columns: 52px minmax(0, 1fr); gap: 12px; padding: 10px 22px; border-bottom: 1px solid ${C.rule}; font-size: 14.5px; line-height: 1.65;"><span style="color: ${C.cap};">${k}</span><span>${v}</span></div>`).join('')}
<div style="padding: 14px 22px 18px;"><div style="display: flex; gap: 2px;">${CL.map(c => `<span title="${esc('第 ' + c.n + ' 段 · ' + c.min + ' 分钟')}" style="flex: ${c.min} 1 0; min-width: 0; height: 20px; box-sizing: border-box; border: 1px solid ${C.ink}; background: ${C.paper}; ${notch('50%', 3)}"></span>`).join('')}</div><div style="margin-top: 8px; font-size: 12px; color: ${C.cap};">11 段，宽度按时长，正好 11 张票</div></div>
</div>
</div>
</div>
<div style="margin-top: 56px; display: {{ wideDisp }};">${fork}</div>
<div style="margin-top: 36px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 28px 32px;">
${three.map(([cats, n, yrs, txt, m, bar]) => `<div style="padding-top: 16px; background: ${bar} 0 0 / 100% 6px no-repeat;"><div style="display: flex; align-items: center; gap: 10px;">${cats.map(k => gl(k.g, k.c, 13)).join('')}<span style="font-family: ${F.serif}; font-size: 22px; font-weight: 700;">${n}</span><span style="font-family: ${F.mono}; font-size: 13px; color: ${C.cap};">${yrs}</span></div><p style="margin: 10px 0 0; font-size: 15.5px; line-height: 1.85; color: ${C.ink2}; text-wrap: pretty;">${txt}</p><div style="margin-top: 8px; font-size: 12.5px; color: ${C.cap};">${m}</div></div>`).join('')}
</div>
${pwall}
<div style="margin-top: 52px;">${sub('先认几个词', '粤语词另附释义')}<div style="margin-top: 6px; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); column-gap: 32px;">${terms.map(([k, v]) => `<div style="display: grid; grid-template-columns: 96px minmax(0, 1fr); gap: 12px; padding: 12px 0; border-bottom: 1px solid ${C.rule};"><span style="font-family: ${F.serif}; font-size: 16px; font-weight: 700; line-height: 1.5;">${k}</span><span style="font-size: 14px; line-height: 1.7; color: ${C.ink2}; text-wrap: pretty;">${v}</span></div>`).join('')}</div></div>
<div style="margin-top: 32px; display: flex; flex-wrap: wrap; align-items: center; gap: 10px 22px; font-size: 13px; color: ${C.cap};"><span>颜色和形状全页一致：</span>${legend.map(([k, t]) => `<span style="display: inline-flex; align-items: center; gap: 7px; color: ${C.ink2};">${gl(CAT[k].g, CAT[k].c, 11)}${t}</span>`).join('')}</div>
<nav style="margin-top: 36px; display: flex; flex-wrap: wrap; gap: 8px;">${toc.map(([id, l, t]) => `<a href="#${id}" style="display: inline-flex; align-items: baseline; gap: 8px; padding: 7px 12px 6px; border: 1px solid ${C.rule2}; background: ${C.card}; color: ${C.ink}; font-size: 14px;" style-hover="border-color: ${C.ink}; color: ${C.ink};"><span style="font-family: ${F.mono}; font-weight: 600; font-size: 13px;">${l}</span>${t}</a>`).join('')}</nav>
</header>`;
}

// ===== B + C
function cHead() {
  const relay = RELAY.map(([k, t]) => { const g = GROUPS.find(x => x.k === k); return `<span style="display: inline-flex; align-items: center; gap: 7px; padding: 5px 10px; border: 1px solid ${C.rule2}; background: ${C.card}; font-size: 13.5px;">${gl('sq', g.c, 9)}${g.name}<span style="font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${t}</span></span>`; }).join(`<span style="color: ${C.faint};">→</span>`);
  return `<div style="display: flex; flex-wrap: wrap; align-items: flex-end; gap: 12px 18px; padding-bottom: 14px; border-bottom: 3px double ${C.ink};"><span style="flex: none; width: 38px; height: 38px; box-sizing: border-box; border: 1.5px solid ${C.ink}; display: flex; align-items: center; justify-content: center; font-family: ${F.mono}; font-size: 18px; font-weight: 600;">C</span><h3 id="relay" style="margin: 0; font-family: ${F.serif}; font-weight: 700; font-size: clamp(26px, 2.8vw, 34px);">话题接力</h3><span style="margin-left: auto; padding-bottom: 4px; font-size: 15px; color: ${C.muted};">每段时间在聊什么</span></div>
<div style="margin-top: 18px; font-family: ${F.serif}; font-size: clamp(19px, 2vw, 23px); font-weight: 600; line-height: 1.6; text-wrap: pretty;">前三段谈钱和市场，中间谈类型，后面谈社会。“本土”在开头、中间和结尾各出现一次。</div>
<div style="margin-top: 14px; display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px;"><span style="font-size: 12.5px; color: ${C.cap};">各组峰值出现的顺序</span>${relay}</div>`;
}
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
    tags += `<div title="${ttl(s)}" style="position: absolute; left: ${pct(xs[k])}; bottom: 0; transform: translateX(-50%); writing-mode: vertical-rl; font-size: 12px; line-height: 1; letter-spacing: 0.06em; padding: 7px 3px; border: 1px solid ${C.ink}; border-top: 4px solid ${sec.c}; border-radius: 2px; background: ${C.card}; color: ${C.ink}; white-space: nowrap; cursor: default;" style-hover="background: ${C.ink}; color: ${C.paper};">${esc(s.label)}</div>`;
    lines += `<line x1="${f2(xs[k] * 1000)}" y1="0" x2="${f2(s.t / T * 1000)}" y2="${LEAD}" stroke="${C.ink}" strokeOpacity="0.5" strokeWidth="1" vectorEffect="non-scaling-stroke"></line>`;
    marks += `<span style="position: absolute; left: ${pct(s.t / T)}; bottom: -3px; width: 6px; height: 6px; margin-left: -3px; border-radius: 50%; background: ${C.ink};"></span>`;
  });
  L2.forEach(s => { marks += `<div title="${ttl(s)}" style="position: absolute; left: ${pct(s.t / T)}; bottom: 0; width: 9px; height: 16px; margin-left: -4.5px; display: flex; justify-content: center; align-items: flex-end; cursor: help;"><span style="width: 1.5px; height: 10px; background: ${SEC[s.sec].c === C.neu ? C.faint : SEC[s.sec].c};"></span></div>`; });
  let clips = '';
  CL.forEach(c => {
    const w = (c.e - c.s) / T;
    clips += `<div title="${esc('第 ' + c.n + ' 段 · ' + c.start + '–' + c.end + ' · ' + c.min + ' 分钟 · ' + c.title)}" style="position: absolute; top: 0; bottom: 0; left: ${pct(c.s / T)}; width: ${pct(w)}; padding: 0 1px; box-sizing: border-box; cursor: help;"><div style="height: 100%; box-sizing: border-box; border: 1px solid ${C.ink}; background: ${C.card}; display: flex; align-items: center; justify-content: center; gap: 7px; ${notch('50%', 6)}" style-hover="background: ${C.deep};"><span style="font-family: ${F.mono}; font-size: 16px; font-weight: 600; line-height: 1;">${c.n}</span><span style="align-self: stretch; margin: 9px 0; border-left: 1px dashed ${C.rule2};"></span><span style="font-family: ${F.mono}; font-size: 11px; line-height: 1; color: ${C.cap};">${c.min}′</span></div></div>`;
  });
  let bands = '';
  SECS.forEach(s => {
    const w = (s.e - s.s) / T, px = w * TW, dark = DARK.has(s.c);
    bands += `<div title="${esc(s.name + ' · ' + s.min + ' 分钟 · ' + s.share + '%')}" style="position: absolute; top: 0; bottom: 0; left: ${pct(s.s / T)}; width: ${pct(w)}; padding-right: 2px; box-sizing: border-box;"><div style="height: 100%; box-sizing: border-box; background: ${s.c}; color: ${dark ? C.card : C.ink}; padding: 7px 7px; overflow: hidden;">${px >= 34 ? `<div style="font-family: ${F.serif}; font-size: 13px; font-weight: 600; line-height: 1.3;">${esc(SHORT[s.id])}</div>` : ''}${px >= 120 ? `<div style="margin-top: 3px; font-family: ${F.mono}; font-size: 11px; white-space: nowrap;">${s.min}′ · ${s.share}%</div>` : px >= 50 ? `<div style="margin-top: 3px; font-family: ${F.mono}; font-size: 11px; white-space: nowrap;">${Math.round(s.min)}′</div>` : ''}</div></div>`;
  });
  const axis = () => { let a = ''; for (let m = 0; m <= 420; m += 30) a += `<div style="position: absolute; left: ${pct(m * 60 / T)}; top: 0; width: 1px; height: 6px; background: ${C.rule2};"></div><div style="position: absolute; left: ${pct(m * 60 / T)}; top: 9px; ${m ? 'transform: translateX(-50%);' : ''} font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${fmtHM(m)}</div>`; a += `<div style="position: absolute; right: 0; top: 0; width: 1px; height: 6px; background: ${C.rule2};"></div><div style="position: absolute; right: 0; top: 22px; font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">7:18</div>`; return `<div style="position: relative; height: 40px; border-top: 1px solid ${C.rule2};">${a}</div>`; };
  const lab = (t, sub, al = 'center') => `<div style="display: flex; flex-direction: column; justify-content: ${al}; gap: 4px;"><span style="font-size: 13px; letter-spacing: 0.12em; color: ${C.ink2};">${t}</span>${sub ? `<span style="font-size: 11.5px; line-height: 1.55; color: ${C.cap};">${sub}</span>` : ''}</div>`;
  const legend = ['transition', 'coprod', 'local1', 'context', 'local2', 'actors', 'neutral'].map(k => `<span style="display: inline-flex; align-items: center; gap: 6px;"><span style="width: 14px; height: 10px; background: ${CAT[k].c};"></span>${CAT[k].name}</span>`).join('');
  const secLines = SECS.slice(1).map(s => `<div style="position: absolute; top: 0; bottom: 0; left: ${pct(s.s / T)}; width: 1px; background: ${C.rule2};"></div>`).join('');
  let crows = '';
  GROUPS.forEach(g => {
    const peak = Math.max(...BINS.map(b => b.v[g.k]));
    let cells = '', notes = '';
    BINS.forEach(b => { const a = heatA(b.v[g.k]); cells += `<div title="${esc(g.name + ' · ' + b.a + '–' + b.b + ' · 每千字 ' + b.v[g.k])}" style="position: absolute; top: 0; bottom: 0; left: ${pct(b.s / T)}; width: ${pct((b.e - b.s) / T)}; padding-right: 1px; box-sizing: border-box;"><div style="height: 100%; background: ${a ? rgba(g.c, a) : 'transparent'};"></div></div>`; });
    PEAKS[g.k].forEach(([st, note, kind]) => {
      const i = BINS.findIndex(x => x.a === st), b = BINS[i], b2 = kind === 2 ? BINS[i + 1] : b, right = b.s / T > 0.8;
      const v = kind === 2 ? Math.max(b.v[g.k], b2.v[g.k]) : b.v[g.k];
      cells += `<div style="position: absolute; top: -2px; bottom: -2px; left: ${pct(b.s / T)}; width: ${pct((b2.e - b.s) / T)}; box-sizing: border-box; border: ${kind === 1 ? `2px solid ${C.ink}` : `1.5px dashed ${C.ink}`}; pointer-events: none;"></div>`;
      notes += `<div style="position: absolute; ${right ? `right: ${pct(1 - b2.e / T)}` : `left: ${pct(b.s / T)}`}; bottom: 4px; display: flex; gap: 6px; align-items: baseline; white-space: nowrap; font-size: 12px; color: ${C.ink};"><span style="font-family: ${F.mono}; font-weight: 600;">${v.toFixed(1)}</span><span style="font-family: ${F.mono}; color: ${C.cap};">${b.a}–${b2.b}</span><span>${note}</span></div>`;
    });
    crows += `<div style="${G2}"><div style="display: flex; align-items: center; gap: 8px; padding-top: 22px;">${gl('sq', g.c, 10)}<div><div style="font-family: ${F.serif}; font-size: 14px; font-weight: 600; line-height: 1.3;">${g.name}</div><div style="font-size: 11px; color: ${C.cap};">峰值 ${peak.toFixed(1)}</div></div></div><div style="position: relative; height: 56px;"><div style="position: absolute; left: 0; right: 0; top: 0; height: 22px;">${notes}</div><div style="position: absolute; left: 0; right: 0; top: 22px; bottom: 2px; background: rgba(26,28,30,0.035);">${secLines}${cells}</div></div></div>`;
  });
  return `<div style="margin-top: 36px; overflow-x: auto; padding-bottom: 8px;"><div style="min-width: 1180px;">
<div style="${G2}">${lab('站点', `方框是 ${N1} 个主站，短刻度是 ${NST - N1} 个次站。悬停可看在第几段的几分几秒`, 'flex-end')}<div style="position: relative; height: ${TAGH + LEAD}px;"><div style="position: absolute; left: 0; right: 0; top: 0; height: ${TAGH}px;">${tags}</div><svg viewBox="0 0 1000 ${LEAD}" preserveAspectRatio="none" style="position: absolute; left: 0; top: ${TAGH}px; width: 100%; height: ${LEAD}px; overflow: visible;">${lines}</svg><div style="position: absolute; left: 0; right: 0; top: ${TAGH}px; height: ${LEAD}px;">${marks}</div></div></div>
<div style="${G2}">${lab('平台 11 段', '11 张票，悬停看段名')}<div style="padding-top: 6px;"><div style="position: relative; height: 50px;">${clips}</div></div></div>
<div style="${G2} margin-top: 4px;">${lab('9 个板块', '按节目里的过渡句切分')}<div style="position: relative; height: 58px;">${bands}</div></div>
<div style="${G2} margin-top: 10px;"><div></div><div style="display: flex; flex-wrap: wrap; gap: 6px 18px; font-size: 12.5px; color: ${C.cap};">${legend}<span>第 01、03、07、11 段各跨两个板块</span></div></div>
<div style="${G2} margin-top: 12px;"><div style="font-size: 12px; color: ${C.cap};">全片时间</div>${axis()}</div>
<div style="margin-top: 52px;">${cHead()}</div>
<div style="margin-top: 14px;">${crows}</div>
<div style="${G2} margin-top: 6px;"><div style="font-size: 12px; color: ${C.cap};">全片时间</div>${axis()}</div>
<div style="${G2} margin-top: 2px;"><div></div><div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px; font-size: 12px; color: ${C.cap};"><span style="font-family: ${F.mono};">0</span><span style="width: 160px; height: 10px; background: linear-gradient(90deg, rgba(26,28,30,0.08), ${C.ink});"></span><span style="font-family: ${F.mono};">21.1</span><span>每千字出现次数；实线框为各组峰值，虚线框为次高处</span></div></div>
</div></div>`;
}
function bcMobile() {
  const H = 1800, k = H / T;
  const X = { clip: 38, sec: 67, heat: 79, lead: 135, lab: 157 };
  let h = '';
  for (let m = 0; m <= 420; m += 30) { const y = m * 60 * k; h += `<div style="position: absolute; left: 0; top: ${f1(y)}px; transform: translateY(-50%); font-family: ${F.mono}; font-size: 11px; color: ${C.cap};">${fmtHM(m)}</div><div style="position: absolute; left: ${X.clip}px; width: ${X.lead - X.clip}px; top: ${f1(y)}px; height: 1px; background: ${C.rule};"></div>`; }
  h += `<div style="position: absolute; left: 0; top: ${H}px; transform: translateY(-50%); font-family: ${F.mono}; font-size: 11px; color: ${C.cap};">7:18</div>`;
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
    svg += `<line x1="0" y1="${f1(it.y)}" x2="22" y2="${f1(cy)}" stroke="${it.kind === 'sec' ? (it.s.c === C.neu ? C.faint : it.s.c) : C.ink}" strokeOpacity="0.6" strokeWidth="1"></line>`;
    if (it.kind === 'sec') labs += `<div style="position: absolute; left: ${X.lab}px; right: 0; top: ${f1(tops[i])}px; padding-top: 4px; border-top: 2px solid ${it.s.c}; font-family: ${F.serif}; font-size: 14px; font-weight: 700; line-height: 1.35;">${esc(it.s.name)} <span style="font-family: ${F.mono}; font-size: 11px; font-weight: 400; color: ${C.cap};">${it.s.min}′</span></div>`;
    else labs += `<div style="position: absolute; left: ${X.lab}px; right: 0; top: ${f1(tops[i])}px; font-size: 13px; line-height: 18px;"><span style="font-family: ${F.mono}; font-size: 11px; color: ${C.cap}; margin-right: 6px;">${it.s.time.slice(0, -3)}</span>${esc(it.s.label)}</div>`;
  });
  const leg = GROUPS.map(g => `<span style="display: inline-flex; align-items: center; gap: 6px;">${gl('sq', g.c, 9)}${g.name}</span>`).join('');
  return `<div style="margin-top: 28px;">${cHead()}</div>
<div style="margin-top: 18px; display: flex; flex-wrap: wrap; gap: 6px 14px; font-size: 12.5px; color: ${C.ink2};">${leg}</div>
<p style="${S.cap}">左起：全片时间、平台 11 段、板块颜色、五组话题的热度（颜色越深，该组关键词每千字出现越多）、主站。</p>
<div style="position: relative; height: ${H}px; margin: 26px 0 12px;">${h}<svg width="22" height="${H}" style="position: absolute; left: ${X.lead}px; top: 0; overflow: visible;">${svg}</svg>${labs}</div>`;
}
function stationList() {
  let h = '';
  CL.forEach(c => {
    const [t1, t2] = c.title.split('｜');
    const rows = ST.filter(s => s.clip === c.n).map(s => {
      const sec = SEC[s.sec], one = s.level === 1;
      return `<div style="display: ${one ? 'grid' : '{{ stMinorGrid }}'}; grid-template-columns: 56px 40px 10px minmax(0, 1fr); gap: 8px; align-items: baseline; padding: 4px 0;"><span style="font-family: ${F.mono}; font-size: 12.5px; color: ${C.ink2};">${s.time}</span><span style="font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${s.ct}</span><span style="align-self: center; display: flex;">${gl(sec.g, sec.c, 8)}</span><span style="${one ? `font-family: ${F.serif}; font-size: 15px; font-weight: 600; color: ${C.ink};` : `font-size: 14px; color: ${C.muted};`} line-height: 1.55;">${esc(s.label)}</span></div>`;
    }).join('');
    h += `<div style="break-inside: avoid; margin-bottom: 26px; background: ${C.card}; border: 1px solid ${C.ink};"><div style="display: grid; grid-template-columns: 58px minmax(0, 1fr); ${notch('50%', 7)} border-bottom: 1px solid ${C.ink}; background: ${C.deep};"><div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; border-right: 1.5px dashed ${C.ink};"><span style="font-family: ${F.brush}; font-size: 14px; line-height: 1;">場次</span><span style="font-family: ${F.mono}; font-size: 22px; font-weight: 600; line-height: 1;">${c.n}</span></div><div style="padding: 10px 14px 10px 14px;"><div style="font-family: ${F.serif}; font-size: 15.5px; font-weight: 700; line-height: 1.45; text-wrap: pretty;">${esc(t1)}</div><div style="margin-top: 3px; font-size: 12.5px; line-height: 1.55; color: ${C.muted};">${esc(t2 || '')}</div><div style="margin-top: 3px; font-family: ${F.mono}; font-size: 11.5px; color: ${C.cap};">${c.start}–${c.end} · ${c.min}′</div></div></div><div style="padding: 8px 14px 10px;">${rows}</div></div>`;
  });
  return `<div style="margin-top: 60px; display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px 20px; padding-bottom: 12px; border-bottom: 1px solid ${C.ink};"><h3 style="margin: 0; font-family: ${F.serif}; font-size: 24px; font-weight: 700;">按段落回听</h3><span style="font-size: 13.5px; color: ${C.cap};">每行依次是全片时间、该段内的时间、站点；宋体为主站</span><div role="button" onClick="{{ toggleSt }}" style="margin-left: auto; ${S.btn}" style-hover="${S.btnH}">{{ stBtn }}</div></div>
<div style="margin-top: 22px; columns: 320px; column-gap: 28px;">${h}</div>`;
}
function sectionB() {
  return `${secOpen('map', 'B', '节目地图')}${head('B', '节目地图', '七个多小时怎么走的')}
<p style="${S.intro}">先解释为什么不聊黄金时期、什么算本土电影，再按时间讲三段：过渡期、合拍片二十年、本土电影（又分 2004–2012 和 2013–2024 两个阶段）。中间插了一段社会与政策背景，最后讲演员和结论。</p>
<div style="${S.lead}"><span style="color: ${C.l2};">两个本土电影板块</span>加上中间的背景共 252 分钟，占 57%；<span style="color: ${C.co};">合拍片</span> 53 分钟，占 12%。</div>
<div style="display: {{ wideDisp }};">${bcDesktop()}<p style="${S.cap}">条宽按时长等比。板块按节目里的过渡句切分，误差约一分钟。话题热度每 10 分钟一格，五行同一色阶，用每千字出现次数而不是次数（最后一格只有 8 分半）。各组关键词——${KW}</p></div>
<div style="display: {{ narrowDisp }};">${bcMobile()}<p style="${S.cap}">各组关键词——${KW}</p></div>
${stationList()}
</section>`;
}

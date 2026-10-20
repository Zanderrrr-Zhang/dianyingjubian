const MD = 'src/episodes/zmy09/handoff.md';
const OUT = EPISODE.page;
const PFX = 'zmy09-p';
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
  rows.forEach(r => { if (r.length !== h.length) log('CSV LEN', h.length, r.length, r.slice(0, 2).join('|')); });
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
const D = {}; for (let i = 1; i <= 18; i++) D[i] = blks('D' + i);
const D19 = mdTable('D19');
const hms = s => { const p = s.split(':').map(Number); return p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + p[1]; };
const hm = s => { const [h, m] = s.split(':').map(Number); return h * 3600 + m * 60; };
const T = hms('7:22:21');
const TERMS = (() => { const a = md.indexOf('**需要解释给读者的术语**'), b = md.indexOf('**时间戳的口径**'); return md.slice(a, b).split('\n').filter(l => /^\s+- /.test(l)).map(l => { const t = l.replace(/^\s+- /, ''); const i = t.indexOf('：'); return [t.slice(0, i), t.slice(i + 1)]; }); })();
const KW = (() => { const a = md.indexOf('**关键词组包含的词**：'); return md.slice(a + '**关键词组包含的词**：'.length).split('\n')[0].trim(); })();

const C = { ink: '#1C1B1A', ink2: '#2D2B28', paper: '#F3EFE7', card: '#FBF9F4', deep: '#E6E0D4', wall: '#EAE5DA', muted: '#4A4743', cap: '#5F5B55', faint: '#908B83', rule: 'rgba(28,27,26,0.14)', rule2: 'rgba(28,27,26,0.3)', silver: '#A6ADB5', latex: '#1F1F25', glass: '#E4E2DD' };
const PH = { industry: '#B8456A', women: '#D9A3A0', acting: '#B9914A', early: '#8FA9C4', prime: '#2F5B4F', genre: '#C8783A', intl: '#1F1F25', late: '#2C4A86', coda: '#CFC9BE' };
const PHT = { industry: '#A63D60', women: '#A0605C', acting: '#86672C', early: '#4C6C8E', prime: '#2F5B4F', genre: '#A15A26', intl: '#1F1F25', late: '#2C4A86', coda: '#77716A' };
const PHN = { industry: '香港娱乐工业', women: '女星生态', acting: '表演风格', early: '早年与开窍', prime: '演技派之路', genre: '喜剧与动作', intl: '《迷离劫》与阿萨亚斯', late: '《甜蜜蜜》与后期', coda: '息影与明星的终结' };
const PHS = { industry: '香港娱乐工业', women: '女星生态', acting: '表演风格', early: '早年与开窍', prime: '演技派之路', genre: '喜剧动作', intl: '《迷离劫》', late: '《甜蜜蜜》与后期', coda: '息影与明星的终结' };
const PHD = { industry: '霓虹玫红：70 年代以后的香港城市', women: '胭脂粉', acting: '暖金：化妆镜前的灯', early: '雾蓝：英国长大，港姐', prime: '墨绿：王家卫、关锦鹏那几部的夜色', genre: '赭橙：武侠片的黄沙', intl: '乳胶黑，配一道银灰：伊尔玛·维普的紧身衣', late: '夜钴蓝：纽约街头的夜', coda: '银幕灰白：一块空白的银幕' };
const PHK = Object.keys(PH);
const LIGHT = new Set(['women', 'acting', 'early', 'genre', 'coda']);
const onPH = p => LIGHT.has(p) ? C.ink : '#fff';
const KN = { film: '作品分析', acting: '表演分析', industry: '产业与制度', life: '生平与轶事', idea: '理论与总评' };
const KCP = { film: 'none', acting: 'none', industry: 'polygon(50% 0, 100% 100%, 0 100%)', life: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)', idea: 'polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%)' };
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

const LZ = { ink: C.ink, fg: C.ink, fg2: C.ink2, muted: C.muted, cap: C.cap, faint: C.faint, card: C.card, wall: C.wall, rule: C.rule, rule2: C.rule2, bg: C.paper };
const DZ = { ink: '#D9DCE0', fg: '#F3EFE7', fg2: '#E2DED6', muted: '#CFCBC3', cap: '#B4BAC1', faint: '#868B92', card: '#2A2A31', wall: '#34343C', rule: 'rgba(166,173,181,0.24)', rule2: 'rgba(166,173,181,0.5)', bg: C.latex };
let Z = LZ;
const S = {
  get h2() { return `margin: 0; font-family: ${F.serif}; font-weight: 700; font-size: clamp(28px, 3.4vw, 44px); line-height: 1.2; letter-spacing: 0.02em; color: ${Z.fg};`; },
  get h3() { return `margin: 0; font-family: ${F.serif}; font-size: 20px; font-weight: 700; line-height: 1.4; color: ${Z.fg};`; },
  get intro() { return `margin: 22px 0 0; max-width: 900px; font-size: 16.5px; line-height: 1.9; color: ${Z.fg2}; text-wrap: pretty;`; },
  get lead() { return `margin: 22px 0 0; max-width: 1100px; font-family: ${F.serif}; font-size: clamp(19px, 2vw, 24px); font-weight: 600; line-height: 1.65; color: ${Z.fg}; text-wrap: pretty;`; },
  get cap() { return `margin: 14px 0 0; max-width: 1080px; font-size: 12.5px; line-height: 1.8; color: ${Z.cap}; text-wrap: pretty;`; },
  get body() { return `font-size: 14.5px; line-height: 1.8; color: ${Z.fg2}; text-wrap: pretty;`; },
  get sm() { return `font-size: 13px; line-height: 1.7; color: ${Z.fg2}; text-wrap: pretty;`; },
  get chip() { return `display: inline-flex; align-items: center; gap: 5px; padding: 0 7px; border: 1px solid ${Z.rule2}; font-size: 11.5px; line-height: 1.7; letter-spacing: 0.03em; color: ${Z.cap}; white-space: nowrap;`; },
  get card() { return `background: ${Z.card}; border: 1px solid ${Z.ink};`; },
  get lab() { return `font-size: 12px; letter-spacing: 0.08em; color: ${Z.cap};`; },
  get ttl() { return `font-family: ${F.serif}; font-size: 16.5px; font-weight: 700; line-height: 1.45; color: ${Z.fg};`; },
  btn: `user-select: none; font-family: ${F.sans}; font-size: 13px; letter-spacing: 0.04em; padding: 7px 14px; border: 1px solid ${C.ink}; background: ${C.card}; color: ${C.ink}; cursor: pointer;`,
  btnH: `background: ${C.ink}; color: ${C.paper};`
};
const grainC = p => LIGHT.has(p) ? 'rgba(28,27,26,0.5)' : 'rgba(255,255,255,0.62)';
const phBgV = (p, grain) => grain ? `radial-gradient(circle, ${grainC(p)} 0 0.75px, transparent 1.05px) 0 0 / 3px 3px, radial-gradient(circle, ${grainC(p)} 0 0.6px, transparent 0.9px) 1.5px 2px / 4px 4px, ${PH[p]}` : PH[p];
const phBg = (p, g) => `background: ${phBgV(p, g)};`;
const phEdge = p => p === 'coda' ? `box-shadow: inset 0 0 0 1px ${C.ink};` : p === 'intl' ? `box-shadow: inset 0 -2px 0 ${C.silver};` : '';
const sw = (p, w = 14, h = 10, g) => `<span style="display: inline-block; flex: none; width: ${w}px; height: ${h}px; ${phBg(p, g)} ${phEdge(p)}"></span>`;
const shape = (k, z = 9, col = Z.ink) => `<span style="display: inline-block; flex: none; width: ${z}px; height: ${z}px; background: ${col}; ${k === 'acting' ? 'border-radius: 50%;' : ''} ${KCP[k] !== 'none' ? `clip-path: ${KCP[k]};` : ''}"></span>`;
const tier = (t, z = 11) => t == null ? `<span style="display: inline-flex; align-items: center; gap: 2px;">${[0, 1, 2, 3, 4].map(() => `<span style="width: ${z}px; height: ${z}px; box-sizing: border-box; border: 1px dashed ${Z.faint};"></span>`).join('')}<span style="margin-left: 6px; font-size: 11.5px; color: ${Z.cap};">不评档</span></span>` : `<span title="第 ${t} 档" style="display: inline-flex; align-items: center; gap: 2px;">${[1, 2, 3, 4, 5].map(i => `<span style="width: ${z}px; height: ${z}px; box-sizing: border-box; border: 1px solid ${Z.ink}; background: ${i <= t ? Z.ink : 'transparent'};"></span>`).join('')}<span style="margin-left: 6px; font-family: ${F.mono}; font-size: 11.5px; color: ${Z.cap};">${t}/5</span></span>`;
const BULB = [[16.7, 't'], [50, 't'], [83.3, 't'], [16.7, 'b'], [50, 'b'], [83.3, 'b'], [33.3, 'l'], [66.7, 'l'], [33.3, 'r'], [66.7, 'r']];
const bulbs = (z = '9px', fill = Z.card, edge = Z.ink) => BULB.map(([p, s]) => { const pos = s === 't' ? `left: ${p}%; top: 0;` : s === 'b' ? `left: ${p}%; top: 100%;` : s === 'l' ? `left: 0; top: ${p}%;` : `left: 100%; top: ${p}%;`; return `<span aria-hidden="true" style="position: absolute; ${pos} width: ${z}; height: ${z}; transform: translate(-50%, -50%); border-radius: 50%; box-sizing: border-box; border: 1.5px solid ${edge}; background: ${fill};"></span>`; }).join('');
const mirror = (inner, ex = '') => `<div style="position: relative; box-sizing: border-box; border: 1.5px solid ${Z.ink}; background: ${Z.card}; padding: 22px 26px 24px; ${ex}">${bulbs('9px', Z.card, Z.ink)}${inner}</div>`;
const mirrorIcon = (col = C.ink, bg = C.card) => `<svg width="22" height="16" viewBox="0 0 22 16" style="flex: none; display: block; overflow: visible;"><rect x="2" y="2" width="18" height="12" fill="${bg}" stroke="${col}" strokeWidth="1.2"></rect>${[[5, 2], [11, 2], [17, 2], [5, 14], [11, 14], [17, 14], [2, 6], [2, 10], [20, 6], [20, 10]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.7" fill="${col}"></circle>`).join('')}</svg>`;
const holes = col => `repeating-linear-gradient(90deg, transparent 0 9px, ${col} 9px 19px, transparent 19px 28px)`;
// 阶段色的名字和来由，原样取自交接文档第 3 节的颜色表
const PHL = Object.fromEntries(Object.keys(PH).map(k => {
  const c = md.split('\n').find(l => l.startsWith('|') && l.includes(`（${k}）`)).split('|').map(s => s.trim());
  return [k, { name: c[2].replace(/\s*#[0-9A-Fa-f]{6}/g, '').replace(/（[^）]*）/g, ''), why: c[3] === '—' ? '' : c[3] }];
}));
// 片头带：模块之间的胶片，画格里填下一个模块的阶段色，旁边写颜色名和来由；没有阶段的模块仍是黑色齿孔条
const frames = p => p === 'coda' ? `repeating-linear-gradient(90deg, ${C.ink} 0 1px, ${PH.coda} 1px 63px, ${C.ink} 63px 68px)`
  : p === 'intl' ? `repeating-linear-gradient(90deg, ${C.silver} 0 1px, ${PH.intl} 1px 63px, ${C.silver} 63px 64px, ${C.ink} 64px 68px)`
  : `repeating-linear-gradient(90deg, ${PH[p]} 0 64px, ${C.ink} 64px 68px)`;
const strip = (code = '') => {
  const p = MODP[code.slice(-1)];
  if (!p) return `<div aria-hidden="true" style="position: relative; height: 26px; background: ${holes(C.paper)} 0 4px / 100% 5px no-repeat, ${holes(C.paper)} 0 17px / 100% 5px no-repeat, ${C.ink};">${code ? `<span style="position: absolute; right: ${PAD}; top: 8px; padding: 0 8px; background: ${C.ink}; font-family: ${F.type}; font-size: 10px; line-height: 10px; letter-spacing: 0.18em; color: #B9B4AA;">${code}</span>` : ''}</div>`;
  const l = PHL[p];
  return `<div aria-hidden="true" style="position: relative; height: 48px; background: ${holes(C.paper)} 0 5px / 100% 5px no-repeat, ${holes(C.paper)} 0 38px / 100% 5px no-repeat, ${C.ink};"><div style="position: absolute; left: 0; right: 0; top: 14px; height: 20px; background: ${frames(p)}; ${p === 'intl' ? `box-shadow: inset 0 1px 0 ${C.silver}, inset 0 -1px 0 ${C.silver};` : ''}"></div><span style="position: absolute; right: ${PAD}; top: 14px; max-width: calc(100% - 2 * ${PAD}); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding: 0 10px; background: ${C.ink}; font-size: 12px; line-height: 20px; color: #E2DED6;"><span style="font-family: ${F.type}; font-size: 10.5px; letter-spacing: 0.16em; color: #B9B4AA;">${code}</span>　${l.name}${l.why ? `<span style="color: #B9B4AA;">　${esc(l.why)}</span>` : ''}</span></div>`;
};
const outlines = (w = 30, h = 22, col = Z.ink, n = 3, fill = 'transparent') => `<span aria-hidden="true" style="flex: none; position: relative; display: block; width: ${w + (n - 1) * 7}px; height: ${h + (n - 1) * 5}px;">${Array.from({ length: n }, (_, i) => `<span style="position: absolute; left: ${i * 7}px; top: ${i * 5}px; width: ${w}px; height: ${h}px; box-sizing: border-box; border: 1.5px solid ${col}; border-radius: 5px; background: ${fill};"></span>`).join('')}</span>`;

const IMG = {}; { const rem = JSON.parse(await readFile('src/episodes/zmy09/img.json')); Object.keys(rem).forEach(k => IMG[k] = rem[k].src); (await ls('assets/zmy09')).forEach(f => { const n = f.split('/').pop(); IMG[n.replace(/\.\w+$/, '')] = 'assets/zmy09/' + n; }); }
const FK = { '旺角卡门': 'f-w05', '警察故事': 'f-w02', '玫瑰的故事': 'f-w03', '黄色故事': 'f-w04', '不脱袜的人': 'f-w06', '人在纽约': 'f-w07', '客途秋恨': 'f-w08', '滚滚红尘': 'f-w09', '爱在别乡的季节': 'f-w10', '阿飞正传': 'f-w11', '双城故事': 'f-w12', '阮玲玉': 'f-w13', '新龙门客栈': 'f-w14', '家有喜事': 'f-w15', '青蛇': 'f-w16', '东方三侠': 'f-w17', '东邪西毒': 'f-w18', '迷离劫': 'f-w19', '甜蜜蜜': 'f-w20', '宋家皇朝': 'f-w21', '中国匣': 'f-w22', '花样年华': 'f-w23', '英雄': 'f-w24', '清洁': 'f-w25', '济公': 'f-jigong', '现代豪侠传': 'f-exec', '独臂刀': 'f-onearm', '神女': 'f-goddess', '英雄本色': 'f-better', '青蛙王子': 'f-frog', '海上花': 'f-flowers', '吸血鬼': 'f-vamp', '新女性': 'f-newwomen' };
const PK = { '张曼玉': 'p-maggie', '阿萨亚斯': 'p-assayas', '王家卫': 'p-wkw', '林青霞': 'p-brigitte', '关锦鹏': 'p-kwan', '陈自强': 'p-chanchi', '刘德华': 'p-andy', '曾志伟': 'p-tsang', '陈可辛': 'p-peter', '梁家辉': 'p-kafai', '成龙': 'p-jackie', '黎明': 'p-leon', '周星驰': 'p-chow', '张国荣': 'p-leslie', '侯孝贤': 'p-hou', '许鞍华': 'p-annhui', '梅艳芳': 'p-anita', '杨紫琼': 'p-michelle', '梁朝伟': 'p-tony', '王晶': 'p-wongjing', '周润发': 'p-cyf', '巩俐': 'p-gongli', '张艾嘉': 'p-sylvia', '王菲': 'p-faye', '徐克': 'p-tsui', '郑裕玲': 'p-carol', '刘嘉玲': 'p-carina', '王祖贤': 'p-joey', '缪骞人': 'p-cora', '萧芳芳': 'p-josephine', '嘉宝': 'p-garbo', '赫本': 'p-hepburn', '尼克·诺尔蒂': 'p-nolte', '鲍德里亚': 'p-baudrillard', '本雅明': 'p-benjamin', '张彻': 'p-changcheh', '王羽': 'p-wangyu', '狄龙': 'p-tilung', '姜大卫': 'p-chiang', '阮玲玉': 'p-ruan', '杨凡': 'p-yonfan', '罗卓瑶': 'p-clara', '吴宇森': 'p-woo', '贾樟柯': 'p-jia', '李丽华': 'p-lilihua', '凌波': 'p-lingbo', '葛兰': 'p-grace', '尤敏': 'p-youmin', '夏梦': 'p-xiameng', '石慧': 'p-shihui', '白燕': 'p-pakyin', '红线女': 'p-hungsinnui', '陈宝珠': 'p-connie', '巨石强森': 'p-rock', '威尔·史密斯': 'p-willsmith', '邱刚健': 'p-chiu', '焦雄屏': 'p-jiao', '吴思远': 'p-ngseeyuen', '李小龙': 'p-lee', '许冠文': 'p-hui', '洪金宝': 'p-sammo', '钟楚红': 'p-cherie', '杜琪峰': 'p-to', '杜可风': 'p-doyle' };
const fk = t => { const m = String(t).match(/《([^》]+)》/); return FK[m ? m[1] : String(t)] || null; };
const tk = t => fk(t) || 'f-t' + [...String(t).replace(/[《》]/g, '')].map(c => c.charCodeAt(0).toString(36)).join('');
const slotN = {};
const slot = (k, label, shape = 'rect') => { const kk = String(k).replace(/[^\w-]/g, ''); slotN[kk] = (slotN[kk] || 0) + 1; const id = 'zmy09-' + kk + (slotN[kk] > 1 ? '-' + slotN[kk] : ''); return `<image-slot id="${id}" ${IMG[k] ? `src="${IMG[k]}"` : ''} shape="${shape}" placeholder="${esc(label)}" style="position: absolute; inset: 0; width: 100%; height: 100%;"></image-slot>`; };
const poster = (k, t, w = '80px', ex = '') => `<div style="flex: none; position: relative; width: ${w}; aspect-ratio: 2 / 3; background: ${Z.wall}; color: ${Z.fg}; box-shadow: 0 0 0 1px ${Z.ink}; overflow: hidden; ${ex}">${slot(k, String(t).replace(/[《》]/g, '') + ' 海报')}</div>`;
const face = (k, name, z = 56, ex = '') => `<span title="${esc(name)}" style="flex: none; position: relative; display: block; width: ${z}px; height: ${z}px; border-radius: 50%; overflow: hidden; background: ${Z.wall}; color: ${Z.fg}; box-shadow: 0 0 0 1.5px ${Z.ink}; ${ex}">${slot(k || 'p-x', name, 'circle')}</span>`;
const hasP = n => !!(PK[n] && IMG[PK[n]]);
const faceIf = (n, z) => hasP(n) ? face(PK[n], n, z) : '';
const posterIf = (t, w) => fk(t) && IMG[fk(t)] ? poster(fk(t), t, w) : '';
const faceCap = (n, note = '', z = 64) => `<figure style="margin: 0; flex: none; width: ${Math.max(z, 76)}px; display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center;">${face(PK[n], n, z)}<figcaption style="font-size: 12.5px; line-height: 1.4; color: ${Z.fg};"><b style="font-family: ${F.serif};">${esc(n)}</b>${note ? `<br><span style="font-size: 11.5px; color: ${Z.cap};">${esc(note)}</span>` : ''}</figcaption></figure>`;
const posterCap = (t, note = '', w = 96) => `<figure style="margin: 0; flex: none; width: ${w}px;">${poster(tk(t), t, w + 'px')}<figcaption style="margin-top: 6px; font-size: 12px; line-height: 1.45; color: ${Z.fg};"><b style="font-family: ${F.serif};">《${esc(String(t).replace(/[《》]/g, ''))}》</b>${note ? `<br><span style="font-size: 11px; color: ${Z.cap};">${esc(note)}</span>` : ''}</figcaption></figure>`;
const figs = (items, mt = 20) => `<div style="margin-top: ${mt}px; display: flex; flex-wrap: wrap; gap: 16px 22px; align-items: flex-end;">${items.join('')}</div>`;
const stack = (names, z = 26) => { const fs = names.map(n => n.trim()).filter(hasP); return fs.length ? `<span style="display: inline-flex; align-items: center; flex: none;">${fs.map((n, i) => `<span style="margin-left: ${i ? -6 : 0}px; display: block; border-radius: 50%; box-shadow: 0 0 0 2px ${Z.card};">${face(PK[n], n, z)}</span>`).join('')}</span>` : ''; };
const WPK = id => id === 'w01' ? 'f-frog' : 'f-' + id;

const CL = D[2][0].map(r => ({ n: +r.clip, no: r.platform_no, title: r.title, s: hms(r.start), e: hms(r.end), min: r.minutes, start: r.start, end: r.end }));
const clipOf = t => CL.find(c => t >= c.s && t < c.e) || CL[CL.length - 1];
const SECS = D[1][0].map(r => ({ id: r.id, name: r.section, s: hms(r.start), e: hms(r.end), min: +r.minutes, ph: r.phase, kind: r.kind, work: r.work, clip: +r.clip }));
const SEC = Object.fromEntries(SECS.map(s => [s.id, s]));
const phAt = t => (SECS.find(s => t >= s.s && t < s.e) || SECS[SECS.length - 1]).ph;
const ST = D[3][0].map(r => ({ t: hms(r.time), time: r.time, clip: +r.clip, ct: r.clip_time, label: r.label, sec: r.section, level: +r.level }));
const L1 = ST.filter(s => s.level === 1), L2 = ST.filter(s => s.level === 2);
const N1 = L1.length, NST = ST.length;
const PHR = []; SECS.forEach(s => { const l = PHR[PHR.length - 1]; if (l && l.ph === s.ph) l.e = s.e; else PHR.push({ ph: s.ph, s: s.s, e: s.e }); }); PHR.forEach(r => r.min = (r.e - r.s) / 60);
const PMIN = Object.fromEntries(PHR.map(r => [r.ph, r.min]));
const wname = w => w === '王晶的喜剧' ? '王晶的喜剧' : w.split('、').map(x => '《' + x + '》').join('');
const WSHORT = { '爱在别乡的季节': '《爱在别乡》', '不脱袜的人': '《不脱袜》', '新龙门客栈': '《新龙门》', '家有喜事、济公': '《家有喜事》', '王晶的喜剧': '王晶', '宋家皇朝': '《宋家》', '玫瑰的故事': '《玫瑰》', '警察故事': '《警察》', '黄色故事': '《黄色》', '旺角卡门': '《旺角》', '东方三侠': '《三侠》', '东邪西毒': '《东邪》', '阿飞正传': '《阿飞》', '双城故事': '《双城》', '滚滚红尘': '《滚滚》', '人在纽约': '《纽约》', '客途秋恨': '《客途》' };
const WSP = []; SECS.forEach(s => { if (!s.work) return; const l = WSP[WSP.length - 1]; if (l && l.work === s.work && l.e === s.s) l.e = s.e; else WSP.push({ work: s.work, s: s.s, e: s.e, ph: s.ph }); }); WSP.forEach(w => { w.min = (w.e - w.s) / 60; w.name = wname(w.work); });
const W5 = D[5][0].works;
const WK = id => W5.find(w => w.id === id);
const MODP = { E: 'women', F: 'coda', G: 'industry', H: 'women', I: 'acting', J: 'early', K: 'prime', L: 'genre', M: 'intl', N: 'late', O: 'coda' };
const PLATE = { E: '1:25:10', F: '7:00:30', G: '0:03:25', H: '1:02:46', I: '1:31:15', J: '2:06:00', K: '2:49:27', L: '4:20:16', M: '4:41:47', N: '5:41:55', O: '6:31:21' };

const sub = (title, note) => `<div style="display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 16px; padding-bottom: 9px; border-bottom: 1px solid ${Z.ink};"><h3 style="${S.h3}">${title}</h3>${note ? `<span style="font-size: 12.5px; color: ${Z.cap};">${note}</span>` : ''}</div>`;
const block = (title, note, inner, mt = 56) => `<div style="margin-top: ${mt}px;">${sub(title, note)}${inner}</div>`;
const quote = (text, whoS, size = 20) => `<figure style="margin: 0; padding: 14px 0 0; border-top: 1px solid ${Z.ink};"><blockquote style="margin: 0; font-family: ${F.serif}; font-size: ${size}px; font-weight: 600; line-height: 1.6; color: ${Z.fg}; text-wrap: pretty;">“${esc(text)}”</blockquote><figcaption style="margin-top: 7px; font-size: 12.5px; color: ${Z.cap};">—— ${esc(whoS)}</figcaption></figure>`;
const chip = t => `<span style="${S.chip}">${esc(t)}</span>`;
const cap = t => `<p style="${S.cap}">${t}</p>`;
const grid = (min, inner, gap = '14px', mt = 18) => `<div style="margin-top: ${mt}px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, ${min}px), 1fr)); gap: ${gap}; align-items: stretch;">${inner}</div>`;
const card = (inner, ex = '') => `<div style="${S.card} padding: 14px 16px 16px; ${ex}">${inner}</div>`;
const tc = (title, text, ex = '', tag = '') => card(`${tag ? `<div style="margin-bottom: 6px;">${chip(tag)}</div>` : ''}<div style="${S.ttl}">${title}</div>${text ? `<div style="margin-top: 6px; ${S.sm}">${text}</div>` : ''}`, ex);
const arrowR = (c = Z.ink) => `<span aria-hidden="true" style="flex: none; align-self: center; width: 20px; height: 12px; background: ${c}; clip-path: polygon(0 42%, 64% 42%, 64% 0, 100% 50%, 64% 100%, 64% 58%, 0 58%);"></span>`;
const arrowD = (c = Z.ink) => `<span aria-hidden="true" style="display: block; margin: 0 auto; width: 12px; height: 18px; background: ${c}; clip-path: polygon(42% 0, 58% 0, 58% 64%, 100% 64%, 50% 100%, 0 64%, 42% 64%);"></span>`;
const pair = (a, b, la = '一位主持人', lb = '另一位主持人', mid = '') => `<div style="margin-top: 16px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 12px;">${card(`<div style="${S.lab}">${esc(la)}</div><div style="margin-top: 6px; ${S.body}">${esc(a)}</div>`)}${card(`<div style="${S.lab}">${esc(lb)}</div><div style="margin-top: 6px; ${S.body}">${esc(b)}</div>`)}</div>${mid ? `<div style="margin-top: 8px; font-size: 13px; color: ${Z.cap};">${mid}</div>` : ''}`;
const chain = (items, horiz = true, maxw = 760) => horiz ? `<div style="margin-top: 18px; display: flex; flex-wrap: wrap; align-items: stretch; gap: 8px;">${items.map((t, i) => `${i ? arrowR() : ''}<div style="flex: 1 1 150px; min-width: 0; ${S.card} padding: 10px 12px; ${S.sm}">${t}</div>`).join('')}</div>` : `<div style="margin-top: 16px; display: grid; gap: 6px; max-width: ${maxw}px;">${items.map((t, i) => `${i ? arrowD(Z.faint) : ''}<div style="${S.card} padding: 10px 14px; ${S.sm}">${t}</div>`).join('')}</div>`;
const bullets = items => `<ul style="margin: 12px 0 0; padding: 0; list-style: none; display: grid; gap: 7px;">${items.map(t => `<li style="display: grid; grid-template-columns: 14px minmax(0, 1fr); gap: 8px; ${S.sm}"><span style="margin-top: 8px; width: 6px; height: 6px; background: ${Z.ink};"></span><span>${t}</span></li>`).join('')}</ul>`;
const table = (cols, rows, o = {}) => `<div style="margin-top: ${o.mt ?? 16}px; overflow-x: auto;"><div style="min-width: ${o.min || 0}px; ${S.card} display: grid; grid-template-columns: ${o.tpl || `repeat(${cols.length}, minmax(0, 1fr))`};">${cols.map((c, i) => `<div style="padding: 8px 14px; background: ${Z.wall}; border-bottom: 1px solid ${Z.ink}; ${i ? `border-left: 1px solid ${Z.rule2};` : ''} font-size: 12.5px; letter-spacing: 0.06em; color: ${Z.fg2};">${c}</div>`).join('')}${rows.map((r, ri) => r.map((v, i) => `<div style="padding: 10px 14px; ${ri < rows.length - 1 ? `border-bottom: 1px solid ${Z.rule};` : ''} ${i ? `border-left: 1px solid ${Z.rule};` : ''} ${i === 0 && o.firstBold !== false ? `font-family: ${F.serif}; font-weight: 700; font-size: 14.5px; line-height: 1.5; color: ${Z.fg};` : S.sm} ${o.cell ? o.cell(ri, i) : ''}">${v || `<span style="color: ${Z.faint};">—</span>`}</div>`).join('')).join('')}</div></div>`;
const numMark = n => `<span style="flex: none; display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px; border-radius: 50%; background: ${C.ink}; color: #fff; font-family: ${F.mono}; font-size: 10.5px; font-weight: 600; line-height: 1;">${n}</span>`;
const toP = (t = '分歧见 P') => `<a href="#debate" style="display: inline-flex; align-items: center; gap: 6px; padding: 0 8px; border: 1px solid ${Z.rule2}; font-size: 12px; line-height: 1.8; color: ${Z.fg2}; text-decoration: none; white-space: nowrap;"><span style="font-family: ${F.type}; font-weight: 700;">P</span>${esc(t)}</a>`;

function slate(L, p) {
  return `<span style="flex: none; position: relative; width: 52px; height: 62px; box-sizing: border-box; border: 1.5px solid ${Z.ink}; background: ${Z.card}; color: ${Z.fg}; display: flex; align-items: center; justify-content: center; font-family: ${F.type}; font-size: 29px; font-weight: 700; padding-bottom: 11px;">${L}<span style="position: absolute; left: 0; right: 0; bottom: 0; height: 11px; border-top: 1.5px solid ${Z.ink}; background: repeating-linear-gradient(135deg, ${Z.ink} 0 5px, ${Z.card} 5px 10px);"></span></span>`;
}
function plate(full) {
  const t = hms(full), c = clipOf(t), ct = t - c.s;
  return `<span title="从这里开始听" style="flex: none; display: inline-flex; flex-direction: column; align-items: center; padding: 5px 12px 6px; margin-bottom: 4px; background: ${Z.card}; border: 1.5px solid ${Z.ink}; color: ${Z.fg}; line-height: 1.1;"><span style="font-family: ${F.serif}; font-size: 14.5px; font-weight: 700;">第 ${c.n} 段 ${Math.floor(ct / 60)}:${String(ct % 60).padStart(2, '0')}</span><span style="margin-top: 3px; font-family: ${F.mono}; font-size: 11px; color: ${Z.cap};">全片 ${full}</span></span>`;
}
function phaseBar(p, h = 6) {
  if (p) return `<div style="height: ${h}px; ${phBg(p)} ${p === 'coda' ? `box-shadow: inset 0 0 0 1px ${C.ink};` : ''} ${p === 'intl' ? `box-shadow: inset 0 0 0 1px ${C.silver}; border-bottom: 2px solid ${C.silver};` : ''}"></div>`;
  return `<div style="display: flex; height: ${h}px; gap: 2px;">${PHR.map(r => `<span title="${esc(PHN[r.ph])}" style="flex: ${f1(r.min)} 1 0; ${phBg(r.ph)} ${phEdge(r.ph)}"></span>`).join('')}</div>`;
}
function head(L, title, q, p = MODP[L]) {
  return `<div style="display: flex; flex-wrap: wrap; align-items: flex-end; gap: 14px 20px; padding-bottom: 14px;">${slate(L, p)}<div style="flex: 1 1 380px; min-width: 0;"><div style="font-size: 12.5px; letter-spacing: 0.12em; color: ${Z.cap};">模块 <span style="font-family: ${F.type}; font-weight: 700;">${L}</span>${p ? '　阶段：' + esc(PHN[p]) : ''}</div><h2 style="${S.h2} margin-top: 6px;">${title}</h2></div>${PLATE[L] ? plate(PLATE[L]) : ''}</div>${phaseBar(p)}<div style="margin-top: 12px; font-size: 15px; line-height: 1.6; color: ${Z.fg2};">${q}</div>`;
}
const secOpen = (id, L, title, dark = false) => `<section id="${id}" data-screen-label="${L} ${title}" style="padding: clamp(48px, 6vw, 80px) ${PAD} clamp(60px, 7vw, 96px); ${dark ? `background: ${C.latex}; color: ${DZ.fg};` : ''}">`;
function chapter(code, title, sub2, phs, dash, row = '') {
  return `<div style="padding: clamp(60px, 8vw, 104px) ${PAD} clamp(44px, 5vw, 64px); background: ${C.ink}; color: ${C.paper};">
<div style="font-family: ${F.type}; font-size: 12.5px; letter-spacing: 0.16em; color: #B9B4AA;">${code}</div>
<div style="margin-top: 14px; font-family: ${F.serif}; font-size: clamp(36px, 5vw, 68px); font-weight: 900; letter-spacing: 0.08em; line-height: 1.15;">${title}</div>
<div style="margin-top: 14px; max-width: 900px; font-size: 15px; line-height: 1.8; color: #DDD8CE; text-wrap: pretty;">${sub2}</div>
<div style="margin-top: 30px; border-top: 2px ${dash ? 'dashed' : 'solid'} ${C.paper};"></div>
<div style="margin-top: 16px; display: flex; flex-wrap: wrap; gap: 10px 26px;">${phs.map(p => `<span style="display: inline-flex; align-items: center; gap: 8px; font-size: 13.5px;"><span style="display: inline-block; width: 22px; height: 12px; ${phBg(p)} box-shadow: 0 0 0 1px ${C.paper};"></span>${esc(PHN[p])}<span style="font-family: ${F.mono}; font-size: 12px; color: #B9B4AA;">${f1(PMIN[p])}′</span></span>`).join('')}</div>${row}
</div>`;
}

// ===== A cover
function cover() {
  const toc = [['map', 'B', '节目地图'], ['relay', 'C', '话题接力'], ['career', 'D', '生涯弧线'], ['exception', 'E', '特例'], ['industry', 'G', '我城与明星制'], ['women', 'H', '只有一个张曼玉'], ['acting', 'I', '两种表演'], ['early', 'J', '花瓶与开窍'], ['prime', 'K', '演技派之路'], ['genre', 'L', '喜剧没法练'], ['irma', 'M', '一个异物'], ['comrades', 'N', '最感人的离散片'], ['retire', 'O', '巅峰息影'], ['end', 'F', '明星的终结'], ['debate', 'P', '他们在哪里看法不同'], ['mentions', 'Q', '谁被提得最多']];
  const meta = [['节目', '《电影巨辩》'], ['专辑', '付费专辑《为了华语电影》'], ['本集', '第 9 集《张曼玉》'], ['主持', '老马（magasa）、阿吴（LOOK）'], ['录制', '2025 年夏'], ['时长', mono('7:22:21')], ['分段', '平台上切成 15 段（序号 91–105），内容是一期'], ['特别', '专辑里唯一一期谈演员、谈明星']];
  const band = `<div style="display: flex; height: 10px; border-bottom: 1px solid ${C.ink};">${PHR.map(r => `<span title="${esc(PHN[r.ph] + ' ' + f1(r.min) + ' 分钟')}" style="flex: ${f1(r.min)} 1 0; ${phBg(r.ph)}"></span>`).join('')}</div>`;
  const archive = `<div style="flex: 0 1 380px; min-width: 0; ${S.card}"><div style="position: relative; aspect-ratio: 1 / 1; border-bottom: 1.5px solid ${C.ink}; background: ${C.wall}; color: ${C.ink}; overflow: hidden;">${slot('p-maggie', '张曼玉')}</div><div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; border-bottom: 1.5px solid ${C.ink}; font-size: 12px; letter-spacing: 0.2em;"><span>节目档案</span><span style="font-family: ${F.type}; font-size: 14px; letter-spacing: 0.04em;">No. 09</span></div>${meta.map(([k, v]) => `<div style="display: grid; grid-template-columns: 50px minmax(0, 1fr); gap: 12px; padding: 8px 20px; border-bottom: 1px solid ${C.rule}; font-size: 14px; line-height: 1.65;"><span style="color: ${C.cap};">${k}</span><span>${v}</span></div>`).join('')}<div style="padding: 12px 20px 16px;"><div style="display: flex; gap: 2px;">${CL.map(c => `<span title="${esc('第 ' + c.n + ' 段 · 平台序号 ' + c.no + ' · ' + c.min + ' 分钟')}" style="flex: ${c.min} 1 0; min-width: 0; height: 22px; box-sizing: border-box; border: 1px solid ${C.ink}; background: ${C.paper}; display: flex; align-items: center; justify-content: center; font-family: ${F.type}; font-size: 10.5px; overflow: hidden;">${c.n}</span>`).join('')}</div><div style="margin-top: 7px; font-size: 12px; color: ${C.cap};">15 段，宽度按时长</div></div></div>`;
  const years = [['1983', '港姐', ['early']], ['1988', '《旺角卡门》', ['early']], ['1992', '《阮玲玉》', ['prime']], ['1996', '《迷离劫》《甜蜜蜜》', ['intl', 'late']], ['2004', '《清洁》', ['late']]];
  const glass = `<div style="margin-top: clamp(48px, 6vw, 84px); display: flex; flex-direction: column; align-items: center;">
<div style="position: relative; width: min(100%, 940px); box-sizing: border-box; border: 2px solid ${C.ink}; background: ${C.card}; padding: clamp(14px, 2vw, 26px);">${bulbs('clamp(13px, 1.8vw, 24px)', C.card, C.ink)}<div style="background: ${C.glass}; box-shadow: inset 0 0 0 1px ${C.rule2}; padding: clamp(18px, 3.4vw, 48px) clamp(18px, 4vw, 60px);"><div style="display: grid; grid-template-columns: repeat(9, minmax(0, 1fr)); gap: clamp(4px, 0.8vw, 10px); align-items: end;">${[['f-w05', '旺角卡门'], ['f-w11', '阿飞正传'], ['f-w14', '新龙门客栈'], ['f-w16', '青蛇'], ['f-w18', '东邪西毒'], ['f-w19', '迷离劫'], ['f-w20', '甜蜜蜜'], ['f-w23', '花样年华'], ['f-w25', '清洁']].map(([k, t]) => poster(k, t, '100%')).join('')}</div></div></div>
<div style="width: min(100%, 1080px); height: 14px; margin-top: clamp(16px, 2vw, 26px); background: ${C.ink};"></div>
<div style="margin-top: 14px; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 6px 12px; font-size: 13.5px;">${years.map(([y, t, ps], i) => `${i ? `<span style="color: ${C.faint};">——</span>` : ''}<span style="display: inline-flex; align-items: center; gap: 6px;">${ps.map(p => sw(p)).join('')}${mono(y)} ${t}</span>`).join('')}</div>
<p style="${S.cap} text-align: center;">一面化妆镜，一圈十盏小灯。镜子里是她的九部片，从 1988 年的《旺角卡门》到 2004 年的《清洁》。</p></div>`;
  const top = `<div style="padding: clamp(20px, 3vw, 34px) ${PAD} clamp(44px, 5vw, 64px); border-bottom: 1px solid ${C.ink};">
${seriesNav({ color: C.cap })}
<div style="margin-top: clamp(36px, 5vw, 64px); display: flex; flex-wrap: wrap; gap: 44px 56px; align-items: flex-start;">
<div style="flex: 1 1 600px; min-width: 0;">
<div style="display: flex; align-items: center; gap: 14px; font-family: ${F.serif}; font-size: 17px; font-weight: 600; letter-spacing: 0.24em;">为了华语电影<span style="font-family: ${F.type}; font-size: 16px; font-weight: 700; letter-spacing: 0.04em; border: 1.5px solid ${C.ink}; padding: 1px 8px 0;">09</span></div>
<h1 style="margin: 20px 0 0; font-family: ${F.serif}; font-weight: 900; font-size: clamp(64px, 10vw, 148px); line-height: 1.02; letter-spacing: 0.08em;">张曼玉</h1>
<div style="margin-top: 20px; font-size: 16.5px; line-height: 1.7; color: ${C.muted};">香港娱乐工业的特例｜电影巨辩《为了华语电影》第 9 集 · 7 小时 22 分 · 老马 × 阿吴</div>
<div style="margin-top: 42px; max-width: 820px; font-family: ${F.serif}; font-weight: 700; font-size: clamp(25px, 3vw, 38px); line-height: 1.55; text-wrap: pretty;">“她的演出是指向角色，而不是自己。”</div>
<div style="margin-top: 12px; font-size: 14.5px; color: ${C.cap};">节目认为，这在香港是一个特例。</div>
</div>
${archive}
</div>
${glass}
</div>`;
  const legPh = PHK.map(p => `<div style="display: grid; grid-template-columns: 30px minmax(0, 1fr); gap: 10px; align-items: center; padding: 6px 0; border-bottom: 1px solid ${C.rule};">${sw(p, 30, 16)}<span style="font-size: 13.5px;"><b style="font-weight: 700;">${PHN[p]}</b><span style="color: ${C.cap};">　${PHD[p]}</span></span></div>`).join('');
  const legK = Object.keys(KN).map(k => `<span style="display: inline-flex; align-items: center; gap: 7px;">${shape(k, 11)}${KN[k]}</span>`).join('');
  const notes = ['《迷离劫》里有一个演她自己的角色，也叫“张曼玉”。讲这部片时，“片中的张曼玉”和真实的张曼玉要分开。', '第 2 段讲经理人时说的“陈太”是陈淑芬，“向太”是陈岚；“Maggie”就是张曼玉。', '《花样年华》专辑第 6 集整期讨论过，这一期刻意跳过。'];
  const paper = `<div style="padding: clamp(40px, 5vw, 64px) ${PAD} clamp(48px, 5vw, 68px);">
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr)); gap: 32px 64px; align-items: start;">
<p style="margin: 0; font-size: 17px; line-height: 1.95; color: ${C.ink2}; text-wrap: pretty;">节目说，香港的电影体系要求大牌演员有一个专属的形象、一个自己的 IP，靠“一出场就瞬间捕获观众的杀手锏形象”扛票房；张曼玉恰恰相反。她出身港姐，做过多年花瓶，在《黄色故事》里第一次用心演戏，在《旺角卡门》里开窍，此后香港最好的艺术片资源“都聚焦在她一个人身上”。她最擅长两类戏：移民离散和戏中戏。2004 年凭《清洁》拿到戛纳影后，40 岁息影。节目把这放回华语电影的结构性困境，对照杨紫琼一路往外走的路线，最后从她谈到明星本身：电影明星是“二十世纪的产物”，正在让位给 IP、网红和虚拟偶像。</p>
<div style="display: grid; gap: 24px;">${quote('那必须是张曼玉，没有第二个选择。', '阿吴，谈为什么这期选她', 21)}${quote('张曼玉不是香港电影的代表，张曼玉是特例。', '阿萨亚斯，节目转述', 21)}</div>
</div>
<div style="margin-top: 52px;">${sub('先认几个词', '节目里反复出现')}<div style="margin-top: 4px; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 380px), 1fr)); column-gap: 32px;">${TERMS.map(([k, v]) => `<div style="display: grid; grid-template-columns: 118px minmax(0, 1fr); gap: 12px; padding: 11px 0; border-bottom: 1px solid ${C.rule};"><span style="font-family: ${F.serif}; font-size: 15px; font-weight: 700; line-height: 1.5;">${esc(k)}</span><span style="font-size: 13.5px; line-height: 1.7; color: ${C.ink2}; text-wrap: pretty;">${esc(v)}</span></div>`).join('')}</div></div>
<div style="margin-top: 40px; max-width: 1000px;">${sub('读之前', '几个容易误会的地方')}${bullets(notes.map(esc))}</div>
<div style="margin-top: 44px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr)); gap: 28px 56px;">
<div>${sub('颜色：节目的九个阶段', '全页一致；从城市的颜色走到一块空白的银幕')}<div style="margin-top: 4px;">${legPh}</div></div>
<div>${sub('其他记号', '')}<div style="margin-top: 12px; display: grid; gap: 14px; font-size: 13.5px;"><div style="display: flex; flex-wrap: wrap; gap: 8px 18px; align-items: center;"><span style="color: ${C.cap};">板块类型</span>${legK}</div><div style="display: flex; align-items: center; gap: 10px;">${sw('prime', 30, 16, true)}<span>胶片颗粒：表演分析板块，节目停在一个镜头、一个表情上细讲</span></div><div style="display: flex; align-items: center; gap: 10px;">${tier(4)}<span>五格评价：填满几格就是第几档，档位为整理者根据节目评语归档</span></div><div style="display: flex; align-items: center; gap: 10px;">${mirrorIcon()}<span>化妆镜：全页的强调记号，每个模块最多一处</span></div><div style="display: flex; align-items: center; gap: 10px;"><span style="flex: none; width: 64px; height: 16px; background: ${holes(C.paper)} 0 2px / 100% 4px no-repeat, ${holes(C.paper)} 0 10px / 100% 4px no-repeat, ${C.ink};"></span><span>胶片齿孔：模块之间的分隔</span></div><div style="color: ${C.cap}; font-size: 12.5px; line-height: 1.7;">阶段、类型和板块名为整理者所加。海报和人物照片取自维基百科；空着的框可以把图片拖进来。</div></div></div>
</div>
<nav style="margin-top: 40px; display: flex; flex-wrap: wrap; gap: 8px;">${toc.map(([id, l, t]) => `<a href="#${id}" style="display: inline-flex; align-items: baseline; gap: 8px; padding: 6px 12px 5px; border: 1px solid ${C.rule2}; background: ${C.card}; color: ${C.ink}; font-size: 13.5px; text-decoration: none;"><span style="font-family: ${F.type}; font-weight: 700; font-size: 14px;">${l}</span>${t}</a>`).join('')}</nav>
</div>`;
  return `${band}<header id="cover" data-screen-label="A 封面">${top}${paper}</header>`;
}

// ===== B + C
const TW = 1152;
const X = t => t / T * TW;
const G2 = 'display: grid; grid-template-columns: 128px 1152px; column-gap: 16px;';
const BTAGS = [], BBLK = [], MBLK = [];
const GROUPS = [{ k: 'industry', name: '产业与经理人' }, { k: 'star', name: '明星与名气' }, { k: 'gender', name: '女性与性别' }, { k: 'acting', name: '表演与演技' }, { k: 'form', name: '视听与调度' }, { k: 'diaspora', name: '移民与身份' }, { k: 'meta', name: '扮演与元电影' }, { k: 'intl', name: '法国与国际' }];
const BINS = D[4][0].map((r, i, a) => ({ s: hm(r.bin_start), e: i === a.length - 1 ? T : hm(r.bin_end), a: r.bin_start, b: r.bin_end, v: Object.fromEntries(GROUPS.map(g => [g.k, +r[g.k + '_per1k']])) }));
const PEAKS = { industry: [['0:10', 1], ['0:20', 0]], star: [['7:10', 1], ['7:00', 0]], gender: [['1:00', 1], ['1:10', 0]], acting: [['1:40', 1], ['1:30', 0]], form: [['2:40', 1], ['3:40', 0]], diaspora: [['3:30', 1], ['3:10', 0]], meta: [['5:30', 1], ['4:00', 0]], intl: [['5:20', 1], ['4:50', 0]] };
const CNOTE = {
  industry: [['0:10', 'L', '26.16 明星制和邵氏的片酬账；右边一格 25.30 是经纪人与经理人']],
  star: [['7:10', 'R', '19.71 网红与明星的终结；左边一格 17.93']],
  gender: [['1:00', 'L', '12.21 1967 年从女星到男星；右边一格 12.12 是 80 年代女演员的处境']],
  acting: [['1:40', 'L', '12.84 超本色表演、无痕表演、情绪记忆；左边一格 12.19']],
  form: [['2:40', 'R', '7.36 《旺角卡门》的调度与剪辑'], ['3:40', 'L', '6.89 《阿飞正传》']],
  diaspora: [['3:30', 'L', '9.34 《爱在别乡的季节》'], ['3:10', 'R', '6.11 《客途秋恨》']],
  meta: [['5:30', 'L', '10.20 《迷离劫》的三层扮演和样片'], ['4:00', 'R', '4.93 《阮玲玉》']],
  intl: [['5:20', 'L', '10.91 异物与免疫反应'], ['4:50', 'R', '8.06 威尼斯后台的一面']]
};
const HMAX = 26.16;
const heatA = v => v <= 0 ? 0 : 0.06 + 0.94 * Math.pow(Math.min(v, HMAX) / HMAX, 0.7);
const heatStops = (g, dir, fadeLast) => `linear-gradient(${dir}, ${BINS.map((b, i) => `${rgba(C.ink, heatA(b.v[g.k]) * (fadeLast && i === BINS.length - 1 ? 0.45 : 1))} ${f1(b.s / T * 100)}% ${f1(b.e / T * 100)}%`).join(', ')})`;
const T1 = hms('2:06:00'), T2 = hms('7:00:30');
function axisRow() {
  let a = '';
  for (let m = 0; m <= 420; m += 30) a += `<div style="position: absolute; left: ${f1(X(m * 60))}px; top: 0; width: 1px; height: 6px; background: ${C.rule2};"></div><div style="position: absolute; left: ${f1(X(m * 60))}px; top: 9px; ${m ? 'transform: translateX(-50%);' : ''} font-family: ${F.mono}; font-size: 11.5px; color: ${C.cap};">${fmtHM(m)}</div>`;
  a += `<div style="position: absolute; right: 0; top: 0; width: 1px; height: 6px; background: ${C.rule2};"></div><div style="position: absolute; right: 0; top: 24px; font-family: ${F.mono}; font-size: 11.5px; color: ${C.cap};">7:22:21</div>`;
  return `<div style="position: relative; height: 42px; border-top: 1px solid ${C.rule2};">${a}</div>`;
}
const lab = (t, sb) => `<div style="display: flex; flex-direction: column; justify-content: center; gap: 4px;"><span style="font-size: 12.5px; letter-spacing: 0.1em; color: ${C.ink2};">${t}</span>${sb ? `<span style="font-size: 11px; line-height: 1.55; color: ${C.cap};">${sb}</span>` : ''}</div>`;
const cLead = `<div style="${S.lead}">第一个小时讲机器，第二个小时讲女星和表演，接下来三个小时讲她的片子，第五、六个小时去了巴黎和纽约，最后半小时讲明星本身。</div>`;
function underline() {
  const seg = (a, b, st, txt, n) => `<div style="position: absolute; left: ${f1(X(a))}px; width: ${f1(X(b) - X(a) - 3)}px; top: 0; border-top: 2px ${st} ${C.ink}; padding-top: 6px; white-space: nowrap; overflow: hidden;"><div style="display: flex; align-items: center; gap: 6px; font-family: ${F.serif}; font-size: 13px; font-weight: 700;">${n ? numMark(n) : ''}${txt}</div></div>`;
  return `<div style="position: relative; height: 34px;">${seg(0, T1, 'dashed', '她身后的香港 · 到 2:06 才开始讲她的身世', 1)}${seg(T1, T2, 'solid', '她自己的路 →', 0)}${seg(T2, T, 'dashed', '明星的终结', 0)}</div>`;
}
function bDesktop() {
  const lanes = [], pos = [];
  const fits = (k, l, r) => !(lanes[k] || []).some(([p, q]) => l < q + 4 && r + 4 > p);
  L1.forEach(s => { const x = X(s.t), w = Math.ceil(estW(s.label, 11.5) + 18); const opts = [[x, x + w, true], [x - w, x, false]].filter(([l, r]) => l >= 0 && r <= TW); let k = 0, pick = null; while (!pick) { for (const o of opts) if (fits(k, o[0], o[1])) { pick = o; break; } if (!pick) k++; if (k > 60) { pick = opts[0] || [x, x + w, true]; } } (lanes[k] = lanes[k] || []).push([pick[0], pick[1]]); pos.push({ s, x, k, la: pick[2] }); });
  const LH = 21, BASE = 16, H = lanes.length * LH + BASE;
  let lead = '';
  pos.forEach(p => { const b = BASE + p.k * LH, sec = SEC[p.s.sec]; lead += `M${f1(p.x)} ${H - b}V${H}`; BTAGS.push([p.s.label, p.s.time, p.s.clip, p.s.ct, +f1(p.la ? p.x : TW - p.x), p.la ? 1 : 0, b, PHT[sec.ph]]); });
  const tags = `<sc-for list="{{ bTags }}" as="t" hint-placeholder-count="1"><div title="{{ t.title }}" style="position: absolute; left: {{ t.left }}; right: {{ t.right }}; bottom: {{ t.bottom }}; border-left: {{ t.bl }}; border-right: {{ t.br }}; height: 18px; padding: 0 5px; border-top: 1px solid ${C.ink}; border-bottom: 1px solid ${C.ink}; box-sizing: border-box; background: ${C.card}; white-space: nowrap; font-size: 11.5px; line-height: 16px;">{{ t.label }}</div></sc-for>`;
  const tk = {}; L2.forEach(s => { const ph = SEC[s.sec].ph; tk[ph] = (tk[ph] || '') + `M${f1(X(s.t))} ${H - 12}V${H}`; });
  const ticks = Object.entries(tk).map(([ph, d]) => `<path d="${d}" stroke="${PHT[ph]}" strokeWidth="1.6" fill="none"></path>`).join('');
  const svg = `<svg width="${TW}" height="${H}" style="position: absolute; left: 0; top: 0; pointer-events: none;"><path d="${lead}" stroke="${C.ink}" strokeOpacity="0.3" strokeWidth="1" fill="none"></path>${ticks}</svg>`;
  let works = '';
  WSP.forEach(w => { const l = X(w.s), wd = X(w.e) - l, big = w.work === '迷离劫'; const full = `${w.name} ${f1(w.min)}′`, pad = big ? 22 : 4, sn = WSHORT[w.work] || w.name; const txt = wd > estW(full, 11.5) + pad + 6 ? full : wd > estW(w.name, 11.5) + pad ? w.name : wd > estW(sn, 11.5) + pad ? sn : ''; works += `<div title="${esc(w.name + ' · ' + f1(w.min) + ' 分钟')}" style="position: absolute; left: ${f1(l)}px; width: ${f1(wd - 1)}px; bottom: 0; height: 30px; display: flex; flex-direction: column; justify-content: flex-end; gap: 3px;"><div style="display: flex; align-items: center; gap: 4px; white-space: nowrap; overflow: hidden; font-size: 11.5px; ${big ? 'font-weight: 700;' : `color: ${C.ink2};`}">${big ? numMark(3) : ''}${esc(txt)}</div><div style="height: ${big ? 5 : 3}px; background: ${PHT[w.ph]}; ${w.ph === 'intl' ? `border-bottom: 1.5px solid ${C.silver};` : ''}"></div></div>`; });
  let clips = '';
  CL.forEach(c => { const l = X(c.s), w = X(c.e) - l, [t1] = c.title.split('｜'); clips += `<div title="${esc('第 ' + c.n + ' 段 · 平台序号 ' + c.no + ' · ' + c.start + '–' + c.end + ' · ' + c.title)}" style="position: absolute; top: 0; bottom: 0; left: ${f1(l)}px; width: ${f1(w - 2)}px; box-sizing: border-box; border: 1px solid ${C.ink}; background: ${C.card}; padding: 5px 5px; overflow: hidden;"><div style="display: flex; align-items: baseline; gap: 5px; white-space: nowrap;"><span style="font-family: ${F.type}; font-size: 15px; font-weight: 700;">${c.n}</span><span style="font-size: 10px; color: ${C.cap};">${c.no}</span></div><div style="font-family: ${F.mono}; font-size: 10.5px; color: ${C.cap};">${c.min}′</div><div style="margin-top: 2px; font-size: 11px; line-height: 1.4; color: ${C.ink2};">${esc(t1)}</div></div>`; });
  const shp = { film: '', acting: '', industry: '', life: '', idea: '' };
  SECS.forEach(s => { const l = X(s.s), w = X(s.e) - l, cx = l + w / 2, r = w >= 7 ? 3.3 : 2.3, cy = 4.5; const q = n => f1(n);
    shp[s.kind] += s.kind === 'film' ? `M${q(cx - r)} ${q(cy - r)}h${q(2 * r)}v${q(2 * r)}h${q(-2 * r)}Z` : s.kind === 'acting' ? `M${q(cx - r)} ${cy}a${r} ${r} 0 1 0 ${q(2 * r)} 0a${r} ${r} 0 1 0 ${q(-2 * r)} 0Z` : s.kind === 'industry' ? `M${q(cx)} ${q(cy - r * 1.1)}L${q(cx + r * 1.15)} ${q(cy + r)}L${q(cx - r * 1.15)} ${q(cy + r)}Z` : s.kind === 'life' ? `M${q(cx)} ${q(cy - r * 1.3)}L${q(cx + r * 1.1)} ${cy}L${q(cx)} ${q(cy + r * 1.3)}L${q(cx - r * 1.1)} ${cy}Z` : `M${q(cx - r * 1.15)} ${cy}L${q(cx - r * 0.58)} ${q(cy - r)}L${q(cx + r * 0.58)} ${q(cy - r)}L${q(cx + r * 1.15)} ${cy}L${q(cx + r * 0.58)} ${q(cy + r)}L${q(cx - r * 0.58)} ${q(cy + r)}Z`;
    BBLK.push([`${s.id} · ${s.name} · ${s.min}′ · ${PHN[s.ph]} · ${KN[s.kind]}`, +f1(l), +f1(Math.max(1.5, w - 1)), s.ph, s.kind === 'acting' ? 1 : 0]); });
  const blocks = `<svg width="${TW}" height="10" style="position: absolute; left: 0; top: 0;">${Object.values(shp).map(d => `<path d="${d}" fill="${C.ink}"></path>`).join('')}</svg><sc-for list="{{ bBlocks }}" as="k" hint-placeholder-count="1"><div title="{{ k.title }}" style="position: absolute; top: 12px; bottom: 0; left: {{ k.left }}; width: {{ k.width }}; background: {{ k.bg }}; box-shadow: {{ k.sh }};"></div></sc-for>`;
  let phases = '';
  PHR.forEach(r => { const l = X(r.s), w = X(r.e) - l, nm = PHS[r.ph], pr = r.ph === 'prime'; phases += `<div style="position: absolute; top: 0; left: ${f1(l)}px; width: ${f1(w - 2)}px; border-top: ${pr ? 5 : 3}px solid ${PHT[r.ph]}; padding-top: 4px; overflow: hidden; white-space: nowrap;"><div style="display: flex; align-items: center; gap: 4px; font-family: ${F.serif}; font-size: 12.5px; font-weight: 700;">${pr ? numMark(2) : ''}${esc(nm)}</div><div style="font-family: ${F.mono}; font-size: 11px; color: ${C.cap};">${f1(r.min)}′${w > 100 ? ' · ' + f1(r.min / (T / 60) * 100) + '%' : ''}</div></div>`; });
  const legend = PHK.map(p => `<span style="display: inline-flex; align-items: center; gap: 6px;">${sw(p, 14, 10)}${PHN[p]}</span>`).join('') + Object.keys(KN).map(k => `<span style="display: inline-flex; align-items: center; gap: 6px;">${shape(k, 9)}${KN[k]}</span>`).join('') + `<span style="display: inline-flex; align-items: center; gap: 6px;">${sw('prime', 18, 10, true)}表演分析加胶片颗粒</span>`;
  let crows = '';
  GROUPS.forEach(g => {
    const peak = Math.max(...BINS.map(b => b.v[g.k]));
    let marks = '', notes = '';
    PEAKS[g.k].forEach(([st, kind]) => { const b = BINS.find(x => x.a === st), l = X(b.s), w = X(b.e) - l, ph = phAt((b.s + b.e) / 2); marks += `<div style="position: absolute; top: -2px; bottom: -2px; left: ${f1(l)}px; width: ${f1(w)}px; box-sizing: border-box; border: ${kind ? `2px solid ${C.ink}` : `1.5px dashed ${C.ink}`};"></div>${kind ? `<span title="${esc('峰值所在阶段：' + PHN[ph])}" style="position: absolute; left: ${f1(l + w / 2 - 5)}px; top: 50%; margin-top: -5px; width: 10px; height: 10px; border-radius: 50%; background: ${PH[ph]}; box-shadow: 0 0 0 1.5px #fff, 0 0 0 2.5px ${C.ink};"></span>` : ''}`; });
    CNOTE[g.k].forEach(([st, side, txt]) => { const b = BINS.find(x => x.a === st), sp = txt.indexOf(' '); notes += `<div style="position: absolute; ${side === 'R' ? `right: ${f1(TW - X(b.e))}px;` : `left: ${f1(X(b.s))}px;`} bottom: 3px; white-space: nowrap; font-size: 12px;"><b style="font-family: ${F.mono}; font-weight: 600;">${txt.slice(0, sp)}</b><span style="font-family: ${F.mono}; font-size: 11px; color: ${C.cap}; margin: 0 6px;">${b.a}–${b.b}</span>${esc(txt.slice(sp + 1))}</div>`; });
    crows += `<div style="${G2}"><div style="display: flex; flex-direction: column; justify-content: flex-end; padding-bottom: 8px;"><span style="font-family: ${F.serif}; font-size: 14px; font-weight: 700;">${g.name}</span><span style="font-size: 11px; color: ${C.cap};">峰值 ${peak.toFixed(2)}</span></div><div style="position: relative; height: 60px;"><div style="position: absolute; left: 0; right: 0; top: 0; height: 24px;">${notes}</div><div style="position: absolute; left: 0; right: 0; top: 24px; bottom: 4px; background: ${heatStops(g, '90deg', true)}, rgba(28,27,26,0.03);">${marks}</div></div></div>`;
  });
  return `<div style="margin-top: 34px; overflow-x: auto; padding-bottom: 8px;"><div style="width: 1296px;">
<div style="${G2}">${lab('站点', `方框是 ${N1} 个板块的起点；贴着下沿的短刻度是 ${NST - N1} 个细节站点。悬停可看全片时间和第几段几分几秒`)}<div style="position: relative; height: ${H}px;">${svg}${tags}</div></div>
<div style="${G2} margin-top: 8px;">${lab('作品', '讲单部作品的连续板块')}<div style="position: relative; height: 30px;">${works}</div></div>
<div style="${G2} margin-top: 8px;">${lab('平台 15 段', '格宽等于该段时长；格里是平台序号和标题前半句')}<div style="position: relative; height: 124px;">${clips}</div></div>
<div style="${G2} margin-top: 6px;">${lab('135 个板块', '颜色按阶段，上方小记号按类型，颗粒是表演分析')}<div style="position: relative; height: 52px;">${blocks}</div></div>
<div style="${G2} margin-top: 6px;">${lab('九个阶段', '为整理者所加')}<div style="position: relative; height: 42px;">${phases}</div></div>
<div style="${G2} margin-top: 6px;"><div></div>${underline()}</div>
<div style="${G2} margin-top: 6px;"><div style="font-size: 12px; color: ${C.cap}; padding-top: 2px;">全片时间</div>${axisRow()}</div>
<div style="${G2} margin-top: 4px;"><div></div><div style="display: flex; flex-wrap: wrap; gap: 6px 16px; font-size: 12px; color: ${C.cap};">${legend}</div></div>
</div></div>
<div id="relay" data-screen-label="C 话题接力" style="margin-top: 72px;">${head('C', '话题接力', '每段时间在聊什么', null)}${cLead}</div>
<div style="margin-top: 22px; overflow-x: auto; padding-bottom: 8px;"><div style="width: 1296px;">
${crows}
<div style="${G2} margin-top: 6px;"><div style="font-size: 12px; color: ${C.cap}; padding-top: 2px;">全片时间</div>${axisRow()}</div>
<div style="${G2} margin-top: 2px;"><div></div><div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px; font-size: 12px; color: ${C.cap};"><span style="font-family: ${F.mono};">0</span><span style="width: 160px; height: 10px; background: linear-gradient(90deg, rgba(28,27,26,0.06), ${C.ink});"></span><span style="font-family: ${F.mono};">26.2</span><span>每千字出现次数，八行同一墨色色阶；实线框是各组的峰，圆点是峰所在阶段的颜色；虚线框是第二个峰；最后一格只有约 2 分钟、654 字，已淡化</span></div></div>
</div></div>`;
}
function bMobile() {
  const H = 2200, k = H / T, XC = { clip: 34, blk: 62, heat: 80, lead: 156, lab: 172 };
  let h = '';
  for (let m = 0; m <= 420; m += 30) { const y = m * 60 * k; h += `<div style="position: absolute; left: 0; top: ${f1(y)}px; transform: translateY(-50%); font-family: ${F.mono}; font-size: 10.5px; color: ${C.cap};">${fmtHM(m)}</div><div style="position: absolute; left: ${XC.clip}px; width: ${XC.lead - XC.clip}px; top: ${f1(y)}px; height: 1px; background: ${C.rule};"></div>`; }
  CL.forEach(c => { h += `<div style="position: absolute; left: ${XC.clip}px; width: 24px; top: ${f1(c.s * k)}px; height: ${f1((c.e - c.s) * k - 2)}px; box-sizing: border-box; border: 1px solid ${C.ink}; background: ${C.card}; display: flex; align-items: center; justify-content: center; font-family: ${F.type}; font-size: 12px; font-weight: 700;">${c.n}</div>`; });
  SECS.forEach(s => { MBLK.push([+f1(s.s * k), +f1(Math.max(1, (s.e - s.s) * k - 1)), s.ph, s.kind === 'acting' ? 1 : 0]); });
  h += `<sc-for list="{{ mBlocks }}" as="k" hint-placeholder-count="1"><div style="position: absolute; left: ${XC.blk}px; width: 12px; top: {{ k.top }}; height: {{ k.height }}; background: {{ k.bg }}; box-shadow: {{ k.sh }};"></div></sc-for>`;
  GROUPS.forEach((g, j) => { h += `<div style="position: absolute; left: ${XC.heat + j * 9}px; width: 8px; top: 0; height: ${H}px; background: ${heatStops(g, '180deg', true)}, rgba(28,27,26,0.03);"></div>`; });
  [[0, T1, 'dashed'], [T1, T2, 'solid'], [T2, T, 'dashed']].forEach(([a, b, st]) => { h += `<div style="position: absolute; left: ${XC.lead - 6}px; top: ${f1(a * k)}px; height: ${f1((b - a) * k - 2)}px; border-left: 2px ${st} ${C.ink};"></div>`; });
  const items = [];
  PHR.forEach(r => items.push({ t: r.s, o: 0, ph: r.ph, txt: PHN[r.ph], min: r.min, big: 1 }));
  WSP.forEach(w => items.push({ t: w.s, o: 1, ph: w.ph, txt: w.name, min: w.min }));
  items.push({ t: T1, o: 2, ph: 'early', txt: '2:06 她自己的路', min: null, note: 1 }, { t: T2, o: 2, ph: 'coda', txt: '7:00 明星的终结', min: null, note: 1 });
  items.sort((a, b) => a.t - b.t || a.o - b.o);
  const AW = 170; let prev = -1e9, svg = '', labs = '';
  items.forEach(it => { const hh = it.big ? 26 : Math.ceil(estW(it.txt + ' 00.0′', 13) / AW) * 18 + 2, y = it.t * k, top = Math.max(0, y - 4, prev); prev = top + hh + 3; svg += `<line x1="0" y1="${f1(y)}" x2="16" y2="${f1(top + 9)}" stroke="${PHT[it.ph]}" strokeWidth="1"></line>`; labs += it.big ? `<div style="position: absolute; left: ${XC.lab}px; right: 0; top: ${f1(top)}px; padding-top: 3px; border-top: 3px solid ${PHT[it.ph]}; font-family: ${F.serif}; font-size: 14px; font-weight: 700; line-height: 1.3;">${esc(it.txt)} <span style="font-family: ${F.mono}; font-size: 11px; font-weight: 400; color: ${C.cap};">${f1(it.min)}′</span></div>` : it.note ? `<div style="position: absolute; left: ${XC.lab}px; right: 0; top: ${f1(top)}px; font-size: 12px; line-height: 18px; color: ${C.cap};">${esc(it.txt)}</div>` : `<div style="position: absolute; left: ${XC.lab}px; right: 0; top: ${f1(top)}px; font-size: 13px; line-height: 18px;">${esc(it.txt)} <span style="font-family: ${F.mono}; font-size: 11px; color: ${C.cap};">${f1(it.min)}′</span></div>`; });
  const HH = Math.max(H, prev + 10);
  return `<div style="margin-top: 26px; display: flex; flex-wrap: wrap; gap: 6px 14px; font-size: 12px; color: ${C.ink2};">${PHK.map(p => `<span style="display: inline-flex; align-items: center; gap: 6px;">${sw(p, 12, 9)}${PHN[p]}</span>`).join('')}</div>
<p style="${S.cap}">左起：全片时间、平台 15 段、135 个板块（颜色按阶段，颗粒是表演分析）、八组话题的热度（依次是${GROUPS.map(g => g.name).join('、')}，越深表示该组关键词每千字出现越多），右边是阶段和作品。竖线虚的是“她身后的香港”和“明星的终结”，实的是“她自己的路”。</p>
<div style="position: relative; height: ${f1(HH)}px; margin: 22px 0 12px;">${h}<svg width="16" height="${f1(HH)}" style="position: absolute; left: ${XC.lead}px; top: 0; overflow: visible;">${svg}</svg>${labs}</div>
<div id="relay" data-screen-label="C 话题接力" style="margin-top: 48px;">${head('C', '话题接力', '每段时间在聊什么', null)}${cLead}${cap('手机上，八组话题的热度画在上面纵向图的八列里。各组的峰：')}<div style="margin-top: 8px; display: grid; gap: 4px;">${GROUPS.map(g => `<div style="display: grid; grid-template-columns: 96px minmax(0, 1fr); gap: 8px; padding: 5px 0; border-bottom: 1px solid ${C.rule}; font-size: 13px; line-height: 1.6;"><b style="font-family: ${F.serif};">${g.name}</b><span>${CNOTE[g.k].map(([st, , txt]) => `<span style="font-family: ${F.mono}; font-size: 11.5px; color: ${C.cap};">${st}</span> ${esc(txt)}`).join('；')}</span></div>`).join('')}</div></div>`;
}
const ST_DATA = CL.map(c => { const [t1, t2] = c.title.split('｜'); return { n: c.n, t1, t2: t2 || '', meta: `平台序号 ${c.no} · ${c.start}–${c.end} · ${c.min}′`, rows: ST.filter(s => s.clip === c.n).map(s => [s.time, s.ct, s.label, s.level, PHT[SEC[s.sec].ph], SEC[s.sec].kind]) }; });
function stationList() {
  const h = `<sc-for list="{{ stClips }}" as="c" hint-placeholder-count="15"><div style="break-inside: avoid; margin-bottom: 24px; ${S.card}"><div style="display: grid; grid-template-columns: 54px minmax(0, 1fr); border-bottom: 1px solid ${C.ink}; background: ${C.wall};"><div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; background: ${C.ink}; color: ${C.paper};"><span style="font-size: 10.5px; letter-spacing: 0.1em; line-height: 1;">第</span><span style="font-family: ${F.type}; font-size: 22px; font-weight: 700; line-height: 1;">{{ c.n }}</span><span style="font-size: 10.5px; letter-spacing: 0.1em; line-height: 1;">段</span></div><div style="padding: 9px 13px;"><div style="font-family: ${F.serif}; font-size: 15px; font-weight: 700; line-height: 1.45; text-wrap: pretty;">{{ c.t1 }}</div><div style="margin-top: 3px; font-size: 12.5px; line-height: 1.55; color: ${C.muted};">{{ c.t2 }}</div><div style="margin-top: 3px; font-family: ${F.mono}; font-size: 11px; color: ${C.cap};">{{ c.meta }}</div></div></div><div style="padding: 8px 13px 10px;"><sc-for list="{{ c.rows }}" as="s" hint-placeholder-count="8"><div style="display: grid; grid-template-columns: 54px 38px 14px minmax(0, 1fr); gap: 6px; align-items: baseline; padding: 3px 0; font-family: ${F.mono}; font-size: 11.5px; line-height: 1.55; color: ${C.cap};"><span>{{ s.time }}</span><span>{{ s.ct }}</span><span style="align-self: center; display: flex; justify-content: center;"><span style="width: {{ s.mw }}; height: {{ s.mh }}; background: {{ s.col }}; clip-path: {{ s.cp }}; border-radius: {{ s.br }};"></span></span><span style="font-family: {{ s.ff }}; font-size: {{ s.fs }}; font-weight: {{ s.fw }}; color: {{ s.fc }};">{{ s.label }}</span></div></sc-for></div></div></sc-for>`;
  return `<div style="margin-top: 64px; display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px 20px; padding-bottom: 12px; border-bottom: 1px solid ${C.ink};"><h3 style="margin: 0; font-family: ${F.serif}; font-size: 23px; font-weight: 700;">按段落回听</h3><span style="font-size: 13px; color: ${C.cap};">每行依次是全片时间、该段内的时间、站点；宋体是板块起点，记号表示板块类型，颜色表示阶段</span><div role="button" onClick="{{ toggleSt }}" style="margin-left: auto; ${S.btn}" style-hover="${S.btnH}">{{ stBtn }}</div></div>
<div style="margin-top: 22px; columns: 330px; column-gap: 26px;">${h}</div>`;
}
function sectionB() {
  return `${secOpen('map', 'B', '节目地图')}${head('B', '节目地图', '七个多小时怎么走的', null)}
<p style="${S.intro}">节目先用约 63 分钟讲香港娱乐工业，约 29 分钟讲女星生态，约 35 分钟讲表演传统；然后按时间讲她：早年与开窍约 44 分钟，“演技派之路”约 91 分钟，喜剧与动作约 22 分钟，《迷离劫》与阿萨亚斯约 60 分钟，《甜蜜蜜》与后期约 49 分钟；最后约 51 分钟讲她息影和“明星的终结”。</p>
<div style="margin-top: 22px; display: grid; gap: 10px; max-width: 1120px;">${[['1', '前两个小时还没正式讲她：香港娱乐工业、女星生态、表演风格三个阶段合计约 126 分钟，到 2:06 才开始讲她的身世。', ''], ['2', '讲得最长的阶段是“演技派之路”，约 91 分钟，十部片一部接一部。', '90.8 分钟，占 20.5%'], ['3', '单部作品讲得最长的是《迷离劫》，约 60 分钟，其中一半多是在讲阿萨亚斯和两人怎样结缘：“为了这碟醋，才包着这盘饺子”。', '']].map(([n, t, s]) => `<div style="display: flex; gap: 12px; align-items: baseline;"><span style="position: relative; top: 2px;">${numMark(n)}</span><span style="font-family: ${F.serif}; font-size: clamp(17px, 1.8vw, 21px); font-weight: 600; line-height: 1.6; text-wrap: pretty;">${t}${s ? `<span style="margin-left: 10px; font-family: ${F.sans}; font-size: 13px; font-weight: 400; color: ${C.cap};">${s}</span>` : ''}</span></div>`).join('')}</div>
${WIDE(`<div>${bDesktop()}${cap(`条宽按时长等比。板块按节目里的过渡句切分，误差约一分钟；阶段、类型、板块名为整理者所加。话题热度每 10 分钟一格，用每千字出现次数而不是次数。关键词组是整理者定的，数值只看相对高低。各组关键词——${esc(KW)}`)}</div>`)}
${NARROW(`<div>${bMobile()}${cap(`关键词组是整理者定的，数值只看相对高低。各组关键词——${esc(KW)}`)}</div>`)}
${stationList()}
</section>`;
}

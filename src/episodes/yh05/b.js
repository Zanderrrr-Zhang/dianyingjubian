// ===== D star map
const TIERN = { 6: '顶级', 5: '很好', 4: '不错', 3: '有保留', 2: '失望', 1: '失败' };
const WK = D[5][0].map(w => ({ ...w, year: +w.year, min: +w.minutes, tier: +w.tier, col: TRK[w.track] }));
const INDT = '#9DB3C7';
const opK = w => `opacity: {{ op_${w.track} }};`;
function sectionD() {
  const LW = 100, PREW = 160, PW = 1036, YS = 33, KM = 6, TB = 140;
  const xY = y => (y - 1996) * YS + 4;
  const stripW = w => Math.max(6, w.min * KM);
  const meta = w => `${w.year} · ${w.director} · ${w.min}′`;
  const cardH = w => { const iw = w.wd - 22; return 16 + 8 + nLines(w.title, 14.5, iw - 18) * 20 + nLines(meta(w), 11, iw) * 17 + 3 + nLines('节目：' + w.one_line, 12.5, iw) * 18 + 11; };
  const card = (w, style) => `<div style="${style} ${opK(w)}"><div style="width: ${f1(stripW(w))}px; max-width: 100%; height: 16px; ${bgOf(w.col)}"></div><div style="box-sizing: border-box; border: 1px solid ${C.rule2}; background: ${C.bg2}; padding: 7px 10px 10px;"><div style="display: flex; gap: 7px; align-items: baseline;"><span style="flex: none; width: 14px; display: inline-flex; justify-content: center; transform: translateY(1px);">${shape(w.director_group, 10)}</span><span style="font-family: ${F.serif}; font-size: 14.5px; font-weight: 700; line-height: 20px;">${esc(w.title)}</span></div><div style="font-family: ${F.mono}; font-size: 11px; line-height: 17px; color: ${C.cap};">${esc(meta(w))}</div><div style="margin-top: 3px; font-size: 12.5px; line-height: 18px; color: ${C.fg2};"><span style="color: ${C.cap};">节目：</span>${esc(w.one_line)}</div></div></div>`;
  const rated = WK.filter(w => w.tier > 0), pre = WK.filter(w => w.tier === 0).sort((a, b) => a.year - b.year);
  const rows = [6, 5, 4, 3, 2, 1].map(t => {
    const ws = rated.filter(w => w.tier === t).sort((a, b) => a.year - b.year || b.min - a.min);
    const ends = [], lh = [];
    ws.forEach(w => { w.x = xY(w.year); w.wd = Math.max(TB, stripW(w)); let k = 0; while (ends[k] !== undefined && ends[k] + 6 > w.x) k++; ends[k] = w.x + w.wd; w.k = k; w.h = cardH(w); lh[k] = Math.max(lh[k] || 0, w.h); });
    const tops = []; let acc = 12; lh.forEach((h, k) => { tops[k] = acc; acc += h + 8; });
    return { t, ws, tops, H: Math.max(acc + 4, 90) };
  });
  const top6 = rows[0].ws, nSelf6 = top6.filter(w => w.track === 'self').length;
  const BOUND = [1996, 1999, 2003, 2006.5, 2011.5, 2024.2];
  const backdrop = BOUND.slice(0, -1).map((b, i) => i % 2 ? `<div style="position: absolute; top: 0; bottom: 0; left: ${f1(xY(b))}px; width: ${f1(xY(BOUND[i + 1]) - xY(b))}px; background: rgba(236,230,216,0.028);"></div>` : '').join('');
  const EVT = [[2002, '创业板上市'], [2007, '第一次买回'], [2011, '北上：海润'], [2018, '第二次买回']];
  const evLines = EVT.map(([y]) => `<div style="position: absolute; top: 0; bottom: 0; left: ${f1(xY(y))}px; border-left: 1.5px solid ${C.ind};"></div>`).join('');
  const scale = t => `<div style="display: flex; gap: 2px;">${[1, 2, 3, 4, 5, 6].map(i => `<span style="width: 9px; height: 9px; box-sizing: border-box; ${i <= t ? `background: ${C.fg};` : `border: 1px solid ${C.rule2};`}"></span>`).join('')}</div>`;
  const cell = (r, c, inner, extra = '') => `<div style="grid-row: ${r}; grid-column: ${c}; ${extra}">${inner}</div>`;
  let g = '';
  const PERIODS = [[1996, 1999, '创业期', '1996–98', 0], [1999, 2003, '双轨期', '1999–2002', 1], [2003, 2007, '巅峰期', '2003–06', 0], [2006, 2013, '转型期', '2006–12', 1], [2011, 2024, '北上与回港', '2011–23', 0]];
  g += cell(1, 1, `<span style="${S.lab}">时期</span>`, 'padding-top: 6px;');
  g += cell(1, 3, PERIODS.map(([a, b, n, yr, r]) => `<div style="position: absolute; left: ${f1(xY(a))}px; width: ${f1(xY(b) - xY(a) - 3)}px; top: ${r * 24}px; height: 20px; box-sizing: border-box; border-left: 2px solid ${C.rule3}; border-bottom: 1px solid ${C.rule2}; padding-left: 6px; font-size: 12.5px; line-height: 18px; white-space: nowrap; overflow: hidden;"><span style="font-family: ${F.serif}; font-weight: 700;">${n}</span> <span style="font-family: ${F.mono}; font-size: 11px; color: ${C.cap};">${yr}</span></div>`).join(''), 'position: relative; height: 50px;');
  g += cell(2, 1, `<span style="${S.lab}">公司</span>`, 'padding-top: 4px;');
  g += cell(2, 3, EVT.map(([y, n]) => `<div style="position: absolute; left: ${f1(xY(y))}px; top: 2px; padding-left: 6px; border-left: 1.5px solid ${C.ind}; font-size: 12.5px; line-height: 22px; font-weight: 700; color: ${INDT}; white-space: nowrap;">${n} <span style="font-family: ${F.mono}; font-size: 11px; font-weight: 400;">${y}</span></div>`).join(''), 'position: relative; height: 28px;');
  rows.forEach((r, i) => {
    g += cell(i + 3, 1, `${scale(r.t)}<div style="margin-top: 8px; font-family: ${F.serif}; font-size: 18px; font-weight: 700; line-height: 1.35;">${TIERN[r.t]}</div><div style="margin-top: 2px; font-size: 12px; color: ${C.cap};">${r.ws.length} 部</div>`, `padding: 14px 10px 0 0; border-top: 1px solid ${C.rule2};`);
    g += cell(i + 3, 3, `${backdrop}${evLines}${r.ws.map(w => card(w, `position: absolute; left: ${f1(w.x)}px; top: ${r.tops[w.k]}px; width: ${f1(w.wd)}px;`)).join('')}`, `position: relative; height: ${r.H}px; border-top: 1px solid ${C.rule2};`);
  });
  g += cell('3 / span 6', 2, `<div style="padding: 10px 10px 0 0;"><div style="font-family: ${F.serif}; font-size: 15px; font-weight: 700;">银河之前</div><div style="margin-top: 2px; font-size: 12px; color: ${C.cap};">或不算银河作品 · 不评档</div><div style="margin-top: 12px; display: grid; gap: 10px;">${pre.map(w => { w.wd = PREW - 12; return card(w, 'position: relative;'); }).join('')}</div></div>`, `border-top: 1px solid ${C.rule2}; border-right: 1px dashed ${C.rule2}; background: rgba(110,110,110,0.08);`);
  let axis = '';
  for (let y = 1996; y <= 2023; y++) { const x = xY(y); axis += `<div style="position: absolute; left: ${f1(x)}px; top: 0; width: 1px; height: ${y % 5 ? 4 : 8}px; background: ${C.fg};"></div>`; if (y % 5 === 0 || y === 1996 || y === 2023) axis += `<div style="position: absolute; left: ${f1(x)}px; top: 11px; transform: translateX(-50%); font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${y}</div>`; }
  g += cell(9, 1, `<span style="${S.lab}">年份</span>`, `padding-top: 8px; border-top: 1px solid ${C.rule3};`);
  g += cell(9, 2, '', `border-top: 1px solid ${C.rule3};`);
  g += cell(9, 3, axis, `position: relative; height: 34px; border-top: 1px solid ${C.rule3};`);
  const legend = `<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px 20px; font-size: 12.5px; color: ${C.fg2};">${[[C.self, '满足自己'], [C.aud, '满足观众'], ['both', '两轨之间'], [C.none, '其他或银河之前']].map(([c, n]) => `<span style="display: inline-flex; align-items: center; gap: 6px;">${sw(c, 18, 12)}${n}</span>`).join('')}<span style="display: inline-flex; align-items: center; gap: 6px;">${shape('to', 10)}杜琪峰</span><span style="display: inline-flex; align-items: center; gap: 6px;">${shape('to_wai', 10)}杜琪峰、韦家辉</span><span style="display: inline-flex; align-items: center; gap: 6px;">${shape('other', 10)}其他导演</span><span style="display: inline-flex; align-items: center; gap: 6px;"><span style="width: 60px; height: 10px; background: ${C.fg};"></span>色条宽 = 节目讨论时长，10 分钟为 60 像素</span></div>`;
  const hb = (k, t) => `<div role="button" onClick="{{ hl${k} }}" style="${S.btn} padding: 6px 12px; background: {{ hb${k} }}; color: {{ hc${k} }};">${t}</div>`;
  const ctrl = `<div style="margin-top: 16px; display: flex; flex-wrap: wrap; align-items: center; gap: 8px;"><span style="${S.lab} margin-right: 4px;">只看一条轨</span>${hb('All', '全部')}${hb('Self', '满足自己')}${hb('Aud', '满足观众')}</div>`;
  const desktop = `<div style="margin-top: 24px; overflow-x: auto; padding-bottom: 8px;"><div style="width: 1296px; display: grid; grid-template-columns: ${LW}px ${PREW}px ${PW}px;">${g}</div></div>`;
  const mob = [...pre, ...rated.slice().sort((a, b) => a.year - b.year || b.tier - a.tier)].map(w => `<div style="display: grid; grid-template-columns: 14px minmax(0, 1fr); gap: 10px; padding: 10px 0; border-bottom: 1px solid ${C.rule}; ${opK(w)}"><div style="display: grid; gap: 2px; align-content: start; padding-top: 10px;">${[6, 5, 4, 3, 2, 1].map(i => `<span style="height: 9px; ${i === w.tier ? bgOf(w.col) : `box-shadow: inset 0 0 0 1px ${C.rule2};`}"></span>`).join('')}</div><div style="min-width: 0;"><div style="width: ${f1(Math.min(stripW(w), 300))}px; height: 6px; ${bgOf(w.col)}"></div><div style="margin-top: 6px; display: flex; gap: 7px; align-items: baseline; font-family: ${F.serif}; font-size: 15px; font-weight: 700;">${shape(w.director_group, 10)}${esc(w.title)}</div><div style="font-family: ${F.mono}; font-size: 11px; color: ${C.cap};">${esc(meta(w))} · ${w.tier ? TIERN[w.tier] : '银河之前'}</div><div style="margin-top: 2px; font-size: 13px; line-height: 1.6; color: ${C.fg2};">节目：${esc(w.one_line)}</div></div></div>`).join('');
  const PK = { w04: 'zitou', w08: 'darkflower', w09: 'expect', w10: 'hero', w11: 'rot', w12: 'mission', w15: 'needing', w17: 'lovediet', w19: 'lefteye', w21: 'ptu', w22: 'karma', w23: 'breaking', w24: 'throw', w26: 'election', w27: 'election2', w28: 'exiled', w29: 'eye', w31: 'mad', w33: 'sparrow', w34: 'vengeance', w35: 'accident', w37: 'lwp', w39: 'drugwar', w40: 'blind', w43: 'trivisa', w45: 'madfate' };
  const wall = `<div style="margin-top: 40px;">${sub('海报', '按年份排列，下方是节目给的档位')}${posterRow(WK.filter(w => PK[w.id]).sort((x, y) => x.year - y.year).map(w => [PK[w.id], w.title, w.year + ' · ' + TIERN[w.tier]]), 88)}</div>`;
  return `${secOpen('stars', 'D', '作品星图')}${head('D', '作品星图', '每部片被放在哪一档、哪条轨')}
<p style="${S.intro}">${WK.length} 部作品，每部一张卡，横向放在年份上，纵向放在节目给它的那一档。卡顶色条越宽，节目讨论它的时间越长。最上面一排 ${top6.length} 部，${nSelf6} 部是橙色，全在 1999 到 2009 年；青色的卡大多在中间几档；2011 年以后卡变少了，只有《毒战》《树大招风》在“很好”一档。</p>
<div style="margin-top: 26px;">${legend}</div>${ctrl}
${WIDE(`<div>${desktop}</div>`)}
${NARROW(`<div><p style="${S.cap}">手机上按年份自上而下排列，卡片左侧六格刻度表示档位，最上一格是顶级。</p><div style="margin-top: 10px;">${mob}</div></div>`)}
${wall}
${cap('评价分档和“哪条轨”的归类是整理者按节目的措辞归纳的；五个时期名为整理者所加；“节目”一行是主持人的看法。年份、导演按通行记载。《黑社会》两集一共讨论 38.8 分钟，节目没有分开讲，各记一半。《夺命金》年份是 2011，节目把它放在“离开香港进入内地之前”的两部片里，所以算转型期。钢蓝竖线对应模块 E 的公司大事。')}
</section>`;
}

// ===== E who pays
function sectionE() {
  const LWE = 120, PWE = 1160, YE = PWE / 26.2;
  const xE = y => (y - 1996) * YE;
  const j = D[6][1];
  const GANTT = [
    { r: 0, a: 1996, b: 1999, who: '嘉禾', what: '投资创业作《一个字头的诞生》；出来后老板不太满意', k: 'm' },
    { r: 1, a: 1996, b: 1999, who: '永盛→中国星', what: '投《恐怖鸡》《最后判决》，成本很低', k: 'm' },
    { r: 2, a: 1998, b: 2000, who: '年代 邱复生', what: '年代国际邱复生：投《枪火》和《再见阿郎》；“基于人情的临时合作”', k: 'm' },
    { r: 0, a: 1999, b: 2008, who: '中国星（向华强）', what: '正式合作：杜琪峰任中国星行政总裁，成立“一百年电影公司”', k: 'm' },
    { r: 1, a: 1999, b: 2008, who: '美亚、寰亚、新加坡与大陆的资金', what: '《甜言蜜语》《PTU》是美亚投的；《向左走·向右走》是新加坡合拍', k: 'm' },
    { r: 2, a: 2002, b: 2003, who: '上市', what: '2002 年在创业板上市', k: 'o' },
    { r: 3, a: 2002, b: 2007.5, who: '罗守耀', what: '地产商，花可能几百万港币成为大股东和董事会主席；不认同杜琪峰的拍片方向', k: 'o' },
    { r: 2, a: 2007.5, b: 2011, who: '寰亚、寰宇', what: '寰亚（林建岳）、寰宇（林小明）：中国星减产之后的主要投资方', k: 'm' },
    { r: 0, a: 2011, b: 2018.5, who: '海润影业（刘燕铭）', what: '4000 万港币取得 80% 股权，杜琪峰留 20%', k: 'o' },
    { r: 1, a: 2021, b: 2022.2, who: '银河映像国际 · MakerVille（李泽楷）', what: '合组新公司；媒体报道注资 8000 万港币；《命案》是它的作品', k: 'o', lab: 'L' }
  ];
  const RH = 30;
  const gBars = GANTT.map(g => { const l = xE(g.a), w = xE(g.b) - xE(g.a) - 2; const st = g.k === 'm' ? `background: ${C.ind}; color: #fff;` : `background: repeating-linear-gradient(45deg, rgba(62,92,118,0.85) 0 3px, rgba(62,92,118,0.35) 3px 7px); box-shadow: inset 0 0 0 1.5px ${INDT}; color: #fff;`; return `<div title="${esc(g.who + '：' + g.what + '（节目说法）')}" style="position: absolute; left: ${f1(l)}px; width: ${f1(w)}px; top: ${g.r * RH}px; height: ${RH - 6}px; ${st} box-sizing: border-box; font-size: 12.5px; line-height: ${RH - 6}px; white-space: nowrap; cursor: help;">${g.lab === 'L' ? `<span style="position: absolute; right: calc(100% + 8px); top: 0; color: ${C.fg};">${esc(g.who)}</span>` : `<span style="display: block; padding: 0 6px; overflow: hidden; text-overflow: ellipsis;">${esc(g.who)}</span>`}</div>`; }).join('');
  const yU = 22, yD = 86, SH = 116;
  const pts = [[1996, yU], [2002, yU], [2002, yD], [2007, yD], [2007, yU], [2011, yU], [2011, yD], [2018, yD], [2018, yU], [2022.2, yU]];
  const path = 'M' + pts.map(([y, v]) => f1(xE(y)) + ' ' + v).join(' L');
  const segLab = [[1996, 2002, yU, '杜琪峰、韦家辉创办，原名“金麟”'], [2002, 2007, yD, '罗守耀成为大股东'], [2007, 2011, yU, '杜琪峰买回主体'], [2011, 2018, yD, '刘燕铭取得 80%'], [2018, 2022.2, yU, '团队集资买回']];
  const owner = `<svg width="${PWE}" height="${SH}" style="position: absolute; left: 0; top: 0; overflow: visible;"><path d="${path} L${f1(xE(2022.2))} ${SH} L0 ${SH} Z" fill="rgba(236,230,216,0.05)"></path><path d="${path}" fill="none" stroke="${C.fg}" strokeWidth="2.5"></path><line x1="0" y1="${yD}" x2="${PWE}" y2="${yD}" stroke="${C.rule2}" strokeWidth="1" strokeDasharray="3 4"></line></svg>${segLab.map(([a, b, y, t]) => `<div style="position: absolute; left: ${f1(xE(a) + 8)}px; width: ${f1(xE(b) - xE(a) - 14)}px; top: ${y + 6}px; font-size: 12.5px; line-height: 1.45; color: ${C.fg2}; text-wrap: pretty;">${t}</div>`).join('')}${[[2007, '第一次买回'], [2018, '第二次买回']].map(([y, t]) => `<span style="position: absolute; left: ${f1(xE(y) - 7)}px; top: ${yU - 7}px; width: 14px; height: 14px; border-radius: 50%; background: ${C.glow}; ${GLOWBOX}"></span><span style="position: absolute; left: ${f1(xE(y) + 12)}px; top: ${yU - 26}px; font-family: ${F.serif}; font-size: 14px; font-weight: 700; white-space: nowrap; ${GLOWTXT}">${t}</span>`).join('')}`;
  const NOTES = [
    { y: 1998.5, t: '《枪火》', rows: [['节目说法', '年代国际邱复生投资 250 万'], ['报道', '200 万，票房四百多万']], diff: 1 },
    { y: 2002, t: '创业板上市', rows: [['节目说法', '股东主要是杜琪峰和一位制片经理；刘德华的天幕一度持股 25%']] },
    { y: 2003, t: '替身官司', rows: [['节目说法', '一位特技演员索赔 500 万，法院判赔 79 万；杜琪峰说各种费用花了 700 多万。节目说保险制度有漏洞，多年挣的钱一下子全赔进去']] },
    { y: 2007, t: '第一次买回', rows: [['节目说法', '杜琪峰花两千多万港元买回银河的主体；上市的壳留给罗守耀（估值 800 万，后来最高 8000 万）']] },
    { y: 2011, t: '北上：海润', rows: [['节目说法', '刘燕铭 4000 万港币取得 80% 股权，杜琪峰留 20%'], ['报道', '2011 年 12 月签股权转让协议，刘燕铭成为第一大股东，杜琪峰仍有实际控制权（没有写金额和比例）']] },
    { y: 2013, t: '《毒战》', rows: [['节目说法', '票房 1.5 亿，成本 8000 万'], ['报道', '票房 1.46 亿，利润只有几百万']], diff: 1 },
    { y: 2016, t: '《黄帝大战蚩尤》三部曲', rows: [['节目说法', '刘燕铭宣布投资 10 亿，请杜琪峰拍三部曲；没有拍成'], ['报道', '三部曲每部“三个亿以上”']], diff: 1, un: 1 },
    { y: 2016, t: '小宇宙映像', rows: [['节目说法', '在江苏宜兴合组的影视基地，之后没有动静']], un: 1 },
    { y: 2018, t: '第二次买回', rows: [['节目说法', '同业竞争的问题；团队集资把股份买回（杜琪峰、朱淑仪、韦家辉、游乃海、会计师、制片人，还有一位投资者）']] },
    { y: 2021, t: '银河映像国际', rows: [['节目说法', '和李泽楷的 MakerVille 合组新公司；媒体报道注资 8000 万港币；《命案》是它的作品']] }
  ];
  NOTES.forEach((n, i) => n.i = i + 1);
  const dotN = (n, extra = '') => `<span style="flex: none; width: 20px; height: 20px; box-sizing: border-box; border-radius: 50%; ${n.un ? `border: 1.5px dashed ${C.fg}; color: ${C.fg};` : `background: ${C.fg}; color: ${C.bg};`} display: inline-flex; align-items: center; justify-content: center; font-family: ${F.mono}; font-size: 11px; font-weight: 600; ${extra}">${n.i}</span>`;
  let axis = '';
  for (let y = 1996; y <= 2022; y++) { const x = xE(y); axis += `<div style="position: absolute; left: ${f1(x)}px; top: 0; width: 1px; height: ${y % 5 ? 4 : 8}px; background: ${C.fg};"></div>`; if (y % 2 === 0 || y === 2021) axis += `<div style="position: absolute; left: ${f1(x)}px; top: 10px; transform: translateX(-50%); font-family: ${F.mono}; font-size: 11.5px; color: ${C.cap};">${y}</div>`; }
  const used = {};
  const markers = NOTES.map(n => { const k = Math.round(n.y); used[k] = (used[k] || 0) + 1; return `<span title="${esc(n.t)}" style="position: absolute; left: ${f1(xE(n.y) - 10)}px; top: ${(used[k] - 1) * 24}px;">${dotN(n)}</span>`; }).join('');
  const rowE = (l, inner, h, extra = '') => `<div style="display: grid; grid-template-columns: ${LWE}px ${PWE}px; ${extra}"><div style="padding-right: 10px;">${l}</div><div style="position: relative; height: ${h}px;">${inner}</div></div>`;
  const labE = (t, s) => `<div style="font-family: ${F.serif}; font-size: 15px; font-weight: 700; line-height: 1.35;">${t}</div><div style="margin-top: 4px; font-size: 11.5px; line-height: 1.5; color: ${C.cap};">${s}</div>`;
  const desktop = `<div style="margin-top: 30px; overflow-x: auto; padding-bottom: 8px;"><div style="width: ${LWE + PWE}px;">${rowE(labE('钱从哪来', '实色是投资方，斜纹是持股方。条长按年份'), gBars, 4 * RH)}${rowE(`<span style="${S.lab}">年份</span>`, axis, 30, `margin-top: 6px; border-top: 1px solid ${C.rule3}; padding-top: 0;`)}${rowE(`<span style="${S.lab}">注释</span>`, markers, 48)}${rowE(labE('公司归谁', '线在上：杜琪峰和团队持有；线在下：他人是大股东'), owner, SH + 34, `margin-top: 12px;`)}</div></div>`;
  const noteCard = n => `<div style="${n.un ? `border: 1.5px dashed ${C.rule3}; background: transparent;` : S.card} padding: 12px 14px 14px; min-width: 0;"><div style="display: flex; align-items: center; gap: 8px;">${dotN(n)}<span style="font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${Math.floor(n.y)}</span><span style="font-family: ${F.serif}; font-size: 16px; font-weight: 700;">${esc(n.t)}</span>${n.un ? tag('没拍成', 'org') : ''}</div>${n.rows.map(([s, t]) => `<div style="margin-top: 8px; display: flex; gap: 8px; align-items: baseline; font-size: 13.5px; line-height: 1.65; color: ${C.fg2};">${tag(s, s === '报道' ? 'rep' : 'prog')}<span>${esc(t)}</span></div>`).join('')}${n.diff ? `<div style="margin-top: 8px; font-size: 12px; color: ${C.cap};">节目说法与报道不一致</div>` : ''}</div>`;
  const notes = `<div style="margin-top: 22px; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 290px), 1fr)); gap: 12px;">${NOTES.filter(n => !n.un).map(noteCard).join('')}</div>`;
  const unmade = `<div style="margin-top: 28px; display: flex; flex-wrap: wrap; gap: 14px 24px; align-items: flex-start;"><div style="flex: 0 0 180px;"><div style="font-family: ${F.serif}; font-size: 18px; font-weight: 700;">没拍成的</div><div style="margin-top: 4px; font-size: 13px; color: ${C.cap};">2016 年，海润时期</div></div><div style="flex: 1 1 560px; min-width: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 12px;">${NOTES.filter(n => n.un).map(noteCard).join('')}</div></div>`;
  const OWN = [['1996–2002', '杜琪峰、韦家辉创办，原名“金麟”', 1], ['2002–2007', '上市后罗守耀成为大股东', 0], ['2007–2011', '第一次买回：杜琪峰买回主体', 1], ['2011–2018', '海润刘燕铭取得 80%', 0], ['2018 起', '第二次买回：团队集资', 1]];
  const mob = `<div style="margin-top: 22px;">${sub('公司归谁', '亮的一格是杜琪峰和团队持有')}${OWN.map(([y, t, up]) => `<div style="display: grid; grid-template-columns: 8px 84px minmax(0, 1fr); gap: 10px; padding: 9px 0; border-bottom: 1px solid ${C.rule}; font-size: 14px; line-height: 1.6;"><span style="${up ? `background: ${C.fg};` : `background: ${C.faint};`}"></span><span style="font-family: ${F.mono}; font-size: 12.5px; color: ${C.cap};">${y}</span><span>${t}</span></div>`).join('')}<div style="margin-top: 26px;">${sub('钱从哪来', '实色投资方，斜纹持股方')}</div>${GANTT.slice().sort((a, b) => a.a - b.a).map(g => `<div style="display: grid; grid-template-columns: 8px 84px minmax(0, 1fr); gap: 10px; padding: 9px 0; border-bottom: 1px solid ${C.rule}; font-size: 14px; line-height: 1.6;"><span style="${g.k === 'm' ? `background: ${C.ind};` : `background: repeating-linear-gradient(45deg, ${C.ind} 0 3px, transparent 3px 6px); box-shadow: inset 0 0 0 1px ${INDT};`}"></span><span style="font-family: ${F.mono}; font-size: 12.5px; color: ${C.cap};">${Math.floor(g.a)}–${Math.min(2021, Math.ceil(g.b) - 1)}</span><span><b style="font-family: ${F.serif};">${esc(g.who)}</b><br><span style="color: ${C.fg2};">${esc(g.what)}</span></span></div>`).join('')}</div>`;
  const side = `<div style="flex: 0 1 380px; min-width: 0; padding: 18px 20px; background: ${C.bar}; border-top: 8px solid #000; border-bottom: 8px solid #000; box-shadow: 0 0 0 1px ${C.rule2};"><div style="font-family: ${F.serif}; font-size: 19px; font-weight: 700; line-height: 1.6;">纯制作公司：不出钱，不是出品方，挣的是制作费。</div><div style="margin-top: 8px; font-size: 15px; line-height: 1.75; color: ${C.fg2};">所以节目说，到头来只能由创作者自己来持有。</div></div>`;
  return `${secOpen('money', 'E', '谁出钱')}${head('E', '谁出钱', '三十年里银河归谁，钱从哪来')}
<div style="margin-top: 24px; display: flex; flex-wrap: wrap; gap: 24px 48px; align-items: flex-start;"><div style="flex: 1 1 560px; min-width: 0;"><p style="${S.intro} margin-top: 0;">节目说：${esc(j.why_pure_production)}。${esc(j.bundle)}。</p><div style="margin-top: 18px;">${quote('纯制作的公司真的不是一个利润很大很稳定的投资对象……到头来还是只能由创作者自己来持有。', '节目', 19)}</div></div>${side}</div>
${WIDE(desktop)}
${NARROW(mob)}
${notes}${unmade}
<div style="margin-top: 32px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr)); gap: 16px 40px;">${lab('为什么北上', esc(j.why_north) + '。')}${lab('接班', esc(j.heir) + '。')}</div>
${cap('金额、比例和年份都是节目口述；标“报道”的是公开报道的数字，用来对照。节目说法与报道不一致的有《枪火》《毒战》《黄帝大战蚩尤》三处。条长按年份，年内的先后为示意。页面只写节目说的事实，不评价任何金主和股东。')}
</section>`;
}

// ===== F method
function sectionF() {
  const j7 = D[7][0], j8 = D[8][0];
  const R = Object.fromEntries(j7.roles.map(r => [r.who, r]));
  const main = [['韦家辉', 50, 22, '大脑'], ['杜琪峰', 25, 68, '拍板'], ['游乃海', 75, 68, '桥梁']];
  const outer = [['编剧组', 11.9, 33, '查资料，头脑风暴'], ['执行导演', 88.1, 33, '罗永昌等'], ['“银河创作组”', 50, 90, '是一个虚指']];
  const lines = `<svg viewBox="0 0 100 100" preserveAspectRatio="none" style="position: absolute; inset: 0; width: 100%; height: 100%;"><polygon points="50,22 25,68 75,68" fill="rgba(207,200,180,0.06)" stroke="${C.meth}" strokeWidth="1.5" vectorEffect="non-scaling-stroke"></polygon></svg><div style="position: absolute; left: 6%; right: 6%; top: 14%; bottom: 6%; border: 1px dashed ${C.rule2}; border-radius: 50%;"></div>`;
  const FPH = { 韦家辉: 'waika', 杜琪峰: 'to', 游乃海: 'yau' };
  const node = ([n, x, y, r], big) => `<div style="position: absolute; left: ${x}%; top: ${y}%; width: 0; height: 0;">${big ? `<div style="position: absolute; left: -26px; top: -26px;">${photo(FPH[n], n, 52, 52, `box-shadow: 0 0 0 2px ${C.meth};`)}</div>` : `<span style="position: absolute; left: -5px; top: -5px; width: 10px; height: 10px; border-radius: 50%; background: ${C.sub};"></span>`}<div style="position: absolute; ${y < 40 && big ? 'left: 36px; top: -18px;' : big ? 'left: -60px; width: 120px; top: 32px; text-align: center;' : x < 50 ? 'left: 10px; top: 6px;' : x > 50 ? 'right: 10px; top: 6px; text-align: right;' : 'left: -80px; width: 160px; top: -38px; text-align: center;'} white-space: nowrap;"><div style="font-family: ${F.serif}; font-size: ${big ? 20 : 14}px; font-weight: 700; line-height: 1.3;">${n}</div><div style="margin-top: 2px; ${big ? `display: inline-block; padding: 0 8px; background: ${C.meth}; color: ${C.bg}; font-size: 13px; font-weight: 700;` : `font-size: 12px; color: ${C.cap};`}">${r}</div></div></div>`;
  const diagram = `<div style="flex: 1 1 640px; min-width: 0; overflow-x: auto;"><div style="min-width: 600px; background: #000; padding: 12px 0;"><div style="position: relative; aspect-ratio: 2.35 / 1; background: ${C.bg};">${lines}${outer.map(o => node(o, false)).join('')}${main.map(m => node(m, true)).join('')}</div></div></div>`;
  const sideF1 = `<div style="flex: 1 1 300px; min-width: 0; display: grid; gap: 12px;">${box(`<span style="${S.lab}">有韦家辉</span><br>${j7.with_wai.map(esc).join('；')}。`)}${box(`<span style="${S.lab}">没有韦家辉的片子</span><br><span style="font-family: ${F.serif}; font-size: 16px; font-weight: 700; color: ${C.fg};">${j7.without_wai.join('')}</span><br>${esc(j7.without_wai_note)}`)}${quote('韦家辉是大脑。', '杜琪峰的话，节目转述', 19)}</div>`;
  const roleCols = `<div style="margin-top: 18px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr)); gap: 12px;">${['韦家辉', '杜琪峰', '游乃海', '编剧组', '罗永昌等'].map(w => { const r = R[w]; return `<div style="padding: 12px 14px; border-top: 2px solid ${C.meth}; background: ${C.bg2};"><div style="display: flex; align-items: baseline; gap: 8px;"><span style="font-family: ${F.serif}; font-size: 16px; font-weight: 700;">${esc(r.who)}</span>${r.role ? `<span style="font-size: 12.5px; color: ${C.cap};">${esc(r.role)}</span>` : ''}</div><div style="margin-top: 6px; font-size: 13.5px; line-height: 1.7; color: ${C.fg2};">${esc(r.text)}</div></div>`; }).join('')}</div>${cap('“银河创作组”：' + esc(j7.creative_group.replace(/^“银河创作组”是一个虚指：/, '是一个虚指。')) + '。')}`;
  const steps = j8.relay, LB = 4;
  const col = i => `<div style="min-width: 0; padding: 12px 12px 14px; box-sizing: border-box; height: 100%; ${i >= LB ? `background: ${C.bg3}; border: 1.5px solid ${C.meth};` : `background: ${C.bg2}; border: 1px solid ${C.rule2};`}"><div style="font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${i + 1}</div><div style="margin-top: 4px; font-size: 14px; line-height: 1.6;">${esc(steps[i])}</div></div>`;
  const cw = 100 / steps.length;
  const relay = `<div style="margin-top: 18px; overflow-x: auto; padding-bottom: 6px;"><div style="position: relative; min-width: 1080px; padding: 96px 0 70px;"><div style="position: absolute; left: ${f1(cw * 5)}%; width: ${f1(cw * 2 - 1)}%; top: 0; padding: 10px 12px; box-sizing: border-box; background: ${C.meth}; color: ${C.bg}; font-family: ${F.serif}; font-size: 15px; font-weight: 700; line-height: 1.5;">角色去贴演员。<br>“黄日华就是丁有健。”</div><div style="position: absolute; left: ${f1(cw * 5.5)}%; top: 66px; width: 2px; height: 30px; background: ${C.meth};"></div><div style="display: grid; grid-template-columns: repeat(${steps.length}, minmax(0, 1fr)); gap: 14px; align-items: stretch;">${steps.map((s, i) => col(i)).join('')}</div><div style="position: absolute; left: ${f1(cw * (LB + 0.5))}%; width: ${f1(cw * (steps.length - 1 - LB))}%; bottom: 30px; height: 30px; box-sizing: border-box; border: 2px solid ${C.meth}; border-top: none;"></div><span style="position: absolute; left: calc(${f1(cw * (LB + 0.5))}% - 6px); bottom: 58px; width: 14px; height: 12px; background: ${C.meth}; clip-path: polygon(50% 0, 100% 100%, 0 100%);"></span><div style="position: absolute; left: ${f1(cw * (LB + 0.5))}%; width: ${f1(cw * (steps.length - 1 - LB))}%; bottom: 0; text-align: center; font-size: 13px; color: ${C.sub};">拍出来再看，看完再往下写，一直接下去</div><div style="position: absolute; left: 0; width: ${f1(cw * LB - 1)}%; bottom: 36px; text-align: center; font-size: 12.5px; color: ${C.cap}; border-top: 1px solid ${C.rule2}; padding-top: 6px;">起头</div></div></div>`;
  const ex = `<div style="margin-top: 22px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr)); gap: 12px;">${j8.examples.map(e => `<div style="padding: 12px 14px; ${S.card}"><div style="font-family: ${F.serif}; font-size: 15px; font-weight: 700;">${esc(e.case)}</div><div style="margin-top: 6px; font-size: 13.5px; line-height: 1.7; color: ${C.fg2};">${esc(e.text)}</div></div>`).join('')}</div>`;
  const wkw = j8.vs_wong_kar_wai;
  const more = `<div style="margin-top: 26px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 330px), 1fr)); gap: 18px 40px;">${lab('作品自己会活起来', esc(j8.theory) + '。')}${lab('斯坦利·卡维尔', esc(j8.cavell) + '。')}${lab('和王家卫比', `王家卫：${esc(wkw.wkw)}。<br>银河：${esc(wkw.milkyway)}。`)}${lab('自己给自己出难题', esc(j8.problem_solving) + '（一位主持人）。')}${lab('杜琪峰的习惯', esc(j8.to_habit) + '。')}${lab('坐着硬想', esc(j8.hard_thinking) + '。')}</div>`;
  const xyc = j7.xinyicheng;
  const cameo = `<div style="margin-top: 14px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr)); gap: 12px;">${j7.cameos.map(c => `<div style="padding: 12px 14px; ${S.card} border-top: 3px solid ${C.meth};"><div style="font-family: ${F.serif}; font-size: 16px; font-weight: 700;">${esc(c.who)}</div><div style="margin-top: 6px; font-size: 13.5px; line-height: 1.7; color: ${C.fg2};">${esc(c.role)}</div></div>`).join('')}</div>${cap(esc(j7.school) + '。')}`;
  return `${secOpen('method', 'F', '大脑、拍板与执笔')}${head('F', '大脑、拍板与执笔', '集体创作、接龙、谁是大脑')}
<p style="${S.intro}">银河的创作是集体的。节目说，韦家辉出命运和斗智，杜琪峰出江湖情义和对现实的观察，游乃海在中间执笔；源头是 TVB 一个大编剧带一群徒弟的做法。</p>
<div style="margin-top: 32px;">${sub('F1 分工', '三个点站成三角形，外围是一圈帮手')}<div style="margin-top: 16px; display: flex; flex-wrap: wrap; gap: 24px 36px; align-items: flex-start;">${diagram}${sideF1}</div>${roleCols}</div>
<div style="margin-top: 48px;">${sub('F2 接龙', '写一个开头，拍出来看效果，再往下写')}${relay}${ex}${more}</div>
<div style="margin-top: 48px;">${sub('F3 和新艺城比', '两种集体创作')}${tbl(['', '新艺城', '银河'], xyc.map(r => [esc(r.row), esc(r.xinyicheng), esc(r.milkyway)]), 'minmax(80px, 120px) minmax(0, 1fr) minmax(0, 1fr)', [0, 0, C.meth])}</div>
<div style="margin-top: 48px;">${sub('F4 所有人都要上场', '工作人员客串')}${cameo}</div>
</section>`;
}

// ===== G two tracks & gunfight
function sectionG() {
  const g = D[9][0], gf = g.gunfight_film;
  const tt = tbl(['', '满足自己', '满足观众'], g.two_tracks.map(r => [esc(r.row), esc(r.self), esc(r.audience)]), 'minmax(80px, 120px) minmax(0, 1fr) minmax(0, 1fr)', [0, C.self, C.aud]);
  const N = [
    ['戏曲', '', 0, 150, 110],
    ['武侠片、功夫片', '身体动作舞蹈化、程式化', 170, 150, 190],
    ['徐克', '冷兵器和拳脚', 430, 30, 190],
    ['吴宇森、林岭东', '枪战被唯美化、舞蹈化', 430, 170, 200],
    ['佩金帕', '慢镜头、暴力美学', 170, 292, 190],
    ['梅尔维尔、德帕尔玛、《虎胆龙威》', '有点接近，但不一样', 440, 300, 300, 'dash'],
    ['杜琪峰', '枪战，但强调静态的力量', 760, 170, 220, 'hl']
  ];
  const NH = 60;
  const nodes = N.map(([t, s, x, y, w, k]) => `<div style="position: absolute; left: ${x}px; top: ${y}px; width: ${w}px; height: ${NH}px; box-sizing: border-box; padding: 8px 12px; ${k === 'hl' ? `background: ${C.self}; color: ${C.bg};` : k === 'dash' ? `border: 1.5px dashed ${C.rule3}; background: ${C.bg};` : `background: ${C.bg2}; border: 1px solid ${C.rule3};`} display: flex; flex-direction: column; justify-content: center;"><div style="font-family: ${F.serif}; font-size: 15.5px; font-weight: 700; line-height: 1.35; white-space: nowrap;">${esc(t)}</div>${s ? `<div style="margin-top: 2px; font-size: 12px; line-height: 1.4; ${k === 'hl' ? '' : `color: ${C.sub};`} white-space: nowrap;">${esc(s)}</div>` : ''}</div>`).join('');
  const ar = (x1, y1, x2, y2, dash) => { const a = Math.atan2(y2 - y1, x2 - x1), L = 9, W = 4.5; const bx = x2 - L * Math.cos(a), by = y2 - L * Math.sin(a); const p = `${f1(x2)},${f1(y2)} ${f1(bx + W * Math.sin(a))},${f1(by - W * Math.cos(a))} ${f1(bx - W * Math.sin(a))},${f1(by + W * Math.cos(a))}`; return `<line x1="${x1}" y1="${y1}" x2="${f1(bx)}" y2="${f1(by)}" stroke="${C.fg2}" strokeWidth="1.5" ${dash ? 'strokeDasharray="4 4"' : ''}></line><polygon points="${p}" fill="${C.fg2}"></polygon>`; };
  const edges = ar(110, 180, 170, 180) + ar(360, 172, 430, 70) + ar(360, 186, 430, 200) + ar(360, 320, 470, 230) + ar(590, 300, 560, 230, 1) + ar(630, 200, 760, 200);
  const lineage = `<div style="margin-top: 16px; overflow-x: auto; padding-bottom: 6px;"><div style="position: relative; width: 1000px; height: 372px;"><svg width="1000" height="372" style="position: absolute; left: 0; top: 0;">${edges}</svg>${nodes}</div></div>`;
  return `${secOpen('tracks', 'G', '两条轨')}${head('G', '两条轨', '拍什么类型')}
<div style="margin-top: 28px; display: flex; flex-wrap: wrap; gap: 32px 56px; align-items: flex-start;"><div style="flex: 1 1 480px; min-width: 0;">${sub('G1 双轨制', '杜琪峰的说法：一种满足自己，一种满足观众')}${tt}${cap('好莱坞里找对应，一位主持人说：' + esc(g.hollywood_match.replace(/（一位主持人）$/, '')) + '。')}</div><div style="flex: 1 1 380px; min-width: 0; display: grid; gap: 18px;">${subtitleCard('枪战片是战争片的替代。', '一位主持人的看法')}<div style="${S.body}">${esc(gf.war_substitute.replace(/（一位主持人）$/, ''))}。${esc(gf.unique)}。</div></div></div>
<div style="margin-top: 48px;">${sub('G2 枪战片的谱系', '“枪战片”是' + esc(gf.origin) + '之一')}${lineage}${cap('佩金帕从侧面汇入；西方的少数例子用虚线连。节目说属于枪战片的杜琪峰作品：' + gf.fits.map(esc).join('、') + '。')}</div>
</section>`;
}

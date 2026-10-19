// ===== D
const EV = D[5][0].map((r, i) => ({ i, y: +r.year, lane: r.lane, imp: +r.importance, text: r.event }));
const LANES = [{ k: 'market', name: '市场与产业', sub: '票房、碟片、电视、公司', c: C.tr, g: 'ci' }, { k: 'coprod', name: '合拍片与北上', sub: 'CEPA、合拍片、北上', c: C.co, g: 'sq' }, { k: 'local', name: '本土创作', sub: '本土片与导演；◆ 2013 年前，▲ 之后', c: C.l2, g: 'tr' }, { k: 'society', name: '社会与政策', sub: '回归、自由行、保育、资助', c: C.ctx, g: 'hx' }];
const LN = Object.fromEntries(LANES.map(l => [l.k, l]));
const evC = e => e.lane === 'local' ? (e.y >= 2013 ? { c: C.l2, g: 'tr', t: C.l2 } : { c: C.l1, g: 'di', t: C.ink2 }) : { c: LN[e.lane].c, g: LN[e.lane].g, t: LN[e.lane].c };
const PH = [{ n: '黄金年代的尾声', a: 1993, b: 1996, c: null }, { n: '过渡期', a: 1997, b: 2003, c: C.tr }, { n: '本土第一阶段', a: 2004, b: 2012, c: C.l1 }, { n: '新本土电影', a: 2013, b: 2024, c: C.l2 }];
const YHL = { 1997: ['1997', '回归 · 全片提到 27 次'], 2003: ['2003', 'CEPA'], 2013: ['2013', '全片提到 20 次'] };
const GATE_NOTE = '开口的闸门：节目说，很多新导演认为“合拍片实质上已经结束”';
const gateSvg = `<svg width="28" height="28" viewBox="0 0 28 28" style="display: block; overflow: visible;"><rect x="2" y="9" width="5" height="19" fill="${C.co}"></rect><line x1="6" y1="13" x2="27" y2="1" stroke="${C.co}" strokeWidth="3" strokeLinecap="round"></line><line x1="22" y1="28" x2="22" y2="20" stroke="${C.co}" strokeWidth="2" strokeDasharray="2 2"></line></svg>`;
function dDesktop() {
  const TW = 1036, Y0 = 1993, SPAN = 32;
  const xY = y => (y - Y0) / SPAN, xc = e => xY(e.y + 0.5);
  const TOP = 46, RA = 86, Z = 22, RB = 86, LH = RA + Z + RB, GAP = 14, LW = 148;
  const lanesEnd = TOP + LANES.length * (LH + GAP) - GAP, HT = lanesEnd + 8;
  let lanes = '', labs = '';
  LANES.forEach((ln, li) => {
    const top = TOP + li * (LH + GAP);
    const evs = EV.filter(e => e.lane === ln.k);
    const groups = {}; evs.forEach(e => { (groups[e.y] = groups[e.y] || []).push(e); });
    let mk = '';
    Object.values(groups).forEach(g => {
      g.sort((a, b) => a.imp - b.imp);
      const offs = g.length === 1 ? [0] : g.length === 2 ? [-5, 5] : [-8, 0, 8];
      g.forEach((e, j) => {
        const x = xc(e), cc = evC(e), gate = e.y === 2019 && e.lane === 'coprod';
        const t = esc(e.y + ' · ' + ln.name + ' · ' + e.text + (gate ? '。' + GATE_NOTE : '') + (e.imp === 1 ? '' : '（次要事件）'));
        mk += gate ? `<div title="${t}" style="position: absolute; left: ${pct(x)}; top: ${RA + Z / 2}px; margin: -22px 0 0 -5px; cursor: help; z-index: 2;">${gateSvg}</div>`
          : `<div title="${t}" style="position: absolute; left: ${pct(x)}; top: ${RA + Z / 2 + offs[j]}px; width: 14px; height: 14px; margin: -7px 0 0 -7px; display: flex; align-items: center; justify-content: center; cursor: help; z-index: 2;">${gl(cc.g, cc.c, e.imp === 1 ? 11 : 8, e.imp === 2)}</div>`;
      });
    });
    const ones = evs.filter(e => e.imp === 1).sort((a, b) => a.y - b.y);
    const rows = [ones.filter((_, i) => i % 2 === 0), ones.filter((_, i) => i % 2 === 1)];
    let lb = '', ld = '';
    rows.forEach((r, ri) => {
      if (!r.length) return;
      const starts = spread(r.map(e => xc(e) - 7 / TW), (LW + 10) / TW, 0, 1 - LW / TW);
      r.forEach((e, j) => {
        const st = starts[j], x = xc(e), cc = evC(e), gate = e.y === 2019 && e.lane === 'coprod';
        lb += `<div style="position: absolute; left: ${pct(st)}; ${ri === 0 ? `bottom: ${LH - RA}px; padding: 0 0 3px 7px;` : `top: ${RA + Z}px; padding: 3px 0 0 7px;`} width: ${LW}px; box-sizing: border-box; border-left: 1px solid ${cc.c}; font-size: 12px; line-height: 1.45; color: ${C.ink}; text-wrap: pretty;"><span style="font-family: ${F.mono}; font-weight: 600; color: ${cc.t}; margin-right: 5px;">${e.y}</span>${esc(e.text)}${gate ? `<div style="margin-top: 3px; color: ${C.co};">${esc(GATE_NOTE)}</div>` : ''}</div>`;
        ld += `<line x1="${f2(x * 1000)}" y1="${RA + Z / 2}" x2="${f2(st * 1000)}" y2="${ri === 0 ? RA : RA + Z}" stroke="${cc.c}" strokeWidth="1" vectorEffect="non-scaling-stroke"></line>`;
      });
    });
    lanes += `<div style="position: absolute; left: 0; right: 0; top: ${top}px; height: ${LH}px;"><div style="position: absolute; left: 0; right: 0; top: ${RA + Z / 2}px; height: 1px; background: ${ln.c}; opacity: 0.55;"></div><svg viewBox="0 0 1000 ${LH}" preserveAspectRatio="none" style="position: absolute; left: 0; top: 0; width: 100%; height: ${LH}px; overflow: visible;">${ld}</svg>${lb}${mk}</div>`;
    if (li) lanes += `<div style="position: absolute; left: 0; right: 0; top: ${top - GAP / 2}px; border-top: 1px dashed ${C.rule2};"></div>`;
    const glyphs = ln.k === 'local' ? gl('di', C.l1, 12) + gl('tr', C.l2, 12) : gl(ln.g, ln.c, 12);
    labs += `<div style="position: absolute; left: 0; right: 0; top: ${top + RA - 8}px;"><div style="display: flex; align-items: center; gap: 6px;">${glyphs}<span style="margin-left: 2px; font-family: ${F.serif}; font-size: 16px; font-weight: 700; line-height: 1.3;">${ln.name}</span></div><div style="margin-top: 3px; font-size: 11.5px; line-height: 1.5; color: ${C.cap};">${ln.sub}</div></div>`;
  });
  let over = '';
  PH.forEach(p => { over += `<div style="position: absolute; left: ${pct(xY(p.a))}; width: ${pct((p.b + 1 - p.a) / SPAN)}; top: ${TOP - 8}px; height: ${lanesEnd - TOP + 8}px; background: ${p.c ? rgba(p.c, 0.06) : 'repeating-linear-gradient(135deg, rgba(26,28,30,0.07) 0 1px, transparent 1px 7px)'}; pointer-events: none;"></div>`; });
  Object.entries(YHL).forEach(([y, [a, b]]) => {
    over += `<div style="position: absolute; left: ${pct(xY(+y))}; width: ${pct(1 / SPAN)}; top: ${TOP - 8}px; height: ${lanesEnd - TOP + 8}px; background: ${rgba(C.yel, 0.3)}; pointer-events: none;"></div><div style="position: absolute; left: ${pct(xY(+y))}; top: 6px; display: flex; align-items: center; gap: 8px; white-space: nowrap;"><span style="padding: 4px 8px 3px; background: ${C.yel}; font-family: ${F.mono}; font-size: 13px; font-weight: 600; color: ${C.ink};">${a}</span><span style="font-size: 12px; color: ${C.ink2};">${b}</span></div>`;
  });
  let ax = '';
  for (let y = 1993; y <= 2024; y++) { const x = xY(y + 0.5), big = (y % 2 === 1 && y !== 2023) || y === 2024; ax += `<div style="position: absolute; left: ${pct(x)}; top: 0; width: 1px; height: ${big ? 7 : 4}px; background: ${C.rule2};"></div>`; if (big) ax += `<div style="position: absolute; left: ${pct(x)}; top: 10px; transform: translateX(-50%); font-family: ${F.mono}; font-size: 11.5px; color: ${C.cap};">${y}</div>`; }
  const ph = PH.map(p => { const dark = p.c && DARK.has(p.c); return `<div style="position: absolute; left: ${pct(xY(p.a))}; width: ${pct((p.b + 1 - p.a) / SPAN)}; top: 0; bottom: 0; padding: 0 1px; box-sizing: border-box;"><div style="height: 100%; box-sizing: border-box; padding: 7px 10px; ${p.c ? `background: ${p.c}; color: ${dark ? C.card : C.ink};` : `border: 1px dashed ${C.rule2}; color: ${C.cap};`}"><div style="font-family: ${F.serif}; font-size: 15px; font-weight: 700; line-height: 1.3; white-space: nowrap;">${p.n}</div><div style="font-family: ${F.mono}; font-size: 11.5px;">${p.a}–${p.b}</div></div></div>`; }).join('');
  return `<div style="margin-top: 36px; overflow-x: auto; padding-bottom: 8px;"><div style="min-width: 1180px;">
<div style="${G2}"><div style="position: relative; height: ${HT}px;">${labs}</div><div style="position: relative; height: ${HT}px;">${over}${lanes}</div></div>
<div style="${G2}"><div style="font-size: 12px; color: ${C.cap};">年份</div><div style="position: relative; height: 32px; border-top: 1px solid ${C.rule2};">${ax}</div></div>
<div style="${G2} margin-top: 4px;"><div style="font-size: 12px; line-height: 1.5; color: ${C.cap};">节目自己的分期</div><div style="position: relative; height: 52px;">${ph}</div></div>
</div></div>`;
}
function dList() {
  const chip = e => { const cc = evC(e); return `<span style="flex: none; display: inline-flex; align-items: center; gap: 5px; padding: 1px 6px; border: 1px solid ${cc.c}; font-size: 11.5px; line-height: 1.5; color: ${cc.t}; white-space: nowrap;">${gl(cc.g, cc.c, 7)}${LN[e.lane].name}</span>`; };
  const years = [...new Set(EV.map(e => e.y))].sort((a, b) => a - b);
  const cols = PH.map(p => {
    const rows = years.filter(y => y >= p.a && y <= p.b).map(y => {
      const evs = EV.filter(e => e.y === y).sort((a, b) => a.imp - b.imp), has1 = evs.some(e => e.imp === 1);
      const items = evs.map(e => `<div style="display: ${e.imp === 1 ? 'flex' : '{{ evMinorFlex }}'}; align-items: flex-start; gap: 8px; padding: 2px 0;">${chip(e)}<span style="font-size: 14px; line-height: 1.6; color: ${e.imp === 1 ? C.ink : C.muted};">${esc(e.text)}${e.y === 2019 && e.lane === 'coprod' ? `<span style="display: block; color: ${C.co};">${esc(GATE_NOTE)}</span>` : ''}</span></div>`).join('');
      return `<div style="display: ${has1 ? 'grid' : '{{ evMinorGrid }}'}; grid-template-columns: 54px minmax(0, 1fr); gap: 10px; padding: 9px 0; border-top: 1px solid ${C.rule};"><div><span style="font-family: ${F.mono}; font-size: 15px; font-weight: 600; ${YHL[y] ? `background: ${C.yel}; padding: 1px 5px;` : ''}">${y}</span></div><div>${items}</div></div>`;
    }).join('');
    return `<div><div style="padding: 8px 10px; ${p.c ? `background: ${p.c}; color: ${DARK.has(p.c) ? C.card : C.ink};` : `border: 1px dashed ${C.rule2}; color: ${C.cap};`}"><div style="font-family: ${F.serif}; font-size: 18px; font-weight: 700;">${p.n}</div><div style="font-family: ${F.mono}; font-size: 12px;">${p.a}–${p.b}</div></div>${rows}</div>`;
  }).join('');
  return `<p style="${S.cap}">按年份排列，标签是泳道。黄色是三个关键年份：1997（全片提到 27 次）、2003（CEPA）、2013（提到 20 次）。</p><div style="margin-top: 22px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 28px 32px; align-items: start;">${cols}</div>`;
}
function sectionD() {
  return `${secOpen('years', 'D', '二十七年')}${head('D', '二十七年', '二十七年里发生了什么')}
<p style="${S.intro}">横轴从 1993 年画到 2024 年。上面四条泳道，下面铺着节目自己的三段分期：过渡期、本土第一阶段、新本土电影。1993–1996 年是黄金年代的尾声，节目这一期不展开。</p>
<div style="display: {{ wideDisp }};">${dDesktop()}<p style="${S.cap}">年份以节目说法为准。实心标记为主要事件，空心为次要事件，悬停可看全文。“合拍片与北上”泳道上 2019 年的开口闸门，表示合拍片新政取消了演员比例和内地元素的限制。</p></div>
<div style="margin-top: 28px; display: {{ wideDisp }};"><div role="button" onClick="{{ toggleEv }}" style="display: inline-block; ${S.btn}" style-hover="${S.btnH}">{{ evBtn }}</div></div>
<div style="display: {{ evListDisp }};">${dList()}<div style="margin-top: 18px; display: {{ narrowDisp }};"><div role="button" onClick="{{ toggleEv }}" style="display: inline-block; ${S.btn}" style-hover="${S.btnH}">{{ evBtn }}</div></div></div>
</section>`;
}

// ===== E
function smooth(P) { let d = `M ${P[0][0]} ${P[0][1]}`; for (let i = 0; i < P.length - 1; i++) { const p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || p2; d += ` C ${f1(p1[0] + (p2[0] - p0[0]) / 6)} ${f1(p1[1] + (p2[1] - p0[1]) / 6)}, ${f1(p2[0] - (p3[0] - p1[0]) / 6)} ${f1(p2[1] - (p3[1] - p1[1]) / 6)}, ${p2[0]} ${p2[1]}`; } return d; }
function sectionE() {
  const ph = D[6][0], fifth = D[6][1];
  const P = [[0, 62], [60, 52], [125, 66], [190, 48], [250, 60], [280, 118], [315, 152], [365, 100], [415, 160], [465, 104], [515, 150], [560, 126], [615, 192], [690, 204], [760, 196], [825, 206], [880, 152], [940, 104], [1000, 92]];
  const XB = [0, 250, 310, 560, 820, 1000], H = 240;
  let ov = '';
  XB.slice(1, -1).forEach(x => { ov += `<div style="position: absolute; top: 0; bottom: 0; left: ${x / 10}%; border-left: 1px dashed ${C.rule2};"></div>`; });
  ph.forEach((p, i) => { ov += `<div style="position: absolute; top: 6px; left: ${(XB[i] + XB[i + 1]) / 20}%; transform: translateX(-50%); width: 22px; height: 22px; border-radius: 50%; border: 1px solid ${C.ink}; background: ${C.card}; display: flex; align-items: center; justify-content: center; font-family: ${F.mono}; font-size: 12px; font-weight: 600;">${p.phase}</div>`; });
  const mark = (x, y) => `<div style="position: absolute; left: ${x / 10}%; top: ${(y / H * 100).toFixed(2)}%; width: 12px; height: 12px; margin: -6px 0 0 -6px; border-radius: 50%; background: ${C.paper}; border: 2.5px solid ${C.ink}; box-sizing: border-box;"></div>`;
  ov += mark(280, 118) + mark(852, 180);
  ov += `<div style="position: absolute; left: 29.5%; top: 14%; max-width: 26%; font-size: 12.5px; line-height: 1.5;"><span style="font-family: ${F.mono}; font-weight: 600;">1993</span> 拐点：《侏罗纪公园》超过《唐伯虎点秋香》</div>`;
  ov += `<div style="position: absolute; left: 66%; top: 14%; max-width: 22%; font-size: 12.5px; line-height: 1.5; text-align: right;"><span style="font-family: ${F.mono}; font-weight: 600;">2022</span> 拐点：本土片回升</div>`;
  ov += `<div style="position: absolute; left: 10px; top: 36px; font-size: 12px; letter-spacing: 0.1em; color: ${C.l2};">▲ 本土片占上风</div><div style="position: absolute; left: 10px; bottom: 8px; font-size: 12px; letter-spacing: 0.1em; color: ${C.cap};">▼ 好莱坞占上风</div><div style="position: absolute; right: 8px; bottom: 8px; padding: 2px 8px; border: 1px solid ${C.ink}; background: ${C.card}; font-size: 12px;">示意，非票房数据</div>`;
  const chart = `<div style="position: relative; height: ${H}px; border: 1px solid ${C.ink}; background: linear-gradient(180deg, ${rgba(C.l2, 0.07)} 50%, ${rgba(C.neu, 0.2)} 50%);"><svg viewBox="0 0 1000 ${H}" preserveAspectRatio="none" style="position: absolute; inset: 0; width: 100%; height: 100%;"><line x1="0" y1="${H / 2}" x2="1000" y2="${H / 2}" stroke="${C.ink}" strokeOpacity="0.35" strokeDasharray="4 4" vectorEffect="non-scaling-stroke"></line><path d="${smooth(P)}" fill="none" stroke="${C.ink}" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeLinejoin="round"></path></svg>${ov}</div>`;
  const cards = ph.map(p => `<div style="padding-top: 10px; border-top: 2px solid ${p.who_leads === '本土片' || p.who_leads === '本土片回升' ? C.l2 : p.who_leads === '好莱坞' ? C.faint : C.ink};"><div style="display: flex; align-items: baseline; gap: 8px;"><span style="font-family: ${F.mono}; font-size: 12px; font-weight: 600;">${p.phase}</span><span style="font-family: ${F.mono}; font-size: 12.5px; color: ${C.cap};">${esc(p.period)}</span></div><div style="margin-top: 4px; font-family: ${F.serif}; font-size: 17px; font-weight: 700;">${esc(p.who_leads)}</div><div style="margin-top: 4px; font-size: 13.5px; line-height: 1.7; color: ${C.ink2}; text-wrap: pretty;">${esc(p.note)}</div></div>`).join('');
  const pict = (n, fill, col) => `<div style="display: flex; gap: 3px;">${Array.from({ length: n }, (_, i) => `<span style="width: 20px; height: 20px; box-sizing: border-box; ${i < fill ? `background: ${col};` : `border: 1px solid ${C.rule2}; background: ${C.card};`}"></span>`).join('')}</div>`;
  const fr = [[fifth[0], 5, C.l2], [fifth[1], 3, C.ink], [fifth[2], 10, C.ink]];
  const side = `<div style="flex: 0 1 360px; min-width: 0;">${sub('五分之一', '观影人次占人口的比例')}${fr.map(([r, n, col]) => `<div style="padding: 14px 0; border-bottom: 1px solid ${C.rule};"><div style="display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 10px;"><span style="font-family: ${F.serif}; font-size: 15px; font-weight: 700;">${esc(r.film)}</span><span style="font-size: 12.5px; color: ${C.cap};">${esc(r.place)}</span></div><div style="margin-top: 8px; display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px;">${pict(n, 1, col)}<span style="font-family: ${F.serif}; font-size: 16px; font-weight: 700; color: ${col};">${esc(r.share_of_population)}</span></div><div style="margin-top: 6px; font-size: 13px; line-height: 1.6; color: ${C.ink2};">${esc(r.note)}</div></div>`).join('')}<p style="${S.cap}">方格只表示分母：五格一格、三格一格、十格一格。“一成多一点”按一格画。</p></div>`;
  return `${secOpen('lead', 'E', '谁唱主角')}${head('E', '谁唱主角', '本土片和好莱坞在香港影院里的消长')}
<p style="${S.intro}">节目把本土片和好莱坞在香港影院里的关系分成五个阶段。线的高低只表示谁占上风，没有精确数值。</p>
<div style="margin-top: 36px; display: flex; flex-wrap: wrap; gap: 40px 48px; align-items: flex-start;"><div style="flex: 1 1 640px; min-width: 0;">${chart}<div style="margin-top: 22px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr)); gap: 20px 22px;">${cards}</div><div style="margin-top: 32px; max-width: 720px;">${quote('不是因为拍得更好，起作用的是社会情绪。', '节目对 2022 年以后本土片回升的解释')}</div></div>${side}</div>
</section>`;
}

// ===== F
function sectionF() {
  const d7 = D[7][0];
  const bg = l => l === 3 ? `background: ${C.ink}; color: ${C.paper};` : l === 2 ? `background: rgba(26,28,30,0.2); color: ${C.ink};` : l === 1 ? `background: rgba(26,28,30,0.06); color: ${C.ink};` : `border: 1px dashed ${C.rule2}; color: ${C.cap};`;
  const lvName = { 3: '最强', 2: '强／有', 1: '变弱' };
  let g = `<div></div>${d7.attributes.map(a => `<div style="padding: 0 4px 10px; font-family: ${F.serif}; font-size: 16px; font-weight: 700;">${a}</div>`).join('')}`;
  d7.periods.forEach(p => {
    g += `<div style="padding: 12px 10px 12px 0; border-top: 1px solid ${C.ink}; font-family: ${F.serif}; font-size: 15px; font-weight: 700; line-height: 1.4;">${esc(p.period)}</div>`;
    p.cells.forEach(c => { g += `<div style="margin-top: 4px; padding: 10px 11px; box-sizing: border-box; min-height: 74px; ${bg(c.level)} font-size: 13px; line-height: 1.6; text-wrap: pretty;">${c.level ? `<div style="font-family: ${F.mono}; font-size: 11px; opacity: 0.8;">${lvName[c.level]}</div>` : ''}${c.note ? esc(c.note) : (c.level ? '' : '<span style="opacity: 0.7;">节目没有说</span>')}</div>`; });
  });
  const leg = [3, 2, 1, null].map(l => `<span style="display: inline-flex; align-items: center; gap: 7px;"><span style="width: 22px; height: 14px; box-sizing: border-box; ${bg(l)}"></span>${l ? lvName[l] : '节目没有说'}</span>`).join('');
  return `${secOpen('five', 'F', '五重属性')}${head('F', '五重属性', '港片在不同年代靠哪一重属性')}
<p style="${S.intro}">节目借用学者的说法，把香港电影的属性拆成五重：本土性、广东性、中国性、亚洲性、世界性。每个年代靠的那一重不一样。</p>
<div style="margin-top: 32px; overflow-x: auto; padding-bottom: 6px;"><div style="min-width: 820px; display: grid; grid-template-columns: 130px repeat(5, minmax(0, 1fr)); column-gap: 4px;">${g}</div></div>
<div style="margin-top: 16px; display: flex; flex-wrap: wrap; gap: 8px 20px; font-size: 12.5px; color: ${C.cap};">${leg}<span>深浅为整理者所加，按节目的措辞分档</span></div>
<div style="margin-top: 32px; max-width: 640px;">${quote('本土性是螺旋上升的。', '节目')}</div>
</section>`;
}

// ===== G
function sectionG() {
  const d8 = D[8][0];
  const disc = s => `<span style="flex: none; width: ${s}px; height: ${s}px; border-radius: 50%; box-sizing: border-box; border: 2px solid ${C.tr}; background: radial-gradient(circle, ${C.paper} 0 ${s * 0.09}px, ${C.tr} ${s * 0.09}px ${s * 0.14}px, transparent ${s * 0.14}px), repeating-radial-gradient(circle, ${rgba(C.tr, 0.5)} 0 1px, transparent 1px 4px), ${C.card};"></span>`;
  const item = t => { const i = t.indexOf('：'); return `<div style="padding: 10px 0; border-top: 1px solid ${C.rule}; font-size: 14px; line-height: 1.7; color: ${C.ink2}; text-wrap: pretty;">${i > 0 ? `<span style="font-weight: 600; color: ${C.ink};">${esc(t.slice(0, i))}</span>　${esc(t.slice(i + 1))}` : esc(t)}</div>`; };
  const cols = d8.branches.map((b, bi) => `<div style="min-width: 0;"><div style="padding: 10px 14px; background: ${C.tr}; color: ${C.card}; font-family: ${F.serif}; font-size: 17px; font-weight: 700;">${esc(b.name)}</div><div style="padding: 0 2px;">${b.items.map(item).join('')}</div>${bi === 0 ? `<div style="margin: 6px 0 0; text-align: center; font-size: 18px; color: ${C.tr};">↓</div><div style="margin-top: 6px; padding: 14px 16px; border: 2px solid ${C.tr}; background: ${C.card};"><div style="font-family: ${F.serif}; font-size: 34px; font-weight: 900; line-height: 1.1; color: ${C.tr};">约七成</div><div style="margin-top: 6px; font-size: 14px; line-height: 1.7;">${esc(d8.result)}</div></div>` : ''}</div>`).join('');
  const cc = 'calc((100% - 48px) / 6)';
  const conn = `<div style="display: {{ wideDisp }}; position: relative; height: 32px;"><div style="position: absolute; left: 50%; top: 0; height: 16px; border-left: 1.5px solid ${C.tr};"></div><div style="position: absolute; left: ${cc}; right: ${cc}; top: 16px; border-top: 1.5px solid ${C.tr};"></div><div style="position: absolute; left: ${cc}; top: 16px; height: 16px; border-left: 1.5px solid ${C.tr};"></div><div style="position: absolute; left: 50%; top: 16px; height: 16px; border-left: 1.5px solid ${C.tr};"></div><div style="position: absolute; right: ${cc}; top: 16px; height: 16px; border-left: 1.5px solid ${C.tr};"></div></div>`;
  return `${secOpen('survive', 'G', '为卖碟拍电影')}${head('G', '为卖碟拍电影', '没有海外市场，钱从哪来')}
<p style="${S.intro}">过渡期的港片丢了海外市场。节目把它找活路的办法分成三条：往下游找、往上游找、往外走。</p>
<div style="margin-top: 32px; display: flex; flex-wrap: wrap; align-items: center; gap: 16px 22px; padding: 18px 22px; border: 1px solid ${C.ink}; background: ${C.card};">${disc(76)}<div style="flex: 1 1 400px; min-width: 0;"><div style="font-size: 12px; letter-spacing: 0.16em; color: ${C.tr};">源头</div><div style="margin-top: 4px; font-family: ${F.serif}; font-size: 20px; font-weight: 700; line-height: 1.55; text-wrap: pretty;">${esc(d8.cause)}</div></div></div>
${conn}
<div style="margin-top: {{ gConnGap }}; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 28px 24px; align-items: start;">${cols}</div>
<div style="margin-top: 44px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 28px 32px; align-items: start;">
<div>${quote('前流媒体时代的流媒体电影。', '一位主持人对过渡期港片的概括')}</div>
<div style="padding: 16px 18px; border: 1px solid ${C.ink}; background: ${C.card}; display: flex; gap: 16px; align-items: flex-start;">${poster('《无间道》', '84px')}<div style="min-width: 0;"><div style="display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 12px;"><span style="font-family: ${F.serif}; font-size: 22px; font-weight: 700;">${esc(d8.peak.film)}</span><span style="font-family: ${F.mono}; font-size: 13px; color: ${C.cap};">成本${esc(d8.peak.cost)}</span></div><div style="margin-top: 8px;">${who('节目认为')}</div><div style="margin-top: 6px; font-size: 14px; line-height: 1.75; color: ${C.ink2}; text-wrap: pretty;">${esc(d8.peak.view)}</div></div></div>
<div style="padding: 16px 18px; border: 1.5px dashed ${C.ink};"><div style="font-size: 12px; letter-spacing: 0.16em; color: ${C.cap};">如果合拍片晚来五年</div><div style="margin-top: 8px; font-size: 14.5px; line-height: 1.75; color: ${C.ink2}; text-wrap: pretty;">${esc(d8.what_if)}</div></div>
</div>
</section>`;
}

// ===== H
function sectionH() {
  const d9 = D[9][0], [pure, co] = d9.legs;
  const li = (t, c) => `<li style="padding: 8px 0; border-top: 1px solid ${C.rule}; font-size: 14px; line-height: 1.7; color: ${c}; text-wrap: pretty;">${esc(t)}</li>`;
  const left = `<div style="padding: 18px 20px; border: 1.5px dashed ${C.faint}; color: ${C.muted};"><div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px;"><span style="font-family: ${F.serif}; font-size: 24px; font-weight: 700; color: ${C.muted};">${pure.name}</span><span style="padding: 2px 8px; border: 1px solid ${C.faint}; font-size: 12.5px; text-decoration: line-through;">${pure.outcome}</span></div><div style="margin-top: 8px; font-size: 14.5px; line-height: 1.7;">${esc(pure.rule)}</div><div style="margin-top: 14px; display: flex; align-items: baseline; gap: 10px;"><span style="font-family: ${F.mono}; font-size: 30px; font-weight: 600; color: ${C.muted};">13% → 25%</span><span style="font-size: 12.5px;">作为引进片的分账</span></div><ul style="margin: 14px 0 0; padding: 0; list-style: none;">${pure.why.map(t => li(t, C.muted)).join('')}</ul></div>`;
  const right = `<div style="padding: 18px 20px; border: 2px solid ${C.co}; background: ${C.card};"><div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px;"><span style="font-family: ${F.serif}; font-size: 24px; font-weight: 700; color: ${C.co};">${co.name}</span><span style="padding: 2px 8px; background: ${C.co}; color: ${C.card}; font-size: 12.5px;">${co.outcome}</span></div><div style="margin-top: 8px; font-size: 14.5px; line-height: 1.7; color: ${C.ink2};">${esc(co.rule)}</div><div style="margin-top: 14px; display: flex; align-items: baseline; gap: 10px;"><span style="font-family: ${F.serif}; font-size: 24px; font-weight: 700; color: ${C.co};">国产片待遇</span><span style="font-size: 12.5px; color: ${C.cap};">节目没有给出具体比例</span></div><ul style="margin: 14px 0 0; padding: 0; list-style: none;">${co.why.map(t => li(t, C.ink2)).join('')}</ul><div style="margin-top: 14px; padding: 12px 14px; background: ${C.co}; color: ${C.card}; font-family: ${F.serif}; font-size: 17px; font-weight: 700; line-height: 1.5;">新埠片：一个新市场，最后成了唯一的市场</div></div>`;
  const cc = 'calc((100% - 32px) / 4)';
  const conn = `<div style="display: {{ wideDisp }}; position: relative; height: 34px;"><div style="position: absolute; left: 50%; top: 0; height: 17px; border-left: 2px solid ${C.ink};"></div><div style="position: absolute; left: ${cc}; right: 50%; top: 17px; border-top: 2px dashed ${C.faint};"></div><div style="position: absolute; left: 50%; right: ${cc}; top: 17px; border-top: 2px solid ${C.co};"></div><div style="position: absolute; left: ${cc}; top: 17px; height: 17px; border-left: 2px dashed ${C.faint};"></div><div style="position: absolute; right: ${cc}; top: 17px; height: 17px; border-left: 2px solid ${C.co};"></div></div>`;
  const steps = d9.approval_steps;
  const REV = { 2: '审剧本 ①', 3: '审剧本 ②', 6: '审成片 ①', 7: '审成片 ②' };
  const box = (t, i) => { const k = t.indexOf('：'), rv = REV[i]; const h = k > 0 ? t.slice(0, k) : t, s = k > 0 ? t.slice(k + 1) : ''; const p = h.indexOf('（'); const hh = p > 0 ? h.slice(0, p) : h, ss = p > 0 ? h.slice(p + 1, -1) : s;
    return `<div style="flex: 1 1 128px; min-width: 120px; max-width: 180px; padding: 10px 12px; box-sizing: border-box; border: 1px solid ${C.ink}; ${rv ? `border-top: 5px solid ${C.co};` : ''} background: ${i === 0 ? 'transparent' : C.card};"><div style="display: flex; justify-content: space-between; gap: 6px; font-family: ${F.mono}; font-size: 11.5px; color: ${C.cap};"><span>${i === 0 ? '起点' : String(i).padStart(2, '0')}</span>${rv ? `<span style="color: ${C.co}; font-family: ${F.sans}; font-weight: 600;">${rv}</span>` : ''}</div><div style="margin-top: 6px; font-family: ${F.serif}; font-size: 14.5px; font-weight: 700; line-height: 1.45;">${esc(hh)}</div>${ss ? `<div style="margin-top: 4px; font-size: 12.5px; line-height: 1.55; color: ${C.ink2};">${esc(ss)}</div>` : ''}</div>`; };
  const flow = steps.map((t, i) => box(t, i)).join(`<span style="align-self: center; color: ${C.faint}; font-size: 16px;">→</span>`);
  return `${secOpen('legs', 'H', '两条腿')}${head('H', '两条腿', '合拍片为什么成了唯一的路')}
<p style="${S.intro}">CEPA 给港片开了两条路。节目的说法是，纯港片这条腿没走通，合拍片这条腿越走越粗，最后成了唯一的路。</p>
<div style="margin-top: 32px; display: flex; justify-content: center;"><div style="padding: 10px 18px; border: 2px solid ${C.ink}; background: ${C.card}; text-align: center;"><div style="font-family: ${F.mono}; font-size: 13px; font-weight: 600;">2003</div><div style="font-family: ${F.serif}; font-size: 18px; font-weight: 700;">CEPA 签署，电影被加进协议</div></div></div>
${conn}
<div style="margin-top: {{ gConnGap }}; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr)); gap: 24px 32px; align-items: start;">${left}${right}</div>
<div style="margin-top: 52px;">${sub('合拍片的审批流程', '一般国产片只需梗概备案；合拍片开拍前要交完整剧本')}</div>
<div style="margin-top: 18px; display: flex; flex-wrap: wrap; gap: 10px 8px;">${flow}</div>
<div style="margin-top: 16px; display: flex; flex-wrap: wrap; align-items: center; gap: 8px 18px; font-size: 13.5px; color: ${C.ink2};"><span style="display: inline-flex; align-items: center; gap: 8px;"><span style="width: 24px; height: 5px; background: ${C.co};"></span>两次审剧本、两次审成片</span><span style="font-family: ${F.serif}; font-weight: 700;">徐克称之为“三重审查”</span></div>
<ul style="margin: 18px 0 0; padding: 0; list-style: none; max-width: 860px;">${d9.notes.filter(n => !/三重审查|梗概备案/.test(n)).map(t => li(t, C.ink2)).join('')}</ul>
</section>`;
}

// ===== I
function sectionI() {
  const d10 = D[10][0];
  const card = (p, i) => { const one = p.program_view.startsWith('一位主持人说'); const v = one ? p.program_view.replace(/^一位主持人说/, '') : p.program_view;
    return `<div style="min-width: 0; border: 1px solid ${C.ink}; background: ${C.card};"><div style="display: flex; justify-content: space-between; align-items: center; height: 34px; padding: 0 12px; ${p.wave === '1' ? `background: ${C.co}; color: ${C.card};` : `background: repeating-linear-gradient(135deg, ${rgba(C.co, 0.16)} 0 4px, transparent 4px 8px), ${C.card}; color: ${C.co}; border-bottom: 1px solid ${C.co};`} ${notch('34px', 7)} font-size: 11.5px; letter-spacing: 0.14em;"><span>北上 · ${p.wave === '1' ? '第一批' : '第二批'}</span><span style="font-family: ${F.mono}; letter-spacing: 0.04em;">No. ${String(i + 1).padStart(2, '0')}</span></div><div style="padding: 12px 14px 16px;"><div style="display: flex; gap: 12px; align-items: flex-end;">${photo(p.name, 54, 68)}<div style="font-family: ${F.serif}; font-size: 22px; font-weight: 700; line-height: 1.3;">${esc(p.name)}</div></div><div style="margin-top: 10px; font-size: 13.5px; line-height: 1.7; color: ${C.ink2}; text-wrap: pretty;">${esc(p.how)}</div><div style="margin: 10px 0 8px; border-top: 1px dashed ${C.rule2};"></div>${who(one ? '一位主持人认为' : '节目认为')}<div style="margin-top: 6px; font-size: 13.5px; line-height: 1.7; color: ${C.ink}; text-wrap: pretty;">${esc(v)}</div></div></div>`; };
  const w1 = d10.filter(p => p.wave === '1'), w2 = d10.filter(p => p.wave === '2');
  const grid = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr)); gap: 14px;';
  const rowHead = (t, s) => `<div style="display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 12px; margin-bottom: 12px;"><span style="font-family: ${F.serif}; font-size: 17px; font-weight: 700;">${t}</span><span style="font-size: 13px; color: ${C.cap};">${s}</span></div>`;
  return `${secOpen('north', 'I', '北上的人')}${head('I', '北上的人', '谁去了，什么时候，后来怎样')}
<p style="${S.intro}">节目按北上的早晚把这批导演分成两拨：CEPA 一出就北上的，和观望几年才去、或者两头跑的。</p>
<div style="margin-top: 30px; display: flex; align-items: center; gap: 12px; font-size: 12.5px; letter-spacing: 0.1em; color: ${C.cap};"><span>早</span><span style="flex: 1; height: 0; border-top: 2px solid ${C.co}; position: relative;"><span style="position: absolute; right: -2px; top: -7px; width: 0; height: 0; border-left: 10px solid ${C.co}; border-top: 6px solid transparent; border-bottom: 6px solid transparent;"></span></span><span>晚</span><span style="letter-spacing: 0;">（轴不精确到年）</span></div>
<div style="margin-top: 22px;">${rowHead('第一批', 'CEPA 一出就北上')}<div style="${grid}">${w1.map((p, i) => card(p, i)).join('')}</div></div>
<div style="margin-top: 30px; padding-left: {{ iOffset }};">${rowHead('第二批', '观望几年后北上，或者两头跑')}<div style="${grid}">${w2.map((p, i) => card(p, i + w1.length)).join('')}</div></div>
<div style="margin-top: 44px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr)); gap: 28px 40px; align-items: start;"><div>${quote('合拍片给了香港电影人一次吃二十年老本的机会。', '节目')}</div><div style="display: flex; gap: 18px; align-items: flex-start; padding-top: 18px; border-top: 1px solid ${C.ink};"><span style="font-family: ${F.serif}; font-size: 76px; font-weight: 900; line-height: 0.9; color: ${C.co};">1</span><div><div style="font-family: ${F.serif}; font-size: 18px; font-weight: 700; line-height: 1.5;">合拍片二十年造出来的香港明星，只有余文乐一个。</div><div style="margin-top: 6px; font-size: 13.5px; line-height: 1.7; color: ${C.ink2};">节目说，评价一个电影产业健不健康，看它能不能造星。</div></div></div></div>
</section>`;
}

// ===== N
function sectionN() {
  const d11 = D[11][0];
  const cards = d11.map(g => `<div style="min-width: 0; padding: 14px 16px 16px; background: ${C.card}; border: 1px solid ${C.ink}; border-top: 5px solid ${C.l1};"><div style="display: flex; align-items: center; gap: 8px;">${gl('di', C.l1, 11)}<span style="font-family: ${F.serif}; font-size: 20px; font-weight: 700;">${esc(g.genre)}</span></div><div style="margin-top: 8px; font-size: 13.5px; line-height: 1.7; color: ${C.ink2}; text-wrap: pretty;">${esc(g.examples)}</div><div style="margin: 10px 0 8px; border-top: 1px dashed ${C.rule2};"></div>${who('节目认为')}<div style="margin-top: 6px; font-size: 14px; line-height: 1.7; text-wrap: pretty;">${esc(g.program_view)}</div></div>`).join('');
  const tl = [['2003', '自由行开放'], ['2006–2007', '反对拆迁天星码头、皇后码头；2007 年夏天对峙三个月'], ['2008', '《文雀》'], ['2010', '《打擂台》获金像奖最佳电影']];
  const rail = `<div style="position: relative; margin-top: 26px;"><div style="height: 18px; background: repeating-linear-gradient(90deg, ${C.ink2} 0 2px, transparent 2px 22px) 0 4px / 100% 14px no-repeat; border-top: 3px solid ${C.ink2}; border-bottom: 1.5px solid ${C.ink2};"></div><div style="margin-top: 14px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr)); gap: 18px 20px;">${tl.map(([y, t]) => `<div><div style="display: flex; align-items: flex-end; gap: 8px;"><span style="width: 14px; height: 20px; border-radius: 7px 7px 2px 2px; background: ${C.ctx};"></span><span style="font-family: ${F.mono}; font-size: 15px; font-weight: 600;">${y}</span></div><div style="margin-top: 6px; font-size: 14px; line-height: 1.65; color: ${C.ink2}; text-wrap: pretty;">${esc(t)}</div></div>`).join('')}</div></div>`;
  return `${secOpen('genres', 'N', '过不了审的类型')}${head('N', '过不了审的类型', '留在本土的人拍什么')}
<p style="${S.intro}">本土电影的第一阶段（2004–2012），留在香港的人主要拍四类片子。</p>
<div style="margin-top: 30px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); gap: 16px;">${cards}</div>
<div style="${S.lead}">这几个类型，恰好就是很难通过内地审查的类型。<span style="font-family: ${F.sans}; font-size: 14px; font-weight: 400; color: ${C.cap};">　—— 节目的结论</span></div>
<div style="margin-top: 52px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr)); gap: 32px 48px; align-items: start;">
<div>${sub('保育运动', '同一时期，本土意识在电影之外抬头')}${rail}</div>
<div>${quote('在香港，一切的保质期都不超过 50 年。', '一位主持人')}<div style="margin-top: 20px; display: flex; gap: 16px; align-items: baseline;"><span style="font-family: ${F.serif}; font-size: 48px; font-weight: 900; line-height: 1; color: ${C.ctx};">48 年</span><span style="font-size: 14px; line-height: 1.7; color: ${C.ink2};">天星码头被拆时的“年龄”，不到 50 年，不算古迹（节目转述）</span></div></div>
</div>
</section>`;
}

// ===== L
function sectionL() {
  const d12 = D[12][0], names = ['许鞍华', '邱礼涛', '彭浩翔'];
  const qt = `<div style="padding: 12px 14px; background: ${C.card}; border: 1px solid ${C.ink};"><div style="font-family: ${F.serif}; font-size: 17px; font-weight: 700; line-height: 1.55;">“不想拍让中产阶级观众感到舒服的电影。”</div><div style="margin-top: 4px; font-size: 12.5px; color: ${C.cap};">—— 一位主持人对邱礼涛的概括</div></div>`;
  const rl = r => r.row === '节目的总评' ? `${r.row}<div style="margin-top: 4px; font-family: ${F.sans}; font-size: 11.5px; font-weight: 400; color: ${C.cap};">主持人的个人看法</div>` : r.row;
  let g = `<div></div><div></div><div>${qt}</div><div></div>`;
  g += `<div></div>${names.map(n => `<div style="padding: 14px 0 10px; display: flex; align-items: center; gap: 10px; border-bottom: 3px solid ${C.l1};">${photo(n, 60, 60)}${gl('di', C.l1, 12)}<span style="font-family: ${F.serif}; font-size: 24px; font-weight: 700;">${n}</span></div>`).join('')}`;
  d12.forEach(r => { g += `<div style="padding: 12px 10px 12px 0; border-top: 1px solid ${C.rule2}; font-family: ${F.serif}; font-size: 14.5px; font-weight: 700; line-height: 1.4;">${rl(r)}</div>${names.map(n => `<div style="padding: 12px 0; border-top: 1px solid ${C.rule2}; font-size: 14.5px; line-height: 1.75; color: ${r.row === '节目的总评' ? C.ink : C.ink2}; ${r.row === '节目讨论的作品' ? `font-family: ${F.serif};` : ''} text-wrap: pretty;">${esc(r[n])}</div>`).join('')}`; });
  const narrow = names.map(n => `<div style="margin-top: 22px; border-top: 3px solid ${C.l1};"><div style="padding: 10px 0 4px; display: flex; align-items: center; gap: 10px;">${photo(n, 52, 52)}${gl('di', C.l1, 12)}<span style="font-family: ${F.serif}; font-size: 22px; font-weight: 700;">${n}</span></div>${n === '邱礼涛' ? `<div style="margin: 8px 0;">${qt}</div>` : ''}${d12.map(r => `<div style="padding: 9px 0; border-top: 1px solid ${C.rule};"><div style="font-size: 12px; color: ${C.cap};">${r.row}${r.row === '节目的总评' ? '（主持人的个人看法）' : ''}</div><div style="margin-top: 2px; font-size: 14.5px; line-height: 1.7;">${esc(r[n])}</div></div>`).join('')}</div>`).join('');
  return `${secOpen('three', 'L', '三种姿态')}${head('L', '三种姿态', '第一阶段的三种本土姿态')}
<p style="${S.intro}">2008 年前后，社会问题意识在港片里抬头。节目把第一阶段最重要的三位本土导演放在一起比较。</p>
<div style="display: {{ wideDisp }}; margin-top: 30px;"><div style="display: grid; grid-template-columns: 150px repeat(3, minmax(0, 1fr)); column-gap: 28px;">${g}</div></div>
<div style="display: {{ narrowDisp }}; margin-top: 10px;">${narrow}</div>
</section>`;
}

// ===== M
function sectionM() {
  const d20 = D[20][0].map(r => ({ ...r, v: +r.amount_wan_hkd })).sort((a, b) => a.v - b.v), d13 = D[13][0];
  const L0 = Math.log10(30), L1v = Math.log10(42000), pos = v => (Math.log10(v) - L0) / (L1v - L0);
  const fmt = v => v >= 10000 ? (v / 10000) + ' 亿' : v + ' 万';
  const TY = { film: ['ci', C.ctx, false, '影片成本'], rule: ['sq', C.ink, false, '资助规则'], estimate: ['di', C.ctx, true, '预算、归纳或传闻'] };
  const ticks = [50, 100, 200, 500, 1000, 2000, 5000, 10000, 30000];
  const grid = ticks.map(v => `<div style="position: absolute; top: 0; bottom: 0; left: ${pct(pos(v))}; border-left: 1px ${v === 1000 ? `solid ${C.ink}` : `dotted ${C.rule2}`};"></div>`).join('');
  const rows = d20.map(r => { const [g, c, h, ] = TY[r.type], x = pos(r.v), lab = r.item === '《风林火山》' ? '约 3 亿，未说币种' : fmt(r.v);
    return `<div style="display: grid; grid-template-columns: {{ mLabW }} minmax(0, 1fr); column-gap: 14px; align-items: center; min-height: 34px; border-top: 1px solid ${C.rule};"><div style="padding: 5px 0;"><div style="font-family: ${/《/.test(r.item) ? F.serif : F.sans}; font-size: 14px; font-weight: ${/《/.test(r.item) ? 700 : 500}; line-height: 1.4;">${esc(r.item)}</div>${r.note ? `<div style="font-size: 11.5px; line-height: 1.45; color: ${C.cap};">${esc(r.note)}</div>` : ''}</div><div style="position: relative; align-self: stretch;">${grid}<div style="position: absolute; left: 0; width: ${pct(x)}; top: 50%; border-top: 1px solid ${rgba(C.ctx, 0.35)};"></div><div style="position: absolute; left: ${pct(x)}; top: 50%; transform: translate(-50%, -50%); display: flex;">${gl(g, c, 13, h)}</div><div style="position: absolute; ${x > 0.82 ? `right: ${pct(1 - x + 0.02)}` : `left: calc(${pct(x)} + 12px)`}; top: 50%; transform: translateY(-50%); font-family: ${F.mono}; font-size: 12px; white-space: nowrap; color: ${C.ink};">${lab}</div></div></div>`; }).join('');
  const axis = `<div style="display: grid; grid-template-columns: {{ mLabW }} minmax(0, 1fr); column-gap: 14px;"><div style="font-size: 11.5px; color: ${C.cap};">万港币，对数轴</div><div style="position: relative; height: 30px; border-top: 1px solid ${C.ink};">${ticks.map(v => `<div style="position: absolute; left: ${pct(pos(v))}; top: 6px; transform: translateX(-50%); font-family: ${F.mono}; font-size: 11.5px; color: ${v === 1000 ? C.ink : C.cap}; white-space: nowrap;">${fmt(v)}</div>`).join('')}</div></div>`;
  const top = `<div style="display: grid; grid-template-columns: {{ mLabW }} minmax(0, 1fr); column-gap: 14px;"><div></div><div style="position: relative; height: 40px;"><div style="position: absolute; left: ${pct(pos(1000))}; bottom: 4px; transform: translateX(-50%); padding: 3px 8px; background: ${C.ink}; color: ${C.paper}; font-size: 12px; white-space: nowrap;">1000 万：节目说今天本土片的上限</div></div></div>`;
  const leg = Object.values(TY).map(([g, c, h, n]) => `<span style="display: inline-flex; align-items: center; gap: 7px;">${gl(g, c, 12, h)}${n}</span>`).join('');
  const fields = [['start', '起点'], ['rule', '规则'], ['later', '后来'], ['alumni', '出过的片或人']];
  const cards = d13.map(r => `<div style="min-width: 0; border: 1px solid ${C.ink}; background: ${C.card};"><div style="padding: 10px 14px; background: ${C.ctx}; color: ${C.card}; display: flex; align-items: center; gap: 8px;">${gl('hx', C.card, 11)}<span style="font-family: ${F.serif}; font-size: 18px; font-weight: 700;">${esc(r.name)}</span></div><div style="padding: 4px 14px 12px;">${fields.map(([k, n]) => `<div style="display: grid; grid-template-columns: 52px minmax(0, 1fr); gap: 10px; padding: 8px 0; border-bottom: 1px solid ${C.rule};"><span style="font-size: 12px; color: ${C.cap}; line-height: 1.7;">${n}</span><span style="font-size: 13.5px; line-height: 1.7; ${k === 'alumni' ? `font-family: ${F.serif};` : ''} text-wrap: pretty;">${esc(r[k])}</span></div>`).join('')}</div></div>`).join('');
  return `${secOpen('money', 'M', '钱从哪来')}${head('M', '钱从哪来', '本土片要多少钱，谁给')}
<p style="${S.intro}">节目里提到的成本从 50 万到 3 亿港币，跨了将近三个数量级，所以用对数轴。今天的本土片大多挤在 1000 万以下，钱主要来自政府的三项资助。</p>
<div style="margin-top: 18px; display: flex; flex-wrap: wrap; gap: 8px 20px; font-size: 13px; color: ${C.ink2};">${leg}</div>
<div style="margin-top: 12px;">${top}${rows}${axis}</div>
<p style="${S.cap}">这些数字出自不同年代，没有换算通胀。单位是万港币；《风林火山》节目说“听说三个亿”，没有说币种。</p>
<div style="margin-top: 48px;">${sub('三项资助', '')}</div>
<div style="margin-top: 18px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 18px;">${cards}</div>
<div style="margin-top: 16px; font-size: 14px; line-height: 1.7; color: ${C.ink2};">另外，节目说明星（不到巨星）基本免费出演。</div>
</section>`;
}

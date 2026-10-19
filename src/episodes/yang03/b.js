// ===== D ladder
function sectionD() {
  const W = 1296, s = 9.5, GAP = 8, o = 120;
  const [wk, wx] = D[5];
  const Wk = id => wk.find(r => r.id === id);
  const X = Object.fromEntries(wx.map(r => [r.id, r]));
  const STEP = { 1: '个人成长', 2: '两性与婚姻', 3: '城市生活', 4: '历史与政治', 5: '文化底色', 6: '综合' };
  const sc = k => k <= 3 ? C.t80 : k === 4 ? C.gl : C.o90;
  const A = { 6: W, 5: W - o, 4: W - 2 * o, 3: W - 3 * o, 2.5: W - 3.5 * o, 2: W - 4 * o, 1: W - 5 * o, 0: W - 6 * o };
  const ROWS = [[6, ['w09'], null], [5, ['w07', 'w08'], 6], [4, ['w06'], 5], [3, ['w05'], 4], [2.5, ['w04'], 3], [2, ['w03'], 2.5], [1, ['w01', 'w02'], 2]];
  const slabBg = k => k === 4 ? C.gl : k >= 5 ? `repeating-linear-gradient(45deg, ${rgba(C.o90, 0.28)} 0 2px, ${rgba(C.o90, 0.1)} 2px 9px)` : `repeating-linear-gradient(135deg, ${rgba(C.t80, 0.28)} 0 2px, ${rgba(C.t80, 0.1)} 2px 9px)`;
  const vb = w => w.verdict_by === '节目' ? '节目认为' : '一位主持人认为';
  const srcChip = (w, dk) => w.year_source === '推算' ? `<span title="从节目的话推算" style="padding: 0 5px; border: 1px dashed ${dk ? DK.rule2 : C.ink2}; font-size: 11px; line-height: 1.55; white-space: nowrap;">推算</span>` : w.year_source === '通行' ? `<span title="节目没说，按通行记载" style="padding: 0 5px; border: 1px dotted ${dk ? DK.fg : C.ink2}; font-size: 11px; line-height: 1.55; white-space: nowrap;">通行记载</span>` : '';
  function card(w, mob) {
    const g = w.group, dk = g === 'guling', cat = CAT[g], m = +w.minutes;
    const sb = dk ? DK.sub : C.cap;
    return `<div style="${mob ? '' : `flex: ${m} 1 0px; `}min-width: 0; box-sizing: border-box; padding: ${dk ? '16px 18px 18px' : '11px 11px 12px'}; background: ${dk ? C.gl : C.card}; color: ${dk ? DK.fg : C.ink}; border: 1px solid ${dk ? C.gl : C.ink}; ${dk ? '' : `border-top: 4px solid ${cat.c};`} display: flex; flex-direction: column; gap: 6px;">
${mob ? `<div style="height: 6px; width: ${pct(m / 94.3)}; background: ${dk ? DK.fg : cat.c};"></div>` : ''}<div style="display: flex; flex-wrap: wrap; gap: 8px 12px; align-items: flex-end;">${poster(WKEY[w.id], w.title, dk ? '96px' : '56px', dk ? `box-shadow: 0 0 0 1px ${DK.rule2};` : '')}<div style="flex: 1 1 90px; min-width: 0; font-family: ${F.serif}; font-size: ${dk ? 24 : 16.5}px; font-weight: 700; line-height: 1.35; text-wrap: pretty;">${esc(w.title)}</div></div>
<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 4px 8px;">${dk ? gl('di', DK.fg, 9) : glc(g, 9, C.card)}<span style="font-family: ${F.mono}; font-size: 13px; font-weight: 600;">${w.year}</span>${srcChip(w, dk)}</div>
<div style="font-family: ${F.mono}; font-size: ${dk ? 15 : 12}px; ${dk ? `color: ${C.yel}; font-weight: 600;` : `color: ${sb};`}">${m}′ · 提到 ${w.mentions} 次</div>
<div style="border-top: 1px dashed ${dk ? DK.rule2 : C.rule2};"></div>
<div>${who(vb(w), dk)}</div>
<div style="font-size: ${dk ? 16 : 13}px; line-height: 1.6; text-wrap: pretty;">${esc(w.one_line)}</div>
<div style="display: flex; gap: 6px; align-items: baseline;">${tag2('问题', dk)}<span style="font-size: ${dk ? 14 : 12.5}px; line-height: 1.6; color: ${dk ? DK.sub : C.muted}; text-wrap: pretty;">${esc(w.problem)}</span></div>
${dk ? `<a href="#guling" style="margin-top: 6px; font-size: 13.5px; color: ${DK.fg}; border-bottom: 1px solid ${DK.rule2}; align-self: flex-start;">钱、帮派、十步和两个闭环，见 E《牯岭街》专页 ↓</a>` : ''}
</div>`;
  }
  const zf = Wk('w10');
  const zhuifeng = `<div style="display: flex; align-items: flex-end; gap: 14px; margin-bottom: 34px; padding-bottom: 6px; border-bottom: 1.5px dashed ${C.after};"><div style="max-width: 300px;"><div style="display: flex; flex-wrap: wrap; align-items: center; gap: 6px 8px;"><span style="font-family: ${F.serif}; font-size: 16px; font-weight: 700;">${esc(zf.title)}</span><span style="padding: 0 6px; border: 1px dashed ${C.ink2}; font-size: 11.5px; line-height: 1.6;">未完成</span></div><div style="margin-top: 3px; font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${zf.minutes}′ · 提到 ${zf.mentions} 次 · 不在阶梯上</div><div style="margin-top: 4px; font-size: 12.5px; line-height: 1.6; color: ${C.muted};">节目认为${esc(zf.one_line)}；问题：${esc(zf.problem)}</div></div><div style="flex: none; width: ${f1(+zf.minutes * s)}px; height: 92px; box-sizing: border-box; border: 1.5px dashed ${C.life}; display: flex; align-items: center; justify-content: center; writing-mode: vertical-rl; font-family: ${F.serif}; font-size: 14px; color: ${C.cap};">追风</div></div>`;
  const label = k => { const l = k === 2.5 ? ['第 2–3 级之间', '跨两级'] : ['第 ' + k + ' 级', STEP[k]]; return `<div style="flex: none; text-align: right;"><div style="font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${l[0]}</div><div style="font-family: ${F.serif}; font-size: 18px; font-weight: 700; line-height: 1.3; color: ${sc(k)};">${l[1]}</div></div>`; };
  const band = ([k, ids, nxt]) => {
    const ws = ids.map(Wk), rw = ws.reduce((a, w) => a + +w.minutes * s, 0) + GAP * (ws.length - 1);
    const sp = A[k] - rw, sl = W - A[k];
    return `<div style="display: flex; align-items: stretch;"><div style="flex: 0 0 ${pct(sp / W)}; box-sizing: border-box; display: flex; align-items: flex-end; justify-content: ${k === 6 ? 'space-between' : 'flex-end'}; gap: 20px; padding: 0 14px 10px 0; border-bottom: 1px dashed ${sc(k)};">${k === 6 ? zhuifeng : ''}${label(k)}</div><div style="flex: 0 0 ${pct(rw / W)}; display: flex; gap: ${GAP}px; align-items: flex-end; padding-top: 16px; border-bottom: 5px solid ${sc(k)};">${ws.map(w => card(w)).join('')}</div>${sl > 0 ? `<div style="flex: 1 1 0; background: ${slabBg(nxt)};"></div>` : ''}</div>`;
  };
  const ladder = `<div style="margin-top: 30px; overflow-x: auto; padding-bottom: 8px;"><div style="min-width: 1120px;">${ROWS.map(band).join('')}<div style="display: flex; height: 44px; border-bottom: 1.5px solid ${C.ink};"><div style="flex: 0 0 ${pct(A[0] / W)}; display: flex; align-items: flex-end; padding-bottom: 6px; font-size: 12px; color: ${C.cap};">卡宽 = 节目讨论它的分钟数 × 9.5 像素</div><div style="flex: 1 1 0; background: ${slabBg(1)};"></div></div></div></div>`;
  const mobLadder = `<div style="margin-top: 24px;"><div style="padding-bottom: 8px; border-bottom: 1.5px dashed ${C.after};">${zhuifeng.replace('margin-bottom: 34px; ', '').replace('border-bottom: 1.5px dashed ' + C.after + ';', '')}</div>${ROWS.map(([k, ids]) => `<div style="margin-left: ${(k - 1) * 12}px; padding: 14px 0 10px; border-bottom: 5px solid ${sc(k)};">${label(k).replace('text-align: right;', 'text-align: left;')}<div style="margin-top: 8px; display: grid; gap: 8px;">${ids.map(id => card(Wk(id), true)).join('')}</div></div>`).join('')}<p style="${S.cap}">手机上自上而下读是从第 6 级往下；每张卡顶上的色条长度按讨论时长，《牯岭街》为满格。</p></div>`;
  const legend = `<div style="margin-top: 18px; display: flex; flex-wrap: wrap; align-items: center; gap: 8px 20px; font-size: 12.5px; color: ${C.cap};"><span style="display: inline-flex; align-items: center; gap: 6px;"><span style="font-family: ${F.mono}; color: ${C.ink}; font-weight: 600;">1983</span>不加标记：节目里说了</span><span style="display: inline-flex; align-items: center; gap: 6px;"><span style="padding: 0 5px; border: 1px dashed ${C.ink2}; font-size: 11px; color: ${C.ink2};">推算</span>从节目的话推出来</span><span style="display: inline-flex; align-items: center; gap: 6px;"><span style="padding: 0 5px; border: 1px dotted ${C.ink2}; font-size: 11px; color: ${C.ink2};">通行记载</span>节目没说，按通行记载</span><span style="display: inline-flex; align-items: center; gap: 6px;">${who('节目认为')}${who('一位主持人认为')}后面是主持人的看法</span></div>`;
  const tbl = wk.map(w => { const x = X[w.id]; return `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr)); gap: 4px 24px; padding: 10px 0; border-bottom: 1px solid ${C.rule}; font-size: 13.5px; line-height: 1.65; color: ${C.ink2};"><span style="display: flex; gap: 8px; align-items: center;">${glc(w.group, 9)}<span style="font-family: ${F.serif}; font-weight: 700; color: ${C.ink};">${esc(w.title)}</span></span><span>${esc(x.money_and_crew)}</span><span>${esc(x.form)}</span></div>`; }).join('');
  return `${secOpen('ladder', 'D', '往上走的阶梯')}${head('D', '往上走的阶梯', '十部作品各在哪一级，节目怎么评')}
<p style="${S.intro}">节目说他的主题一级一级往上走：个人成长、两性与婚姻、城市生活、历史与政治、文化底色，最后在《一一》里汇总。每部作品一张卡，放在它所在的台阶上，卡的宽度等于节目讨论它的时长。</p>
<div style="${S.lead}"><span style="color: ${C.gl}; border-bottom: 4px solid ${C.gl};">《牯岭街》</span>一张卡 94 分钟，比《浮萍》《指望》《海滩的一天》《青梅竹马》四张加起来还宽。</div>
<div style="margin-top: 18px; display: inline-flex; padding: 6px 12px; border: 1px solid ${C.ink}; background: ${C.card}; font-size: 14px;">每一级放哪几部片，是整理者按节目的说法放的。</div>
${legend}
<div style="display: {{ wideDisp }};">${ladder}</div>
<div style="display: {{ narrowDisp }};">${mobLadder}</div>
<p style="${S.cap}">青绿是八十年代的作品，墨蓝是《牯岭街》，赭橙是九十年代之后的作品。《浮萍》的时长含学生作业和《1905年的冬天》；《光阴的故事》被提到 21 次、《指望》7 次，合计 28 次；舞台剧四部共聊了 3.9 分钟，没有放进阶梯。</p>
<div style="margin-top: 44px;">${sub('钱、班底与形式', '每部作品的要点，据节目口述')}<div style="display: {{ wideDisp }};"><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr)); gap: 4px 24px; padding: 10px 0 8px; border-bottom: 1px solid ${C.ink}; font-size: 12px; letter-spacing: 0.1em; color: ${C.cap};"><span>作品</span><span>钱与班底</span><span>形式要点</span></div></div>${tbl}</div>
</section>`;
}

// ===== G why Taiwan
function sectionG() {
  const d = D[7][0];
  const Y0 = 1895, Y1 = 2000, xp = y => pct((y - Y0) / (Y1 - Y0));
  const bars = [['西方', 1960, 1970], ['日本', 1960, 1970], ['亚洲其他地方', 1970, 1990]].map(([n, a, b]) => `<div style="display: grid; grid-template-columns: 96px minmax(0, 1fr); gap: 12px; align-items: center; padding: 7px 0;"><span style="font-size: 14px;">${n}</span><div style="position: relative; height: 20px; background: ${C.deep};"><div style="position: absolute; left: ${xp(a)}; width: ${pct((b - a) / (Y1 - Y0))}; top: 0; bottom: 0; background: linear-gradient(90deg, ${C.deep}, ${C.ink2});"></div><div style="position: absolute; left: ${xp(b)}; right: 0; top: 0; bottom: 0; background: ${C.ink2};"></div><span style="position: absolute; left: 6px; top: 1px; font-size: 11.5px; color: ${C.cap};">古典</span><span style="position: absolute; right: 6px; top: 1px; font-size: 11.5px; color: ${C.paper};">现代</span></div></div>`).join('');
  const ticks = [1895, 1920, 1940, 1960, 1980, 2000].map(y => `<span style="position: absolute; left: ${xp(y)}; transform: translateX(-50%); font-family: ${F.mono}; font-size: 11px; color: ${C.cap};">${y}</span>`).join('');
  const divide = d.time.divide.map(x => `${x.where} ${x.when}`).join('；');
  const left = `<div style="min-width: 0;">${sub('时间因素', d.time.idea)}<div style="margin-top: 16px;">${bars}<div style="display: grid; grid-template-columns: 96px minmax(0, 1fr); gap: 12px;"><span></span><div style="position: relative; height: 18px;">${ticks}</div></div></div><p style="${S.cap}">示意：渐变段是节目说的分界年代（${divide}），深色是现代时期。</p><ul style="margin: 16px 0 0; padding: 0; list-style: none;">${d.time.why_late.map(t => `<li style="display: grid; grid-template-columns: 14px minmax(0, 1fr); gap: 8px; padding: 7px 0; border-top: 1px solid ${C.rule}; font-size: 14.5px; line-height: 1.7; color: ${C.ink2};"><span style="color: ${C.faint};">—</span><span>${esc(t)}</span></li>`).join('')}</ul><div style="margin-top: 14px; font-family: ${F.serif}; font-size: 18px; font-weight: 700; line-height: 1.6;">${esc(d.time.claim)}。</div></div>`;
  const br = d.place.after_1949.map((b, i, arr) => { const last = i === arr.length - 1, tw = b.where === '台湾'; return `<div style="position: relative; display: grid; grid-template-columns: 30px minmax(0, 1fr); padding-top: 14px;"><span style="position: absolute; left: 0; top: 0; ${last ? 'height: 40px;' : 'bottom: 0;'} border-left: 2px solid ${C.ink};"></span><span style="margin-top: 26px; border-top: 2px ${tw ? 'solid' : 'dashed'} ${tw ? C.ink : C.faint};"></span><div style="padding: 10px 14px 12px; border: ${tw ? `2px solid ${C.ink}` : `1px dashed ${C.faint}`}; background: ${tw ? C.card : 'transparent'};"><div style="display: flex; flex-wrap: wrap; align-items: center; gap: 6px 10px;"><span style="font-family: ${F.serif}; font-size: 19px; font-weight: 700; color: ${tw ? C.ink : C.muted};">${b.where}</span>${b.where === '大陆' ? who('节目的说法') : ''}${tw ? '' : `<span style="font-size: 12px; color: ${C.cap};">没有通向爆发</span>`}</div><div style="margin-top: 4px; font-size: 14px; line-height: 1.75; color: ${C.ink2}; text-wrap: pretty;">${esc(b.text)}</div></div></div>`; }).join('');
  const right = `<div style="min-width: 0;">${sub('地理因素', '1949 年之后，三地三条路')}<div style="margin-top: 14px; font-size: 12px; letter-spacing: 0.12em; color: ${C.cap};">1949 年以前</div><div style="margin-top: 4px; font-size: 14.5px; line-height: 1.75; color: ${C.ink2};">${esc(d.place.before_1949)}</div><div style="margin-top: 18px; display: flex; align-items: center; gap: 10px;"><span style="padding: 1px 10px; background: ${C.yel}; box-shadow: inset 0 0 0 1.5px ${C.ink}; font-family: ${F.mono}; font-size: 20px; font-weight: 600;">1949</span><span style="font-size: 14px; color: ${C.cap};">之后</span></div><div style="margin-left: 26px;">${br}<div style="margin-left: 30px; display: flex; flex-direction: column; align-items: center;"><span style="height: 22px; border-left: 2px solid ${C.ink};"></span><span style="font-size: 12px; line-height: 1;">▼</span></div><div style="margin-left: 30px; margin-top: 4px; padding: 14px 16px; background: ${C.ink}; color: ${C.paper}; font-family: ${F.serif}; font-size: 17px; font-weight: 700; line-height: 1.6; text-wrap: pretty;">${esc(d.place.result)}</div></div></div>`;
  return `${secOpen('taiwan', 'G', '为什么是台湾')}${head('G', '为什么是台湾', '两位大师为什么同时同地出现')}
<p style="${S.intro}">节目开场先问两个问题：为什么是 80 年代，为什么是台湾。它给的答案是两个因素，一个是时间，一个是地理。</p>
<div style="margin-top: 32px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 440px), 1fr)); gap: 40px 64px; align-items: start;">${left}${right}</div>
<div style="margin-top: 40px; max-width: 900px;">${quote(d.line + '。', '节目', 26)}</div>
</section>`;
}

// ===== F life timeline
function sectionF() {
  const ev = D[6][0].map(r => ({ y: +r.year, lane: r.lane, src: r.source, t: r.event }));
  const W = 1296, Y0 = 1944, Y1 = 2010, X = y => (y - Y0) / (Y1 - Y0) * W;
  const life = ev.filter(e => e.lane === 'life'), work = ev.filter(e => e.lane === 'work');
  const LW = 168, TH = 82, tiers = [], placed = [];
  life.forEach(e => { const x = X(e.y); const cands = [[x - 6, x - 6 + LW], [x + 6 - LW, x + 6]].filter(([a, b]) => a >= 0 && b <= W); let best = null; for (let t = 0; t < 10 && !best; t++) for (const c of cands) if ((tiers[t] ?? -1e9) + 8 <= c[0]) { best = [t, c]; break; } tiers[best[0]] = best[1][1]; placed.push({ e, x, t: best[0], a: best[1][0] }); });
  const NT = tiers.length, AH = NT * TH + 24;
  const isTq = e => e.t.includes('天谴');
  let up = '';
  placed.forEach(({ e, x, t, a }) => {
    const dash = e.src === '整理';
    up += `<div style="position: absolute; left: ${pct(x / W)}; bottom: 0; height: ${24 + t * TH}px; border-left: 1px ${dash ? 'dashed' : 'solid'} ${C.ink}; opacity: 0.55;"></div>`;
    up += `<div style="position: absolute; left: ${pct(a / W)}; width: ${pct(LW / W)}; bottom: ${24 + t * TH}px; box-sizing: border-box; padding: 5px 8px 6px; background: ${isTq(e) ? C.yel : C.paper}; border: 1px ${dash ? 'dashed' : 'solid'} ${isTq(e) ? C.ink : C.rule2};"><div style="display: flex; align-items: center; gap: 6px;">${gl('hx', C.life, 9)}<span style="font-family: ${F.mono}; font-size: 12.5px; font-weight: 600;">${e.y}</span>${dash ? `<span style="font-size: 10.5px; color: ${C.cap};">整理</span>` : ''}</div><div style="margin-top: 2px; font-size: 12.5px; line-height: 1.5; color: ${C.ink};">${esc(e.t)}</div></div>`;
  });
  const wc = e => e.t.includes('牯岭街') ? C.gl : e.y <= 1986 ? C.t80 : C.o90;
  const estV = s => [...s].reduce((a, ch) => a + (ch.charCodeAt(0) < 128 ? 7.4 : 13), 0) + 20;
  const BH = Math.ceil(Math.max(...work.map(e => estV(e.y + ' ' + e.t)))) + 40;
  const xs = spread(work.map(e => X(e.y) / W), 24 / W, 12 / W, 1 - 12 / W);
  let dn = '', ln = '';
  work.forEach((e, i) => {
    const dash = e.src === '整理';
    ln += `<line x1="${f2(X(e.y) / W * 1000)}" y1="0" x2="${f2(xs[i] * 1000)}" y2="28" stroke="${C.ink}" strokeOpacity="0.5" strokeWidth="1" vectorEffect="non-scaling-stroke"></line>`;
    dn += `<div title="${esc(e.y + ' · ' + e.t + (dash ? '（年份为整理者所放）' : ''))}" style="position: absolute; left: ${pct(xs[i])}; top: 28px; transform: translateX(-50%); writing-mode: vertical-rl; font-size: 12.5px; line-height: 1; letter-spacing: 0.04em; padding: 7px 3px; border: 1px ${dash ? 'dashed' : 'solid'} ${C.ink}; border-bottom: 4px solid ${wc(e)}; background: ${C.card}; white-space: nowrap;"><span style="font-family: ${F.mono}; font-weight: 600;">${e.y}</span> ${esc(e.t)}</div>`;
  });
  const vline = (y, t) => `<div style="position: absolute; left: ${pct(X(y) / W)}; top: -26px; bottom: 0; border-left: 1.5px solid ${C.ink};"><span style="position: absolute; left: 6px; top: 0; white-space: nowrap; font-family: ${F.serif}; font-size: 14px; font-weight: 700;">${t}</span></div>`;
  let axis = `<div style="position: absolute; left: ${pct(X(1947) / W)}; width: ${pct((X(2007) - X(1947)) / W)}; top: -3px; height: 6px; background: ${C.life};"></div>`;
  for (let y = 1950; y <= 2000; y += 10) axis += `<div style="position: absolute; left: ${pct(X(y) / W)}; top: 6px; transform: translateX(-50%); font-family: ${F.mono}; font-size: 11px; color: ${C.cap}; background: ${C.paper}; padding: 0 3px;">${y}</div>`;
  const desk = `<div style="margin-top: 40px; overflow-x: auto; padding: 30px 0 8px;"><div style="position: relative; min-width: 1120px;">${vline(1969, '1969 赴美')}${vline(1987, '1987 解严')}<div style="position: relative; height: ${AH}px;"><div style="position: absolute; left: 0; top: 0; font-size: 12px; letter-spacing: 0.14em; color: ${C.cap};">人生</div>${up}</div><div style="position: relative; height: 0; border-top: 1px solid ${C.ink};">${axis}</div><div style="position: relative; height: ${BH}px;"><svg viewBox="0 0 1000 28" preserveAspectRatio="none" style="position: absolute; left: 0; top: 0; width: 100%; height: 28px; overflow: visible;">${ln}</svg>${dn}<div style="position: absolute; left: 0; bottom: 0; font-size: 12px; letter-spacing: 0.14em; color: ${C.cap};">作品</div></div></div></div>`;
  const mob = `<div style="margin-top: 26px;">${ev.slice().sort((a, b) => a.y - b.y).map(e => { const w = e.lane === 'work'; return `<div style="display: grid; grid-template-columns: 46px 12px minmax(0, 1fr); gap: 8px; align-items: baseline; padding: 7px 0; border-bottom: 1px ${e.src === '整理' ? 'dashed' : 'solid'} ${C.rule}; ${isTq(e) ? `background: ${rgba(C.yel, 0.5)};` : ''}"><span style="font-family: ${F.mono}; font-size: 13px; font-weight: 600;">${e.y}</span><span style="align-self: center; display: flex;">${w ? gl('ci', wc(e), 9) : gl('hx', C.life, 9)}</span><span style="font-size: 14px; line-height: 1.6; ${w ? `font-family: ${F.serif}; font-weight: 600;` : ''}">${esc(e.t)}${e.src === '整理' ? `<span style="margin-left: 6px; font-size: 11px; color: ${C.cap};">整理</span>` : ''}</span></div>`; }).join('')}</div>`;
  const kid = `<div style="padding: 20px 22px 22px; border: 1.5px solid ${C.ink}; background: ${C.card};"><div style="font-size: 12px; letter-spacing: 0.14em; color: ${C.cap};">节目对青年杨德昌的概括</div><div style="margin-top: 6px; font-family: ${F.serif}; font-size: 30px; font-weight: 900;">“东亚满分小孩”</div><div style="margin-top: 14px; display: flex; flex-wrap: wrap; align-items: center; gap: 6px 8px;">${['建国中学', '交大', '计算机硕士'].map(t => `<span style="padding: 3px 10px; border: 1px solid ${C.ink}; font-size: 14px;">${t}</span>`).join(`<span style="color: ${C.faint};">→</span>`)}</div><div style="margin-top: 12px; font-size: 14.5px; line-height: 1.75; color: ${C.ink2};">中间想复读、想休学；最后在建筑和电影之间选了电影。</div></div>`;
  return `${secOpen('kid', 'F', '东亚满分小孩')}${head('F', '东亚满分小孩', '他是怎么从工程师变成导演的')}
<div style="margin-top: 24px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr)); gap: 28px 56px; align-items: start;"><p style="${S.intro} margin: 0;">1947 年生在上海，两岁到台湾；1969 年赴美，读计算机，在西雅图当工程师。节目说他在西雅图的影院看到赫尔佐格的《天谴》，回台湾拍电影。1987 年台湾解严，前后正是他的创作高峰。</p>${kid}</div>
<div style="display: {{ wideDisp }};">${desk}</div>
<div style="display: {{ narrowDisp }};">${mob}</div>
<p style="${S.cap}">轴上方是人生，下方是作品。虚线框和虚线是“整理”：节目没给确切年份，位置是整理者按上下文和通行记载放的。黄色一格是节目说改变他人生的那次观影。</p>
</section>`;
}

// ===== H taste
function sectionH() {
  const d = D[8][0], top = D[8][1];
  const [g1, g2, g3, g4, g5] = d.groups;
  const sty = { 0: `border: 2px solid ${C.ink};`, 1: `border: 1px solid ${C.ink};`, 2: `border: 1px dashed ${C.ink};`, 3: `border: 1px solid ${C.rule2}; background: repeating-linear-gradient(135deg, rgba(26,28,30,0.05) 0 2px, transparent 2px 7px);`, 4: `border: 1px dotted ${C.ink};` };
  const PH = { 赫尔佐格: 'herzog', 法斯宾德: 'fass', 雷奈: 'resnais', 皮亚拉: 'pialat', 成濑巳喜男: 'naruse', '大卫·林奇': 'lynch', 安东尼奥尼: 'anton', 基耶斯洛夫斯基: 'kies', 安哲罗普洛斯: 'angelo', 小津: 'ozu', '约翰·贝里': 'berry', 库布里克: 'kubrick' };
  const box = (g, i, extra = '') => `<div style="min-width: 0; padding: 14px 16px 16px; background: ${C.card}; ${sty[i]} ${extra}"><div style="display: flex; align-items: baseline; gap: 8px; padding-bottom: 8px; border-bottom: 2px solid ${C.life};">${gl('hx', C.life, 10)}<span style="font-family: ${F.serif}; font-size: 17px; font-weight: 700;">${esc(g.name)}</span><span style="font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${g.items.length}</span></div><div style="margin-top: 6px; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 220px), 1fr)); gap: 2px 16px;">${g.items.map(it => `<div style="display: flex; gap: 10px; align-items: flex-start; padding: 6px 0;">${PH[it.who] ? photo(PH[it.who], it.who, 46, 46, i === 3 ? 'filter: grayscale(1); opacity: 0.85;' : '') : ''}<div style="min-width: 0;"><div style="font-family: ${F.serif}; font-size: 18px; font-weight: 700; ${i === 3 ? `color: ${C.muted};` : ''}">${esc(it.who)}</div>${it.note ? `<div style="font-size: 13px; line-height: 1.65; color: ${C.ink2}; text-wrap: pretty;">${esc(it.note)}</div>` : ''}</div></div>`).join('')}</div></div>`;
  const center = `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; min-height: 200px;">${photo('yang', '杨德昌', 140, 140, `box-shadow: 0 0 0 2px ${C.ink}, 0 0 0 9px ${C.paper}, 0 0 0 10px ${C.rule2}, 0 0 0 18px ${C.paper}, 0 0 0 19px ${C.rule};`)}<span style="margin-top: 10px; font-family: ${F.serif}; font-size: 26px; font-weight: 900;">杨德昌</span></div>`;
  const TK = { '《天谴》': 'tq', '《金钱》': 'jq', '《八部半》': 'bb', '《我的美国舅舅》': 'mg', '《浮云》': 'fy', '《发条橙》': 'ft', '《蓝丝绒》': 'ls', '《切腹》': 'qf', '《乡愁》': 'xc', '《曼哈顿》': 'mh' };
  const grid = `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr)); gap: 16px;">${box(g1, 0)}${box(g2, 1, 'grid-column: span 2;')}${box(g3, 2)}${center}${box(g4, 3)}${box(g5, 4, 'grid-column: span 2;')}<div style="display: flex; align-items: center; padding: 14px 16px; border-top: 1px solid ${C.ink}; font-family: ${F.serif}; font-size: 17px; font-weight: 600; line-height: 1.6;">${esc(d.tshirt)}。</div></div>`;
  const list = `<div style="min-width: 0; padding: 18px 20px 20px; background: ${C.card}; border: 1px solid ${C.ink};"><div style="font-size: 12px; letter-spacing: 0.14em; color: ${C.cap};">1992 年《视与听》影史十佳投票</div><div style="margin-top: 4px; font-family: ${F.serif}; font-size: 22px; font-weight: 700;">他选的十部</div><div style="margin-top: 10px;">${top.map(r => `<div style="display: grid; grid-template-columns: 34px minmax(0, 1fr) auto; gap: 12px; align-items: center; padding: 6px 0; border-top: 1px solid ${C.rule};">${poster(TK[r.film], r.film, '34px')}<span style="font-family: ${F.serif}; font-size: 15.5px; font-weight: 600;">${esc(r.film)}</span><span style="font-size: 13px; color: ${C.cap};">${esc(r.director)}</span></div>`).join('')}</div><div style="margin-top: 12px; font-size: 12px; color: ${C.cap};">节目口述，顺序不代表名次</div><div style="margin-top: 14px; padding-top: 12px; border-top: 1.5px solid ${C.ink}; font-family: ${F.serif}; font-size: 16.5px; font-weight: 700; line-height: 1.6;">“十部都是现代主义电影，没有一部华语片。”</div><div style="font-size: 12px; color: ${C.cap};">节目的观察</div></div>`;
  return `${secOpen('taste', 'H', '他喜欢谁')}${head('H', '他喜欢谁', '他喜欢谁，不喜欢谁')}
<p style="${S.intro}">节目整理了他的电影养料：哪几位导演改变了他，他真正佩服谁，常被拿来和谁对标，不喜欢谁，和谁打过交道。</p>
<div style="margin-top: 30px; display: flex; flex-wrap: wrap; gap: 28px 32px; align-items: flex-start;"><div style="flex: 3 1 640px; min-width: 0;">${grid}</div><div style="flex: 1 1 300px; min-width: 0;">${list}</div></div>
<p style="${S.cap}">边框区分五组：粗实线是改变人生的，实线是真正佩服的，虚线是被拿来对标的，斜纹是不喜欢的，点线是有过交集的。</p>
</section>`;
}

// ===== I two men
function sectionI() {
  const [ev, cmp] = D[14];
  const W = 1200, X = y => 70 + (y - 1980) / 30 * 1060;
  const yY = y => y < 1988 ? 168 : y < 1990.5 ? 168 - (y - 1988) / 2.5 * 98 : y < 1998 ? 70 : y < 1999.5 ? 70 + (y - 1998) / 1.5 * 88 : 158;
  const hY = y => y < 1988 ? 182 : y < 1990.5 ? 182 + (y - 1988) / 2.5 * 108 : y < 1998 ? 290 : y < 1999.5 ? 290 - (y - 1998) / 1.5 * 118 : 172;
  const path = (f, a, b) => { let p = ''; for (let y = a; y <= b + 1e-9; y += 0.25) p += (p ? ' L ' : 'M ') + f1(X(y)) + ' ' + f1(f(y)); return p; };
  const pos = [1981, 1983, 1984.5, 1986.5, 1989, 1997, 1999, 2002, 2008];
  const on = ['b', 'b', 'b', 'b', 'b', 'h', 'b', 'y', 'h'];
  let marks = '';
  pos.forEach((y, i) => { const cy = on[i] === 'h' ? hY(y) : on[i] === 'y' ? yY(y) : (yY(y) + hY(y)) / 2; marks += `<circle cx="${f1(X(y))}" cy="${f1(cy)}" r="12" fill="${C.paper}" stroke="${C.ink}" strokeWidth="1.5"></circle><text x="${f1(X(y))}" y="${f1(cy + 4.5)}" textAnchor="middle" fill="${C.ink}" style="font-family: ${F.mono}; font-size: 13px; font-weight: 600;">${i + 1}</text>`; });
  let ticks = ''; for (let y = 1980; y <= 2010; y += 5) ticks += `<line x1="${f1(X(y))}" y1="330" x2="${f1(X(y))}" y2="336" stroke="${C.faint}"></line><text x="${f1(X(y))}" y="352" textAnchor="middle" fill="${C.cap}" style="font-family: ${F.mono}; font-size: 12px;">${y}</text>`;
  const tx = (x, y, t, c, a = 'middle', sz = 15, w = 600) => `<text x="${f1(x)}" y="${y}" textAnchor="${a}" fill="${c}" style="font-family: ${F.sans}; font-size: ${sz}px; font-weight: ${w};">${t}</text>`;
  const svg = `<svg viewBox="0 0 ${W} 360" style="display: block; width: 100%; height: auto; overflow: visible;"><line x1="${X(1980)}" y1="330" x2="${X(2010)}" y2="330" stroke="${C.rule2}"></line>${ticks}
<path d="${path(yY, 1980, 2007)}" fill="none" stroke="${C.ink}" strokeWidth="4" strokeLinecap="round"></path><circle cx="${f1(X(2007))}" cy="158" r="5" fill="${C.ink}"></circle>
<path d="${path(hY, 1980, 2010)}" fill="none" stroke="${C.life}" strokeWidth="4" strokeLinecap="round"></path>
${tx(X(1980) - 8, 165, '杨德昌', C.ink, 'end', 15, 700)}${tx(X(1980) - 8, 192, '侯孝贤', C.life, 'end', 15, 700)}${tx(X(2007) + 8, 148, '2007', C.ink, 'start', 12, 500)}
${tx(X(1994), 172, '事业上的落差。', C.ink, 'middle', 24, 700)}${tx(X(1994), 196, '节目的判断', C.cap, 'middle', 12.5, 400)}
${tx(X(1994), 56, '杨德昌的说法：“不认同他身边的一些人”', C.ink, 'middle', 14, 500)}${tx(X(1994), 316, '侯孝贤的说法：“价值观不同”', C.life, 'middle', 14, 500)}
${tx(X(1984), 140, '80 年代：两条线紧贴', C.cap, 'middle', 12.5, 400)}${tx(X(2003.5), 136, '1999 年重新靠近', C.cap, 'middle', 12.5, 400)}
${marks}</svg>`;
  const list = `<ol style="margin: 24px 0 0; padding: 0; list-style: none; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 0 32px;">${ev.map((r, i) => `<li style="display: grid; grid-template-columns: 26px 86px minmax(0, 1fr); gap: 8px; align-items: baseline; padding: 9px 0; border-bottom: 1px solid ${C.rule};"><span style="width: 22px; height: 22px; box-sizing: border-box; border: 1.5px solid ${C.ink}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: ${F.mono}; font-size: 11.5px; font-weight: 600;">${i + 1}</span><span style="font-family: ${F.mono}; font-size: 12.5px; color: ${C.cap};">${esc(r.when)}</span><span style="font-size: 14px; line-height: 1.7; color: ${C.ink2}; text-wrap: pretty;">${esc(r.event)}</span></li>`).join('')}</ol>`;
  const table = `<div style="margin-top: 36px; border-top: 1.5px solid ${C.ink};"><div style="display: grid; grid-template-columns: minmax(90px, 0.6fr) minmax(0, 1fr) minmax(0, 1fr); gap: 16px; padding: 10px 0; border-bottom: 1px solid ${C.ink}; font-size: 13px;"><span></span><span style="font-family: ${F.serif}; font-size: 17px; font-weight: 700;">杨德昌</span><span style="font-family: ${F.serif}; font-size: 17px; font-weight: 700; color: ${C.life};">侯孝贤</span></div>${cmp.map(r => `<div style="display: grid; grid-template-columns: minmax(90px, 0.6fr) minmax(0, 1fr) minmax(0, 1fr); gap: 16px; padding: 10px 0; border-bottom: 1px solid ${C.rule}; font-size: 14.5px; line-height: 1.7;"><span style="font-size: 13px; color: ${C.cap};">${esc(r.row)}</span><span>${esc(r['杨德昌'])}</span><span>${esc(r['侯孝贤'])}</span></div>`).join('')}</div>`;
  return `${secOpen('two', 'I', '两个人的三十年')}${head('I', '两个人的三十年', '他和侯孝贤怎么了')}
<p style="${S.intro}">节目讲了两人从 80 年代初的密切往来，到 80 年代末不再来往，再到 1999 年和好。下面只用节目里提到的事件。</p>
<div style="${S.lead}">“杨德昌是思在行的前面，侯孝贤是先有行之后才有思。”<span style="font-family: ${F.sans}; font-size: 13px; font-weight: 400; color: ${C.cap};">　—— 一位主持人</span></div>
<div style="margin-top: 26px; display: flex; flex-wrap: wrap; gap: 16px 40px;">${[['yang', '杨德昌', C.ink, '1947–2007'], ['hou', '侯孝贤', C.life, '']].map(([k, n, c, y]) => `<div style="display: flex; align-items: flex-end; gap: 12px;">${photo(k, n, 72, 90)}<div><div style="height: 4px; width: 40px; background: ${c};"></div><div style="margin-top: 6px; font-family: ${F.serif}; font-size: 20px; font-weight: 700; color: ${c};">${n}</div><div style="font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${y}</div></div></div>`).join('')}</div>
<div style="display: {{ wideDisp }}; margin-top: 30px;"><div style="overflow-x: auto;"><div style="min-width: 900px;">${svg}</div></div></div>
<div style="display: {{ narrowDisp }}; margin-top: 22px; padding: 14px 16px; border: 1px solid ${C.ink}; background: ${C.card};"><div style="font-size: 12px; color: ${C.cap};">80 年代末到 1999 年之间，节目的判断</div><div style="margin-top: 4px; font-family: ${F.serif}; font-size: 22px; font-weight: 700;">事业上的落差。</div><div style="margin-top: 8px; font-size: 14px; line-height: 1.7;">杨德昌的说法：“不认同他身边的一些人”<br>侯孝贤的说法：“价值观不同”</div></div>
${list}
${table}
</section>`;
}

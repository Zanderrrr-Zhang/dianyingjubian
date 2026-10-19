// ===== O 1966 与吴哥窟
function sectionO() {
  const R = D[16][0];
  const DP = { '美国': [15, 14], '菲律宾': [85, 18], '新加坡': [84, 66], '日本': [16, 66], '留在香港': [64, 82] };
  const cx = 50, cy = 46;
  const o1n = `<div style="margin-top: 20px; padding: 14px 16px; border: 1px solid ${C.rule2};"><div style="${S.t16} color: ${C.amb};">1962 香港 · 两套房子，四个家庭</div><div style="margin-top: 10px; border-left: 2px solid ${C.amb}; padding-left: 16px; display: grid; gap: 10px;">${R.dispersal.map(d => `<div><b style="font-family: ${F.serif}; font-size: 15px; color: ${C.amb};">${esc(d.to)}</b><div style="${S.sm}">${esc(d.who)}${d.note ? `<span style="color: ${C.cap};">（${esc(d.note)}）</span>` : ''}</div></div>`).join('')}</div></div>`;
  const o1w = `<div style="position: relative; height: 420px; margin-top: 20px; border: 1px solid ${C.rule2}; background: radial-gradient(ellipse 40% 50% at 50% 46%, rgba(219,169,62,0.12), transparent 70%);"><svg viewBox="0 0 100 100" preserveAspectRatio="none" style="position: absolute; inset: 0; width: 100%; height: 100%;">${R.dispersal.map(d => { const [x, y] = DP[d.to]; return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${C.amb}" strokeWidth="1.5" vectorEffect="non-scaling-stroke"></line>`; }).join('')}</svg><span style="position: absolute; left: ${cx}%; top: ${cy}%; width: 22px; height: 22px; transform: translate(-50%, -50%); border-radius: 50%; background: ${C.amb}; box-shadow: 0 0 0 6px ${rgba(C.amb, 0.18)};"></span><div style="position: absolute; left: ${cx}%; top: calc(${cy}% + 20px); transform: translateX(-50%); width: 200px; text-align: center; font-size: 13px; line-height: 1.5; color: ${C.fg};"><b style="font-family: ${F.serif}; color: ${C.amb};">1962 香港</b><br>两套房子，四个家庭</div>${R.dispersal.map(d => { const [x, y] = DP[d.to]; const r = x > 50; return `<span style="position: absolute; left: ${x}%; top: ${y}%; width: 12px; height: 12px; transform: translate(-50%, -50%); border-radius: 50%; background: ${C.bg}; border: 2px solid ${C.amb}; box-sizing: border-box;"></span><div style="position: absolute; ${r ? `right: ${f1(100 - x)}%` : `left: ${x}%`}; top: calc(${y}% + 10px); ${r ? 'text-align: right; padding-right: 0;' : ''} width: 150px; font-size: 12.5px; line-height: 1.5; color: ${C.fg2};"><b style="font-family: ${F.serif}; font-size: 15px; color: ${C.amb};">${esc(d.to)}</b><br>${esc(d.who)}${d.note ? `<br><span style="color: ${C.cap};">${esc(d.note)}</span>` : ''}</div>`; }).join('')}</div><div style="margin-top: 8px; ${S.xs}">只画点和线，位置不对应地理方位。</div>`;
  const o1 = WIDE(o1w) + NARROW(o1n);
  const o2 = `<div style="margin-top: 18px; ${gridF(280, '14px')}">${card(`<div style="${S.lab}">一位主持人</div><div style="margin-top: 6px; ${S.sm}">${esc(R.y1966.one)}</div>`, `background: ${C.ambBg2};`)}${card(`<div style="${S.lab}">另一位主持人</div><div style="margin-top: 6px; ${S.sm}">${esc(R.y1966.other)}</div>`, `background: ${C.ambBg2};`)}</div>`;
  const o3 = `<div style="margin-top: 18px; display: flex; flex-wrap: wrap; align-items: stretch; gap: 10px;">${R.politics.map(p => `<div style="flex: 1 1 220px; min-width: 0; padding: 12px 14px; border: 1px solid ${C.rule2}; background: ${C.ambBg2};"><div style="${S.lab}">${esc(p.who)}</div><div style="margin-top: 6px; ${S.sm}">${esc(p.text)}</div></div>`).join(arrowR(C.amb))}</div><div style="margin: 12px 0;">${arrowD(C.amb)}</div><div style="${gridF(280, '14px')}">${R.politics_readings.map(p => `<div style="padding: 12px 14px; border-style: solid; border-color: ${C.amb} ${C.rule2} ${C.rule2}; border-width: 3px 1px 1px;"><div style="${S.lab}">${esc(p.who)}认为</div><div style="margin-top: 6px; ${S.sm}">${esc(p.text)}</div></div>`).join('')}</div>`;
  const stone = `background: radial-gradient(circle at 30% 40%, rgba(60,45,30,0.16) 0 1.6px, transparent 2.6px) 0 0 / 19px 23px, radial-gradient(circle at 70% 20%, rgba(255,250,240,0.2) 0 1.2px, transparent 2.2px) 0 0 / 27px 17px, repeating-linear-gradient(0deg, rgba(60,45,30,0.12) 0 1px, transparent 1px 38px), linear-gradient(160deg, #C4B8A4, #A79B87);`;
  const hole = `<div style="position: relative; height: 300px; ${stone}"><div style="position: absolute; left: 50%; top: 50%; width: 150px; height: 118px; transform: translate(-50%, -50%); background: #0D0806; clip-path: polygon(18% 6%, 46% 0, 74% 9%, 94% 30%, 100% 58%, 86% 86%, 58% 100%, 28% 94%, 6% 76%, 0 44%); box-shadow: inset 0 0 22px rgba(0,0,0,0.9);"></div></div>`;
  const o4 = `<div style="margin-top: 20px;">${stills([pic('l-angkor', '吴哥窟', `柬埔寨吴哥窟，片尾的拍摄地 ${PUB}`, '3 / 2'), still('o-hole', '剧照：周慕云对着墙上的洞口说话', '对着墙上的洞口说出秘密', '3 / 2')])}</div><div style="margin-top: 36px; display: flex; flex-wrap: wrap; gap: 28px 44px; align-items: center;"><div style="flex: 1 1 360px; min-width: 0;">${hole}</div><div style="flex: 1 1 380px; min-width: 0;">${lit(`<div style="font-family: ${F.serif}; font-size: clamp(22px, 2.6vw, 32px); font-weight: 700; line-height: 1.55; ${GLOWTXT} text-wrap: balance;">“这一段爱情的确立和埋葬是在同一刻。”</div>${who('节目谈吴哥窟')}`)}<div style="margin-top: 12px; ${S.xs}">灵感来自安东尼奥尼的《蚀》：空间成为历史的见证者。</div><div style="margin-top: 14px;">${R.angkor.slice(2).map(t => `<div style="padding: 9px 0; border-bottom: 1px solid ${C.rule}; ${S.sm}">${esc(t)}</div>`).join('')}</div></div></div>`;
  return `${secOpen('angkor', 'O', '1966 与吴哥窟', C.ambBg)}${head('O', '四散', '结尾在说什么')}
<p style="${S.intro}">片子的最后一部分跳到 1966 年：两套房子里的人散到了四个方向，苏丽珍带着儿子租回旧居，周慕云回到老房子又离开，最后在柬埔寨吴哥窟对着墙上的洞口说出秘密。</p>
<div style="margin-top: 52px;">${twoCol(`<div>${sub('四散', '')}${o1}</div>`, `<div style="display: grid; gap: 26px;">${quote('华人来到了香港，然后又四面散去。', '一位主持人', 22)}<div style="${S.sm}">${esc(R.dispersal_note)}</div><div style="${S.sm} color: ${C.sub};">${esc(R.gather_scatter)}</div><div>${sub('1966 还是 1967', '两边一样重')}${o2}</div></div>`)}</div>
<div style="margin-top: 72px;">${sub('结尾的政治', '戴高乐与九七；全部是转述')}${o3}</div>
<div style="margin-top: 72px;">${sub('倾诉与埋葬', '吴哥窟')}${o4}</div>
</section>`;
}

// ===== P 坠落与悬浮
function sectionP() {
  const R = D[17][0];
  const sqFill = c => c === 'one' ? `background: ${C.carT};` : c === 'half' ? `background: linear-gradient(90deg, ${C.carT} 50%, transparent 50%);` : '';
  const p1 = `<div style="margin-top: 26px; display: flex; flex-wrap: wrap; gap: 18px;">${R.one_and_half.map(w => `<div style="flex: 0 1 170px; min-width: 140px;"><div style="width: 100%; aspect-ratio: 1; box-sizing: border-box; ${w.count === 'excluded' ? `border: 2px dashed ${C.cap}; background: repeating-linear-gradient(135deg, rgba(150,137,121,0.12) 0 4px, transparent 4px 10px);` : `border: 2px solid ${C.carT}; ${sqFill(w.count)}`} display: flex; align-items: flex-end; justify-content: flex-end; padding: 8px; font-family: ${F.mono}; font-size: 22px; font-weight: 600; color: ${w.count === 'one' ? C.bg : C.fg};">${w.count === 'one' ? '1' : w.count === 'half' ? '½' : w.count === 'zero' ? '0' : ''}</div><div style="margin-top: 8px; ${S.t16}">${esc(w.work)}</div><div style="font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${w.year}${w.count === 'excluded' ? ' · 不计入' : ''}</div><div style="margin-top: 4px; font-size: 13px; line-height: 1.6; color: ${C.fg2};">${esc(w.text)}</div></div>`).join('')}</div><div style="margin-top: 12px; ${S.xs}">灰色虚线框：严格说是上世纪末的产物，不算新世纪的作品。</div>`;
  const p1b = `<div style="margin-top: 32px; display: flex; flex-wrap: wrap; gap: 18px;">${R.one_and_half.map(w => { const k = wkKey(w.work); const ov = w.count === 'half' ? 'linear-gradient(90deg, transparent 50%, rgba(13,4,5,0.8) 50%)' : w.count === 'zero' ? 'rgba(13,4,5,0.5)' : w.count === 'excluded' ? 'rgba(13,4,5,0.6)' : 'transparent'; const badge = w.count === 'one' ? '1' : w.count === 'half' ? '½' : w.count === 'zero' ? '0' : '不计入'; return `<div style="flex: 0 1 170px; min-width: 140px;"><div style="position: relative; width: 100%; aspect-ratio: 2 / 3; overflow: hidden; background: ${C.bg3}; ${w.count === 'excluded' ? `outline: 2px dashed ${C.cap}; outline-offset: 3px;` : `box-shadow: 0 0 0 2px ${C.carT};`} ${w.count === 'zero' || w.count === 'excluded' ? 'filter: grayscale(1);' : ''}">${slot('f-' + (k || 'x' + w.year), w.work)}<span style="position: absolute; inset: 0; background: ${ov}; pointer-events: none;"></span><span style="position: absolute; right: 0; bottom: 0; padding: 4px 10px; background: ${w.count === 'one' ? C.carT : C.bar}; color: ${w.count === 'one' ? C.bg : C.fg}; font-family: ${F.mono}; font-size: ${badge.length > 1 ? 13 : 22}px; font-weight: 600; pointer-events: none;">${badge}</span></div><div style="margin-top: 10px; ${S.t16}">${esc(w.work)}</div><div style="font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${w.year}</div><div style="margin-top: 4px; font-size: 13px; line-height: 1.6; color: ${C.fg2};">${esc(w.text)}</div></div>`; }).join('')}</div><div style="margin-top: 12px; ${S.xs}">海报右下角是节目的计数：1 算一部，½ 算半部；灰色的不算，虚线框的严格说是上世纪末的产物，不计入新世纪。</div>`;
  const c3 = R.chain_3;
  const p2 = `<div style="margin-top: 20px; display: flex; justify-content: center;"><div style="padding: 10px 22px; background: ${C.car}; color: #fff; font-family: ${F.serif}; font-size: 18px; font-weight: 700;">坠落的三个原因</div></div><svg viewBox="0 0 300 40" preserveAspectRatio="none" style="display: block; width: 100%; height: 40px;"><path d="M150 0 L50 40 M150 0 L150 40 M150 0 L250 40" fill="none" stroke="${C.carT}" strokeWidth="1.5" vectorEffect="non-scaling-stroke"></path></svg><div style="${gridF(260, '14px')} align-items: start;">${R.reasons.map(r => `<div><div style="padding: 14px 16px; background: ${C.bg2}; border-style: solid; border-color: ${C.carT} ${C.rule2} ${C.rule2}; border-width: 3px 1px 1px;"><div style="display: flex; align-items: baseline; gap: 8px;"><span style="font-family: ${F.mono}; color: ${C.cap};">${r.n}</span><span style="${S.t18}">${esc(r.title)}</span></div><div style="margin-top: 6px; ${S.sm}">${esc(r.text)}</div></div>${r.n === 3 ? `<div style="margin-top: 6px; display: grid; gap: 4px;">${c3.map((t, i) => `${arrowD(C.carT, 16)}<div style="padding: 9px 12px; border: 1px solid ${i === c3.length - 1 ? C.carT : C.rule}; text-align: center; font-size: 13.5px; line-height: 1.6; color: ${C.fg2};">${esc(t)}</div>`).join('')}</div>` : ''}</div>`).join('')}</div>`;
  const p3 = `<div style="margin-top: 10px;">${R.years_per_film.map(y => `<div style="display: grid; grid-template-columns: minmax(0, 140px) minmax(0, 1fr); gap: 14px; align-items: center; padding: 9px 0; border-bottom: 1px solid ${C.rule};"><span style="${S.t16} font-size: 15px;">${esc(y.what)}</span><div style="display: flex; align-items: center; gap: 10px;"><div style="position: relative; flex: 1; height: 16px;"><div style="position: absolute; left: 0; top: 0; bottom: 0; width: ${f1(y.years_min / 8 * 100)}%; background: ${C.carT};"></div>${y.years_max > y.years_min ? `<div style="position: absolute; left: ${f1(y.years_min / 8 * 100)}%; width: ${f1((y.years_max - y.years_min) / 8 * 100)}%; top: 0; bottom: 0; background: repeating-linear-gradient(45deg, ${C.carT} 0 3px, transparent 3px 7px); box-shadow: inset 0 0 0 1px ${C.carT};"></div>` : ''}</div><span style="flex: none; width: 70px; font-family: ${F.mono}; font-size: 13.5px;">${y.years_max > y.years_min ? y.years_min + '–' + y.years_max : y.years_min} 年</span></div></div>`).join('')}</div><div style="margin-top: 8px; display: flex; flex-wrap: wrap; align-items: center; gap: 8px;">${PROG}<span style="${S.xs}">${R.years_per_film.filter(y => y.note).map(y => esc(y.what + '：' + y.note)).join('；')}</span></div><div style="margin-top: 14px; padding: 14px 16px; border: 1px solid ${C.rule3}; display: flex; align-items: baseline; gap: 12px;"><span style="font-family: ${F.serif}; font-size: 22px; font-weight: 900;">《繁花》据说六亿。</span><span style="${S.xs}">节目说法，成本</span></div>`;
  const N9 = R.nineties;
  const p4 = `<div style="margin-top: 18px; display: grid; grid-template-columns: minmax(0, 1fr) 36px minmax(0, 1fr); gap: 10px 0; align-items: stretch;"><div style="${S.lab} padding-bottom: 4px;">时代</div><div></div><div style="${S.lab} padding-bottom: 4px;">王家卫</div>${N9.era.map((e, i) => `<div style="padding: 12px 14px; background: ${C.bg2}; border: 1px solid ${C.rule2}; ${S.sm}">${esc(e)}</div><div style="display: flex; align-items: center; justify-content: center;"><span style="width: 100%; height: 1.5px; background: ${C.carT};"></span></div><div style="padding: 12px 14px; background: ${rgba(C.car, 0.25)}; border: 1px solid ${C.carT}; ${S.sm} color: ${C.fg};">${esc(N9.wkw[i])}</div>`).join('')}</div><div style="margin-top: 14px; text-align: center; font-family: ${F.serif}; font-size: clamp(19px, 2vw, 23px); font-weight: 700;">“${esc(N9.match)}。”</div><div style="margin-top: 22px; display: flex; gap: 12px;">${face('anton', '安东尼奥尼', 64)}${face('wkw', '王家卫', 64)}</div>${tbl(['', '安东尼奥尼', '王家卫'], R.antonioni.map(a => [esc(a.row), esc(a.antonioni), esc(a.wkw)]), '120px minmax(0, 1fr) minmax(0, 1fr)', 520)}<div style="margin-top: 10px; ${S.sm}">${esc(N9.contrast)}。</div>`;
  const FL = R.floating, IRI = `linear-gradient(100deg, rgba(110,150,175,0.75), rgba(150,125,180,0.75) 22%, rgba(185,125,140,0.72) 42%, rgba(190,165,105,0.7) 62%, rgba(120,170,140,0.72) 82%, rgba(110,150,175,0.75))`;
  const p5 = `<div style="margin-top: 20px; ${grid(220, '10px')}">${FL.questions.map(q => { const [a, b] = q.split('？'); return `<div style="padding: 12px 14px; border: 1px dashed ${C.rule3};"><div style="${S.t18}">${esc(a)}？</div><div style="margin-top: 4px; ${S.sm}">${esc(b || '')}</div></div>`; }).join('')}</div><div style="margin: 12px 0;">${arrowD(C.carT, 26)}</div><div style="position: relative; padding: 22px 24px; text-align: center; background: ${IRI}; box-shadow: 0 0 40px rgba(150,140,180,0.25);"><div style="font-family: ${F.serif}; font-size: clamp(24px, 2.8vw, 34px); font-weight: 900; color: #120E10; letter-spacing: 0.1em;">悬浮导演</div><div style="margin-top: 6px; font-size: 14.5px; color: #1A1416;">${esc(FL.answer.replace(/^悬浮导演：/, ''))}</div></div><div style="margin-top: 20px;">${quote(FL.image + '。', '一位主持人', 20)}</div><div style="margin-top: 10px; ${S.sm} color: ${C.sub};">${esc(FL.academic)}。</div>`;
  const p6 = `<div style="margin-top: 18px; ${gridF(280, '14px')}">${R.initiation.map(i => card(`<div style="display: flex; align-items: baseline; gap: 10px;"><span style="${S.t18}">${i.speaker}</span><span style="${S.xs}">${esc(i.film)}</span></div><div style="margin-top: 8px; ${S.sm}">${esc(i.text)}</div>`)).join('')}</div><div style="margin-top: 14px; padding: 16px 18px; border: 1px solid ${C.rule2};"><div style="${S.lab}">祛魅</div><div style="margin-top: 6px; font-family: ${F.serif}; font-size: 19px; font-weight: 700;">“一个电影好像不能够只有这些啊。”</div><div style="margin-top: 6px; ${S.sm}">${esc(R.disenchant.replace(/^一位主持人：随着年龄增长渐渐开始祛魅了，“[^”]+”；/, '一位主持人随着年龄增长渐渐开始祛魅：'))}</div></div><div style="margin-top: 16px;">${quote('瞬间涌起的爱意……可能全世界范围内在这个点上都没有谁比他做得更好了。', '节目', 18)}</div>`;
  return `${secOpen('floating', 'P', '坠落与悬浮')}${head('P', '一部半与悬浮', '新世纪的王家卫')}
<p style="${S.intro}">第 8 段的平台标题是“二十岁以后，还爱王家卫吗？”。节目认为王家卫是专属于上世纪 90 年代的导演，进入新世纪只拍了“一部半”电影，成了一个“悬浮”的美学符号。下面的评价都是节目和主持人的说法。</p>
<div style="margin-top: 40px; display: flex; flex-wrap: wrap; gap: 24px 36px; align-items: center;"><figure style="margin: 0; flex: 0 0 170px;">${portrait('wkw', '王家卫', '170px', '664 / 944')}<figcaption style="margin-top: 8px; ${S.xs}">王家卫</figcaption></figure><div style="flex: 1 1 480px; min-width: 0;">${lit(`<div style="padding: 22px 26px; background: ${C.bar}; border-style: solid; border-color: #000; border-width: 10px 0; text-align: center; ${GLOWBOX}"><div style="font-family: ${F.serif}; font-size: clamp(19px, 2.2vw, 27px); font-weight: 700; line-height: 1.6; color: ${C.fg}; text-wrap: balance;">“21 世纪到今天 2025 年，25 年过去了，我觉得王家卫实际上就拍了<span style="${GLOWTXT} font-weight: 900;">一部半</span>电影。”</div><div style="margin-top: 10px; font-size: 13px; color: ${C.cap};">一位主持人</div></div>`)}</div></div>
${p1b}
<div style="margin-top: 72px;">${sub('坠落的原因', '一棵树：第三支长成一条链')}${p2}</div>
<div style="margin-top: 72px;">${twoCol(`<div>${sub('越拍越慢', '一部片要几年')}${p3}</div>`, `<div>${faces([['welles', '奥逊·威尔斯']], 60)}${quote('威尔斯是败给了古典好莱坞的体制，王家卫是败给了自己。', '一位主持人', 19)}<div style="margin-top: 10px; ${S.sm} color: ${C.sub};">${esc(R.welles.agree)}。</div><div style="margin-top: 18px;">${quote('周慕云试图想走出他那个时代，但走不出去，王家卫也是一样的。', '节目', 19)}</div></div>`)}</div>
<div style="margin-top: 72px;">${sub('属于 90 年代', '时代和王家卫，三对三')}${p4}</div>
<div style="margin-top: 72px;">${sub('悬浮', '四个问号都指向同一层薄膜')}${p5}</div>
<div style="margin-top: 72px;">${twoCol(`<div>${sub('两位主持人的启蒙', '转写能确认是谁')}${p6}</div>`, `<div style="align-self: center;">${subtitleCard('90 年代的王家卫，真的是一个世界级的电影艺术家。', '一位主持人；另一位补充：“划时代意义，电影形式、电影本体意义上的”')}<div style="margin-top: 12px; ${S.sm} color: ${C.sub};">${esc(R.image_aesthetics.split('“')[0])}</div></div>`)}</div>
${cap('节目对王家卫新世纪作品的评价相当尖锐，页面一律按“节目认为”“一位主持人认为”转述。')}
</section>`;
}

// ===== Q 作品年表
function sectionQ() {
  const WK = D[18][0].map(w => ({ ...w, year: +w.year, m: w.mentions ? +w.mentions : 0 }));
  const QW = 1296, xq = y => (y - 1988) / (2024.5 - 1988) * QW;
  const stripW = w => w.m ? Math.round(30 + w.m * 1.3) : 22;
  const MODE = { negative: '▼', positive: '▲' };
  const ch = (w, wd) => 12 + 20 + Math.max(78, Math.ceil(estW(w.title, 14.5) / (wd - 86)) * 21 + 20 + Math.ceil(estW(w.one_line, 12.5) / (wd - 86)) * 19) + 2;
  const ends = [], lh = [];
  WK.forEach(w => { w.x = xq(w.year); w.wd = Math.max(214, stripW(w)); let k = 0; while (ends[k] !== undefined && ends[k] + 8 > w.x) k++; ends[k] = w.x + w.wd; w.k = k; w.h = ch(w, w.wd); lh[k] = Math.max(lh[k] || 0, w.h); });
  const tops = []; let acc = 30; lh.forEach((h, k) => { tops[k] = acc; acc += h + 12; });
  const late = w => w.year > 2004;
  const cardQ = (w, style) => { const hi = w.id === 'w07'; const sc = late(w) ? mixHex(C.car, C.fg, 0.35) : C.car; return `<div style="${style}"><div style="width: ${stripW(w)}px; max-width: 100%; height: 12px; background: ${hi ? C.glow : sc}; ${hi ? 'box-shadow: 0 0 18px 4px rgba(255,220,156,0.45);' : ''}"></div><div style="box-sizing: border-box; padding: 7px 10px 10px; background: ${late(w) ? '#25100F' : C.bg2}; border: 1px solid ${hi ? C.glow : C.rule2}; ${late(w) ? 'opacity: 0.86;' : ''}"><div style="display: flex; align-items: baseline; gap: 6px;"><span style="font-family: ${F.serif}; font-size: 14.5px; font-weight: 700; line-height: 21px; ${hi ? GLOWTXT : ''}">${esc(w.title)}</span>${MODE[w.mode] ? `<span title="${w.mode === 'negative' ? '负向' : '正向'}" style="font-size: 11px; color: ${C.carT};">${MODE[w.mode]}</span>` : ''}</div><div style="font-family: ${F.mono}; font-size: 11px; line-height: 17px; color: ${C.cap};">${w.year}${w.m ? ' · 提及 ' + w.m : ' · 只叫“手”'}</div><div style="margin-top: 3px; font-size: 12.5px; line-height: 19px; color: ${C.fg2};">${esc(w.one_line)}</div></div></div>`; };
  const cardQ2 = (w, style) => { const hi = w.id === 'w07'; const sc = late(w) ? mixHex(C.car, C.fg, 0.35) : C.car; return `<div style="${style}"><div style="width: ${stripW(w)}px; max-width: 100%; height: 12px; background: ${hi ? C.glow : sc}; ${hi ? 'box-shadow: 0 0 18px 4px rgba(255,220,156,0.45);' : ''}"></div><div style="box-sizing: border-box; padding: 8px 10px 10px; display: grid; grid-template-columns: 52px minmax(0, 1fr); gap: 0 10px; align-items: start; background: ${late(w) ? '#25100F' : C.bg2}; border: 1px solid ${hi ? C.glow : C.rule2};">${poster(w.id, w.title, '52px')}<div style="min-width: 0;"><div style="display: flex; align-items: baseline; gap: 6px;"><span style="font-family: ${F.serif}; font-size: 14.5px; font-weight: 700; line-height: 21px; ${hi ? GLOWTXT : ''}">${esc(w.title)}</span>${MODE[w.mode] ? `<span title="${w.mode === 'negative' ? '负向' : '正向'}" style="font-size: 11px; color: ${C.carT};">${MODE[w.mode]}</span>` : ''}</div><div style="font-family: ${F.mono}; font-size: 11px; line-height: 17px; color: ${C.cap};">${w.year}${w.m ? ' · 提及 ' + w.m : ' · 只叫“手”'}</div><div style="margin-top: 3px; font-size: 12.5px; line-height: 19px; color: ${C.fg2};">${esc(w.one_line)}</div></div></div></div>`; };
  const ax = [1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016, 2020, 2024].map(y => `<span style="position: absolute; left: ${f1(xq(y))}px; top: 0; width: 1px; height: 6px; background: ${C.rule2};"></span><span style="position: absolute; left: ${f1(xq(y))}px; top: 9px; transform: translateX(-50%); font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${y}</span>`).join('');
  const wide = `<div style="margin-top: 26px; overflow-x: auto; padding-bottom: 8px;"><div style="position: relative; width: ${QW}px; height: ${acc + 50}px;"><div style="position: absolute; left: ${f1(xq(2000))}px; top: 0; bottom: 42px; border-left: 1.5px dashed ${C.carT};"></div><div style="position: absolute; left: ${f1(xq(2000) + 6)}px; top: 4px; font-size: 12.5px; color: ${C.carT};">上世纪末</div>${WK.map(w => cardQ2(w, `position: absolute; left: ${f1(w.x)}px; top: ${tops[w.k]}px; width: ${w.wd}px;`)).join('')}<div style="position: absolute; left: 0; right: 0; bottom: 0; height: 40px; border-top: 1px solid ${C.rule2};">${ax}</div></div></div>`;
  const narrow = `<div style="margin-top: 22px; display: grid; gap: 10px;">${WK.map(w => cardQ2(w, '')).join('')}</div>`;
  return `${secOpen('works', 'Q', '作品年表')}${head('Q', '作品年表', '王家卫的十二部作品')}
<p style="${S.intro}">卡片上方色条的长度按片名在转写稿里出现的次数；《花样年华》出现约 168 次。2000 年之后的卡片颜色浅一档。</p>
${WIDE(wide)}${NARROW(narrow)}
<div style="margin-top: 12px; display: flex; flex-wrap: wrap; gap: 6px 18px; font-size: 12.5px; color: ${C.cap};"><span><span style="color: ${C.carT};">▼</span> 负向的未完成</span><span><span style="color: ${C.carT};">▲</span> 正向的未完成</span><span>这个分类是一位主持人的说法，只覆盖他举过的几部</span></div>
${cap('年份按通行记载，节目没有逐一说年份。提及次数合并了转写里的错写，是约数；《爱神之手》节目只叫它“手”，没法单独统计，画成最窄的一条。')}
</section>`;
}

// ===== R 两位主持人的分歧
function sectionR() {
  const rows = D[19][0].map(r => {
    const rs = r.revenge_side, mkL = rs === 'one' ? sq(11) : rs === 'other' ? circ(11) : `<span style="width: 9px; height: 9px; box-sizing: border-box; border-radius: 50%; border: 1.5px solid ${C.cap};"></span>`;
    const mkR = rs === 'other' ? sq(11) : rs === 'one' ? circ(11) : `<span style="width: 9px; height: 9px; box-sizing: border-box; border-radius: 50%; border: 1.5px solid ${C.cap};"></span>`;
    const opA = rs === 'one' ? oR : rs === 'other' ? oL : '', opB = rs === 'other' ? oR : rs === 'one' ? oL : '';
    const nmB = /阿吴/.test(r.speaker) ? '阿吴' : '另一种看法';
    const bc = s => s === 'rev' ? C.revM : s === 'love' ? C.loveM : C.rule2;
    const sa = rs === 'one' ? 'rev' : rs === 'other' ? 'love' : '', sb = rs === 'other' ? 'rev' : rs === 'one' ? 'love' : '';
    return `<div style="display: grid; grid-template-columns: {{ rCols }}; grid-template-areas: {{ rAreas }}; gap: 8px 14px; align-items: stretch; padding: 10px 0; border-bottom: 1px solid ${C.rule};">
<div style="grid-area: t; display: flex; align-items: center; justify-content: center; text-align: center; padding: 6px 4px; font-family: ${F.serif}; font-size: 15px; font-weight: 700; line-height: 1.5; text-wrap: balance;">${esc(r.topic)}</div>
<div style="grid-area: l; padding: 10px 12px; background: ${C.bg2}; border-top: 2px solid ${bc(sa)}; ${opA}"><div style="display: flex; align-items: center; gap: 7px; ${S.lab}">${mkL}一种看法</div><div style="margin-top: 5px; ${S.sm}">${esc(r.one_host)}</div></div>
<div style="grid-area: r; padding: 10px 12px; background: ${C.bg2}; border-top: 2px solid ${bc(sb)}; ${opB}"><div style="display: flex; align-items: center; gap: 7px; ${S.lab} ${nmB === '阿吴' ? `color: ${C.fg};` : ''}">${mkR}${nmB}</div><div style="margin-top: 5px; ${S.sm}">${esc(r.other_host)}</div></div>
</div>`;
  }).join('');
  return `${secOpen('debate', 'R', '他们在哪里读法不同')}${head('R', '他们在哪里读法不同', '两位主持人的分歧')}
<div style="${S.lead}">这一期两人的大判断基本一致：《花样年华》是收官之作，复仇构思的放弃成全了这部片，王家卫属于 90 年代。分歧多在具体镜头的读法上。</div>
<div style="margin-top: 22px; display: flex; flex-wrap: wrap; align-items: center; gap: 10px 22px;"><span style="display: inline-flex; align-items: center; gap: 7px; ${S.sm}">${circ(11)}按爱情读的一边</span><span style="display: inline-flex; align-items: center; gap: 7px; ${S.sm}">${sq(11)}按复仇读的一边</span>${hlToggle}</div>
<div style="margin-top: 26px; border-top: 1px solid ${C.rule3};">${rows}</div>
${cap('转写没有说话人标注，左右两栏不固定对应某一位主持人；只有“是不是复仇故事”那一行能确认右栏是阿吴。两边画得一样重，不判输赢。')}
</section>`;
}

// ===== S 提及榜与数字
function sectionS() {
  const M = D[20][0], Y = D[20][1];
  const HL = { '杜可风': C.craftT, '张叔平': C.craftT, '李屏宾': C.craftT, '张曼玉': C.act, '梁朝伟': C.act, '苏丽珍': C.loveT, '周慕云': C.act, '复仇': 'rev', '扮演': C.formT, '电饭煲': C.formT, '旗袍': C.craftT };
  const NOTE = { 人物: '杜可风 37、张叔平 35、李屏宾 34：三位幕后几乎打平，和两位主演在一个量级。', 角色: '苏丽珍 311 次，比周慕云 264 次多近五十次；节目的结论也是“苏丽珍这一头更深层、更热烈”。', 概念: '“复仇”和“扮演”各 67 次，并列：一个被放弃的构思，一个被保留的形式。“电饭煲”37 次，比“旗袍”30 次还多。', 影片: '' };
  const group = (g, flex) => { const rs = M.filter(r => r.group === g), mx = Math.max(...rs.map(r => +r.mentions)); return `<div style="flex: ${flex}; min-width: 0;">${sub(g, '')}<div style="margin-top: 8px;">${rs.map(r => { const c = HL[r.name]; const pk = g === '人物' && PK[r.name] && HAVE['p-' + PK[r.name]] ? PK[r.name] : null; return `<div style="display: grid; grid-template-columns: ${g === '人物' ? '26px 104px' : '112px'} minmax(0, 1fr) 40px; gap: 10px; align-items: center; padding: 3px 0;">${g === '人物' ? (pk ? mini(pk, r.name, 26) : '<span></span>') : ''}<span style="font-size: 13.5px; ${c ? `color: ${C.fg}; font-weight: 700;` : `color: ${C.fg2};`} white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${esc(r.name)}</span><span style="height: 10px; width: ${f1(+r.mentions / mx * 100)}%; ${c === 'rev' ? `background: ${STRIPE};` : `background: ${c || rgba(C.fg, 0.32)};`}"></span><span style="font-family: ${F.mono}; font-size: 12.5px; ${c ? `color: ${C.fg};` : `color: ${C.cap};`} text-align: right;">${r.mentions}</span></div>`; }).join('')}</div>${NOTE[g] ? `<div style="margin-top: 10px; ${S.sm}">${NOTE[g]}</div>` : ''}</div>`; };
  const ymx = Math.max(...Y.map(y => +y.mentions));
  const ycols = `<div style="margin-top: 16px; display: flex; align-items: flex-end; gap: 10px; overflow-x: auto; padding-bottom: 4px;">${Y.map(y => `<div style="flex: 1 0 84px; display: flex; flex-direction: column; align-items: stretch;"><span style="font-family: ${F.mono}; font-size: 12.5px; text-align: center;">${y.mentions}</span><span style="margin-top: 4px; height: ${Math.round(+y.mentions / ymx * 120)}px; background: ${C.amb};"></span><span style="margin-top: 6px; font-family: ${F.mono}; font-size: 15px; font-weight: 600; text-align: center; color: ${C.amb};">${y.year}</span><span style="margin-top: 2px; font-size: 12px; line-height: 1.45; text-align: center; color: ${C.cap};">${esc(y.meaning)}</span></div>`).join('')}</div><div style="margin-top: 10px; ${S.xs}">年代：“60 年代”28 次，“90 年代”16 次，“70 年代”12 次，“30 年代”7 次。年份含“62 年”“66 年”这类两位数写法，排除了片名《2046》和“25 年过去了”这类时长。</div>`;
  const PICK = ['5 小时 1 分', '第 5 名', '15 个月', '2500 万港币', '七成比三成', '3 对、7 次', '约 15 秒', '0.1 秒', '1 个字', '一部半'];
  const nums = `<div style="margin-top: 16px; ${grid(220, '10px')}">${PICK.map(p => D21.find(r => r[0] === p)).filter(Boolean).map(r => `<div style="padding: 16px 16px 14px; background: ${C.bg2}; border-style: solid; border-color: ${C.bar}; border-width: 6px 0; box-shadow: 0 0 0 1px ${C.rule2};"><div style="font-family: ${F.serif}; font-size: 28px; font-weight: 900; line-height: 1.2;">${esc(r[0])}</div><div style="margin-top: 8px; ${S.sm}">${esc(r[1])}</div><div style="margin-top: 8px; font-size: 11.5px; color: ${C.cap};">${esc(r[2])}</div></div>`).join('')}</div>`;
  return `${secOpen('mentions', 'S', '谁被提得最多')}${head('S', '谁被提得最多', '节目最在意谁、哪部片、哪一年')}
<p style="${S.intro}">按转写稿统计，已合并转写里的各种错写，数字是约数。王家卫本人出现约 407 次，不列入排名。</p>
<div style="margin-top: 28px; display: flex; flex-wrap: wrap; gap: 36px 40px; align-items: flex-start;">${group('人物', '1 1 360px')}${group('角色', '1 1 360px')}</div>
<div style="margin-top: 40px; display: flex; flex-wrap: wrap; gap: 36px 40px; align-items: flex-start;">${group('影片', '1 1 360px')}${group('概念', '1 1 360px')}</div>
<div style="margin-top: 48px;">${sub('年份', '节目里说到的具体年份')}${ycols}</div>
<div style="margin-top: 48px;">${sub('数字', '')}${nums}</div>
</section>`;
}

function footer() {
  return `<footer style="padding: 40px ${PAD} 44px; border-top: 18px solid ${C.bar}; background: ${C.bg2};">
<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 16px 24px;"><span aria-hidden="true" style="flex: none; width: 46px; height: 46px; background: radial-gradient(circle at 30% 40%, rgba(60,45,30,0.2) 0 1.4px, transparent 2.4px) 0 0 / 11px 13px, linear-gradient(160deg, #C4B8A4, #A79B87); display: flex; align-items: center; justify-content: center;"><span style="width: 20px; height: 16px; background: #0D0806; clip-path: polygon(18% 6%, 46% 0, 74% 9%, 94% 30%, 100% 58%, 86% 86%, 58% 100%, 28% 94%, 6% 76%, 0 44%);"></span></span><div style="font-family: ${F.serif}; font-size: 18px; font-weight: 700;">年份与数字均据节目口述整理。</div></div>
<div style="margin-top: 14px; max-width: 1000px; display: grid; gap: 6px; font-size: 13px; line-height: 1.8; color: ${C.cap};"><div>节目：《电影巨辩》付费专辑《为了华语电影》第 6 集，主持老马（magasa）、阿吴（LOOK），录制于 2025 年初，全长 5:01:42，平台上切成 8 段（序号 59–66，其中 59–63 是按上一集顺延推定的）。时间一律是 8 段首尾相接的全片时间，同时给出第几段的几分几秒。</div><div>转写没有说话人标注，观点统一写作“节目”或“一位主持人”“另一位主持人”；只有三处能确认说话人：老马对重映问题的回答、阿吴“我绝对不会认为他讲的是复仇”、两人各自的启蒙。</div><div>标“报道”“公开资料”的几项对照过公开资料：《视与听》第五名、2025 年重映票房、斯德哥尔摩电影节的年份、美国票房、三趟快车的日期。和报道不一致的地方两者都写了。</div><div>为整理者所加：板块名、八个内容类别、“爱情／复仇”两种板块的划分、话题关键词组、重复层级里没数次数的几项、食物时间线上“陈先生出差”“红色风衣”两格的位置。板块按节目里的过渡句切分，误差约一分钟；提及次数为约数。</div><div>海报来自英文维基百科（合理使用）；人物照片和吴哥窟、金雀餐厅的照片来自维基共享资源，按各自的授权使用。人物照片多为近年所摄，不是拍片时的样子。剧照的位置留空，可以把图片直接拖进去；任何一张图都可以拖入新图替换。</div></div>
${seriesNav({ color: C.cap, footer: true })}
</footer>`;
}

// ===== assemble
const helmet = `<helmet>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<script src="./image-slot.js"></script>
<style>
  body { margin: 0; background: #0D0405; }
  a { color: ${C.amb}; text-decoration: none; }
  a:hover { color: ${C.fg}; }
  html { scroll-behavior: smooth; }
  @keyframes hy06-sway { from { transform: rotate(-15deg); } to { transform: rotate(15deg); } }
  @media (prefers-reduced-motion: reduce) { [data-sway] { animation: none !important; } }
</style>
</helmet>`;
const bodyParts = [cover(), sectionB(), divider('两个核心问题', '复仇还是爱情 · 复制的复制 · 出自第 3、4 段'), sectionD(), sectionE(), divider('按节目的顺序', '从片外走进片内：名声、缘起、未完成、留白、穿帮、表演、美术与摄影、调度、上海与结尾'), sectionF(), sectionG(), sectionH(), sectionI(), sectionJ(), sectionK(), sectionL(), sectionM(), sectionN(), sectionO(), divider('走出片外', '王家卫本人 · 第 8 段'), sectionP(), divider('附录', '作品年表 · 两位主持人的分歧 · 提及榜与数字'), sectionQ(), sectionR(), sectionS(), footer()];
const template = `${helmet}
<div style="width: 100%; max-width: {{ frameW }}; margin: 0 auto; background: ${C.bg}; color: ${C.fg}; font-family: ${F.sans}; font-variant-numeric: tabular-nums; overflow: hidden;">
${bodyParts.join('\n')}
</div>`;
const JS = `
class Component extends DCLogic {
  mq = window.matchMedia('(max-width: 759px)');
  state = { mqNarrow: this.mq.matches, allSt: null, hl: null };
  componentDidMount() {
    this.onMq = (e) => this.setState({ mqNarrow: e.matches });
    this.mq.addEventListener('change', this.onMq);
    const addFonts = () => {
      if (document.getElementById('hy06-fonts')) return;
      const l = document.createElement('link');
      l.id = 'hy06-fonts'; l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@600;700;900&family=Noto+Sans+SC:wght@400;500;700&family=IBM+Plex+Mono:wght@400;600&display=swap';
      document.head.appendChild(l);
    };
    if (document.readyState === 'complete') setTimeout(addFonts, 0);
    else window.addEventListener('load', addFonts, { once: true });
  }
  componentWillUnmount() { this.mq.removeEventListener('change', this.onMq); }
  renderVals() {
    const mob = (this.props.layout ?? '自动') === '手机预览';
    const narrow = mob || this.state.mqNarrow, wide = !narrow;
    const allSt = this.state.allSt ?? (this.props.showAllStations ?? true);
    const hl = this.state.hl ?? (this.props.highlightReading ?? '两种都看');
    const btn = (k) => hl === k ? ['${C.fg}', '${C.bg}'] : ['${C.bg2}', '${C.fg}'];
    const [bA, cA] = btn('两种都看'), [bL, cL] = btn('只看爱情'), [bR, cR] = btn('只看复仇');
    const amb = '${C.amb}';
    const pendulum = React.createElement('span', { 'data-sway': '1', style: { position: 'absolute', left: '50%', top: 0, width: 1, height: 34, marginLeft: -0.5, background: amb, transformOrigin: '50% 0', animation: 'hy06-sway 3.6s ease-in-out infinite alternate' } },
      React.createElement('span', { style: { position: 'absolute', left: -5, bottom: -6, width: 11, height: 11, borderRadius: '50%', background: amb } }));
    return {
      frameW: mob ? '390px' : '1440px',
      isWide: wide, isNarrow: narrow,
      g3: wide ? 'minmax(0, 1fr) 56px minmax(0, 1fr)' : 'minmax(0, 1fr)',
      gHouse: wide ? 'minmax(0, 1fr) 46px minmax(0, 1fr)' : 'minmax(0, 1fr)',
      corridorMode: wide ? 'vertical-rl' : 'horizontal-tb',
      sceneCols: wide ? 'minmax(0, 1fr) minmax(0, 0.92fr) minmax(0, 1fr)' : 'minmax(0, 1fr)',
      sceneAreas: wide ? '"l s r"' : '"s" "l" "r"',
      rCols: wide ? 'minmax(0, 1fr) 210px minmax(0, 1fr)' : 'minmax(0, 1fr)',
      rAreas: wide ? '"l t r"' : '"t" "l" "r"',
      g7: wide ? 'repeat(7, minmax(0, 1fr))' : 'minmax(0, 1fr)',
      g9: wide ? 'repeat(9, minmax(0, 1fr))' : 'repeat(2, minmax(0, 1fr))',
      stMinorGrid: allSt ? 'grid' : 'none',
      stBtn: allSt ? '收起细节站点，只看 ${N1} 个板块起点' : '展开全部 ${NST} 个站点',
      toggleSt: () => this.setState({ allSt: !allSt }),
      opLove: hl === '只看复仇' ? 0.14 : 1, opRev: hl === '只看爱情' ? 0.14 : 1,
      hbAll: bA, hcAll: cA, hbLove: bL, hcLove: cL, hbRev: bR, hcRev: cR,
      hlAll: () => this.setState({ hl: '两种都看' }), hlLove: () => this.setState({ hl: '只看爱情' }), hlRev: () => this.setState({ hl: '只看复仇' }),
      pendulum
    };
  }
}`;
const props = { highlightReading: { editor: 'enum', options: ['两种都看', '只看爱情', '只看复仇'], default: '两种都看', tsType: 'string', section: '两种读法' }, showAllStations: { editor: 'boolean', default: true, tsType: 'boolean', section: '节目地图' }, layout: { editor: 'enum', options: ['自动', '手机预览'], default: '自动', tsType: 'string', section: '版式' } };
const propsAttr = JSON.stringify(props).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="./support.js"></script>
</head>
<body>
<x-dc>
${template}
</x-dc>
<script type="text/x-dc" data-dc-script data-props="${propsAttr}">${JS}</script>
</body>
</html>
`;
const bad = ['undefined', 'NaN', '[object Object]'];
bad.forEach(b => { let i = template.indexOf(b); if (i >= 0) log('WARN', b, 'at', template.slice(Math.max(0, i - 220), i + 40)); });
const holes = [...new Set(template.match(/\{\{\s*[^}]+\}\}/g))];
log('holes', holes.join(' '));
await saveFile(EPISODE.page, html);
log('saved', html.length, 'chars; stations', NST, 'L1', N1, 'bins', BINS.length, 'secs', SECS.length);

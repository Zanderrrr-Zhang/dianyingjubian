// ===== N Mad Detective
function sectionN() {
  const n = D[18][0];
  const steps = `<div style="margin-top: 16px; display: grid; gap: 6px;">${n.steps.map((s, i) => `<div style="margin-left: calc(${i} * min(4.2vw, 56px)); display: grid; grid-template-columns: 34px minmax(90px, 140px) minmax(0, 1fr) minmax(0, 1fr); gap: 0; ${S.card} border-left: 3px solid ${C.self};"><div style="padding: 10px 0; text-align: center; font-family: ${F.mono}; font-size: 14px; font-weight: 600;">${s.n}</div><div style="padding: 10px 10px; font-family: ${F.serif}; font-size: 15px; font-weight: 700; line-height: 1.5;">${esc(s.scene)}</div><div style="padding: 10px 12px; border-left: 1px solid ${C.rule}; font-size: 13.5px; line-height: 1.6; color: ${C.sub};"><span style="${S.lab}">观众此时以为</span><br>${esc(s.audience_thinks)}</div><div style="padding: 10px 12px; border-left: 1px solid ${C.rule}; font-size: 13.5px; line-height: 1.6; color: ${C.fg};"><span style="${S.lab}">后来才知道</span><br>${esc(s.later)}</div></div>`).join('')}</div>`;
  const guns = `<div style="margin-top: 16px; overflow-x: auto; padding-bottom: 6px;"><div style="display: grid; grid-template-columns: repeat(${n.guns.length}, minmax(0, 1fr)) minmax(0, 1.2fr); gap: 0; min-width: 1040px; align-items: start;">${n.guns.map((g, i) => `<div style="min-width: 0; padding-right: 12px;"><div style="display: flex; align-items: center; gap: 0;"><span style="flex: none; width: 22px; height: 22px; background: ${C.self}; color: ${C.bg}; display: flex; align-items: center; justify-content: center; font-family: ${F.mono}; font-size: 11.5px; font-weight: 600;">${i + 1}</span><span style="flex: 1; height: 1.5px; background: ${C.rule3};"></span><span style="flex: none; width: 0; height: 0; border-left: 8px solid ${C.rule3}; border-top: 5px solid transparent; border-bottom: 5px solid transparent;"></span></div><div style="margin-top: 8px; font-size: 13.5px; line-height: 1.6; color: ${C.fg2};">${esc(g)}</div></div>`).join('')}<div style="min-width: 0; padding: 10px 12px; background: ${C.bar}; border: 1px solid ${C.rule3}; font-size: 13.5px; line-height: 1.6;"><span style="font-family: ${F.serif}; font-size: 15px; font-weight: 700;">结尾：一遍遍换枪</span><br><span style="color: ${C.fg2};">${esc(n.end.replace(/^结尾：/, ''))}</span></div></div></div>${cap(esc(n.guns_note) + '。')}`;
  return `${secOpen('mad', 'N', '开天眼')}${head('N', '开天眼', '《神探》：观众怎样一步步看懂“开天眼”')}
<div style="margin-top: 24px; display: flex; flex-wrap: wrap; gap: 24px 48px; align-items: flex-start;">${poster('mad', '《神探》', 132)}<p style="${S.intro} margin-top: 0; flex: 1 1 360px;">节目单讲《神探》25 分钟，认为它是杜琪峰和韦家辉结合最完美、最平衡的一部。${esc(n.made)}。一位主持人说，${esc(n.real_ghosts.replace(/^一位主持人说，/, ''))}。</p><div style="flex: 0 1 420px; min-width: 0;">${subtitleCard('看见也许并不重要，感受才是最重要的。', '一位主持人谈《神探》', false, 'clamp(19px, 2vw, 24px)')}</div></div>
<div style="margin-top: 36px;">${sub('N1 七步引导', '一级一级往下走，观众越来越确定自己看到的是什么')}${steps}</div>
<div style="margin-top: 44px;">${sub('N2 六个连环扣', '六把枪在几个人手里换来换去')}${guns}</div>
${cap('片中说要“用右脑来破案”：靠直觉和想象，干左脑的活。')}
</section>`;
}

// ===== O chance & necessity
function sectionO() {
  const k = D[16][0].karma, bn = D[16][0].breaking_news, ju = D[16][0].judo, nd = D[16][0].needle, a = D[19][0];
  const pf = k.pass_flower, pl = k.pass_flame;
  const flower = `<div style="display: flex; align-items: center; gap: 10px; height: 36px;"><span style="width: 18px; height: 18px; box-sizing: border-box; border: 1.5px dashed ${C.rule3};"></span>${arrowR(C.sub)}<span style="width: 18px; height: 18px; background: ${C.aud};"></span></div>`;
  const flame = `<div style="display: flex; align-items: center; gap: 10px; height: 36px;"><span style="width: 18px; height: 18px; border-radius: 50%; background: ${C.self};"></span>${arrowR(C.sub)}<span style="width: 18px; height: 18px; border-radius: 50%; background: ${C.glow}; ${GLOWBOX}"></span></div>`;
  const ana = (o, d, pick) => `<div style="padding: 14px 16px; ${pick ? `background: ${C.bg3}; border: 1.5px solid ${C.fg};` : S.card} min-width: 0;">${d}<div style="margin-top: 8px; font-family: ${F.serif}; font-size: 19px; font-weight: 700;">${esc(o.name)}</div><div style="margin-top: 4px; font-size: 14px; line-height: 1.6; color: ${C.fg2};">${esc(o.means)}</div><div style="margin-top: 8px; font-size: 13px; line-height: 1.6; color: ${pick ? C.fg : C.sub};">${esc(o.in_film)}</div></div>`;
  const left = `<div style="flex: 1 1 400px; min-width: 0;">${sub('《大只佬》', '因生成果')}<div style="margin-top: 14px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px;">${ana(pf, flower, false)}${ana(pl, flame, true)}</div><div style="margin-top: 16px; font-family: ${F.serif}; font-size: 24px; font-weight: 700; letter-spacing: 0.08em;">菩萨畏因，凡人畏果。</div><div style="margin-top: 4px; font-size: 12.5px; color: ${C.cap};">节目引《法华经》的意思</div><div style="margin-top: 12px; ${S.body}">${esc(k.bottle)}。这部片得了${esc(k.award)}。</div></div>`;
  const mid = `<div style="flex: 0 1 240px; min-width: 0; align-self: center;">${subtitleCard('命运的摆弄完全看不到。', '《非常突然》，节目的话', false, '20px')}<div style="margin-top: 8px; font-size: 12.5px; line-height: 1.6; color: ${C.cap}; text-align: center;">${esc(a.sudden.replace(/^命运的摆弄完全看不到，/, ''))}</div></div>`;
  const chain = `<div style="margin-top: 14px; display: grid; gap: 4px;">${a.accident.map((s, i) => { const last = i === a.accident.length - 1; return `${i ? arrowD(C.sub) : ''}<div style="padding: 9px 12px; ${last ? `background: ${C.self}; color: ${C.bg};` : S.card} font-size: 13.5px; line-height: 1.6; ${last ? '' : `color: ${C.fg2};`}">${esc(s)}</div>`; }).join('')}</div><div style="margin-top: 12px; font-family: ${F.serif}; font-size: 16px; font-weight: 700;">最后一格是一个非理性的时刻。</div>`;
  const right = `<div style="flex: 1 1 360px; min-width: 0;">${sub('《意外》', '制造偶然的人')}${chain}<div style="margin-top: 16px;">${quote('所谓的完美犯罪，只不过是别人没有发现你的漏洞而已。', '一位主持人谈《意外》', 17)}</div><div style="margin-top: 10px; font-size: 13px; line-height: 1.7; color: ${C.sub};">之后：${esc(a.followed_by)}。</div></div>`;
  const three = `<div style="margin-top: 14px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr)); gap: 14px;">
<div style="padding: 14px 16px; ${S.card} border-top: 3px solid ${C.self};"><div style="font-family: ${F.serif}; font-size: 17px; font-weight: 700;">《大事件》</div><div style="margin-top: 6px; font-size: 14px; line-height: 1.7; color: ${C.fg2};">${esc(bn.take)}。</div><div style="margin-top: 10px; display: flex; flex-wrap: wrap; gap: 4px; align-items: center;">${bn.relay.map((r, i) => `${i ? `<span style="color: ${C.faint}; font-size: 12px;">›</span>` : ''}<span style="padding: 1px 6px; border: 1px solid ${C.rule2}; font-size: 12px; line-height: 1.6; ${r.includes('报纸') ? `transform: rotate(-4deg); background: ${C.fg}; color: ${C.bg};` : ''}">${esc(r)}</span>`).join('')}</div><div style="margin-top: 10px; font-size: 13px; line-height: 1.6; color: ${C.sub};">节目说它讲的是：${esc(bn.theme)}。</div></div>
<div style="padding: 14px 16px; ${S.card} border-top: 3px solid ${C.self};"><div style="font-family: ${F.serif}; font-size: 17px; font-weight: 700;">《柔道龙虎榜》</div><div style="margin-top: 6px; font-size: 14px; line-height: 1.7; color: ${C.fg2};">${ju.not.map(esc).join('，')}；${esc(ju.sars)}。</div><div style="margin-top: 8px; font-size: 13.5px; line-height: 1.7; color: ${C.fg2};"><span style="${S.lab}">酒吧</span> ${esc(ju.bar)}。</div><div style="margin-top: 6px; font-size: 13.5px; line-height: 1.7; color: ${C.fg2};"><span style="${S.lab}">救气球</span> ${esc(ju.balloon)}。</div></div>
<div style="padding: 14px 16px; ${S.card} border-top: 3px solid ${C.aud};"><div style="font-family: ${F.serif}; font-size: 17px; font-weight: 700;">《龙凤斗》：${esc(nd.line)}</div><div style="margin-top: 6px; font-size: 14px; line-height: 1.7; color: ${C.fg2};">${esc(nd.logic)}。</div></div>
</div>`;
  return `${secOpen('chance', 'O', '偶然与必然')}${head('O', '偶然与必然', '《大只佬》《意外》怎么讲因果')}
<div style="margin-top: 24px; display: flex; flex-wrap: wrap; gap: 20px 32px; align-items: flex-start;"><div style="display: flex; gap: 12px;">${poster('karma', '《大只佬》', 120)}${poster('accident', '《意外》', 120)}</div><p style="${S.intro} margin-top: 0; flex: 1 1 420px;">节目把《大只佬》归到“两轨之间”：商业概念加佛理。它讲的不是前世今生，是因果法则。六年后郑保瑞的《意外》把命运主题推到了哲学层面。</p></div>
<div style="margin-top: 32px; display: flex; flex-wrap: wrap; gap: 32px 40px; align-items: flex-start;">${left}${mid}${right}</div>
<div style="margin-top: 48px;">${sub('同一段里的另外三部', '2004 年')}${three}</div>
</section>`;
}

// ===== P north
function sectionP() {
  const p = D[20][0], co = p.collision, mf = p.mad_fate;
  const tr = tbl(['', '《省港旗兵》', '《毒战》'], p.trespass.map(r => [esc(r.row), esc(r.old), esc(r.drug_war)]), 'minmax(60px, 90px) minmax(0, 1fr) minmax(0, 1fr)', [0, 0, C.self]);
  const coll = `<div style="margin-top: 14px; display: grid; grid-template-columns: minmax(0, 1fr) 30px minmax(110px, 150px) 30px minmax(0, 1fr); gap: 6px; align-items: center;"><div style="padding: 12px 14px; ${S.card} font-size: 14px; line-height: 1.6;"><span style="${S.lab}">缉毒警察</span><br>${esc(co.police)}</div>${arrowR(C.fg)}<div style="padding: 14px 8px; background: ${C.fg}; color: ${C.bg}; text-align: center; font-family: ${F.serif}; font-size: 18px; font-weight: 900;">${esc(co.result)}</div><span style="transform: scaleX(-1); display: flex; justify-content: center;">${arrowR(C.fg)}</span><div style="padding: 12px 14px; ${S.card} font-size: 14px; line-height: 1.6;"><span style="${S.lab}">毒贩</span><br>${esc(co.dealers)}</div></div>${cap('一位主持人认为：' + esc(co.reading.replace(/（一位主持人）$/, '')) + '。')}`;
  const kings = `<div style="margin-top: 14px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr)); gap: 10px;">${p.triad_kings.map(t => `<div style="padding: 12px 14px; ${S.card}"><div style="font-family: ${F.serif}; font-size: 16px; font-weight: 700;">${esc(t.who)}</div><div style="margin-top: 6px; font-size: 13.5px; line-height: 1.6; color: ${C.fg2};">${esc(t.fate)}</div></div>`).join('')}</div><div style="margin-top: 14px; display: flex; flex-wrap: wrap; gap: 10px 20px; align-items: baseline;"><span style="font-family: ${F.serif}; font-size: 24px; font-weight: 700; letter-spacing: 0.1em;">兔死狐悲</span><span style="flex: 1 1 320px; font-size: 14px; line-height: 1.7; color: ${C.fg2};">节目说：${esc(p.mood)}。</span></div>`;
  const mad = `<div style="margin-top: 14px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px;">${[mf.west, mf.east].map(s => `<div style="padding: 12px 14px; ${S.card}"><div style="font-family: ${F.serif}; font-size: 16px; font-weight: 700;">${esc(s.who)}</div><div style="margin-top: 6px; font-size: 14px; line-height: 1.6; color: ${C.fg2};">${esc(s.way)}</div><div style="margin-top: 6px; font-size: 13px; color: ${C.sub};">结局：${esc(s.end)}</div></div>`).join('')}</div><div style="margin-top: 12px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px;"><div style="padding: 12px 14px; background: ${C.bar}; border: 1px dashed ${C.rule3}; font-size: 13.5px; line-height: 1.6; color: ${C.fg2};"><span style="${S.lab}">原来的结尾</span><br>${esc(mf.ending_dispute.first.replace(/^原来的结尾/, ''))}</div><div style="padding: 12px 14px; background: ${C.bg3}; border: 1px solid ${C.rule3}; font-size: 13.5px; line-height: 1.6; color: ${C.fg2};"><span style="${S.lab}">最后的结尾</span><br>${esc(mf.ending_dispute.final)}</div></div>`;
  return `${secOpen('north', 'P', '北上')}${head('P', '北上', '2011 年之后发生了什么')}
<div style="margin-top: 24px; display: flex; flex-wrap: wrap; gap: 24px 48px; align-items: flex-start;"><p style="${S.intro} margin-top: 0; flex: 1 1 520px;">节目说，${esc(p.after_2010.replace(/；/, '。').replace(/。黑色/, '；黑色'))}。北上之后，节目认为只有《毒战》算成功；${esc(p.why_bold[0].replace(/（一位主持人推测）$/, ''))}，这是一位主持人的推测，另外${esc(p.why_bold[1])}。</p><div style="flex: 0 1 440px; min-width: 0;">${subtitleCard('北上不成功，没有什么特别复杂的原因，就是因为审查。', '节目的结论', false, 'clamp(18px, 1.9vw, 22px)')}<div style="margin-top: 8px; font-size: 13px; line-height: 1.7; color: ${C.sub};">节目说：${esc(p.verdict.split('：').slice(1).join('：'))}。</div></div></div>
${posterRow([['lwp', '《夺命金》', '2011'], ['drugwar', '《毒战》', '2013'], ['blind', '《盲探》', '2013'], ['trivisa', '《树大招风》', '2016'], ['madfate', '《命案》', '2023']], 96)}
<div style="margin-top: 36px; display: flex; flex-wrap: wrap; gap: 36px 48px; align-items: flex-start;"><div style="flex: 1 1 460px; min-width: 0;">${sub('P1 越界', '《省港旗兵》和《毒战》')}${tr}</div><div style="flex: 1 1 460px; min-width: 0;">${sub('P2 国家机器与拜金主义', '《毒战》里两条线相向而行')}${coll}</div></div>
<div style="margin-top: 44px; display: flex; flex-wrap: wrap; gap: 36px 48px; align-items: flex-start;"><div style="flex: 1 1 460px; min-width: 0;">${sub('P3 一种气氛没有了', '《树大招风》的三个贼王')}${kings}</div><div style="flex: 1 1 460px; min-width: 0;">${sub('P4 两种方案', '《命案》：面对命运的态度可以选择')}${mad}</div></div>
${cap('这个模块涉及节目对内地审查和官场描写的评论，措辞只用节目说的。')}
</section>`;
}

// ===== Q people
function sectionQ() {
  const [team, actors, j] = D[21];
  const TM = Object.fromEntries(team.map(t => [t.who, t]));
  const POS = [['韦家辉', 205, 'w'], ['游乃海', 240, 'w'], ['司徒锦源', 300, 'w'], ['欧健儿', 335, 'w'], ['郑保瑞', 15, 'd'], ['罗永昌', 45, 'd'], ['郑兆强', 75, 'b'], ['大卫·理查森', 105, 'b'], ['卓宝仪', 135, 'b'], ['朱淑仪', 170, 'p']];
  const PH = { 韦家辉: 'waika', 游乃海: 'yau', 郑保瑞: 'soi', 罗永昌: 'law' };
  const AK = { 刘德华: 'andylau', 郑秀文: 'sammi', 刘青云: 'lauchingwan', 古天乐: 'louis', 张家辉: 'nick', 林家栋: 'gordon', 任达华: 'simon', 任贤齐: 'richie', 林雪: 'lamsuet', 黄秋生: 'anthony' };
  const GS = { w: ['编剧', '', 1.6], d: ['导演', '', 2.4], b: ['幕后班底', '4 3', 1.2], p: ['制片', '1 3', 1.4] };
  const pt = a => [50 + 40 * Math.cos(a * Math.PI / 180), 50 + 36 * Math.sin(a * Math.PI / 180)];
  const lines = POS.map(([n, a, g]) => { const [x, y] = pt(a); return `<line x1="50" y1="50" x2="${f1(x)}" y2="${f1(y)}" stroke="${C.ppl === '' ? '' : '#9C8FAA'}" strokeWidth="${GS[g][2]}" ${GS[g][1] ? `strokeDasharray="${GS[g][1]}"` : ''} vectorEffect="non-scaling-stroke"></line>`; }).join('');
  const nodes = POS.map(([n, a]) => { const [x, y] = pt(a), t = TM[n]; return `<div style="position: absolute; left: ${f1(x)}%; top: ${f1(y)}%; width: 0; height: 0;">${PH[n] ? `<div style="position: absolute; left: -18px; top: -18px;">${photo(PH[n], n, 36, 36, 'box-shadow: 0 0 0 2px #9C8FAA;')}</div>` : `<span style="position: absolute; left: -6px; top: -6px; width: 12px; height: 12px; border-radius: 50%; background: ${C.ppl}; box-shadow: 0 0 0 2px ${C.bg}, 0 0 0 3px #9C8FAA;"></span>`}<div style="position: absolute; left: -70px; width: 140px; ${y < 50 ? `bottom: ${PH[n] ? 22 : 10}px;` : `top: ${PH[n] ? 22 : 10}px;`} text-align: center; white-space: nowrap;"><div style="font-family: ${F.serif}; font-size: 14.5px; font-weight: 700; line-height: 1.3;">${n}</div><div style="font-size: 11.5px; color: ${C.cap};">${esc(t.role)}</div></div></div>`; }).join('');
  const ring = `<div style="overflow-x: auto;"><div style="min-width: 680px; background: #000; padding: 14px 0;"><div style="position: relative; aspect-ratio: 2.35 / 1; background: ${C.bg};"><svg viewBox="0 0 100 100" preserveAspectRatio="none" style="position: absolute; inset: 0; width: 100%; height: 100%;">${lines}</svg>${nodes}<div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); padding: 10px 16px; background: ${C.ppl}; color: #fff; text-align: center;"><div style="display: flex; justify-content: center; margin-bottom: 6px;">${photo('to', '杜琪峰', 56, 56, 'box-shadow: 0 0 0 2px #fff;')}</div><div style="font-family: ${F.serif}; font-size: 20px; font-weight: 900;">杜琪峰</div><div style="font-size: 11.5px;">${esc(TM['杜琪峰'].role)}</div></div></div></div></div><div style="margin-top: 10px; display: flex; flex-wrap: wrap; gap: 8px 20px; font-size: 12.5px; color: ${C.fg2};">${Object.values(GS).map(([n, d, w]) => `<span style="display: inline-flex; align-items: center; gap: 6px;"><svg width="28" height="6"><line x1="0" y1="3" x2="28" y2="3" stroke="#9C8FAA" strokeWidth="${w}" ${d ? `strokeDasharray="${d}"` : ''}></line></svg>${n}</span>`).join('')}<span style="color: ${C.cap};">连线按分工分组，为整理者所加</span></div>`;
  const list = `<div style="margin-top: 18px; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 380px), 1fr)); column-gap: 32px;">${team.map(t => `<div style="display: grid; grid-template-columns: 96px minmax(0, 1fr); gap: 12px; padding: 9px 0; border-bottom: 1px solid ${C.rule};"><span style="font-family: ${F.serif}; font-size: 15px; font-weight: 700;">${esc(t.who)}</span><span style="font-size: 13.5px; line-height: 1.65; color: ${C.fg2};"><span style="color: ${C.cap};">${esc(t.role)} · </span>${esc(t.line)}</span></div>`).join('')}</div>`;
  const acts = `<div style="margin-top: 14px; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr)); gap: 12px;">${actors.map(a => `<div style="padding: 14px 16px; ${S.card} border-top: 3px solid ${C.ppl};"><div style="display: flex; align-items: center; gap: 12px;">${photo(AK[a.actor], a.actor, 56, 70)}<div style="font-family: ${F.serif}; font-size: 18px; font-weight: 700;">${esc(a.actor)}</div></div><div style="margin-top: 8px; ${S.lab}">银河怎么用他</div><div style="margin-top: 2px; font-size: 13.5px; line-height: 1.65; color: ${C.fg2};">${esc(a.how_milkyway_used)}</div><div style="margin-top: 8px; ${S.lab}">节目的评价</div><div style="margin-top: 2px; font-size: 13.5px; line-height: 1.65; color: ${C.fg};">${esc(a.program_view)}</div></div>`).join('')}</div>`;
  return `${secOpen('people', 'Q', '人与演员')}${head('Q', '人与演员', '谁在银河里做什么')}
<div style="margin-top: 24px; display: flex; flex-wrap: wrap; gap: 24px 48px; align-items: flex-start;"><div style="flex: 1 1 520px; min-width: 0;"><p style="${S.intro} margin-top: 0;">节目说杜琪峰导演的方法是反戏剧的：${esc(j.directing.replace(/^反戏剧：/, ''))}。${esc(j.atmosphere_actors)}。</p></div><div style="flex: 0 1 420px; min-width: 0;">${quote('演员身上本来的东西，比演技更重要。', '节目，平台标题', 19)}</div></div>
<div style="margin-top: 32px;">${sub('Q1 团队', '杜琪峰在中间')}<div style="margin-top: 14px;">${ring}</div>${list}</div>
<div style="margin-top: 44px;">${sub('Q2 演员', '节目逐个讲到的十位')}${acts}</div>
<div style="margin-top: 22px; padding: 14px 16px; background: ${C.bg3}; border: 1px solid ${C.rule2}; font-size: 14px; line-height: 1.75; color: ${C.fg2};"><span style="${S.lab}">女性角色</span><br>${esc(j.women)}。</div>
</section>`;
}

// ===== R debates
function sectionR() {
  const mid = `<div aria-hidden="true" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0;"><div style="display: flex; align-items: center; gap: 6px;"><span style="width: 8px; height: 8px; border-radius: 50%; background: ${C.fg};"></span><span style="width: 2px; height: 2px;"></span><span style="width: 8px; height: 8px; border-radius: 50%; background: ${C.fg};"></span></div><span style="flex: 1; width: 1px; margin-top: 6px; background: ${C.rule2};"></span></div>`;
  const cards = D[22][0].map((r, i) => `<div style="min-width: 0; padding: 14px 16px 16px; ${S.card}"><div style="display: flex; align-items: baseline; gap: 10px;"><span style="font-family: ${F.mono}; font-size: 12.5px; color: ${C.cap};">${String(i + 1).padStart(2, '0')}</span><span style="font-family: ${F.serif}; font-size: 16.5px; font-weight: 700; line-height: 1.45;">${esc(r.topic)}</span></div><div style="margin-top: 12px; display: grid; grid-template-columns: minmax(0, 1fr) 30px minmax(0, 1fr); gap: 0 8px; align-items: stretch;"><div><div style="${S.lab}">一种读法</div><div style="margin-top: 4px; font-size: 14px; line-height: 1.7; color: ${C.fg2};">${esc(r.one_host)}</div></div>${mid}<div><div style="${S.lab}">另一种读法</div><div style="margin-top: 4px; font-size: 14px; line-height: 1.7; color: ${C.fg2};">${esc(r.other_host)}</div></div></div></div>`).join('');
  return `${secOpen('debate', 'R', '他们在哪里读法不同')}${head('R', '他们在哪里读法不同', '两位主持人的分歧')}
<p style="${S.intro}">这一期两人的大判断基本一致，分歧多在具体的读法和评价的轻重上。每张卡左右两边各是一位主持人的说法；转写没有说话人标注，不分谁是谁。</p>
<div style="margin-top: 28px; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 520px), 1fr)); gap: 14px;">${cards}</div>
</section>`;
}

// ===== S coda
function sectionS() {
  const s = D[23][0], nf = s.new_film;
  const Y0 = 1976, Y1 = 2027, px = y => (y - Y0) / (Y1 - Y0) * 100;
  const edge = `<div style="margin-top: 22px; position: relative; height: 96px;"><div style="position: absolute; left: 0; width: ${f1(px(2025.2))}%; top: 30px; height: 2px; background: ${C.fg};"></div><div style="position: absolute; left: ${f1(px(2025.2))}%; right: 0; top: 30px; height: 0; border-top: 1px dashed ${C.rule2};"></div><span style="position: absolute; right: 0; top: 6px; font-size: 12px; color: ${C.cap};">天台的边缘</span>${s.three_turns.map(t => `<span style="position: absolute; left: ${f1(px(t.year))}%; top: 31px; width: 26px; height: 30px; margin-left: -13px; background: ${C.fg}; clip-path: polygon(0 0, 100% 0, 50% 100%);"></span><span style="position: absolute; left: ${f1(px(t.year))}%; top: 6px; transform: translateX(-50%); font-family: ${F.mono}; font-size: 13px; font-weight: 600;">${t.year}</span>`).join('')}</div><div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px;">${s.three_turns.map(t => `<div style="padding: 10px 12px; ${S.card} font-size: 14px; line-height: 1.6;"><span style="font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${t.year}</span><br>${esc(t.event)}</div>`).join('')}</div>`;
  const sv = tbl(['', '节目说'], s.sketch_vs_summa.map(r => [esc(r.row), esc(r.text)]), 'minmax(80px, 110px) minmax(0, 1fr)');
  const per = `<div style="margin-top: 14px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px;">${s.two_periods.map(p => `<div style="padding: 12px 14px; ${S.card}"><div style="font-family: ${F.serif}; font-size: 16px; font-weight: 700;">${esc(p.name)} <span style="font-family: ${F.mono}; font-size: 12.5px; font-weight: 400; color: ${C.cap};">${esc(p.years)}</span></div><div style="margin-top: 4px; font-size: 13.5px; color: ${C.fg2};">${esc(p.note)}</div></div>`).join('')}</div>`;
  const el = `<div style="margin-top: 14px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); gap: 12px;">${s.election_3.map((e, i) => `<div style="padding: 14px 16px; border: 1.5px dashed ${C.rule3};"><div style="font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">可能 ${i + 1}</div><div style="margin-top: 4px; font-size: 14.5px; line-height: 1.65; color: ${C.fg};">${esc(e.path)}</div><div style="margin-top: 8px; font-size: 13.5px; color: ${C.sub};">节目的判断：${esc(e.view)}</div></div>`).join('')}</div>`;
  const nfB = `<div style="margin-top: 14px; ${S.body}">${esc(nf.report)}。节目的两种猜测：</div><div style="margin-top: 10px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px;">${nf.guesses.map(g => `<div style="padding: 12px 14px; ${S.card} font-size: 14px; line-height: 1.6;">${esc(g)}</div>`).join('')}</div><div style="margin-top: 10px; font-size: 13px; line-height: 1.7; color: ${C.cap};">节目录制之后，杜琪峰否认已定下和梁朝伟在日本开戏（${esc(nf.later.replace(/^节目录制之后，/, '').replace(/报道杜琪峰否认已定下和梁朝伟在日本开戏$/, '报道'))}）。</div>`;
  return `${secOpen('coda', 'S', '未完成')}${head('S', '未完成', '习作、北上、未完成')}
<p style="${S.intro}">${esc(s.wish)}。</p>
<div style="margin-top: 32px;">${sub('S1 三次转身', '三个向下的折：停下来，再开始')}${edge}</div>
<div style="margin-top: 44px; display: flex; flex-wrap: wrap; gap: 32px 48px; align-items: flex-start;"><div style="flex: 1 1 460px; min-width: 0;">${sub('S2 习作与集大成', '')}${sv}${per}</div><div style="flex: 1 1 400px; min-width: 0;">${sub('S4 一部在日本拍的新片', '录制时的报道，和之后的否认')}${nfB}</div></div>
<div style="margin-top: 44px;">${sub('S3 《黑社会 3》的三种可能', '节目的判断')}${el}</div>
<div style="margin-top: 52px; max-width: 980px; margin-left: auto; margin-right: auto;"><p style="margin: 0 0 22px; font-size: 16px; line-height: 1.9; color: ${C.fg2}; text-align: center; text-wrap: pretty;">${esc(s.closing.replace(/如果没有他们，香港电影史将会苍白很多。$/, ''))}</p>${subtitleCard('如果没有他们，香港电影史将会苍白很多。', '一位主持人，节目的结语', true, 'clamp(24px, 3.2vw, 40px)')}</div>
</section>`;
}

// ===== T mentions & numbers
function sectionT() {
  const [men, yrs] = D[24];
  const HL = { '刘青云': '160 次，和韦家辉 154 次几乎打平', '韦家辉': '', '吴宇森': '41 次，被提到最多的“外人”', '香港': '273 次，比“大陆”和“内地”加起来（117 次）多一倍多' };
  const group = (g, w) => { const rows = men.filter(r => r.group === g); const mx = Math.max(...rows.map(r => +r.mentions)); return `<div style="flex: ${w}; min-width: 0;">${sub(g, rows.length + ' 项')}<div style="margin-top: 8px;">${rows.map(r => { const hl = r.name in HL, note = HL[r.name]; return `<div style="display: grid; grid-template-columns: 118px minmax(0, 1fr) 34px; gap: 2px 8px; align-items: center; padding: 2px 0; font-size: 13px;"><span style="${hl ? 'font-weight: 700;' : `color: ${C.fg2};`} white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${esc(r.name)}">${esc(r.name)}</span><div style="height: 13px;"><div style="width: ${f1(+r.mentions / mx * 100)}%; height: 100%; background: ${hl ? C.fg : C.faint};"></div></div><span style="font-family: ${F.mono}; font-size: 12px; text-align: right;">${r.mentions}</span>${note ? `<span></span><span style="grid-column: 2 / 4; padding-bottom: 4px; font-size: 12px; line-height: 1.5;">↑ ${note}</span>` : ''}</div>`; }).join('')}</div></div>`; };
  const ys = yrs.slice().sort((a, b) => a.year - b.year), ymx = Math.max(...ys.map(r => +r.mentions));
  const ycols = `<div style="margin-top: 16px; display: flex; gap: 6px; align-items: flex-end; height: 160px; border-bottom: 1px solid ${C.rule3};">${ys.map(r => `<div title="${esc(r.year + ' · ' + r.mentions + ' 次 · ' + r.meaning)}" style="flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%;"><span style="font-family: ${F.mono}; font-size: 12px;">${r.mentions}</span><div style="width: 100%; max-width: 44px; height: ${f1(+r.mentions / ymx * 124)}px; background: ${+r.year === 2010 ? C.fg : C.faint};"></div></div>`).join('')}</div><div style="display: flex; gap: 6px;">${ys.map(r => `<span style="flex: 1 1 0; min-width: 0; text-align: center; font-family: ${F.mono}; font-size: 11.5px; padding-top: 4px; overflow: hidden;">${r.year}</span>`).join('')}</div><div style="margin-top: 16px; columns: 300px; column-gap: 28px;">${ys.map(r => `<div style="break-inside: avoid; display: grid; grid-template-columns: 44px minmax(0, 1fr); gap: 8px; padding: 5px 0; border-bottom: 1px solid ${C.rule}; font-size: 13px; line-height: 1.6;"><span style="font-family: ${F.mono};">${r.year}</span><span style="color: ${C.fg2};">${esc(r.meaning)}</span></div>`).join('')}</div>`;
  const pick = ['7 小时 48 分', '2 次', '18 天', '1 比 4', '37 分钟', '7 分钟', '26 个', '15 年'];
  const rows = pick.map(p => D25.find(r => r[0] === p)).filter(Boolean);
  const nums = `<div style="margin-top: 16px; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 270px), 1fr)); gap: 14px;">${rows.map(([n, d, s]) => `<div style="display: flex; flex-direction: column; background: ${C.bg2}; border-top: 6px solid ${C.bar}; border-bottom: 6px solid ${C.bar}; box-shadow: 0 0 0 1px ${C.rule2};"><div style="padding: 16px 18px 18px; display: flex; flex-direction: column; flex: 1;"><div style="font-family: ${F.serif}; font-size: 32px; font-weight: 900; line-height: 1.2;">${esc(n)}</div><div style="margin-top: 10px; font-size: 14px; line-height: 1.7; flex: 1; color: ${C.fg2};">${esc(d)}</div><div style="margin-top: 10px; font-size: 12px; color: ${C.cap};">来源：${esc(s)}</div></div></div>`).join('')}</div>`;
  return `${secOpen('mentions', 'T', '谁被提得最多')}${head('T', '谁被提得最多', '节目最在意谁、哪部片、哪一年')}
<p style="${S.intro}">杜琪峰本人出现约 497 次，不列入排名。</p>
<div style="margin-top: 28px; display: flex; flex-wrap: wrap; gap: 36px 40px; align-items: flex-start;">${group('人物', '1 1 360px')}${group('影片', '1 1 360px')}${group('概念', '1 1 360px')}</div>
<div style="margin-top: 48px;">${sub('年份', '节目里说到的具体年份')}${ycols}</div>
${cap('提及次数含转写变体，是约数。“意外”“黑社会”既是片名也是普通词。')}
<div style="margin-top: 48px;">${sub('数字', '冷知识')}${nums}</div>
</section>`;
}

function footer() {
  return `<footer style="padding: 36px ${PAD} 44px; border-top: 18px solid ${C.bar}; background: ${C.bg2};">
<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 16px 28px;"><div style="position: relative; width: 165px; aspect-ratio: 330 / 186; background: #000;">${slot('logo', '银河映像的标志', 'rect', 'contain')}</div><div style="font-family: ${F.serif}; font-size: 18px; font-weight: 700;">年份与数字均据节目口述整理。</div></div>
<div style="margin-top: 12px; max-width: 980px; display: grid; gap: 6px; font-size: 13px; line-height: 1.8; color: ${C.cap};"><div>节目：《电影巨辩》付费专辑《为了华语电影》第 5 集，主持老马（magasa）、阿吴（LOOK），录制于 2025 年初，全长 7:48:34，平台上切成 13 段（序号 46–58）。</div><div>转写没有说话人标注，观点统一写作“节目”或“一位主持人”。只有模块 E 里标“报道”的几项对照过公开报道。</div><div>评价分档、“哪条轨”的归类、五个时期名、板块的分类名、团队图的连线分组为整理者所加。板块按节目里的过渡句切分，误差约一分钟；提及次数为约数。</div><div>海报、人物照片和银河映像的标志来自维基百科；没找到的留了空位，可以把图片拖进去。</div></div>
${seriesNav({ color: C.cap, footer: true })}
</footer>`;
}

// ===== assemble
const helmet = `<helmet>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<script src="./image-slot.js"></script>
<style>
  body { margin: 0; background: #050607; }
  a { color: ${C.self}; text-decoration: none; }
  a:hover { color: ${C.fg}; }
  html { scroll-behavior: smooth; }
</style>
</helmet>`;
const bodyParts = [cover(), sectionB(), sectionD(), sectionE(), divider('方法论', '工作模式、类型、主题与转变 · 约 55 分钟'), sectionF(), sectionG(), sectionH(), sectionI(), divider('逐部讲作品', '从 1996 年的创业作到 2023 年的《命案》 · 约 320 分钟'), sectionJ(), sectionK(), sectionL(), sectionM(), sectionN(), sectionO(), sectionP(), divider('人与结语', '人物、演员、分歧与总结 · 约 55 分钟'), sectionQ(), sectionR(), sectionS(), sectionT(), footer()];
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
      if (document.getElementById('yh05-fonts')) return;
      const l = document.createElement('link');
      l.id = 'yh05-fonts'; l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@600;700;900&family=Noto+Sans+SC:wght@400;500;700&family=IBM+Plex+Mono:wght@400;600&display=swap';
      document.head.appendChild(l);
    };
    if (document.readyState === 'complete') setTimeout(addFonts, 0);
    else window.addEventListener('load', addFonts, { once: true });
  }
  componentWillUnmount() { this.mq.removeEventListener('change', this.onMq); }
  renderVals() {
    const mob = (this.props.layout ?? '自动') === '手机预览';
    const narrow = mob || this.state.mqNarrow;
    const allSt = this.state.allSt ?? (this.props.showAllStations ?? true);
    const hl = this.state.hl ?? (this.props.highlightTrack ?? '全部');
    const on = (t) => hl === '全部' || (hl === '满足自己' && t === 'self') || (hl === '满足观众' && t === 'audience');
    const op = (t) => on(t) ? 1 : (t === 'both' && hl !== '全部') ? 0.55 : 0.16;
    const btn = (k) => hl === k ? ['${C.fg}', '${C.bg}'] : ['${C.bg2}', '${C.fg}'];
    const [bA, cA] = btn('全部'), [bS, cS] = btn('满足自己'), [bU, cU] = btn('满足观众');
    return {
      frameW: mob ? '390px' : '1440px',
      isWide: !narrow, isNarrow: narrow,
      stMinorGrid: allSt ? 'grid' : 'none',
      stBtn: allSt ? '收起次站，只看 ${N1} 个主站' : '展开全部 ${NST} 个站点',
      toggleSt: () => this.setState({ allSt: !allSt }),
      op_self: op('self'), op_audience: op('audience'), op_both: op('both'), op_none: op('none'),
      hbAll: bA, hcAll: cA, hbSelf: bS, hcSelf: cS, hbAud: bU, hcAud: cU,
      hlAll: () => this.setState({ hl: '全部' }), hlSelf: () => this.setState({ hl: '满足自己' }), hlAud: () => this.setState({ hl: '满足观众' })
    };
  }
}`;
const props = { highlightTrack: { editor: 'enum', options: ['全部', '满足自己', '满足观众'], default: '全部', tsType: 'string', section: '作品星图' }, showAllStations: { editor: 'boolean', default: true, tsType: 'boolean', section: '展开' }, layout: { editor: 'enum', options: ['自动', '手机预览'], default: '自动', tsType: 'string', section: '版式' } };
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
if (template.includes('undefined')) log('WARN undefined at', template.slice(template.indexOf('undefined') - 200, template.indexOf('undefined') + 40));
if (/NaN/.test(template)) log('WARN NaN at', template.slice(template.indexOf('NaN') - 200, template.indexOf('NaN') + 40));
const holes = [...new Set(template.match(/\{\{\s*[^}]+\}\}/g))];
log('holes', holes.join(' '));
await saveFile(EPISODE.page, html);
log('saved', OUT, html.length, 'chars; stations', NST, 'L1', N1, 'works', WK.length, 'bins', BINS.length, 'secs', SECS.length);

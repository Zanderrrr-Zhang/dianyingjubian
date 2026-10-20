// ===== N comrades
function sectionN() {
  const D15 = D[15][0], cm = D15.comrades;
  const n0 = `${figs([posterCap('甜蜜蜜', '1996，陈可辛导演', 120), faceCap('黎明', '演黎小军', 72), faceCap('曾志伟', '演豹哥', 72), faceCap('陈可辛', '导演', 72)], 22)}<div style="margin-top: 22px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr)); gap: 24px 48px; align-items: start;"><div>${quote('可能不是这个题材里面最深刻的，但是说是最感人的一部，可能没有问题。', '老马', 21)}<p style="margin: 14px 0 0; ${S.sm}">${esc(cm.hardest_three)}。</p></div><div><div style="${S.lab}">选角与复出</div>${bullets(cm.casting.map(esc))}</div></div>`;
  const n1 = `${chain(cm.mask.map((t, i) => i === cm.mask.length - 1 ? `<b style="font-family: ${F.serif}; font-size: 14.5px;">${esc(t)}</b>` : esc(t)), true)}${cap(esc(cm.mask_note) + '。')}`;
  const win = `<div style="position: relative; width: 100%; max-width: 380px; aspect-ratio: 4 / 3; box-sizing: border-box; border: 7px solid ${C.ink}; background: linear-gradient(160deg, #D7DFEC, #EFF0F0 62%); overflow: hidden;"><span style="position: absolute; left: 20%; bottom: 0; width: 15%; height: 70%; background: ${rgba(PH.late, 0.5)}; filter: blur(5px); border-radius: 30% 30% 0 0;"></span><span style="position: absolute; left: 44%; bottom: 0; width: 14%; height: 64%; background: ${rgba(PH.late, 0.42)}; filter: blur(5px); border-radius: 30% 30% 0 0;"></span><span style="position: absolute; right: 9%; top: 13%; width: 27%; height: 21%; box-sizing: border-box; border: 3px solid ${C.ink}; background: #8C96A8;"></span><span style="position: absolute; left: 0; right: 0; top: 0; height: 100%; background: linear-gradient(115deg, transparent 0 58%, rgba(255,255,255,0.45) 58% 62%, transparent 62%);"></span></div><div style="margin-top: 8px; font-size: 12px; color: ${C.cap};">一块橱窗玻璃：两个模糊的倒影和一块小屏幕</div>`;
  const n2 = `<div style="margin-top: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr)); gap: 24px 40px; align-items: start;"><div>${win}</div><div style="display: grid; gap: 0;">${cm.reunion.map((t, i) => `<div style="display: grid; grid-template-columns: 30px minmax(0, 1fr); gap: 8px; padding: 9px 0; border-bottom: 1px solid ${C.rule};"><span style="font-family: ${F.type}; font-size: 14px; font-weight: 700;">${String(i + 1).padStart(2, '0')}</span><span style="${S.sm}">${esc(t)}</span></div>`).join('')}</div></div><div style="margin-top: 30px;">${mirror(`<div style="${S.lab}">结尾的笑</div><div style="margin-top: 10px; font-family: ${F.serif}; font-size: clamp(19px, 2.2vw, 26px); font-weight: 700; line-height: 1.6; text-wrap: pretty;">“我想不出来，整个华人电影圈有第二位女演员可以演到这个程度。”</div><div style="margin-top: 6px; font-size: 12.5px; color: ${C.cap};">—— 一位主持人</div><p style="margin: 12px 0 0; ${S.sm}">从木然到像花开一样的笑容：“从容的、会心的，也是水到渠成、理所应当的，还饱含了时间的力量。”</p>`, 'padding: 26px 30px 28px; max-width: 980px;')}</div>`;
  const tr = cm.two_reunions;
  const n3 = `<div style="margin-top: 18px; display: grid; gap: 18px;">${[[tr[0], [1, 1, 1], ['', '', ''], C.faint], [tr[1], [0.7, 1, 1.45], ['中景', '', '特写'], PH.late]].map(([r, ws, ls, col]) => `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 8px 24px; align-items: center;"><div><div style="${S.ttl}">${esc(r.film)}</div><div style="margin-top: 4px; ${S.sm}">${esc(r.how)}</div></div><div style="display: flex; gap: 6px; align-items: flex-end;">${ws.map((w, i) => `<div style="flex: ${w} 1 0; display: flex; flex-direction: column; gap: 4px;"><span style="height: ${f1(14 + (ws[0] === ws[2] ? 0 : i * 7))}px; background: ${col};"></span><span style="font-size: 11px; color: ${C.cap}; min-height: 15px;">${ls[i]}</span></div>`).join('')}</div></div>`).join('')}</div>`;
  const cars = `<span style="display: flex; gap: 3px;">${[0, 1, 2, 3, 4].map(() => `<span style="width: 16px; height: 12px; background: ${PH.late};"></span>`).join('')}</span>`;
  const n4 = `<div style="margin-top: 20px; position: relative; height: 64px;"><div style="position: absolute; left: 0; right: 0; top: 18px; border-top: 2px solid ${C.ink};"></div><div style="position: absolute; left: 0; right: 0; top: 38px; border-top: 2px solid ${C.ink};"></div><div style="position: absolute; left: 0; top: 22px;">${cars}</div><div style="position: absolute; right: 0; top: 22px;">${cars}</div><span style="position: absolute; left: 0; top: 46px; font-size: 11.5px; color: ${C.cap};">开头</span><span style="position: absolute; right: 0; top: 46px; font-size: 11.5px; color: ${C.cap};">结尾</span><span style="position: absolute; left: 50%; top: 0; transform: translateX(-50%); background: ${C.paper}; padding: 0 10px; white-space: nowrap; font-family: ${F.serif}; font-size: 15px; font-weight: 700;">原来两人当年是一起来香港的</span></div><p style="margin: 18px 0 0; max-width: 980px; ${S.sm}">${esc(cm.ending)}。</p>`;
  const mg = cm.morgue, md2 = mg.debate.replace(/（见 D17）$/, '').split('；');
  const n4b = `<p style="margin: 14px 0 0; max-width: 980px; ${S.sm}">${esc(mg.scene)}。</p>${pair(md2[0].replace(/^老马/, ''), md2[1].replace(/^阿吴说/, ''), '老马', '阿吴')}<p style="margin: 16px 0 0; max-width: 980px; ${S.sm}"><b>豹哥。</b>${esc(cm.bao.replace(/^让观众相信她选了曾志伟：/, '让观众相信她选了曾志伟：'))}。</p>`;
  const n5 = grid(230, D15.later.map(l => { const dashed = /花样年华/.test(l.film); return `<div style="background: ${C.card}; border: 1px ${dashed ? 'dashed' : 'solid'} ${C.ink}; padding: 13px 15px 15px;"><div style="display: grid; grid-template-columns: 56px minmax(0, 1fr); gap: 12px;">${poster(tk(l.film), l.film, '56px')}<div style="min-width: 0;"><div style="display: flex; justify-content: space-between; align-items: baseline; gap: 8px;"><span style="${S.ttl}">${esc(l.film)}</span><span style="font-family: ${F.mono}; font-size: 11.5px; color: ${C.cap};">${l.year}</span></div><div style="margin-top: 6px; ${S.sm}">${esc(l.verdict)}</div></div></div></div>`; }).join(''), '12px');
  const cl = D15.clean, CITY = ['汉密尔顿', '温哥华', '伦敦', '巴黎', '旧金山'];
  const route = `<div style="margin-top: 20px; position: relative; height: 62px;"><svg viewBox="0 0 1000 62" preserveAspectRatio="none" style="position: absolute; left: 0; top: 0; width: 100%; height: 62px; overflow: visible;"><path d="M20 44 Q 135 0 260 44 T 500 44 T 740 44 T 980 44" stroke="${PH.late}" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke"></path></svg>${CITY.map((c, i) => `<span style="position: absolute; left: calc(${2 + i * 24}%); top: 44px; width: 9px; height: 9px; margin: -4.5px 0 0 -4.5px; border-radius: 50%; background: ${C.ink};"></span><span style="position: absolute; left: calc(${2 + i * 24}%); top: 52px; transform: translateX(-50%); white-space: nowrap; font-size: 12.5px; font-weight: 600;">${c}</span>`).join('')}</div><div style="height: 18px;"></div>`;
  const cd = cl.debate.replace(/（见 D17）$/, '').split('；');
  const n6 = `${figs([posterCap('清洁', '2004，阿萨亚斯导演', 120), faceCap('尼克·诺尔蒂', '', 72)], 16)}<p style="margin: 14px 0 0; max-width: 980px; ${S.sm}">${esc(cl.film)}。${esc(cl.compensation)}。</p>${route}<p style="margin: 8px 0 0; max-width: 980px; ${S.sm}">${esc(cl.fragments)}。</p><div style="margin-top: 18px; border-top: 1px solid ${C.ink};">${cl.design.map(d => `<div style="display: grid; grid-template-columns: minmax(110px, 170px) minmax(0, 1fr); gap: 14px; padding: 10px 0; border-bottom: 1px solid ${C.rule};"><b style="font-family: ${F.serif}; font-size: 14.5px;">${esc(d.point)}</b><span style="${S.sm}">${esc(d.text)}</span></div>`).join('')}</div>${pair(cd[0].replace(/^一位主持人说/, ''), cd[1].replace(/^另一位说/, ''))}<div style="margin-top: 22px; background: ${PH.late}; color: #fff; padding: 22px 26px 22px; max-width: 980px;"><div style="font-size: 12px; letter-spacing: 0.12em;">戛纳影后</div><div style="margin-top: 10px; font-family: ${F.serif}; font-size: clamp(17px, 1.8vw, 21px); font-weight: 600; line-height: 1.8; text-wrap: pretty;">“${esc(cl.cannes.replace(/^“|”（节目）$/g, ''))}”</div><div style="margin-top: 8px; font-size: 12.5px;">—— 节目</div></div><p style="margin: 16px 0 0; max-width: 980px; ${S.sm}">${esc(cl.alone)}。${esc(cl.rossellini)}。</p><div style="margin-top: 20px; max-width: 980px;">${quote('那这种漂泊呢，也是一种深刻的人生体验。', '一位主持人：对全球化、碎片化生活的理解别人没有，“人的每一天都没有白活”', 19)}</div>`;
  return `${secOpen('comrades', 'N', '最感人的离散片')}${head('N', '最感人的离散片', '《甜蜜蜜》与后期，以及最后一部《清洁》')}
<p style="${S.intro}">${esc(cm.film)}。</p>
${n0}
${block('面具', '李翘', n1)}
${block('纽约重逢', '', n2)}
${block('两次重逢', '上：套路；下：递进', n3)}
${block('首尾的火车', '', n4)}
${block('认尸戏里的笑', '两位主持人的读法', n4b)}
${block('后期的几部', '', n5)}
${block('《清洁》', '最后一部', n6)}
</section>`;
}

// ===== O retire
function sectionO() {
  const D16 = D[16][0];
  const o1 = `${figs([faceCap('赫本', '', 72), faceCap('嘉宝', '', 72), faceCap('张曼玉', '', 72)], 16)}<p style="margin: 14px 0 0; max-width: 980px; ${S.sm}">${esc(D16.hepburn_garbo)}。</p>${table(['', '嘉宝', '张曼玉'], D16.garbo.map(g => [esc(g.row), esc(g.garbo), esc(g.maggie)]), { tpl: '96px minmax(0, 1fr) minmax(0, 1fr)', min: 540 })}<p style="margin: 16px 0 0; max-width: 980px; ${S.sm}">${esc(D16.tony)}。</p><p style="margin: 10px 0 0; max-width: 980px; ${S.sm}">${esc(D16.bfi)}。</p>`;
  const stamp = `<span style="flex: none; display: inline-block; padding: 1px 8px; border: 1.5px dashed ${C.ink}; font-size: 12px; letter-spacing: 0.1em;">未成</span>`;
  const o2 = grid(230, D16.hollywood.map(h => `<div style="${S.card} padding: 13px 15px 15px;"><div style="display: flex; justify-content: space-between; gap: 8px; align-items: center;"><span style="${S.ttl}">${esc(h.film)}</span>${stamp}</div>${h.when ? `<div style="margin-top: 3px; font-family: ${F.mono}; font-size: 11.5px; color: ${C.cap};">${esc(h.when)}</div>` : ''}<div style="margin-top: 6px; ${S.sm}">${esc(h.result)}</div></div>`).join(''), '12px') + cap(esc(D16.hollywood_note) + '。');
  const o3 = `<div style="margin-top: 18px; display: grid; gap: 6px; max-width: 900px;">${D16.age.map((a, i) => { const inner = `<div style="display: flex; gap: 12px; align-items: baseline;"><span style="font-family: ${F.type}; font-size: 14px; font-weight: 700;">${String(a.step).padStart(2, '0')}</span><span style="${a.step === 2 ? `font-family: ${F.serif}; font-size: 16px; font-weight: 700; line-height: 1.7;` : S.sm}">${esc(a.text)}</span></div>`; return `${i ? arrowD(C.faint) : ''}${a.step === 2 ? `<div style="margin: 8px 0;">${mirror(inner, 'padding: 16px 20px 18px;')}</div>` : `<div style="${S.card} padding: 10px 14px;">${inner}</div>`}`; }).join('')}</div><p style="margin: 18px 0 0; max-width: 980px; ${S.sm}">${esc(D16.her_reasons)}。</p><p style="margin: 10px 0 0; max-width: 980px; ${S.sm}">${esc(D16.series)}。</p>`;
  const o4 = grid(230, D16.missed.map(m => { const nm = m.who.match(/^[^《（]+/)[0]; return card(`<div style="display: flex; gap: 12px; align-items: flex-start;">${faceIf(nm, 44)}<div style="flex: 1; min-width: 0;"><div style="${S.ttl}">${esc(m.who)}</div><div style="margin-top: 6px; ${S.sm}">${esc(m.text)}</div></div>${posterIf(m.who, '44px')}</div>`); }).join(''), '12px') + `<div style="margin-top: 20px; max-width: 980px;">${quote('懂生活是更高的标准。', '侯孝贤谈她，节目转述：她“对生活有感觉”；“最好的导演和最好的演员没有合作成”', 21)}</div>`;
  const o5 = `<div style="margin-top: 16px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr)); gap: 10px;">${D16.since.map(s => tc(esc(s.form), esc(s.what))).join('')}</div><p style="margin: 14px 0 0; max-width: 980px; font-size: 12.5px; line-height: 1.7; color: ${C.cap};">${esc(D16.singer)}。</p><p style="margin: 14px 0 0; max-width: 980px; ${S.sm}">${esc(D16.structural)}。</p>`;
  const R3 = D16.three_routes, ys = [28, 84, 140];
  const fork = `<div style="margin-top: 20px; display: flex; align-items: stretch; gap: 0; max-width: 620px;"><svg width="200" height="168" viewBox="0 0 200 168" style="flex: none; display: block;"><circle cx="14" cy="84" r="7" fill="${C.ink}"></circle>${ys.map(y => `<path d="M14 84 C 90 84, 110 ${y}, 184 ${y}" fill="none" stroke="${C.ink}" strokeWidth="1.8"></path><path d="M194 ${y} L182 ${y - 6} L182 ${y + 6} Z" fill="${C.ink}"></path>`).join('')}</svg><div style="flex: 1; display: flex; flex-direction: column;">${R3.map(r => `<div style="height: 56px; display: flex; align-items: center; gap: 12px; padding-left: 8px;">${face(PK[r.who], r.who, 40)}<span style="font-family: ${F.serif}; font-size: 20px; font-weight: 900;">${esc(r.route.split('：')[0])}</span><span style="font-size: 14px;">${esc(r.who)}${r.route.includes('：') ? `<span style="color: ${C.cap};">　${esc(r.route.split('：')[1])}</span>` : ''}</span></div>`).join('')}</div></div>${cap(esc(D16.three_routes_note) + '。')}`;
  const mi = D16.michelle, mdb = mi.debate.replace(/（见 D17）$/, '').split('；');
  const o6 = `${fork}<div style="margin-top: 24px; ${S.lab}">杨紫琼的路</div>${chain(mi.path.map(esc), true)}<p style="margin: 14px 0 0; max-width: 980px; ${S.sm}">${esc(mi.persona)}。</p>${pair(mdb[0].replace(/^一位主持人说/, ''), mdb[1].replace(/^另一位/, ''))}<div style="margin-top: 18px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 0; ${S.card}">${mi.consensus.map((c, i) => `<div style="padding: 16px 18px; ${i ? `border-left: 1px solid ${C.ink};` : ''}"><div style="display: flex; align-items: center; gap: 12px;">${face(PK[c.who], c.who, 48)}<div style="font-family: ${F.serif}; font-size: 19px; font-weight: 700;">${esc(c.who)}</div></div><div style="margin-top: 8px; ${S.body}">${esc(c.trait)}</div></div>`).join('')}</div>${cap('两人对人格的判断收拢到一处：外向进取与内心自洽。')}`;
  return `${secOpen('retire', 'O', '巅峰息影')}${head('O', '巅峰息影', '她为什么不演了，是谁的遗憾')}
${block('从赫本到嘉宝', '', o1, 32)}
${block('好莱坞的几次机会', '节目说法', o2)}
${block('年龄的四步', '', o3)}
${block('没合作成的导演', '', o4)}
${block('近二十年', '', o5)}
${block('三条路线', '', o6)}
</section>`;
}

// ===== P debate
function sectionP() {
  const R = D[17][0];
  const kind = c => /^收拢/.test(c) ? 'solid' : /^部分收拢/.test(c) ? 'dashed' : '';
  const W = 230;
  const rowW = r => { const k = kind(r.converged); return `<div style="display: grid; grid-template-columns: minmax(0, 1fr) ${W}px minmax(0, 1fr); align-items: stretch;"><div style="padding: 8px 22px 8px 0;"><div style="${S.card} padding: 10px 12px; height: 100%; box-sizing: border-box; ${S.sm}">${esc(r.one_view)}</div></div><div style="position: relative; display: flex; align-items: center; justify-content: center; padding: 10px 14px; text-align: center; ${k ? `background: linear-gradient(90deg, ${C.ink} 0 100%) 0 50% / 100% 0 no-repeat;` : ''}">${k ? `<span style="position: absolute; left: -22px; right: -22px; top: 50%; border-top: 1.5px ${k} ${C.ink};"></span>` : ''}<span style="position: relative; background: ${C.glass}; padding: 3px 6px;"><span style="display: block; font-family: ${F.mono}; font-size: 10.5px; color: ${C.cap};">${r.time}</span><span style="display: block; font-family: ${F.serif}; font-size: 13.5px; font-weight: 700; line-height: 1.45;">${esc(r.topic)}</span><span style="display: block; margin-top: 3px; font-size: 11px; line-height: 1.5; color: ${C.cap};">${esc(r.converged)}</span></span></div><div style="padding: 8px 0 8px 22px;"><div style="${S.card} padding: 10px 12px; height: 100%; box-sizing: border-box; ${S.sm}">${esc(r.other_view)}</div></div></div>`; };
  const rowN = r => `<div style="padding: 12px 0; border-bottom: 1px solid ${C.rule};"><div style="display: flex; gap: 8px; align-items: baseline; flex-wrap: wrap;"><span style="font-family: ${F.mono}; font-size: 11px; color: ${C.cap};">${r.time}</span><b style="font-family: ${F.serif}; font-size: 15px;">${esc(r.topic)}</b><span style="font-size: 11.5px; color: ${C.cap};">${esc(r.converged)}</span></div><div style="margin-top: 8px; display: grid; gap: 6px;"><div style="${S.card} padding: 8px 10px; ${S.sm}"><span style="color: ${C.cap};">一种看法　</span>${esc(r.one_view)}</div><div style="${S.card} padding: 8px 10px; ${S.sm}"><span style="color: ${C.cap};">另一种看法　</span>${esc(r.other_view)}</div></div></div>`;
  const wide = `<div style="margin-top: 28px;"><div style="display: grid; grid-template-columns: minmax(0, 1fr) ${W}px minmax(0, 1fr); font-size: 12.5px; color: ${C.cap};"><span style="padding: 0 22px 12px 0;">一种看法</span><span style="text-align: center; padding-bottom: 12px;">话题 · 全片时间</span><span style="padding: 0 0 12px 22px;">另一种看法</span></div><div style="position: relative;"><div aria-hidden="true" style="position: absolute; top: 0; bottom: 0; left: calc(50% - ${W / 2}px); width: ${W}px; box-sizing: border-box; border: 1.5px solid ${C.ink}; background: ${C.glass};">${bulbs('12px')}</div><div style="position: relative; padding: 14px 0;">${R.map(rowW).join('')}</div></div></div>`;
  return `${secOpen('debate', 'P', '两位主持人的分歧')}${head('P', '他们在哪里看法不同', '一面竖着的化妆镜，两侧各一种看法', null)}
<p style="${S.intro}">这一期两人的大判断基本一致：她是香港的特例，《阮玲玉》《甜蜜蜜》《花样年华》最难，《迷离劫》最值得讨论，息影是华语电影的结构性问题。分歧多在一个镜头怎么读、一部片喜不喜欢。</p>
${WIDE(wide)}
${NARROW(`<div style="margin-top: 16px;">${R.map(rowN).join('')}</div>`)}
${cap('转写没有说话人标注，左右两边不对应固定的主持人；只有写了“老马”“阿吴”的几行能确认是谁。镜子中间的实线表示对话里收拢了，虚线表示部分收拢，没有线表示没有收拢。两边画得一样重，不判输赢。')}
</section>`;
}

// ===== Q mentions
function sectionQ() {
  const [men, byClip, yrs] = D[18];
  const HL = { '阿萨亚斯': '143 次，是王家卫 63 次的两倍多；111 次集中在第 10、11 段', '王家卫': '', '陈自强': '43 次，38 次在第 2 段', '《迷离劫》': '', '演员': '330 次，比“明星”240 次多', '明星': '' };
  const bars = (g, title, n) => { const rows = men.filter(r => r.group === g).slice(0, n); const mx = Math.max(...rows.map(r => +r.mentions)); return `<div style="flex: 1 1 300px; min-width: 0;">${sub(title, rows.length + ' 项')}<div style="margin-top: 8px;">${rows.map(r => { const hl = HL[r.name]; return `<div style="display: grid; grid-template-columns: 124px minmax(0, 1fr) 30px; gap: 2px 8px; align-items: center; padding: 1.5px 0; font-size: 12.5px;"><span style="display: flex; align-items: center; gap: 6px; min-width: 0; ${hl !== undefined ? 'font-weight: 700;' : `color: ${C.ink2};`}">${g === '人物' ? (hasP(r.name) ? face(PK[r.name], r.name, 20) : '<span style="flex: none; width: 20px;"></span>') : ''}<span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${esc(r.name)}</span></span><div style="height: 12px; background: linear-gradient(90deg, ${hl !== undefined ? C.ink : '#C9C3B6'} 0 ${f1(+r.mentions / mx * 100)}%, transparent ${f1(+r.mentions / mx * 100)}%);"></div><span style="font-family: ${F.mono}; font-size: 11.5px; text-align: right;">${r.mentions}</span>${hl ? `<span></span><span style="grid-column: 2 / 4; padding-bottom: 4px; font-size: 12px; line-height: 1.5;">↑ ${esc(hl)}</span>` : ''}</div>`; }).join('')}</div></div>`; };
  const cols = Array.from({ length: 15 }, (_, i) => String(i + 1));
  const HC = { '阿萨亚斯': ['10', '11'], '陈自强': ['2'], '张曼玉（每千字）': ['5'] };
  const heat = `<div style="margin-top: 16px; overflow-x: auto;"><div style="min-width: 760px; display: grid; grid-template-columns: 132px repeat(15, minmax(0, 1fr)); gap: 2px;"><span></span>${cols.map(c => `<span style="text-align: center; font-family: ${F.type}; font-size: 12px; font-weight: 700; padding-bottom: 4px;">${c}</span>`).join('')}${byClip.map(r => { const vals = cols.map(c => +r[c]), mx = Math.max(...vals), per = /每千字/.test(r.name); return `<span style="font-size: 12.5px; ${per ? 'font-weight: 700;' : ''} align-self: center; padding-right: 6px;">${esc(r.name)}</span>${cols.map((c, i) => { const v = vals[i], a = mx ? v / mx : 0, hi = (HC[r.name] || []).includes(c); return `<span title="${esc(r.name + ' · 第 ' + c + ' 段 · ' + r[c])}" style="height: 30px; display: flex; align-items: center; justify-content: center; font-family: ${F.mono}; font-size: 10.5px; background: ${rgba(C.ink, 0.04 + a * 0.86)}; color: ${a > 0.5 ? '#fff' : C.ink2}; ${hi ? `box-shadow: inset 0 0 0 2px ${PH.industry};` : ''}">${v || ''}</span>`; }).join('')}`; }).join('')}</div></div>${cap('每行按自己的最大值着色。最后一行是张曼玉本人每千字被提到的次数：前 4 段只有 0.7 到 3.3 次，第 5 段讲她的身世，一下子跳到 10 次以上。玫红框是上面说到的几处。')}`;
  const yph = y => y < 1983 ? null : y <= 1988 ? 'early' : y <= 1994 ? 'prime' : y <= 2004 ? 'late' : 'coda';
  const ys = yrs.slice().sort((a, b) => a.year - b.year), ymx = Math.max(...ys.map(r => +r.mentions));
  const ycol = `<div style="margin-top: 16px; overflow-x: auto;"><div style="min-width: 640px;"><div style="display: flex; gap: 5px; align-items: flex-end; height: 150px; border-bottom: 1px solid ${C.ink};">${ys.map(r => { const p = yph(+r.year); return `<div title="${esc(r.year + ' · ' + r.mentions + ' 次 · ' + r.meaning)}" style="flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%;"><span style="font-family: ${F.mono}; font-size: 11.5px;">${r.mentions}</span><div style="width: 100%; max-width: 36px; height: ${f1(+r.mentions / ymx * 112)}px; ${p ? phBg(p) + phEdge(p) : `background: ${C.faint};`}"></div></div>`; }).join('')}</div><div style="display: flex; gap: 5px;">${ys.map(r => `<span style="flex: 1 1 0; min-width: 0; text-align: center; font-family: ${F.mono}; font-size: 10.5px; padding-top: 4px; overflow: hidden;">${r.year}</span>`).join('')}</div></div></div><div style="margin-top: 14px; columns: 300px; column-gap: 28px;">${ys.map(r => `<div style="break-inside: avoid; display: grid; grid-template-columns: 44px minmax(0, 1fr); gap: 8px; padding: 5px 0; border-bottom: 1px solid ${C.rule}; font-size: 12.5px; line-height: 1.6;"><span style="font-family: ${F.mono};">${r.year}</span><span style="color: ${C.ink2};">${esc(r.meaning)}</span></div>`).join('')}</div>`;
  const pick = ['7 小时 22 分', '2:06', '60.1 分钟', '1967 年', '1.5 万', '800 万', '12 部', '4 次', '400 万法郎', '143 次'];
  const nums = pick.map(p => D19.find(r => r[0] === p)).filter(Boolean);
  return `${secOpen('mentions', 'Q', '提及榜、年份与数字')}${head('Q', '谁被提得最多', '节目最在意谁、哪部片、哪一年', null)}
<p style="${S.intro}">张曼玉本人出现约 770 次，不列入人物排名。次数按转写统计，已合并 ASR 的各种错写，是约数。</p>
<div style="margin-top: 26px; display: flex; flex-wrap: wrap; gap: 36px 40px; align-items: flex-start;">${bars('人物', '人物', 31)}${bars('影片', '影片', 33)}<div style="flex: 1 1 300px; min-width: 0; display: grid; gap: 36px;">${bars('角色', '角色', 17)}${bars('概念', '概念', 30)}</div></div>
${block('谁在哪一段', '几位人物在 15 段里各被提到几次', heat)}
${block('年份', '节目里说到的具体年份', ycol + cap('四位数、“83 年”、“六七年”三种写法合并；金额、时长、片名里的数字不算。年代词：80 年代 46 次，70 年代 26 次，90 年代 23 次，20 世纪 8 次，60 年代 6 次，30 年代 5 次，新世纪 3 次，50 年代 2 次，1910 年代 2 次。色条颜色按那一年落在她生涯的哪个阶段，1983 年以前用灰色。'))}
${block('数字', '', `<div style="margin-top: 18px; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr)); gap: 12px;">${nums.map(([n, d, s]) => `<div style="display: flex; flex-direction: column; ${S.card}"><div style="height: 14px; background: ${holes(C.card)} 0 4px / 100% 5px no-repeat, ${C.ink};"></div><div style="padding: 12px 16px 16px; display: flex; flex-direction: column; flex: 1;"><div style="font-family: ${F.serif}; font-size: 30px; font-weight: 900; line-height: 1.2;">${esc(n)}</div><div style="margin-top: 8px; font-size: 14px; line-height: 1.7; flex: 1;">${esc(d)}</div><div style="margin-top: 8px; font-size: 11.5px; color: ${C.cap};">来源：${esc(s)}</div></div></div>`).join('')}</div>`)}
</section>`;
}

function footer() {
  return `<footer style="padding: 40px ${PAD} 48px; border-top: 2px solid ${C.ink}; background: ${C.wall};">
<div style="width: min(100%, 420px); aspect-ratio: 2.39 / 1; background: ${PH.coda}; box-shadow: inset 0 0 0 1px ${C.ink};"></div>
<div style="margin-top: 22px; font-family: ${F.serif}; font-size: 18px; font-weight: 700;">年份与数字均据节目口述整理，获奖与作品年份据维基百科。</div>
<div style="margin-top: 12px; max-width: 1000px; display: grid; gap: 6px; font-size: 13px; line-height: 1.8; color: ${C.cap};"><div>节目：《电影巨辩》付费专辑《为了华语电影》第 9 集，主持老马（magasa）、阿吴（LOOK），录制于 2025 年夏，全长 7:22:21，平台上切成 15 段（序号 91–105）。</div><div>转写没有说话人标注。能确认是谁的只有几处：阿吴的“那必须是张曼玉”；老马对《甜蜜蜜》、三部最难的片、《宋家皇朝》和《阮玲玉》形式的评价；分歧表里写了名字的三行。其余写作“节目”“一位主持人”“另一位主持人”。</div><div>阶段、类型和板块名，作品的五档评价，两类拿手戏的片单，公司对明星控制强弱的那条线，为整理者所加。板块按节目里的过渡句切分，误差约一分钟；提及次数含转写变体，是约数。</div><div>和公开资料不一致的地方：节目说她 1983 年去英国参加“环球小姐”进了前 15 名，维基百科是 1983 年世界小姐（Miss World）半决赛；《阮玲玉》维基百科英文版作 1991 年，香港上映和柏林获奖是 1992 年。</div><div>海报和人物照片取自维基百科（中文版），版权归原权利人；空着的框可以把图片拖进来。歌曲只写歌名。</div></div>
${seriesNav({ color: C.cap, footer: true })}
</footer>`;
}

// ===== assemble
const helmet = `<helmet>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<script src="./image-slot.js"></script>
<style>
  body { margin: 0; background: #DCD7CC; }
  a { color: ${C.ink}; text-decoration: underline; text-decoration-color: rgba(28,27,26,0.35); text-underline-offset: 3px; }
  a:hover { color: ${PHT.industry}; text-decoration-color: ${PHT.industry}; }
  html { scroll-behavior: smooth; }
</style>
</helmet>`;
const compact = s => s.replace(/(style(?:-hover)?)="([^"]*)"/g, (m, k, v) => k + '="' + v.replace(/\s*([:;,])\s*/g, '$1').replace(/;$/, '').trim() + '"').replace(/rgba\(28,27,26,(0?\.\d+)\)/g, (m, a) => '#1c1b1a' + Math.round(+a * 255).toString(16).padStart(2, '0'));
const chFace = n => `<figure style="margin: 0; flex: none; width: 76px; display: flex; flex-direction: column; align-items: center; gap: 7px; text-align: center;"><span style="position: relative; display: block; width: 64px; height: 64px; border-radius: 50%; overflow: hidden; background: #3A3833; color: ${C.paper}; box-shadow: 0 0 0 2px ${C.paper};">${slot(PK[n], n, 'circle')}</span><figcaption style="font-size: 12.5px; color: #DDD8CE;">${esc(n)}</figcaption></figure>`;
const chPoster = (t, y) => `<figure style="margin: 0; flex: none; width: 70px;"><div style="position: relative; width: 70px; aspect-ratio: 2 / 3; overflow: hidden; background: #3A3833; color: ${C.paper}; box-shadow: 0 0 0 1px ${C.paper};">${slot(fk(t), t + ' 海报')}</div><figcaption style="margin-top: 6px; font-family: ${F.mono}; font-size: 11px; color: #B9B4AA;">${y}</figcaption></figure>`;
const ledge = inner => `<div style="margin-top: 34px; display: flex; flex-wrap: wrap; gap: 16px 14px; align-items: flex-end; padding-bottom: 14px; border-bottom: 6px solid #3A3833;">${inner}</div>`;
const ROW1 = ledge(['王羽', '李小龙', '许冠文', '成龙', '周星驰', '张国荣', '梅艳芳', '林青霞', '郑裕玲', '萧芳芳'].filter(hasP).map(chFace).join(''));
const ROW2 = ledge([['旺角卡门', 1988], ['不脱袜的人', 1989], ['滚滚红尘', 1990], ['阿飞正传', 1990], ['爱在别乡的季节', 1990], ['双城故事', 1991], ['新龙门客栈', 1992], ['青蛇', 1993], ['东方三侠', 1993], ['东邪西毒', 1994], ['迷离劫', 1996], ['甜蜜蜜', 1996], ['宋家皇朝', 1997], ['中国匣', 1997]].filter(([t]) => IMG[fk(t)]).map(([t, y]) => chPoster(t, y)).join(''));
const ROW3 = ledge([['花样年华', 2000], ['英雄', 2002], ['清洁', 2004]].map(([t, y]) => chPoster(t, y)).join('') + '<span style="flex: none; width: 18px;"></span>' + ['张曼玉', '嘉宝', '赫本', '杨紫琼', '梅艳芳'].filter(hasP).map(chFace).join(''));
const KIDS = [
  [PFX + '1', [sectionB()], '100%,5600px', 'showAllStations'],
  [PFX + '2', [strip('09 · D'), sectionD(), strip('09 · E'), sectionE()], '100%,7600px', ''],
  [PFX + '3', [chapter('PART 1 · 0:03–2:06', '她身后的香港', '香港娱乐工业、女星生态、表演风格，合计约 126 分钟。前两个小时还没正式讲她，先讲她身后的那台机器。', ['industry', 'women', 'acting'], true, ROW1), strip('09 · G'), sectionG(), strip('09 · H'), sectionH(), strip('09 · I'), sectionI()], '100%,11000px', ''],
  [PFX + '4', [chapter('PART 2 · 2:06–6:31', '她自己的路', '早年与开窍、演技派之路、喜剧与动作、《迷离劫》、《甜蜜蜜》与后期，合计约 265 分钟。', ['early', 'prime', 'genre', 'intl', 'late'], false, ROW2), strip('09 · J'), sectionJ(), strip('09 · K'), sectionK()], '100%,11000px', ''],
  [PFX + '5', [strip('09 · L'), sectionL(), strip('09 · M'), sectionM(), strip('09 · N'), sectionN()], '100%,13000px', ''],
  [PFX + '6', [chapter('PART 3 · 6:31–7:22', '息影与明星的终结', '巅峰息影，以及明星从哪里来、往哪里去，约 51 分钟。', ['coda'], true, ROW3), strip('09 · O'), sectionO(), strip('09 · F'), sectionF()], '100%,9000px', ''],
  [PFX + '7', [strip('09 · P'), sectionP(), strip('09 · Q'), sectionQ(), footer()], '100%,8000px', '']
];
const sections = KIDS.map(([name, parts]) => `<div id="${name}" data-episode-part="${name}" style="background: ${C.paper}; color: ${C.ink}; font-family: ${F.sans}; font-variant-numeric: tabular-nums;">${parts.join('\n')}</div>`).join('\n');
const template = compact(`${helmet}
<div style="width: 100%; max-width: {{ frameW }}; margin: 0 auto; background: ${C.paper}; color: ${C.ink}; font-family: ${F.sans}; font-variant-numeric: tabular-nums; overflow: hidden; box-shadow: 0 0 0 1px rgba(28,27,26,0.1);">
${cover()}
${strip('09 · B')}
${sections}
</div>`);
const JS1 = `
const ST_RAW = ${JSON.stringify(ST_DATA)};
const ST_CP = ${JSON.stringify(KCP)};
const stRow = r => { const one = r[3] === 1; return { time: r[0], ct: r[1], label: r[2], col: r[4], mw: one ? '8px' : '1.5px', mh: one ? '8px' : '10px', cp: one ? ST_CP[r[5]] : 'none', br: one && r[5] === 'acting' ? '50%' : '0', ff: one ? "${F.serif}" : "${F.sans}", fs: one ? '14.5px' : '13.5px', fw: one ? '600' : '400', fc: one ? '${C.ink}' : '${C.muted}' }; };
const ST_ALL = ST_RAW.map(c => ({ ...c, rows: c.rows.map(stRow) }));
const ST_L1 = ST_RAW.map(c => ({ ...c, rows: c.rows.filter(r => r[3] === 1).map(stRow) }));
const PHV = ${JSON.stringify(Object.fromEntries(PHK.map(p => [p, [phBgV(p, false), phBgV(p, true)]])))};
const INK = '${C.ink}', SILVER = '${C.silver}';
const shOf = p => p === 'coda' ? 'inset 0 0 0 1px ' + INK : p === 'intl' ? 'inset 0 -2px 0 ' + SILVER : 'none';
const B_TAGS = ${JSON.stringify(BTAGS)}.map(r => ({ title: r[1] + ' · 第 ' + r[2] + ' 段 ' + r[3] + ' · ' + r[0], label: r[0], left: r[5] ? r[4] + 'px' : 'auto', right: r[5] ? 'auto' : r[4] + 'px', bottom: r[6] + 'px', bl: r[5] ? '5px solid ' + r[7] : '1px solid ' + INK, br: r[5] ? '1px solid ' + INK : '5px solid ' + r[7] }));
const B_BLK = ${JSON.stringify(BBLK)}.map(r => ({ title: r[0], left: r[1] + 'px', width: r[2] + 'px', bg: PHV[r[3]][r[4]], sh: shOf(r[3]) }));
const M_BLK = ${JSON.stringify(MBLK)}.map(r => ({ top: r[0] + 'px', height: r[1] + 'px', bg: PHV[r[2]][r[3]], sh: shOf(r[2]) }));
class StationLogic extends DCLogic {
  state = { allSt: null };
  renderVals() {
    const allSt = this.state.allSt ?? (this.props.showAllStations ?? false);
    return {
      stClips: allSt ? ST_ALL : ST_L1, bTags: B_TAGS, bBlocks: B_BLK, mBlocks: M_BLK,
      stBtn: allSt ? '收起细节站点，只看 ${N1} 个板块起点' : '展开全部 ${NST} 个站点',
      toggleSt: () => this.setState({ allSt: !allSt })
    };
  }
}`;
const JS = `
${JS1}
class Component extends StationLogic {
  mq = window.matchMedia('(max-width: 759px)');
  state = { ...this.state, mqNarrow: this.mq.matches };
  componentDidMount() {
    this.onMq = (e) => this.setState({ mqNarrow: e.matches });
    this.mq.addEventListener('change', this.onMq);
    const addFonts = () => {
      if (document.getElementById('zmy09-fonts')) return;
      const l = document.createElement('link');
      l.id = 'zmy09-fonts'; l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@600;700;900&family=Noto+Sans+SC:wght@400;500;700&family=IBM+Plex+Mono:wght@400;600&family=Courier+Prime:wght@400;700&display=swap';
      document.head.appendChild(l);
    };
    if (document.readyState === 'complete') setTimeout(addFonts, 0);
    else window.addEventListener('load', addFonts, { once: true });
  }
  componentWillUnmount() { this.mq.removeEventListener('change', this.onMq); }
  renderVals() {
    const mob = (this.props.layout ?? '自动') === '手机预览';
    const narrow = mob || this.state.mqNarrow;
    return {
      ...super.renderVals(),
      frameW: mob ? '390px' : '1440px',
      isWide: !narrow, isNarrow: narrow,
      showAllStations: this.props.showAllStations ?? false
    };
  }
}`;
const props = { showAllStations: { editor: 'boolean', default: false, tsType: 'boolean', section: '按段落回听' }, layout: { editor: 'enum', options: ['自动', '手机预览'], default: '自动', tsType: 'string', section: '版式' } };
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
const chk = (s, n) => { for (const bad of ['undefined', 'NaN', '[object Object]']) { const i = s.indexOf(bad); if (i >= 0) log('WARN', n, bad, s.slice(Math.max(0, i - 160), i + 40)); } };
chk(template, 'main');
log('holes', [...new Set(template.match(/\{\{\s*[^}]+\}\}/g))].join(' '));
await saveFile(OUT, html);
log('saved', OUT, html.length, 'stations', NST, 'L1', N1, 'secs', SECS.length, 'bins', BINS.length, 'terms', TERMS.length, 'works', W5.length, 'D19', D19.length, 'PHR', PHR.length);

// ===== M producer
function sectionM() {
  const D14 = D[14][0];
  const tr = `<div style="margin-top: 14px; max-width: 900px;">${D14.transitions.map(t => `<div style="display: grid; grid-template-columns: minmax(160px, 300px) minmax(0, 1fr); gap: 14px; padding: 10px 0; align-items: center; border-bottom: 1px solid ${C.rule}; ${t.who === '黄建新' ? 'font-weight: 700;' : ''}"><span style="display: flex; align-items: center; gap: 8px; font-family: ${F.serif}; font-size: 15px; font-weight: 700;">${({ '张艺谋、陈凯歌': [['p-zym', '张艺谋'], ['p-ckg', '陈凯歌']], '田壮壮': [['p-tzz', '田壮壮']], '黄建新': [['p-hjx', '黄建新']] }[t.who] || []).map(([k, n]) => mini(k, n, 38)).join('')}${esc(t.who)}</span><span style="font-size: 14px; line-height: 1.7;">${esc(t.how)}</span></div>`).join('')}</div>`;
  const rs = `<div style="margin-top: 18px; display: flex; flex-wrap: wrap; gap: 12px; align-items: stretch;">${D14.reasons.map((r, i) => `<div style="flex: 1 1 200px; min-width: 0; ${S.card} padding: 12px 14px;"><div style="height: 46px; display: flex; align-items: flex-end;">${domino(C.card, '13px', '38px', 10 + i * 14)}</div><div style="margin-top: 8px; ${S.ttl}">${esc(r.title)}</div><div style="margin-top: 5px; ${S.sm}">${esc(r.text)}</div></div>`).join('')}${arrowR()}<div style="flex: 0 1 150px; display: flex; align-items: center; justify-content: center; padding: 14px; background: ${PH.main}; color: #fff; font-family: ${F.serif}; font-size: 18px; font-weight: 700; text-align: center;">转做监制</div></div>`;
  const today = `<div style="margin-top: 18px; display: flex; flex-wrap: wrap; gap: 10px; align-items: stretch;">${D14.today.map(t => `<div style="flex: 1 1 170px; min-width: 0; ${S.card} padding: 14px 14px 16px;"><div style="${S.ttl}">${esc(t.works)}</div><div style="margin-top: 14px;"><span style="display: inline-block; padding: 4px 10px; border: 2px solid ${C.ink}; border-radius: 6px; transform: rotate(-4deg); font-family: ${F.serif}; font-size: 14px; font-weight: 700; line-height: 1.4;">${esc(t.stamp)}</span></div></div>`).join('')}<div style="flex: 1 1 240px; min-width: 0; display: flex; align-items: center; gap: 14px; padding: 12px 6px;">${clock(42)}<div><div style="font-family: ${F.serif}; font-size: 22px; font-weight: 900;">全军覆没</div><div style="margin-top: 3px; font-size: 12.5px; color: ${C.cap};">“他在今天真的是全军覆没。”—— 节目</div></div></div></div>${cap(esc(D14.today_note) + '。')}`;
  const learn = grid(340, D14.learning.map(l => tc(esc(l.film), esc(l.text))).join(''), '12px');
  const pt = grid(300, D14.producer_types.map(p => `<div style="${S.card} border-top: 5px solid ${PH.main}; padding: 14px 16px;"><div style="${S.ttl}">${esc(p.type)}</div><div style="margin-top: 6px; ${S.sm}">${esc(p.examples)}</div><div style="margin-top: 8px; ${S.sm} color: ${C.cap};">${esc(p.note)}</div></div>`).join(''), '12px') + cap(esc(D14.golden_rooster) + '。');
  const bc = D14.byproduct_chain;
  const by = `<div style="margin-top: 18px; display: grid; gap: 8px; max-width: 980px;">${bc.map((b, i) => { const last = i === bc.length - 1; return `<div style="display: grid; grid-template-columns: 40px minmax(0, 1fr); gap: 12px; align-items: center;"><div style="height: 44px; display: flex; align-items: flex-end; justify-content: center;">${domino(last ? PH.main : C.card, '13px', '38px', i * 11, last ? 'rgba(255,255,255,0.75)' : 'rgba(27,27,27,0.55)')}</div><div style="${S.card} padding: 10px 14px; ${last ? `border-width: 2px; font-family: ${F.serif}; font-size: 16px; font-weight: 700;` : S.sm}">${esc(b)}</div></div>`; }).join('')}</div>${cap(esc(D14.byproduct_note) + '。')}`;
  const rh = `<div style="margin-top: 18px; ${S.card}"><div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); background: ${C.wall}; border-bottom: 1px solid ${C.ink}; font-size: 12.5px; letter-spacing: 0.06em;"><span style="padding: 8px 14px;">黄建新的说法</span><span style="padding: 8px 14px; border-left: 1px solid ${C.rule2};">节目的回应</span></div>${D14.rhetoric.map((r, i) => `<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); ${i < D14.rhetoric.length - 1 ? `border-bottom: 1px solid ${C.rule};` : ''}"><span style="padding: 10px 14px; ${S.sm}">${esc(r.his) || `<span style="color: ${C.faint};">—</span>`}</span><span style="padding: 10px 14px; border-left: 1px solid ${C.rule}; ${S.sm}">${esc(r.reply) || `<span style="color: ${C.faint};">—</span>`}</span></div>`).join('')}</div>
<div style="margin-top: 22px; max-width: 980px; background: ${C.ink}; color: ${C.paper}; padding: 22px 26px 20px;"><div style="font-size: 12px; letter-spacing: 0.12em; opacity: 0.8;">黄建新 90 年代的访谈，节目引用</div><div style="margin-top: 10px; font-family: ${F.serif}; font-size: clamp(16px, 1.7vw, 19px); font-weight: 600; line-height: 1.85; text-wrap: pretty;">“${esc(D14.quote_1990s)}”</div></div>${cap(esc(D14.quote_note) + '。')}<p style="margin: 14px 0 0; max-width: 980px; ${S.body}">${esc(D14.self_persuasion)}。</p>`;
  const nat = D14.nationalist;
  const nt = grid(280, nat.evidence.map((e, i) => tc(`证据 ${i + 1}`, esc(e))).join(''), '10px') + `<div style="margin-top: 12px; ${S.card} border-width: 2px; padding: 12px 16px; font-family: ${F.serif}; font-size: 17px; font-weight: 700;">“一位比较朴素的爱国者。”<span style="font-family: ${F.sans}; font-size: 12.5px; font-weight: 400; color: ${C.cap};">　—— 节目：${esc(nat.verdict.replace(/“一位比较朴素的爱国者”，?/, '').replace(/（节目）$/, ''))}</span></div>`;
  const films = grid(280, D14.films.map(f => `<div style="background: ${C.card}; border: 1px dashed ${C.ink}; padding: 14px 16px; display: flex; gap: 14px; align-items: flex-start;">${poster(/建国/.test(f.film) ? 'f-w13' : /建党/.test(f.film) ? 'f-jd' : /建军/.test(f.film) ? 'f-jj' : /1921/.test(f.film) ? 'f-1921' : /决胜/.test(f.film) ? 'f-jszk' : 'f-mm', f.film.replace(/[《》]/g, ''), 64)}<div style="min-width: 0;"><div style="${S.ttl}">${esc(f.film)}</div><div style="margin-top: 6px; ${S.sm}">${esc(f.text)}</div></div></div>`).join(''), '12px') + cap(esc(D14.films_note) + '。') + `<div style="margin-top: 16px; ${S.card} padding: 14px 16px; display: flex; flex-wrap: wrap; gap: 8px 18px; align-items: baseline;"><span style="font-family: ${F.serif}; font-size: 18px; font-weight: 700;">《失眠笔记》</span>${tier(1)}<span style="flex: 1 1 400px; ${S.sm}">${esc(D14.insomniac)}。</span></div>`;
  return `${secOpen('producer', 'M', '监制与主旋律')}${head('M', '全军覆没', '监制与主旋律：先锋的反叛者怎样成了推手', vPosters([['f-w13', '建国大业'], ['f-jd', '建党伟业'], ['f-jj', '建军大业'], ['f-1921', '1921']], 80))}
<p style="${S.intro}">${esc(D14.four_films)}。这一模块涉及审查和主旋律的话，都是节目或一位主持人的看法。</p>
${block('第五代怎么转型', '', tr, 32)}
${block('四个原因', '节目认为，四块骨牌倒向同一个地方', rs)}
${block('今天还能不能过审', '节目的估计', today)}
${block('学做监制', '', learn)}
${block('三类监制', '', pt)}
${block('副产物', '一位主持人的判断：一块推倒一块', by)}
${block('说辞与反驳', '', rh)}
${block('是不是民族主义者', '', nt)}
${block('四部主旋律', '节目只谈技术和叙事', films)}
</section>`;
}

// ===== N actors
function sectionN() {
  const D15 = D[15][0], A = D15.actors;
  const scale = `<svg viewBox="0 0 320 170" style="display: block; width: 100%; max-width: 320px; height: auto;"><path d="M150 160 H170 L160 40 Z" fill="${C.ink}"></path><line x1="60" y1="66" x2="260" y2="30" stroke="${C.ink}" strokeWidth="3"></line><circle cx="160" cy="48" r="5" fill="${C.ink}"></circle><line x1="60" y1="66" x2="60" y2="104" stroke="${C.ink}" strokeWidth="1"></line><line x1="260" y1="30" x2="260" y2="68" stroke="${C.ink}" strokeWidth="1"></line><path d="M24 104 H96 L86 120 H34 Z" fill="${C.ink}"></path><path d="M224 68 H296 L286 84 H234 Z" fill="${C.card}" stroke="${C.ink}" strokeWidth="1.5"></path><rect x="44" y="84" width="32" height="20" fill="${C.ink}"></rect><rect x="252" y="58" width="16" height="10" fill="${C.faint}"></rect></svg><div style="display: flex; justify-content: space-between; max-width: 320px; font-family: ${F.serif}; font-size: 15px; font-weight: 700;"><span>形象（重）</span><span style="color: ${C.muted};">演技（轻）</span></div>`;
  const ACTF = { '刘子枫': [['p-lzf', '刘子枫']], '牛振华': [['p-nzh', '牛振华']], '冯巩': [['p-fg', '冯巩']], '张嘉译': [['p-zjy', '张嘉译']], '王志文、江珊': [['p-wzw', '王志文'], ['p-js', '江珊']], '王劲松': [['p-wjs', '王劲松']], '句号': [['p-jh', '句号']], '达式常': [['p-dsc', '达式常']], '范伟': [['p-fw', '范伟']], '郭冬临、巩汉林': [['p-gdl', '郭冬临'], ['p-ghl', '巩汉林']] };
  const ac = a => `<div style="${S.card} padding: 13px 15px 15px;"><div style="display: flex; gap: 10px; align-items: center;">${(ACTF[a.name] || []).map(([k, n]) => mini(k, n, 52)).join('')}<div style="min-width: 0;"><div style="font-family: ${F.serif}; font-size: 18px; font-weight: 700;">${esc(a.name)}</div><div style="margin-top: 3px; font-size: 12px; color: ${C.cap};">${esc(a.works)}</div></div></div>${a.text ? `<div style="margin-top: 8px; ${S.sm}">${esc(a.text)}</div>` : ''}</div>`;
  const nf = A.find(a => a.name === '牛振华'), fg = A.find(a => a.name === '冯巩');
  const liang = nf.text.split('；').slice(1).join('；').split('。')[0];
  const pairNF = `<div style="margin-top: 18px; display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); gap: 0; align-items: stretch;">${ac(nf)}<div style="width: clamp(70px, 13vw, 170px); display: flex; align-items: center; padding: 0 12px; border-top: 1px solid ${C.ink}; border-bottom: 1px solid ${C.ink}; background: ${C.wall}; font-family: ${F.serif}; font-size: clamp(12px, 1.25vw, 14.5px); font-weight: 700; line-height: 1.6; text-align: center;">牛振华的相声味完全被洗掉了，冯巩只在《埋伏》里洗掉了</div>${ac(fg)}</div>`;
  const rest = grid(250, A.filter(a => a !== nf && a !== fg).map(ac).join('') + `<div style="border: 1px dashed ${C.ink}; padding: 13px 15px 15px;"><div style="${S.lab}">找错了人</div><div style="margin-top: 6px; font-family: ${F.serif}; font-size: 16px; font-weight: 700;">梁冠华</div><div style="margin-top: 6px; ${S.sm}">${esc(liang)}。</div></div>`, '10px');
  const faceN = `<div style="margin-top: 18px; display: flex; flex-wrap: wrap; gap: 18px 28px; align-items: center;">${mini('p-nzh', '牛振华', 110)}<div style="flex: 1 1 420px; min-width: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 150px), 1fr)); gap: 8px;">${[['《站直啰，别趴下》', '莽撞的个体户'], ['《背靠背，脸对脸》', '一百个心眼的馆长'], ['《红灯停，绿灯行》', '伪君子记者']].map(([w, r]) => `<div style="${S.card} padding: 10px 12px;"><div style="font-size: 12px; color: ${C.cap};">${w}</div><div style="margin-top: 4px; ${S.ttl}">${r}</div></div>`).join('')}</div></div>`;
  const wz = D15.wang_zhiwen_debate;
  return `${secOpen('actors', 'N', '演员')}${head('N', '形象第一', '演员：他怎么用人', `<div style="flex: none; display: flex; gap: 12px;">${face('p-nzh', '牛振华', '', 84, true)}${face('p-fg', '冯巩', '', 84, true)}</div>`)}
<div style="margin-top: 26px; display: flex; flex-wrap: wrap; gap: 24px 48px; align-items: center;"><div style="flex: 0 1 320px; min-width: 0;">${scale}</div><div style="flex: 1 1 380px; min-width: 0;"><div style="font-family: ${F.serif}; font-size: clamp(20px, 2.1vw, 25px); font-weight: 700;">形象放在第一位。</div><p style="margin: 10px 0 0; ${S.body}">${esc(D15.principle)}。</p><p style="margin: 10px 0 0; ${S.sm}">${esc(D15.crosstalk)}。</p></div></div>
${block('牛振华与冯巩', '', pairNF + rest)}
${block('王志文的台词', '两位主持人的分歧', pair(wz[0].text, wz[1].text))}
${block('一张脸演三个人', '牛振华', faceN)}
</section>`;
}

// ===== O absurd
function sectionO() {
  const D16 = D[16][0];
  const two = `<div style="margin-top: 26px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr)); gap: 12px;">${D16.two_absurds.map((a, i) => `<div style="${S.card} padding: 16px 18px; ${i ? 'border-width: 2px;' : ''}"><div style="font-family: ${F.serif}; font-size: 20px; font-weight: 700;">${esc(a.where)}</div><div style="margin-top: 8px; ${S.body}">${esc(a.source)}</div><div style="margin-top: 8px; ${S.sm} color: ${C.cap};">${esc(a.example)}</div></div>`).join('')}</div><p style="margin: 12px 0 0; ${S.sm}">${esc(D16.common)}。</p>`;
  const fn = `<div style="margin-top: 18px; max-width: 1000px;"><div style="${S.card} border-width: 2px; padding: 12px 16px; text-align: center; font-family: ${F.serif}; font-size: 17px; font-weight: 700;">敏感的批评被荒诞化包装</div><div style="display: grid; grid-template-columns: repeat(3, 1fr); height: 22px;"><span style="border-right: 1px solid ${C.ink}; border-top: 1px solid ${C.ink}; margin-left: 50%;"></span><span style="border-top: 1px solid ${C.ink}; position: relative;"><span style="position: absolute; left: 50%; top: -22px; width: 1px; height: 44px; background: ${C.ink};"></span></span><span style="border-left: 1px solid ${C.ink}; border-top: 1px solid ${C.ink}; margin-right: 50%;"></span></div><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); gap: 10px;">${D16.functions.map(f => tc(esc(f.for), esc(f.text))).join('')}</div></div>${cap(esc(D16.functions_note) + '。')}`;
  return `${secOpen('absurd', 'O', '中国的荒诞')}${head('O', '中国的荒诞', '荒诞在他那里是什么', vPosters([['f-w01', '黑炮事件'], ['f-w06', '背靠背，脸对脸']], 80))}
${two}
${block('荒诞的作用', '', fn)}
${block('第五代的反对姿态', '', chain(D16.fifth_gen.map((t, i) => i === D16.fifth_gen.length - 1 ? `<b style="font-family: ${F.serif}; font-size: 15px;">${esc(t)}</b>` : esc(t)), false) + cap(esc(D16.dark_humor) + '。'))}
</section>`;
}

// ===== P eras
function sectionP() {
  const L = D[17][0];
  const yr = s => { const m = s.match(/(\d{4})(s)?(?:–(\d{4})(s)?)?/); const a = +m[1]; let b = m[3] ? +m[3] : a; if (m[4] || (!m[3] && m[2])) b += 9; return [a, b + 1]; };
  const Y0 = 1949, Y1 = 2022, P_ = y => f1((y - Y0) / (Y1 - Y0) * 100);
  const rows = L.map(l => ({ ...l, r: yr(l.year), sec: SEC[l.section] })).sort((a, b) => a.r[0] - b.r[0] || a.r[1] - b.r[1]);
  const decades = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];
  const track = r => `<div style="position: relative; height: 34px; align-self: center; background: ${decades.map(d => `linear-gradient(${C.rule}, ${C.rule}) ${P_(d)}% 0 / 1px 100% no-repeat`).join(', ')};"><span title="${esc(r.year)}" style="position: absolute; left: ${P_(r.r[0])}%; width: max(6px, ${f1((r.r[1] - r.r[0]) / (Y1 - Y0) * 100)}%); top: 9px; height: 16px; ${phBg(r.sec.ph, true)} ${phEdge(r.sec.ph)}"></span><span style="position: absolute; left: calc(${P_(r.r[1])}% + 8px); top: 8px; font-family: ${F.mono}; font-size: 11px; color: ${C.cap}; white-space: nowrap;">${esc(r.year)}</span></div>`;
  const body = rows.map(r => `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr)); gap: 4px 24px; padding: 10px 0; border-bottom: 1px solid ${C.rule};"><div><div style="display: flex; flex-wrap: wrap; gap: 6px 10px; align-items: baseline;"><span style="${S.ttl} font-size: 15.5px;">${esc(r.title)}</span>${chip('节目第 ' + (Math.floor(r.sec.s / 3600) + 1) + ' 小时讲的')}</div><div style="margin-top: 4px; font-size: 12.5px; line-height: 1.65; color: ${C.ink2};">${esc(r.text)}</div></div>${track(r)}</div>`).join('');
  const axis = `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr)); gap: 4px 24px;"><div></div><div style="position: relative; height: 20px;">${decades.map(d => `<span style="position: absolute; left: ${P_(d)}%; transform: translateX(-50%); font-family: ${F.mono}; font-size: 11px; color: ${C.cap};">${d}</span>`).join('')}</div></div>`;
  return `${secOpen('eras', 'P', '时代小课')}${head('P', '时代小课', '年轻听众需要补哪些背景')}
<div style="${S.lead}">“年轻的听众可能不知道，我们稍微展开一下。”<span style="font-family: ${F.sans}; font-size: 13px; font-weight: 400; color: ${C.cap};">　—— 节目常说的话</span></div>
<p style="${S.intro}">节目地图里加细斜线的 19 个板块，就是这 19 堂课。下面按所讲的年代排，色条的颜色是这堂课所在的阶段。</p>
<div style="margin-top: 24px; border-top: 1px solid ${C.ink};">${axis}${body}${axis}</div>
${cap('每堂课所讲的年代、在轴上的位置为整理者所加，依据节目内容。')}
</section>`;
}

// ===== Q debate
function sectionQ() {
  const R = D[18][0];
  const line = c => /^是|^互补/.test(c) ? `background: linear-gradient(${C.ink}, ${C.ink}) 0 50% / 100% 1.5px no-repeat, #fff;` : /^部分/.test(c) ? `background: repeating-linear-gradient(90deg, ${C.ink} 0 5px, transparent 5px 10px) 0 50% / 100% 1.5px no-repeat, #fff;` : 'background: #fff;';
  const seat = side => `<span style="position: absolute; ${side}: -7px; top: 50%; margin-top: -6px; width: 12px; height: 12px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid ${C.ink}; background: ${C.paper};"></span>`;
  const rowW = r => `<div style="display: grid; grid-template-columns: minmax(0, 1fr) 210px minmax(0, 1fr); align-items: stretch;"><div style="padding: 8px 18px 8px 0;"><div style="${S.card} padding: 10px 12px; height: 100%; box-sizing: border-box; ${S.sm}">${esc(r.one_host)}</div></div><div style="position: relative; border-left: 1.5px solid ${C.ink}; border-right: 1.5px solid ${C.ink}; ${line(r.converged)} display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px 12px; text-align: center;">${seat('left')}${seat('right')}<span style="background: #fff; padding: 2px 6px;"><span style="display: block; font-family: ${F.mono}; font-size: 10.5px; color: ${C.cap};">${r.time}</span><span style="display: block; font-family: ${F.serif}; font-size: 13.5px; font-weight: 700; line-height: 1.45;">${esc(r.topic)}</span><span style="display: block; margin-top: 3px; font-size: 11px; color: ${C.cap};">${/^否/.test(r.converged) ? '没有收拢' : '收拢：' + esc(r.converged)}</span></span></div><div style="padding: 8px 0 8px 18px;"><div style="${S.card} padding: 10px 12px; height: 100%; box-sizing: border-box; ${S.sm}">${esc(r.other_host)}</div></div></div>`;
  const rowN = r => `<div style="padding: 12px 0; border-bottom: 1px solid ${C.rule};"><div style="display: flex; gap: 8px; align-items: baseline; flex-wrap: wrap;"><span style="font-family: ${F.mono}; font-size: 11px; color: ${C.cap};">${r.time}</span><b style="font-family: ${F.serif}; font-size: 15px;">${esc(r.topic)}</b><span style="font-size: 11.5px; color: ${C.cap};">${/^否/.test(r.converged) ? '没有收拢' : '收拢：' + esc(r.converged)}</span></div><div style="margin-top: 8px; display: grid; gap: 6px;"><div style="${S.card} padding: 8px 10px; ${S.sm}"><span style="color: ${C.cap};">一种看法　</span>${esc(r.one_host)}</div><div style="${S.card} padding: 8px 10px; ${S.sm}"><span style="color: ${C.cap};">另一种看法　</span>${esc(r.other_host)}</div></div></div>`;
  return `${secOpen('debate', 'Q', '两位主持人的分歧')}${head('Q', '他们在哪里看法不同', '一张长条会议桌，两边各坐一种看法')}
<p style="${S.intro}">这一期两人的大判断基本一致：黄建新是最重要的第五代，《背靠背》是巅峰，后期力道不足，转向主旋律是自我说服。分歧多在具体情节的读法上。</p>
${WIDE(`<div style="margin-top: 26px;"><div style="display: grid; grid-template-columns: minmax(0, 1fr) 210px minmax(0, 1fr); font-size: 12.5px; color: ${C.cap};"><span style="padding: 0 18px 8px 0;">一种看法</span><span style="text-align: center; padding-bottom: 8px;">话题 · 全片时间</span><span style="padding: 0 0 8px 18px;">另一种看法</span></div><div style="border-top: 1.5px solid ${C.ink}; border-bottom: 1.5px solid ${C.ink}; background: linear-gradient(90deg, transparent calc(50% - 105px), ${C.ink} calc(50% - 105px) calc(50% - 103.5px), transparent calc(50% - 103.5px) calc(50% + 103.5px), ${C.ink} calc(50% + 103.5px) calc(50% + 105px), transparent calc(50% + 105px));">${R.map(rowW).join('')}</div></div>`)}
${NARROW(`<div style="margin-top: 16px;">${R.map(rowN).join('')}</div>`)}
${cap('转写没有说话人标注，左右两边不对应固定的主持人。桌面上的实线表示对话里收拢了，虚线表示部分收拢，没有线表示没有收拢。两边画得一样重，不判输赢。')}
</section>`;
}

// ===== R mentions
function sectionR() {
  const [men, yrs] = D[19];
  const HL = { '王朔': '55 次，仅次于黄建新本人，比任何一位演员都多', '冯巩': '冯巩 45、牛振华 34，比张艺谋 30、陈凯歌 16 都多', '牛振华': '', '吴天明': '33 次，30 次都在第 1 段', '知识分子': '90 次，全集最高频的概念词，比“第五代”72、“主旋律”70 都多' };
  const bars = (g, title, n) => { const rows = men.filter(r => r.group === g).slice(0, n); const mx = Math.max(...rows.map(r => +r.mentions)); return `<div style="flex: 1 1 300px; min-width: 0;">${sub(title, rows.length + ' 项')}<div style="margin-top: 8px;">${rows.map(r => { const hl = HL[r.name]; return `<div style="display: grid; grid-template-columns: 112px minmax(0, 1fr) 30px; gap: 2px 8px; align-items: center; padding: 1.5px 0; font-size: 12.5px;"><span style="${hl !== undefined ? 'font-weight: 700;' : `color: ${C.ink2};`} white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${esc(r.name)}</span><div style="height: 12px; background: linear-gradient(90deg, ${hl !== undefined ? C.ink : '#C9C3B5'} 0 ${f1(+r.mentions / mx * 100)}%, transparent ${f1(+r.mentions / mx * 100)}%);"></div><span style="font-family: ${F.mono}; font-size: 11.5px; text-align: right;">${r.mentions}</span>${hl ? `<span></span><span style="grid-column: 2 / 4; padding-bottom: 4px; font-size: 12px; line-height: 1.5;">↑ ${esc(hl)}</span>` : ''}</div>`; }).join('')}</div></div>`; };
  const ys = yrs.slice().sort((a, b) => a.year - b.year), ymx = Math.max(...ys.map(r => +r.mentions));
  const ycol = `<div style="margin-top: 16px; display: flex; gap: 6px; align-items: flex-end; height: 150px; border-bottom: 1px solid ${C.ink};">${ys.map(r => `<div title="${esc(r.year + ' · ' + r.mentions + ' 次 · ' + r.meaning)}" style="flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%;"><span style="font-family: ${F.mono}; font-size: 11.5px;">${r.mentions}</span><div style="width: 100%; max-width: 40px; height: ${f1(+r.mentions / ymx * 112)}px; ${phBg(+r.year <= 1984 ? 'life' : +r.year <= 1989 ? 'pioneer' : +r.year <= 1992 ? 'city' : +r.year <= 2009 ? 'main' : 'close')}"></div></div>`).join('')}</div><div style="display: flex; gap: 6px;">${ys.map(r => `<span style="flex: 1 1 0; min-width: 0; text-align: center; font-family: ${F.mono}; font-size: 11px; padding-top: 4px; overflow: hidden;">${r.year}</span>`).join('')}</div><div style="margin-top: 14px; columns: 300px; column-gap: 28px;">${ys.map(r => `<div style="break-inside: avoid; display: grid; grid-template-columns: 44px minmax(0, 1fr); gap: 8px; padding: 5px 0; border-bottom: 1px solid ${C.rule}; font-size: 12.5px; line-height: 1.6;"><span style="font-family: ${F.mono};">${r.year}</span><span style="color: ${C.ink2};">${esc(r.meaning)}</span></div>`).join('')}</div>`;
  const pick = ['5 小时 53 分', '1 次', '8000 字', '倒数第一', '100 多个', '30 多种', '50 米、8 道门', '18 条', '5000 多家', '37.5 分钟'];
  const nums = pick.map(p => D20.find(r => r[0] === p)).filter(Boolean);
  return `${secOpen('mentions', 'R', '提及榜、年份与数字')}${head('R', '谁被提得最多', '节目最在意谁、哪部片、哪一年')}
<p style="${S.intro}">黄建新本人出现约 416 次，不列入排名。次数按转写统计，已合并 ASR 的各种错写，是约数。</p>
<div style="margin-top: 26px; display: flex; flex-wrap: wrap; gap: 36px 40px; align-items: flex-start;">${bars('人物', '人物', 38)}${bars('影片', '影片', 32)}<div style="flex: 1 1 300px; min-width: 0; display: grid; gap: 36px;">${bars('角色', '角色', 12)}${bars('概念', '概念', 26)}</div></div>
${block('年份', '节目里说到的具体年份', ycol + cap('年份合并了“1988 年”“88 年”“八八年”三种写法。年代词：80 年代 78 次，90 年代 65 次，新世纪 6 次，70 年代 4 次。色条颜色按那一年落在黄建新的哪个阶段，2025 年用墨黑。'))}
${block('数字', '', `<div style="margin-top: 18px; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr)); gap: 12px;">${nums.map(([n, d, s]) => `<div style="display: flex; flex-direction: column; ${S.card}"><div style="display: flex; gap: 6px; padding: 8px 12px 0;">${domRow(4, C.card, '6px', '14px', 4)}</div><div style="padding: 10px 16px 16px; display: flex; flex-direction: column; flex: 1;"><div style="font-family: ${F.serif}; font-size: 30px; font-weight: 900; line-height: 1.2;">${esc(n)}</div><div style="margin-top: 8px; font-size: 14px; line-height: 1.7; flex: 1;">${esc(d)}</div><div style="margin-top: 8px; font-size: 11.5px; color: ${C.cap};">来源：${esc(s)}</div></div></div>`).join('')}</div>`)}
</section>`;
}

function footer() {
  return `<footer style="margin-top: clamp(72px, 9vw, 120px); padding: 36px ${PAD} 44px; border-top: 2px solid ${C.ink}; background: ${C.wall};">
<div style="display: flex; align-items: flex-end; gap: 18px;">${domRow(9)}</div>
<div style="margin-top: 22px; font-family: ${F.serif}; font-size: 18px; font-weight: 700;">年份与数字均据节目口述整理，作品年份据维基百科。</div>
<div style="margin-top: 12px; max-width: 1000px; display: grid; gap: 6px; font-size: 13px; line-height: 1.8; color: ${C.cap};"><div>节目：《电影巨辩》付费专辑《为了华语电影》第 8 集，主持老马（magasa）、阿吴（LOOK），录制于 2025 年，全长 5:53:10，平台上切成 10 段（序号 81–90）。</div><div>转写没有说话人标注，观点统一写作“节目”或“一位主持人”“另一位主持人”；唯一署名“阿吴”的一句，转写里他说了“我和老马都认为”。</div><div>阶段、类型、板块名、作品的五档评价、时代小课在轴上的位置为整理者所加。板块按节目里的过渡句切分，误差约一分钟；提及次数含转写变体，是约数。</div><div>《睡不着》和《说出你的秘密》的先后：维基百科《说出你的秘密》1999、《睡不着》2000；节目先讲《睡不着》。</div><div>海报和人物照片来自维基百科与维基共享资源；没有找到的留了空图框，可以把自己的图片拖进去，页面上的图片也都可以替换。</div></div>
${seriesNav({ color: C.cap, footer: true })}
</footer>`;
}

// ===== assemble
const helmet = `<helmet>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<script src="./image-slot.js"></script>
<style>
  body { margin: 0; background: #DEDAD0; }
  a { color: ${C.ink}; text-decoration: underline; text-decoration-color: rgba(27,27,27,0.35); text-underline-offset: 3px; }
  a:hover { color: ${PH.pioneer}; text-decoration-color: ${PH.pioneer}; }
  html { scroll-behavior: smooth; }
  summary::marker { color: ${C.faint}; }
</style>
</helmet>`;
const compact = s => s.replace(/(style(?:-hover)?)="([^"]*)"/g, (m, k, v) => k + '="' + v.replace(/\s*([:;,])\s*/g, '$1').replace(/;$/, '').trim() + '"').replace(/rgba\(27,27,27,(0?\.\d+)\)/g, (m, a) => '#1b1b1b' + Math.round(+a * 255).toString(16).padStart(2, '0'));
const KIDS = [
  ['hjx08-p1', [sectionB()], '100%,5200px', 'showAllStations'],
  ['hjx08-p2', [seam(), sectionD(), seam(), sectionE()], '100%,6400px', ''],
  ['hjx08-p3', [divider('生平与先锋三部曲', '西影、《黑炮事件》《错位》《轮回》 · 约 113 分钟'), sectionG(), seam(), sectionH(), seam(), sectionI()], '100%,12000px', ''],
  ['hjx08-p4', [divider('城市、转向与迷茫', '城市三部曲与《五魁》、《埋伏》《睡不着》、心理三部曲 · 约 159 分钟'), sectionJ(), seam(), sectionK(), seam(), sectionL()], '100%,14000px', ''],
  ['hjx08-p5', [divider('监制、演员与荒诞', '主旋律、演员与总评 · 约 58 分钟'), sectionM(), seam(), sectionN(), seam(), sectionO()], '100%,7000px', ''],
  ['hjx08-p6', [divider('补课与收尾', '时代小课、分歧，以及知识分子与权力'), sectionP(), seam(), sectionQ()], '100%,6000px', ''],
  ['hjx08-p7', [seam(), sectionF(), seam(), sectionR(), footer()], '100%,7000px', '']
];
const sections = KIDS.map(([name, parts]) => `<div id="${name}" data-episode-part="${name}" style="background: ${C.paper}; color: ${C.ink}; font-family: ${F.sans}; font-variant-numeric: tabular-nums;">${parts.join('\n')}</div>`).join('\n');
const template = compact(`${helmet}
<div style="width: 100%; max-width: {{ frameW }}; margin: 0 auto; background: ${C.paper}; color: ${C.ink}; font-family: ${F.sans}; font-variant-numeric: tabular-nums; overflow: hidden; box-shadow: 0 0 0 1px rgba(27,27,27,0.1);">
${cover()}
${sections}
</div>`);
const JS1 = `
const ST_RAW = ${JSON.stringify(ST_DATA)};
const ST_CP = { film: 'none', era: 'polygon(50% 0, 100% 100%, 0 100%)', life: 'none', idea: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)' };
const stRow = r => { const one = r[3] === 1; return { time: r[0], ct: r[1], label: r[2], col: r[4], mw: one ? '8px' : '1.5px', mh: one ? '8px' : '10px', cp: one ? ST_CP[r[5]] : 'none', br: one && r[5] === 'life' ? '50%' : '0', ff: one ? "${F.serif}" : "${F.sans}", fs: one ? '14.5px' : '13.5px', fw: one ? '600' : '400', fc: one ? '${C.ink}' : '${C.muted}' }; };
const ST_ALL = ST_RAW.map(c => ({ ...c, rows: c.rows.map(stRow) }));
const ST_L1 = ST_RAW.map(c => ({ ...c, rows: c.rows.filter(r => r[3] === 1).map(stRow) }));
const PHV = ${JSON.stringify(Object.fromEntries(PHK.map(p => [p, [phBgV(p, false), phBgV(p, true)]])))};
const INK = '${C.ink}';
const B_TAGS = ${JSON.stringify(BTAGS)}.map(r => ({ title: r[1] + ' · 第 ' + r[2] + ' 段 ' + r[3] + ' · ' + r[0], label: r[0], left: r[5] ? r[4] + 'px' : 'auto', right: r[5] ? 'auto' : r[4] + 'px', bottom: r[6] + 'px', bl: r[5] ? '5px solid ' + r[7] : '1px solid ' + INK, br: r[5] ? '1px solid ' + INK : '5px solid ' + r[7] }));
const B_BLK = ${JSON.stringify(BBLK)}.map(r => ({ title: r[0], left: r[1] + 'px', width: r[2] + 'px', bg: PHV[r[3]][r[4]], sh: r[3] === 'overview' ? 'inset 0 0 0 1px ' + INK : 'none' }));
const M_BLK = ${JSON.stringify(MBLK)}.map(r => ({ top: r[0] + 'px', height: r[1] + 'px', bg: PHV[r[2]][r[3]], sh: r[2] === 'overview' ? 'inset 0 0 0 1px ' + INK : 'none' }));
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
      if (document.getElementById('hjx08-fonts')) return;
      const l = document.createElement('link');
      l.id = 'hjx08-fonts'; l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@600;700;900&family=Noto+Sans+SC:wght@400;500;700&family=IBM+Plex+Mono:wght@400;600&family=Courier+Prime:wght@400;700&display=swap';
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
if (template.includes('undefined')) log('WARN undefined at', template.slice(template.indexOf('undefined') - 200, template.indexOf('undefined') + 40));
if (/NaN/.test(template)) log('WARN NaN at', template.slice(template.indexOf('NaN') - 200, template.indexOf('NaN') + 40));
const holes = [...new Set(template.match(/\{\{\s*[^}]+\}\}/g))];
log('holes', holes.join(' '));
await saveFile(OUT, html);
log('saved', OUT, html.length, 'chars; stations', NST, 'L1', N1, 'secs', SECS.length, 'bins', BINS.length, 'terms', TERMS.length, 'works', W5.length);

// ===== J
const THEMES = ['当下的人与城市', '类型传统', '精神与身心', '罪案与法庭', '女性', '情绪电影', '无家者', '族裔与移民', '家庭与院舍', '性少数'];
const NJ = THEMES.length;
function sectionJ() {
  const d14 = D[14][0], emo = D[14][1], d15 = D[15][0];
  const DIS = { '《金都》': '单程证的情节，两位主持人看法不同' };
  const badge = f => f === 'F' ? `<span title="首部剧情电影计划" style="position: absolute; top: 12px; right: 12px; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; background: ${C.ink}; color: ${C.paper}; font-family: ${F.mono}; font-size: 12px; font-weight: 600;">F</span>` : f === 'D' ? `<span title="电影发展基金" style="position: absolute; top: 12px; right: 12px; width: 22px; height: 22px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 1.5px solid ${C.ink}; font-family: ${F.mono}; font-size: 12px; font-weight: 600;">D</span>` : '';
  const card = r => `<div style="position: relative; min-width: 0; padding: 14px 16px 16px; background: ${C.card}; border: 1px solid ${C.ink}; border-top: 5px solid ${C.l2};">${badge(r.fund)}<div style="display: flex; gap: 12px; align-items: flex-start;">${poster(r.title, '62px')}<div style="min-width: 0; padding-right: 26px;"><div style="font-family: ${F.serif}; font-size: 19px; font-weight: 700; line-height: 1.4;">${esc(r.title)}</div>${r.director ? `<div style="margin-top: 2px; font-size: 12.5px; color: ${C.cap};">导演　${esc(r.director)}</div>` : ''}</div></div><div style="margin: 10px 0 8px; border-top: 1px dashed ${C.rule2};"></div>${who(r.verdict_by === '节目' ? '节目认为' : '一位主持人认为')}<div style="margin-top: 6px; font-size: 14px; line-height: 1.7; color: ${C.ink}; text-wrap: pretty;">${esc(r.verdict)}</div>${r.problem ? `<div style="margin-top: 8px; display: grid; grid-template-columns: 36px minmax(0, 1fr); gap: 8px; align-items: start;"><span style="margin-top: 2px; padding: 0 4px; border: 1px solid ${C.ink2}; font-size: 11.5px; line-height: 1.6; text-align: center;">问题</span><span style="font-size: 13.5px; line-height: 1.7; color: ${C.muted}; text-wrap: pretty;">${esc(r.problem)}</span></div>` : ''}${DIS[r.title] ? `<div style="margin-top: 8px; display: inline-flex; padding: 1px 7px; background: ${C.deep}; font-size: 12px; line-height: 1.6; color: ${C.ink2};">${DIS[r.title]}</div>` : ''}</div>`;
  const groups = THEMES.map((t, i) => { const fs = d14.filter(r => r.theme === t), n = fs.length;
    return `<div style="flex: ${n} 1 ${Math.min(n, 3) * 250}px; min-width: 0;"><div role="button" onClick="{{ jt${i} }}" style="display: flex; align-items: baseline; gap: 10px; padding: 6px 0 8px; border-bottom: 2px solid ${C.ink}; cursor: pointer; user-select: none;"><span style="font-family: ${F.serif}; font-size: 17px; font-weight: 700;">${t}</span><span style="font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${n} 部</span><span style="margin-left: auto; font-size: 12px; color: ${C.cap};">{{ ja${i} }}</span></div><div style="display: {{ jg${i} }}; margin-top: 12px; grid-template-columns: repeat(auto-fill, minmax(min(100%, 230px), 1fr)); gap: 12px;">${fs.map(card).join('')}</div></div>`; }).join('');
  const pts = (arr, c) => `<ul style="margin: 14px 0 0; padding: 0; list-style: none;">${arr.map(t => `<li style="display: grid; grid-template-columns: 14px minmax(0, 1fr); gap: 8px; padding: 7px 0; border-top: 1px solid ${C.rule}; font-size: 15px; line-height: 1.7; color: ${C.ink2};"><span style="color: ${c};">—</span><span>${esc(t)}</span></li>`).join('')}</ul>`;
  const dreams = `<div style="margin-top: 32px; display: flex; flex-wrap: wrap; align-items: stretch; gap: 20px 24px;">
<div style="flex: 1 1 320px; min-width: 0; padding: 18px 20px; border: 1px solid ${C.rule2};"><div style="font-size: 12px; letter-spacing: 0.16em; color: ${C.cap};">过去的梦</div><div style="margin-top: 6px; font-family: ${F.serif}; font-size: 32px; font-weight: 700; color: ${C.muted};">${d15.before.name}</div>${pts(d15.before.points, C.faint)}</div>
<div style="flex: 0 1 150px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; text-align: center;"><span style="font-family: ${F.serif}; font-size: 19px; font-weight: 700; line-height: 1.5;">《狂舞派》之后。</span><span style="font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">2013</span><span style="font-size: 22px; color: ${C.l2};">→</span></div>
<div style="flex: 1 1 320px; min-width: 0; padding: 18px 20px; border: 2px solid ${C.l2}; background: ${C.card};"><div style="font-size: 12px; letter-spacing: 0.16em; color: ${C.l2};">现在的梦</div><div style="margin-top: 6px;"><span style="display: inline-block; padding: 2px 12px 4px; background: ${C.yel}; border-radius: 6px; box-shadow: inset 0 0 0 2px ${C.ink}; font-family: ${F.serif}; font-size: 32px; font-weight: 900; color: ${C.ink};">${d15.after.name}</span></div>${gloss('去到几尽', '粤语，意思是“可以做到多彻底、付出多少”。')}${pts(d15.after.points, C.l2)}</div>
</div>
<div style="margin-top: 28px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr)); gap: 24px 40px; align-items: start;"><div>${quote('为了跳舞，你可以去到几尽。', '《狂舞派》字幕，节目转述')}</div><div>${quote('我命由我不由天。', '一位主持人借《哪吒之魔童降世》的台词作类比', 19)}</div><div style="padding-top: 18px; border-top: 1px solid ${C.ink}; font-size: 14px; line-height: 1.8; color: ${C.ink2};"><div style="font-size: 12px; letter-spacing: 0.12em; color: ${C.cap};">节目在这些片里也看到这种态度</div>${d15.also.map(t => `<div style="margin-top: 6px; font-family: ${F.serif}; font-weight: 600;">${esc(t)}</div>`).join('')}</div></div>`;
  const leg = `<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px 20px; font-size: 12.5px; color: ${C.cap};"><span style="display: inline-flex; align-items: center; gap: 7px;"><span style="width: 18px; height: 18px; display: inline-flex; align-items: center; justify-content: center; background: ${C.ink}; color: ${C.paper}; font-family: ${F.mono}; font-size: 11px;">F</span>首部剧情电影计划</span><span style="display: inline-flex; align-items: center; gap: 7px;"><span style="width: 18px; height: 18px; box-sizing: border-box; display: inline-flex; align-items: center; justify-content: center; border: 1.5px solid ${C.ink}; font-family: ${F.mono}; font-size: 11px;">D</span>电影发展基金</span><span>没有标记的，节目没有提资助来源</span><span>主题分组为整理者所加；点主题名可以折叠；底是港铁站的马赛克墙</span></div>`;
  const wall = `<div style="margin-top: 18px; padding: clamp(14px, 2vw, 26px); background: linear-gradient(90deg, rgba(251,249,243,0.7) 1.5px, transparent 1.5px) 0 0 / 16px 16px, linear-gradient(180deg, rgba(251,249,243,0.7) 1.5px, transparent 1.5px) 0 0 / 16px 16px, ${rgba(C.l2, 0.2)}; box-shadow: inset 0 0 0 1px ${rgba(C.l2, 0.5)}; display: flex; flex-wrap: wrap; gap: 28px 24px;">${groups}</div>`;
  const emos = `<div style="margin-top: 44px;">${sub('三种情绪', '一位主持人对这批新本土电影的总印象')}<div style="margin-top: 16px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); gap: 20px 32px;">${emo.map(e => `<div style="display: flex; gap: 16px; align-items: baseline;"><span style="font-family: ${F.serif}; font-size: 40px; font-weight: 900; line-height: 1; color: ${C.l2};">${esc(e.emotion)}</span><span style="font-size: 14.5px; line-height: 1.7; color: ${C.ink2};">${esc(e.why)}</span></div>`).join('')}</div><p style="${S.body} margin: 24px 0 0; max-width: 860px;">节目的另一个判断：港片从纯娱乐转向社会属性，不仅因为城市的氛围变了，也说明电影的产业属性降低了。</p></div>`;
  return `${secOpen('dream', 'J', '去到几尽')}${head('J', '去到几尽', '2013 年以后拍了什么，节目怎么评')}
<p style="${S.intro}">节目认为 2013 年以后港片换掉了内核：从“狮子山下精神”换成了“去到几尽”。下面是节目谈到的新本土电影，每张卡写节目的一句话和它指出的问题，都是主持人的个人看法。</p>
${dreams}
<div style="margin-top: 52px;">${sub('片单', d14.length + ' 部，按主题分组')}</div>
<div style="margin-top: 14px;">${leg}</div>
${wall}
${emos}
</section>`;
}

// ===== K
function sectionK() {
  const d16 = D[16][0], [g1, g2, g3] = d16.groups;
  const W = 620, H = 600, cx = W / 2, cy = H / 2;
  let ring = '', spokes = '';
  g1.films.forEach((f, i) => { const a = (-90 + i * 30) * Math.PI / 180, x = cx + 238 * Math.cos(a), y = cy + 226 * Math.sin(a);
    ring += `<div style="position: absolute; left: ${f1(x)}px; top: ${f1(y)}px; transform: translate(-50%, -50%); width: 150px; text-align: center;"><div style="font-family: ${F.serif}; font-size: 15.5px; font-weight: 700; line-height: 1.35;">${esc(f.title)}</div><div style="margin-top: 2px; font-size: 12px; line-height: 1.45; color: ${C.cap};">${esc(f.bond)}</div></div>`;
    spokes += `<line x1="${f1(cx + 112 * Math.cos(a))}" y1="${f1(cy + 112 * Math.sin(a))}" x2="${f1(cx + 168 * Math.cos(a))}" y2="${f1(cy + 160 * Math.sin(a))}" stroke="${C.l2}" strokeWidth="1.5"></line><circle cx="${f1(cx + 112 * Math.cos(a))}" cy="${f1(cy + 112 * Math.sin(a))}" r="4" fill="${C.l2}"></circle>`; });
  const circle = `<div style="display: {{ wideDisp }}; flex: 0 0 ${W}px; position: relative; width: ${W}px; height: ${H}px;"><svg width="${W}" height="${H}" style="position: absolute; inset: 0;">${spokes}</svg><div style="position: absolute; left: ${cx - 104}px; top: ${cy - 104}px; width: 208px; height: 208px; box-sizing: border-box; border-radius: 50%; border: 2px solid ${C.l2}; background: ${rgba(C.l2, 0.08)}; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 24px;"><div style="font-family: ${F.serif}; font-size: 19px; font-weight: 700; line-height: 1.45;">${esc(g1.name)}</div><div style="margin-top: 6px; font-family: ${F.mono}; font-size: 13px; color: ${C.l2};">${g1.films.length} 部</div></div>${ring}</div>`;
  const list = `<div style="display: {{ narrowDisp }}; flex: 1 1 100%;"><div style="font-family: ${F.serif}; font-size: 19px; font-weight: 700;">${esc(g1.name)} <span style="font-family: ${F.mono}; font-size: 13px; color: ${C.l2};">${g1.films.length} 部</span></div><div style="margin-top: 10px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px 16px;">${g1.films.map(f => `<div style="padding-top: 6px; border-top: 2px solid ${C.l2};"><div style="font-family: ${F.serif}; font-size: 15px; font-weight: 700;">${esc(f.title)}</div><div style="font-size: 12px; color: ${C.cap};">${esc(f.bond)}</div></div>`).join('')}</div></div>`;
  const grp = g => `<div style="margin-bottom: 26px;"><div style="display: flex; align-items: baseline; gap: 10px; padding-bottom: 8px; border-bottom: 2px solid ${C.l2};"><span style="font-family: ${F.serif}; font-size: 18px; font-weight: 700;">${esc(g.name)}</span><span style="font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${g.films.length} 部</span></div><div style="margin-top: 10px; display: flex; flex-wrap: wrap; gap: 8px;">${g.films.map(f => `<span style="padding: 6px 10px; border: 1px solid ${C.ink}; background: ${C.card};"><span style="font-family: ${F.serif}; font-size: 15px; font-weight: 700;">${esc(f.title)}</span>${f.bond ? `<span style="margin-left: 8px; font-size: 12.5px; color: ${C.cap};">${esc(f.bond)}</span>` : ''}</span>`).join('')}</div></div>`;
  const side = `<div style="flex: 1 1 360px; min-width: 0;">${grp(g2)}${grp(g3)}<div style="display: grid; gap: 20px;">${quote('建立在血缘之上的人际关系，是最保守、最功利的。', '一位主持人认为', 19)}${quote('东亚的血缘共同体就只是祖先崇拜。', '一位主持人认为', 19)}</div><div style="margin-top: 22px; font-size: 13px; line-height: 1.8; color: ${C.cap};"><div>传统：${d16.tradition.map(esc).join('；')}。</div><div>参照：${esc(d16.reference)}。</div></div></div>`;
  return `${secOpen('blood', 'K', '血缘之外')}${head('K', '血缘之外', '新电影在写什么样的人际关系')}
<p style="${S.intro}">节目注意到，近年的本土片反复写没有血缘的人怎样凑成一家。它和 50 年代粤语片“人人为我，我为人人”的传统接得上，楚原的《七十二家房客》也把邻居当作共同体。</p>
<div style="margin-top: 30px; display: flex; flex-wrap: wrap; gap: 36px 48px; align-items: flex-start;">${circle}${list}${side}</div>
</section>`;
}

// ===== O
function sectionO() {
  const d17 = D[17][0], GR = [['消失的', '合拍片时代之后淡出'], ['留下的', '还在，但位置变了'], ['新来的', '靠本土片出来，或者重新被看见']];
  const DIS = { '郑伊健': '他为什么消失，两位主持人看法不同' };
  const tag = (r, g) => `<div style="display: grid; grid-template-columns: 74px minmax(0, 1fr); border: 1px ${g === '消失的' ? 'dashed' : 'solid'} ${g === '消失的' ? C.faint : C.ink}; background: ${g === '消失的' ? 'transparent' : C.card};"><div style="display: flex; align-items: flex-start; justify-content: center; padding: 10px 0; ${g === '消失的' ? `background: repeating-linear-gradient(135deg, ${rgba(C.act, 0.25)} 0 3px, transparent 3px 7px);` : `background: ${C.act};`}">${photo(r.name, 56, 70, g === '消失的' ? 'filter: grayscale(1); opacity: 0.85;' : '')}</div><div style="padding: 10px 14px 12px;"><div style="font-family: ${F.serif}; font-size: 19px; font-weight: 700; color: ${g === '消失的' ? C.muted : C.ink};">${esc(r.name)}</div><div style="margin-top: 3px; font-size: 13.5px; line-height: 1.7; color: ${C.ink2}; text-wrap: pretty;">${esc(r.note)}</div>${DIS[r.name] ? `<div style="margin-top: 6px; display: inline-flex; padding: 1px 7px; background: ${C.deep}; font-size: 12px; color: ${C.ink2};">${DIS[r.name]}</div>` : ''}</div></div>`;
  const cols = GR.map(([g, s]) => `<div style="min-width: 0;"><div style="display: flex; align-items: baseline; gap: 10px; padding-bottom: 8px; border-bottom: 2px solid ${C.act};">${gl('pe', C.act, 12)}<span style="font-family: ${F.serif}; font-size: 20px; font-weight: 700;">${g}</span><span style="font-size: 12.5px; color: ${C.cap};">${s}</span></div><div style="margin-top: 12px; display: grid; gap: 10px;">${d17.filter(r => r.group === g).map(r => tag(r, g)).join('')}</div></div>`).join('');
  const bar = (lab, v, max, c, txt) => `<div style="display: grid; grid-template-columns: 44px minmax(0, 1fr) 96px; gap: 10px; align-items: center; padding: 4px 0;"><span style="font-size: 13px;">${lab}</span><span style="height: 14px; background: ${C.deep};"><span style="display: block; height: 100%; width: ${pct(v / max)}; background: ${c};"></span></span><span style="font-family: ${F.mono}; font-size: 12.5px;">${txt}</span></div>`;
  const opp = `<div style="padding: 16px 18px; border: 1px solid ${C.ink}; background: ${C.card};"><div style="font-family: ${F.serif}; font-size: 17px; font-weight: 700;">《奥本海默》：香港与台湾</div><div style="margin-top: 4px; font-size: 12.5px; color: ${C.cap};">一位主持人的比较，用来说明香港观众的观影热情</div><div style="margin-top: 12px; font-size: 12px; letter-spacing: 0.1em; color: ${C.cap};">票房（万港币）</div>${bar('香港', 7300, 7300, C.ink, '将近 7300')}${bar('台湾', 6000, 7300, C.neu, '6000 出头')}<div style="margin-top: 10px; font-size: 12px; letter-spacing: 0.1em; color: ${C.cap};">人口（万人）</div>${bar('香港', 750, 2300, C.ink, '750')}${bar('台湾', 2300, 2300, C.neu, '2300')}<div style="margin-top: 12px; padding-top: 10px; border-top: 1px dashed ${C.rule2}; font-size: 13.5px; line-height: 1.7;">折合人均：香港约 <b style="font-family: ${F.mono};">9.7</b> 港币，台湾约 <b style="font-family: ${F.mono};">2.6</b> 港币。</div><div style="font-size: 11.5px; color: ${C.cap};">整理者按节目给的数字计算，台湾票房按 6000 万计。</div></div>`;
  const two = `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr)); gap: 16px;"><div style="padding: 16px 18px; border: 1px solid ${C.ink};"><div style="font-size: 12px; color: ${C.cap};">一位主持人的解释</div><div style="margin-top: 6px; font-family: ${F.serif}; font-size: 26px; font-weight: 700;">“偶像包袱”</div></div><div style="padding: 16px 18px; border: 1px solid ${C.ink};"><div style="font-size: 12px; color: ${C.cap};">另一位主持人的解释</div><div style="margin-top: 6px; font-family: ${F.serif}; font-size: 26px; font-weight: 700;">“不是包袱，是能力”</div><div style="margin-top: 6px; font-size: 13.5px; line-height: 1.7; color: ${C.ink2};">“偶像包袱听起来是态度问题，但大多数时候是能力问题。”</div></div></div>`;
  return `${secOpen('actors', 'O', '消失的明星')}${head('O', '消失的明星', '谁消失了，谁出来了')}
<p style="${S.intro}">合拍片二十年里，一批明星淡出了；近几年的本土片又把另一批人推到台前。节目对“消失”给了两种解释。</p>
<div style="margin-top: 30px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 28px 28px; align-items: start;">${cols}</div>
<p style="${S.cap}">“消失的、留下的、新来的”分组为整理者所加。</p>
<div style="margin-top: 36px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr)); gap: 24px 40px; align-items: start;">${two}${opp}</div>
</section>`;
}

// ===== P
function sectionP() {
  const d18 = D[18][0];
  const node = (t, i) => { const co = i === 5; return `<div style="padding: 12px 16px; border: 1px solid ${C.ink}; ${co ? `border-top: 4px solid ${C.co};` : ''} background: ${C.card}; font-size: 15px; line-height: 1.7; text-wrap: pretty;">${co ? `<div style="margin-bottom: 6px;">${who('一位主持人的看法')}</div>` : ''}${esc(t)}</div>`; };
  const chain = d18.chain.map(node).join(`<div style="height: 22px; display: flex; justify-content: center;"><span style="width: 0; border-left: 1.5px solid ${C.ink};"></span></div>`);
  const fork = `<svg viewBox="0 0 100 50" preserveAspectRatio="none" style="display: block; width: 100%; height: 50px;"><line x1="50" y1="0" x2="25" y2="50" stroke="${C.ink}" strokeWidth="2" vectorEffect="non-scaling-stroke"></line><line x1="50" y1="0" x2="75" y2="50" stroke="${C.ink}" strokeWidth="2" vectorEffect="non-scaling-stroke"></line></svg>`;
  const ends = `<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px;">${d18.fork.map(f => `<div style="padding: 16px 16px 18px; border: 2px solid ${C.ink}; background: ${C.card};"><div style="font-family: ${F.serif}; font-size: clamp(20px, 2.2vw, 26px); font-weight: 700;">${f.name}</div><div style="margin-top: 6px; font-size: 14px; line-height: 1.7; color: ${C.ink2}; text-wrap: pretty;">${esc(f.desc)}</div></div>`).join('')}</div><p style="${S.cap}">两条岔路画得一样重：节目没有说哪一条更可能。</p>`;
  const lst = (title, arr) => `<div style="margin-bottom: 26px;">${sub(title, '')}<ul style="margin: 0; padding: 0; list-style: none;">${arr.map(t => `<li style="padding: 8px 0; border-bottom: 1px solid ${C.rule}; font-size: 14.5px; line-height: 1.7; color: ${C.ink2}; text-wrap: pretty;">${esc(t)}</li>`).join('')}</ul></div>`;
  const db = d18.debate;
  const debate = `<div style="border: 1px solid ${C.ink}; background: ${C.card};"><div style="padding: 10px 14px; border-bottom: 1px solid ${C.ink}; display: flex; align-items: baseline; gap: 10px;"><span style="font-family: ${F.serif}; font-size: 17px; font-weight: 700;">游学修与萧若元之争</span><span style="font-size: 12.5px; color: ${C.cap};">${esc(db.place)}</span></div><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));">${[db.a, db.b].map((p, i) => `<div style="padding: 12px 14px; ${i ? `border-left: 1px solid ${C.rule2};` : ''}"><div style="font-family: ${F.serif}; font-size: 18px; font-weight: 700;">${p.name}</div><div style="margin-top: 4px; font-size: 13.5px; line-height: 1.7; color: ${C.ink2}; text-wrap: pretty;">${esc(p.says)}</div></div>`).join('')}</div><div style="padding: 10px 14px 12px; border-top: 1px dashed ${C.rule2};">${who('节目认为')}<div style="margin-top: 6px; font-size: 13.5px; line-height: 1.7;">${esc(db.program_view)}</div>${gloss('煮饭仔', '粤语，小孩子过家家。')}</div></div>`;
  return `${secOpen('road', 'P', '越走越窄，还是越走越宽')}${head('P', '越走越窄，还是越走越宽', '节目的结论')}
<p style="${S.intro}">节目对香港电影乐观。它把今天的本土性放进战后东亚城市现代化的脉络里看，推到最后是一个分岔：本土性可能越走越窄，也可能越走越宽。</p>
<div style="margin-top: 32px; display: flex; flex-wrap: wrap; gap: 40px 48px; align-items: flex-start;">
<div style="flex: 1 1 560px; min-width: 0;">${chain}${fork}${ends}</div>
<div style="flex: 1 1 360px; min-width: 0;">${lst('为什么乐观', d18.why_optimistic)}${lst('也泼了冷水', d18.cold_water)}${debate}</div>
</div>
<div style="margin-top: 44px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr)); gap: 24px 40px;">${quote('只要是往前走的，总是有希望的。', '一位主持人', 24)}${quote('这是一个比投资、比市场更重要的问题。', '一位主持人，谈本土性会变得贫瘠还是包容', 24)}</div>
</section>`;
}

// ===== Q
function sectionQ() {
  const d19 = D[19][0], yrs = D[19][1];
  const hl = n => n === '邱礼涛' || n === '彭浩翔' ? C.yel : n === '《无间道》（含续集）' ? C.ink : n === '本土' ? C.l2 : n === '合拍片' ? C.co : C.neu;
  const panel = (g, title, note) => { const rs = d19.filter(r => r.group === g), mx = Math.max(...rs.map(r => +r.mentions));
    return `<div style="min-width: 0;">${sub(title, note)}<div style="margin-top: 8px;">${rs.map(r => `<div style="display: grid; grid-template-columns: 132px minmax(0, 1fr) 34px; gap: 10px; align-items: center; padding: 3px 0;"><span style="font-size: 13.5px; ${/《|两部曲/.test(r.name) ? `font-family: ${F.serif}; font-weight: 600;` : ''} white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${esc(r.name)}">${esc(r.name)}</span><span style="height: 12px;"><span style="display: block; height: 100%; width: ${pct(+r.mentions / mx)}; background: ${hl(r.name)}; ${hl(r.name) === C.yel ? `box-shadow: inset 0 0 0 1px ${C.ink};` : ''}"></span></span><span style="font-family: ${F.mono}; font-size: 12.5px; text-align: right;">${r.mentions}</span></div>`).join('')}</div></div>`; };
  const Y0 = 1997, NY = 28, mx = 27;
  const bars = yrs.map(r => { const y = +r.year, c = y <= 2003 ? C.tr : y <= 2012 ? C.l1 : C.l2; return `<div title="${esc(y + ' · ' + r.mentions + ' 次 · ' + r.meaning)}" style="position: absolute; left: ${pct((y - Y0) / NY)}; width: ${pct(1 / NY)}; bottom: 0; height: ${pct(+r.mentions / mx)}; padding: 0 2px; box-sizing: border-box; cursor: help;"><div style="height: 100%; background: ${c};"></div><div style="position: absolute; left: 0; right: 0; top: -18px; text-align: center; font-family: ${F.mono}; font-size: 11.5px;">${r.mentions}</div></div>`; }).join('');
  let yax = ''; for (let y = Y0; y <= 2024; y++) { if (y % 3 === 1 || y === 2024 || y === 2013) yax += `<div style="position: absolute; left: ${pct((y - Y0 + 0.5) / NY)}; transform: translateX(-50%); top: 6px; font-family: ${F.mono}; font-size: 11px; color: ${C.cap};">${y}</div>`; }
  const sums = [['1997–2003', '约 51 次', C.tr], ['2004–2012', '约 53 次', C.l1], ['2013–2024', '约 40 次', C.l2]].map(([a, b, c]) => `<div style="padding-top: 8px; border-top: 4px solid ${c};"><div style="font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${a}</div><div style="font-family: ${F.serif}; font-size: 20px; font-weight: 700;">${b}</div></div>`).join('');
  const years = `<div style="min-width: 0;">${sub('年份', '只画出节目提到 5 次以上的年份；悬停看原因')}<div style="margin-top: 30px; position: relative; height: 170px; border-bottom: 1px solid ${C.ink};">${bars}</div><div style="position: relative; height: 26px;">${yax}</div><div style="margin-top: 14px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px;">${sums}</div><p style="${S.cap}">下面三格是按节目的三段分期合计的年份提及次数。</p></div>`;
  return `${secOpen('mentions', 'Q', '谁被提得最多')}${head('Q', '谁被提得最多', '节目最在意谁、哪部片、哪一年')}
<div style="${S.lead}"><span style="background: ${C.yel}; padding: 0 4px;">邱礼涛和彭浩翔</span>并列第一，各 55 次；《无间道》28 次，是被提到最多的影片；<span style="color: ${C.l2};">“本土”182 次</span>，<span style="color: ${C.co};">“合拍片”200 次</span>，几乎相当。</div>
<div style="margin-top: 32px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr)); gap: 36px 48px; align-items: start;">${panel('人物', '人物', '')}<div style="display: grid; gap: 36px;">${panel('影片', '影片', '')}${panel('机构', '机构', '')}</div>${panel('概念', '概念', '')}${years}</div>
<p style="${S.cap}">次数按转写稿统计，含转写变体，是约数。地名另计：香港 1025 次，大陆 235 次，内地 92 次，台湾 76 次。</p>
</section>`;
}

// ===== R
function sectionR() {
  const pick = ['30 万港币', '130 万', '9 天', '18 天', '每两小时一个电话', '5000 港币', '4000 万', '1 个'];
  const rows = pick.map(p => D21.find(r => r[0] === p)).filter(Boolean);
  const cards = rows.map(([n, d, s]) => `<div style="min-width: 0; padding: 18px 18px 16px; background: ${C.card}; border: 1px solid ${C.ink}; display: flex; flex-direction: column;"><div style="font-family: ${F.serif}; font-size: ${n.length > 6 ? 26 : 40}px; font-weight: 900; line-height: 1.15;">${esc(n)}</div><div style="margin-top: 10px; flex: 1; font-size: 14px; line-height: 1.7; color: ${C.ink2}; text-wrap: pretty;">${esc(d)}</div><div style="margin-top: 12px; padding-top: 8px; border-top: 1px dashed ${C.rule2}; font-size: 11.5px; color: ${C.cap};">${esc(s)}</div></div>`).join('');
  return `${secOpen('ledger', 'R', '账本')}${head('R', '账本', '几个数字')}
<div style="margin-top: 30px; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr)); gap: 14px;">${cards}</div>
</section>`;
}

function footer() {
  const notes = ['年份与数字均据节目口述整理，没有逐条核对原始资料。', '转写没有说话人标注，页面上的观点一律写作“节目认为”或“一位主持人认为”；两位主持人有分歧的地方并排列出或注明。', '板块时长按节目里的过渡句切分，误差约一分钟；提及次数含转写变体，是约数。', '整理者所加：E 那条线的高低、F 的深浅档位、J 的主题分组、O 的三组。D 的三段分期是节目自己的。', '海报与人物照片来自维基百科，仅作识别用途；空白的图位可以直接拖入图片替换。'];
  return `<div style="margin-top: clamp(72px, 9vw, 112px);">${RWB}</div><footer data-screen-label="页脚" style="padding: 36px ${PAD} 48px; border-top: 3px double ${C.ink}; background: ${C.deep};">
<div style="font-family: ${F.serif}; font-size: 20px; font-weight: 700;">年份与数字均据节目口述整理。</div>
<ul style="margin: 14px 0 0; padding: 0; list-style: none; max-width: 980px;">${notes.slice(1).map(t => `<li style="padding: 6px 0; font-size: 13px; line-height: 1.75; color: ${C.cap};">${t}</li>`).join('')}</ul>
<div style="margin-top:22px;font-size:13px;color:${C.cap}">电影巨辩 · 付费专辑《为了华语电影》第 2 集《香港特区电影，始于 1997》</div>
${seriesNav({ color: C.cap, footer: true })}
</footer>`;
}

// ===== assemble
const helmet = `<helmet>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<script src="./image-slot.js"></script>
<style>
  body { margin: 0; background: #E3DCCB; }
  a { color: ${C.l2}; text-decoration: none; }
  a:hover { color: ${C.co}; }
  html { scroll-behavior: smooth; }
</style>
</helmet>`;
const bodyParts = [cover(), sectionB(), sectionD(), sectionE(), sectionF(), sectionG(), sectionH(), sectionI(), sectionN(), sectionL(), sectionM(), sectionJ(), sectionK(), sectionO(), sectionP(), sectionQ(), sectionR(), footer()];
const template = `${helmet}
<div style="width: 100%; max-width: {{ frameW }}; margin: 0 auto; background: ${C.paper}; color: ${C.ink}; font-family: ${F.sans}; font-variant-numeric: tabular-nums; overflow: hidden; box-shadow: 0 0 0 1px rgba(26,28,30,0.08);">
${bodyParts.join('\n')}
</div>`;
const JS = `
class Component extends DCLogic {
  mq = window.matchMedia('(max-width: 759px)');
  state = { mqNarrow: this.mq.matches, allSt: null, allEv: null, jClosed: {} };
  componentDidMount() {
    this.onMq = (e) => this.setState({ mqNarrow: e.matches });
    this.mq.addEventListener('change', this.onMq);
    const addFonts = () => {
      if (document.getElementById('hk02-fonts')) return;
      const l = document.createElement('link');
      l.id = 'hk02-fonts'; l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@600;700;900&family=Noto+Sans+SC:wght@400;500;700&family=IBM+Plex+Mono:wght@400;600&family=Ma+Shan+Zheng&display=swap';
      document.head.appendChild(l);
    };
    if (document.readyState === 'complete') setTimeout(addFonts, 0);
    else window.addEventListener('load', addFonts, { once: true });
  }
  componentWillUnmount() { this.mq.removeEventListener('change', this.onMq); }
  renderVals() {
    const mob = (this.props.layout ?? '自动') === '手机预览';
    const narrow = mob || this.state.mqNarrow;
    const allSt = this.state.allSt ?? (this.props.showAllStations ?? false);
    const allEv = this.state.allEv ?? (this.props.showAllEvents ?? false);
    const v = {
      frameW: mob ? '390px' : '1440px',
      wideDisp: narrow ? 'none' : 'block', narrowDisp: narrow ? 'block' : 'none',
      stMinorGrid: allSt ? 'grid' : 'none', evMinorFlex: allEv ? 'flex' : 'none', evMinorGrid: allEv ? 'grid' : 'none', evListDisp: (narrow || allEv) ? 'block' : 'none',
      gConnGap: narrow ? '24px' : '0px', iOffset: narrow ? '0px' : 'clamp(0px, 14%, 220px)', mLabW: narrow ? '112px' : '240px',
      stBtn: allSt ? '收起次站，只看 ${N1} 个主站' : '展开全部 ${NST} 个站点',
      evBtn: narrow ? (allEv ? '只看主要事件' : '显示全部 ${EV.length} 条事件') : (allEv ? '收起事件清单' : '展开全部 ${EV.length} 条事件的清单'),
      toggleSt: () => this.setState({ allSt: !allSt }),
      toggleEv: () => this.setState({ allEv: !allEv })
    };
    for (let i = 0; i < ${NJ}; i++) {
      const c = !!this.state.jClosed[i];
      v['jg' + i] = c ? 'none' : 'grid';
      v['ja' + i] = c ? '展开 ▾' : '收起 ▴';
      v['jt' + i] = () => this.setState(s => ({ jClosed: { ...s.jClosed, [i]: !s.jClosed[i] } }));
    }
    return v;
  }
}`;
const props = { showAllStations: { editor: 'boolean', default: false, tsType: 'boolean', section: '展开' }, showAllEvents: { editor: 'boolean', default: false, tsType: 'boolean', section: '展开' }, layout: { editor: 'enum', options: ['自动', '手机预览'], default: '自动', tsType: 'string', section: '版式' } };
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
await saveFile(OUT, html);
log('saved', OUT, html.length, 'chars; events', EV.length, 'stations', NST, 'L1', N1, 'films', D[14][0].length);

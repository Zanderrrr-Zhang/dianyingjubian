// ===== K Three Gorges
function sectionK() {
  const k = D[16][0];
  const origin = `<div style="margin-top: 28px; overflow-x: auto; padding-bottom: 10px;"><div style="display: flex; gap: 8px; align-items: stretch; width: max-content;">${k.origin.map((s, i) => `${i ? arrowR(C.now) : ''}<div style="flex: none; width: 168px; padding: 10px 12px; box-sizing: border-box; ${i === k.origin.length - 1 ? `background: ${C.now}; color: #fff; border: 1px solid ${C.now};` : `background: ${C.card}; border: 1px solid ${C.ink};`}"><div style="font-family: ${F.mono}; font-size: 12px; ${i === k.origin.length - 1 ? '' : `color: ${C.cap};`}">${i + 1}</div><div style="margin-top: 4px; font-size: 14px; line-height: 1.6;">${esc(s)}</div></div>`).join('')}</div></div>`;
  const tl = `<div style="flex: 1 1 620px; min-width: 0;">${sub('两条相向而行的线', '韩三明往回找妻子，沈红往回找丈夫')}<div style="margin-top: 14px; display: grid; grid-template-columns: minmax(0, 1fr) 96px minmax(0, 1fr); gap: 0 12px; align-items: center;"><div style="display: flex; align-items: center; justify-content: flex-end; gap: 8px; padding: 8px 0; font-family: ${F.serif}; font-size: 18px; font-weight: 700;">${photo('hansm', '韩三明', 40, 40)}韩三明${arrowR(C.now)}</div><span></span><div style="display: flex; align-items: center; gap: 8px; padding: 8px 0; font-family: ${F.serif}; font-size: 18px; font-weight: 700;"><span style="transform: scaleX(-1); display: flex;">${arrowR(C.now)}</span>${photo('zhaotao', '赵涛', 40, 40)}沈红（赵涛饰）</div>${k.two_lines.map(r => `<div style="padding: 10px 0; border-top: 1px solid ${C.rule}; text-align: right; font-size: 15px;">${esc(r.han)}</div><div style="padding: 10px 0; border-top: 1px solid ${C.rule}; text-align: center; ${S.lab}">${esc(r.row)}</div><div style="padding: 10px 0; border-top: 1px solid ${C.rule}; font-size: 15px;">${esc(r.shen)}</div>`).join('')}</div>${cap('节目说两人的共同点是在一个往前冲的时代里往回走。')}</div>`;
  const side = `<div style="flex: 1 1 340px; min-width: 0; display: grid; gap: 14px;"><div style="${S.body}"><span style="${S.lab}">方法</span><br>${esc(k.method)}</div><div style="${S.body}"><span style="${S.lab}">运气</span><br>${esc(k.luck)}</div><div style="${S.body}"><span style="${S.lab}">之后</span><br>${esc(k.after)}</div></div>`;
  const surreal = `<div style="margin-top: 44px;">${sub('魔幻场景', '只写场景名和节目的说明')}<div style="margin-top: 14px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr)); gap: 12px;">${k.surreal.map(s => `<div style="padding: 12px 14px; background: ${C.card}; border: 1px solid ${C.ink}; border-top: 3px solid ${C.now};"><div style="font-family: ${F.serif}; font-size: 16px; font-weight: 700;">${esc(s.scene)}</div><div style="margin-top: 6px; font-size: 13.5px; line-height: 1.6; color: ${C.ink2};">${esc(s.note || '—')}</div></div>`).join('')}</div>${cap(esc(k.surreal_reading) + '。')}</div>`;
  const cv = k.controversy;
  const contro = `<div style="margin-top: 36px; padding: 18px 20px; background: ${C.grey}; border: 1px solid ${C.faint};"><div style="font-family: ${F.serif}; font-size: 18px; font-weight: 700;">最大的争议</div>${[['片中发生了什么', cv.what], ['节目的看法', cv.program_view], ['节目转述导演的话', cv.director_said.replace(/^节目转述导演的话：/, '')]].map(([a, b]) => `<div style="display: grid; grid-template-columns: 128px minmax(0, 1fr); gap: 12px; padding: 10px 0; border-top: 1px solid ${C.rule}; font-size: 14.5px; line-height: 1.75;"><span style="color: ${C.muted};">${a}</span><span>${esc(b)}</span></div>`).join('')}</div>`;
  return `${secOpen('sanxia', 'K', '可遇不可求')}${head('K', '可遇不可求', '《三峡好人》是怎么来的，两条线讲什么')}
${withPoster('still', '《三峡好人》', `<p style="${S.intro} margin-top: 0;">只讲了 16 分钟，却是整期被提到第二多的片名（99 次）。它从一幅画开始，经过一部纪录片，在现场被撞出来。</p>`)}
${origin}
<div style="margin-top: 40px; display: flex; flex-wrap: wrap; gap: 32px 48px; align-items: flex-start;">${tl}${side}</div>
${surreal}${contro}
</section>`;
}

// ===== L A Touch of Sin
function sectionL() {
  const [parts, cens] = D[17];
  const U = 20, n = parts.length;
  const col = (p, i) => `<div style="min-width: 0; display: flex; flex-direction: column;"><div style="height: ${n * U + 24}px; display: flex; flex-direction: column; align-items: stretch;"><div style="height: ${(n - i) * U}px; box-sizing: border-box; border: 1.5px solid ${C.ink}; background: ${C.card}; ${i === n - 1 ? `border-style: dashed;` : ''}"></div><div style="margin-top: 4px; font-size: 13px; line-height: 1.4; text-align: center;">${esc(p.weapon)}</div></div><div style="margin: 8px 0; padding: 8px 6px; background: ${C.ink}; color: ${C.paper}; text-align: center;"><div style="display: flex; justify-content: center; margin-bottom: 6px;">${ACT[p.actor] ? photo(ACT[p.actor], p.actor, 48, 48, `box-shadow: 0 0 0 1.5px ${C.paper};`) : `<span style="width: 48px; height: 48px;"></span>`}</div><div style="font-family: ${F.serif}; font-size: 20px; font-weight: 900; line-height: 1.2;">${p.part}</div><div style="margin-top: 2px; font-size: 13px;">${esc(p.who)}${p.actor ? `<span style="color: ${DK.sub};"> · ${esc(p.actor)}</span>` : ''}</div></div><div style="height: ${n * U}px; display: flex; flex-direction: column; justify-content: flex-end;"><div style="height: ${(i + 1) * U}px; ${fill(C.now, 'dg')}"></div></div></div>`;
  const chart = `<div style="margin-top: 28px; display: grid; grid-template-columns: minmax(64px, 120px) repeat(${n}, minmax(0, 1fr)); gap: 10px; align-items: start;"><div style="display: flex; flex-direction: column;"><div style="height: ${n * U + 24}px; display: flex; flex-direction: column; justify-content: center; font-family: ${F.serif}; font-size: 14px; font-weight: 700; line-height: 1.5;">武器<span style="font-family: ${F.sans}; font-size: 12px; font-weight: 400; color: ${C.cap};">一级比一级小</span></div><div style="margin: 8px 0; height: 106px;"></div><div style="height: ${n * U}px; display: flex; flex-direction: column; justify-content: center; font-family: ${F.serif}; font-size: 14px; font-weight: 700; line-height: 1.5;">外部压力<span style="font-family: ${F.sans}; font-size: 12px; font-weight: 400; color: ${C.cap};">一段比一段大</span></div></div>${parts.map(col).join('')}</div>`;
  const rel = `<div style="margin-top: 18px;">${parts.map(p => `<div style="display: grid; grid-template-columns: 40px 64px minmax(0, 1fr); gap: 10px; padding: 8px 0; border-bottom: 1px solid ${C.rule}; font-size: 14px; line-height: 1.7;"><span style="font-family: ${F.serif}; font-weight: 900;">${p.part}</span><span>${esc(p.who)}</span><span style="color: ${C.ink2};">${esc(p.relation_to_world)}</span></div>`).join('')}</div>${cap('节目的解释：武器一级比一级小，是因为另一层逻辑在升级：四个人的主动性依次下降，外部环境的压力一段比一段大。柱高为示意。')}`;
  const timeline = `<div style="margin-top: 44px;">${sub('审查的经过', '措辞据节目')}<div style="margin-top: 14px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr)); gap: 0; border-left: 1px solid ${C.ink};">${cens.map(c => `<div style="padding: 10px 12px 12px; border-right: 1px solid ${C.ink}; border-top: 3px solid ${C.ink};"><div style="display: flex; align-items: baseline; gap: 8px;"><span style="font-family: ${F.mono}; font-size: 13px; font-weight: 600;">${c.step}</span><span style="font-size: 12.5px; color: ${C.cap};">${esc(c.when || '')}</span></div><div style="margin-top: 6px; font-size: 14px; line-height: 1.65;">${esc(c.event)}</div></div>`).join('')}</div></div>`;
  const rd = D[19][0].find(r => r.topic.includes('天注定'));
  const reads = `<div style="margin-top: 40px; display: flex; flex-wrap: wrap; gap: 24px 40px; align-items: flex-start;"><div style="flex: 1 1 560px; min-width: 0;">${sub('它讲的是什么', '两位主持人的读法')}<div style="margin-top: 12px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); gap: 12px;"><div style="padding: 12px 14px; background: ${C.card}; border: 1px solid ${C.ink};"><div style="${S.lab}">一位主持人</div><div style="margin-top: 4px; ${S.body}">${esc(rd.one_host)}</div></div><div style="padding: 12px 14px; background: ${C.card}; border: 1px solid ${C.ink};"><div style="${S.lab}">另一位主持人</div><div style="margin-top: 4px; ${S.body}">${esc(rd.other_host)}</div></div></div></div><div style="flex: 1 1 320px; min-width: 0; display: grid; gap: 16px;"><div style="${S.body}"><span style="${S.lab}">构思（节目转述）</span><br>微博把暴力事件天天推到人们眼前；他那几年厌烦隐喻和猜谜式的电影，决定直接拍。</div>${quote('一个人不应该把自己分成两半。', '贾樟柯的话，节目转述', 18)}</div></div>`;
  return `${secOpen('tzd', 'L', '四个故事')}${head('L', '四个故事', '《天注定》：四段的逻辑，审查的经过')}
${withPoster('sin', '《天注定》', `<p style="${S.intro} margin-top: 0;">节目称它是构思最严密的一部，也是后一个阶段的起点。四个故事里，武器一级级降下来，外部环境的压力一段段升上去。</p>`)}
${chart}${rel}${timeline}${reads}
</section>`;
}

// ===== M only the present
function sectionM() {
  const m = D[18][0];
  const left = `<div style="flex: 1 1 360px; min-width: 0; border: 1px solid ${C.ink};"><div style="padding: 10px 16px; background: ${C.now}; color: #fff; font-family: ${F.serif}; font-size: 18px; font-weight: 700;">赶上现场的</div>${m.now.map(r => `<div style="display: grid; grid-template-columns: 110px minmax(0, 1fr); gap: 12px; padding: 12px 16px; border-top: 1px solid ${C.rule}; background: ${C.card};"><span style="font-family: ${F.serif}; font-size: 16px; font-weight: 700;">${esc(r.film)}</span><span style="font-size: 15px; line-height: 1.6;"><span style="color: ${C.cap};">赶上了：</span>${esc(r.caught)}</span></div>`).join('')}</div>`;
  const right = `<div style="flex: 1 1 360px; min-width: 0; border: 1px solid ${C.ink};"><div style="padding: 10px 16px; background: ${C.past}; color: #fff; font-family: ${F.serif}; font-size: 18px; font-weight: 700;">回望过去的</div>${m.past.map(r => `<div style="display: grid; grid-template-columns: 110px minmax(0, 1fr); gap: 12px; padding: 12px 16px; border-top: 1px solid ${C.rule}; background: ${C.card};"><span style="font-family: ${F.serif}; font-size: 15px; font-weight: 700; line-height: 1.5;">${esc(r.films)}</span><span style="font-size: 15px; line-height: 1.6;"><span style="color: ${C.cap};">节目：</span>${esc(r.program_view)}</span></div>`).join('')}</div>`;
  const mid = `<div style="flex: 0 1 200px; min-width: 0; align-self: center; text-align: center; padding: 10px 0;"><div style="font-family: ${F.serif}; font-size: 30px; font-weight: 900; line-height: 1.4;">他不能<br>拍历史。</div><div style="margin-top: 8px; font-size: 13px; color: ${C.cap};">节目的结论</div></div>`;
  const q = m.in_qing;
  const qing = `<div style="margin-top: 44px;">${sub(esc(q.title) + '为什么难拍', esc(q.theme))}<div style="display: grid; grid-template-columns: minmax(0, 1fr) 28px minmax(0, 1fr); gap: 0 12px; font-size: 14.5px; line-height: 1.7;"><span style="padding: 8px 0; ${S.lab}">他惯用的办法</span><span></span><span style="padding: 8px 0; ${S.lab}">放到古装片里</span>${q.why_hard.map(r => `<span style="padding: 10px 0; border-top: 1px solid ${C.rule};">${esc(r.habit)}</span><span style="padding: 10px 0; border-top: 1px solid ${C.rule}; color: ${C.faint};">→</span><span style="padding: 10px 0; border-top: 1px solid ${C.rule}; font-weight: 700;">${esc(r.in_costume_film)}</span>`).join('')}</div></div>`;
  const au = m.audiences;
  return `${secOpen('onlynow', 'M', '只能拍当下')}${head('M', '只能拍当下', '节目的结论')}
<p style="${S.intro}">节目小结：${esc(m.claim)}。两位主持人都选的是${au.both_hosts.join('')}；国内的评价会再加上${esc(au.domestic_adds)}，国外会再加上${esc(au.abroad_adds)}。</p>
<div style="margin-top: 32px; display: flex; flex-wrap: wrap; gap: 24px; align-items: stretch;">${left}${mid}${right}</div>
${qing}
<div style="margin-top: 36px; max-width: 760px;">${quote('他一旦违背这个方法，拍出来的东西就不太有能量。', '一位主持人', 20)}</div>
</section>`;
}

// ===== N debates
function sectionN() {
  const corner = `<div aria-hidden="true" style="display: flex; flex-direction: column; align-items: center;"><div style="width: 14px; height: 14px; box-sizing: border-box; border-top: 3px solid ${C.ink}; border-left: 3px solid ${C.ink}; margin-left: 11px;"></div><div style="flex: 1; width: 3px; background: ${C.ink}; margin-top: -14px;"></div></div>`;
  const cards = D[19][0].map((r, i) => `<div style="min-width: 0; padding: 14px 16px 16px; background: ${C.card}; border: 1px solid ${C.ink};"><div style="display: flex; align-items: baseline; gap: 10px;"><span style="font-family: ${F.mono}; font-size: 12.5px; color: ${C.cap};">${String(i + 1).padStart(2, '0')}</span><span style="font-family: ${F.serif}; font-size: 17px; font-weight: 700; line-height: 1.45;">${esc(r.topic)}</span></div><div style="margin-top: 12px; display: grid; grid-template-columns: minmax(0, 1fr) 28px minmax(0, 1fr); gap: 0 6px; align-items: stretch;"><div><div style="${S.lab}">一种读法</div><div style="margin-top: 4px; font-size: 14px; line-height: 1.7;">${esc(r.one_host)}</div></div>${corner}<div><div style="${S.lab}">另一种读法</div><div style="margin-top: 4px; font-size: 14px; line-height: 1.7;">${esc(r.other_host)}</div></div></div></div>`).join('');
  return `${secOpen('debate', 'N', '他们在哪里读法不同')}${head('N', '他们在哪里读法不同', '两位主持人的分歧')}
<p style="${S.intro}">这一期两人对每部片的好坏判断基本一致，分歧都在具体的读法上。每张卡左右两边各是一位主持人的读法，转写没有说话人标注，不分谁是谁。</p>
<div style="margin-top: 28px; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 560px), 1fr)); gap: 16px;">${cards}</div>
</section>`;
}

// ===== O oral histories
function sectionO() {
  const [order, js] = D[20], sh = js.shanghai;
  const hatch = `background: repeating-linear-gradient(45deg, rgba(255,255,255,0.4) 0 2px, transparent 2px 7px), ${C.past};`;
  const band = `<div style="margin-top: 16px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 140px), 1fr)); gap: 4px;">${order.map(r => { const real = r.kind !== '演员'; return `<div style="min-width: 0; display: flex; flex-direction: column;"><div style="height: 40px; ${real ? fill(C.past, 'dv') : hatch}"></div><div style="flex: 1; padding: 8px 10px 10px; background: ${C.card}; border: 1px solid ${C.rule2}; border-top: none;"><div style="font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${r.order} · ${esc(r.kind)}</div><div style="margin-top: 2px; font-family: ${F.serif}; font-size: 14.5px; font-weight: 700; line-height: 1.45;">${esc(r.who)}</div>${r.note ? `<div style="margin-top: 4px; font-size: 12.5px; line-height: 1.6; color: ${C.ink2};">${esc(r.note)}</div>` : ''}</div></div>`; }).join('')}</div><div style="margin-top: 10px; display: flex; flex-wrap: wrap; gap: 8px 20px; font-size: 12.5px; color: ${C.ink2};"><span style="display: inline-flex; align-items: center; gap: 6px;">${sw(C.past, 22, 13, 'dv')}真实的人</span><span style="display: inline-flex; align-items: center; gap: 6px;"><span style="width: 22px; height: 13px; ${hatch}"></span>演员扮演</span><span style="color: ${C.cap};">按出场顺序排列，格宽不代表时长</span></div>`;
  const jux = `<div style="margin-top: 14px; display: flex; flex-wrap: wrap; gap: 8px; align-items: stretch;">${sh.juxtaposition.map((s, i) => `${i ? `<span style="align-self: center; font-family: ${F.serif}; font-size: 20px; font-weight: 700; color: ${C.past};">＋</span>` : ''}<div style="flex: 1 1 200px; min-width: 0; padding: 10px 12px; background: ${C.card}; border: 1px solid ${C.ink}; font-size: 14px; line-height: 1.65;">${esc(s)}</div>`).join('')}</div>`;
  return `${secOpen('oral', 'O', '口述历史')}${head('O', '口述历史', '《二十四城记》《海上传奇》的问题')}
<div style="margin-top: 24px; display: flex; flex-wrap: wrap; gap: 20px 32px; align-items: flex-start;"><div style="display: flex; gap: 12px;">${poster('city24', '《二十四城记》', 110)}${poster('wish', '《海上传奇》', 110)}</div><p style="${S.intro} margin-top: 0; flex: 1 1 360px;">金狮奖之后的两部口述历史。节目认为一部让明星毁了口述，一部只让精英发声。</p></div>
<div style="margin-top: 32px;">${sub('《二十四城记》的出场顺序', '前半小时是真实职工，之后是四位演员，结尾是一位职工后代')}${band}${cap('全片 1 小时 50 分，真实职工集中在前半小时。导演的解释是采访了一百多人，只能用虚构来概括。节目的看法：明星演过的其他角色会叠在“真实人物”身上，口述历史就没有意义了。')}</div>
<div style="margin-top: 44px;">${sub('《海上传奇》', '节目的评价：' + esc(sh.verdict))}<div style="margin-top: 18px; display: flex; flex-wrap: wrap; gap: 24px 48px; align-items: flex-start;"><div style="flex: 1 1 420px; min-width: 0;"><div style="font-family: ${F.serif}; font-size: clamp(24px, 2.6vw, 32px); font-weight: 900; line-height: 1.4;">18 位受访者全是社会精英。</div><div style="margin-top: 8px; ${S.body}">${esc(sh.people.replace(/^18 位受访者全是社会精英：/, ''))}</div><div style="margin-top: 14px; ${S.body}"><span style="${S.lab}">一头一尾</span><br>开头是${esc(sh.first_and_last.first)}，收尾是${esc(sh.first_and_last.last)}。节目说：${esc(sh.first_and_last.program_view)}。</div></div><div style="flex: 1 1 420px; min-width: 0; display: grid; gap: 12px;"><div style="${S.body}"><span style="${S.lab}">太工整</span><br>${esc(sh.too_neat)}</div><div style="${S.body}"><span style="${S.lab}">英文片名 ${esc(sh.english_title.title)}</span><br>${esc(sh.english_title.reading)}；节目说${esc(sh.english_title.program_view)}。</div><div style="${S.body}"><span style="${S.lab}">普通人</span><br>${esc(sh.ordinary_people)}</div></div></div>
<div style="margin-top: 28px; ${S.lab}">一处并置</div>${jux}${cap('两位主持人对这处并置读法不同，见模块 N。')}</div>
</section>`;
}

// ===== P Ash is purest white
function sectionP() {
  const p = D[21][0], wj = p.where_jianghu_came_from;
  const bx = (t, extra = '') => `<div style="padding: 12px 14px; background: ${C.card}; border: 1px solid ${C.ink}; font-size: 14.5px; line-height: 1.6; ${extra}">${esc(t)}</div>`;
  const dots = [[12, 20], [40, 64], [70, 30], [86, 72], [24, 80], [58, 12], [92, 40], [8, 52]].map(([x, y]) => `<span style="position: absolute; left: ${x}%; top: ${y}%; width: 6px; height: 6px; border-radius: 50%; background: ${C.past};"></span>`).join('');
  const merge = `<div style="margin-top: 24px; display: flex; flex-wrap: wrap; gap: 10px; align-items: stretch;"><div style="flex: 1 1 200px; min-width: 0; display: grid; gap: 8px;">${bx(wj.source_1)}${bx(wj.source_2)}</div><div style="flex: 0 0 26px; position: relative; margin: 20px 0;"><div style="position: absolute; left: 0; top: 0; bottom: 0; right: 10px; border: 2px solid ${C.ink}; border-left: none;"></div><span style="position: absolute; right: 0; top: 50%; margin-top: -6px; width: 10px; height: 12px; background: ${C.ink}; clip-path: polygon(0 0, 100% 50%, 0 100%);"></span></div><div style="flex: 1 1 220px; min-width: 0; display: flex; align-items: center; padding: 14px 16px; background: ${C.past}; color: #fff; font-family: ${F.serif}; font-size: 17px; font-weight: 700; line-height: 1.55;">${esc(wj.result)}</div>${arrowR(C.past)}<div style="flex: 1 1 220px; min-width: 0; position: relative; min-height: 96px; padding: 14px 16px; border: 1.5px dashed ${C.past}; display: flex; align-items: center; font-size: 14.5px; line-height: 1.6;">${dots}<span style="position: relative; background: ${C.paper}; padding: 2px 4px;">${esc(wj.then)}</span></div></div><div style="margin-top: 16px; font-family: ${F.serif}; font-size: 18px; font-weight: 700; line-height: 1.6; max-width: 880px;">节目：${esc(wj.program_view)}。</div>`;
  const goof = `<div style="flex: 0 1 320px; min-width: 0; padding: 16px 18px; background: ${C.card}; border: 1.5px solid ${C.ink}; box-shadow: 6px 6px 0 0 ${C.past};"><div style="font-family: ${F.serif}; font-size: 20px; font-weight: 900; line-height: 1.5;">${p.goof.set_in} 年的戏，${p.goof.phone_released} 年的手机。</div><div style="margin-top: 8px; font-size: 13.5px; line-height: 1.7; color: ${C.ink2};">${esc(p.goof.note)}。</div></div>`;
  return `${secOpen('jianghu', 'P', '哪有什么江湖')}${head('P', '哪有什么江湖', '《江湖儿女》：江湖是哪来的')}
<div style="margin-top: 24px; display: flex; flex-wrap: wrap; gap: 20px 32px; align-items: flex-start;"><div style="display: flex; gap: 12px; align-items: flex-end;">${poster('ash', '《江湖儿女》', 132)}<figure style="margin: 0;">${photo('liaofan', '廖凡', 96, 120)}<figcaption style="margin-top: 6px; font-size: 12.5px; color: ${C.cap};">廖凡，饰斌哥</figcaption></figure></div><p style="${S.intro} margin-top: 0; flex: 1 1 360px;">节目的评价：${esc(p.verdict)}。${esc(p.genre)}。</p></div>
${merge}
<div style="margin-top: 36px; display: flex; flex-wrap: wrap; gap: 24px 48px; align-items: flex-start;"><div style="flex: 1 1 520px; min-width: 0; display: grid; gap: 12px;"><div style="${S.body}"><span style="${S.lab}">新的地方</span><br>${p.new.map(esc).join('；')}。</div><div style="${S.body}"><span style="${S.lab}">一场戏</span><br>${esc(p.scene)}。</div><div style="${S.body}"><span style="${S.lab}">没拍出来的</span><br>${esc(p.missing)}。</div><div style="${S.body}"><span style="${S.lab}">长镜头</span><br>${esc(p.long_take)}。</div></div>${goof}</div>
</section>`;
}

// ===== Q ending
function sectionQ() {
  const q = D[22][0];
  const tl = `<div style="margin-top: 28px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr)); gap: 0; border-left: 1px solid ${C.ink};">${q.timeline.map((t, i) => `<div style="padding: 12px 14px 14px; border-right: 1px solid ${C.ink}; border-top: 4px solid ${i === 1 ? C.ink : C.end}; ${i === 1 ? `background: ${C.card};` : ''}"><div style="font-family: ${F.mono}; font-size: 13px; font-weight: 600;">${esc(t.when)}</div><div style="margin-top: 6px; font-size: ${i === 1 ? '17px' : '14.5px'}; ${i === 1 ? `font-family: ${F.serif}; font-weight: 700;` : ''} line-height: 1.65;">${esc(t.text)}</div></div>`).join('')}</div>`;
  const unmade = `<div style="margin-top: 40px;">${sub('还没拍的三部片', '节目的判断')}<div style="margin-top: 14px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); gap: 12px;">${q.unmade.map(u => `<div style="padding: 14px 16px; border: 1.5px dashed ${C.ink}; background: ${C.paper};"><div style="font-family: ${F.serif}; font-size: 17px; font-weight: 700;">${esc(u.title)}</div><div style="margin-top: 6px; font-size: 14px; line-height: 1.7; color: ${C.ink2};">${esc(u.program_view)}</div></div>`).join('')}</div></div>`;
  const closing = `<div style="margin-top: 48px; padding: clamp(36px, 5vw, 64px) clamp(20px, 4vw, 48px); background: ${C.ink}; color: #fff; text-align: center;"><div style="font-family: ${F.serif}; font-size: clamp(26px, 3.4vw, 44px); font-weight: 700; line-height: 1.6; letter-spacing: 0.08em;">国家不幸诗家幸，<br>赋到沧桑句便工。</div><div style="margin-top: 16px; font-size: 13.5px; color: ${DK.sub};">赵翼《题遗山诗》，节目的结语</div></div>`;
  return `${secOpen('ending', 'Q', '结局')}${head('Q', '结局', '2010 年的那篇文章，到 2025 年')}
<p style="${S.intro}">${esc(q.first_stage_over)}。节目说，他关心了二十多年的命题，${esc(q.old_question)}，告一段落了；${esc(q.open_question.replace(/；/, '，'))}。</p>
${tl}
<div style="margin-top: 32px; display: flex; flex-wrap: wrap; gap: 24px 48px; align-items: flex-start;"><div style="flex: 1 1 420px; min-width: 0;">${quote('这个收尾是时代自己画上了句号。', '一位主持人', 20)}</div><div style="flex: 1 1 420px; min-width: 0;">${quote('艺术家是不会挑时代的。', '一位主持人', 20)}<div style="margin-top: 12px; ${S.body}">${esc(q.wish)}。</div></div></div>
${unmade}${closing}
</section>`;
}

// ===== R mentions
function sectionR() {
  const [men, yrs] = D[23];
  const HL = { '赵涛': '187 次，接近第二名的四倍', '《三峡好人》': '99 次，它只聊了 16 分钟', '独立': '“独立”12 次', '妥协': '“妥协”5 次' };
  const group = (g, title, w) => { const rows = men.filter(r => r.group === g); const mx = Math.max(...rows.map(r => +r.mentions)); return `<div style="flex: ${w}; min-width: 0;">${sub(title, rows.length + ' 项')}<div style="margin-top: 8px;">${rows.map(r => { const hl = HL[r.name]; return `<div style="display: grid; grid-template-columns: 96px minmax(0, 1fr) 34px; gap: 2px 8px; align-items: center; padding: 2px 0; font-size: 13px;"><span style="${hl ? 'font-weight: 700;' : `color: ${C.ink2};`} white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${esc(r.name)}</span><div style="height: 14px;"><div style="width: ${f1(+r.mentions / mx * 100)}%; height: 100%; background: ${hl ? C.ink : C.end};"></div></div><span style="font-family: ${F.mono}; font-size: 12px; text-align: right;">${r.mentions}</span>${hl ? `<span></span><span style="grid-column: 2 / 4; padding-bottom: 4px; font-size: 12px; line-height: 1.5; color: ${C.ink};">↑ ${hl}</span>` : ''}</div>`; }).join('')}</div></div>`; };
  const ys = yrs.slice().sort((a, b) => a.year - b.year), ymx = Math.max(...ys.map(r => +r.mentions));
  const ycols = `<div style="margin-top: 16px; display: flex; gap: 6px; align-items: flex-end; height: 170px; border-bottom: 1px solid ${C.ink};">${ys.map(r => `<div title="${esc(r.year + ' · ' + r.mentions + ' 次 · ' + r.meaning)}" style="flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%;"><span style="font-family: ${F.mono}; font-size: 12px;">${r.mentions}</span><div style="width: 100%; max-width: 44px; height: ${f1(+r.mentions / ymx * 130)}px; background: ${C.end}; box-shadow: inset 0 0 0 1px ${C.faint};"></div></div>`).join('')}</div><div style="display: flex; gap: 6px;">${ys.map(r => `<span style="flex: 1 1 0; min-width: 0; text-align: center; font-family: ${F.mono}; font-size: 11.5px; padding-top: 4px; overflow: hidden;">${r.year}</span>`).join('')}</div><div style="margin-top: 16px; columns: 300px; column-gap: 28px;">${ys.map(r => `<div style="break-inside: avoid; display: grid; grid-template-columns: 44px minmax(0, 1fr); gap: 8px; padding: 5px 0; border-bottom: 1px solid ${C.rule}; font-size: 13px; line-height: 1.6;"><span style="font-family: ${F.mono};">${r.year}</span><span style="color: ${C.ink2};">${esc(r.meaning)}</span></div>`).join('')}</div>`;
  return `${secOpen('mentions', 'R', '谁被提得最多')}${head('R', '谁被提得最多', '节目最在意谁、哪部片、哪一年')}
<p style="${S.intro}">贾樟柯本人出现约 620 次（其中约 610 次是“科长”），不列入排名。</p>
<div style="margin-top: 28px; display: flex; flex-wrap: wrap; gap: 36px 40px; align-items: flex-start;">${group('人物', '人物', '1 1 360px')}${group('影片', '影片', '1 1 360px')}${group('概念', '概念', '1 1 360px')}</div>
<div style="margin-top: 48px;">${sub('年份', '节目里说到的具体年份')}${ycols}</div>
${cap('提及次数含转写变体，是约数。年代词：“90 年代”约 20 次，“80 年代”约 12 次，其余年代都只有一两次。')}
</section>`;
}

// ===== S numbers
function sectionS() {
  const pick = ['47 分钟', '约 620 次', '6 次', '5 万到 2 万', '7 分钟', '12 年', '16 年与 2 年', '156 米'];
  const rows = pick.map(p => D24.find(r => r[0] === p)).filter(Boolean);
  return `${secOpen('numbers', 'S', '数字')}${head('S', '数字', '冷知识')}
<div style="margin-top: 28px; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr)); gap: 16px;">${rows.map(([n, d, s]) => `<div style="display: flex; flex-direction: column; background: ${C.card}; border: 1px solid ${C.ink};">${`<div style="display: flex; flex-direction: column; background: ${C.ink};">${holes(6)}<div style="height: 4px;"></div>${holes(6)}</div>`}<div style="padding: 16px 18px 18px; display: flex; flex-direction: column; flex: 1;"><div style="font-family: ${F.serif}; font-size: 34px; font-weight: 900; line-height: 1.2;">${esc(n)}</div><div style="margin-top: 10px; font-size: 14.5px; line-height: 1.7; flex: 1;">${esc(d)}</div><div style="margin-top: 10px; font-size: 12px; color: ${C.cap};">来源：${esc(s)}</div></div></div>`).join('')}</div>
</section>`;
}

function footer() {
  return `<footer style="margin-top: clamp(72px, 9vw, 120px); padding: 36px ${PAD} 44px; border-top: 3px double ${C.ink}; background: ${C.deep};">
<div style="font-family: ${F.serif}; font-size: 18px; font-weight: 700;">年份与数字均据节目口述整理。</div>
<div style="margin-top: 12px; max-width: 980px; display: grid; gap: 6px; font-size: 13px; line-height: 1.8; color: ${C.cap};"><div>节目：《电影巨辩》付费专辑《为了华语电影》第 4 集，主持老马（magasa）、阿吴（LOOK），录制于 2024 年 12 月底，全长 4:46:25。</div><div>转写没有说话人标注，观点统一写作“节目”或“一位主持人”；唯一署名“阿吴”的一句，转写里对方点了他的名。</div><div>评价分档、“当下、回望”的归类、板块颜色、素材带与载体纹理、标“整理”的年份为整理者所加；哪场戏来自哪批素材据主持人推断。时长误差约一分钟，提及次数为约数。</div><div>海报与人物照片来自维基百科；没找到的留了空位，可以把图片拖进去。</div></div>
${seriesNav({ color: C.cap, footer: true })}
</footer>`;
}

// ===== assemble
const helmet = `<helmet>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<script src="./image-slot.js"></script>
<style>
  body { margin: 0; background: #E2DCCD; }
  a { color: ${C.now}; text-decoration: none; }
  a:hover { color: ${C.past}; }
  html { scroll-behavior: smooth; }
</style>
</helmet>`;
const bodyParts = [cover(), sectionB(), sectionD(), sectionE(), divider('搭框架', '崛起、身份与科长宇宙 · 约 71 分钟'), sectionF(), sectionG(), sectionH(), sectionI(), divider('逐部讲作品', '从《小武》到短片 · 约 159 分钟'), sectionJ(), sectionK(), sectionO(), sectionL(), sectionP(), divider('结论与结局', '小结、分歧与结局'), sectionM(), sectionN(), sectionQ(), sectionR(), sectionS(), footer()];
const template = `${helmet}
<div style="width: 100%; max-width: {{ frameW }}; margin: 0 auto; background: ${C.paper}; color: ${C.ink}; font-family: ${F.sans}; font-variant-numeric: tabular-nums; overflow: hidden; box-shadow: 0 0 0 1px rgba(27,28,30,0.08);">
${bodyParts.join('\n')}
</div>`;
const JS = `
class Component extends DCLogic {
  mq = window.matchMedia('(max-width: 759px)');
  state = { mqNarrow: this.mq.matches, allSt: null };
  componentDidMount() {
    this.onMq = (e) => this.setState({ mqNarrow: e.matches });
    this.mq.addEventListener('change', this.onMq);
    const addFonts = () => {
      if (document.getElementById('jia04-fonts')) return;
      const l = document.createElement('link');
      l.id = 'jia04-fonts'; l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@600;700;900&family=Noto+Sans+SC:wght@400;500;700&family=IBM+Plex+Mono:wght@400;600&display=swap';
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
    return {
      frameW: mob ? '390px' : '1440px',
      wideDisp: narrow ? 'none' : 'block', narrowDisp: narrow ? 'block' : 'none', isWide: !narrow, isNarrow: narrow,
      stMinorGrid: allSt ? 'grid' : 'none',
      stBtn: allSt ? '收起次站，只看 ${N1} 个主站' : '展开全部 ${NST} 个站点',
      toggleSt: () => this.setState({ allSt: !allSt })
    };
  }
}`;
const props = { showAllStations: { editor: 'boolean', default: true, tsType: 'boolean', section: '展开' }, layout: { editor: 'enum', options: ['自动', '手机预览'], default: '自动', tsType: 'string', section: '版式' } };
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
if (template.includes('undefined')) log('WARN undefined at', template.indexOf('undefined'), template.slice(template.indexOf('undefined') - 200, template.indexOf('undefined') + 40));
if (/NaN/.test(template)) log('WARN NaN at', template.slice(template.indexOf('NaN') - 200, template.indexOf('NaN') + 40));
await saveFile(EPISODE.page, html);
log('saved', OUT, html.length, 'chars; stations', NST, 'L1', N1, 'works', WK.length, 'bins', BINS.length);

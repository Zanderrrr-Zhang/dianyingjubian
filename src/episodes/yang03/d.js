// ===== O independence
function sectionO() {
  const [roles, hh] = D[20];
  const tagC = r => `<div style="min-width: 0; border: 1px solid ${C.ink}; background: ${C.card};"><div style="padding: 5px 12px; background: ${C.o90}; color: ${C.card}; font-size: 11px; letter-spacing: 0.2em;">节目怎么描述</div><div style="padding: 10px 12px 12px;"><div style="font-family: ${F.serif}; font-size: 22px; font-weight: 700;">${esc(r.role)}</div><div style="margin-top: 4px; font-size: 13.5px; line-height: 1.7; color: ${C.ink2}; text-wrap: pretty;">${esc(r.program_view)}</div></div></div>`;
  const crit = `<div style="min-width: 0; border: 2px solid ${C.ink}; background: ${C.card};"><div style="padding: 12px 16px; border-bottom: 1px solid ${C.ink};"><div style="font-family: ${F.serif}; font-size: 20px; font-weight: 700;">鸿鸿的批评</div><div style="font-size: 12.5px; color: ${C.cap};">节目转述</div></div>${hh.map(r => `<div style="display: grid; grid-template-columns: 96px minmax(0, 1fr); gap: 12px; padding: 9px 16px; border-bottom: 1px solid ${C.rule}; font-size: 13.5px; line-height: 1.7;"><span style="color: ${C.cap};">${esc(r.topic)}</span><span>${esc(r.honghong_said)}</span></div>`).join('')}</div>`;
  return `${secOpen('indep', 'O', '十个人的真与假')}${head('O', '十个人的真与假', '《独立时代》')}
${withPoster('dl', '《独立时代》', `<p style="${S.intro} margin-top: 0;">节目说杨德昌从《独立时代》开始转向文化批判。片中十个人物，各有一副真假难辨的面孔。节目对这部片有批评：说教、不够卡通、现实基础薄。</p>`, 110)}
<div style="margin-top: 30px; display: flex; flex-wrap: wrap; gap: 28px 32px; align-items: flex-start;"><div style="flex: 2 1 560px; min-width: 0;"><div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr)); gap: 12px;">${roles.map(tagC).join('')}</div><p style="${S.cap}">节目只逐个讲了这八位，没有把片中的十个人列全。</p></div><div style="flex: 1 1 320px; min-width: 0;">${crit}</div></div>
<div style="margin-top: 36px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr)); gap: 24px 48px;">${quote('1994 年全场没有人笑；将近二十年后，满场都是笑声。', '据鸿鸿，节目转述', 24)}${quote('之所以会出现那么多假的东西，是因为被规定了，真理只有一个。', '节目转述《独立时代》结尾的总结', 22)}</div>
</section>`;
}

// ===== P yiyi
function sectionP() {
  const d = D[21][0], N = d.nodes.length, cx = 300, cy = 270, R = 200;
  const nodes = d.nodes.map((t, i) => { const a = (-90 + i * 60) * Math.PI / 180; return `<div style="position: absolute; left: ${f1(cx + R * Math.cos(a))}px; top: ${f1(cy + R * Math.sin(a))}px; transform: translate(-50%, -50%); width: 176px; padding: 9px 11px; background: ${C.card}; border: 1px solid ${C.ink}; font-size: 13px; line-height: 1.6;"><span style="font-family: ${F.mono}; font-size: 11px; color: ${C.o90}; margin-right: 4px;">${i + 1}</span>${esc(t)}</div>`; }).join('');
  let arcs = '';
  for (let i = 0; i < N; i++) { const a1 = (-90 + i * 60 + 22) * Math.PI / 180, a2 = (-90 + (i + 1) * 60 - 22) * Math.PI / 180; const x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1), x2 = cx + R * Math.cos(a2), y2 = cy + R * Math.sin(a2); arcs += `<path d="M ${f1(x1)} ${f1(y1)} A ${R} ${R} 0 0 1 ${f1(x2)} ${f1(y2)}" fill="none" stroke="${C.o90}" strokeWidth="2.5"></path>`; const ah = a2 + 0.001, tx = -Math.sin(a2), ty = Math.cos(a2); arcs += `<polygon points="${f1(x2 + tx * 8)},${f1(y2 + ty * 8)} ${f1(x2 - ty * 5)},${f1(y2 + tx * 5)} ${f1(x2 + ty * 5)},${f1(y2 - tx * 5)}" fill="${C.o90}"></polygon>`; }
  const glass = `background: linear-gradient(135deg, ${rgba(C.o90, 0.08)}, transparent 40%), linear-gradient(315deg, ${rgba(C.gl, 0.05)}, transparent 50%);`;
  const ring = `<div style="display: {{ wideDisp }}; flex: 0 0 600px;"><div style="position: relative; width: 600px; height: 540px;"><div aria-hidden="true" style="position: absolute; left: 60px; top: 40px; width: 300px; height: 380px; border: 1px solid ${rgba(C.o90, 0.25)}; ${glass}"></div><div aria-hidden="true" style="position: absolute; left: 230px; top: 110px; width: 310px; height: 380px; border: 1px solid ${rgba(C.ink, 0.12)}; background: ${rgba(C.card, 0.5)};"></div><svg viewBox="0 0 600 540" style="position: absolute; inset: 0; width: 600px; height: 540px; overflow: visible;">${arcs}</svg><div style="position: absolute; left: ${cx - 92}px; top: ${cy - 70}px; width: 184px; height: 140px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;"><div style="font-size: 12px; letter-spacing: 0.14em; color: ${C.cap};">节目的读法</div><div style="margin-top: 6px; font-family: ${F.serif}; font-size: 24px; font-weight: 900; line-height: 1.35;">重复、循环<br>与延续</div></div>${nodes}</div></div>`;
  const ringM = `<div style="display: {{ narrowDisp }}; flex: 1 1 100%;"><div style="padding: 14px; border: 2px solid ${C.o90}; text-align: center; font-family: ${F.serif}; font-size: 20px; font-weight: 900;">重复、循环与延续</div><ol style="margin: 10px 0 0; padding: 0 0 0 20px; font-size: 14px; line-height: 1.7;">${d.nodes.map(t => `<li style="padding: 4px 0;">${esc(t)}</li>`).join('')}</ol></div>`;
  const cards = `<div style="flex: 1 1 320px; min-width: 0; display: grid; gap: 12px;">${d.cards.map(c => `<div style="padding: 14px 16px; background: ${C.card}; border: 1px solid ${C.ink}; ${glass}"><div style="font-family: ${F.serif}; font-size: 17px; font-weight: 700;">${esc(c.title)}</div><div style="margin-top: 4px; font-size: 13.5px; line-height: 1.7; color: ${C.ink2}; text-wrap: pretty;">${esc(c.text)}</div></div>`).join('')}</div>`;
  const ver = `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 0; border: 1px solid ${C.ink};">${d.verdicts.map((v, i) => `<div style="padding: 16px 18px; ${i ? `border-left: 1px solid ${C.ink};` : ''} background: ${C.card};">${who(v.by + '认为')}<div style="margin-top: 8px; font-size: 15px; line-height: 1.7;">${esc(v.text)}</div></div>`).join('')}</div>`;
  return `${secOpen('yiyi', 'P', '一一')}${head('P', '一一', '最后一部讲什么')}
${withPoster('yy', '《一一》', `<p style="${S.intro} margin-top: 0;">节目说《一一》把他的主题汇总在一起，核心是生命的重复、循环与延续；成长是一辈子的事。它是佳作还是杰作，两位主持人看法不同。</p>`, 110)}
<div style="margin-top: 30px; display: flex; flex-wrap: wrap; gap: 32px 44px; align-items: center;">${ring}${ringM}${cards}</div>
<div style="margin-top: 26px; display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px;"><span style="font-size: 12.5px; color: ${C.cap};">节目谈到的城市空间</span>${d.spaces.map(t => `<span style="padding: 4px 10px; border: 1px solid ${C.rule2}; background: ${C.card}; font-size: 13.5px;">${esc(t)}</span>`).join('')}</div>
<div style="margin-top: 32px;">${sub('佳作还是杰作', '两种看法并列')}<div style="margin-top: 14px;">${ver}</div></div>
<div style="margin-top: 32px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr)); gap: 24px 48px;">${quote('并不存在某一个人，比另一个人知道更多关于生活的真相。', '一位主持人谈《一一》', 21)}${quote('我们没有办法拒绝自己不喜欢的人，反而只能拒绝最爱的人。', '一位主持人谈《一一》里的 NJ', 21)}</div>
</section>`;
}

// ===== Q beside
function sectionQ() {
  const [cmp, dirs] = D[22];
  const cols = ['杨德昌', '李安', '侯孝贤'];
  const cell = v => v === '—' ? `<span style="color: ${C.faint};">—</span>` : esc(v);
  const tbl = `<div style="overflow-x: auto;"><div style="min-width: 720px; border-top: 1.5px solid ${C.ink};"><div style="display: grid; grid-template-columns: 120px repeat(3, minmax(0, 1fr)); gap: 16px; padding: 10px 0; border-bottom: 1px solid ${C.ink};"><span></span>${cols.map((c, i) => `<span style="display: flex; align-items: flex-end; gap: 10px;">${photo(['yang', 'lee', 'hou'][i], c, 52, 64)}<span style="font-family: ${F.serif}; font-size: 19px; font-weight: 700; ${i === 0 ? `border-bottom: 3px solid ${C.ink};` : ''}">${c}</span></span>`).join('')}</div>${cmp.map(r => `<div style="display: grid; grid-template-columns: 120px repeat(3, minmax(0, 1fr)); gap: 16px; padding: 10px 0; border-bottom: 1px solid ${C.rule}; font-size: 14px; line-height: 1.7; color: ${C.ink2};"><span style="font-size: 12.5px; color: ${C.cap};">${esc(r.row)}</span>${cols.map(c => `<span>${cell(r[c])}</span>`).join('')}</div>`).join('')}</div></div><p style="${S.cap}">“—”表示节目没有谈到。表中是节目的说法。</p>`;
  const DPK = { 黄建新: 'huangjx', 张艺谋: 'zhangym', 陈凯歌: 'chenkg', 娄烨: 'louye', 王家卫: 'wkw', 贾樟柯: 'jiazk', 王兵: 'wangbing' };
  const dc = r => `<div style="min-width: 0; padding: 14px 16px; border: 1px solid ${C.ink}; background: ${C.card};"><div style="display: flex; gap: 12px; align-items: center;">${DPK[r.director] ? photo(DPK[r.director], r.director, 48, 48) : ''}<div style="font-family: ${F.serif}; font-size: 18px; font-weight: 700;">${esc(r.director)}</div></div><div style="margin-top: 8px;">${who(r.by + '认为')}</div><div style="margin-top: 6px; font-size: 13.5px; line-height: 1.7; color: ${C.ink2}; text-wrap: pretty;">${esc(r.program_view)}</div></div>`;
  return `${secOpen('beside', 'Q', '把他放在谁旁边')}${head('Q', '把他放在谁旁边', '和李安、侯孝贤、大陆导演比')}
<p style="${S.intro}">节目在结尾拿他和两位同代的台湾导演比，再拿大陆导演做对照，回答他独一无二的价值在哪里。这一部分评价比较尖锐，下面都是节目或一位主持人的看法。</p>
<div style="margin-top: 30px;">${tbl}</div>
<div style="margin-top: 40px;">${sub('大陆导演', '节目或一位主持人的短评')}<div style="margin-top: 16px; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr)); gap: 12px;">${dirs.map(dc).join('')}</div></div>
<div style="margin-top: 40px; padding: clamp(22px, 3vw, 36px); background: ${C.ink}; color: ${C.paper};"><div style="font-size: 12.5px; letter-spacing: 0.14em; color: rgba(245,241,232,0.74);">节目的回答</div><div style="margin-top: 8px; font-family: ${F.serif}; font-size: clamp(24px, 2.8vw, 34px); font-weight: 700; line-height: 1.55; text-wrap: pretty;">“他提供了华人社会现代化转型的影像经验。”</div><div style="margin-top: 14px; max-width: 900px; font-size: 15px; line-height: 1.85; color: rgba(245,241,232,0.86);">这场转型至今没有真正完成。节目归纳为两件事：威权社会是什么样子，它有没有转变的可能；转变之后，一个东方式的、全球化的资本主义社会是什么样子。</div></div>
</section>`;
}

// ===== R debate
function sectionR() {
  const rows = D[23][0];
  const RPK = { '《牯岭街》的表演': 'gl', '《恐怖分子》结尾的呕吐': 'kb', '《一一》是佳作还是杰作': 'yy', '《阳光灿烂的日子》': 'yg' };
  const card = r => `<div style="border: 1px solid ${C.ink}; background: ${C.card};"><div style="display: flex; align-items: center; justify-content: center; gap: 12px; padding: 10px 16px; border-bottom: 1px solid ${C.ink};">${RPK[r.topic] ? poster(RPK[r.topic], r.topic, '30px') : ''}<span style="font-family: ${F.serif}; font-size: 18px; font-weight: 700;">${esc(r.topic)}</span></div><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));">${[['一位主持人', r.one_host], ['另一位主持人', r.other_host]].map(([w, t], i) => `<div style="padding: 14px 16px 16px; ${i ? `border-left: 1px solid ${C.rule2};` : ''}"><div style="font-size: 12px; letter-spacing: 0.1em; color: ${C.cap};">${w}</div><div style="margin-top: 6px; font-size: 14.5px; line-height: 1.75; text-wrap: pretty;">${esc(r[i ? 'other_host' : 'one_host'])}</div></div>`).join('')}</div></div>`;
  return `${secOpen('debate', 'R', '他们在哪里吵')}${head('R', '他们在哪里吵', '两位主持人的分歧')}
<p style="${S.intro}">转写没有说话人标注，所以下面只写“一位主持人”和“另一位主持人”。左右两边分量相同，不分输赢。</p>
<div style="margin-top: 30px; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 540px), 1fr)); gap: 16px;">${rows.map(card).join('')}</div>
<p style="${S.cap}">另有几处较小的分歧：梁朝伟在《悲情城市》里有没有演错（杨德昌的看法对一位主持人的反驳）；《浮萍》是不是简陋版的《日出》；《后窗》和《恐怖分子》有没有关系。</p>
</section>`;
}

// ===== S mentions
function sectionS() {
  const [m, yrs] = D[24];
  const hl = r => r.name === '侯孝贤' ? C.life : r.name === '《牯岭街少年杀人事件》' ? C.gl : r.name === '成长' ? C.yel : C.neu;
  const panel = (g, title, note) => { const rs = m.filter(r => r.group === g), mx = Math.max(...rs.map(r => +r.mentions));
    return `<div style="min-width: 0;">${sub(title, note)}<div style="margin-top: 8px;">${rs.map(r => `<div style="display: grid; grid-template-columns: 150px minmax(0, 1fr) 34px; gap: 10px; align-items: center; padding: 3px 0;"><span style="font-size: 13.5px; ${/《/.test(r.name) ? `font-family: ${F.serif}; font-weight: 600;` : ''} white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${esc(r.name)}">${esc(r.name)}</span><span style="height: 12px;"><span style="display: block; height: 100%; width: ${pct(+r.mentions / mx)}; background: ${hl(r)}; ${hl(r) === C.yel ? `box-shadow: inset 0 0 0 1px ${C.ink};` : ''}"></span></span><span style="font-family: ${F.mono}; font-size: 12.5px; text-align: right;">${r.mentions}</span></div>`).join('')}</div></div>`; };
  const Y0 = 1947, Y1 = 2000, mx = 10;
  const ys = yrs.slice().sort((a, b) => a.year - b.year);
  const bars = ys.map(r => `<div title="${esc(r.year + ' · ' + r.mentions + ' 次 · ' + r.meaning)}" style="position: absolute; left: ${pct((r.year - Y0) / (Y1 - Y0))}; width: 16px; margin-left: -8px; bottom: 0; height: ${pct(r.mentions / mx)}; background: ${+r.year === 1987 || +r.year === 1949 ? C.ink : C.neu}; cursor: help;"><div style="position: absolute; left: -10px; right: -10px; top: -18px; text-align: center; font-family: ${F.mono}; font-size: 11.5px;">${r.mentions}</div></div>`).join('');
  let yax = ''; [1950, 1960, 1970, 1980, 1990, 2000].forEach(y => { yax += `<div style="position: absolute; left: ${pct((y - Y0) / (Y1 - Y0))}; transform: translateX(-50%); top: 6px; font-family: ${F.mono}; font-size: 11px; color: ${C.cap};">${y}</div>`; });
  const years = `<div style="min-width: 0;">${sub('年份', '提到 3 次以上的年份；悬停看原因')}<div style="margin-top: 30px; position: relative; height: 150px; border-bottom: 1px solid ${C.ink};">${bars}</div><div style="position: relative; height: 26px;">${yax}</div><div style="margin-top: 10px;">${ys.map(r => `<div style="display: grid; grid-template-columns: 44px 30px minmax(0, 1fr); gap: 8px; padding: 4px 0; border-bottom: 1px solid ${C.rule}; font-size: 13px; line-height: 1.6;"><span style="font-family: ${F.mono}; font-weight: 600;">${r.year}</span><span style="font-family: ${F.mono}; color: ${C.cap};">${r.mentions}</span><span>${esc(r.meaning)}</span></div>`).join('')}</div><p style="${S.cap}">年代词：“80 年代”约 50 次，“90 年代”约 44 次，“60 年代”约 25 次，“70 年代”约 9 次。节目在结尾指出，杨德昌没有拍过 70 年代的台湾。</p></div>`;
  return `${secOpen('mentions', 'S', '谁被提得最多')}${head('S', '谁被提得最多', '节目最在意谁、哪部片、哪一年')}
<div style="${S.lead}"><span style="color: ${C.life}; border-bottom: 4px solid ${C.life};">侯孝贤 192 次</span>，是第二名的三倍半；<span style="color: ${C.gl}; border-bottom: 4px solid ${C.gl};">《牯岭街》119 次</span>；<span style="background: ${C.yel}; padding: 0 4px;">“成长”101 次</span>，是所有主题词里最多的。</div>
<div style="margin-top: 32px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr)); gap: 36px 48px; align-items: start;">${panel('人物', '人物', '')}<div style="display: grid; gap: 36px;">${panel('影片', '影片', '')}${panel('角色', '角色', '')}${panel('地名', '地名', '')}</div>${panel('概念', '概念', '')}${years}</div>
<p style="${S.cap}">次数按转写稿统计，含转写变体，是约数。“杨德昌”本人出现约 950 次，不列入排名。</p>
</section>`;
}

// ===== T ledger
function sectionT() {
  const pick = ['1 米 85', '24 位', '2 小时 47 分', '800 万台币', '100 万美元', '近 20 年', '约 2 小时', '第 3 名'];
  const rows = pick.map(p => D25.find(r => r[0] === p)).filter(Boolean);
  const cards = rows.map(([n, d, s]) => `<div style="min-width: 0; padding: 18px 18px 16px; background: ${C.card}; border: 1px solid ${C.ink}; display: flex; flex-direction: column;"><div style="font-family: ${F.serif}; font-size: ${n.length > 6 ? 30 : 40}px; font-weight: 900; line-height: 1.15;">${esc(n)}</div><div style="margin-top: 10px; flex: 1; font-size: 14px; line-height: 1.7; color: ${C.ink2}; text-wrap: pretty;">${esc(d)}</div><div style="margin-top: 12px; padding-top: 8px; border-top: 1px dashed ${C.rule2}; font-size: 11.5px; color: ${C.cap};">${esc(s)}</div></div>`).join('');
  return `${secOpen('ledger', 'T', '账本')}${head('T', '账本', '几个数字')}
<div style="margin-top: 30px; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr)); gap: 14px;">${cards}</div>
</section>`;
}

function footer() {
  const notes = ['转写没有说话人标注，页面上的观点一律写作“节目认为”或“一位主持人认为”；两位主持人有分歧的地方并排列出。', '板块时长按节目里的过渡句切分，误差约一分钟；提及次数含转写变体，是约数。', '整理者所加：D 每部片放在哪一级、F 里标“整理”的年份位置、E2 里小四和滑头的归属、E3 的分类与箭头、F 和 G 的示意位置。', '海报与人物照片来自维基百科，仅作识别用途；空白的图位可以直接拖入图片替换。'];
  return `<div style="margin-top: clamp(72px, 9vw, 112px);">${STRIPE}</div><footer data-screen-label="页脚" style="padding: 36px ${PAD} 48px; border-top: 3px double ${C.ink}; background: ${C.deep};">
<div style="font-family: ${F.serif}; font-size: 20px; font-weight: 700;">年份与数字均据节目口述整理。</div>
<ul style="margin: 14px 0 0; padding: 0; list-style: none; max-width: 980px;">${notes.map(t => `<li style="padding: 6px 0; font-size: 13px; line-height: 1.75; color: ${C.cap};">${t}</li>`).join('')}</ul>
<div style="margin-top:22px;font-size:13px;color:${C.cap}">电影巨辩 · 付费专辑《为了华语电影》第 3 集《杨德昌，爱与希望之梦》</div>
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
  a { color: ${C.t80}; text-decoration: none; }
  a:hover { color: ${C.o90}; }
  html { scroll-behavior: smooth; }
</style>
</helmet>`;
const bodyParts = [cover(), sectionB(), sectionD(), tunnel('其人、背景与母题', '节目的前两个小时'), sectionG(), sectionF(), sectionH(), sectionI(), sectionJ(), sectionK(), sectionL(), tunnel('逐部讲作品', '约 318 分钟，占 65%'), sectionM(), sectionN(), sectionE(), sectionO(), sectionP(), tunnel('身后事与总结', '最后约 42 分钟'), sectionQ(), sectionR(), sectionS(), sectionT(), footer()];
const template = `${helmet}
<div style="width: 100%; max-width: {{ frameW }}; margin: 0 auto; background: ${C.paper}; color: ${C.ink}; font-family: ${F.sans}; font-variant-numeric: tabular-nums; overflow: hidden; box-shadow: 0 0 0 1px rgba(26,28,30,0.08);">
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
      if (document.getElementById('yang03-fonts')) return;
      const l = document.createElement('link');
      l.id = 'yang03-fonts'; l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@600;700;900&family=Noto+Sans+SC:wght@400;500;700&family=IBM+Plex+Mono:wght@400;600&family=Ma+Shan+Zheng&display=swap';
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
      wideDisp: narrow ? 'none' : 'block', narrowDisp: narrow ? 'block' : 'none',
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
await saveFile(EPISODE.page, html);
log('saved', OUT, html.length, 'chars; stations', NST, 'L1', N1, 'works', D[5][0].length, 'bins', BINS.length);

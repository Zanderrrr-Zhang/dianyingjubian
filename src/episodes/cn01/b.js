// ===== E
function sectionE() {
  const ROWS = ['制片厂', '中影', '省电影公司', '地市、县电影公司', '院线', '电影院'];
  const RH = 56, NH = 40, money = ['一口价 70 万', '和各省分别结算', '按票房分账约四成'];
  const sub = [{}, { '中影': '仍独家发行进口片' }, { '省电影公司': '多数转制成了院线' }];
  const byLabel = ['', '跳过中影', '砍掉中间三级'];
  const notes = ['“看不看 70 万。”80 年代制片厂的顺口溜，节目转述', '进口片仍由中影独家发行', '省公司多数转制成了院线'];
  const panels = D6.panels.map((p, pi) => {
    const act = new Set(p.active), byp = new Set(p.bypassed);
    let d = '';
    ROWS.forEach((r, i) => {
      if (!act.has(r) && !byp.has(r)) return;
      const on = act.has(r), y = i * RH + (RH - NH) / 2, s = sub[pi][r];
      d += `<div style="position: absolute; left: 0; width: 62%; top: ${y}px; height: ${NH}px; box-sizing: border-box; border: 1.5px ${on ? 'solid' : 'dashed'} ${on ? C.ink : C.faint}; background: ${on ? C.card : 'transparent'}; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; line-height: 1.25;"><span style="font-size: 14.5px; ${on ? `color: ${C.ink}; font-weight: 500;` : `color: ${C.cap};`}">${r}</span>${s ? `<span style="font-size: 11px; color: ${C.cap};">${s}</span>` : ''}</div>`;
    });
    const order = ROWS.map((r, i) => [r, i]).filter(([r]) => act.has(r));
    for (let k = 0; k < order.length - 1; k++) {
      const ia = order[k][1], ib = order[k + 1][1];
      const skipped = ROWS.slice(ia + 1, ib).filter(r => byp.has(r));
      if (!skipped.length) {
        const y0 = ia * RH + (RH + NH) / 2, y1 = ib * RH + (RH - NH) / 2;
        d += `<div style="position: absolute; left: calc(31% - 1px); width: 2px; top: ${y0}px; height: ${y1 - y0 - 7}px; background: ${C.ref};"></div><div style="position: absolute; left: calc(31% - 5px); top: ${y1 - 8}px; width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 8px solid ${C.ref};"></div>`;
      } else {
        const ya = ia * RH + RH / 2, yb = ib * RH + RH / 2;
        d += `<div style="position: absolute; left: 62%; width: 14%; top: ${ya}px; height: ${yb - ya}px; box-sizing: border-box; border: 2px solid ${C.ref}; border-left: none;"></div><div style="position: absolute; left: 62%; top: ${yb - 5}px; width: 0; height: 0; border-top: 5px solid transparent; border-bottom: 5px solid transparent; border-right: 8px solid ${C.ref};"></div><div style="position: absolute; left: 79%; right: 0; top: ${(ya + yb) / 2 - 18}px; font-size: 12.5px; line-height: 1.45; color: ${C.ref}; font-weight: 500;">${byLabel[pi]}</div>`;
      }
    }
    const m = p.title.match(/^(.*?)（(.*)）$/);
    const name = m ? m[1] : p.title, paren = m ? m[2] : '';
    const title = pi === 1 ? `<span style="background: ${C.yel}; padding: 0 6px; font-family: ${F.mono};">1993</span> 年改革` : esc(name);
    const lab = t => `<div style="font-size: 12px; letter-spacing: 0.12em; color: ${C.cap};">${t}</div>`;
    return `<div style="display: flex; flex-direction: column; border-top: 2px solid ${C.ink}; padding-top: 14px;">
<div style="display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap;"><span style="font-family: ${F.mono}; font-size: 13px; color: ${C.cap};">0${pi + 1}</span><span style="font-family: ${F.serif}; font-size: 22px; font-weight: 700;">${title}</span>${paren ? `<span style="font-size: 14px; color: ${C.muted};">${paren}</span>` : ''}</div>
<div style="position: relative; height: ${ROWS.length * RH}px; margin-top: 18px;">${d}</div>
<div style="margin-top: 18px; padding-top: 12px; border-top: 1px solid ${C.rule};">${lab('拷贝怎么走')}<p style="margin: 6px 0 0; font-size: 14.5px; line-height: 1.8; color: ${C.ink2}; text-wrap: pretty;">${esc(p.film_flow)}</p></div>
<div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid ${C.rule};">${lab('制片厂怎么拿钱')}<div style="margin-top: 6px; font-family: ${F.serif}; font-size: 22px; font-weight: 700; color: ${C.ref};">${money[pi]}</div><p style="margin: 6px 0 0; font-size: 14px; line-height: 1.8; color: ${C.muted}; text-wrap: pretty;">${esc(p.money_to_studio)}</p></div>
<div style="margin-top: 14px; padding-top: 12px; border-top: 3px double ${C.ink}; font-size: 13.5px; line-height: 1.7; color: ${C.ink2};">${esc(notes[pi])}</div>
</div>`;
  }).join('');
  return `${secOpen('flow', 'E', '钱和拷贝怎么流')}${head('E', '钱和拷贝怎么流', '发行体制改了什么')}
<p style="${S.intro}">统购统销：中影用固定价格买下每一部国产片，再统一发给各省，制片厂的收入和票房无关。三联图画的是同一批角色，被绕开或取消的画成虚线。1993 年只跳过了中影；到院线制，中间环节才被砍掉。</p>
<div style="margin-top: 40px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr)); gap: 40px 36px;">${panels}</div>
<div style="margin-top: 48px; max-width: 760px;">${quote('以前只有中影一个婆婆，现在每个省一个婆婆。', '节目转述当时的说法', 24)}</div>
<p style="${S.cap}">分账：票房按比例在片方、发行方、影院之间分；和它相对的是“买断”，一口价。数字均据节目口述。</p>
</section>`;
}

// ===== F
function stat(s) {
  const c = C.ref, b = 'display: inline-block; width: 14px; height: 14px; border-radius: 50%; box-sizing: border-box;';
  const dot = s === '已放开' ? `<span style="${b} background: ${c};"></span>` : s === '部分放开' ? `<span style="${b} border: 1.5px solid ${c}; background: linear-gradient(90deg, ${c} 50%, transparent 50%);"></span>` : s === '未放开' ? `<span style="${b} border: 1.5px solid ${c};"></span>` : `<span style="${b} border: 1.5px dashed ${c};"></span>`;
  return `<span style="display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 500; color: ${c};">${dot}${s}</span>`;
}
function sectionF() {
  const cn = ['一', '二', '三', '四'];
  const cards = D7.map((r, i) => `<div style="background: ${C.card}; border: 1px solid ${C.rule2}; display: flex; flex-direction: column;"><div style="display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 12px 18px; border-bottom: 1px dashed ${C.rule2};"><span style="font-family: ${F.serif}; font-size: 14px; color: ${C.cap};">第${cn[i]}权</span>${stat(r.status_now)}</div><div style="padding: 16px 18px 20px;"><div style="font-family: ${F.serif}; font-size: 21px; font-weight: 700; line-height: 1.4;">${esc(r.right)}</div><div style="margin-top: 14px; display: grid; grid-template-columns: 44px minmax(0, 1fr); gap: 10px 12px; font-size: 14.5px; line-height: 1.75;"><span style="font-family: ${F.mono}; font-size: 13px; color: ${C.cap}; padding-top: 2px;">1993</span><span>${esc(r.status_1993)}</span><span style="font-size: 13px; color: ${C.cap}; padding-top: 2px;">后来</span><span style="color: ${C.ink2};">${esc(r.later)}</span></div></div></div>`).join('');
  return `${secOpen('rights', 'F', '四权不放')}${head('F', '四权不放', '1993 年留了哪些尾巴')}
<p style="${S.intro}">1993 年的改革松了两处：中影不再发行国产片，票价放开。另有四项权力没有放。指标指拍故事片的资格，原来只有国家级制片厂才有。</p>
<div style="margin-top: 22px; display: flex; flex-wrap: wrap; gap: 10px 24px;">${['已放开', '部分放开', '名存实亡', '未放开'].map(stat).join('')}</div>
<div style="margin-top: 22px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 270px), 1fr)); gap: 20px;">${cards}</div>
<p style="${S.cap}">状态按节目的说法归类；“比例”一项节目只说它在单厅时代名存实亡。</p>
</section>`;
}

// ===== G
function sectionG() {
  const gens = ['第三代', '第四代', '第五代', '第六代'];
  const evBg = 'background: repeating-linear-gradient(135deg, rgba(168,67,47,0.07) 0 1px, transparent 1px 8px);';
  let m = `<div style="margin-top: 36px; display: grid; grid-template-columns: 132px repeat(4, minmax(0, 1fr)); border-top: 2px solid ${C.ink};"><div></div>${gens.map(g => `<div style="padding: 16px 16px 14px; border-left: 1px solid ${C.rule};"><div style="width: 30px; height: 4px; background: ${C.cre};"></div><div style="margin-top: 10px; font-family: ${F.serif}; font-size: 24px; font-weight: 700;">${g}</div></div>`).join('')}`;
  const GF = { 第三代: [['xiejin', '谢晋']], 第四代: [['zhangnuanxin', '张暖忻']], 第五代: [['chenkaige', '陈凯歌'], ['zhangyimou', '张艺谋'], ['tianzhuangzhuang', '田壮壮'], ['huangjianxin', '黄建新']], 第六代: [['wangxiaoshuai', '王小帅'], ['louye', '娄烨'], ['jiazhangke', '贾樟柯']] };
  const GP = { 第三代: [['furongzhen', '《芙蓉镇》'], ['mumaren', '《牧马人》']], 第四代: [['chengnan', '《城南旧事》']], 第五代: [['huangtudi', '《黄土地》'], ['honggaoliang', '《红高粱》']], 第六代: [['xiaowu', '《小武》']] };
  const faces = g => GF[g].map(([k, n]) => face(k, n)).join('');
  const posters = g => GP[g].map(([k, t]) => poster(k, t)).join('');
  const lab = t => `<div style="padding: 14px 12px 14px 0; border-top: 1px solid ${C.rule};"><div style="font-size: 13.5px; font-weight: 500; color: ${C.ink2};">${t}</div></div>`;
  m += lab('人物') + gens.map(g => `<div style="padding: 16px; border-top: 1px solid ${C.rule}; border-left: 1px solid ${C.rule}; display: flex; flex-wrap: wrap; gap: 12px 8px;">${faces(g)}</div>`).join('');
  D8.forEach(r => {
    const ev = r.row === '节目的评价', ppl = r.row === '节目提到的人', bg = ev ? evBg : '';
    m += `<div style="padding: 14px 12px 14px 0; border-top: 1px solid ${C.rule}; ${bg}"><div style="font-size: 13.5px; font-weight: 500; color: ${C.ink2};">${r.row}</div>${ev ? `<div style="margin-top: 4px; font-size: 12px; line-height: 1.5; color: ${C.cap};">主持人的个人看法</div>` : ''}</div>`;
    gens.forEach(g => { m += `<div style="padding: 14px 16px; border-top: 1px solid ${C.rule}; border-left: 1px solid ${C.rule}; font-size: ${ppl ? 15.5 : 15}px; line-height: 1.75; ${ppl ? `font-family: ${F.serif};` : ''} ${bg} text-wrap: pretty;">${esc(r[g])}</div>`; });
  });
  m += lab('片子') + gens.map(g => `<div style="padding: 16px; border-top: 1px solid ${C.rule}; border-left: 1px solid ${C.rule}; display: flex; flex-wrap: wrap; align-items: flex-end; gap: 16px;">${posters(g)}</div>`).join('');
  m += '</div>';
  const cards = gens.map(g => `<div style="border-top: 2px solid ${C.ink}; padding-top: 12px;"><div style="display: flex; align-items: center; gap: 10px;"><span style="width: 24px; height: 4px; background: ${C.cre};"></span><span style="font-family: ${F.serif}; font-size: 22px; font-weight: 700;">${g}</span></div><div style="margin-top: 14px; display: flex; flex-wrap: wrap; gap: 12px 8px;">${faces(g)}</div>${D8.map(r => { const ev = r.row === '节目的评价'; return `<div style="margin-top: 10px; padding: ${ev ? '8px 10px' : '0'}; ${ev ? evBg : ''}"><div style="font-size: 12px; color: ${C.cap};">${r.row}${ev ? '（主持人的个人看法）' : ''}</div><div style="margin-top: 2px; font-size: 15px; line-height: 1.7;">${esc(r[g])}</div></div>`; }).join('')}<div style="margin-top: 16px; display: flex; flex-wrap: wrap; align-items: flex-end; gap: 16px;">${posters(g)}</div></div>`).join('');
  return `${secOpen('gens', 'G', '四代人')}${head('G', '四代人', '代际之间差在哪')}
<p style="${S.intro}">节目解释了为什么中国导演习惯按“代”来分：同一代人受教育的时间、背后的思潮和与体制的关系相近。</p>
<div style="display: {{ wideDisp }};">${m}</div>
<div style="display: {{ narrowDisp }};"><div style="margin-top: 28px; display: grid; gap: 28px;">${cards}</div></div>
<div style="margin-top: 32px; display: flex; flex-wrap: wrap; align-items: center; gap: 10px 16px;"><span style="font-family: ${F.mono}; font-size: 22px; font-weight: 600; color: ${C.cre};">2003</span><span style="flex: 1 1 60px; min-width: 40px; max-width: 220px; height: 2px; background: ${C.cre};"></span><span style="font-family: ${F.serif}; font-size: 20px; font-weight: 700;">代际划分结束。</span><span style="font-size: 15px; color: ${C.muted};">节目的解释：电影资源不再被垄断。</span></div>
<div style="margin-top: 40px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr)); gap: 24px 40px;">${quoteFace('得奖不赔钱，赚钱不挨骂。', '吴天明的办厂方针，节目转述', 'wutianming', '吴天明')}${quoteFace('我拍电影就是为了满足观众的低级趣味。', '冯小刚，节目转述', 'fengxiaogang', '冯小刚')}</div>
</section>`;
}

// ===== H
const H_SER = [
  { key: '分账片配额', short: '分账片配额', unit: ' 部', max: 40, H: 160 },
  { key: '外方分账比例', short: '外方分账比例', unit: '%', max: 30, H: 140 },
  { key: '外资影院持股上限', short: '外资在影院的持股上限', unit: '%', max: 100, H: 230 }
];
function hPts(key) { return D9.filter(r => r.series === key).map(r => ({ y: +r.year, v: +r.value, note: r.note })); }
function hDesktop() {
  const X0 = 1993, X1 = 2025, xf = y => (y - X0) / (X1 - X0);
  const G = 'display: grid; grid-template-columns: 150px minmax(0, 1fr); column-gap: 16px;';
  let out = '';
  H_SER.forEach((sr, si) => {
    const pts = hPts(sr.key), Hc = sr.H, yv = v => Hc - 16 - v / sr.max * (Hc - 66);
    const foreign = sr.key === '外资影院持股上限';
    let seg = '', dots = '', labs = '';
    pts.forEach((p, i) => {
      const nx = i + 1 < pts.length ? pts[i + 1].y : 2024.9, dashed = foreign && p.y === 2004;
      seg += `<line x1="${f2(xf(p.y) * 1000)}" y1="${f1(yv(p.v))}" x2="${f2(xf(nx) * 1000)}" y2="${f1(yv(p.v))}" stroke="${C.opn}" strokeWidth="2.5" ${dashed ? 'strokeDasharray="5 4"' : ''} vectorEffect="non-scaling-stroke"></line>`;
      if (i + 1 < pts.length) { const q = pts[i + 1], drop = q.v < p.v; seg += `<line x1="${f2(xf(q.y) * 1000)}" y1="${f1(yv(p.v))}" x2="${f2(xf(q.y) * 1000)}" y2="${f1(yv(q.v))}" stroke="${drop ? C.yel : C.opn}" strokeWidth="${drop ? 5 : 2.5}" vectorEffect="non-scaling-stroke"></line>`; }
      const hollow = sr.key === '分账片配额' && p.y === 2017;
      dots += `<span style="position: absolute; left: ${pct(xf(p.y))}; top: ${f1(yv(p.v))}px; width: 10px; height: 10px; margin: -5px 0 0 -5px; box-sizing: border-box; border-radius: 50%; ${hollow ? `background: ${C.paper}; border: 2px solid ${C.opn};` : `background: ${C.opn};`}"></span>`;
      const key = sr.key + '|' + p.y;
      const val = hollow ? '' : `<span style="font-family: ${F.mono}; font-size: 16px; font-weight: 600; color: ${C.opn};">${p.v}${sr.unit}</span>`;
      let note = esc(p.note), extra = '';
      if (key === '外资影院持股上限|2004') note = '试点：七个试点城市；年份为约数';
      if (key === '外资影院持股上限|2005') extra = `<div style="margin-top: 4px; font-family: ${F.serif}; font-size: 15px; font-weight: 600; color: ${C.ink};">“朝令夕改真的很要命。”</div><div style="font-size: 11.5px; color: ${C.cap};">全图唯一向下的台阶</div>`;
      if (key === '外资影院持股上限|2019') { note = '原则上可以独资'; extra = `<div style="margin-top: 4px; font-family: ${F.serif}; font-size: 15px; font-weight: 600; color: ${C.ink};">“但已经没有外资想来。”</div>`; }
      const body = `${val}<div style="font-size: 12px; line-height: 1.5; color: ${C.muted};">${note}</div>${extra}`;
      let pos;
      if (key === '外资影院持股上限|1999') pos = `bottom: ${f1(Hc - yv(p.v) + 6)}px; transform: translateX(-100%); margin-left: -8px; text-align: right;`;
      else if (key === '外资影院持股上限|2005' || key === '外资影院持股上限|2019') pos = `top: ${f1(yv(p.v) + 8)}px; margin-left: 8px;`;
      else pos = `bottom: ${f1(Hc - yv(p.v) + 6)}px; margin-left: 8px;`;
      if (key === '外资影院持股上限|2019') { labs += `<div style="position: absolute; left: ${pct(xf(p.y))}; bottom: ${f1(Hc - yv(p.v) + 6)}px; margin-left: 8px;">${val}</div>`; labs += `<div style="position: absolute; left: ${pct(xf(p.y))}; ${pos} max-width: 210px;"><div style="font-size: 12px; line-height: 1.5; color: ${C.muted};">${note}</div>${extra}</div>`; }
      else labs += `<div style="position: absolute; left: ${pct(xf(p.y))}; ${pos} max-width: ${hollow ? 230 : 200}px; width: max-content;">${body}</div>`;
    });
    out += `<div style="${G} ${si ? 'margin-top: 8px;' : ''}"><div style="padding-top: 18px;"><div style="font-family: ${F.serif}; font-size: 16px; font-weight: 700; line-height: 1.4;">${sr.short}</div><div style="margin-top: 4px; font-size: 12px; color: ${C.cap};">${sr.unit.trim() === '部' ? '每年部数' : '百分比'}</div></div><div style="position: relative; height: ${Hc}px; border-bottom: 1px solid ${C.rule};"><svg viewBox="0 0 1000 ${Hc}" preserveAspectRatio="none" style="position: absolute; left: 0; top: 0; width: 100%; height: ${Hc}px; overflow: visible;">${seg}</svg>${dots}${labs}</div></div>`;
  });
  let ax = '';
  for (let y = 1994; y <= 2024; y++) { const big = (y % 5 === 0 && y !== 1995) || y === 1994 || y === 2024; ax += `<div style="position: absolute; left: ${pct(xf(y))}; top: 0; width: 1px; height: ${big ? 7 : 4}px; background: ${C.rule2};"></div>${big ? `<div style="position: absolute; left: ${pct(xf(y))}; top: 10px; transform: translateX(-50%); font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${y}</div>` : ''}`; }
  out += `<div style="${G}"><div></div><div style="position: relative; height: 30px; border-top: 1px solid ${C.rule2};">${ax}</div></div>`;
  return `<div style="margin-top: 36px; overflow-x: auto; padding-bottom: 8px;"><div style="min-width: 900px;">${out}</div></div>`;
}
function hMobile() {
  return H_SER.map(sr => {
    const pts = hPts(sr.key);
    const rows = pts.map((p, i) => {
      const drop = i > 0 && p.v < pts[i - 1].v, hollow = sr.key === '分账片配额' && p.y === 2017;
      let note = esc(p.note);
      if (sr.key === '外资影院持股上限' && p.y === 2005) note += '。“朝令夕改真的很要命。”';
      if (sr.key === '外资影院持股上限' && p.y === 2004) note = '试点：七个试点城市；年份为约数';
      return `<div style="display: grid; grid-template-columns: 46px minmax(0, 1fr); gap: 10px; padding: 9px 0; border-top: 1px solid ${C.rule};"><span style="font-family: ${F.mono}; font-size: 14px; font-weight: 600;">${p.y}</span><div><div style="display: flex; align-items: center; gap: 10px;"><span style="height: 10px; width: ${Math.max(1, p.v / sr.max * 70).toFixed(1)}%; box-sizing: border-box; ${hollow ? `border: 1.5px solid ${C.opn};` : `background: ${drop ? C.yel : C.opn};`}"></span><span style="font-family: ${F.mono}; font-size: 14px; font-weight: 600; color: ${C.opn};">${p.v}${sr.unit}</span>${drop ? `<span style="font-size: 12px; color: ${C.ink};">↓ 回落</span>` : ''}</div><div style="margin-top: 3px; font-size: 13px; line-height: 1.6; color: ${C.muted};">${note}</div></div></div>`;
    }).join('');
    return `<div style="margin-top: 26px;"><div style="font-family: ${F.serif}; font-size: 17px; font-weight: 700; padding-bottom: 6px;">${sr.short}</div>${rows}</div>`;
  }).join('');
}
function sectionH() {
  return `${secOpen('steps', 'H', '开放的台阶')}${head('H', '开放的台阶', '开放是怎么一级一级来的')}
<div style="display: flex; flex-wrap: wrap; align-items: flex-end; gap: 24px 56px;"><p style="${S.intro} flex: 1 1 480px;">1994 年起每年引进十部分账大片，第一部是《亡命天涯》。之后配额、外方分账比例和外资在影院的持股上限，“一个台阶一个台阶升上来”。只有一级台阶是往下走的。</p>${poster('fugitive', '《亡命天涯》', '1994 年第一部分账大片', '132px')}</div>
<div style="display: {{ wideDisp }};">${hDesktop()}</div>
<div style="display: {{ narrowDisp }};">${hMobile()}</div>
<p style="${S.cap}">空心点：2017 年中美电影备忘录到期，美方想提到 50 部，重谈搁置。虚线段为试点，放宽到 75% 的年份为约数。数字均据节目口述。</p>
<div style="margin-top: 36px; max-width: 760px;">${quote('可以有经济特区，不能有文化特区。', '取缔南方四省“特供片”的理由，节目转述')}</div>
</section>`;
}

// ===== I
function sectionI() {
  const route = `<svg viewBox="0 0 320 92" style="display: block; width: 100%; height: auto; background: ${C.ink};"><path d="M 30 66 C 62 18, 94 84, 130 48 S 196 14, 226 46 S 256 74, 276 54" fill="none" stroke="${C.paper}" strokeOpacity="0.75" strokeWidth="1.5" strokeDasharray="4 5"></path>${[0, 1, 2, 3].map(i => `<rect x="${10 + i * 6}" y="68" width="4.5" height="7" fill="${C.paper}"></rect><rect x="${10 + i * 6}" y="78" width="4.5" height="7" fill="${C.paper}"></rect>`).join('')}<path d="M 262 60 Q 286 34 310 60" fill="none" stroke="${C.paper}" strokeWidth="2"></path><line x1="256" y1="60" x2="316" y2="60" stroke="${C.paper}" strokeWidth="2"></line><text x="10" y="20" fill="#D6CEBE" fontSize="11">首映前夜 · 8 个拷贝</text><text x="312" y="82" fill="#D6CEBE" fontSize="11" textAnchor="end">次日 · 桥下交接</text></svg>`;
  const L = { who_bypassed_whom: '谁绕开谁', how: '怎么做的', result: '结果', detail: '一个细节' };
  const cards = D10.map(r => `<div style="background: ${C.card}; border: 1px solid ${C.rule2}; display: flex; flex-direction: column;"><div style="padding: 16px 20px 14px; border-bottom: 1px dashed ${C.rule2}; display: flex; align-items: baseline; justify-content: space-between; gap: 12px;"><span style="font-family: ${F.serif}; font-size: 24px; font-weight: 700;">${esc(r.name)}</span><span style="font-size: 13px; color: ${C.cap};">${esc(r.when)}</span></div>${r.name === '北京突破' ? route : ''}<div style="padding: 6px 20px 20px;">${Object.keys(L).map(k => `<div style="padding: 10px 0; ${k !== 'who_bypassed_whom' ? `border-top: 1px solid ${C.rule};` : ''}"><div style="font-size: 12px; letter-spacing: 0.1em; color: ${C.cap};">${L[k]}</div><div style="margin-top: 4px; font-size: ${k === 'who_bypassed_whom' ? '16px; font-family: ' + F.serif + '; font-weight: 600' : '14.5px'}; line-height: 1.75; color: ${C.ink2};">${esc(r[k])}</div></div>`).join('')}</div></div>`).join('');
  return `${secOpen('breaks', 'I', '三次突破')}${head('I', '三次突破', '改革是怎么硬闯出来的')}
<p style="${S.intro}">1993 年后，发行的层级还在，有人试着绕过去。节目讲了三次，前两次在 1993 和 1994 年，第三次是北京首映《亡命天涯》。</p>
<div style="margin-top: 32px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr)); gap: 22px;">${cards}</div>
<p style="${S.cap}">据节目口述整理。北京那张的路线图是示意，不对应真实街道。</p>
</section>`;
}

// ===== J
function sectionJ() {
  const F_ = [['post', '职务'], ['background', '出身'], ['stance', '主张'], ['program_view', '节目的评价']];
  const cards = D11.map((r, i) => `<div style="position: relative; background: ${C.card}; border: 1px solid ${C.rule2}; padding: 26px 20px 18px;"><span style="position: absolute; left: 50%; top: 9px; width: 9px; height: 9px; margin-left: -4.5px; border-radius: 50%; background: ${C.paper}; box-shadow: inset 0 0 0 1px ${C.rule2};"></span><div style="display: flex; align-items: baseline; justify-content: space-between; gap: 10px; padding-bottom: 10px; border-bottom: 2px solid ${C.off};"><span style="font-family: ${F.serif}; font-size: 25px; font-weight: 700; letter-spacing: 0.06em;">${esc(r.name)}</span><span style="font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">0${i + 1}</span></div>${F_.filter(([k]) => r[k] && r[k] !== '—').map(([k, l]) => `<div style="display: grid; grid-template-columns: 64px minmax(0, 1fr); gap: 10px; padding: 8px 0; border-bottom: 1px solid ${C.rule};"><span style="white-space: nowrap; font-size: 12px; color: ${k === 'program_view' ? C.off : C.cap}; padding-top: 3px; ${k === 'program_view' ? 'font-weight: 600;' : ''}">${l}</span><span style="font-size: 14px; line-height: 1.7; ${k === 'program_view' ? `font-family: ${F.serif}; font-weight: 600; color: ${C.ink};` : `color: ${C.ink2};`}">${esc(r[k])}</span></div>`).join('')}</div>`).join('');
  const tl = [['1989', '“少儿不宜”实行，不满一年即停'], ['2003', '独立导演在座谈会上要求以分级取代审查'], ['2004', '电影促进法初稿含分级，随即取消'], ['2012', '谢飞发公开信，呼吁以分级代替审查'], ['2017', '《电影产业促进法》出台；节目认为创作政策没有改善']];
  const tlh = tl.map(([y, t]) => `<div><div style="display: flex; align-items: center; gap: 10px;"><span style="font-family: ${F.mono}; font-size: 20px; font-weight: 600; color: ${C.off};">${y}</span><span style="width: 9px; height: 9px; transform: rotate(45deg); background: ${C.off}; flex: none;"></span><span style="flex: 1; height: 1px; background: ${C.off};"></span></div><div style="margin-top: 10px; font-size: 14.5px; line-height: 1.7; color: ${C.ink2}; padding-right: 12px;">${t}</div></div>`).join('');
  return `${secOpen('officials', 'J', '管电影的人')}${head('J', '管电影的人', '谁在执行，谁想改')}
<p style="${S.intro}">按任职先后排。职务、出身、主张据节目口述；“节目的评价”是主持人的看法。</p>
<div style="margin-top: 32px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 270px), 1fr)); gap: 18px;">${cards}</div>
<div style="margin-top: 48px; display: grid; grid-template-columns: minmax(0, 1fr); gap: 10px;"><h3 style="margin: 0; font-family: ${F.serif}; font-size: 22px; font-weight: 700;">分级制的五个节点</h3></div>
<div style="margin-top: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr)); gap: 22px 0;">${tlh}</div>
<div style="margin-top: 40px; max-width: 760px;">${quote('电影不应该是政策的附属品。', '陈昊苏，节目转述')}</div>
</section>`;
}

// ===== N
function sectionN() {
  const d = D17;
  const block = (n, t, body, extra = '') => `<div style="padding: 20px 22px 24px; border-top: 2px solid ${C.ink}; ${extra}"><div style="display: flex; align-items: baseline; gap: 10px;"><span style="font-family: ${F.mono}; font-size: 12px; color: ${C.cap};">${n}</span><span style="font-size: 13px; letter-spacing: 0.12em; color: ${C.ink2}; font-weight: 500;">${t}</span></div>${body}</div>`;
  const conds = d.conditions.map(c => `<div style="display: grid; grid-template-columns: 54px minmax(0, 1fr); gap: 10px; padding: 8px 0; border-top: 1px solid ${C.rule};"><span style="font-family: ${F.serif}; font-size: 16px; font-weight: 700;">${esc(c.k)}</span><span style="font-size: 14px; line-height: 1.7; color: ${C.ink2};">${esc(c.v)}</span></div>`).join('');
  const stall = d.stall.map((s, i) => `<div style="display: grid; grid-template-columns: 22px minmax(0, 1fr); gap: 8px; padding: 8px 0; border-top: 1px solid ${C.rule};"><span style="font-family: ${F.mono}; font-size: 13px; color: ${C.cap};">${i + 1}</span><span style="font-size: 14.5px; line-height: 1.7;">${esc(s)}</span></div>`).join('');
  return `${secOpen('why2010', 'N', '2010 年代为什么爆发')}${head('N', '2010 年代为什么爆发', '开场提出的问题')}
<p style="${S.intro}">节目一开场就问：2010 年代的中国电影为什么会爆发，势头又为什么中断。答案散落在七个小时里，这里收在一起。</p>
<div style="margin-top: 34px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr)); gap: 0 24px; align-items: start;">
${block('01', '根本动力', `<div style="margin-top: 14px; display: flex; height: 6px;"><span style="flex: 1; background: ${C.ref};"></span><span style="flex: 1; background: ${C.opn};"></span></div><div style="margin-top: 14px; font-family: ${F.serif}; font-size: 22px; font-weight: 700; line-height: 1.5;">${esc(d.root)}</div>`)}
${block('02 →', '凑齐的七个条件', `<div style="margin-top: 10px;">${conds}</div>`)}
${block('03 →', '结果', `<div style="margin-top: 14px; font-family: ${F.serif}; font-size: 24px; font-weight: 700; line-height: 1.5;">${esc(d.result)}</div><div style="margin-top: 18px;">${quote('以最小的政治风险，换取最大的经济利益。', '节目对产业政策原则的概括', 17)}</div>`)}
${block('04 →', '2018–19 年起停滞', `<div style="margin-top: 10px;">${stall}</div><div style="margin-top: 16px; padding: 12px 14px; background: ${C.yel}; color: ${C.ink};"><div style="font-family: ${F.serif}; font-size: 19px; font-weight: 700;">疫情不是主因。</div><div style="margin-top: 4px; font-size: 13.5px; line-height: 1.65;">节目说，把中断归结到疫情是误会：它算一个因素，但不是主要原因。</div></div>`)}
</div>
</section>`;
}

// ===== K
function sectionK() {
  const d = D12, xv = v => 3 + (v - 1) / 2 * 94;
  let ticks = '';
  for (let i = 0; i <= 40; i++) { const v = 1 + i * 0.05, big = i % 10 === 0, mid = i % 2 === 0; ticks += `<span style="position: absolute; left: ${xv(v).toFixed(2)}%; top: 0; width: 1px; height: ${big ? 26 : mid ? 14 : 8}px; background: ${C.ink};"></span>`; }
  const routes = d.routes.map(r => { const x = xv(r.n), al = r.n === 1 ? 'left: ' + x + '%;' : r.n === 3 ? 'right: ' + (100 - x) + '%; text-align: right;' : 'left: ' + x + '%; transform: translateX(-50%); text-align: center;'; return `<div style="position: absolute; ${al} top: 0; width: max-content; max-width: 30%;"><div style="font-family: ${F.mono}; font-size: 34px; font-weight: 600; line-height: 1;">${r.n}</div><div style="margin-top: 6px; font-family: ${F.serif}; font-size: 18px; font-weight: 700;">${esc(r.name)}</div>${r.desc ? `<div style="margin-top: 2px; font-size: 13px; line-height: 1.5; color: ${C.muted};">${esc(r.desc)}</div>` : ''}</div>`; }).join('');
  const ruler = `<div style="position: relative; margin-top: 44px; height: 92px;">
<div style="position: absolute; left: ${xv(2.36)}%; width: ${(xv(2.64) - xv(2.36)).toFixed(2)}%; top: 6px; text-align: center; font-size: 12.5px; color: ${C.muted}; white-space: nowrap;"><span style="font-family: ${F.mono};">2.5</span> 大概率在这一带</div>
<div style="position: absolute; left: ${xv(2.85)}%; top: 0; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center;"><span style="padding: 4px 10px 3px; background: ${C.yel}; font-size: 13px; font-weight: 600; color: ${C.ink}; white-space: nowrap;">更可能：<span style="font-family: ${F.mono};">2.8、2.9</span></span><span style="width: 0; height: 0; margin-top: 2px; border-left: 9px solid transparent; border-right: 9px solid transparent; border-top: 14px solid ${C.ink};"></span></div>
<div style="position: absolute; left: 0; right: 0; top: 56px; height: 36px; box-sizing: border-box; border: 1.5px solid ${C.ink}; background: ${C.card};"><div style="position: absolute; left: ${xv(2.36)}%; width: ${(xv(2.64) - xv(2.36)).toFixed(2)}%; top: 0; bottom: 0; background: rgba(29,27,24,0.10);"></div><div style="position: absolute; left: ${xv(2.8)}%; width: ${(xv(2.9) - xv(2.8)).toFixed(2)}%; top: 0; bottom: 0; background: ${C.yel};"></div>${ticks}</div>
</div>
<div style="position: relative; height: 104px; margin-top: 12px;">${routes}</div>`;
  const wl = d.wishlist.map((w, i) => `<div style="display: grid; grid-template-columns: 34px minmax(0, 1fr); gap: 12px; padding: 14px 0; border-bottom: 1px solid ${C.rule};"><span style="font-family: ${F.mono}; font-size: 14px; color: ${C.cap}; padding-top: 2px;">${String(i + 1).padStart(2, '0')}</span><div><div style="font-family: ${F.serif}; font-size: 17px; font-weight: 700;">${esc(w.item)}</div><div style="margin-top: 4px; font-size: 14.5px; line-height: 1.7; color: ${C.ink2};">${esc(w.view)}</div></div></div>`).join('');
  return `${secOpen('future', 'K', '会停在 2.8')}${head('K', '会停在 2.8', '节目的结论')}
<p style="${S.intro}">节目给往后的路画了一把尺子：1 是继续推进，把体制里该改的都改掉；2 是只改经济范畴，超出经济范畴的不动；3 是维持现状。对第一条，节目的说法是“第一条就不要想了”。</p>
<div style="overflow-x: auto;"><div style="min-width: 520px;">${ruler}</div></div>
<h3 style="margin: 56px 0 0; padding-bottom: 12px; border-bottom: 1px solid ${C.ink}; font-family: ${F.serif}; font-size: 22px; font-weight: 700;">假想清单 <span style="font-family: ${F.sans}; font-size: 14px; font-weight: 400; color: ${C.cap};">十项设想，和节目自己的判断</span></h3>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 440px), 1fr)); gap: 0 48px;">${wl}</div>
</section>
<div data-screen-label="K 结尾" style="margin-top: clamp(64px, 8vw, 104px); background: ${C.ink}; color: ${C.paper}; padding: clamp(56px, 7vw, 96px) ${PAD};"><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr)); gap: 40px 64px; align-items: end;">${[['长江黄河不会倒流。'], ['我们不是它的结果，我们是它的原因。']].map(([t]) => `<figure style="margin: 0;"><blockquote style="margin: 0; font-family: ${F.serif}; font-size: clamp(30px, 3.6vw, 48px); font-weight: 700; line-height: 1.45; text-wrap: pretty;">“${t}”</blockquote><figcaption style="margin-top: 14px; font-size: 14px; color: #CFC7B6;">—— 一位主持人</figcaption></figure>`).join('')}</div></div>`;
}

// ===== L
function sectionL() {
  const hiC = { '中影': C.ink, '改革': C.ref, '开放': C.opn, '发行': C.ink };
  const hiNote = { '中影': '全片出现最多的专名', '发行': '居首，印证节目“改革任务里发行放映占七成”的估算', '开放': '“改革”187 次，“开放”59 次，约三比一' };
  const grp = (g, base) => { const rows = D13.filter(r => r.group === g); const max = Math.max(...rows.map(r => +r.mentions)); return `<div><div style="padding-bottom: 8px; border-bottom: 2px solid ${C.ink}; display: flex; justify-content: space-between; align-items: baseline;"><span style="font-family: ${F.serif}; font-size: 18px; font-weight: 700;">${g}</span><span style="font-size: 12px; color: ${C.cap};">次</span></div>${rows.map(r => { const c = hiC[r.name] || base, n = hiNote[r.name]; return `<div style="padding: 5px 0;"><div style="display: grid; grid-template-columns: 96px minmax(0, 1fr) 36px; gap: 10px; align-items: center;"><span style="font-size: 14px; ${hiC[r.name] ? 'font-weight: 700;' : ''} white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${esc(r.name)}</span><span style="height: 12px; width: ${(+r.mentions / max * 100).toFixed(1)}%; background: ${c};"></span><span style="font-family: ${F.mono}; font-size: 13px; text-align: right;">${r.mentions}</span></div>${n ? `<div style="margin: 3px 0 2px 106px; font-size: 12px; line-height: 1.5; color: ${C.muted};">${n}</div>` : ''}</div>`; }).join('')}</div>`; };
  const Y0 = 1982.5, Y1 = 2011.5, xf = y => (y - Y0) / (Y1 - Y0), HB = 170;
  const yb = D14.map(r => { const v = +r.mentions, hl = r.year === '1993' || r.year === '1994'; return `<div style="position: absolute; left: ${pct(xf(+r.year))}; bottom: 0; width: 2.6%; margin-left: -1.3%; height: ${(v / 25 * HB).toFixed(1)}px; background: ${hl ? C.yel : C.muted}; ${hl ? `box-shadow: inset 0 0 0 1px ${C.ink};` : ''}"><span style="position: absolute; left: 50%; bottom: 100%; transform: translateX(-50%); padding-bottom: 3px; font-family: ${F.mono}; font-size: 12px; font-weight: 600;">${v}</span></div><div style="position: absolute; left: ${pct(xf(+r.year))}; top: ${HB + 6}px; transform: translateX(-50%) ${['1987', '1993', '2003'].includes(r.year) ? 'translateY(14px)' : ''}; font-family: ${F.mono}; font-size: 11.5px; color: ${C.cap};">${r.year}</div>`; }).join('');
  const meaning = D14.map(r => `<div style="display: grid; grid-template-columns: 44px 36px minmax(0, 1fr); gap: 8px; padding: 6px 0; border-top: 1px solid ${C.rule}; font-size: 13.5px; line-height: 1.6;"><span style="font-family: ${F.mono}; font-weight: 600;">${r.year}</span><span style="font-family: ${F.mono}; color: ${C.cap};">${r.mentions}</span><span style="color: ${C.ink2};">${esc(r.meaning)}</span></div>`).join('');
  const dec = [['1978–79', 11], ['80 年代', 64], ['90 年代', 80], ['2000 年代', 47], ['2010 年代', 46]];
  const decH = dec.map(([k, v]) => `<div style="display: grid; grid-template-columns: 80px minmax(0, 1fr) 30px; gap: 10px; align-items: center; padding: 4px 0;"><span style="font-size: 13.5px;">${k}</span><span style="height: 10px; width: ${(v / 80 * 100).toFixed(1)}%; background: ${C.muted};"></span><span style="font-family: ${F.mono}; font-size: 13px; text-align: right;">${v}</span></div>`).join('');
  return `${secOpen('mentions', 'L', '谁被提得最多')}${head('L', '谁被提得最多', '附录 · 节目最在意谁、哪一年')}
<p style="${S.intro}">从转写里数出来的次数。“发行”211 次居首；“改革”和“开放”约三比一；“中影”100 次，是全片出现最多的专名。</p>
<div style="margin-top: 34px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 36px 40px; align-items: start;">${grp('导演与影人', rgba(C.cre, 0.75))}${grp('机构', C.faint)}${grp('概念', C.faint)}</div>
<div style="margin-top: 56px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr)); gap: 36px 56px; align-items: start;">
<div><div style="padding-bottom: 8px; border-bottom: 2px solid ${C.ink}; font-family: ${F.serif}; font-size: 18px; font-weight: 700;">年份热度：被提到最多的十个年份</div><div style="position: relative; height: ${HB + 44}px; margin-top: 30px;"><div style="position: absolute; left: 0; right: 0; top: 0; height: ${HB}px; border-bottom: 1px solid ${C.ink};">${yb}</div></div>${meaning}</div>
<div><div style="padding-bottom: 8px; border-bottom: 2px solid ${C.ink}; font-family: ${F.serif}; font-size: 18px; font-weight: 700;">按年代</div><div style="margin-top: 12px;">${decH}</div><p style="${S.cap}">90 年代被提到最多，与节目把重心放在 1993–94 年改革上一致。</p></div>
</div>
<p style="${S.cap}">提及次数含转写变体，是约数。年份按横轴位置排列，柱高为次数。</p>
</section>`;
}

// ===== M
function sectionM() {
  const pick = D15.slice(0, 8);
  const cards = pick.map((r, i) => { const [num, desc, src] = r; const len = [...num].length; const fs = len <= 4 ? 50 : len <= 6 ? 40 : 30; return `<div style="position: relative; display: grid; grid-template-columns: 34px minmax(0, 1fr); background: radial-gradient(circle at 0 50%, ${C.paper} 9px, transparent 9.5px), radial-gradient(circle at 100% 50%, ${C.paper} 9px, transparent 9.5px), ${C.card}; box-shadow: 0 1px 0 ${C.rule2};"><div style="border-right: 1.5px dashed ${C.rule2}; display: flex; align-items: center; justify-content: center;"><span style="writing-mode: vertical-rl; font-family: ${F.mono}; font-size: 11px; letter-spacing: 0.1em; color: ${C.cap};">No.${String(i + 1).padStart(2, '0')}</span></div><div style="padding: 20px 22px 18px 18px;"><div style="font-family: ${F.serif}; font-size: ${fs}px; font-weight: 900; line-height: 1.1; font-variant-numeric: lining-nums tabular-nums;">${esc(num)}</div><div style="margin-top: 12px; font-size: 14.5px; line-height: 1.7; color: ${C.ink2}; text-wrap: pretty;">${esc(desc)}</div><div style="margin-top: 10px; font-size: 12px; color: ${C.cap};">${esc(src)}</div></div></div>`; }).join('');
  return `${secOpen('ledger', 'M', '账本')}${head('M', '账本', '附录 · 冷知识')}
<div style="margin-top: 32px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); gap: 18px;">${cards}</div>
</section>`;
}

function footer() {
  return `<footer style="margin-top: clamp(72px, 9vw, 112px); padding: 28px ${PAD} 44px; border-top: 3px double ${C.ink}; display: flex; flex-wrap: wrap; gap: 14px 40px; justify-content: space-between; font-size: 13px; line-height: 1.85; color: ${C.cap};"><div style="max-width: 820px;">年份与数字均据节目口述整理，没有逐条核对原始文献。板块按节目里的过渡句切分，误差约一分钟；提及次数含转写变体，为约数。转写没有说话人标注，观点一律记为“节目”或“一位主持人”。海报与人物照片来自维基百科与维基共享资源，可拖入自己的图片替换。</div><div style="display: flex; flex-direction: column; gap: 4px;"><span style="font-family: ${F.mono}; letter-spacing: 0.12em;">MAGASA / LOOK</span></div>${seriesNav({ color: C.cap, footer: true })}</footer>`;
}

// ===== assemble
const helmet = `<helmet>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<script src="./image-slot.js"></script>
<style>
  body { margin: 0; background: #E4DDCD; }
  a { color: ${C.ref}; text-decoration: none; }
  a:hover { color: ${C.cre}; }
  button { font: inherit; }
</style>
</helmet>`;
const bodyParts = [cover(), sectionB(), sectionD(), sectionE(), sectionF(), sectionG(), sectionH(), sectionI(), sectionJ(), sectionN(), sectionK(), sectionL(), sectionM(), footer()];
const template = `${helmet}
<div style="width: 100%; max-width: {{ frameW }}; margin: 0 auto; background: ${LEDGER}; color: ${C.ink}; font-family: ${F.sans}; font-variant-numeric: tabular-nums; overflow: hidden; box-shadow: 0 0 0 1px rgba(29,27,24,0.08);">
${bodyParts.join('\n')}
</div>`;

const STJ = ST.map(s => [s.time, s.clip, s.ct, s.label, SEC[s.sec].name, SEC[s.sec].c === C.neu ? C.faint : SEC[s.sec].c, +(s.t / T).toFixed(5)]);
const CLJ = CL.map(c => { const [a, b] = c.title.split('｜'); return [c.n, a, b || '', c.start, c.end, c.min, +(((c.s + c.e) / 2) / T).toFixed(5)]; });
const EVJ = EV.map(e => [e.y, LANE_NAME[e.lane], CAT[e.lane].c === C.neu ? C.faint : CAT[e.lane].c, e.imp, e.text, +evMeta[e.i].x.toFixed(5), evMeta[e.i].top]);
const JS = `
class Component extends DCLogic {
  mq = window.matchMedia('(max-width: 759px)');
  state = { mqNarrow: this.mq.matches, allSt: null, allEv: null };

  componentDidMount() {
    this.onMq = (e) => this.setState({ mqNarrow: e.matches });
    this.mq.addEventListener('change', this.onMq);
    const addFonts = () => {
      if (document.getElementById('cn01-fonts')) return;
      const l = document.createElement('link');
      l.id = 'cn01-fonts'; l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@700;900&family=Noto+Sans+SC:wght@400;500&family=IBM+Plex+Mono:wght@400;600&display=swap';
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
    return {
      frameW: mob ? '390px' : '1440px',
      wideDisp: narrow ? 'none' : 'block', narrowDisp: narrow ? 'block' : 'none', stMinorGrid: allSt ? 'grid' : 'none', evMinorFlex: allEv ? 'flex' : 'none', evMinorGrid: allEv ? 'grid' : 'none', evListDisp: (narrow || allEv) ? 'block' : 'none',
      stBtn: allSt ? '收起次站，只看 ${N1} 个主站' : '展开全部 ${NST} 个站点',
      evBtn: narrow ? (allEv ? '只看主要事件' : '显示全部 ${EV.length} 条事件') : (allEv ? '收起事件清单' : '展开全部 ${EV.length} 条事件的清单'),
      toggleSt: () => this.setState({ allSt: !allSt }),
      toggleEv: () => this.setState({ allEv: !allEv })
    };
  }
}`;
const props = { showAllStations: { editor: 'boolean', default: true, tsType: 'boolean', section: '展开' }, showAllEvents: { editor: 'boolean', default: true, tsType: 'boolean', section: '展开' }, layout: { editor: 'enum', options: ['自动', '手机预览'], default: '自动', tsType: 'string', section: '版式' } };
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
log('saved', OUT, html.length, 'chars; events', EV.length, 'stations', NST);

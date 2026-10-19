import { HOME, SERIES } from '../catalog.mjs';

const escape = value => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function seriesNeighbors(id) {
  const index = SERIES.findIndex(e => e.id === id);
  if (index < 0) throw new Error(`Unknown series episode: ${id}`);
  return { previous: SERIES[index - 1], current: SERIES[index], next: SERIES[index + 1] };
}

// Render at build time: navigation also works without fetching another module.
export function renderSeriesNavigation(id, { color = 'inherit', footer = false } = {}) {
  const { previous, next } = seriesNeighbors(id);
  const linkStyle = `color:${escape(color)};text-decoration:underline;text-underline-offset:4px;overflow-wrap:anywhere`;
  const previousLink = previous ? `<a rel="prev" href="./${escape(previous.page)}" style="${linkStyle}">← 上一期整理 · ${previous.number} ${escape(previous.title)}</a>` : '';
  const nextLink = next ? `<a rel="next" href="./${escape(next.page)}" style="${linkStyle}">下一期整理 · ${next.number} ${escape(next.title)} →</a>` : '';
  return `<nav aria-label="为了华语电影专题导航" data-series-nav="${id}" style="width:100%;${footer ? 'margin-top:22px;' : ''}display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px 24px;font-size:14px;line-height:1.7;letter-spacing:normal;color:${escape(color)}">
<a href="./${HOME}" style="${linkStyle}">← 电影巨辩 · 总结索引</a>
<div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px 24px;min-width:0">${previousLink}${nextLink}${footer ? `<a href="#cover" style="${linkStyle}">回到顶部 ↑</a>` : ''}</div>
</nav>`;
}

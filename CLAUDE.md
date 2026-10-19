# CLAUDE.md

《电影巨辩》播客总结可视化。每期一个页面，入口 `首页-播客总结索引.dc.html`。浏览方式和页面清单见 `README.md`。

## 预览

```
python3 -m http.server 8000      # 或 node tools/serve.mjs
open http://localhost:8000/
```

不能用 `file://` 打开。改完后在浏览器里看，打开控制台：模板里没解析出来的 `{{ }}` 会打警告。

## 页面格式（.dc.html，“Design Component”）

每个页面是一个能直接打开的 HTML 文件，`support.js` 在浏览器里把它渲染成 React：

```html
<!DOCTYPE html><html><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<script src="./support.js"></script>
</head><body>
<x-dc>
  <helmet>  字体 <link>、<script src="./image-slot.js">、只放 body 重置 / @font-face / @keyframes 的 <style>  </helmet>
  … 模板 …
</x-dc>
<script type="text/x-dc" data-dc-script data-props="{…HTML 转义的 JSON…}">
class Component extends DCLogic {
  state = {};
  renderVals() { return { items: [...], onToggle: () => this.setState(...) }; }
}
</script>
</body></html>
```

模板规则：

- `{{ path }}` 只能是点号路径（`{{ item.name }}`、`{{ $index }}`），不能写表达式。要算的东西放进 `renderVals()`，用名字暴露出来。
- 属性：`x="{{ path }}"` 传原值，`x="a {{ p }} b"` 是字符串插值。事件用驼峰：`onClick="{{ handler }}"`。
- 循环 / 条件：`<sc-for list="{{ items }}" as="item" hint-placeholder-count="3">…</sc-for>`，`<sc-if value="{{ flag }}" hint-placeholder-val="{{ true }}">…</sc-if>`。
- 正文分组在构建时合并进主页面，不使用 `dc-import` 请求同目录子页面，避免独立预览中只出现占位框。所有正式 `.dc.html` 仍放在根目录，与运行时和图片路径对应。
- 样式一律写 inline `style="…"`，不用 class 和样式表。伪类用 `style-hover="…"` 等。
- 非空元素都要显式闭合，属性值用双引号。`<script>` 只能放在 `<helmet>` 里。

逻辑类：普通 JS，类名必须是 `Component`，`React` 和 `DCLogic` 已注入，没有静态 `import/export`。有 `this.props / this.state / setState` 和 React 生命周期，没有 `render()`。核心正文在构建时内嵌，不依赖浏览器动态导入；EP26 数据放在 `src/episodes/ep26/`，通过构建同步到页面。

`data-props` 是设计工具里 Tweaks 面板的元数据，本地浏览器不会把其中的 `default` 注入 props，所以代码里一律写 `this.props.x ?? 默认值`。

`support.js` 是运行时，不要修改。

## 图片

```html
<image-slot id="zmy09-p-maggie" src="assets/zmy09/p-maggie.jpg" shape="circle" placeholder="张曼玉" style="position:absolute;inset:0;width:100%;height:100%"></image-slot>
```

- `id` 在页面内唯一；`.image-slots.state.json` 按 id 记录裁切位置。
- 在本地往图片框里拖图不会保存（保存要靠设计工具）。换图：把文件放进 `assets/<期号>/`，改 `src`。
- 华语系列的生成脚本按文件名找图：例如 `zmy09` 会自动用 `assets/zmy09/<key>.<ext>`（key 见 `src/episodes/zmy09/a.js` 里的 `FK` / `PK` 表），放进去重新构建即可。
- 图片来源大多是维基百科，版权归原权利人。

## 两类页面

**手写页面**（EP11–37、侯孝贤、129 本书）：直接改 `.dc.html`。

**首页**：修改 `src/home/template.html`、`logic.js`、`content.json` 和 `episodes.json`，运行 `node tools/build.mjs home`。节目与主播资料必须留有公开来源，摘句保留出处，无法确认说话人的只署名节目。轮播提供暂停/前后切换，尊重减少动态效果，不在浏览器动态加载核心内容。

**生成页面**（华语 01–09）：由 `src/episodes/<期号>/a.js`、`b.js`… 拼接后生成。数据来自同目录的 `handoff.md`（交接文档里的 csv / json 代码块），第一个脚本负责解析数据、定义配色 `C`、字体 `F`、通用小组件；后面的脚本各写几个板块；最后一个脚本组装并写文件。

- 改这些页面要改生成脚本，然后重新构建；直接改页面的话，下次构建会被覆盖。
- 构建：`node tools/build.mjs`（列出期号），`node tools/build.mjs zmy09`。`npm run build` 重建全部专题并同步 EP26。不再支持 `--only`，以免主页面遗漏后续内容。
- 08、09 在生成源码中按 7 组组织，最终只输出一张完整主页面；`StationLogic` 保留站点图及展开状态，主逻辑继承它并补充响应式布局。不能恢复浏览器链式加载正文。
- 页面已与源码核对，构建直接更新正式文件，不再生成另一套预览。用 `npm run check` 检查源码一致性、链接、资源与正文分组；用 `npm test` 跑回归。
- 每期只保留一个正式文件名；不创建 v1/v2 副本。页面及子页面清单统一登记在 `src/catalog.mjs`，过往 URL 由 Node 预览服务器重定向。
- 专题的页首、页尾统一调用 `seriesNav({ color: C.cap, footer: true })`（页首省略 `footer`，深色背景传相应文字色）。顺序来自目录，不能再手写前后期链接。
- 生成脚本是“异步函数体”，注入 `readFile / readFileBinary / saveFile / ls / log / replaceText / seriesNav`，以及当前目录项 `EPISODE`。文件路径相对项目根目录；输出必须是 `EPISODE.page`（见 `tools/lib/build-episode.mjs`）。

## 内容规则（来自交接文档）

- 交接文档给的文字原样使用，不改写；整理者添加的分组、档位要在页面上标注“为整理者所加”。
- 时长、提及次数是约数，可以写“约”。没确认的人名片名不要补全。
- 不放歌词，只写歌名。
- 各期配色、字体各自独立，改动时沿用该页已有的配色和字体，不要引入新的。

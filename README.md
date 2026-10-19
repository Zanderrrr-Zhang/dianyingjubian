# 电影巨辩 · 播客总结可视化

每期保留一个正式页面，入口为 `index.html` → `首页-播客总结索引.dc.html`。页面目录与专题顺序统一维护在 `src/catalog.mjs`。

## 本地浏览

需要通过 HTTP 打开。Windows 双击 `start-windows.bat`；Mac 双击 `start-mac.command`。启动器优先使用 Node，未安装时退回 Python。

推荐使用 Node 18+，不需要安装依赖：

```sh
npm run dev
# 或
node tools/serve.mjs 8000
```

打开 http://localhost:8000/。验证时可用 `node tools/serve.mjs 8016 --no-open`，服务仅监听本机。

Node 预览服务器会把旧版书签重定向到正式页；项目内不再保留旧预览文件。Python 备用服务器不提供这些重定向，请从首页进入。

## 代码结构

```text
/                         正式 .dc.html 页面、运行时及入口
  support.js              Design Component 运行时，不修改
  image-slot.js           图片框组件
  ep25-map.html           双峰地图
  ep27-paisa-map.html      意大利地图
src/
  catalog.mjs             正式页面、专题顺序、正文分组和旧 URL 重定向
  shared/
    series-navigation.mjs 专题页首与页尾的双向导航
    image-sources.json    图片来源记录
  episodes/
    cn01/ ... zmy09/      每期 a.js、b.js…、handoff.md、图片来源清单
    ep26/                 一战再战正文 data.js 与图片索引 images.js
  home/                   首页模板、轮播/搜索逻辑、主播资料与金句、篇目目录
assets/<期号>/             本地图片
uploads/                  原始交接资料与截图
scraps/                   设计参考与草图
tools/
  build.mjs               构建入口
  serve.mjs               本地预览
  check.mjs               页面、链接、图片、正文分组与源码一致性检查
  sync-ep26-data.mjs       单独同步 EP26 数据
  lib/                    构建与检查共用逻辑
tests/                    内容加载、专题导航与完整页面构建回归
```

正式 `.dc.html` 与 `support.js` 同层，保留运行时和图片的相对路径。正文全部在构建时写入本期页面，不用 `dc-import` 额外加载后续内容；源文件集中到 `src/`。

## 修改与构建

手写页面（普通节目、侯孝贤、129 本书）直接修改根目录的正式 `.dc.html`。

首页源文件位于 `src/home/`：`template.html` 管理版式，`logic.js` 管理金句轮播与目录筛选，`content.json` 记录节目、主播与引文出处，`episodes.json` 保存导读卡片。用 `node tools/build.mjs home` 构建，所有数据内嵌到首页，无需运行时请求其他模块。金句每 9 秒轮换；悬停、焦点停留和后台标签页会暂停，系统开启减少动态效果时默认暂停。

“为了华语电影”各期由 `src/episodes/<id>/a.js`、`b.js`…生成。修改源文件再构建，不直接修改生成页面。每期的 `handoff.md` 是内容依据，图片放在 `assets/<id>/`。

```sh
node tools/build.mjs               # 列出期号
node tools/build.mjs hy06          # 重建一期
node tools/build.mjs hjx08         # 重建完整长页
npm run build                     # 重建全部专题页，并同步 EP26
npm run check                     # 只检查，不写文件
npm test                          # 回归测试
```

当前专题顺序：01 中国电影的改开史 → 02 香港特区电影 → 03 杨德昌 → 04 贾樟柯 → 05 银河映像 → 06 花样年华 → 08 黄建新 → 09 张曼玉。第 07 期尚未收录；导航按已收录顺序连接，并显示实际期号。

08、09 的正文在源码中仍按 7 个部分组织，构建时合并成一张完整页面。站点图、桌面/手机布局和展开按钮共用页面状态。无需浏览器请求子页面，单独预览主文件也不会因子页面不可访问而截断正文。构建必须更新完整页面，`--only` 已停用；原来的子页面 URL 会跳到主页面对应的内容锚点。

增加专题期数时，先在 `src/catalog.mjs` 登记，再按相邻期的目录结构添加源码，并运行全量构建。前后期导航在构建时生成，浏览时不需要再请求导航数据。首页卡片在 `src/home/episodes.json` 中维护；`npm test` 会检查篇目是否齐全、摘句是否匹配来源、轮播与筛选行为。

EP26 的正文及图片索引在构建时嵌入页面，以免外部模块加载失败时只剩标题。修改 `src/episodes/ep26/data.js` 或 `images.js` 后，运行 `node tools/build.mjs ep26` 或 `npm run build`。同步工具仍支持 `--check`。

## 联网依赖

- React 18：`support.js` 从 unpkg 加载，页面仍需要网络。
- 字体：Google Fonts；不可用时使用系统字体。
- EP25、EP27 地图：从 unpkg / jsDelivr 加载 d3 和地图数据。
- EP13、大卫·林奇、EP27、EP33、侯孝贤、129 本书：运行时从维基百科取图；EP25 部分图片从 Twin Peaks Wiki 获取。首页只使用本地配图；EP13 卡片使用文字封面。
- 华语系列、EP26、EP29 及首页其他卡片的图片已保存在本地。

页面格式、内容规范及生成器约定见 `CLAUDE.md`。

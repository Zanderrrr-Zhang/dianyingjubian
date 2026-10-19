// Canonical pages. Series order drives both navigation and builds.
export const HOME = '首页-播客总结索引.dc.html';
export const SERIES = [
  { id: 'cn01', number: '01', title: '中国电影的改开史', parts: 'ab' },
  { id: 'hk02', number: '02', title: '香港特区电影', parts: 'abc' },
  { id: 'yang03', number: '03', title: '杨德昌', parts: 'abcd' },
  { id: 'jia04', number: '04', title: '贾樟柯', parts: 'abcd' },
  { id: 'yh05', number: '05', title: '银河映像', parts: 'abcd' },
  { id: 'hy06', number: '06', title: '花样年华', parts: 'abcdef' },
  { id: 'hjx08', number: '08', title: '黄建新', parts: 'abcde', bundledParts: 7 },
  { id: 'zmy09', number: '09', title: '张曼玉', parts: 'abcde', bundledParts: 7 },
].map(episode => ({
  ...episode,
  page: `电影巨辩-为了华语电影${episode.number}-${episode.title}.dc.html`,
  sections: Array.from({ length: episode.bundledParts || 0 }, (_, i) => `${episode.id}-p${i + 1}`),
}));

export const EP26_PAGE = '电影巨辩26-一战再战.dc.html';
export const HANDWRITTEN = [
  '电影巨辩11-金马六十年.dc.html',
  '电影巨辩13-影史排行榜.dc.html',
  '电影巨辩18-戛纳与新好莱坞.dc.html',
  '电影巨辩-大卫林奇.dc.html',
  '电影巨辩25-双峰.dc.html',
  EP26_PAGE,
  '电影巨辩27-意大利1945.dc.html',
  '电影巨辩29-毕赣天才的短板.dc.html',
  '电影巨辩30-2025世界电影总结.dc.html',
  '电影巨辩33-比利怀尔德.dc.html',
  '电影巨辩37-诺兰奥德赛.dc.html',
  '电影巨辩-侯孝贤.dc.html',
  '电影巨辩-129本书.dc.html',
];
export const PAGE_FILES = [HOME, ...HANDWRITTEN, ...SERIES.map(e => e.page)];

// Keep bookmarked preview URLs usable without retaining duplicate preview files.
export const PAGE_REDIRECTS = {
  '首页-播客总结索引 v1.dc.html': HOME,
  '电影巨辩-大卫林奇 v1.dc.html': '电影巨辩-大卫林奇.dc.html',
  '电影巨辩-侯孝贤 v1.dc.html': '电影巨辩-侯孝贤.dc.html',
  '电影巨辩11-金马六十年 v1.dc.html': '电影巨辩11-金马六十年.dc.html',
  '电影巨辩25-双峰 v1.dc.html': '电影巨辩25-双峰.dc.html',
  ...Object.fromEntries(SERIES.filter(e => ['hy06', 'hjx08', 'zmy09'].includes(e.id)).flatMap(e => [
    [e.page.replace('.dc.html', '-v2.dc.html'), e.page],
    ...e.sections.flatMap(section => [
      [`${section}.dc.html`, `${e.page}#${section}`],
      [`${section.replace(`${e.id}-`, `${e.id}v2-`)}.dc.html`, `${e.page}#${section}`],
    ]),
  ])),
};

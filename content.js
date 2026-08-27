/* 编辑网站时，优先只改这个文件：姓名、邮箱、每个项目的文字与对应页面。 */
const page = (number) => `assets/portfolio/page-${String(number).padStart(2, '0')}.jpg`;
const portfolio = { owner: { name: '麻真瑜', en: 'MA ZHENYU', email: 'hello@example.com' }, projects: [
  { title: 'CAICAI', subtitle: '菜菜菜市场品牌设计', year: '2021', tags: ['BRAND DESIGN', 'PACKAGING'], cover: page(4), description: '以新一代菜市场为命题的品牌升级设计。从用户调研、品牌定位到包装、海报与场景应用，探索年轻人和市井生活之间的新连接。', pages: [4,5,6,7,10,11,12,13,14,15].map(page) },
  { title: 'BUDDY', subtitle: 'BUDDY 形象设计', year: '2022', tags: ['IP DESIGN', 'CHARACTER'], cover: page(17), description: '围绕青年焦虑与日常烦恼构建的 IP 角色设计。通过角色设定、表情、海报和场景，让陪伴感成为可被看见的视觉语言。', pages: [17,18,19,20,21,22,23,24,25,26,27].map(page) },
  { title: 'BUKELIYU', subtitle: '不可里予工作室运营设计', year: '2022—至今', tags: ['OPERATION', 'SVG / INTERACTION'], cover: page(30), description: '为不可里予工作室创作的持续运营视觉，涵盖 IP、节日延展、动态表情包及公众号 SVG 互动内容。', pages: [30,31,32,33,34,35,36,37,38,39,40,41,42].map(page) },
  { title: 'HUC', subtitle: '哈尔滨商业大学标志设计', year: '2022—2023', tags: ['LOGO DESIGN', 'IDENTITY'], cover: page(44), description: '哈尔滨商业大学 70 周年校庆标志与“商海红帆”党建项目标志提案。以系统化的图形释义、色彩规范和应用设计完成品牌表达。', pages: [44,45,46,47,48,49,50,51,52,53,54,55,56,57].map(page) },
  { title: 'INDIVIDUAL', subtitle: '个人设计与落地项目', year: '2020—现在', tags: ['ILLUSTRATION', 'VISUAL'], cover: page(59), description: '从录取通知书胸章、校庆吉祥物到绘本插画与个人练习，持续探索视觉叙事在不同媒介中的可能。', pages: [59,60,61,62,63,64,65].map(page) }
]};

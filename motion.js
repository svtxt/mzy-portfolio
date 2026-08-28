const motionArea = document.querySelector('.hero');
const movableItems = [...motionArea.querySelectorAll('.pipe, .tile, .bar, .hero-title span')];

function resetMotion() {
  movableItems.forEach((item) => {
    item.style.setProperty('--move-x', '0px');
    item.style.setProperty('--move-y', '0px');
  });
}

motionArea.addEventListener('pointermove', (event) => {
  movableItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const distanceX = event.clientX - (rect.left + rect.width / 2);
    const distanceY = event.clientY - (rect.top + rect.height / 2);
    const distance = Math.hypot(distanceX, distanceY);
    const influence = Math.max(0, 1 - distance / 440);
    const directionX = distanceX / Math.max(distance, 1);
    const directionY = distanceY / Math.max(distance, 1);
    const amount = item.classList.contains('pipe') ? 16 : item.matches('.hero-title span') ? 14 : 19;
    item.style.setProperty('--move-x', `${(directionX * influence * amount).toFixed(2)}px`);
    item.style.setProperty('--move-y', `${(directionY * influence * amount).toFixed(2)}px`);
  });
});

motionArea.addEventListener('pointerleave', resetMotion);
document.querySelector('.hero-title').addEventListener('pointerenter', () => document.querySelector('.hero-title').classList.add('is-bursting'));
document.querySelector('.hero-title').addEventListener('pointerleave', () => document.querySelector('.hero-title').classList.remove('is-bursting'));
const portfolioWord = document.querySelector('.portfolio-word');
let floatX = 0;
let floatY = 0;
let targetX = 0;
let targetY = 0;
let nextTurn = 0;

function continuouslyFloatPortfolio(time) {
  if (time > nextTurn) {
    const isMobile = window.innerWidth < 700;
    targetX = isMobile ? Math.random() * 54 - 27 : Math.random() * 290 - 28;
    targetY = isMobile ? Math.random() * 96 - 48 : Math.random() * 390 - 205;
    nextTurn = time + 2800 + Math.random() * 2300;
  }
  floatX += (targetX - floatX) * 0.006;
  floatY += (targetY - floatY) * 0.006;
  portfolioWord.style.setProperty('--float-x', `${floatX.toFixed(2)}px`);
  portfolioWord.style.setProperty('--float-y', `${floatY.toFixed(2)}px`);
  requestAnimationFrame(continuouslyFloatPortfolio);
}
requestAnimationFrame(continuouslyFloatPortfolio);
resetMotion();

document.querySelectorAll('.motion-card, .profile-photo-wrap, .profile-stickers').forEach((card, index) => {
  card.style.animationDelay = `${index * -0.35}s`;
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    card.style.setProperty('--tilt-x', `${(y * -5).toFixed(2)}deg`);
    card.style.setProperty('--tilt-y', `${(x * 6).toFixed(2)}deg`);
  });
  card.addEventListener('pointerleave', () => {
    card.style.removeProperty('--tilt-x');
    card.style.removeProperty('--tilt-y');
  });
});

const experienceList = document.querySelector('.profile-right section:first-child ul');
if (experienceList) {
  experienceList.innerHTML = `
    <li>不可里予工作室 <small>2021—2025 · 视觉平面设计成员</small><p>自主打造成套原创表情包、品牌专属IP形象，落地SVG公众号互动图文、H5动态视觉、动效插画等新媒体物料。</p></li>
    <li>夜幕工作室 <small>2021—2023 · 画师</small></li>
    <li>星力海蓝文化传媒有限公司 <small>2023—2024 · 实习设计师</small><p>承接电信品牌商用宣传海报、多位艺人线上宣发物料的设计工作。</p></li>
    <li>乐我无限科技有限责任公司 <small>2026 · 海外工具产品设计实习生</small><p>负责海外图片编辑产品 PhotoGrid 的视觉物料产出，面向美区用户市场。</p></li>`;
}
const interestIcons = document.querySelector('.interest-icons');
if (interestIcons) interestIcons.innerHTML = '<span class="icon-bolt">ϟ</span><span class="icon-rook">♜</span><span class="icon-lines">☰</span><span class="icon-circle"></span>';

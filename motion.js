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
if (interestIcons) interestIcons.innerHTML = '<svg class="interest-svg" viewBox="0 0 360 90" role="img" aria-label="相机、行李箱、书本、调色盘"><g fill="none" stroke="var(--green)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="28" width="65" height="42" rx="8"/><path d="M24 28l6-10h22l6 10M21 49h5m35 0h-5"/><circle cx="41" cy="49" r="14"/></g><g fill="none" stroke="var(--yellow)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><rect x="125" y="23" width="35" height="50"/><path d="M132 15h21v8M125 35h35M132 73v8m21-8v8"/></g><g fill="none" stroke="var(--blue)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><rect x="208" y="14" width="38" height="62" rx="4"/><path d="M246 19h7v52h-7M208 68h38"/></g><g fill="none" stroke="var(--pink)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M274 24v42c0 7 6 12 13 12h14c19 0 28-10 28-23 0-20-15-34-35-34h-20z"/><circle cx="304" cy="48" r="4" fill="var(--pink)" stroke="none"/><circle cx="320" cy="43" r="4" fill="var(--pink)" stroke="none"/><circle cx="328" cy="57" r="4" fill="var(--pink)" stroke="none"/></g></svg>';

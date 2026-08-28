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

// 首页物体即使不移动鼠标也会持续呼吸、漂浮；鼠标靠近时仍会叠加更明显的偏移。
const ambientHeroItems = [...motionArea.querySelectorAll('.pipe, .tile, .bar, .hero-title span')]
  .filter((item) => !item.classList.contains('tile-orange') && !item.matches('.hero-title span:nth-child(3)'));
function animateHeroAmbient(time) {
  ambientHeroItems.forEach((item, index) => {
    const isPipe = item.classList.contains('pipe');
    const range = isPipe ? 18 : item.matches('.hero-title span') ? 11 : 16;
    const x = Math.sin(time / (1250 + index * 180) + index * 1.9) * range;
    const y = Math.cos(time / (1550 + index * 130) + index * 1.35) * range * .72;
    item.style.setProperty('--ambient-x', `${x.toFixed(1)}px`);
    item.style.setProperty('--ambient-y', `${y.toFixed(1)}px`);
  });
  motionArea.style.setProperty('--hero-shine', `${.12 + Math.sin(time / 1800) * .06}`);
  requestAnimationFrame(animateHeroAmbient);
}
requestAnimationFrame(animateHeroAmbient);

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
const motionInterestIcons = document.querySelector('.interest-icons');
if (motionInterestIcons) motionInterestIcons.innerHTML = '<svg class="interest-svg" viewBox="0 0 360 90" role="img" aria-label="相机、行李箱、书本、调色盘"><g fill="none" stroke="var(--green)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="28" width="65" height="42" rx="8"/><path d="M24 28l6-10h22l6 10M21 49h5m35 0h-5"/><circle cx="41" cy="49" r="14"/></g><g fill="none" stroke="var(--yellow)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><rect x="125" y="23" width="35" height="50"/><path d="M132 15h21v8M125 35h35M132 73v8m21-8v8"/></g><g fill="none" stroke="var(--blue)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><rect x="208" y="14" width="38" height="62" rx="4"/><path d="M246 19h7v52h-7M208 68h38"/></g><g fill="none" stroke="var(--pink)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M274 24v42c0 7 6 12 13 12h14c19 0 28-10 28-23 0-20-15-34-35-34h-20z"/><circle cx="304" cy="48" r="4" fill="var(--pink)" stroke="none"/><circle cx="320" cy="43" r="4" fill="var(--pink)" stroke="none"/><circle cx="328" cy="57" r="4" fill="var(--pink)" stroke="none"/></g></svg>';

// 首页与联系页的烟花都会沿着鼠标持续喷出，同时也会在整个画面里不间断地出现。
function setupSparkField(section, fireworkLayer) {
  if (!section || !fireworkLayer) return;
  const colors = ['var(--yellow)', 'var(--pink)', 'var(--blue)', 'var(--green)', 'var(--orange)'];
  let lastTrail = 0;
  const burst = (x, y, count = 7) => {
    for (let i = 0; i < count; i += 1) {
      const spark = document.createElement('i');
      const angle = (Math.PI * 2 * i) / count + Math.random() * .45;
      const distance = 24 + Math.random() * 70;
      spark.className = 'cursor-spark';
      spark.style.setProperty('--spark-x', `${x}px`);
      spark.style.setProperty('--spark-y', `${y}px`);
      spark.style.setProperty('--spark-dx', `${Math.cos(angle) * distance}px`);
      spark.style.setProperty('--spark-dy', `${Math.sin(angle) * distance}px`);
      spark.style.setProperty('--spark-color', colors[(i + Math.floor(Math.random() * colors.length)) % colors.length]);
      spark.style.setProperty('--spark-size', `${5 + Math.random() * 9}px`);
      fireworkLayer.append(spark);
      spark.addEventListener('animationend', () => spark.remove());
    }
  };
  section.addEventListener('pointermove', (event) => {
    const now = performance.now();
    if (now - lastTrail < 58) return;
    const rect = section.getBoundingClientRect();
    burst(event.clientX - rect.left, event.clientY - rect.top, 5);
    lastTrail = now;
  });
  setInterval(() => {
    const rect = section.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    burst(30 + Math.random() * Math.max(40, rect.width - 60), 30 + Math.random() * Math.max(40, rect.height - 60), 5);
  }, 520);
}

const contact = document.querySelector('.contact');
setupSparkField(contact, contact?.querySelector('.contact-fireworks'));

const heroSparkLayer = document.createElement('div');
heroSparkLayer.className = 'hero-fireworks';
heroSparkLayer.setAttribute('aria-hidden', 'true');
motionArea.append(heroSparkLayer);
setupSparkField(motionArea, heroSparkLayer);

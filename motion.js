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

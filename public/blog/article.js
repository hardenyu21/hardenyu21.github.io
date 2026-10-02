/** @fileoverview 长文阅读辅助：深链接、移动目录、当前章节与阅读进度。 */
const navigation = document.querySelector('.article-navigation');
const tocLinks = Array.from(document.querySelectorAll('.article-navigation a[href^="#"]'));
const progress = document.getElementById('reading-progress');
const mobileLayout = window.matchMedia('(max-width: 900px)');

/** 窄屏默认折叠目录，宽屏保持章节列表可见。 */
function updateNavigationLayout() {
  if (navigation) {
    navigation.open = !mobileLayout.matches;
  }
}

/** 支持文献附录及其内部目标的直接跳转。 */
function openHashTarget() {
  if (!window.location.hash) {
    return;
  }
  let targetId;
  try {
    targetId = decodeURIComponent(window.location.hash.slice(1));
  } catch {
    return;
  }
  const target = document.getElementById(targetId);
  if (!target) {
    return;
  }
  let ancestor = target;
  while (ancestor) {
    if (ancestor instanceof HTMLDetailsElement) {
      ancestor.open = true;
    }
    ancestor = ancestor.parentElement;
  }
  requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
}

/** 根据实际滚动位置标记当前章节，不发送阅读数据。 */
function updateReadingState() {
  const available = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0;
  if (progress) {
    progress.style.transform = `scaleX(${ratio})`;
  }
  let activeLink;
  for (const link of tocLinks) {
    const target = document.getElementById(link.hash.slice(1));
    if (target?.getClientRects().length && target.getBoundingClientRect().top <= 150) {
      activeLink = link;
    }
  }
  for (const link of tocLinks) {
    if (link === activeLink) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  }
}

let framePending = false;
window.addEventListener('scroll', () => {
  if (framePending) {
    return;
  }
  framePending = true;
  requestAnimationFrame(() => {
    updateReadingState();
    framePending = false;
  });
}, { passive: true });
window.addEventListener('hashchange', openHashTarget);
window.addEventListener('resize', updateReadingState);
mobileLayout.addEventListener('change', updateNavigationLayout);
document.querySelectorAll('details').forEach((details) => {
  details.addEventListener('toggle', updateReadingState);
});
updateNavigationLayout();
openHashTarget();
updateReadingState();

/* React 首页与静态研究长文共用主题，不读取或存储其他用户信息。 */
(() => {
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let preference;
  try {
    const saved = localStorage.getItem('homepage-theme');
    if (saved === 'light' || saved === 'dark') preference = saved;
  } catch {
    // 禁止本地存储时仍可在当前页面切换。
  }
  const currentTheme = () => preference || (system.matches ? 'dark' : 'light');
  const applyTheme = () => {
    const theme = currentTheme();
    root.dataset.theme = theme;
    const button = document.querySelector('.theme-toggle');
    if (button) {
      button.textContent = theme === 'dark' ? 'Light' : 'Dark';
      button.setAttribute(
        'aria-label',
        `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`
      );
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#111318' : '#f4f6f9');
  };
  applyTheme();
  system.addEventListener('change', applyTheme);

  // React 挂载晚于 head 脚本；只等待导航出现，不持续观察页面。
  const installControl = () => {
    const header = document.querySelector('.site-header');
    if (!header) return false;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'theme-toggle';
    button.addEventListener('click', () => {
      preference = currentTheme() === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('homepage-theme', preference);
      } catch {
        // 切换不依赖持久化成功。
      }
      applyTheme();
    });
    header.append(button);
    applyTheme();
    return true;
  };
  const observer = new MutationObserver(() => {
    if (installControl()) observer.disconnect();
  });
  if (!installControl())
    observer.observe(root, { childList: true, subtree: true });
})();

/* 保留既有主题偏好与系统跟随，不再向导航注入切换按钮。 */
(() => {
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let preference;
  try {
    const saved = localStorage.getItem('homepage-theme');
    if (saved === 'light' || saved === 'dark') preference = saved;
  } catch {
    // 禁止本地存储时跟随系统主题。
  }
  const currentTheme = () => preference || (system.matches ? 'dark' : 'light');
  const applyTheme = () => {
    const theme = currentTheme();
    root.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#111318' : '#f4f6f9');
  };
  applyTheme();
  system.addEventListener('change', applyTheme);
})();

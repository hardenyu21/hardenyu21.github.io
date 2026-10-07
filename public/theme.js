/* 全站固定浅色，不读取旧主题偏好或跟随系统。 */
(() => {
  document.documentElement.dataset.theme = 'light';
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', '#f4f6f9');
})();

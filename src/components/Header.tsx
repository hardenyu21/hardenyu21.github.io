import { useEffect, useState } from 'react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'News', href: '#news' },
  { label: 'Publications', href: '#publications' },
  // { label: 'Projects', href: '#projects' },
  { label: 'Profile', href: '#profile' },
  { label: 'Blog', href: '/blog/' },
];

type HeaderProps = {
  isHome?: boolean;
};

export function Header({ isHome = true }: HeaderProps) {
  const [overFilm, setOverFilm] = useState(isHome);

  useEffect(() => {
    if (!isHome) return;
    const hero = document.getElementById('top');
    if (!hero) return;
    // 只在离开封面时切换底色，不逐帧追踪滚动位置。
    const observer = new IntersectionObserver(
      ([entry]) => setOverFilm(entry.isIntersecting),
      { rootMargin: '-112px 0px 0px 0px' }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <header
      className={`site-header${isHome ? ' site-header--home' : ''}${overFilm ? ' site-header--over-film' : ''}`}
    >
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <a
        className="site-mark"
        href={isHome ? '#top' : '/'}
        aria-label={isHome ? 'Back to top' : 'Home'}
      >
        <img src="/profile/site-mark-nav.png" alt="" aria-hidden="true" />
        <span>
          Yu Huang<span className="site-mark-dot">.</span>
        </span>
      </a>
      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={
              !isHome && item.href.startsWith('#') ? `/${item.href}` : item.href
            }
            aria-current={!isHome && item.label === 'Blog' ? 'page' : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

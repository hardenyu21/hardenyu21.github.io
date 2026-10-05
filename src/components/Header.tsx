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
  return (
    <header className="site-header">
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
        {navItems.map((item, index) => (
          <a
            key={item.href}
            href={
              !isHome && item.href.startsWith('#') ? `/${item.href}` : item.href
            }
            aria-current={!isHome && item.label === 'Blog' ? 'page' : undefined}
          >
            <span className="nav-index" aria-hidden="true">
              0{index + 1}
            </span>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

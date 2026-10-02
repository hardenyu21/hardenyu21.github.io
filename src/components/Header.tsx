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
      <a className="site-mark" href={isHome ? '#top' : '/'} aria-label={isHome ? 'Back to top' : 'Home'}>
        <img src="/profile/site-mark-nav.png" alt="" aria-hidden="true" />
      </a>
      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={!isHome && item.href.startsWith('#') ? `/${item.href}` : item.href}
            aria-current={!isHome && item.label === 'Blog' ? 'page' : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

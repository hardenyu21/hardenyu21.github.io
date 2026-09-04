const navItems = [
  { label: 'About', href: '#about' },
  { label: 'News', href: '#news' },
  { label: 'Publications', href: '#publications' },
  // { label: 'Projects', href: '#projects' },
  { label: 'Profile', href: '#profile' },
];

export function Header() {
  return (
    <header className="site-header">
      <a className="site-mark" href="#top" aria-label="Back to top">
        <img src="/profile/site-mark-nav.png" alt="" aria-hidden="true" />
      </a>
      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

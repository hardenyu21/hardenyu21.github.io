const navItems = [
  { label: 'Publications', href: '#publications' },
  { label: 'Projects', href: '#projects' },
  { label: 'News', href: '#news' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
  return (
    <header className="site-header">
      <a className="site-mark" href="#top" aria-label="Back to top">
        HY
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

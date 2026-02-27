interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/" },
  { label: "Inventory", href: "/inventory" },
  { label: "Settings", href: "/settings" },
];

export const Navbar = () => {
  return (
    <nav className="nexus-nav" aria-label="Main Navigation">
      <div className="nav-logo">NEXUS</div>
      <ul className="nav-links" role="list">
        {NAV_ITEMS.map((item) => (
          <li key={item.label}>
            <a href={item.href} className="nav-link">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

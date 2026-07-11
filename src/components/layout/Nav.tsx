"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Search, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const navItems = [
  { label: "Review", href: "/review" },
  { label: "Lecture", href: "/research" },
  { label: "Doujin Lab", href: "/projects" },
  { label: "STS", href: "/tags" },
  { label: "Publication", href: "/publications" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/contact" },
];

interface NavProps {
  onSearchOpen?: () => void;
}

export function Nav({ onSearchOpen }: NavProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="page-wrap">
        <div className="site-header-inner">
        <Link href="/" className="flex items-center">
          <img src="/insns/logo-header.png" alt="INSNS" className="h-16 w-auto" />
        </Link>

          <nav>
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "nav-link",
                      pathname === item.href && "active"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={onSearchOpen}
                  className="nav-link"
                  aria-label="Search"
                >
                  <Search size={18} />
                </button>
              </li>
              <li>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="nav-link"
                  aria-label="Toggle theme"
                >
                  <Sun size={18} className="hidden dark:block" />
                  <Moon size={18} className="block dark:hidden" />
                </button>
              </li>
            </ul>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-nav-toggle"
            aria-label="Menu"
          >
            <div style={{ width: 20, height: 16, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <span style={{ display: "block", height: 2, background: "currentColor", transition: "transform 0.3s", transform: mobileOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
              <span style={{ display: "block", height: 2, background: "currentColor", transition: "opacity 0.3s", opacity: mobileOpen ? 0 : 1 }} />
              <span style={{ display: "block", height: 2, background: "currentColor", transition: "transform 0.3s", transform: mobileOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
            </div>
          </button>
        </div>

        {mobileOpen && (
          <nav style={{ paddingBottom: 16, borderTop: "1px solid var(--color-border-color)", paddingTop: 12 }}>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {navItems.map((item) => (
                <li key={item.href} style={{ marginBottom: 4 }}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "block",
                      padding: "6px 0",
                      fontSize: 15,
                      color: pathname === item.href ? "var(--color-primary)" : "inherit",
                      fontWeight: pathname === item.href ? 500 : 400,
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

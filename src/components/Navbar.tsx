"use client"; // needed for usePathname

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = { label: string; href: string };

// links are passed in, so both fellow and staff layouts can share this navbar
export default function Navbar({ links }: { links: NavLink[] }) {
  const pathname = usePathname(); // current URL, ex "/staff/fellows"

  // true if this link is the page we're on (for highlighting)
  const isActive = (href: string) => pathname === href || (href !== "/staff" && pathname.startsWith(href + "/"));

  return (
    <nav className="flex gap-4">
      {/* one link per item, highlighted if active */}
      {links.map((link) => (
        <Link key={link.href} href={link.href} className={isActive(link.href) ? "font-bold" : ""}>
          {link.label}
        </Link>
      ))}

      <Link href="/login">Log out</Link>
    </nav>
  );
}

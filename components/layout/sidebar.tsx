"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/" || pathname.startsWith("/posts/")
    }
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <aside
      className="hidden lg:block fixed left-0 top-0 h-full lg:w-40 bg-background z-50"
      data-sidebar-root
    >
      <nav className="flex flex-col p-6 space-y-2">
        <Link
          href="/"
          className={`text-3xl font-serif transition-colors font-bold ${
            isActive("/") ? "text-accent" : "text-foreground hover:text-[var(--hover-color)]"
          }`}
        >
          Posts
        </Link>
        <Link
          href="/about"
          className={`text-3xl font-serif transition-colors font-bold ${
            isActive("/about") ? "text-accent" : "text-foreground hover:text-[var(--hover-color)]"
          }`}
        >
          About
        </Link>
        <Link
          href="/library"
          className={`text-3xl font-serif transition-colors font-bold ${
            isActive("/library") ? "text-accent" : "text-foreground hover:text-[var(--hover-color)]"
          }`}
        >
          Library
        </Link>
        <Link
          href="/art"
          className={`text-3xl font-serif transition-colors font-bold ${
            isActive("/art") ? "text-accent" : "text-foreground hover:text-[var(--hover-color)]"
          }`}
        >
          Art
        </Link>
      </nav>
    </aside>
  )
}
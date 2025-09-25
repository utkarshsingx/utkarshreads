"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-32 bg-background border-r border-border z-50">
      <nav className="flex flex-col p-6 space-y-6">
        <Link
          href="/"
          className={`text-2xl font-serif transition-colors font-bold ${
            isActive("/") && !pathname.includes("/about") && !pathname.includes("/library")
              ? "text-accent"
              : "text-foreground hover:text-accent"
          }`}
        >
          Posts
        </Link>
        <Link
          href="/about"
          className={`text-2xl font-serif transition-colors font-bold ${
            isActive("/about") ? "text-accent" : "text-foreground hover:text-accent"
          }`}
        >
          About
        </Link>
        <Link
          href="/library"
          className={`text-2xl font-serif transition-colors font-bold ${
            isActive("/library") ? "text-accent" : "text-foreground hover:text-accent"
          }`}
        >
          Library
        </Link>
      </nav>
    </aside>
  )
}

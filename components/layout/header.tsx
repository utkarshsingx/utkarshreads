"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()

  const navigation = [
    { name: "Posts", href: "/" },
    { name: "About", href: "/about" },
    { name: "Gallery", href: "/art" },
    { name: "Library", href: "/library" },
  ]

  return (
    <header className="w-full py-4 lg:hidden">
      <div className="max-w-2xl mx-auto px-6">
        <nav className="flex items-center justify-center space-x-6">
          {navigation.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-lg transition-colors hover:text-[var(--hover-color)] ${
                  isActive ? "text-accent" : "text-foreground"
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
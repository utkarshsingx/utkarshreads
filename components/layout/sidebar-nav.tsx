"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "about", href: "/about" },
  { name: "posts", href: "/" },
  { name: "library", href: "/library" },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed left-8 top-1/2 -translate-y-1/2 hidden lg:block">
      <div className="space-y-6">
        {navigation.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "block text-lg font-medium transition-colors hover:text-accent",
                isActive ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {item.name}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

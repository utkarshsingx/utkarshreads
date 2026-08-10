"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCipher } from "@/components/providers/cipher-provider"
import { cipherModes, type CipherMode } from "@/lib/cipher"

type FooterLink = {
  label: string
  href: string
  external?: boolean
}

const footerLinks: FooterLink[] = [
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/art" },
  { label: "RSS", href: "/rss.xml" },
  { label: "Archive", href: "/archive" },
  { label: "Instagram", href: "https://instagram.com/utkarshsingx", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/utkarshsingx/", external: true },
  { label: "GitHub", href: "https://github.com/utkarshsingx/", external: true },
  { label: "YouTube", href: "https://www.youtube.com/@utkarshsingx", external: true },
]

export function Footer() {
  const { mode, setMode } = useCipher()
  const [isVisible, setIsVisible] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollPercentage = currentScrollY / (documentHeight - windowHeight)

      if (currentScrollY > lastScrollY && scrollPercentage > 0.5) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const totalLinks = footerLinks.length
  const firstRowCount =
    totalLinks < 5 ? totalLinks : totalLinks % 2 === 0 ? totalLinks / 2 + 1 : Math.ceil(totalLinks / 2)

  const firstRowLinks = footerLinks.slice(0, firstRowCount)
  const secondRowLinks = footerLinks.slice(firstRowCount)

  const renderLink = (link: FooterLink) =>
    link.external ? (
      <a
        key={link.label}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-accent transition-colors footer-link"
      >
        {link.label}
      </a>
    ) : (
      <Link key={link.label} href={link.href} className="hover:text-accent transition-colors footer-link">
        {link.label}
      </Link>
    )

  return (
    <footer className="mt-24 pt-12 pb-12">
      <div className="max-w-2xl mx-auto px-6">
        {/* Skipped by the cipher: whatever the rest of the page turns into,
            this control has to stay readable enough to switch back. */}
        <div className="mb-8" data-cipher-skip>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <span className="text-muted-foreground">Language:</span>
            <Select value={mode} onValueChange={(value) => setMode(value as CipherMode)}>
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              {/* Portals out to <body>, so it needs its own marker. */}
              <SelectContent data-cipher-skip>
                {cipherModes.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="text-sm text-[var(--footer-link)] text-center space-y-1 footer-text">
          <div className="flex justify-center gap-x-4">{firstRowLinks.map(renderLink)}</div>
          {secondRowLinks.length > 0 && (
            <div className="flex justify-center gap-x-4">{secondRowLinks.map(renderLink)}</div>
          )}
        </div>

        <div className="flex justify-center mt-32 mb-32">
          <div
            className={`transition-all duration-700 ease-out ${
              isVisible ? "transform translate-y-0 opacity-100" : "transform translate-y-8 opacity-0"
            }`}
          >
            <Image src="/images/footer_love.png" alt="Love" width={96} height={96} className="w-24 h-24" />
          </div>
        </div>

      </div>
    </footer>
  )
}
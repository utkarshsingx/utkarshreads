"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

export function Footer() {
  const [selectedLanguage, setSelectedLanguage] = useState("all")
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

  return (
    <footer className="mt-24 pt-12 pb-12">
      <div className="max-w-2xl mx-auto px-6">
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 text-sm">
            <span className="text-muted-foreground">Language:</span>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="All selected" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-[var(--footer-link)] text-center">
          <Link href="/about" className="hover:text-accent transition-colors">
            About
          </Link>
          <a href="/rss.xml" className="hover:text-accent transition-colors">
            RSS
          </a>
          <Link href="/archive" className="hover:text-accent transition-colors">
            Archive
          </Link>
          <a
            href="https://instagram.com/utkarshsingx"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/in/utkarshsingx/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/utkarshsingx/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            GitHub
          </a>
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
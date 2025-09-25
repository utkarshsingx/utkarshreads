"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

export function Footer() {
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Show animation when user scrolls past 50% of the page
      const scrollPercentage = scrollPosition / (documentHeight - windowHeight)
      setIsVisible(scrollPercentage > 0.5)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <footer className="ml-32 mt-16 pt-12 pb-8">
      <div className="max-w-2xl mx-auto px-6">
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 text-sm">
            <span className="text-muted-foreground">Language:</span>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All selected" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All selected</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <div
            className={`transition-all duration-700 ease-out ${
              isVisible ? "transform translate-y-0 opacity-100" : "transform translate-y-8 opacity-0"
            }`}
          >
            <Image src="/images/footer_love.png" alt="Love" width={96} height={96} className="w-24 h-24" />
          </div>
        </div>

        <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
          <Link href="/about" className="hover:text-accent transition-colors">
            About
          </Link>
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
            href="https://linkedin.com/utkarshsingx"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}

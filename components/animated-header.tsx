"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface AnimatedHeaderProps {
  imageSrc: string
  alt: string
}

export function AnimatedHeader({ imageSrc, alt }: AnimatedHeaderProps) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate scale and opacity based on scroll position
  const scale = Math.max(0.5, 1 - scrollY * 0.002)
  const opacity = Math.max(0.3, 1 - scrollY * 0.003)

  return (
    <div className="flex justify-center mb-12">
      <div
        className="transition-all duration-300 ease-out"
        style={{
          transform: `scale(${scale})`,
          opacity: opacity,
        }}
      >
        <Image src={imageSrc || "/placeholder.svg"} alt={alt} width={120} height={120} className="w-30 h-30" />
      </div>
    </div>
  )
}

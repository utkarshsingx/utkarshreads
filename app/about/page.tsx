"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { AnimatedHeader } from "@/components/animated-header"
import { Header } from "@/components/layout/header"

const firstVideoUrl = "https://res.cloudinary.com/dawxgroba/video/upload/Yahaha_You_found_me__720p_byjzir.mp4"
const secondVideoUrl = "https://res.cloudinary.com/dawxgroba/video/upload/computer_xymbuo.mp4"

export default function AboutPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const originalStyles = useRef<{
    bodyBackground: string
    rootBackground?: string
    sidebarBackground?: string
  }>()

  useEffect(() => {
    const video = videoRef.current
    if (!video || !isVideoPlaying) return

    const playPromise = video.play()
    if (playPromise) {
      playPromise.catch(() => {
        setIsMuted(true)
        video.play()
      })
    }
  }, [isVideoPlaying, currentVideoUrl])

  useEffect(() => {
    const rootContainer = document.querySelector<HTMLElement>("body > div")
    const sidebar = document.querySelector<HTMLElement>("[data-sidebar-root]")
    const html = document.documentElement

    if (!originalStyles.current) {
      originalStyles.current = {
        bodyBackground: document.body.style.backgroundColor || "#100f0f",
        rootBackground: rootContainer?.style.backgroundColor || "#100f0f",
        sidebarBackground: sidebar?.style.backgroundColor || "#100f0f",
      }
    }

    if (isVideoPlaying && !isFadingOut) {
      // Set to transparent only when video is loaded and visible
      if (videoLoaded) {
        document.body.style.backgroundColor = "transparent"
        if (rootContainer) {
          rootContainer.style.backgroundColor = "transparent"
        }
        if (sidebar) {
          sidebar.style.backgroundColor = "transparent"
        }
        html.classList.add("post-video-mode-light")
        html.classList.remove("post-video-mode-dark")
      } else {
        // Keep original dark background while video is loading
        document.body.style.backgroundColor = originalStyles.current.bodyBackground
        if (rootContainer) {
          rootContainer.style.backgroundColor = originalStyles.current.rootBackground ?? "#100f0f"
        }
        if (sidebar) {
          sidebar.style.backgroundColor = originalStyles.current.sidebarBackground ?? "#100f0f"
        }
      }
    } else {
      // Restore original background immediately when fading out or not playing
      document.body.style.backgroundColor = originalStyles.current.bodyBackground
      if (rootContainer) {
        rootContainer.style.backgroundColor = originalStyles.current.rootBackground ?? "#100f0f"
      }
      if (sidebar) {
        sidebar.style.backgroundColor = originalStyles.current.sidebarBackground ?? "#100f0f"
      }
      html.classList.remove("post-video-mode-light", "post-video-mode-dark")
    }

    return () => {
      if (!originalStyles.current) return
      document.body.style.backgroundColor = originalStyles.current.bodyBackground
      if (rootContainer) {
        rootContainer.style.backgroundColor = originalStyles.current.rootBackground ?? "#100f0f"
      }
      if (sidebar) {
        sidebar.style.backgroundColor = originalStyles.current.sidebarBackground ?? "#100f0f"
      }
      html.classList.remove("post-video-mode-light", "post-video-mode-dark")
    }
  }, [isVideoPlaying, videoLoaded, isFadingOut])

  const handleVideoClick = (e: React.MouseEvent<HTMLAnchorElement>, videoUrl: string) => {
    e.preventDefault()
    setIsFadingOut(false)
    setCurrentVideoUrl(videoUrl)
    setIsVideoPlaying(true)
    setIsMuted(false)
    setVideoLoaded(false)
  }

  const handleVideoEnd = () => {
    setIsFadingOut(true)
    setTimeout(() => {
      setIsVideoPlaying(false)
      setVideoLoaded(false)
      setIsMuted(true)
      setIsFadingOut(false)
      setCurrentVideoUrl(null)
    }, 500)
  }

  const handleVideoLoaded = () => {
    setVideoLoaded(true)
  }

  return (
    <div className="relative min-h-screen">
      {isVideoPlaying && currentVideoUrl && (
        <>
          <video
            ref={videoRef}
            key={currentVideoUrl}
            className={`fixed inset-0 h-full w-full object-cover -z-10 transition-opacity duration-500 ${
              isFadingOut ? "opacity-0" : videoLoaded ? "opacity-100" : "opacity-0"
            }`}
            src={currentVideoUrl}
            autoPlay
            playsInline
            muted={isMuted}
            onLoadedData={handleVideoLoaded}
            onEnded={handleVideoEnd}
          />
          {videoLoaded && (
            <div
              className={`fixed inset-0 -z-10 pointer-events-none bg-black/35 transition-opacity duration-500 ${
                isFadingOut ? "opacity-0" : "opacity-100"
              }`}
              aria-hidden="true"
            />
          )}
        </>
      )}

      <div className="relative z-10 space-y-8">
        <AnimatedHeader imageSrc="/images/header_laptop.png" alt="About Header" />
        <Header />

        <div className="prose prose-lg mx-auto text-left">
          <h1 className="text-3xl text-balance mt-24 mb-12">About</h1>

          <div className="text-left space-y-10 text-lg">
            <p>
              <a
                href="#"
                onClick={(e) => handleVideoClick(e, firstVideoUrl)}
                className="text-foreground underline hover:text-accent cursor-pointer"
              >
                Yahaha, you found me!
              </a>{" "}
              I'm Utkarsh Singh, a designer and developer for digital products, an artist in real life.
            </p>

            <p>
              Beyond my artistic focus, I have equal fascination towards music, philosophy,
              literature, poems, novels, technology, creative content, and psychology.
            </p>

            <p>
              Some takes on life: time is not rigid, rest till you feel guilty and then rest a bit
              more, sunscreen always works, stretch, electrolytes are essential while fasting, pain
              ≠ great art, great art = repetition, be kind, be observant.
            </p>

            <p>
              Only goal for the year: consume less media, more music, and clothing. and go for that
              42.195.
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-normal mt-8 mb-4">Seasonal Suggestions:</h2>

              <p>
                Article you should read:{" "}
                <a
                  href="https://thecreativeindependent.com/people/bjork-on-nature-and-technology/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline hover:text-accent"
                >
                  Björk on nature and technology
                </a>
              </p>

              <p>
                Video you should watch:{" "}
                <a
                  href="https://www.youtube.com/watch?v=L2EO3aXTWwg&list=LL&index=5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline hover:text-accent"
                >
                  Patti Smith Interview | Advice to the Young
                </a>
              </p>

              <p>
                Book you should read:{" "}
                <a
                  href="https://www.goodreads.com/book/show/105818665-gunahon-ka-devta-gunaho-ka-devta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline hover:text-accent"
                >
                  Gunahon Ka Devta
                </a>
              </p>
            </div>

            <div className="space-y-4">
              <p>Anyway, here's a quote I love from Simone Weil:</p>
              <blockquote>
                <p>
                  "I also am other than what I imagine myself to be.
                   To know this is forgiveness."
                </p>
              </blockquote>
            </div>

            <p>
              This blog is the corner of the internet in which I share my thoughts.{" "}
              <a
                href="#"
                onClick={(e) => handleVideoClick(e, secondVideoUrl)}
                className="text-foreground underline hover:text-accent cursor-pointer"
              >
                Why did I make it?
              </a>{" "}
              So that's it. That's the whole concept.
            </p>

            <div className="flex flex-col items-start">
              <img
                src="/images/itsme.png"
                alt="Utkarsh Singh"
                className="w-full h-auto rounded-lg"
              />
              <p className="text-left">This is my face and main character Roxy's whole body :p</p>
            </div>

            <p>
              That is all for now. I'll add more stuff with time. Also, hit me up on instagram if
              you want some therapy sessions. Cache you later.
            </p>
          </div>
        </div>

        <div className="text-center space-y-4 pt-8">
          <div className="flex justify-center space-x-6 text-sm">
            <a
              href="https://bento.me/utkarshsingx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              Bento
            </a>
            <a
              href="mailto:utkarshsingx@gmail.com"
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              Email
            </a>
            <a
              href="https://x.com/utkarshsingx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

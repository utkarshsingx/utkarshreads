"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import type { PostData } from "@/lib/content"
import { AnimatedHeader } from "@/components/animated-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/layout/header"

interface PostPageViewProps {
  post: PostData
}

export function PostPageView({ post }: PostPageViewProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const originalStyles = useRef<{
    bodyBackground: string
    rootBackground?: string
    sidebarBackground?: string
  }>()

  const formattedDate = useMemo(
    () =>
      new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    [post.date],
  )

  const backgroundSrc = useMemo(() => {
    if (!post.backgroundVideo) {
      return null
    }
    try {
      return encodeURI(post.backgroundVideo)
    } catch (error) {
      return post.backgroundVideo
    }
  }, [post.backgroundVideo])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = isMuted
    const playPromise = video.play()
    if (playPromise && !isMuted) {
      playPromise.catch(() => {
        setIsMuted(true)
      })
    }
  }, [isMuted, videoLoaded])

  useEffect(() => {
    if (!backgroundSrc || videoFailed) {
      setIsMuted(true)
    } else if (videoLoaded) {
      setIsMuted(false)
    }
    const rootContainer = document.querySelector<HTMLElement>("body > div")
    const sidebar = document.querySelector<HTMLElement>("[data-sidebar-root]")
    const html = document.documentElement

    if (!originalStyles.current) {
      originalStyles.current = {
        bodyBackground: document.body.style.backgroundColor,
        rootBackground: rootContainer?.style.backgroundColor,
        sidebarBackground: sidebar?.style.backgroundColor,
      }
    }

    const restore = () => {
      if (!originalStyles.current) {
        return
      }
      document.body.style.backgroundColor = originalStyles.current.bodyBackground
      if (rootContainer) {
        rootContainer.style.backgroundColor = originalStyles.current.rootBackground ?? ""
      }
      if (sidebar) {
        sidebar.style.backgroundColor = originalStyles.current.sidebarBackground ?? ""
      }
      html.classList.remove("post-video-mode-light", "post-video-mode-dark")
    }

    if (backgroundSrc && !videoFailed) {
      document.body.style.backgroundColor = "transparent"
      if (rootContainer) {
        rootContainer.style.backgroundColor = "transparent"
      }
      if (sidebar) {
        sidebar.style.backgroundColor = "transparent"
      }
      if (post.textTone === "light") {
        html.classList.add("post-video-mode-light")
        html.classList.remove("post-video-mode-dark")
      } else {
        html.classList.add("post-video-mode-dark")
        html.classList.remove("post-video-mode-light")
      }
    } else {
      restore()
    }

    return () => {
      restore()
    }
  }, [backgroundSrc, post.textTone, videoLoaded, videoFailed])

  useEffect(() => {
    setVideoFailed(false)
    setVideoLoaded(false)
  }, [post.backgroundVideo])

  const handleToggleSound = () => {
    setIsMuted((prev) => !prev)
  }

  return (
    <div className="relative min-h-screen">
      {backgroundSrc && !videoFailed && (
        <>
          <video
            ref={videoRef}
            className="fixed inset-0 h-full w-full object-cover -z-10"
            src={backgroundSrc}
            autoPlay
            loop
            playsInline
            muted={isMuted}
            onLoadedData={() => {
              setVideoLoaded(true)
              setIsMuted(false)
            }}
            onError={() => {
              setVideoLoaded(false)
              setVideoFailed(true)
            }}
          />
          {videoLoaded && (
            <div
              className="fixed inset-0 -z-10 pointer-events-none bg-black/35"
              aria-hidden="true"
            />
          )}
        </>
      )}

      <div className="relative z-10">
        <div className="max-w-3xl mx-auto px-6">
          <Header />

          <div className="relative mb-8">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="mb-6 mt-12 hover:bg-transparent hover:text-foreground hover:underline"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Posts
              </Button>
            </Link>

            {backgroundSrc && !videoFailed && (
              <div className="flex justify-center mb-6">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleToggleSound}
                  className="rounded-full px-6 py-2 text-sm font-medium bg-white/8 border border-white/20 text-white backdrop-blur-sm hover:bg-white/12 transition-all"
                >
                  {isMuted ? "Sound On" : "Sound Off"}
                </Button>
              </div>
            )}

            <h1 className="text-3xl text-balance mt-6 mb-18 text-center">{post.title}</h1>
          </div>

          <article className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>

          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-full border border-white/20 bg-white/8 text-white px-4 py-1 text-sm font-medium backdrop-blur-sm"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="text-center text-sm text-muted-foreground mt-4">
            <time dateTime={post.date}>{formattedDate}</time>
          </div>
        </div>
      </div>
    </div>
  )
}

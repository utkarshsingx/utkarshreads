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
    if (videoRef.current) {
      videoRef.current.muted = isMuted
    }
  }, [isMuted])

  useEffect(() => {
    const originalBodyBg = document.body.style.backgroundColor
    const rootContainer = document.querySelector<HTMLElement>("body > div")
    const sidebar = document.querySelector<HTMLElement>("[data-sidebar-root]")
    const originalRootBg = rootContainer?.style.backgroundColor
    const originalSidebarBg = sidebar?.style.backgroundColor
    const html = document.documentElement

    if (videoLoaded) {
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
    }

    return () => {
      document.body.style.backgroundColor = originalBodyBg
      if (rootContainer) {
        rootContainer.style.backgroundColor = originalRootBg ?? ""
      }
      if (sidebar) {
        sidebar.style.backgroundColor = originalSidebarBg ?? ""
      }
      html.classList.remove("post-video-mode-light", "post-video-mode-dark")
    }
  }, [post.textTone, videoLoaded])

  const handleToggleSound = () => {
    setIsMuted((prev) => !prev)
  }

  return (
    <div className="relative min-h-screen">
      {backgroundSrc && (
        <>
          <video
            ref={videoRef}
            className="fixed inset-0 h-full w-full object-cover -z-10"
            src={backgroundSrc}
            autoPlay
            loop
            playsInline
            muted={isMuted}
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoLoaded(false)}
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
            <h1 className="text-3xl text-balance mt-24 mb-12 text-center">{post.title}</h1>
            {backgroundSrc && (
              <div className="flex justify-center">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleToggleSound}
                  className="hover:opacity-80 bg-transparent border border-white/40 text-white"
                >
                  {isMuted ? "Sound On" : "Sound Off"}
                </Button>
              </div>
            )}
          </div>

          <article className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>

          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-transparent border border-white/30 text-white"
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

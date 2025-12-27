"use client"

import { useEffect, useState, useRef } from "react"
import type { SyncedLyric } from "@/lib/content"

interface SyncedLyricsProps {
  videoRef: React.RefObject<HTMLVideoElement>
  lyrics: SyncedLyric[]
}

/**
 * Converts time string (MM:SS or M:SS) to seconds
 */
function timeToSeconds(time: string): number {
  const parts = time.split(":")
  if (parts.length !== 2) return 0
  const minutes = parseInt(parts[0], 10) || 0
  const seconds = parseFloat(parts[1]) || 0
  return minutes * 60 + seconds
}

/**
 * Hook to track the currently active lyric based on video playback time
 */
export function useSyncedLyrics(
  videoRef: React.RefObject<HTMLVideoElement>,
  lyrics: SyncedLyric[]
) {
  const [activeLyricId, setActiveLyricId] = useState<number | null>(null)
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    if (!videoRef.current || lyrics.length === 0) {
      setActiveLyricId(null)
      return
    }

    const video = videoRef.current

    const updateActiveLyric = () => {
      if (!video) return

      const currentTime = video.currentTime
      
      let activeId: number | null = null
      
      for (let i = lyrics.length - 1; i >= 0; i--) {
        const lyricTime = timeToSeconds(lyrics[i].time)
        if (currentTime >= lyricTime) {
          const nextLyricTime = i < lyrics.length - 1 
            ? timeToSeconds(lyrics[i + 1].time)
            : Infinity
          
          if (currentTime < nextLyricTime || i === lyrics.length - 1) {
            activeId = i
            break
          }
        }
      }

      setActiveLyricId(activeId)
      animationFrameRef.current = requestAnimationFrame(updateActiveLyric)
    }

    const handleTimeUpdate = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      animationFrameRef.current = requestAnimationFrame(updateActiveLyric)
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("play", handleTimeUpdate)
    video.addEventListener("pause", handleTimeUpdate)

    updateActiveLyric()

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("play", handleTimeUpdate)
      video.removeEventListener("pause", handleTimeUpdate)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [videoRef, lyrics])

  useEffect(() => {
    if (activeLyricId === null) {
      document.querySelectorAll(".synced-lyric").forEach((el) => {
        el.classList.remove("lyric-active")
      })
      return
    }

    document.querySelectorAll(".synced-lyric").forEach((el) => {
      el.classList.remove("lyric-active")
    })

    const activeElement = document.querySelector(
      `.synced-lyric[data-lyric-id="${activeLyricId}"]`
    )
    if (activeElement) {
      activeElement.classList.add("lyric-active")
      const rect = activeElement.getBoundingClientRect()
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight
      if (!isVisible) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }
    }
  }, [activeLyricId])

  return activeLyricId
}

/**
 * Component that syncs lyrics with video playback
 * This component doesn't render anything but manages the sync logic
 */
export function SyncedLyrics({ videoRef, lyrics }: SyncedLyricsProps) {
  useSyncedLyrics(videoRef, lyrics)
  return null
}


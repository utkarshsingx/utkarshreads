"use client"

import Link from "next/link"
import type { Artwork } from "@/lib/art"

interface ArtGridProps {
  artworks: Artwork[]
}

export function ArtGrid({ artworks }: ArtGridProps) {
  return (
    <div className="art-grid grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2">
      {artworks.map((artwork, index) => (
        <Link
          key={artwork.slug}
          href={`/art/${artwork.slug}`}
          className="art-tile group"
          style={{ animationDelay: `${index * 60}ms` }}
          aria-label={`${artwork.title} — ${artwork.year}`}
        >
          <img
            src={artwork.image}
            alt={artwork.title}
            loading={index < 6 ? "eager" : "lazy"}
            className="art-tile-image"
          />

          <span className="art-tile-scan" aria-hidden="true" />
          <span className="art-tile-frame" aria-hidden="true" />

          <span className="art-tile-veil">
            <span className="art-tile-memory">{artwork.memory}</span>
            <span className="art-tile-meta">
              {artwork.title} · {artwork.year}
            </span>
          </span>
        </Link>
      ))}
    </div>
  )
}

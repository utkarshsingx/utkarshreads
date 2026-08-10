import type { Metadata } from "next"
import { artworks } from "@/lib/art"
import { ArtGrid } from "@/components/art/art-grid"
import { AnimatedHeader } from "@/components/animated-header"
import { Header } from "@/components/layout/header"

export const metadata: Metadata = {
  title: "Art — utkarshreads",
  description: "Handmade drawings, and the memory attached to each one.",
}

export default function ArtPage() {
  return (
    <div className="space-y-8">
      <AnimatedHeader imageSrc="/images/header_blank.png" alt="Art Header" />
      <Header />

      <div className="mt-24 mb-12">
        <h1 className="text-3xl text-balance mb-4">Art</h1>
        <p className="text-base" style={{ color: "var(--muted-text)" }}>
          Everything here was made by hand, mostly with a 0.5mm pencil at odd hours. Each piece has
          a memory attached to it — hover one to catch a glimpse, open it to read the rest.
        </p>
      </div>

      {/* Break out of the narrow reading column so the grid can breathe. */}
      <div className="lg:-mx-24">
        <ArtGrid artworks={artworks} />
      </div>

      <p className="pt-8 text-sm text-center" style={{ color: "var(--muted-text)" }}>
        {artworks.length} pieces. More as I make them.
      </p>
    </div>
  )
}

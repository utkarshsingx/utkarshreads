import type { Metadata } from "next"
import { artworks } from "@/lib/art"
import { ArtGrid } from "@/components/art/art-grid"
import { AnimatedHeader } from "@/components/animated-header"
import { Header } from "@/components/layout/header"

export const metadata: Metadata = {
  title: "Art Gallery — utkarshreads",
  description: "Handmade drawings, and the memory attached to each one.",
}

export default function ArtPage() {
  return (
    <div className="space-y-8">
      <AnimatedHeader imageSrc="/images/header_blank.png" alt="Art Header" />
      <Header />

      <h1 className="text-3xl text-balance mt-24 mb-12">Art Gallery</h1>

      {/* Break out of the narrow reading column so the grid can breathe. */}
      <div className="lg:-mx-24">
        <ArtGrid artworks={artworks} />
      </div>
    </div>
  )
}

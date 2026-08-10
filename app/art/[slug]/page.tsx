import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { artworks, getAdjacentArtworks, getArtworkBySlug } from "@/lib/art"
import { AnimatedHeader } from "@/components/animated-header"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"

interface ArtworkPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return artworks.map((artwork) => ({ slug: artwork.slug }))
}

export async function generateMetadata({ params }: ArtworkPageProps): Promise<Metadata> {
  const { slug } = await params
  const artwork = getArtworkBySlug(slug)

  if (!artwork) return { title: "Art Gallery — utkarshreads" }

  return {
    title: `${artwork.title} — utkarshreads`,
    description: artwork.memory,
    openGraph: {
      title: artwork.title,
      description: artwork.memory,
      images: [artwork.image],
    },
  }
}

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const { slug } = await params
  const artwork = getArtworkBySlug(slug)

  if (!artwork) {
    notFound()
  }

  const { previous, next } = getAdjacentArtworks(slug)

  return (
    <div className="space-y-8">
      <AnimatedHeader imageSrc="/images/header_blank.png" alt="Art Header" />
      <Header />

      <div className="mt-24">
        <Link
          href="/art"
          className="text-sm hover:text-accent transition-colors"
          style={{ color: "var(--muted-text)" }}
        >
          ← Gallery
        </Link>

        <h1 className="text-3xl text-balance mt-6 mb-3">{artwork.title}</h1>

        <p className="text-sm mb-10" style={{ color: "var(--muted-text)" }}>
          {artwork.medium} · {artwork.year}
        </p>
      </div>

      {/* Break out of the narrow reading column so the piece is actually visible. */}
      <div className="lg:-mx-24">
        <img
          src={artwork.image}
          alt={artwork.title}
          className="w-full h-auto rounded-sm"
        />
      </div>

      <blockquote className="art-detail-memory">{artwork.memory}</blockquote>

      <article className="prose prose-lg text-left">
        {artwork.story.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </article>

      <nav className="flex items-start justify-between gap-6 pt-8 border-t border-[var(--divider-color)]">
        <div className="flex-1">
          {previous && (
            <Link href={`/art/${previous.slug}`} className="group block">
              <span className="block text-xs uppercase tracking-widest" style={{ color: "var(--muted-text)" }}>
                Previous
              </span>
              <span className="block mt-1 group-hover:text-accent transition-colors">
                {previous.title}
              </span>
            </Link>
          )}
        </div>
        <div className="flex-1 text-right">
          {next && (
            <Link href={`/art/${next.slug}`} className="group block">
              <span className="block text-xs uppercase tracking-widest" style={{ color: "var(--muted-text)" }}>
                Next
              </span>
              <span className="block mt-1 group-hover:text-accent transition-colors">{next.title}</span>
            </Link>
          )}
        </div>
      </nav>

      <div className="flex justify-center pt-4">
        <Link href="/art">
          <Button variant="ghost" size="sm" className="hover:bg-transparent hover:text-foreground hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Button>
        </Link>
      </div>
    </div>
  )
}

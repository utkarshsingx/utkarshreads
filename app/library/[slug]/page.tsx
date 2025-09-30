import { getBookBySlug, getAllBooks } from "@/lib/content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { AnimatedHeader } from "@/components/animated-header"

interface BookPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const books = await getAllBooks()
  return books.map((book) => ({
    slug: book.slug,
  }))
}

export default async function BookPage({ params }: BookPageProps) {
  const { slug } = await params
  const book = await getBookBySlug(slug)

  if (!book) {
    notFound()
  }

  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // Full star
        stars.push(<span key={`star-full-${i}`} className="text-2xl text-foreground">★</span>)
      } else if (i - 0.5 <= rating) {
        // Half star
        stars.push(
          <span key={`star-half-${i}`} className="text-2xl relative text-muted-foreground">
            ★
            <span className="absolute top-0 left-0 w-1/2 overflow-hidden text-foreground">
              ★
            </span>
          </span>
        )
      } else {
        // Empty star
        stars.push(<span key={`star-empty-${i}`} className="text-2xl text-muted-foreground">★</span>)
      }
    }
    return <div className="flex items-center">{stars}</div>
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <AnimatedHeader imageSrc="/images/header_books.png" alt="Library Header" />

        <div className="flex flex-col items-center text-center">
          <div className="aspect-[3/4] relative w-[200px] overflow-hidden rounded-lg mb-6">
            <Image
              src={book.cover || "/placeholder.svg?height=400&width=300"}
              alt={`Cover of ${book.title}`}
              fill
              className="object-cover"
            />
          </div>

          <h1 className="text-[28px] font-normal text-balance mt-8 mb-8">{book.title}</h1>

          <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-2 text-muted-foreground mb-8">
            <Link 
              href={`/library/author/author:${book.author.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-foreground hover:text-[var(--muted-text)] hover:underline transition-all duration-200 cursor-pointer"
            >
              {book.author}
            </Link>
            <div className="flex flex-wrap gap-2">
              {book.genre.map((genre) => (
                <Link 
                  key={genre} 
                  href={`/library/genre/genre:${genre.toLowerCase().replace(/\s+/g, "-")}`}
                  className="hover:opacity-80 transition-opacity"
                >
                  <Badge variant="secondary" className="cursor-pointer hover:bg-accent">
                    {genre}
                  </Badge>
                </Link>
              ))}
            </div>
            {renderStars(book.rating)}
          </div>

          <hr className="w-full my-8 border-border" />

          <article className="prose prose-lg max-w-none text-left">
            <div dangerouslySetInnerHTML={{ __html: book.content }} />
          </article>

          <div className="w-full flex justify-center mt-12">
            <Link href="/library">
              <Button variant="ghost" size="sm" className="hover:bg-transparent hover:text-foreground hover:underline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Library
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
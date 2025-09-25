import { getBookBySlug, getAllBooks } from "@/lib/content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

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

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/library">
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Library
            </Button>
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-[300px_1fr]">
          <div className="space-y-6">
            <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
              <Image
                src={book.cover || "/placeholder.svg?height=400&width=300"}
                alt={`Cover of ${book.title}`}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-balance">{book.title}</h1>
                <p className="text-lg text-muted-foreground">by {book.author}</p>
                <p className="text-sm text-muted-foreground">{book.year}</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < book.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({book.rating}/5)</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {book.genre.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <article className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: book.content }} />
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}

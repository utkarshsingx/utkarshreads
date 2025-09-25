import { getAllBooks, getBooksByGenre, getAllGenres } from "@/lib/content"
import { LibraryList } from "@/components/library/library-list"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface GenrePageProps {
  params: Promise<{ genre: string }>
}

export async function generateStaticParams() {
  const books = await getAllBooks()
  const genres = getAllGenres(books)
  return genres.map((genre) => ({
    genre: `genre:${genre.toLowerCase().replace(/\s+/g, "-")}`,
  }))
}

export default async function GenrePage({ params }: GenrePageProps) {
  const { genre: genreParam } = await params
  const books = await getAllBooks()
  const allGenres = getAllGenres(books)

  const genreSlug = genreParam.replace("genre:", "")
  const genre = allGenres.find((g) => g.toLowerCase().replace(/\s+/g, "-") === genreSlug)

  if (!genre) {
    notFound()
  }

  const genreBooks = getBooksByGenre(books, genre)

  // Group books by year
  const booksByYear = genreBooks.reduce(
    (acc, book) => {
      if (!acc[book.year]) {
        acc[book.year] = []
      }
      acc[book.year].push(book)
      return acc
    },
    {} as Record<number, typeof genreBooks>,
  )

  const years = Object.keys(booksByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Link href="/library">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Library
          </Button>
        </Link>

        <h1 className="text-2xl font-heading font-normal mb-6">Books about {genre}</h1>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {allGenres.map((g) => (
            <Link
              key={g}
              href={g === genre ? "/library" : `/library/genre:${g.toLowerCase().replace(/\s+/g, "-")}`}
              className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                g === genre
                  ? "bg-accent text-accent-foreground border-accent"
                  : "border-border hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {g}
            </Link>
          ))}
        </div>
      </div>

      <LibraryList booksByYear={booksByYear} years={years} />
    </div>
  )
}

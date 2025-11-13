import { getAllBooks, getAllGenres } from "@/lib/content"
import { LibraryList } from "@/components/library/library-list"
import { AnimatedHeader } from "@/components/animated-header"
import { Header } from "@/components/layout/header" 
import Link from "next/link"

export default async function LibraryPage() {
  const books = await getAllBooks()
  const genres = getAllGenres(books)
  const hasBooks = books.length > 0

  // Group books by year
  const booksByYear = books.reduce(
    (acc, book) => {
      if (!acc[book.year]) {
        acc[book.year] = []
      }
      acc[book.year].push(book)
      return acc
    },
    {} as Record<number, typeof books>,
  )

  const years = Object.keys(booksByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <div className="space-y-8">
      <AnimatedHeader imageSrc="/images/header_books.png" alt="Library Header" />
      <Header /> 

      <div className="text-center">
        <h1 className="text-3xl text-balance mt-24 mb-12 text-left">Library</h1>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {genres.map((genre) => (
            <Link
              key={genre}
              href={`/library/genre/genre:${genre.toLowerCase().replace(/\s+/g, "-")}`}
              className="px-3 py-1 text-sm rounded-full border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {genre}
            </Link>
          ))}
        </div>
      </div>

      {hasBooks ? (
        <LibraryList booksByYear={booksByYear} years={years} />
      ) : (
        <p className="text-center text-sm md:text-base" style={{ color: 'var(--muted-text)' }}>
          hold up eager one! let the author read and then he'll share you his thoughts. thanks for being patient. :)
        </p>
      )}
    </div>
  )
}

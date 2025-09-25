"use client"
import type { BookData } from "@/lib/content"
import Link from "next/link"

interface LibraryListProps {
  booksByYear: Record<number, BookData[]>
  years: number[]
}

export function LibraryList({ booksByYear, years }: LibraryListProps) {
  const getGenreColor = (genre: string) => {
    const colors = {
      "Science Fiction": "bg-blue-500/20 text-blue-300",
      "Non-fiction": "bg-green-500/20 text-green-300",
      Philosophy: "bg-purple-500/20 text-purple-300",
      Technology: "bg-orange-500/20 text-orange-300",
      Biography: "bg-pink-500/20 text-pink-300",
      Fiction: "bg-gray-500/20 text-gray-300",
      "Self-Help": "bg-yellow-500/20 text-yellow-300",
      Business: "bg-indigo-500/20 text-indigo-300",
      Productivity: "bg-teal-500/20 text-teal-300",
      Thriller: "bg-red-500/20 text-red-300",
    }
    return colors[genre as keyof typeof colors] || "bg-gray-500/20 text-gray-300"
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-accent" : "text-muted-foreground"}>
        ★
      </span>
    ))
  }

  return (
    <div className="space-y-8">
      {years.map((year) => (
        <section key={year} className="space-y-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-heading font-normal">{year}</h2>
          </div>

          <div className="space-y-2">
            {booksByYear[year].map((book) => (
              <div key={book.slug} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <Link
                    href={`/library/${book.slug}`}
                    className="font-serif text-foreground hover:text-accent transition-colors"
                  >
                    {book.title}
                  </Link>
                  <div className="flex flex-wrap gap-1">
                    {book.genre.map((genre) => (
                      <span key={genre} className={`px-2 py-0.5 rounded text-xs font-sans ${getGenreColor(genre)}`}>
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-1">{renderStars(book.rating)}</div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

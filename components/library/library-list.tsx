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
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // Full star
        stars.push(<span key={`star-full-${i}`} style={{ color: 'var(--foreground)' }}>★</span>);
      } else if (i - 0.5 <= rating) {
        // Half star
        stars.push(
          <span key={`star-half-${i}`} className="relative" style={{ color: 'var(--muted-text)' }}>
            ★
            <span className="absolute top-0 left-0 w-1/2 overflow-hidden" style={{ color: 'var(--foreground)' }}>
              ★
            </span>
          </span>
        );
      } else {
        // Empty star
        stars.push(<span key={`star-empty-${i}`} style={{ color: 'var(--muted-text)' }}>★</span>);
      }
    }
    return stars;
  };

  return (
    <div className="space-y-8">
      {years.map((year) => (
        <section key={year} className="space-y-4">
          <div className="flex items-center space-x-2">
            <h2 className="font-heading font-normal" style={{ color: 'var(--year-heading)', fontSize: '21px' }}>{year}</h2>
            <div className="flex items-center justify-center w-5 h-5 rounded-full" style={{ backgroundColor: 'var(--divider-color)' }}>
              <span className="text-[10px] font-bold" style={{ color: 'var(--year-heading)' }}>
                {booksByYear[year].length}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {booksByYear[year].map((book, index) => (
              <div key={book.slug}>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <Link
                      href={`/library/${book.slug}`}
                      className="font-serif text-foreground hover:text-accent transition-colors"
                    >
                      {book.title}
                    </Link>
                    <p style={{ color: 'var(--muted-text)', fontSize: '0.875rem' }}>{book.author}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex flex-wrap gap-1">
                      {/* Show only the first (main) genre */}
                      <span className={`px-2 py-0.5 rounded text-xs font-sans ${getGenreColor(book.genre[0])}`}>
                        {book.genre[0]}
                      </span>
                    </div>
                    <div className="flex items-center">{renderStars(book.rating)}</div>
                  </div>
                </div>
                {index < booksByYear[year].length - 1 && (
                  <hr className="border-t my-2" style={{ borderColor: 'var(--divider-color)' }} />
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
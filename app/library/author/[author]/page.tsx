import { getAllBooks, getBooksByAuthor, getAllAuthors } from "@/lib/content"
import { LibraryList } from "@/components/library/library-list"
import { AnimatedHeader } from "@/components/animated-header"
import { Header } from "@/components/layout/header"
import Link from "next/link"
import { notFound } from "next/navigation"

interface AuthorPageProps {
  params: { author: string }
}

export async function generateStaticParams() {
  const books = await getAllBooks()
  const authors = getAllAuthors(books)
  return authors.map((author) => ({
    author: `author:${author.toLowerCase().replace(/\s+/g, "-")}`,
  }))
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { author: authorParam } = params
  const books = await getAllBooks()
  const allAuthors = getAllAuthors(books)

  // Decode the URL-encoded parameter
  const decodedAuthorParam = decodeURIComponent(authorParam)
  const authorSlug = decodedAuthorParam.replace("author:", "")
  const author = allAuthors.find((a) => a.toLowerCase().replace(/\s+/g, "-") === authorSlug)

  if (!author) {
    notFound()
  }

  const authorBooks = getBooksByAuthor(books, author)

  // Group books by year
  const booksByYear = authorBooks.reduce(
    (acc, book) => {
      if (!acc[book.year]) {
        acc[book.year] = []
      }
      acc[book.year].push(book)
      return acc
    },
    {} as Record<number, typeof authorBooks>,
  )

  const years = Object.keys(booksByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <div className="space-y-8">
      <AnimatedHeader imageSrc="/images/header_books.png" alt="Library Header" />
      <Header />

      <div className="text-center">
        <h1 className="text-3xl text-balance mt-24 mb-12 text-left">
          Books by <span style={{ color: 'var(--muted-text)' }}>{author}</span>
        </h1>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {allAuthors.map((a) => (
            <Link
              key={a}
              href={a === author ? "/library" : `/library/author/author:${a.toLowerCase().replace(/\s+/g, "-")}`}
              className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                a === author
                  ? "bg-accent text-accent-foreground border-accent"
                  : "border-border hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {a}
            </Link>
          ))}
        </div>
      </div>

      <LibraryList booksByYear={booksByYear} years={years} />
    </div>
  )
}
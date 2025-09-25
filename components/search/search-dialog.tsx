"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Book, FileText } from "lucide-react"
import Link from "next/link"
import type { PostData, BookData } from "@/lib/content"

interface SearchResult {
  type: "post" | "book"
  title: string
  slug: string
  excerpt?: string
  author?: string
  tags?: string[]
  genre?: string[]
}

interface SearchDialogProps {
  posts: PostData[]
  books: BookData[]
}

export function SearchDialog({ posts, books }: SearchDialogProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const searchQuery = query.toLowerCase()
    const searchResults: SearchResult[] = []

    // Search posts
    posts.forEach((post) => {
      const titleMatch = post.title.toLowerCase().includes(searchQuery)
      const excerptMatch = post.excerpt.toLowerCase().includes(searchQuery)
      const tagMatch = post.tags.some((tag) => tag.toLowerCase().includes(searchQuery))

      if (titleMatch || excerptMatch || tagMatch) {
        searchResults.push({
          type: "post",
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          tags: post.tags,
        })
      }
    })

    // Search books
    books.forEach((book) => {
      const titleMatch = book.title.toLowerCase().includes(searchQuery)
      const authorMatch = book.author.toLowerCase().includes(searchQuery)
      const genreMatch = book.genre.some((genre) => genre.toLowerCase().includes(searchQuery))

      if (titleMatch || authorMatch || genreMatch) {
        searchResults.push({
          type: "book",
          title: book.title,
          slug: book.slug,
          author: book.author,
          genre: book.genre,
        })
      }
    })

    setResults(searchResults.slice(0, 10)) // Limit to 10 results
  }, [query, posts, books])

  const handleResultClick = () => {
    setOpen(false)
    setQuery("")
    setResults([])
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Search</span>
          <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Search posts and books</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Search by title, author, tags, or genre..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full"
            autoFocus
          />
          {results.length > 0 && (
            <div className="max-h-[400px] overflow-y-auto space-y-2">
              {results.map((result, index) => (
                <Link
                  key={`${result.type}-${result.slug}-${index}`}
                  href={result.type === "post" ? `/posts/${result.slug}` : `/library/${result.slug}`}
                  onClick={handleResultClick}
                  className="block p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {result.type === "post" ? (
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Book className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{result.title}</h4>
                      {result.author && <p className="text-xs text-muted-foreground">by {result.author}</p>}
                      {result.excerpt && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{result.excerpt}</p>
                      )}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {result.tags?.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {result.genre?.slice(0, 3).map((genre) => (
                          <Badge key={genre} variant="secondary" className="text-xs">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {query && results.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No results found for "{query}"</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

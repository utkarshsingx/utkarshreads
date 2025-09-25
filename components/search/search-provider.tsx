"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import type { PostData, BookData } from "@/lib/content"

interface SearchContextType {
  posts: PostData[]
  books: BookData[]
  setPosts: (posts: PostData[]) => void
  setBooks: (books: BookData[]) => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({
  children,
  initialPosts = [],
  initialBooks = [],
}: {
  children: React.ReactNode
  initialPosts?: PostData[]
  initialBooks?: BookData[]
}) {
  const [posts, setPosts] = useState<PostData[]>(initialPosts)
  const [books, setBooks] = useState<BookData[]>(initialBooks)

  return <SearchContext.Provider value={{ posts, books, setPosts, setBooks }}>{children}</SearchContext.Provider>
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}

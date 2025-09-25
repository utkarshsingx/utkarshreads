"use client"

import { Badge } from "@/components/ui/badge"
import { useRouter, useSearchParams } from "next/navigation"

interface GenreFilterProps {
  genres: string[]
}

export function GenreFilter({ genres }: GenreFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedGenre = searchParams.get("genre")

  const handleGenreClick = (genre: string) => {
    const params = new URLSearchParams(searchParams)
    if (selectedGenre === genre) {
      params.delete("genre")
    } else {
      params.set("genre", genre)
    }
    router.push(`/library?${params.toString()}`)
  }

  const clearFilter = () => {
    router.push("/library")
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Filter by Genre</h3>
      <div className="flex flex-wrap gap-2">
        <Badge variant={!selectedGenre ? "default" : "outline"} className="cursor-pointer" onClick={clearFilter}>
          All Books
        </Badge>
        {genres.map((genre) => (
          <Badge
            key={genre}
            variant={selectedGenre === genre ? "default" : "outline"}
            className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
            onClick={() => handleGenreClick(genre)}
          >
            {genre}
          </Badge>
        ))}
      </div>
    </div>
  )
}

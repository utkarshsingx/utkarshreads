import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import type { BookData } from "@/lib/content"

interface BookCardProps {
  book: BookData
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <Link href={`/library/${book.slug}`} className="group">
          <div className="aspect-[3/4] relative mb-4 overflow-hidden rounded-md">
            <Image
              src={book.cover || "/placeholder.svg?height=300&width=200"}
              alt={`Cover of ${book.title}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h3 className="font-semibold text-balance group-hover:text-accent transition-colors">{book.title}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">by {book.author}</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < book.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">({book.rating}/5)</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {book.genre.map((genre) => (
            <Badge key={genre} variant="secondary" className="text-xs">
              {genre}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

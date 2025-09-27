import Link from "next/link"
import type { PostData } from "@/lib/content"

interface PostCardProps {
  post: PostData
}

export function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <article className="space-y-3">
     <Link href={`/posts/${post.slug}`} className="group block">
        <h2 className="text-3xl font-medium text-balance mt-32 mb-8 text-center group-hover:text-[var(--hover-color)] transition-colors">{post.title}</h2>
      </Link>

     <div
        className="leading-relaxed font-medium"
        style={{ color: '#B9B7A4' }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <time dateTime={post.date}>{formattedDate}</time>
      </div>
    </article>
  )
}
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
        <h2 className="text-xl font-normal text-balance group-hover:text-accent transition-colors">{post.title}</h2>
      </Link>

      <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <time dateTime={post.date}>{formattedDate}</time>
        {post.tags.length > 0 && (
          <div className="flex gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <Link
                key={tag}
                href={`/posts/tag/tag:${tag.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-accent hover:text-accent/80 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

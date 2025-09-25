import Link from "next/link"
import type { PostData } from "@/lib/content"

interface FeaturedPostsProps {
  posts: PostData[]
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-normal text-muted-foreground">Some Favorites To Get You Started</h2>
      <div className="space-y-4">
        {posts.map((post) => {
          const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })

          return (
            <article key={post.slug} className="space-y-2">
              <Link href={`/posts/${post.slug}`} className="group block">
                <h3 className="text-lg font-normal text-balance group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
              </Link>
              <p className="text-sm text-muted-foreground">{formattedDate}</p>
            </article>
          )
        })}
      </div>
    </div>
  )
}

import { getPostBySlug, getAllPosts } from "@/lib/content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Posts
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-balance mb-4 text-center">{post.title}</h1>
        </div>

        <article className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="text-center text-sm text-muted-foreground mt-4">
          <time dateTime={post.date}>{formattedDate}</time>
        </div>
      </div>
    </div>
  )
}

import { getAllPosts, getTotalPostPages } from "@/lib/content"
import { PostCard } from "@/components/posts/post-card"
import { AnimatedHeader } from "@/components/animated-header"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface BlogPageProps {
  params: { page: string }
}

export async function generateStaticParams() {
  const totalPages = await getTotalPostPages()
  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }))
}

export default async function BlogPage({ params }: BlogPageProps) {
  const page = parseInt(params.page, 10)
  if (isNaN(page) || page < 1) {
    notFound()
  }

  const posts = await getAllPosts(page)
  const totalPages = await getTotalPostPages()

  if (!posts.length) {
    notFound()
  }

  return (
    <div className="space-y-12">
      <AnimatedHeader imageSrc="/images/header_blank.png" alt="Posts Header" />

      <section className="space-y-8">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>

      <div className="flex justify-between">
        {page > 1 ? (
          <Link href={page === 2 ? "/" : `/posts/page/${page - 1}`}>
            <Button variant="ghost" className="hover:bg-transparent hover:text-foreground hover:underline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Newer Posts
            </Button>
          </Link>
        ) : (
          <div /> 
        )}
        {page < totalPages && (
          <Link href={`/posts/page/${page + 1}`}>
            <Button variant="ghost" className="hover:bg-transparent hover:text-foreground hover:underline">
              Older Posts
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
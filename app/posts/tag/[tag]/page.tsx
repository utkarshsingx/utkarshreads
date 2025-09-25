import { getAllPosts, getPostsByTag, getAllTags } from "@/lib/content"
import { PostCard } from "@/components/posts/post-card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { AnimatedHeader } from "@/components/animated-header"

interface TagPageProps {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  const tags = getAllTags(posts)
  return tags.map((tag) => ({
    tag: `tag:${tag.toLowerCase().replace(/\s+/g, "-")}`,
  }))
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag: tagParam } = await params
  const posts = await getAllPosts()
  const allTags = getAllTags(posts)

  const tagSlug = tagParam.replace("tag:", "")
  const tag = allTags.find((t) => t.toLowerCase().replace(/\s+/g, "-") === tagSlug)

  if (!tag) {
    notFound()
  }

  const tagPosts = getPostsByTag(posts, tag)

  return (
    <div className="space-y-8">
      <AnimatedHeader imageSrc="/images/header_blank.png" alt="Posts Header" />

      <div className="text-center">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Posts
          </Button>
        </Link>

        <h1 className="text-2xl font-normal mb-6">Posts about {tag}</h1>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {allTags.map((t) => (
            <Link
              key={t}
              href={t === tag ? "/" : `/posts/tag/tag:${t.toLowerCase().replace(/\s+/g, "-")}`}
              className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                t === tag
                  ? "bg-accent text-accent-foreground border-accent"
                  : "border-border hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {t}
            </Link>
          ))}
        </div>
      </div>

      <section className="space-y-8">
        {tagPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
    </div>
  )
}

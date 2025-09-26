import { getAllPosts } from "@/lib/content"
import { PostCard } from "@/components/posts/post-card"
import { AnimatedHeader } from "@/components/animated-header"
import Link from "next/link"
import Image from "next/image"

export default async function PostsPage() {
  const allPosts = await getAllPosts()
  const latestPost = allPosts[0]
  const otherPosts = allPosts.slice(1)
  const featuredPosts = otherPosts.filter((post) => post.featured)
  const regularPosts = otherPosts.filter((post) => !post.featured)

  return (
    <div className="space-y-12">
      <AnimatedHeader imageSrc="/images/header_blank.png" alt="Posts Header" />

      {/* Latest Post */}
      <section className="space-y-8">
        <PostCard post={latestPost} />
      </section>

      {/* Featured Posts Section - Redesigned as per request */}
      {featuredPosts.length > 0 && (
        <section className="space-y-8">
          <div className="border border-border p-6 rounded-lg" style={{ backgroundColor: '#1E1E1D', borderColor: '#2a2926' }}>
            <div className="flex justify-center mb-6">
              <Image src="/images/footer_love.png" alt="Favorites Header" width={96} height={96} className="w-24 h-24" />
            </div>
            <h2 className="text-center font-normal text-2xl mb-4" style={{ color: '#B9B7A4' }}>Some Favorites To Get You Started</h2>
            <ol className="list-decimal list-inside space-y-2">
              {featuredPosts.map((post, index) => (
                <li key={post.slug} className="text-base" style={{ color: '#B9B7A4' }}>
                  <Link href={`/posts/${post.slug}`} className="hover:text-accent transition-colors">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Regular Posts Section */}
      <section className="space-y-8">
        {regularPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
    </div>
  )
}

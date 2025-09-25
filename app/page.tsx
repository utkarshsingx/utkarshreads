import { getAllPosts } from "@/lib/content"
import { PostCard } from "@/components/posts/post-card"
import { FeaturedPosts } from "@/components/posts/featured-posts"
import { AnimatedHeader } from "@/components/animated-header"

export default async function PostsPage() {
  const posts = await getAllPosts()
  const featuredPosts = posts.filter((post) => post.featured)
  const regularPosts = posts.filter((post) => !post.featured)

  return (
    <div className="space-y-12">
      <AnimatedHeader imageSrc="/images/header_blank.png" alt="Posts Header" />

      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-normal text-balance">Introducing My Blog, the journal that feels like a feed</h1>
          <div className="prose prose-lg mx-auto text-muted-foreground">
            <p>
              A couple of months ago, I wondered if micro-blogging and journaling could be combined. Something about
              sending off small posts feels different than crafting a whole journal entry. What if I could get the best
              of both worlds?
            </p>
            <p>
              So I built myself a personal blog using modern web technologies. It's been using it for weeks now, and
              even though I'm obviously a bit biased, I think it's just as quick and low-friction. Let me know what you
              think!
            </p>
          </div>
        </div>
      </div>

      {featuredPosts.length > 0 && (
        <section className="space-y-8">
          <FeaturedPosts posts={featuredPosts} />
        </section>
      )}

      <section className="space-y-8">
        {regularPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
    </div>
  )
}

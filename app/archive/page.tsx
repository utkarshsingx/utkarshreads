import { getAllPosts, getAllTags } from "@/lib/content"
import { PostCard } from "@/components/posts/post-card"
import { Badge } from "@/components/ui/badge"

export default async function ArchivePage() {
  const posts = await getAllPosts()
  const tags = getAllTags(posts)

  // Group posts by year
  const postsByYear = posts.reduce(
    (acc, post) => {
      const year = new Date(post.date).getFullYear()
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(post)
      return acc
    },
    {} as Record<number, typeof posts>,
  )

  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-balance mb-4">Archive</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            All posts organized by year and topic. Browse by year or explore different topics using the tags below.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Topics</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </section>

        <section>
          {years.map((year) => (
            <div key={year} className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">{year}</h2>
              <div className="space-y-6">
                {postsByYear[year].map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

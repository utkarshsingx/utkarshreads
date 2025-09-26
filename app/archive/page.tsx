import { getAllPosts } from "@/lib/content"
import { AnimatedHeader } from "@/components/animated-header"
import Link from "next/link"

export default async function ArchivePage() {
  const posts = await getAllPosts()

  const postsByYear = posts.reduce(
    (acc, post) => {
      const date = new Date(post.date)
      const year = date.getFullYear()
      const month = date.toLocaleString('en-US', { month: 'long' })
      if (!acc[year]) {
        acc[year] = {}
      }
      if (!acc[year][month]) {
        acc[year][month] = []
      }
      acc[year][month].push(post)
      return acc
    },
    {} as Record<number, Record<string, typeof posts>>,
  )

  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <AnimatedHeader imageSrc="/images/header_blank.png" alt="Archive Header" />

        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-balance mb-4">Archive</h1>
        </div>

        <section>
          {years.map((year) => (
            <div key={year} className="mb-12">
              <h2 className="text-3xl font-normal mb-6">{year}</h2>
              {Object.keys(postsByYear[year]).sort((a, b) => {
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                return months.indexOf(b) - months.indexOf(a);
              }).map((month) => (
                <div key={month} className="mb-4">
                  <h3 className="text-xl font-heading font-normal mb-2" style={{ color: '#575654' }}>{month}</h3>
                  <div className="space-y-3">
                    {postsByYear[year][month].map((post) => (
                      <div key={post.slug} className="flex justify-between items-baseline">
                        <div className="group flex flex-1 items-baseline min-w-0">
                          <Link href={`/posts/${post.slug}`} className="block flex-shrink-0">
                            <h4 className="text-lg font-normal group-hover:text-accent transition-colors truncate">{post.title}</h4>
                          </Link>
                          <span className="flex-grow border-b-2 border-dotted mx-4" style={{ borderColor: '#282726' }} aria-hidden="true"></span>
                          <Link href={`/posts/${post.slug}`} className="block flex-shrink-0">
                            <time dateTime={post.date} className="text-sm whitespace-nowrap ml-auto" style={{ color: '#8A8875' }}>
                              {new Date(post.date).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, ".")}
                            </time>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

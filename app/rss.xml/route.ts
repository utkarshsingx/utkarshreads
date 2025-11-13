import { getAllBooks, getAllPosts } from "@/lib/content"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.utkarshreads.me"
const feedUrl = `${siteUrl}/rss.xml`
const siteTitle = "utkarshreads"
const siteDescription = "Utkarsh's thoughts, writing, and everything in between."

export async function GET() {
  const [posts, books] = await Promise.all([
    getAllPosts(undefined, { includeHidden: true }),
    getAllBooks({ includeHidden: true }),
  ])

  const rssItems: Array<{
    title: string
    link: string
    guid: string
    date: Date
    description: string
    content: string
  }> = []

  posts.forEach((post) => {
    const postUrl = `${siteUrl}/posts/${post.slug}`
    const description = post.excerpt ? post.excerpt : stripHtml(post.content).slice(0, 280)
    rssItems.push({
      title: post.title,
      link: postUrl,
      guid: postUrl,
      date: new Date(post.date),
      description,
      content: post.content,
    })
  })

  books.forEach((book) => {
    const bookUrl = `${siteUrl}/library/${book.slug}`
    const description = `${book.title} by ${book.author}${book.rating ? ` — ★${book.rating}` : ""}`
    rssItems.push({
      title: `Book: ${book.title}`,
      link: bookUrl,
      guid: bookUrl,
      date: new Date(book.year, 0, 1),
      description,
      content: book.content,
    })
  })

  rssItems.push({
    title: "About Utkarsh Singh",
    link: `${siteUrl}/about`,
    guid: `${siteUrl}/about`,
    date: new Date("2025-01-01T00:00:00Z"),
    description:
      "About Utkarsh Singh — designer, developer, and artist sharing thoughts, notes, and projects.",
    content: `
      <p>Yahaha, you found me! I'm Utkarsh Singh, a designer & developer building digital products — and an artist at heart.</p>
      <p>This is the corner of the internet where I share my thoughts, explorations, and the things I learn along the way.</p>
      <p>Say hello at <a href="mailto:hauntedutkarsh@gmail.com">hauntedutkarsh@gmail.com</a>.</p>
    `,
  })

  const itemsXml = rssItems
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .map(
      (item) => `    <item>
      <title><![CDATA[${item.title}]]></title>
      <pubDate>${item.date.toUTCString()}</pubDate>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.guid}</guid>
      <description><![CDATA[${item.description}]]></description>
      <content:encoded><![CDATA[${item.content}]]></content:encoded>
    </item>`,
    )
    .join("\n")

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:slash="http://purl.org/rss/1.0/modules/slash/" version="2.0">
<channel>
  <title>${siteTitle}</title>
  <description>${siteDescription}</description>
  <link>${siteUrl}</link>
  <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${itemsXml}
</channel>
</rss>`

  return new Response(rss, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  })
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "")
}


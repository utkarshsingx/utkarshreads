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
      <p>Yahaha, you found me! I'm Utkarsh Singh, a designer and developer for digital products, an artist in real life.</p>
      <p>Beyond my artistic focus, I have equal fascination towards music, philosophy, literature, poems, novels, technology, creative content, and psychology.</p>
      <p>Some takes on life: time is not rigid, rest till you feel guilty and then rest a bit more, sunscreen always works, stretch, electrolytes are essential while fasting, pain ≠ great art, great art = repetition, be kind, be observant.</p>
      <p>Only goal for the year: consume less media, more music, and clothing. and go for that 42.195.</p>
      <p>This blog is the corner of the internet in which I share my thoughts. That's it. That's the whole concept.</p>
      <p>Connect with me: <a href="https://bento.me/utkarshsingx">Bento</a>, <a href="mailto:utkarshsingx@gmail.com">Email</a>, <a href="https://x.com/utkarshsingx">Twitter</a></p>
    `,
  })

  const itemsXml = rssItems
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .map(
      (item) => `  <item>
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
<rss xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/rss/1.0/modules/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:slash="http://purl.org/rss/1.0/modules/slash/" version="2.0">
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

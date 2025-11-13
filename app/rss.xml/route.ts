import { getAllBooks, getAllPosts } from "@/lib/content"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://utkarshreads.me"

export async function GET() {
  const posts = await getAllPosts(undefined, { includeHidden: true })
  const books = await getAllBooks({ includeHidden: true })

  const postItems = posts
    .map(
      (post) => `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${`${siteUrl}/posts/${post.slug}`}</link>
        <guid>${`${siteUrl}/posts/${post.slug}`}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <description><![CDATA[${post.excerpt || ""}]]></description>
      </item>`,
    )
    .join("")

  const bookItems = books
    .map(
      (book) => `
      <item>
        <title><![CDATA[Book: ${book.title}]]></title>
        <link>${`${siteUrl}/library/${book.slug}`}</link>
        <guid>${`${siteUrl}/library/${book.slug}`}</guid>
        <pubDate>${new Date(book.year, 0, 1).toUTCString()}</pubDate>
        <description><![CDATA[${book.author} — ${book.genre.join(", ") || ""}]]></description>
      </item>`,
    )
    .join("")

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Utkarsh Reads</title>
    <link>${siteUrl}</link>
    <description>Latest writing from Utkarsh Reads.</description>
    <language>en-us</language>
    ${postItems}
    ${bookItems}
  </channel>
</rss>`

  return new Response(rss, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  })
}


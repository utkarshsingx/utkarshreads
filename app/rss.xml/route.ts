import { getAllPosts } from "@/lib/content"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://utkarshreads.me"

export async function GET() {
  const posts = await getAllPosts()

  const items = posts
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

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Utkarsh Reads</title>
    <link>${siteUrl}</link>
    <description>Latest writing from Utkarsh Reads.</description>
    <language>en-us</language>
    ${items}
  </channel>
</rss>`

  return new Response(rss, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  })
}


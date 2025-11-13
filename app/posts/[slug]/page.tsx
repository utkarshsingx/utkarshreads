import { getPostBySlug, getAllPosts } from "@/lib/content"
import { notFound } from "next/navigation"
import { PostPageView } from "@/components/posts/post-page-view"

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return <PostPageView post={post} />
}
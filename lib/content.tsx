import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export interface PostData {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  content: string
  featured?: boolean
}

export interface BookData {
  slug: string
  title: string
  author: string
  year: number
  genre: string[]
  rating: number
  content: string
  cover?: string
}

const postsDirectory = path.join(process.cwd(), 'content/posts')
const booksDirectory = path.join(process.cwd(), 'content/books')
export const postsPerPage = 5

export async function getAllPosts(page?: number): Promise<PostData[]> {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)
      const processedContent = await remark()
        .use(html)
        .process(matterResult.content)
      const contentHtml = processedContent.toString()
      return {
        slug,
        content: contentHtml,
        ...(matterResult.data as { title: string; date: string; excerpt: string; tags: string[]; featured?: boolean }),
      }
    }),
  )
  const sortedPosts = allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))

  if (page) {
    const startIndex = (page - 1) * postsPerPage
    const endIndex = startIndex + postsPerPage
    return sortedPosts.slice(startIndex, endIndex)
  }

  return sortedPosts
}

export async function getTotalPostPages() {
  const fileNames = fs.readdirSync(postsDirectory)
  return Math.ceil(fileNames.length / postsPerPage)
}

export async function getPostBySlug(slug: string): Promise<PostData | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  if (!fs.existsSync(fullPath)) {
    return null
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const content = processedContent.toString()
  return {
    slug,
    content,
    ...(matterResult.data as { title: string; date: string; excerpt: string; tags: string[]; featured?: boolean }),
  }
}

export async function getAllBooks(): Promise<BookData[]> {
  const fileNames = fs.readdirSync(booksDirectory)
  const allBooksData = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(booksDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)
      const processedContent = await remark()
        .use(html)
        .process(matterResult.content)
      const contentHtml = processedContent.toString()
      return {
        slug,
        content: contentHtml,
        ...(matterResult.data as { title: string; author: string; year: number; genre: string[]; rating: number; cover?: string }),
      }
    }),
  )
  return allBooksData.sort((a, b) => b.year - a.year)
}

export async function getBookBySlug(slug: string): Promise<BookData | null> {
  const fullPath = path.join(booksDirectory, `${slug}.md`)
  if (!fs.existsSync(fullPath)) {
    return null
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const content = processedContent.toString()
  return {
    slug,
    content,
    ...(matterResult.data as { title: string; author: string; year: number; genre: string[]; rating: number; cover?: string }),
  }
}

export function getAllTags(posts: PostData[]): string[] {
  const tags = new Set<string>()
  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
}

export function getAllGenres(books: BookData[]): string[] {
  const genres = new Set<string>()
  books.forEach((book) => {
    book.genre.forEach((genre) => genres.add(genre))
  })
  return Array.from(genres).sort()
}

export function getBooksByGenre(books: BookData[], genre: string): BookData[] {
  return books.filter((book) => book.genre.includes(genre))
}

export function getBooksByYear(books: BookData[], year: number): BookData[] {
  return books.filter((book) => book.year === year)
}

export function getPostsByTag(posts: PostData[], tag: string): PostData[] {
  return posts.filter((post) => post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
}
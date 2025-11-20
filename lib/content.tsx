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
  image?: string
  imageAlt?: string
  backgroundVideo?: string
  textTone?: "light" | "dark"
  hidden?: boolean
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
  hidden?: boolean
}

const postsDirectory = path.join(process.cwd(), 'content/posts')
const booksDirectory = path.join(process.cwd(), 'content/books')
export const postsPerPage = 5

export async function getAllPosts(
  page?: number,
  options?: { includeHidden?: boolean },
): Promise<PostData[]> {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  
  const fileNames = fs.readdirSync(postsDirectory).filter(
    (fileName) => fileName.endsWith('.md') && !fileName.startsWith('.')
  )
  
  if (fileNames.length === 0) {
    return []
  }
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
      
      // Ensure tags is always an array
      const data = matterResult.data as {
        title: string
        date: string
        excerpt: string
        tags?: string[]
        featured?: boolean
        image?: string
        imageAlt?: string
        hidden?: boolean
        backgroundVideo?: string
        textTone?: "light" | "dark"
      }
      
      return {
        slug,
        content: contentHtml,
        ...data,
        tags: data.tags || [], // Default to empty array if tags are missing
        backgroundVideo: data.backgroundVideo,
        textTone: data.textTone,
        hidden: data.hidden ?? false,
      }
    }),
  )
  const filteredPosts = options?.includeHidden ? allPostsData : allPostsData.filter((post) => !post.hidden)
  const sortedPosts = filteredPosts.sort((a, b) => (a.date < b.date ? 1 : -1))

  if (page) {
    const startIndex = (page - 1) * postsPerPage
    const endIndex = startIndex + postsPerPage
    return sortedPosts.slice(startIndex, endIndex)
  }

  return sortedPosts
}

export async function getTotalPostPages(options?: { includeHidden?: boolean }) {
  const posts = await getAllPosts(undefined, options)
  return Math.ceil(posts.length / postsPerPage)
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

  // Ensure tags is always an array
  const data = matterResult.data as {
    title: string
    date: string
    excerpt: string
    tags?: string[]
    featured?: boolean
    image?: string
    imageAlt?: string
    hidden?: boolean
    backgroundVideo?: string
    textTone?: "light" | "dark"
  }
  
  return {
    slug,
    content,
    ...data,
    tags: data.tags || [], // Default to empty array if tags are missing
    backgroundVideo: data.backgroundVideo,
    textTone: data.textTone,
    hidden: data.hidden ?? false,
  }
}

export async function getAllBooks(options?: { includeHidden?: boolean }): Promise<BookData[]> {
  if (!fs.existsSync(booksDirectory)) {
    return []
  }
  
  const fileNames = fs.readdirSync(booksDirectory).filter(
    (fileName) => fileName.endsWith('.md') && !fileName.startsWith('.')
  )
  
  if (fileNames.length === 0) {
    return []
  }
  
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
      const data = matterResult.data as {
        title: string
        author: string
        year: number
        genre: string[]
        rating: number
        cover?: string
        hidden?: boolean
      }

      return {
        slug,
        content: contentHtml,
        ...data,
        hidden: data.hidden ?? false,
      }
    }),
  )
  const filteredBooks = options?.includeHidden ? allBooksData : allBooksData.filter((book) => !book.hidden)
  return filteredBooks.sort((a, b) => b.year - a.year)
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
  const data = matterResult.data as {
    title: string
    author: string
    year: number
    genre: string[]
    rating: number
    cover?: string
    hidden?: boolean
  }

  return {
    slug,
    content,
    ...data,
    hidden: data.hidden ?? false,
  }
}

export function getAllTags(posts: PostData[]): string[] {
  const tags = new Set<string>()
  posts.forEach((post) => {
    // This check is now redundant because we default to an empty array, but it's good practice
    if (post.tags) { 
      post.tags.forEach((tag) => tags.add(tag))
    }
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

export function getAllAuthors(books: BookData[]): string[] {
  const authors = new Set<string>()
  books.forEach((book) => {
    authors.add(book.author)
  })
  return Array.from(authors).sort()
}

export function getBooksByAuthor(books: BookData[], author: string): BookData[] {
  return books.filter((book) => book.author === author)
}

export function getPostsByTag(posts: PostData[], tag: string): PostData[] {
  return posts.filter((post) => post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
}


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

// Mock posts data
const mockPosts: PostData[] = [
  {
    slug: "offend-yourself-sometimes",
    title: "Offend Yourself Sometimes",
    date: "2024-01-15",
    excerpt:
      "A reflection on the importance of challenging your own beliefs and stepping outside your comfort zone to grow as a person.",
    tags: ["Philosophy", "Personal Growth"],
    content: `
      <p>Sometimes the most valuable thing you can do is offend yourself. Not in a harmful way, but by challenging the beliefs and assumptions you hold most dear.</p>
      
      <p>We often surround ourselves with ideas that confirm what we already think we know. But growth happens in the uncomfortable spaces between certainty and doubt.</p>
      
      <p>When was the last time you encountered an idea that made you genuinely uncomfortable? That challenged something fundamental about how you see the world?</p>
      
      <p>These moments of intellectual discomfort are precious. They're opportunities to examine why we believe what we believe, and whether those beliefs still serve us.</p>
    `,
    featured: true,
  },
  {
    slug: "the-art-of-slow-thinking",
    title: "The Art of Slow Thinking",
    date: "2024-01-10",
    excerpt:
      "In our fast-paced world, we've forgotten the value of taking time to think deeply about problems before rushing to solutions.",
    tags: ["Productivity", "Mental Health"],
    content: `
      <p>In our rush to be productive, we've forgotten how to think slowly. Every problem demands an immediate solution, every question needs an instant answer.</p>
      
      <p>But the best insights often come when we give our minds time to wander, to make unexpected connections, to sit with uncertainty.</p>
      
      <p>Slow thinking isn't about being inefficient. It's about recognizing that some problems require more than quick fixes—they need deep understanding.</p>
    `,
    featured: true,
  },
  {
    slug: "building-habits-that-stick",
    title: "Building Habits That Actually Stick",
    date: "2024-01-05",
    excerpt:
      "Most habit advice focuses on motivation and willpower. But the real secret is designing systems that make good choices inevitable.",
    tags: ["Productivity", "Personal Growth"],
    content: `
      <p>We've all been there: excited about a new habit, motivated for a few days or weeks, then gradually falling back into old patterns.</p>
      
      <p>The problem isn't lack of willpower. It's that we're fighting against our environment instead of designing it to support our goals.</p>
      
      <p>The most successful habits are the ones that require the least conscious effort. They're built into the structure of our days.</p>
    `,
    featured: false,
  },
  {
    slug: "digital-minimalism-experiment",
    title: "My 30-Day Digital Minimalism Experiment",
    date: "2023-12-20",
    excerpt:
      "What I learned from drastically reducing my digital consumption and how it changed my relationship with technology.",
    tags: ["Technology", "Mental Health"],
    content: `
      <p>For 30 days, I eliminated all non-essential digital activities. No social media, no news websites, no YouTube rabbit holes.</p>
      
      <p>The first week was harder than I expected. I reached for my phone constantly, only to remember there was nothing to check.</p>
      
      <p>But by week three, something interesting happened. My mind felt quieter. I started noticing things I'd been missing.</p>
    `,
    featured: false,
  },
]

// Mock books data
const mockBooks: BookData[] = [
  {
    slug: "thunderbird-chuck-wendig",
    title: "Thunderbird",
    author: "Chuck Wendig",
    year: 2025,
    genre: ["Science Fiction", "Thriller"],
    rating: 4,
    content: `
      <p>Chuck Wendig's latest novel is a gripping exploration of technology, power, and human nature set in a near-future world where the lines between digital and physical reality have blurred beyond recognition.</p>
      
      <p>The story follows Maya Chen, a cybersecurity expert who discovers a conspiracy that threatens to reshape society itself. Wendig's writing is sharp and propulsive, pulling you through a maze of corporate intrigue and technological terror.</p>
      
      <p>What impressed me most about Thunderbird is how it balances high-tech concepts with deeply human emotions. The characters feel real and flawed, making choices that are both understandable and frustrating.</p>
      
      <p>While the plot occasionally veers into familiar cyberpunk territory, Wendig brings enough fresh perspective and social commentary to keep things interesting. The book raises important questions about privacy, surveillance, and the price of convenience in our connected world.</p>
      
      <p>A solid 4/5 stars. Recommended for fans of near-future science fiction and anyone interested in the intersection of technology and society.</p>
    `,
    cover: "/thunderbird-book-cover.jpg",
  },
  {
    slug: "deep-work-cal-newport",
    title: "Deep Work",
    author: "Cal Newport",
    year: 2024,
    genre: ["Productivity", "Business"],
    rating: 5,
    content: `
      <p>Cal Newport's "Deep Work" is a masterclass in understanding what truly drives professional success in our distracted age. The book argues that the ability to focus without distraction on cognitively demanding tasks is becoming increasingly rare—and increasingly valuable.</p>
      
      <p>Newport doesn't just identify the problem; he provides practical strategies for cultivating deep work habits. From time-blocking to creating distraction-free environments, the advice is both actionable and backed by research.</p>
      
      <p>What sets this book apart is its philosophical depth. Newport makes a compelling case that deep work isn't just about productivity—it's about meaning, satisfaction, and human flourishing.</p>
      
      <p>The writing is clear and engaging, with plenty of real-world examples from successful professionals who have mastered the art of deep work. Some concepts feel repetitive, but the core message is powerful enough to warrant reinforcement.</p>
      
      <p>Essential reading for anyone looking to reclaim their attention and produce work that matters. 5/5 stars.</p>
    `,
    cover: "/deep-work-book-cover.jpg",
  },
]

export async function getAllPosts(): Promise<PostData[]> {
  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, 10))
  return mockPosts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<PostData | null> {
  await new Promise((resolve) => setTimeout(resolve, 10))
  return mockPosts.find((post) => post.slug === slug) || null
}

export async function getAllBooks(): Promise<BookData[]> {
  await new Promise((resolve) => setTimeout(resolve, 10))
  return mockBooks.sort((a, b) => b.year - a.year)
}

export async function getBookBySlug(slug: string): Promise<BookData | null> {
  await new Promise((resolve) => setTimeout(resolve, 10))
  return mockBooks.find((book) => book.slug === slug) || null
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

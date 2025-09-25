import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Sidebar } from "@/components/layout/sidebar"
import { Footer } from "@/components/layout/footer"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Personal Blog",
  description: "A personal blog featuring posts, book reviews, and thoughts",
  generator: "v0.app",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-serif">
        <div className="min-h-screen bg-background text-foreground">
          <Sidebar />
          <main className="ml-32 flex justify-center">
            <div className="max-w-2xl w-full px-6 py-8">
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </div>
          </main>
          <div className="ml-32 flex justify-center">
            <div className="max-w-2xl w-full">
              <Footer />
            </div>
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  )
}

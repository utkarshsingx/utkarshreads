import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Sidebar } from "@/components/layout/sidebar"
import { Footer } from "@/components/layout/footer"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "utkarshreads",
  description: "A personal blog featuring posts, book reviews, and thoughts",
  generator: "v0.app",
  icons: {
    icon: '/images/header_blank.png',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-serif">
        <div className="min-h-screen bg-background text-foreground">
          <Sidebar />
          <main className="flex justify-center lg:pl-40">
            <div className="max-w-lg w-full px-6 pt-[18px] pb-8">
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </div>
          </main>
          <div className="flex justify-center lg:pl-40">
            <div className="max-w-xl w-full">
              <Footer />
            </div>
          </div>
        </div>
        <Analytics />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').then(registration => {
                    console.log('SW registered: ', registration);
                  }).catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}

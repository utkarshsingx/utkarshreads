import Link from "next/link"
import { AnimatedHeader } from "@/components/animated-header"

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <AnimatedHeader imageSrc="/images/header_laptop.png" alt="About Header" />

      <div className="prose prose-lg mx-auto text-center">
        <h1 className="text-2xl font-normal mb-8">About</h1>

        <div className="text-left space-y-6">
         
          <p>
            Yahaha, you found me! I’m Utkarsh Singh, a designer and developer for digital products. This blog is the corner of the internet in which I share my thoughts. That's it. That's the whole concept.
          </p>

        </div>
      </div>

      <div className="text-center space-y-4 pt-8">
        <div className="flex justify-center space-x-6 text-sm">
          <a href="mailto:hello@example.com" className="text-muted-foreground hover:text-accent transition-colors">
            Email
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  )
}

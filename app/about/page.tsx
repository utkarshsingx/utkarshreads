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
            I'm a developer passionate about crafting accessible, thoughtful digital experiences that blend robust
            engineering with meaningful design.
          </p>

          <p>
            Currently, I'm a Senior Developer specializing in web technologies and user experience. I contribute to
            building platforms that prioritize accessibility and performance, ensuring our products meet web standards
            and best practices to deliver inclusive user experiences.
          </p>

          <p>
            In the past, I've had the opportunity to develop software across a variety of settings — from startups and
            large corporations to consulting and digital agencies. Additionally, I also share knowledge through{" "}
            <Link href="/" className="text-accent hover:text-accent/80 no-underline hover:underline">
              writing
            </Link>{" "}
            and have created educational content to help others learn web development.
          </p>

          <p>
            In my spare time, I'm usually reading, writing, hanging out with my family, or exploring new technologies
            and ideas. You can gain further insights into my background and interests through my{" "}
            <Link href="/" className="text-accent hover:text-accent/80 no-underline hover:underline">
              posts
            </Link>{" "}
            and{" "}
            <Link href="/library" className="text-accent hover:text-accent/80 no-underline hover:underline">
              book reviews
            </Link>
            .
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

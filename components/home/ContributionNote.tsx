import { Heart, Star } from "lucide-react";
import Link from "next/link";

export function ContributionNote() {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-primary/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Join Our Community</h2>
        <div className="prose dark:prose-invert mx-auto">
          <p className="text-lg leading-relaxed mb-6">
            We welcome contributions!
            Whether you&apos;re a beginner learning CSS Grids or an experienced developer passionate about layouts,
            your ideas, improvements, templates, or feedback are highly valuable.
          </p>
          <p className="text-lg leading-relaxed flex items-center justify-center gap-2">
            Let&apos;s grow Petals together. Every contribution, big or small, is appreciated!
            <Heart className="h-5 w-5 text-red-500 inline" />
          </p>
        </div>

        <div
        className="mt-16"
      >
        <Link
          href="https://github.com/Shivam-Katare/petals"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-card hover:bg-card/80 text-foreground px-6 py-3 rounded-md border transition-colors"
        >
          <Star className="h-5 w-5" />
          <span className="font-medium">Star us on GitHub</span>
        </Link>
      </div>
      </div>
    </section>
  );
} 
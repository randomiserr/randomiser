import { Metadata } from "next";
import { blogPosts } from "@/data/projects";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/ui/navbar";

export const metadata: Metadata = {
  title: "Blog | Randomiser",
  description: "My thoughts on building and designing products. How to guides, opinions, and everything that comes to my mind.",
  openGraph: {
    title: "Blog | Randomiser",
    description: "My thoughts on building and designing products. How to guides, opinions, and everything that comes to my mind.",
    type: "website",
  },
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 md:py-32">
        <div className="mb-16">
          <h1 className="font-space-grotesk text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Latest thoughts
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
            Occasional deep dives into building, designing product.
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.filter(post => post.content).map((post) => (
            <Card key={post.id} className="group h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-border/50">
              <Link href={`/blog/${post.id}`} className="block h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>
                  <h2 className="font-space-grotesk text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-accent group-hover:text-accent-foreground transition-colors">
                    Read more
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
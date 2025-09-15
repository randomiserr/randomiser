import { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/projects";
import { BlogPostContent } from "@/components/blog/blog-post-content";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.id,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((post) => post.id === slug);

  if (!post) {
    return {
      title: "Post Not Found | Randomiser",
    };
  }

  const title = `${post.title} | Randomiser`;
  const description = post.excerpt;
  const url = `https://randomiser.xyz/blog/${post.id}`;

  return {
    title,
    description,
    authors: [{ name: "Randomiser" }],
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date,
      authors: ["Randomiser"],
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((post) => post.id === slug);

  if (!post) {
    notFound();
  }

  return <BlogPostContent post={post} />;
}
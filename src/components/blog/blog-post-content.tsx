"use client";

import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/navbar";

interface BlogPostContentProps {
  post: BlogPost;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

const estimateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

const renderMarkdown = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-slate-800 text-green-400 px-2 py-1 rounded text-sm font-mono">$1</code>')
    .replace(/\n• /g, '\n<li class="ml-6 pl-2">')
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/\n/g, '<br />');
};

const CalloutCard = ({ type, content }: { type: "info" | "warning" | "success"; content: string }) => {
  // Process content to create separate stacked boxes like original HTML
  const processMultiSectionContent = (text: string) => {
    // Split by **Section:** patterns and process each
    const sections = text.split(/\n\n(?=\*\*\w+:\*\*)/);

    return sections.map((section, index) => {
      const sectionType = section.match(/^\*\*(\w+):\*\*/)?.[1]?.toLowerCase();

      let borderColor = "border-l-purple-500";
      let bgColor = "bg-gradient-to-r from-purple-500/8 to-transparent";

      if (sectionType === "why") {
        borderColor = "border-l-green-500";
        bgColor = "bg-gradient-to-r from-green-500/8 to-transparent";
      } else if (sectionType === "alternative") {
        borderColor = "border-l-blue-500";
        bgColor = "bg-gradient-to-r from-blue-500/8 to-transparent";
      } else if (sectionType === "important") {
        borderColor = "border-l-amber-500";
        bgColor = "bg-gradient-to-r from-amber-500/8 to-transparent";
      }

      return (
        <div key={index} className={`border-l-4 ${borderColor} ${bgColor} p-4 rounded-lg ${index > 0 ? '' : 'mb-0'} ${index === sections.length - 1 ? 'mb-6' : 'mb-0'} border border-border/20`}>
          <div
            className="text-sm leading-relaxed text-white [&>ul]:list-disc [&>ul]:pl-0 [&>ul]:ml-4 [&>ul]:space-y-1 [&>li]:pl-1"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(section) }}
          />
        </div>
      );
    });
  };

  const singleBoxStyles = {
    info: "border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-500/8 to-transparent",
    warning: "border-l-4 border-l-amber-500 bg-gradient-to-r from-amber-500/8 to-transparent",
    success: "border-l-4 border-l-green-500 bg-gradient-to-r from-green-500/8 to-transparent"
  };

  return (
    <>
      {content.includes("\n\n**") ? (
        <div className="space-y-0">{processMultiSectionContent(content)}</div>
      ) : (
        <div className={`${singleBoxStyles[type]} p-4 rounded-lg mb-6 border border-border/20`}>
          <div
            className="text-sm leading-relaxed text-white [&>ul]:list-disc [&>ul]:pl-0 [&>ul]:ml-4 [&>ul]:space-y-1 [&>li]:pl-1"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          />
        </div>
      )}
    </>
  );
};

export function BlogPostContent({ post }: BlogPostContentProps) {
  if (!post.content) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-4xl px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="font-space-grotesk text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-muted-foreground mb-8">This blog post content is not available yet.</p>
            <Link href="/blog">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const fullContent = [
    post.content.introduction,
    ...post.content.sections.map(s => s.content + (s.subsections?.map(sub => sub.content).join(' ') || '')),
    post.content.conclusion || ''
  ].join(' ');

  const readingTime = estimateReadingTime(fullContent);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <Link href="/blog">
              <Button variant="ghost" className="mb-6 -ml-4 hover:bg-muted">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to blog
              </Button>
            </Link>

            {/* Tags/Category eyebrow */}
            {post.tags.length > 0 && (
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-border/40 rounded-full text-xs text-muted-foreground mb-4">
                {post.tags.map((tag, index) => (
                  <span key={tag}>
                    {tag}
                    {index < post.tags.length - 1 && <span className="ml-2">•</span>}
                  </span>
                ))}
              </div>
            )}

            <h1 className="font-space-grotesk text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-extrabold">Hostinger → Vercel</span>: connect your domain in minutes
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              {post.excerpt}
            </p>
          </motion.div>

          {/* Introduction */}
          <motion.div variants={itemVariants} className="mb-8">
            <p
              className="text-lg leading-relaxed text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content.introduction) }}
            />
          </motion.div>

          {/* Table of Contents */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="bg-card/50 border border-border/40 rounded-lg p-6">
              <h2 className="font-space-grotesk text-lg font-semibold text-foreground mb-4">Contents</h2>
              <ol className="space-y-2">
                {post.content.sections.map((section, index) => {
                  const sectionId = `section-${index}`;
                  const cleanTitle = section.title.replace(/^\d+\)\s*/, ''); // Remove "1) " prefix if present
                  return (
                    <li key={index} className="text-muted-foreground hover:text-foreground transition-colors">
                      <a
                        href={`#${sectionId}`}
                        className="block py-1 hover:underline"
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(sectionId)?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                          });
                        }}
                      >
                        {index + 1}. {cleanTitle}
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>
          </motion.div>


          {/* Content Sections */}
          <div className="space-y-16">
            {post.content.sections.map((section, index) => (
              <motion.section
                key={index}
                variants={itemVariants}
                id={`section-${index}`}
                className="scroll-mt-20"
              >
                <h2 className="font-space-grotesk text-2xl md:text-3xl font-bold text-foreground mb-8">
                  {section.title}
                </h2>

                {/* Check if this is a step section */}
                {section.title.match(/^\d+\)/) ? (
                  <div className="flex gap-4 p-4 border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-500/8 to-transparent rounded-lg mb-8">
                    <div className="flex-1">
                      <div
                        className="text-foreground leading-relaxed mb-4"
                        dangerouslySetInnerHTML={{ __html: renderMarkdown(section.content) }}
                      />
                      {section.content.includes('Vercel will now show') && (
                        <p className="text-sm text-muted-foreground">
                          Vercel will now show the DNS records you need. Keep that page open.
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    className="text-muted-foreground leading-relaxed mb-6"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(section.content) }}
                  />
                )}

                {section.image && (
                  <div className="mb-8">
                    <Image
                      src={section.image}
                      alt={section.imageAlt || ""}
                      width={800}
                      height={400}
                      className="rounded-lg border border-border/50 w-full"
                    />
                    {section.imageAlt && (
                      <p className="text-sm text-muted-foreground mt-3 text-center italic">
                        {section.imageAlt}
                      </p>
                    )}
                  </div>
                )}

                {section.subsections && (
                  <div className="space-y-8">
                    {section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex}>
                        <h3 className="font-space-grotesk text-xl font-semibold text-foreground mb-6">
                          {subsection.title}
                        </h3>

                        <div
                          className="text-muted-foreground leading-relaxed mb-6"
                          dangerouslySetInnerHTML={{ __html: renderMarkdown(subsection.content) }}
                        />

                        {subsection.codeBlock && (
                          <div className="mb-6 bg-card/50 border border-border/40 p-4 rounded-lg">
                            <pre className="overflow-auto text-sm text-white leading-relaxed">
                              <code className="font-mono">{subsection.codeBlock}</code>
                            </pre>
                          </div>
                        )}

                        {subsection.image && (
                          <div className="mb-6">
                            <Image
                              src={subsection.image}
                              alt={subsection.imageAlt || ""}
                              width={600}
                              height={300}
                              className="rounded-lg border border-border/50 w-full"
                            />
                            {subsection.imageAlt && (
                              <p className="text-sm text-muted-foreground mt-3 text-center italic">
                                {subsection.imageAlt}
                              </p>
                            )}
                          </div>
                        )}

                      </div>
                    ))}
                  </div>
                )}

                {section.callout && (
                  <CalloutCard type={section.callout.type} content={section.callout.content} />
                )}
              </motion.section>
            ))}
          </div>

          {/* Conclusion */}
          {post.content.conclusion && (
            <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-border/50">
              <p
                className="text-lg leading-relaxed text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content.conclusion) }}
              />
            </motion.div>
          )}

          {/* Footer */}
          <motion.div variants={itemVariants} className="mt-16 pt-8 border-t border-border/50 text-center">
            <Link href="/blog">
              <Button variant="outline" size="lg" className="group hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                More posts
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { blogPosts } from "@/data/projects";
import { ArrowRight, Calendar } from "lucide-react";

export function BlogSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <section id="blog" className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="font-space-grotesk text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Latest thoughts
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Occasional deep dives into building, designing, and the beautiful chaos of creating things.
            </p>
          </motion.div>

          <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {blogPosts.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <Card className="group h-full cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </div>
                    <h3 className="font-space-grotesk text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-muted/50 hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="text-center">
            <Button
              variant="outline"
              size="lg"
              className="group hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300"
            >
              View all posts
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
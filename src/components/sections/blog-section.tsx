"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { blogPosts } from "@/data/projects";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

export function BlogSection() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  return (
    <section id="blog" className="py-24 md:py-40 bg-black relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-space-grotesk text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tighter">
                Latest <br />
                <span className="text-zinc-600">Insights.</span>
              </h2>
            </motion.div>
          </div>
          <Link href="/blog" className="group flex items-center gap-2 text-white font-mono text-xs uppercase tracking-widest hover:text-zinc-400 transition-colors">
            View Archive <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-px bg-zinc-900 border border-zinc-900">
          {blogPosts.filter(post => post.content).map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <motion.div
                whileHover={{ backgroundColor: "rgba(24, 24, 27, 0.4)" }}
                className="bg-black p-8 md:p-12 transition-colors cursor-pointer group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-4">
                    <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">{formatDate(post.date)}</span>
                    <h3 className="font-space-grotesk text-2xl md:text-3xl font-bold text-white group-hover:text-zinc-300 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-zinc-400 max-w-2xl font-light">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-600 group-hover:text-white group-hover:border-white transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
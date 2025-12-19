"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function ContactSection() {

  return (
    <section id="contact" className="py-24 md:py-40 bg-black relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-space-grotesk text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter">
              Let&apos;s Build <br />
              Something Great.
            </h2>
            <p className="text-zinc-400 text-xl md:text-2xl font-light leading-relaxed max-w-2xl mb-12">
              Have a project in mind? Let&apos;s discuss how I can help your startup scale.
            </p>

            <div className="space-y-16">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-black hover:bg-zinc-200 rounded-full px-8 py-6 text-lg font-medium"
                >
                  <a href="https://calendly.com/michael-wagner-hello/30min" target="_blank" rel="noopener noreferrer">
                    Get in touch
                  </a>
                </Button>

                <a href="mailto:michael.wagner.hello@gmail.com" className="text-xl md:text-2xl font-medium text-white hover:text-zinc-400 transition-colors">
                  michael.wagner.hello@gmail.com
                </a>
              </div>

              <div className="space-y-8 pt-8 border-t border-zinc-900">
                <p className="text-sm font-mono uppercase tracking-widest text-zinc-500">Connect</p>
                <div className="flex flex-wrap gap-x-12 gap-y-6">
                  <a href="https://www.linkedin.com/in/randomiser/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-all hover:scale-110 uppercase tracking-widest text-lg font-mono">
                    LinkedIn
                  </a>
                  <a href="#" className="text-zinc-400 hover:text-white transition-all hover:scale-110 uppercase tracking-widest text-lg font-mono">
                    X
                  </a>
                  <a href="mailto:michael.wagner.hello@gmail.com" className="text-white hover:text-emerald-400 transition-all hover:scale-105 uppercase tracking-widest text-lg font-mono border-b-2 border-emerald-500/50 pb-1">
                    Email
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
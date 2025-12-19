"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function HeroSection() {
  const unicornRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAndInitUnicorn = () => {
      // Force re-initialization on navigation
      if (window.UnicornStudio) {
        window.UnicornStudio.isInitialized = false;
      }

      if (!window.UnicornStudio) {
        window.UnicornStudio = {
          isInitialized: false,
          init: () => { }
        };
      }

      // Check if script already exists
      const existingScript = document.querySelector('script[src*="unicornstudio"]');

      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.30/dist/unicornStudio.umd.js";
        script.onload = () => {
          initializeUnicorn();
        };
        (document.head || document.body).appendChild(script);
      } else {
        // Script exists, just initialize
        setTimeout(initializeUnicorn, 100);
      }
    };

    const initializeUnicorn = () => {
      if (window.UnicornStudio && window.UnicornStudio.init && !window.UnicornStudio.isInitialized) {
        window.UnicornStudio.init();
        window.UnicornStudio.isInitialized = true;

        // Remove UnicornStudio badges after initialization
        setTimeout(() => {
          removeBadges();
        }, 1000);
      }
    };

    const removeBadges = () => {
      const badges = document.querySelectorAll([
        '[data-us-project] .us-badge',
        '[data-us-project] .unicorn-badge',
        '[data-us-project] .us-watermark',
        '[data-us-project] .unicorn-watermark',
        '.unicorn-studio-badge',
        '.us-branding'
      ].join(', '));

      badges.forEach(badge => {
        if (badge && (badge.textContent?.includes('Made with love'))) {
          badge.remove();
        }
      });
    };

    loadAndInitUnicorn();

    // Set up periodic check to remove badges
    const interval = setInterval(removeBadges, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative w-full h-[95vh] flex items-center justify-center overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0">
        <div
          ref={unicornRef}
          data-us-project="cfep70QZ0lIDhjjRde2z"
          style={{ width: "100%", height: "100%" }}
          className="opacity-40"
        />
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >


            <motion.h1
              className="font-space-grotesk text-6xl md:text-8xl lg:text-[120px] font-bold text-white leading-[0.9] tracking-tighter mb-10"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Building the <br />
              <span className="text-white/50">Next Digital Era.</span>
            </motion.h1>

            <motion.div
              className="flex flex-col gap-10 max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed font-light">
                I consult high growth and web3 startups. I help with prototyping, ops, and growth to ship world-class experiences.
              </p>

              <div className="flex">
                <button
                  onClick={() => document.getElementById('past-projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative px-10 py-5 bg-white text-black font-bold rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    View Work
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
      </motion.div>
    </section>
  );
}

// Declare global UnicornStudio interface
declare global {
  interface Window {
    UnicornStudio: {
      isInitialized: boolean;
      init: () => void;
    };
  }
}
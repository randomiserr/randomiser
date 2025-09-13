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
          init: () => {} 
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
        if (badge && (badge.textContent?.includes('Made with love') )) {
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
    <section id="hero" className="relative w-full h-[80vh] flex items-center justify-center bg-muted/30">
      {/* Windowed Unicorn Studio Background */}
      <div className="relative w-full max-w-6xl lg:max-w-7xl mx-6 lg:mx-8 h-[70vh] rounded-2xl overflow-hidden border border-border/20 shadow-2xl">
        <div className="absolute inset-0 w-full h-full">
          <div 
            ref={unicornRef}
            data-us-project="cfep70QZ0lIDhjjRde2z" 
            style={{ width: "150%", height: "100%" }}
            className="opacity-60"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <motion.h1 
              className="font-space-grotesk text-4xl md:text-6xl lg:text-7xl font-bold text-foreground drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              randomizer
            </motion.h1>
            
            <motion.h2 
              className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-medium drop-shadow"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Builder of strange, useful things.
            </motion.h2>

            <motion.p 
              className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto drop-shadow"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              I prototype fast, ship faster. Randomness as a feature, not a bug.
            </motion.p>

          </motion.div>
        </div>

        {/* Gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20 pointer-events-none" />
      </div>
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
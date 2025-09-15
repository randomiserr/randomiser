"use client";

import { Navbar } from "@/components/ui/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { NowSection } from "@/components/sections/now-section";
import { BlogSection } from "@/components/sections/blog-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {

  return (
    <div className="min-h-screen">
      {/* Skip link for accessibility */}
      <a 
        href="#main-content" 
        className="skip-link"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>
      
      <Navbar />
      
      <main id="main-content" role="main">
        <HeroSection />
        <NowSection />
        <ProjectsSection />
        <BlogSection />
        <ContactSection />
      </main>
    </div>
  );
}
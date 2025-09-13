"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ProjectTile } from "@/components/ui/project-tile";

export function ProjectsSection() {
  const pastProjects = projects.filter(project => project.type === "past");

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
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="past-projects" className="py-20 md:py-32 bg-background/80 relative">
      {/* Darker background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/10 via-card/50 to-slate-800/20" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="font-space-grotesk text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Past projects
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              A collection of things I&apos;ve built, shipped, and learned from. 
            </p>
          </motion.div>

          {/* Masonry-style grid using CSS Grid */}
          <div className="grid gap-8 md:gap-10 lg:gap-12 grid-cols-1 lg:grid-cols-2 auto-rows-min">
            {pastProjects.map((project, index) => (
              <motion.div 
                key={project.id} 
                variants={itemVariants}
                className={
                  index === 0 ? "md:row-span-2" : // First item spans 2 rows on medium screens
                  index === 2 ? "lg:row-span-2" : // Third item spans 2 rows on large screens
                  ""
                }
              >
                <ProjectTile 
                  project={project}
                  delay={index * 0.1}
                  size={
                    index === 0 ? "large" :
                    index === 2 ? "large" : 
                    "default"
                  }
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
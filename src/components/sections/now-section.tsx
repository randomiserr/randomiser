"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ProjectTile } from "@/components/ui/project-tile";

export function NowSection() {
  const nowProjects = projects.filter(project => project.type === "now");

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
        
      }
    }
  };

  return (
    <section id="building" className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="font-space-grotesk text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              What I&apos;m building
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Current experiments or tools I&apos;m working on, mostly things that I&apos;m missing on the market or find interesting.
            </p>
          </motion.div>

          <div className="grid gap-8 md:gap-10 lg:gap-12 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {nowProjects.map((project, index) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectTile 
                  project={project}
                  delay={index * 0.1}
                  size="large"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
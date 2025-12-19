"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ProjectTile } from "@/components/ui/project-tile";

export function ProjectsSection() {
  const pastProjects = projects.filter(project => project.type === "past");

  return (
    <section id="past-projects" className="py-24 md:py-40 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-space-grotesk text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tighter">
              Previous <br />
              <span className="text-zinc-600">work.</span>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-zinc-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed"
            >
              A brief selection of some of my previous projects
            </motion.p>
          </motion.div>
        </div>

        <div className="grid gap-12 grid-cols-1 lg:grid-cols-2">
          {pastProjects.map((project, index) => (
            <ProjectTile
              key={project.id}
              project={project}
              delay={index * 0.1}
              size={index % 3 === 0 ? "large" : "default"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
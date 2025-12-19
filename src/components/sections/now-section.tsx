"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ProjectTile } from "@/components/ui/project-tile";

export function NowSection() {
  const nowProjects = projects.filter(project => project.type === "now");

  return (
    <section id="building" className="py-24 md:py-40 bg-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-space-grotesk text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tighter">
                Current <br />
                <span className="text-zinc-600">Ventures.</span>
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-zinc-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed"
              >
                Experimenting with AI and new automations, building various demos and MVPs.
              </motion.p>
            </motion.div>
          </div>
        </div>

        <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {nowProjects.map((project, index) => (
            <ProjectTile
              key={project.id}
              project={project}
              delay={index * 0.1}
              size="default"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
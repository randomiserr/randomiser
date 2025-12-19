"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, Variants } from "framer-motion";
import { Card, CardContent, CardHeader } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import { Project } from "@/data/projects";
import { ExternalLink, ChevronUp, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectTileProps {
  project: Project;
  delay?: number;
  size?: "default" | "large";
}

export function ProjectTile({ project, delay = 0, size = "default" }: ProjectTileProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const hoverRotation = 0;

  // Motion values for hover effects
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [2, -2]);
  const rotateY = useTransform(x, [-100, 100], [-2, 2]);

  // Smooth spring animations
  const springConfig = { stiffness: 150, damping: 25, mass: 0.1 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const tileVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={tileVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      onClick={() => setIsExpanded(!isExpanded)}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
      }}
      className="perspective-1000 cursor-pointer w-full"
    >
      <Card
        className={`
          group relative cursor-pointer transition-all duration-500 overflow-hidden border border-zinc-800/50 bg-[#0A0A0A]
          ${size === "large" ? "h-auto min-h-[500px]" : "h-auto min-h-[400px]"}
          hover:border-zinc-500/50 focus-within:ring-2 focus-within:ring-white/20
        `}
        style={{
          boxShadow: isHovered
            ? `0 40px 80px -20px rgba(0, 0, 0, 0.8)`
            : `none`,
        }}
        aria-expanded={isExpanded}
      >
        {/* Background media */}
        {(project.video || project.image) && (
          <div className="absolute inset-0 z-0">
            {project.video ? (
              <video
                src={project.video}
                autoPlay
                loop
                muted
                playsInline
                className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}
              />
            ) : (
              <Image
                src={project.image}
                alt={`${project.title} background`}
                fill
                className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
            {/* Dark Gradient Overlay */}
            <div className={`absolute inset-0 z-10 bg-black/40 transition-opacity duration-500 ${(isHovered || isExpanded) ? 'opacity-100' : 'opacity-0'}`} />
            <div className={`absolute inset-0 z-10 bg-gradient-to-t from-black via-black/80 to-black/40 transition-opacity duration-500 ${(isHovered || isExpanded) ? 'opacity-100' : 'opacity-90'}`} />
          </div>
        )}

        <CardHeader className="relative z-20 p-8 flex flex-col h-full min-h-[inherit]">
          <div className="flex-1 flex flex-col space-y-6">
            {/* Project Header - Always at the Top */}
            <div className="space-y-3">
              <motion.div
                animate={{ x: isHovered ? 10 : 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest">{project.type}</span>
                <div className="h-px w-8 bg-zinc-800" />
              </motion.div>
              <h3 className="font-space-grotesk text-3xl md:text-4xl font-bold text-white leading-tight">
                {project.title}
              </h3>
            </div>

            {/* Content Area - Swaps on click */}
            <div className="flex-1 overflow-hidden">
              {!isExpanded ? (
                <motion.div
                  key="oneliner"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <p className="text-white text-xl leading-relaxed max-w-md font-medium drop-shadow-sm">
                    {project.oneliner}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] uppercase tracking-tighter text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded-sm bg-black/60 backdrop-blur-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="details"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Selected Highlights</h4>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsExpanded(false);
                      }}
                      className="text-zinc-500 hover:text-white transition-colors p-1"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                  </div>
                  <ul className="space-y-3">
                    {project.details.map((detail, index) => (
                      <li key={index} className="text-[15px] text-white flex items-start gap-3 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 bg-white/40 shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Project Footer - Links and Action */}
            <div className="pt-6 mt-auto border-t border-zinc-800/50 flex items-center justify-between">
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-white text-sm font-medium hover:text-zinc-300 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  Visit Site <ExternalLink className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>
              ) : (
                <div className="text-zinc-500 text-xs font-mono uppercase tracking-widest">
                  Internal Project
                </div>
              )}

              <button
                className="text-[10px] text-zinc-500 font-mono hover:text-white transition-colors uppercase tracking-wider"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
              >
                {isExpanded ? "Back to Summary" : "View Details"}
              </button>
            </div>
          </div>
        </CardHeader>

        {/* Action Button - Hint to click */}
        {!isExpanded && (
          <div className={`absolute bottom-8 right-8 z-30 transition-all duration-500 ${isHovered ? 'opacity-100 scale-100' : 'opacity-80 scale-95'}`}>
            <div className="px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center gap-2 text-white text-xs font-medium">
              Details <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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

  // Assign vibrant colors based on project
  const getProjectColor = () => {
    const colors = [
      { name: "electric-blue", value: "#3B82F6", css: "rgb(59 130 246)" },
      { name: "mint", value: "#10B981", css: "rgb(16 185 129)" },
      { name: "purple", value: "#8B5CF6", css: "rgb(139 92 246)" },
      { name: "coral", value: "#F97316", css: "rgb(249 115 22)" },
      { name: "pink", value: "#EC4899", css: "rgb(236 72 153)" },
      { name: "lime", value: "#84CC16", css: "rgb(132 204 22)" },
    ];
    const index = project.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };
  
  const accentColor = getProjectColor();
  const hoverRotation = 0.5; // More subtle rotation
  const jitter = { x: 1, y: 1 }; // More subtle jitter

  // Motion values for hover effects (more subtle)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  // Smooth spring animations
  const springConfig = { stiffness: 100, damping: 20, mass: 0.2 };
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

  const tileVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay,
        
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
      className="perspective-1000 cursor-pointer"
    >
      <Card
        className={`
          group relative cursor-pointer transition-all duration-300 overflow-hidden border-0
          ${size === "large" ? "h-auto min-h-[500px]" : "h-auto min-h-[400px]"}
          hover:shadow-2xl hover:-translate-y-1
          backdrop-blur-sm focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 focus-within:ring-offset-background
        `}
        style={{
          backgroundColor: project.type === "now" ? accentColor.value : undefined,
          transform: isHovered 
            ? `rotate(${hoverRotation}deg) translate(${jitter.x}px, ${jitter.y}px)`
            : undefined,
          boxShadow: isHovered 
            ? `0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 30px ${accentColor.value}60`
            : `0 15px 35px -5px rgba(0, 0, 0, 0.4), 0 0 15px ${accentColor.value}40`,
        }}
        aria-expanded={isExpanded}
      >
        {/* Background media (video for current projects, image for past projects) */}
        {(project.video || project.type === "past") && (
          <div className="absolute inset-0 z-0">
            {project.video ? (
              <video 
                src={project.video} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover pointer-events-none" 
              />
            ) : (
              <Image
                src={project.image}
                alt={`${project.title} background`}
                fill
                className="object-cover pointer-events-none"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
            {/* Gradient overlay for better text readability */}
            <div className={`absolute inset-0 z-10 bg-gradient-to-t ${
              isExpanded 
                ? 'from-black/95 via-black/85 to-black/60' 
                : project.type === "past" 
                  ? 'from-black/90 via-black/60 to-black/40'
                  : 'from-black/70 via-black/30 to-black/10'
            } transition-all duration-300`} />
          </div>
        )}

        <CardHeader className="relative z-20 space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h3 className="font-space-grotesk text-xl md:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg">
                {project.title}
              </h3>
              {(isExpanded || !project.video) && (
                <p className="text-white/90 text-sm md:text-base lg:text-lg leading-relaxed drop-shadow flex-1">
                  {project.oneliner}
                </p>
              )}
            </div>

          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                className="text-xs bg-white/20 text-white border-white/30 backdrop-blur-sm"
              >
                {tag}
              </Badge>
            ))}
          </div>

        </CardHeader>

        {/* More indicator in bottom corner when not expanded */}
        {!isExpanded && (
          <div className="absolute bottom-4 right-4 z-20">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
              <span>more</span>
              <ArrowRight className="h-3 w-3" />
            </div>
          </div>
        )}

        {/* Additional overlay for expanded state - covers entire card */}
        {isExpanded && (
          <div className="absolute inset-0 z-15 bg-black/50 backdrop-blur-sm" />
        )}

        {/* Expanded content */}
        <div
          className={`relative z-20 overflow-hidden transition-all duration-300 ease-out ${
            isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <CardContent className="relative z-10 pt-0 space-y-4">

            {/* Project details */}
            <div className="space-y-3">
              <h4 className="font-medium text-white">Key highlights:</h4>
              <ul className="space-y-2">
                {project.details.map((detail, index) => (
                  <li key={index} className="text-sm text-white/90 flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full mt-2 shrink-0 bg-white/60" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              {project.link && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="border-white/30 text-white hover:bg-white/20 hover:text-white hover:border-white/50"
                  onClick={(e) => e.stopPropagation()}
                >
                  {project.link.startsWith('http') ? (
                    <a 
                      href={project.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View project <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  ) : (
                    <Link href={project.link}>
                      View project <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  )}
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="ml-auto text-white/70 hover:text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(false);
                }}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}
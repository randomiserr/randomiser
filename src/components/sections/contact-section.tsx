"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Send, Linkedin, X } from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after showing success message
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
    <section id="contact" className="py-20 md:py-32 bg-gradient-to-br from-slate-900/50 via-blue-900/30 to-slate-800/40 relative overflow-hidden">
      {/* Clean background with just top border */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-16 text-center">
            <h2 className="font-space-grotesk text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Get in touch
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Have an interesting project or just want to say hello? 
              I&apos;m always open to discussing new opportunities and ideas.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <motion.div variants={itemVariants}>
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Mail className="h-5 w-5" />
                      Send a message
                    </CardTitle>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-foreground">Connect with me</span>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="p-2 hover:bg-accent hover:text-accent-foreground"
                        >
                          <a 
                            href="https://linkedin.com/in/randomiser" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="LinkedIn profile"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="p-2 hover:bg-accent hover:text-accent-foreground"
                        >
                          <a 
                            href="https://x.com/randomiser" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="X (Twitter) profile"
                          >
                            <X className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-8 text-center"
                    >
                      <div className="mb-4 text-4xl">✨</div>
                      <h3 className="text-lg font-medium text-foreground mb-2">Message sent!</h3>
                      <p className="text-muted-foreground">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                            Name
                          </label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                            Email
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell me about your project or just say hello..."
                          className="w-full h-24 resize-none"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                      >
                        {isSubmitting ? (
                          <>Sending...</>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send message
                          </>
                        )}
                      </Button>
                      
                      <div className="text-center mt-4">
                        <span className="text-sm text-muted-foreground">or </span>
                        <a 
                          href="https://calendly.com/randomiserog/30min" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-accent hover:text-accent/80 underline underline-offset-4 transition-colors"
                        >
                          book a call on Calendly
                        </a>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
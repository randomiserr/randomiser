"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "./button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { ContactForm } from "./contact-form";
import Link from "next/link";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [isContactOpen, setIsContactOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "building", "past-projects", "blog", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const navItems = [
    { id: "building", label: "Building" },
    { id: "past-projects", label: "Past projects" },
    { id: "contact", label: "Contact" },
  ];

  const externalNavItems = [
    { href: "/blog", label: "Blog" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {isHomePage ? (
              <button
                onClick={() => scrollToSection("hero")}
                className="font-space-grotesk text-2xl font-bold text-foreground hover:text-accent transition-colors focus:outline-none rounded-md px-3 py-2"
              >
                randomiser
              </button>
            ) : (
              <Link
                href="/"
                className="font-space-grotesk text-2xl font-bold text-foreground hover:text-accent transition-colors focus:outline-none rounded-md px-3 py-2"
              >
                randomiser
              </Link>
            )}

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                isHomePage ? (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative text-base transition-all duration-300 ease-out focus:outline-none rounded-md px-4 py-3 group ${
                      activeSection === item.id
                        ? "text-accent font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                    <span 
                      className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ease-out ${
                        activeSection === item.id 
                          ? "w-full" 
                          : "w-0 group-hover:w-full"
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    key={item.id}
                    href={`/#${item.id}`}
                    className="relative text-base transition-all duration-300 ease-out focus:outline-none rounded-md px-4 py-3 group text-muted-foreground hover:text-foreground"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ease-out w-0 group-hover:w-full" />
                  </Link>
                )
              ))}
              {externalNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-base transition-all duration-300 ease-out focus:outline-none rounded-md px-4 py-3 group ${
                    pathname === item.href
                      ? "text-accent font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  <span 
                    className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ease-out ${
                      pathname === item.href
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </div>

            <div className="md:hidden">
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                size="sm"
              >
                Contact
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Get in touch</DialogTitle>
          </DialogHeader>
          <ContactForm onClose={() => setIsContactOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
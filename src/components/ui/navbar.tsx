"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      // Handle scrolled state for styling
      setScrolled(window.scrollY > 50);

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

  const headerStyles = scrolled
    ? "bg-white/90 backdrop-blur-xl border-b border-black/5"
    : "bg-transparent border-b border-transparent";

  const textStyles = scrolled ? "text-black" : "text-white";
  const mutedTextStyles = scrolled ? "text-zinc-500 hover:text-black" : "text-zinc-400 hover:text-white";
  const activeTextStyles = scrolled ? "text-black font-semibold" : "text-white font-semibold";

  return (
    <>
      <nav className={`fixed top-0 z-50 w-full transition-all duration-500 ease-in-out ${headerStyles}`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {isHomePage ? (
              <button
                onClick={() => scrollToSection("hero")}
                className={`font-space-grotesk text-2xl font-bold tracking-tight transition-colors focus:outline-none ${textStyles}`}
              >
                randomiser.
              </button>
            ) : (
              <Link
                href="/"
                className={`font-space-grotesk text-2xl font-bold tracking-tight transition-colors focus:outline-none ${textStyles}`}
              >
                randomiser.
              </Link>
            )}

            <div className="hidden md:flex items-center space-x-10">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return isHomePage ? (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative text-[15px] tracking-wide transition-all duration-300 ease-out focus:outline-none group ${isActive ? activeTextStyles : mutedTextStyles
                      }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] transition-all duration-300 ease-out ${scrolled ? "bg-black" : "bg-white"
                        } ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                    />
                  </button>
                ) : (
                  <Link
                    key={item.id}
                    href={`/#${item.id}`}
                    className={`relative text-[15px] tracking-wide transition-all duration-300 ease-out focus:outline-none group ${mutedTextStyles}`}
                  >
                    {item.label}
                    <span className={`absolute -bottom-1 left-0 h-[2px] transition-all duration-300 ease-out ${scrolled ? "bg-black" : "bg-white"} w-0 group-hover:w-full`} />
                  </Link>
                );
              })}
              {externalNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-[15px] tracking-wide transition-all duration-300 ease-out focus:outline-none group ${pathname === item.href ? activeTextStyles : mutedTextStyles
                    }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] transition-all duration-300 ease-out ${scrolled ? "bg-black" : "bg-white"
                      } ${pathname === item.href ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://calendly.com/michael-wagner-hello/30min"
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden md:block px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${scrolled
                  ? "bg-black text-white hover:bg-zinc-800"
                  : "bg-white text-black hover:bg-zinc-200"
                  }`}
              >
                Get in touch
              </a>
              <div className="md:hidden">
                <a
                  href="https://calendly.com/michael-wagner-hello/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${scrolled
                    ? "bg-black text-white border-black hover:bg-zinc-800"
                    : "border-white text-white hover:bg-white hover:text-black"}`}
                >
                  Get in touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
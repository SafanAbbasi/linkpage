"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import ProfileHeader from "./ProfileHeader";
import AnimatedLinks from "./AnimatedLinks";
import ScrollNav from "./ScrollNav";
import AboutSection from "./AboutSection";
import ProjectsGrid from "./ProjectsGrid";
import SkillsSection from "./SkillsSection";
import ContactSection from "./ContactSection";
import SectionDivider from "./SectionDivider";
import ThemeToggle from "./ThemeToggle";
import type { LinkItem } from "@/data/links";

let _hasPlayed = false;

const floatingShapes = [
  { size: 10, x: "8%", y: "12%", duration: 7 },
  { size: 6, x: "88%", y: "20%", duration: 9 },
  { size: 14, x: "50%", y: "85%", duration: 8 },
  { size: 8, x: "20%", y: "70%", duration: 6 },
  { size: 12, x: "78%", y: "55%", duration: 10 },
  { size: 6, x: "35%", y: "8%", duration: 8.5 },
  { size: 8, x: "92%", y: "75%", duration: 6.5 },
  { size: 10, x: "12%", y: "45%", duration: 7.5 },
];

export default function InteractivePage({ links }: { links: LinkItem[] }) {
  const shouldAnimate = useRef(!_hasPlayed).current;
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    _hasPlayed = true;
    const handleScroll = () => {
      setShowScrollHint(window.scrollY < window.innerHeight * 0.3);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <main
      onMouseMove={handleMouseMove}
      className="relative bg-gray-50 transition-colors duration-300 dark:bg-gray-950"
    >
      <ThemeToggle />
      <ScrollNav />

      {/* Fixed background layer */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Gradient mesh blobs */}
        <motion.div
          className="absolute top-[5%] left-[5%] h-96 w-96 rounded-full bg-teal-200 opacity-40 blur-[140px] dark:bg-purple-600 dark:opacity-30"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 50, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[45%] right-[0%] h-[28rem] w-[28rem] rounded-full bg-purple-200 opacity-35 blur-[140px] dark:bg-teal-500 dark:opacity-25"
          animate={{
            x: [0, -90, 40, 0],
            y: [0, 60, -40, 0],
            scale: [1, 0.85, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[30%] h-80 w-80 rounded-full bg-pink-200 opacity-30 blur-[140px] dark:bg-pink-500 dark:opacity-20"
          animate={{
            x: [0, 70, -60, 0],
            y: [0, -40, 70, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[25%] left-[50%] h-72 w-72 rounded-full bg-blue-200 opacity-25 blur-[140px] dark:bg-blue-500 dark:opacity-15"
          animate={{
            x: [0, -50, 60, 0],
            y: [0, 70, -30, 0],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating decorative elements */}
        {floatingShapes.map((shape, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-teal-400/15 dark:bg-teal-400/25"
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.x,
              top: shape.y,
            }}
            animate={{
              y: [0, -25, 8, -15, 0],
              x: [0, 12, -8, 15, 0],
              opacity: [0.2, 0.5, 0.15, 0.4, 0.2],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Cursor spotlight — hidden on touch devices */}
        <div
          className="absolute hidden rounded-full transition-all duration-150 md:block"
          style={{
            left: mousePos.x - 250,
            top: mousePos.y - 250,
            width: 500,
            height: 500,
            position: "fixed",
            background:
              "radial-gradient(circle, rgba(13,148,136,0.12) 0%, rgba(13,148,136,0.04) 40%, transparent 70%)",
          }}
        />
      </div>

      {/* Scrolling content */}
      <div className="relative z-10">
        {/* Hero section — centered in viewport */}
        <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-8">
          <div className="w-full max-w-2xl">
            <ProfileHeader shouldAnimate={shouldAnimate} />
            <div className="mx-auto w-full max-w-lg">
              <AnimatedLinks links={links} shouldAnimate={shouldAnimate} />
            </div>
          </div>

          {/* Scroll indicator — clickable, hides on scroll */}
          <AnimatePresence>
          {showScrollHint && (
          <motion.a
            href="#about"
            className="absolute bottom-8 left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-2 transition-colors hover:text-teal-500 dark:hover:text-teal-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-xs font-medium tracking-wider text-gray-400 uppercase dark:text-gray-500">
              Scroll to explore
            </span>
            <motion.svg
              className="h-5 w-5 text-gray-400 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </motion.svg>
          </motion.a>
          )}
          </AnimatePresence>
        </section>

        {/* Portfolio sections */}
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <ProjectsGrid />
        <SectionDivider />
        <SkillsSection />
        <SectionDivider />
        <ContactSection />
      </div>
    </main>
  );
}

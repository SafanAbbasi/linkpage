"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import ProfileHeader from "./ProfileHeader";
import AnimatedLinks from "./AnimatedLinks";
import Footer from "./Footer";
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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    _hasPlayed = true;
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  return (
    <main
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-gray-50 transition-colors duration-300 dark:bg-gray-950"
    >
      <ThemeToggle />

      {/* Gradient mesh — bolder blobs */}
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

      {/* Cursor spotlight — stronger */}
      <div
        className="pointer-events-none absolute z-10 rounded-full transition-all duration-150"
        style={{
          left: mousePos.x - 250,
          top: mousePos.y - 250,
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(13,148,136,0.12) 0%, rgba(13,148,136,0.04) 40%, transparent 70%)",
        }}
      />

      {/* Page content — centered in viewport */}
      <div className="relative z-20 mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 py-8">
        <ProfileHeader shouldAnimate={shouldAnimate} />
        <div className="w-full max-w-md">
          <AnimatedLinks links={links} shouldAnimate={shouldAnimate} />
        </div>
        <Footer shouldAnimate={shouldAnimate} />
      </div>
    </main>
  );
}

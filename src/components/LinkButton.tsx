"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaGithub, FaLinkedinIn, FaRocket } from "react-icons/fa";
import { HiOutlineGlobeAlt, HiOutlineDocumentText } from "react-icons/hi";
import type { LinkItem } from "@/data/links";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Code: FaGithub,
  Briefcase: FaLinkedinIn,
  Globe: HiOutlineGlobeAlt,
  FileText: HiOutlineDocumentText,
  Rocket: FaRocket,
};

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  color: string;
}

const particleColors = [
  "#0d9488",
  "#a855f7",
  "#ec4899",
  "#f59e0b",
  "#3b82f6",
  "#ffffff",
];

export default function LinkButton({ link }: { link: LinkItem }) {
  const Icon = link.icon ? iconMap[link.icon] : null;
  const [isFlipped, setIsFlipped] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Track click (fire and forget)
      fetch("/api/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ linkId: link.id }),
      }).catch(() => {});

      // Spawn particles
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newParticles: Particle[] = Array.from({ length: 10 }, (_, i) => ({
        id: Date.now() + i,
        x,
        y,
        angle: (360 / 10) * i + Math.random() * 20 - 10,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
      }));
      setParticles((prev) => [...prev, ...newParticles]);
      setTimeout(() => {
        setParticles((prev) =>
          prev.filter((p) => !newParticles.some((np) => np.id === p.id))
        );
      }, 700);
    },
    [link.id]
  );

  return (
    <div className="relative overflow-visible">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        className="block"
        style={{ perspective: 800 }}
      >
        <motion.div
          className="relative h-[52px] w-full"
          style={{
            transformStyle: "preserve-3d",
            boxShadow: isFlipped
              ? `0 0 25px ${link.bgColor}40, 0 0 50px ${link.bgColor}20, 0 8px 32px rgba(0,0,0,0.12)`
              : "0 4px 16px rgba(0,0,0,0.06)",
          }}
          animate={{ rotateX: isFlipped && link.description ? 180 : 0 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Front face */}
          <div
            className="absolute inset-0 flex items-center gap-3 rounded-xl border border-gray-200/60 bg-white/60 px-5 font-semibold text-gray-900 backdrop-blur-md dark:border-white/15 dark:bg-white/10 dark:text-white"
            style={{ backfaceVisibility: "hidden" }}
          >
            {Icon && (
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg shadow-sm"
                style={{ backgroundColor: link.bgColor }}
              >
                <Icon className="h-4 w-4 text-white" />
              </span>
            )}
            <span className="flex-1">{link.label}</span>
            <svg
              className="h-4 w-4 shrink-0 text-gray-400 dark:text-white/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>

          {/* Back face */}
          {link.description && (
            <div
              className="absolute inset-0 flex items-center gap-3 rounded-xl border px-5 backdrop-blur-md"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateX(180deg)",
                borderColor: `${link.bgColor}60`,
                backgroundColor: `${link.bgColor}20`,
              }}
            >
              {Icon && (
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg shadow-sm"
                  style={{ backgroundColor: link.bgColor }}
                >
                  <Icon className="h-4 w-4 text-white" />
                </span>
              )}
              <span className="flex-1 text-sm text-gray-600 dark:text-gray-300">
                {link.description}
              </span>
            </div>
          )}
        </motion.div>
      </a>
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="pointer-events-none absolute rounded-full"
            style={{ backgroundColor: p.color }}
            initial={{
              x: p.x - 3,
              y: p.y - 3,
              width: 6,
              height: 6,
              opacity: 1,
            }}
            animate={{
              x: p.x + Math.cos((p.angle * Math.PI) / 180) * 80 - 3,
              y: p.y + Math.sin((p.angle * Math.PI) / 180) * 80 - 3,
              opacity: 0,
              scale: 0.2,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

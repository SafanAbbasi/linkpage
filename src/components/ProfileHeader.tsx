"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { profile } from "@/data/links";

function TypewriterText({
  text,
  speed = 60,
  delay = 0,
  enabled = true,
}: {
  text: string;
  speed?: number;
  delay?: number;
  enabled?: boolean;
}) {
  const [displayed, setDisplayed] = useState(enabled ? "" : text);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const startTimeout = setTimeout(() => {
      setShowCursor(true);
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setTimeout(() => setShowCursor(false), 1200);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [text, speed, delay, enabled]);

  return (
    <span>
      {displayed}
      {showCursor && (
        <motion.span
          className="ml-0.5 inline-block w-[2px] bg-teal-500 dark:bg-teal-400"
          style={{ height: "1em", verticalAlign: "text-bottom" }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </span>
  );
}

export default function ProfileHeader({
  shouldAnimate = true,
}: {
  shouldAnimate?: boolean;
}) {
  const [imgError, setImgError] = useState(false);
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="flex flex-col items-center pb-4">
      {/* Floating avatar with glowing ring */}
      <motion.div
        className="relative"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute -inset-2 rounded-full bg-teal-400/25 blur-lg dark:bg-teal-400/30"
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.15, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="relative h-[140px] w-[140px] overflow-hidden rounded-full p-1 shadow-lg shadow-teal-500/25"
          style={{ backgroundColor: "#0d9488" }}
        >
          {imgError ? (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-3xl font-bold text-gray-700 dark:bg-gray-900 dark:text-gray-200">
              {initials}
            </div>
          ) : (
            <Image
              src={profile.avatarUrl}
              alt={profile.name}
              width={140}
              height={140}
              className="h-full w-full rounded-full object-cover"
              priority
              onError={() => setImgError(true)}
            />
          )}
        </div>
      </motion.div>

      {/* Bold greeting — typewriter */}
      <h1 className="mt-4 text-center text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
        <TypewriterText
          text={profile.greeting}
          speed={60}
          delay={100}
          enabled={shouldAnimate}
        />
      </h1>

      {/* Title with rocket */}
      <motion.p
        className="mt-2 text-center text-base font-semibold text-teal-700 md:text-lg dark:text-teal-300"
        initial={shouldAnimate ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={
          shouldAnimate
            ? { delay: 1.1, duration: 0.5, ease: "easeOut" }
            : { duration: 0 }
        }
      >
        {profile.title} 🚀
      </motion.p>

      {/* Skills row */}
      <motion.p
        className="mt-2 text-center text-sm tracking-wide text-gray-500 dark:text-gray-400"
        initial={shouldAnimate ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={
          shouldAnimate
            ? { delay: 1.4, duration: 0.5, ease: "easeOut" }
            : { duration: 0 }
        }
      >
        {profile.skills.join("  •  ")}
      </motion.p>

      {/* Bio */}
      <motion.p
        className="mt-2 max-w-md text-center text-sm text-gray-500 dark:text-gray-400"
        initial={shouldAnimate ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={
          shouldAnimate
            ? { delay: 1.6, duration: 0.5, ease: "easeOut" }
            : { duration: 0 }
        }
      >
        {profile.bio}
      </motion.p>

    </div>
  );
}

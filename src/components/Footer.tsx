"use client";

import { motion } from "motion/react";

export default function Footer({
  shouldAnimate = true,
}: {
  shouldAnimate?: boolean;
}) {
  return (
    <motion.footer
      className="pb-6 pt-6 text-center text-xs text-gray-400 dark:text-gray-600"
      initial={shouldAnimate ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={
        shouldAnimate ? { delay: 2.5, duration: 0.5 } : { duration: 0 }
      }
    >
      &copy; {new Date().getFullYear()} Safan Abbasi
    </motion.footer>
  );
}

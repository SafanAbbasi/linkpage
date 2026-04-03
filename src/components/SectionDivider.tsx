"use client";

import { motion } from "motion/react";

export default function SectionDivider() {
  return (
    <motion.div
      className="mx-auto flex max-w-xs items-center gap-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-700" />
      <div className="h-1.5 w-1.5 rounded-full bg-teal-500/50" />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-700" />
    </motion.div>
  );
}

"use client";

import { motion } from "motion/react";

const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "1", label: "NASA Patent" },
  { value: "5", label: "Certifications" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <motion.h2
          className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>

        <motion.p
          className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          I&apos;m a Full-Stack Software Engineer with a passion for building
          scalable, impactful solutions. From engineering enterprise platforms
          that generated $50M in production value to co-inventing a NASA patent,
          I thrive on tackling complex technical challenges. My work spans AI &
          LLM systems, cloud architecture, and full-stack development — always
          with a focus on delivering real results.
        </motion.p>

        {/* Stats row */}
        <div className="mt-12 grid grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="rounded-xl border border-gray-200/40 bg-white/40 p-5 text-center backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
            >
              <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

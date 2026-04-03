"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { FaRocket, FaRobot, FaCode } from "react-icons/fa";

const projects = [
  {
    title: "AI Prompt Generation & MCP Server",
    year: "2025",
    description:
      "Containerized codebase analysis platform generating deterministic prompt artifacts for LLM debugging and refactoring. Built an MCP-compliant server exposing schema-validated tools to Claude Desktop.",
    tech: ["Python", "FastAPI", "Docker", "Gemini", "FastMCP"],
    icon: FaRobot,
    color: "#8b5cf6",
    link: "https://github.com/SafanAbbasi/GeneratePromptTool",
    linkLabel: "View Source",
  },
  {
    title: "NASA Patent",
    year: "2024",
    description:
      "Co-invented a laser-based method for triggering thermal runaway of a battery. Contributed to the core technical approach and fine-tuned testing parameters from concept through patent issuance.",
    tech: ["Research", "Engineering", "Patent"],
    icon: FaRocket,
    color: "#0d9488",
    link: "https://patents.google.com/patent/US12174259B1/en?oq=12174259",
    linkLabel: "View Patent",
  },
  {
    title: "LinkPage",
    year: "2025",
    description:
      "This portfolio site — built from scratch with Next.js 16, featuring animated backgrounds, card flip interactions, click analytics, an admin dashboard, and a contact form.",
    tech: ["Next.js", "React", "Supabase", "Motion", "Tailwind"],
    icon: FaCode,
    color: "#3b82f6",
    link: "https://github.com/SafanAbbasi/linkpage",
    linkLabel: "View Source",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = project.icon;

  return (
    <motion.div
      className="group relative rounded-2xl border border-gray-200/40 bg-white/40 p-6 backdrop-blur-sm transition-shadow dark:border-white/10 dark:bg-white/5"
      style={{
        boxShadow: isHovered
          ? `0 0 30px ${project.color}30, 0 8px 32px rgba(0,0,0,0.12)`
          : "0 4px 16px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <div className="mb-4 flex items-center gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: project.color }}
        >
          <Icon className="h-5 w-5 text-white" />
        </span>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white">
            {project.title}
          </h3>
          <p className="text-xs text-gray-400">{project.year}</p>
        </div>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {project.description}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-white/10 dark:text-gray-300"
          >
            {t}
          </span>
        ))}
      </div>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
        >
          {project.linkLabel}
          <svg
            className="h-3.5 w-3.5"
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
        </a>
      )}
    </motion.div>
  );
}

export default function ProjectsGrid() {
  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <motion.h2
          className="mb-10 text-center text-3xl font-bold text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "motion/react";
import type { FC } from "react";
import {
  SiPython,
  SiDocker,
  SiReact,
  SiTypescript,
  SiKubernetes,
  SiDotnet,
  SiPostgresql,
  SiGit,
  SiRust,
  SiTerraform,
  SiAngular,
  SiOpenai,
  SiGooglecloud,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiRedis,
  SiFastapi,
  SiAnsible,
  SiGnubash,
  SiGrafana,
  SiCplusplus,
  SiVuedotjs,
  SiGithubactions,
} from "react-icons/si";
import { FaAws, FaDatabase } from "react-icons/fa";
import { VscAzure, VscAzureDevops } from "react-icons/vsc";

interface Skill {
  name: string;
  icon?: FC<{ className?: string }>;
  color?: string;
}

interface SkillGroup {
  category: string;
  color: string;
  skills: Skill[];
}

const skillGroups: SkillGroup[] = [
  {
    category: "AI & LLM Systems",
    color: "#8b5cf6",
    skills: [
      { name: "RAG Pipelines" },
      { name: "MCP" },
      { name: "OpenAI APIs", icon: SiOpenai, color: "#412991" },
      { name: "Gemini APIs" },
      { name: "ChromaDB" },
      { name: "GitHub Copilot", icon: SiGithubactions, color: "#2088FF" },
      { name: "Claude Code" },
    ],
  },
  {
    category: "Programming",
    color: "#3b82f6",
    skills: [
      { name: "C# / .NET", icon: SiDotnet, color: "#512BD4" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Rust", icon: SiRust, color: "#CE422B" },
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Angular", icon: SiAngular, color: "#DD0031" },
      { name: "Vue", icon: SiVuedotjs, color: "#4FC08D" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "HTML / CSS", icon: SiHtml5, color: "#E34F26" },
    ],
  },
  {
    category: "Cloud & Infrastructure",
    color: "#0d9488",
    skills: [
      { name: "Azure", icon: VscAzure, color: "#0078D4" },
      { name: "AWS", icon: FaAws, color: "#FF9900" },
      { name: "GCP", icon: SiGooglecloud, color: "#4285F4" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
      { name: "Terraform", icon: SiTerraform, color: "#7B42BC" },
      { name: "SQL Server", icon: FaDatabase, color: "#CC2927" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Grafana", icon: SiGrafana, color: "#F46800" },
    ],
  },
  {
    category: "Tools & Technologies",
    color: "#f59e0b",
    skills: [
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "REST APIs" },
      { name: "JWT / OAuth2" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
      { name: "FastMCP" },
      { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
      { name: "Azure DevOps", icon: VscAzureDevops, color: "#0078D7" },
      { name: "Ansible", icon: SiAnsible, color: "#EE0000" },
      { name: "Bash", icon: SiGnubash, color: "#4EAA25" },
    ],
  },
  {
    category: "Certifications",
    color: "#ec4899",
    skills: [
      { name: "AZ-104 Azure Administrator", icon: VscAzure, color: "#0078D4" },
      { name: "AI-900 AI Fundamentals", icon: VscAzure, color: "#0078D4" },
      { name: "AZ-900 Azure Fundamentals", icon: VscAzure, color: "#0078D4" },
      { name: "AWS Cloud Practitioner", icon: FaAws, color: "#FF9900" },
      { name: "Chevron Data Science Program" },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <motion.h2
          className="mb-10 text-center text-3xl font-bold text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Skills & Technologies
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              className="rounded-2xl border border-gray-200/40 bg-white/40 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: gi * 0.1 }}
            >
              <h3
                className="mb-4 text-sm font-bold tracking-wide uppercase"
                style={{ color: group.color }}
              >
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, si) => (
                  <motion.span
                    key={skill.name}
                    className="flex items-center gap-1.5 rounded-full border border-gray-200/50 bg-gray-100/80 px-3 py-1.5 text-sm text-gray-700 dark:border-white/10 dark:bg-white/10 dark:text-gray-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: gi * 0.1 + si * 0.03,
                    }}
                  >
                    {skill.icon && (
                      <span className="shrink-0" style={{ color: skill.color }}>
                        <skill.icon className="h-4 w-4" />
                      </span>
                    )}
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

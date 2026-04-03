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
  SiSupabase,
  SiClaude,
} from "react-icons/si";
import { FaAws, FaDatabase } from "react-icons/fa";
import { VscAzure, VscAzureDevops } from "react-icons/vsc";

function IconCursor({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="675 359 250 282" fill="none">
      <path fill="#EDECEC" d="M920.015 424.958L805.919 359.086C802.256 356.97 797.735 356.97 794.071 359.086L679.981 424.958C676.901 426.736 675 430.025 675 433.587V566.419C675 569.981 676.901 573.269 679.981 575.048L794.077 640.92C797.74 643.036 802.261 643.036 805.925 640.92L920.02 575.048C923.1 573.269 925.001 569.981 925.001 566.419V433.587C925.001 430.025 923.1 426.736 920.02 424.958H920.015ZM912.848 438.911L802.706 629.682C801.961 630.968 799.995 630.443 799.995 628.954V504.039C799.995 501.543 798.662 499.234 796.498 497.981L688.321 435.526C687.036 434.781 687.561 432.816 689.05 432.816H909.334C912.462 432.816 914.417 436.206 912.853 438.917H912.848V438.911Z"/>
    </svg>
  );
}

function IconChevron({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 340 280">
      <defs>
        <linearGradient id="chev-ub" x1="1" y1=".5" x2="0" y2="-.5">
          <stop offset="0" stopColor="#06549B"/>
          <stop offset=".55" stopColor="#2FA1D3"/>
          <stop offset=".9" stopColor="#2FA1D3"/>
        </linearGradient>
        <linearGradient id="chev-lb" x1="0" y1=".6" x2="1" y2="-.75">
          <stop offset="0" stopColor="#1371B1"/>
          <stop offset=".05" stopColor="#2FA1D3"/>
          <stop offset=".45" stopColor="#2FA1D3"/>
          <stop offset=".6" stopColor="#06569C"/>
        </linearGradient>
        <linearGradient id="chev-ur" x1="1" y1=".5" x2="0" y2="-.1">
          <stop offset="0" stopColor="#9D1A36"/>
          <stop offset=".4" stopColor="#9D1A36"/>
          <stop offset=".6" stopColor="#E6192F"/>
        </linearGradient>
        <linearGradient id="chev-lr" x1="0" y1=".6" x2="1" y2="-.75">
          <stop offset="0" stopColor="#A21C38"/>
          <stop offset=".13" stopColor="#E6192F"/>
          <stop offset=".45" stopColor="#E6192F"/>
          <stop offset=".6" stopColor="#A71C37"/>
        </linearGradient>
      </defs>
      <polygon points="0,113 0,4.5 162.75,58.75 0,113" fill="url(#chev-ub)"/>
      <polygon points="0.04,113 162.75,167.2 325.45,113 325.45,4.5 162.75,58.75 0.04,113" fill="url(#chev-lb)"/>
      <polygon points="0.01,239 0,130.5 162.73,184.8 0.01,239" fill="url(#chev-ur)"/>
      <polygon points="325.45,130.5 162.7,184.8 0.03,239 162.73,293.3 325.45,239 325.45,130.5" fill="url(#chev-lr)"/>
    </svg>
  );
}

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
      { name: "Claude Code", icon: SiClaude, color: "#D97757" },
      { name: "Cursor", icon: IconCursor },
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
      { name: "Supabase", icon: SiSupabase, color: "#3FCF8E" },
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
      { name: "Chevron Data Science Program", icon: IconChevron },
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

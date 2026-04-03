"use client";

import { motion } from "motion/react";

const skillGroups = [
  {
    category: "AI & LLM Systems",
    color: "#8b5cf6",
    skills: [
      "RAG Pipelines",
      "MCP",
      "OpenAI APIs",
      "Gemini APIs",
      "ChromaDB",
      "GitHub Copilot",
      "Claude Code",
    ],
  },
  {
    category: "Programming",
    color: "#3b82f6",
    skills: [
      "C# / .NET",
      "Python",
      "Rust",
      "C++",
      "JavaScript",
      "React",
      "Angular",
      "Vue",
      "HTML / CSS",
    ],
  },
  {
    category: "Cloud & Infrastructure",
    color: "#0d9488",
    skills: [
      "Azure",
      "AWS",
      "GCP",
      "Docker",
      "Kubernetes",
      "Terraform",
      "SQL Server",
      "PostgreSQL",
      "Grafana",
    ],
  },
  {
    category: "Tools & Technologies",
    color: "#f59e0b",
    skills: [
      "Redis",
      "Git",
      "REST APIs",
      "JWT / OAuth2",
      "FastAPI",
      "FastMCP",
      "GitHub Actions",
      "Azure DevOps",
      "Ansible",
      "Bash",
    ],
  },
  {
    category: "Certifications",
    color: "#ec4899",
    skills: [
      "AZ-104 Azure Administrator Associate",
      "AI-900 AI Fundamentals",
      "AZ-900 Azure Fundamentals",
      "AWS Cloud Practitioner",
      "Chevron Data Science Program",
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
                    key={skill}
                    className="rounded-full border border-gray-200/50 bg-gray-100/80 px-3 py-1 text-sm text-gray-700 dark:border-white/10 dark:bg-white/10 dark:text-gray-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: gi * 0.1 + si * 0.03,
                    }}
                  >
                    {skill}
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

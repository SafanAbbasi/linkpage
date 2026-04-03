"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const socialLinks = [
  {
    icon: FaGithub,
    href: "https://github.com/SafanAbbasi",
    label: "GitHub",
  },
  {
    icon: FaLinkedinIn,
    href: "https://linkedin.com/in/safanabbasi",
    label: "LinkedIn",
  },
  {
    icon: HiOutlineMail,
    href: "mailto:safan.a.abbasi@gmail.com",
    label: "Email",
  },
];

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // honeypot
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const loadTime = useRef(Date.now());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          website: formState.website,
          _t: loadTime.current,
        }),
      });
      if (res.ok) {
        setStatus("sent");
        setFormState({ name: "", email: "", message: "", website: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-6">
        <motion.h2
          className="mb-4 text-center text-3xl font-bold text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Get in Touch
        </motion.h2>

        <motion.p
          className="mb-10 text-center text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Have a question or want to work together? Drop me a message!
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="mb-10 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Honeypot field — hidden from humans, bots fill it in */}
          <input
            type="text"
            name="website"
            value={formState.website}
            onChange={(e) =>
              setFormState({ ...formState, website: e.target.value })
            }
            tabIndex={-1}
            autoComplete="off"
            className="absolute left-0 top-0 h-0 w-0 opacity-0"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Name"
              required
              value={formState.name}
              onChange={(e) =>
                setFormState({ ...formState, name: e.target.value })
              }
              className="rounded-xl border border-gray-200/60 bg-white/60 px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 dark:border-white/15 dark:bg-white/10 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-teal-400 dark:focus:ring-teal-400"
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={formState.email}
              onChange={(e) =>
                setFormState({ ...formState, email: e.target.value })
              }
              className="rounded-xl border border-gray-200/60 bg-white/60 px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 dark:border-white/15 dark:bg-white/10 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-teal-400 dark:focus:ring-teal-400"
            />
          </div>
          <textarea
            placeholder="Your message..."
            required
            rows={4}
            value={formState.message}
            onChange={(e) =>
              setFormState({ ...formState, message: e.target.value })
            }
            className="w-full rounded-xl border border-gray-200/60 bg-white/60 px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 dark:border-white/15 dark:bg-white/10 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-teal-400 dark:focus:ring-teal-400"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition-colors hover:bg-teal-500 disabled:opacity-50 dark:bg-teal-500 dark:hover:bg-teal-400"
          >
            {status === "sending"
              ? "Sending..."
              : status === "sent"
                ? "Message Sent!"
                : "Send Message"}
          </button>
          {status === "error" && (
            <p className="text-center text-sm text-red-500">
              Something went wrong. Please try again.
            </p>
          )}
        </motion.form>

        {/* Social links */}
        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200/50 bg-white/50 text-gray-600 transition-colors hover:border-teal-500/50 hover:text-teal-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-400 dark:hover:border-teal-400/50 dark:hover:text-teal-400"
              aria-label={social.label}
            >
              <social.icon className="h-4 w-4" />
            </a>
          ))}
        </motion.div>

        {/* Copyright */}
        <p className="mt-12 text-center text-xs text-gray-400 dark:text-gray-600">
          &copy; {new Date().getFullYear()} Safan Abbasi
        </p>
      </div>
    </section>
  );
}

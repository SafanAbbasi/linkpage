"use client";

import { motion } from "motion/react";
import LinkButton from "@/components/LinkButton";
import type { LinkItem } from "@/data/links";

export default function AnimatedLinks({ links }: { links: LinkItem[] }) {
  return (
    <div className="flex flex-col gap-4">
      {links.map((link, i) => (
        <motion.div
          key={link.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
        >
          <LinkButton link={link} />
        </motion.div>
      ))}
    </div>
  );
}

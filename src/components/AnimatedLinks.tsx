"use client";

import { motion } from "motion/react";
import LinkButton from "@/components/LinkButton";
import type { LinkItem } from "@/data/links";

export default function AnimatedLinks({
  links,
  shouldAnimate = true,
}: {
  links: LinkItem[];
  shouldAnimate?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      {links.map((link, i) => (
        <motion.div
          key={link.id}
          initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={
            shouldAnimate
              ? { duration: 0.5, delay: 2.0 + i * 0.1, ease: "easeOut" }
              : { duration: 0 }
          }
        >
          <LinkButton link={link} />
        </motion.div>
      ))}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { profile } from "@/data/links";

export default function ProfileHeader() {
  const [imgError, setImgError] = useState(false);
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <motion.div
      className="flex flex-col items-center pt-16 pb-8"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-[120px] w-[120px] overflow-hidden rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-1">
        {imgError ? (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-3xl font-bold text-gray-700 dark:bg-gray-900 dark:text-gray-200">
            {initials}
          </div>
        ) : (
          <Image
            src={profile.avatarUrl}
            alt={profile.name}
            width={120}
            height={120}
            className="h-full w-full rounded-full object-cover"
            priority
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
        {profile.name}
      </h1>
      <p className="mt-1 text-gray-500 dark:text-gray-400">{profile.title}</p>
      {profile.bio && (
        <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
          {profile.bio}
        </p>
      )}
    </motion.div>
  );
}

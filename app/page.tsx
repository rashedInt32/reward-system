"use client";
import { motion, useReducedMotion, Variants, Easing } from "framer-motion";
import { LocationCheckIn } from "@/components/action-card/LocationCheckIn";
import { VideoAction } from "@/components/action-card/VideoAction";
import { CodeAction } from "@/components/action-card/CodeAction";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as Easing },
  },
};

export default function Home() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="min-h-screen p-4 pt-8 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-3xl font-bold text-white mb-3 tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeOut" as Easing,
          delay: shouldReduceMotion ? 0 : 0.2,
        }}
      >
        Earn & Collect
      </motion.h1>
      <motion.p
        className="text-[var(--text)]/80 text-lg mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeOut" as Easing,
          delay: shouldReduceMotion ? 0 : 0.4,
        }}
      >
        Earn unique digital rewards by checking in at locations, watching
        videos, or scanning codes.
      </motion.p>
      <motion.div
        className="gap-6 flex flex-col"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <LocationCheckIn />
        </motion.div>
        <motion.div variants={itemVariants}>
          <VideoAction />
        </motion.div>
        <motion.div variants={itemVariants}>
          <CodeAction />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

"use client";




import { motion } from "framer-motion";
import { techStack } from "@/lib/Items";
import { TechCard } from "@/components/shared/TechCard";
import dynamic from "next/dynamic";

const Boxes = dynamic(() => import("@/components/ui/background-boxes"));

export default function TechStack() {


  return (
    <section

      className="relative py-24 px-4 sm:px-10 text-white overflow-hidden z-0 "
    >
      <Boxes className="opacity-40" />

      <div className="max-w-6xl mx-auto text-center">
        {/* === Section Heading === */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold mb-6 "
        >
          My Technology Stack
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}

          className="text-[var(--color-text-muted)] max-w-2xl mx-auto mb-14 text-base md:text-lg"
        >
          I build modern, scalable, and future-proof solutions using the latest technologies.
        </motion.p>

        {/* === Tech Grid === */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {techStack.map((tech, idx) => (
            <TechCard key={tech.name} tech={tech} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRef } from 'react';

export const TechCard = ({ tech, idx }: { tech: { name: string; icon: string }; idx: number }) => {
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateY: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ delay: idx * 0.1, duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
      whileHover={{ rotateY: 5, rotateX: 5, scale: 1.05 }}
      className="group relative flex flex-col items-center justify-center p-6 sm:p-7 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl transition-all duration-300 cursor-pointer overflow-hidden perspective-[1000px]"
    >
      {/* Glow background on hover */}
      <div className="absolute inset-0 bg-[var(--color-secondary)] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl blur-2xl z-0"></div>

      {/* Floating decorative background image with 3D skew */}
      <Image
        src={tech.icon || '/atom.png'}
        alt={`${tech.name} background`}
        width={180}
        height={180}
        loading="lazy"
        className="absolute -bottom-10 -right-10 opacity-20 z-0 group-hover:scale-110 transition-transform duration-500"
        style={{
          transform: 'translateZ(0) skewX(-30deg) skewY(10deg) rotate(12deg)',
        }}
      />

      {/* Main tech logo */}
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="relative z-10 mb-4"
      >
        <Image
          src={tech.icon || '/atom.png'}
          alt={tech.name}
          width={56}
          height={56}
          className="drop-shadow-lg"
        />
      </motion.div>

      {/* Tech name */}
      <motion.span
        className="z-10 text-white/90 text-sm sm:text-base font-semibold text-center"
        whileHover={{ scale: 1.02 }}
      >
        {tech.name}
      </motion.span>
    </motion.div>
  );
};
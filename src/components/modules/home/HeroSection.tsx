"use client";

import { useRef } from "react";
import { easeInOut, motion } from "framer-motion";
import { gsap } from "gsap";
import { Github, Linkedin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import SkillSlider from "@/components/ui/SkillSlider";

const HeroSection = () => {
  const lineRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { strokeDashoffset: 300 },
        {
          strokeDashoffset: 0,
          duration: 3,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        }
      );
    }

    gsap.to(".profile-float", {
      y: -15,
      duration: 3,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: easeInOut
      }
    },
  };

  const socialIcons = [
    { icon: Github, label: "GitHub", color: "#FFFFFF", link: "https://github.com/arifurrahmansajid" },
    { icon: Linkedin, label: "LinkedIn", color: "#0A66C2", link: "https://www.linkedin.com/in/arifursajid3456/" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-12 py-12 overflow-hidden bg-[var(--color-bg-base)]">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[160px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-12 items-center">
          {/* Left Section - Introduction */}
          <motion.div variants={itemVariants} className="text-center lg:text-left space-y-8">
            {/* <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
                <span className="text-white">Hy! I Am</span>
                <br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                 Md Arifur Rahman Sajid
                </span>
              </h1>
              <div className="flex items-center justify-center lg:justify-start gap-3 mt-6">
                <span className="text-6xl md:text-7xl font-bold text-[var(--color-primary)]">01+</span>
                <div className="text-left text-xs uppercase tracking-widest text-[var(--color-text-muted)] font-medium">
                  <div>Years</div>
                  <div>Experience</div>
                </div>
              </div>
            </div> */}
            <div className="space-y-4">
              <p className="text-lg md:text-xl text-muted-foreground font-light">
                Hi! I Am
              </p>
              <h1
                className="text-5xl md:text-4xl xl:text-5xl font-bold leading-tight text-foreground"
              >
                Md Arifur Rahman Sajid
              </h1>

              <div className="flex items-center justify-center lg:justify-start gap-4 pt-6">
                <motion.span
                  className="text-6xl md:text-7xl font-bold text-primary"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
                >
                  01+
                </motion.span>
                <div className="text-left text-sm uppercase tracking-wide text-muted-foreground font-medium">
                  <div>Years</div>
                  <div>Experience</div>
                </div>
              </div>
            </div>
            {/* Social Media Icons */}
            <div className="flex gap-4 justify-center lg:justify-start pt-2">
              {socialIcons.map((social, index) => (
                <motion.div
                  key={social.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.15 }}
                  whileHover={{ scale: 1.2, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    asChild
                    size="icon"
                    variant="outline"
                    className="rounded-full h-12 w-12 border-2 bg-[var(--color-surface-1)] hover:shadow-lg hover:shadow-[var(--color-primary)]/40 transition-all duration-300"
                    style={{ borderColor: `${social.color}60` }}
                    aria-label={social.label}
                  >
                    <a
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" style={{ color: social.color }} />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Center Section - Profile Image */}
          <motion.div variants={itemVariants} className="relative flex items-center justify-center">
            {/* SVG curved dashed line */}
            <svg
              className="absolute hidden lg:block"
              width="350"
              height="250"
              style={{ left: "-180px", top: "-40px" }}
            >
              <path
                ref={lineRef}
                d="M 0 120 Q 120 20, 240 120"
                stroke="var(--color-primary)"
                strokeWidth="3"
                strokeDasharray="10 10"
                fill="none"
                opacity="0.8"
              />
            </svg>

            <div className="relative profile-float">
              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative"
              >
                <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-[6px] border-[var(--color-primary)]/40 shadow-2xl shadow-[var(--color-primary)]/30">
                  <Image
                    src="/memoji-emoji-handsome-smiling-man-white-background_826801-6987.avif"
                    alt="Profile"
                    fill
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--color-primary)]/30 to-[var(--color-secondary)]/30 blur-3xl -z-10 animate-pulse" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Section - Description & Reviews */}
          <motion.div variants={itemVariants} className="text-center lg:text-right space-y-8">
            <p className="text-xl md:text-2xl text-[var(--color-text-muted)] max-w-md mx-auto lg:ml-auto leading-relaxed font-light">
              I build modern web applications with clean code and great user experiences.
            </p>

            {/* Reviews Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="rounded-3xl p-7 max-w-sm mx-auto lg:ml-auto shadow-2xl backdrop-blur-xl border border-white/10 bg-[var(--color-surface-1)]/70"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-sm font-semibold text-white tracking-wide">Projects Completed</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400 drop-shadow-lg" />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <SkillSlider />
              </div>
            </motion.div>

            {/* Developer Label */}
            <motion.div
              className="text-center lg:text-right pt-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8 }}
            >
              <p className="text-3xl md:text-4xl font-light text-foreground italic">
                Full-Stack{" "}
                <span className="font-bold text-accent">Developer.</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

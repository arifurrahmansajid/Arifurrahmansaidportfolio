'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaLinkedin } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { FaPhoneSquareAlt } from "react-icons/fa";
import SkillSlider from './../../ui/SkillSlider';
import { NumberTicker } from '@/components/magicui/number-ticker';

const AboutMe = () => {

  const contactItems = [
    { icon: FaLinkedin, label: "LinkedIn", value: "Md Arifur Rahman Sajid" },
    { icon: FaPhoneSquareAlt, label: "Phone", value: "+8801965051106" },
    { icon: IoIosMail, label: "Email", value: "arifursajid3456@gmail.com" },
  ];

  return (
    <section className="relative flex justify-center items-center min-h-screen text-white px-6 py-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">

        {/* LEFT — Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card row-span-3 col-span-1 p-8 rounded-2xl shadow-lg flex flex-col items-center text-center relative overflow-hidden"
        >
          <div className="relative">
            <Image
              src="/memoji-emoji-handsome-smiling-man-white-background_826801-6987.avif"
              alt="Profile Picture"
              width={180}
              height={180}
              className="rounded-full shadow-[0_0_25px_rgba(118,44,250,0.4)]"
            />

          </div>
          <h2 className="text-2xl font-semibold mt-5">Md Arifur Rahman Sajid</h2>

          <div className="flex flex-col mt-6 space-y-4 w-full text-left">
            {contactItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, x: 5 }}
                className="flex items-center space-x-3 text-gray-400 hover:text-primary transition"
              >
                <item.icon className="text-xl" />
                <span className="text-sm uppercase tracking-wide">{item.label}:</span>
                <span className="text-sm text-white">{item.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* MIDDLE — About Me & Tech Stack */}
        <div className="grid gap-6 row-span-2 col-span-1 w-full">
          {/* About Me */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-2xl shadow-lg relative overflow-hidden group"
          >
            <div className="absolute top-0 left-1/2 h-[5px] w-[80%] -translate-x-1/2 rounded-full bg-primary blur-[10px] shadow-[0_0_20px_theme(colors.primary)]" />
            <h3 className="text-xl font-semibold mb-2">About Me</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              I&apos;m a passionate full-stack developer focused on crafting elegant, scalable, and high-performance web experiences. I value clean code, thoughtful design, and meaningful digital products.
            </p>
          </motion.div>

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-2xl shadow-lg relative overflow-hidden group"
          >
            <div className="absolute top-0 left-1/2 h-[5px] w-[80%] -translate-x-1/2 rounded-full bg-primary blur-[10px] shadow-[0_0_20px_theme(colors.primary)]" />
            <h3 className="text-xl font-semibold mb-3">Technologies I Use</h3>
            <SkillSlider />
          </motion.div>
        </div>

        {/* RIGHT — Why Choose Me */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="glass-card col-span-1 row-span-2 p-6 rounded-2xl shadow-lg relative overflow-hidden"
        >
          <h3 className="text-xl font-semibold mb-2">Why Choose Me?</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            I blend creativity with technical expertise to deliver seamless and engaging user experiences. My focus is on performance, accessibility, and future-proof design to help your brand grow.
          </p>
        </motion.div>

        {/* BOTTOM — Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="col-span-1 md:col-span-2 grid grid-cols-3 gap-4"
        >
          {[
            { label: "Projects Completed", value: 50 },
            { label: "Years of Experience", value: 2 },
            { label: "Happy Clients", value: 30 },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -3 }}
              className="glass-card p-6 rounded-2xl text-center shadow-lg"
            >
              <h4 className="text-3xl font-bold text-primary mb-1">
                <NumberTicker value={stat.value} delay={0.5 + index * 0.2} />
              </h4>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;

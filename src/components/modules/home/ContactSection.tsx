'use client';

import React, { useRef, useState } from "react";
import { MessageSquareText, SendHorizonal } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const msgBoxRef = useRef(null);
  const formRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef(null);
  const flyIconRef = useRef(null);

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Soft glowing pulse on message box
  useGSAP(() => {
    const glowTl = gsap.timeline({ repeat: -1, delay: 0.5 });
    glowTl.to(msgBoxRef.current, {
      boxShadow: "0 0 25px 5px var(--color-primary)",
      duration: 1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });
  }, []);

  const handleMsgClick = () => {
    nameRef.current?.focus();
    formRef.current?.scrollIntoView({ behavior: "smooth" });

    gsap.fromTo(
      formRef.current,
      { borderColor: "#15101E" },
      {
        borderColor: "#782EFA",
        duration: 0.6,
        repeat: 1,
        yoyo: true,
        ease: "power2.out",
      }
    );
  };

  // Improved fly animation for Send button
  const runFlyAnimation = () => {
    if (flyIconRef.current) {
      const icon = flyIconRef.current;

      // Create a glowing trail effect
      gsap.fromTo(
        icon,
        {
          opacity: 0,
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          filter: "drop-shadow(0 0 0px rgba(118,44,250,0.8))",
        },
        {
          opacity: 1,
          x: 110,
          y: -64,
          scale: 1.4,
          rotate: 25,
          filter: "drop-shadow(0 0 15px rgba(118,44,250,0.8))",
          duration: 0.9,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(icon, {
              opacity: 0,
              duration: 0.3,
              x: 130,
              y: -84,
              ease: "power1.in",
            });
          },
        }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      runFlyAnimation();

      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const res = await fetch(`${backendUrl}/api/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      toast({
        title: "Message Sent!",
        description: "Your message has been sent successfully via Resend.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Submission Failed",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative w-full overflow-hidden bg-base py-20 text-white">
      {/* Ambient background */}
      <div className="pointer-events-none absolute -top-40 -left-24 h-[420px] w-[420px] rounded-full bg-[var(--color-primary)] opacity-25 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-28 right-[-40px] h-[340px] w-[340px] rounded-full bg-[var(--color-accent)] opacity-20 blur-[90px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.25)_1px,transparent_0)] [background-size:18px_18px]" />

      <div className="mx-auto mt-12 grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:items-center">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          <h2 className="text-balance text-4xl font-bold leading-tight md:text-5xl">
            Let’s <span className="text-primary">Connect</span> & Share Ideas
          </h2>
          <p className="max-w-prose text-pretty text-lg text-gray-300">
            Whether you have a project idea, need development help, or just want to talk tech — I’d love to hear from you.
          </p>

          {/* Message Box */}
          <div
            onClick={handleMsgClick}
            className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl shadow-[0_10px_40px_-18px_rgba(0,0,0,0.7)] transition hover:border-primary/40 hover:bg-white/7 hover:shadow-[0_18px_60px_-22px_rgba(120,46,250,0.55)]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-primary transition group-hover:border-primary/40">
              <MessageSquareText className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium text-gray-200">
              Let’s connect — tap to start a conversation
            </span>
          </div>

          {/* Skill Tags */}
          <div className="flex flex-wrap gap-3 mt-6">
            {["Full‑stack Development", "JavaScript", "Clean UI/UX", "Performance Optimization"].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 backdrop-blur-md transition hover:border-primary/40 hover:bg-primary/10 hover:text-white"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        {/* RIGHT SIDE — Contact Form */}
        <div
          ref={formRef}
          className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_-45px_rgba(0,0,0,0.85)] backdrop-blur-xl md:p-8"
        >
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-70" />

          <div className="relative mb-6 space-y-1">
            <h3 className="text-lg font-semibold text-white/90">Send a message</h3>
            <p className="text-sm text-white/60">I usually reply within 24–48 hours.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              ref={nameRef}
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              disabled={loading}
              className="h-11 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-white placeholder:text-white/40 focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={loading}
              className="h-11 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-white placeholder:text-white/40 focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            />
            <Input
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
              disabled={loading}
              className="h-11 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-white placeholder:text-white/40 focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            />
            <Textarea
              placeholder="Write your message..."
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              disabled={loading}
              className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/40 focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            />

            <button
              type="submit"
              ref={btnRef}
              disabled={loading}
              className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-primary/40 bg-primary px-6 py-3 text-center font-semibold text-white shadow-[0_18px_60px_-30px_rgba(120,46,250,0.85)] transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:opacity-50"
            >
              <span>{loading ? "Sending..." : "Send Message"}</span>
              <SendHorizonal className="h-5 w-5" />
              <span
                ref={flyIconRef}
                className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 opacity-0"
              >
                <SendHorizonal className="h-6 w-6 text-white" />
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

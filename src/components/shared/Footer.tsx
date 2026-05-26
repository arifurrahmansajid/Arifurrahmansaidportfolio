"use client"
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Instagram, Linkedin, Github, Mail, Phone, Facebook } from "lucide-react";
import { navItems } from "@/lib/Items";

const Footer = () => {
  const whatsappNumberE164 = "8801965051106";
  const contactPhone = "+8801965051106";
  const contactEmail = "arifursajid3456@gmail.com";

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/10 bg-surface-1 text-white">
      {/* Ambient gradient + subtle noise */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/20 via-accent/10 to-secondary/20 opacity-25" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.25)_1px,transparent_0)] [background-size:18px_18px]" />

      <div className="relative z-20 mx-auto max-w-7xl px-4 py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left: Brand + CTA */}
          <div className="space-y-6 lg:col-span-5">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-balance text-3xl font-bold leading-tight sm:text-4xl text-gradient"
          >
            Let’s build something unforgettable.
          </motion.h2>
          <p className="max-w-prose text-pretty text-muted-foreground">
            Available for freelance, collaborations, or just a good convo about code and design.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button asChild variant="default" className="animate-glow border border-primary/40">
              <a
                href={`https://wa.me/${whatsappNumberE164}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Me
              </a>
            </Button>
            <Button asChild variant="outline" className="hover:bg-secondary/10">
              <a href="https://www.linkedin.com/in/arifursajid3456/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </Button>
          </div>
          </div>

          {/* Right: Navigation + Info */}
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3 lg:gap-8">
            <div>
              <h4 className="mb-4 text-sm font-semibold tracking-wide text-white/90">Explore</h4>
              <ul className="space-y-2 text-sm">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white/70 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1 rounded-sm"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold tracking-wide text-white/90">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href={`tel:${contactPhone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1 rounded-sm"
                  >
                    <Phone className="h-4 w-4" />
                    <span>{contactPhone}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1 rounded-sm"
                  >
                    <Mail className="h-4 w-4" />
                    <span className="break-all">{contactEmail}</span>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold tracking-wide text-white/90">Socials</h4>
              <div className="flex flex-wrap gap-3">
                {[
                  { href: "https://www.linkedin.com/in/arifursajid3456/", label: "LinkedIn", Icon: Linkedin },
                  { href: "https://github.com/arifurrahmansajid", label: "GitHub", Icon: Github },
                  { href: "https://www.instagram.com/", label: "Instagram", Icon: Instagram },
                  { href: "https://www.facebook.com/", label: "Facebook", Icon: Facebook },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1"
                    title={label}
                  >
                    <Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-white/10 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <div>
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-white/70">All rights reserved by</span>{" "}
            <span className="text-primary">Md Arifur Rahman Sajid</span>.
          </div>
          <div className="text-white/50">
            Designed & built with care.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
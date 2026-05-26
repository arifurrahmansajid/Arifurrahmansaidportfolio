import { fetchWithTag } from "@/lib/fetchWithTag";
import { IProject } from "@/interfaces";
import { getImageUrl } from "@/lib/utils";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ArrowLeft, CheckCircle2, Cpu, Star } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const result = await fetchWithTag<IProject>(`/project/${params.id}`, { tag: "project" });
    const project = result?.data;
    return {
      title: project ? `${project.title} | Md Arifur Rahman Sajid` : "Project | Portfolio",
      description: project?.description ?? "Project details",
    };
  } catch {
    return { title: "Project | Portfolio" };
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  let project: IProject | null = null;

  try {
    const result = await fetchWithTag<IProject>(`/project/${params.id}`, { tag: "project" });
    project = result?.data ?? null;
  } catch {
    notFound();
  }

  if (!project) notFound();

  const {
    title,
    thumbnail,
    description,
    features = [],
    technologies = [],
    githubLink,
    liveSite,
    createdAt,
  } = project;

  return (
    <main className="min-h-screen bg-background text-white">
      {/* Back navigation */}
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-4">
        <Link
          href="/#project"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>
      </div>

      {/* Hero */}
      <section className="relative max-w-5xl mx-auto px-6 pb-16">
        {/* Glow blobs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] -z-10" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[140px] -z-10" />

        {/* Thumbnail */}
        {thumbnail && (
          <div className="relative w-full aspect-video overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-primary/10 mb-10">
            <Image
              src={getImageUrl(thumbnail)}
              alt={title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        )}

        {/* Header */}
        <div className="space-y-4 mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-primary to-purple-400 bg-clip-text text-transparent leading-tight">
            {title}
          </h1>
          {createdAt && (
            <p className="text-sm text-gray-500">
              {new Date(createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            {githubLink && (
              <Button
                asChild
                variant="outline"
                className="bg-white/5 border-white/10 text-white rounded-full hover:bg-white/10 hover:scale-105 transition-all"
              >
                <a href={githubLink} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  View on GitHub
                </a>
              </Button>
            )}
            {liveSite && (
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-white rounded-full shadow-[0_0_14px_#782EFA] hover:scale-105 transition-all"
              >
                <a href={liveSite} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left — Description & Features */}
          <div className="lg:col-span-2 space-y-10">
            {/* About */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                About this Project
              </h2>
              <p className="text-gray-300 leading-relaxed text-base">{description}</p>
            </div>

            {/* Features */}
            {features.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  Key Features
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary/20 transition-colors"
                    >
                      <span className="mt-0.5 text-primary text-lg leading-none">✦</span>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right — Tech Stack */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Cpu className="h-5 w-5 text-violet-400" />
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {technologies.length > 0 ? (
                technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="px-3 py-1 text-sm bg-gradient-to-r from-primary/20 to-purple-400/20 border-primary/30 text-white hover:scale-105 transition-transform cursor-default"
                  >
                    {tech}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">No technologies listed.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

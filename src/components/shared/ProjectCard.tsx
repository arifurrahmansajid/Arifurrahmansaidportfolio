"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  ExternalLink,
  Github,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { IProject } from "@/interfaces";
import { getImageUrl } from "@/lib/utils";

const ProjectCard = ({ project }: { project: IProject }) => {
  const [tab, setTab] = useState("overview");

  const {
    
    title,
    thumbnail,
    description,
    features = [],
    technologies = [],
    githubLink,
    liveSite,
  } = project;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.015 }}
      className="relative group w-full h-full flex flex-col"
    >
      {/* Outer Glow Animation */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary/30 via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700" />

      <Card className="relative overflow-hidden border border-white/10 backdrop-blur-xl bg-gradient-to-br from-background/70 to-background/30 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 flex flex-col rounded-2xl z-10 h-full">
        {/* Neon border shimmer */}
        <div className="absolute inset-0 rounded-2xl before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-primary/30 before:to-accent-500/20 before:opacity-0 group-hover:before:opacity-100 before:blur-[50px] before:transition-all before:duration-700" />

        {/* Image Section */}
        <div 
        className="relative w-full aspect-video overflow-hidden rounded-t-2xl"
        >
          {thumbnail ? (
            <Image
              src={getImageUrl(thumbnail)}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-[1deg]"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-muted">
              <span className="text-5xl font-bold text-muted-foreground/30">
                {title.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col p-5 relative z-10">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent truncate">
              {title}
            </CardTitle>
          </CardHeader>

          {/* Tabs */}
          <Tabs value={tab} onValueChange={setTab} className="w-full flex-1 flex flex-col">
            <TabsList className="grid grid-cols-3 w-full mb-5 bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/10 h-9">
              <TabsTrigger
                value="overview"
                className="text-[10px] data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/70 data-[state=active]:to-purple-500/60 rounded-full text-white transition-all px-0"
              >
                About
              </TabsTrigger>
              <TabsTrigger
                value="tech"
                className="text-[10px] data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/70 data-[state=active]:to-purple-500/60 rounded-full text-white transition-all px-0"
              >
                Tech
              </TabsTrigger>
              <TabsTrigger
                value="features"
                className="text-[10px] data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/70 data-[state=active]:to-purple-500/60 rounded-full text-white transition-all px-0"
              >
                Features
              </TabsTrigger>
            </TabsList>

            {/* About Tab */}
            <TabsContent value="overview" className="flex-1 flex flex-col mt-0">
              <motion.p
                key={tab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-sm md:text-base text-gray-300 leading-relaxed"
              >
                {description}
              </motion.p>
            </TabsContent>

            {/* Tech Tab */}
            <TabsContent value="tech" className="flex-1 flex flex-col mt-0">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-wrap gap-2 mt-2"
              >
                {technologies.length > 0 ? (
                  technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="text-xs px-3 py-1 bg-gradient-to-r from-primary/20 to-purple-400/20 border-primary/30 text-white hover:scale-105 hover:from-primary/30 hover:to-purple-400/30 transition-all duration-300"
                    >
                      {tech}
                    </Badge>
                  ))
                ) : (
                  <p className="italic text-muted-foreground text-sm">
                    No technologies listed.
                  </p>
                )}
              </motion.div>
            </TabsContent>

            {/* Features Tab */}
            <TabsContent value="features" className="flex-1 flex flex-col mt-0">
              {features.length > 0 ? (
                <motion.ul
                  key={tab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm md:text-base text-gray-300"
                >
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">✦</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </motion.ul>
              ) : (
                <p className="italic text-muted-foreground text-sm">
                  No features listed.
                </p>
              )}
            </TabsContent>
          </Tabs>

          {/* Footer */}
          <CardFooter className="p-0 mt-6 mt-auto flex flex-col gap-3 w-full">
            {(githubLink || liveSite) && (
              <div className="flex gap-3 w-full">
                {githubLink && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-white/5 border-white/10 text-white rounded-full hover:scale-102 transition-all group text-xs py-1"
                  >
                    <a href={githubLink} target="_blank" rel="noopener noreferrer">
                      <Github className="w-3.5 h-3.5 mr-1 group-hover:rotate-12 transition-transform" />{" "}
                      GitHub
                    </a>
                  </Button>
                )}
                {liveSite && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-white/5 border-white/10 text-white rounded-full hover:scale-102 transition-all group text-xs py-1"
                  >
                    <a href={liveSite} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3.5 h-3.5 mr-1 group-hover:translate-x-1 transition-transform" />{" "}
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            )}
            <Button
              asChild
              size="sm"
              className="w-full bg-primary hover:bg-primary/95 text-white rounded-full hover:scale-102 transition-all group font-medium py-2"
            >
              <Link href={`/projects/${project.id || project._id}`}>
                View Details
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;

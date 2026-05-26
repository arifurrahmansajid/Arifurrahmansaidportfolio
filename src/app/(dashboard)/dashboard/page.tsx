"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, FileText, FolderKanban, Mail, Sparkles, TrendingUp, Clock, ArrowRight } from "lucide-react";
import { IBlog, IProject } from "@/interfaces";
import { fetchWithTag } from "@/lib/fetchWithTag";
import { cn } from "@/lib/utils";

interface IMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface DashboardState {
  blogs: IBlog[];
  projects: IProject[];
  messages: IMessage[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardState>({ blogs: [], projects: [], messages: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [blogsResponse, projectsResponse, messagesResponse] = await Promise.all([
          fetchWithTag<IBlog[]>("/blog", { tag: "blogs" }),
          fetchWithTag<IProject[]>("/project", { tag: "projects" }),
          fetchWithTag<IMessage[]>("/message", { tag: "messages" }),
        ]);

        setData({
          blogs: blogsResponse.data ?? [],
          projects: projectsResponse.data ?? [],
          messages: messagesResponse.data ?? [],
        });
      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const totalViews = data.blogs.reduce(
    (sum, blog) => sum + (blog.meta?.views ?? blog.views ?? 0),
    0
  );

  const recentActivity = [...data.blogs, ...data.projects]
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt || 0).getTime() -
        new Date(a.updatedAt || a.createdAt || 0).getTime()
    )
    .slice(0, 5);

  // Latest 3 messages
  const latestMessages = data.messages.slice(0, 3);

  const stats = [
    {
      title: "Total Blogs",
      value: data.blogs.length,
      icon: FileText,
      color: "from-blue-500/20 to-blue-600/20",
      iconColor: "text-blue-400",
      borderColor: "border-blue-500/20",
      href: "/dashboard/blogs",
    },
    {
      title: "Total Projects",
      value: data.projects.length,
      icon: FolderKanban,
      color: "from-emerald-500/20 to-emerald-600/20",
      iconColor: "text-emerald-400",
      borderColor: "border-emerald-500/20",
      href: "/dashboard/projects",
    },
    {
      title: "Blog Views",
      value: totalViews,
      icon: Eye,
      color: "from-amber-500/20 to-amber-600/20",
      iconColor: "text-amber-400",
      borderColor: "border-amber-500/20",
      href: "/dashboard/blogs",
    },
    {
      title: "Total Messages",
      value: data.messages.length,
      icon: Mail,
      color: "from-violet-500/20 to-violet-600/20",
      iconColor: "text-violet-400",
      borderColor: "border-violet-500/20",
      href: "/dashboard/messages",
    },
  ];

  return (
    <div className="space-y-10 pb-10">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-8 border border-white/5">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-bold tracking-tight text-white"
            >
              Control <span className="text-primary italic">Center</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 max-w-md"
            >
              Welcome back! Here&apos;s a quick overview of your portfolio&apos;s performance and recent updates.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10"
          >
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <TrendingUp className="h-6 w-6" />
            </div>
          </motion.div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-secondary/10 blur-[100px]" />
      </div>

      {/* Stats Grid — now 4 cards, 2×2 on md, 4-col on xl */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <Link key={stat.title} href={stat.href}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={cn(
                "glass-card group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(120,46,250,0.15)] cursor-pointer",
                stat.borderColor
              )}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
                    {stat.title}
                  </p>
                  <h3 className="text-3xl font-bold text-white tracking-tight">
                    {loading ? (
                      <div className="h-9 w-16 animate-pulse rounded-lg bg-white/5" />
                    ) : (
                      stat.value.toLocaleString()
                    )}
                  </h3>
                </div>
                <div className={cn(
                  "rounded-2xl bg-gradient-to-br p-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6",
                  stat.color
                )}>
                  <stat.icon className={cn("h-7 w-7", stat.iconColor)} />
                </div>
              </div>
              
              {/* Sparkle effect on hover */}
              <div className="absolute -bottom-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Sparkles className="h-12 w-12 text-white/5" />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Quick Actions - Takes 3 columns */}
        <section className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Quick Actions
            </h2>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "New Blog Post",
                desc: "Share your latest thoughts and tutorials with the world.",
                href: "/dashboard/blogs",
                icon: FileText,
                color: "primary",
              },
              {
                title: "New Project",
                desc: "Showcase your latest work and technical expertise.",
                href: "/dashboard/projects",
                icon: FolderKanban,
                color: "accent",
              }
            ].map((action, idx) => (
              <Link key={idx} href={action.href} className="group">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="h-full relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-6 transition-all duration-300 group-hover:bg-white/[0.07] group-hover:border-white/10"
                >
                  <div className={cn(
                    "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 transition-colors group-hover:bg-primary/20",
                    action.color === 'accent' && "group-hover:bg-accent/20"
                  )}>
                    <action.icon className={cn(
                      "h-6 w-6 text-gray-400 transition-colors group-hover:text-primary",
                      action.color === 'accent' && "group-hover:text-accent"
                    )} />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white group-hover:text-primary transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {action.desc}
                  </p>
                  
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    CREATE NOW <ArrowRight className="h-3 w-3" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Activity - Takes 2 columns */}
        <section className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-secondary" />
              Recent Updates
            </h2>
            <Link href="/dashboard/blogs" className="text-xs text-primary hover:underline font-medium">View All</Link>
          </div>

          <div className="glass-card overflow-hidden rounded-2xl border border-white/5">
            <div className="divide-y divide-white/5">
              {loading ? (
                [1, 2, 3].map((i) => (
                  <div key={i} className="p-4 flex gap-4 animate-pulse">
                    <div className="h-10 w-10 rounded-lg bg-white/5 shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 w-3/4 bg-white/5 rounded" />
                      <div className="h-3 w-1/2 bg-white/5 rounded" />
                    </div>
                  </div>
                ))
              ) : recentActivity.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-sm text-gray-500">No recent activity found.</p>
                </div>
              ) : (
                recentActivity.map((item, idx) => {
                  const isBlog = "slug" in item;
                  const date = item.updatedAt || item.createdAt;
                  
                  return (
                    <motion.div
                      key={item._id || item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      className="group flex items-center gap-4 p-4 hover:bg-white/[0.03] transition-colors"
                    >
                      <div className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5",
                        isBlog ? "text-blue-400" : "text-emerald-400"
                      )}>
                        {isBlog ? <FileText className="h-5 w-5" /> : <FolderKanban className="h-5 w-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-medium text-white group-hover:text-primary transition-colors">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center gap-2">
                          <span className="capitalize">{isBlog ? "Blog" : "Project"}</span>
                          <span className="h-1 w-1 rounded-full bg-gray-700" />
                          <span>{date ? new Date(date).toLocaleDateString() : "Recently"}</span>
                        </p>
                      </div>
                      <div className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                        item.status === 'published' ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                      )}>
                        {item.status || "Draft"}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Latest Messages Panel */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Mail className="h-5 w-5 text-violet-400" />
            Latest Messages
          </h2>
          <Link
            href="/dashboard/messages"
            className="flex items-center gap-1 text-xs text-primary hover:underline font-medium"
          >
            View All Inbox <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="glass-card overflow-hidden rounded-2xl border border-violet-500/10">
          {loading ? (
            <div className="divide-y divide-white/5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-5 flex gap-4 animate-pulse">
                  <div className="h-10 w-10 rounded-xl bg-white/5 shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-1/3 bg-white/5 rounded" />
                    <div className="h-3 w-2/3 bg-white/5 rounded" />
                    <div className="h-3 w-1/2 bg-white/5 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : latestMessages.length === 0 ? (
            <div className="p-12 text-center">
              <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center">
                <Mail className="h-7 w-7 text-gray-600" />
              </div>
              <p className="text-sm font-semibold text-white">No messages yet</p>
              <p className="mt-1 text-xs text-gray-500">Messages from your contact form will appear here.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {latestMessages.map((msg, idx) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="group flex items-start gap-4 p-5 hover:bg-white/[0.03] transition-colors"
                >
                  {/* Avatar */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 font-bold text-sm uppercase">
                    {msg.name.charAt(0)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-white group-hover:text-violet-400 transition-colors">
                        {msg.name}
                      </p>
                      <span className="text-[10px] text-gray-500">{msg.email}</span>
                    </div>
                    <p className="mt-0.5 text-sm font-medium text-gray-300 truncate">{msg.subject}</p>
                    <p className="mt-1 text-xs text-gray-500 line-clamp-2 leading-relaxed">{msg.message}</p>
                  </div>

                  {/* Date */}
                  <p className="shrink-0 text-[10px] text-gray-600 font-medium pt-0.5">
                    {new Date(msg.createdAt).toLocaleString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </motion.div>
              ))}

              {/* Footer CTA */}
              <Link href="/dashboard/messages">
                <div className="p-4 flex items-center justify-center gap-2 text-xs font-semibold text-violet-400 hover:bg-violet-500/5 transition-colors cursor-pointer">
                  Open Full Inbox <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

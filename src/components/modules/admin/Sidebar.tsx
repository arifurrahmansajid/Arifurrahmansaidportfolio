"use client";

import React, { useState, useEffect } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, FolderKanban, Settings, ExternalLink, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const routes = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Blogs", path: "/dashboard/blogs", icon: BookOpen },
  { name: "Projects", path: "/dashboard/projects", icon: FolderKanban },
  { name: "Messages", path: "/dashboard/messages", icon: Mail },
];

export function AppSidebar() {
  const location = usePathname();
  const { open } = useSidebar();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Sidebar
      collapsible="icon"
      className="bg-[#0D0914] border-r border-white/5 text-white"
    >
      <SidebarContent className="flex flex-col h-full">
        {/* Header */}
        <SidebarHeader className="p-6">
          <div className="flex items-center gap-3">
            {mounted && (
              <>
                <motion.div 
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  className="relative w-10 h-10 shrink-0"
                >
                  <Image
                    src="/memoji-emoji-handsome-smiling-man-white-background_826801-6987.avif"
                    alt="Md Arifur Rahman Sajid"
                    fill
                    className="object-cover rounded-xl shadow-[0_0_20px_rgba(120,46,250,0.3)] ring-1 ring-primary/50"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-[#0D0914]" />
                </motion.div>
                {open && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-left overflow-hidden"
                  >
                    <h1 className="font-bold text-sm truncate bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                      Md Arifur Rahman Sajid
                    </h1>
                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Administrator</p>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </SidebarHeader>

        {/* Navigation */}
        <div className="flex-1 overflow-hidden px-3">
          <ScrollArea className="h-full">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {routes.map((item) => {
                    const isActive = location === item.path;
                    return (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          size="lg"
                          asChild
                          className={cn(
                            "group relative w-full rounded-xl transition-all duration-300",
                            isActive 
                              ? "bg-primary/10 text-primary font-bold shadow-[inset_0_0_12px_rgba(120,46,250,0.1)]" 
                              : "text-gray-400 hover:text-white hover:bg-white/5"
                          )}
                        >
                          <Link href={item.path} className="flex items-center gap-3 px-3">
                            <item.icon className={cn(
                              "w-5 h-5 transition-colors duration-300",
                              isActive ? "text-primary" : "text-gray-500 group-hover:text-white"
                            )} />
                            {open && <span>{item.name}</span>}
                            {isActive && open && (
                              <motion.div 
                                layoutId="activeNav"
                                className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                              />
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <div className="mt-8 px-4">
               {open && <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">External</p>}
               <SidebarMenu className="space-y-2">
                  <SidebarMenuItem>
                    <SidebarMenuButton size="lg" asChild className="text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                      <Link href="/" target="_blank" className="flex items-center gap-3 px-3">
                        <ExternalLink className="w-5 h-5 text-gray-500" />
                        {open && <span>View Website</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
               </SidebarMenu>
            </div>
          </ScrollArea>
        </div>

        {/* Footer */}
        <SidebarFooter className="p-6 mt-auto">
          {open ? (
            <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-4 text-center">
              <p className="text-[10px] text-gray-500">SYSTEM STATUS</p>
              <div className="mt-2 flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_8px_var(--color-accent)]" />
                <span className="text-xs font-medium text-white">Online & Secure</span>
              </div>
              <p className="mt-3 text-[10px] text-gray-600">v1.2.4-stable</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <Settings className="w-5 h-5 text-primary" />
              </div>
            </div>
          )}
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}

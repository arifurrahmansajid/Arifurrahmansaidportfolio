"use client";

import { useRouter } from "next/navigation";
import { Search, LogOut, Bell, Shield, ChevronDown, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { motion } from "framer-motion";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { toast } from "@/components/ui/use-toast";

export function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/user/logout", {
        method: "POST",
      });
      const result = await res.json();

      if (result?.success) {
        toast({
          title: "Logged out",
          description: "You have successfully logged out.",
        });
        router.push("/login");
      } else {
        toast({
          title: "Logout failed",
          description: "Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong during logout.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#0D0914]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0D0914]/60">
      <div className="flex h-20 items-center px-8 gap-4 justify-between">
        {/* Left side - Sidebar trigger & Breadcrumbs-ish */}
        <div className="flex items-center gap-6">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <SidebarTrigger className="h-10 w-10 border border-white/10 rounded-xl hover:bg-white/5 transition-colors" />
          </motion.div>
          
          <div className="hidden md:flex items-center gap-3">
             <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <Shield className="h-5 w-5" />
             </div>
             <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-widest">Secure Portal</h2>
                <p className="text-[10px] text-gray-500 font-medium">Session Active • 256-bit AES</p>
             </div>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 mr-2">
             <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white">
                <Search className="h-5 w-5" />
             </Button>
             <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-[#0D0914]" />
             </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-3 px-2 py-1.5 h-auto rounded-2xl hover:bg-white/5 transition-all duration-300 group"
              >
                <div className="relative">
                  <Avatar className="h-10 w-10 rounded-xl ring-1 ring-white/10 group-hover:ring-primary/50 transition-all">
                    <AvatarImage src="/memoji-emoji-handsome-smiling-man-white-background_826801-6987.avif" className="object-cover" />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-bold rounded-xl text-xs">
                      AS
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-accent rounded-full border-2 border-[#0D0914]" />
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-bold text-white">Md Arifur Rahman</p>
                  <p className="text-[10px] text-gray-500">Super Admin</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-white transition-colors" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-64 mt-2 bg-[#15101E] border-white/10 rounded-2xl p-2 shadow-2xl" align="end">
              <DropdownMenuLabel className="font-normal p-3">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 rounded-xl">
                    <AvatarImage src="/memoji-emoji-handsome-smiling-man-white-background_826801-6987.avif" className="object-cover" />
                    <AvatarFallback className="bg-primary text-white font-bold rounded-xl">
                      AS
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-bold text-white">Arifur Rahman</p>
                    <p className="text-[10px] text-gray-500">arifur.sajid@example.com</p>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="bg-white/5" />
              
              <div className="p-1 space-y-1">
                <DropdownMenuItem className="rounded-xl cursor-pointer gap-3 p-2.5 text-gray-300 hover:text-white focus:bg-white/5 focus:text-white">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl cursor-pointer gap-3 p-2.5 text-gray-300 hover:text-white focus:bg-white/5 focus:text-white">
                  <Settings className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">System Config</span>
                </DropdownMenuItem>
              </div>

              <DropdownMenuSeparator className="bg-white/5" />

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem 
                    onSelect={(e) => e.preventDefault()}
                    className="rounded-xl cursor-pointer gap-3 p-2.5 text-red-400 hover:text-red-300 focus:bg-red-500/10 focus:text-red-300"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm font-medium">Sign Out</span>
                  </DropdownMenuItem>
                </AlertDialogTrigger>

                <AlertDialogContent className="bg-[#15101E] border-white/10 rounded-3xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white text-xl">Sign Out Session?</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                      You are about to terminate your admin session. All unsaved changes in active forms might be lost.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-white/5 border-white/10 text-white rounded-xl hover:bg-white/10">Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-xl border-none"
                    >
                      Sign Out
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

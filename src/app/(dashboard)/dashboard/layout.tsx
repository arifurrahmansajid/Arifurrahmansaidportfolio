"use client";

import { ReactNode } from "react";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/modules/admin/Sidebar";
import { Header } from "@/components/modules/admin/Topbar";
import { Toaster } from "@/components/ui/toaster";
import SmoothScroll from "@/components/shared/SmoothScroll";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </SidebarProvider>
  );
}

function DashboardLayout({ children }: { children: ReactNode }) {
  const { open } = useSidebar();

  return (
    <div className="flex min-h-screen bg-[#0f0f1a] text-white transition-all duration-300">
      {/* Sidebar */}
      <AppSidebar />
      <SmoothScroll />

      {/* Main Content */}
      <div
        className={`flex-1 w-full flex flex-col overflow-hidden transition-all duration-300 ${
          open ? "pl-64" : "pl-20"
        }`}
      >
        <Header />
        <main className="flex-1 flex-col flex overflow-y-auto p-6 bg-[#0f0f1a]">
          <div className="w-full flex-1">{children}</div>
        </main>
        <Toaster />
      </div>
    </div>
  );
}

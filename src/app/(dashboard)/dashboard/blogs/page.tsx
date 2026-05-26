"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Pencil, Plus, Trash2, BookOpen, Search, Eye, MessageSquare, Copy } from "lucide-react";
import { BlogForm } from "@/components/modules/admin/BlogForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { IBlog } from "@/interfaces";
import { fetchWithTag } from "@/lib/fetchWithTag";
import { getImageUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<IBlog | null>(null);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const loadBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchWithTag<IBlog[]>("/blog", { tag: "blogs" });
      setBlogs(response.data ?? []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast({
        title: "Error",
        description: "Failed to load blog posts.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  const handleDelete = async () => {
    if (!blogToDelete) return;

    try {
      await fetchWithTag(`/blog/${blogToDelete}`, { method: "DELETE" });
      toast({
        title: "Blog deleted",
        description: "The blog post has been removed successfully.",
      });
      await loadBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast({
        title: "Delete failed",
        description: "The blog post could not be deleted.",
        variant: "destructive",
      });
    } finally {
      setBlogToDelete(null);
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      await fetchWithTag(`/blog/${id}/duplicate`, { method: "POST" });
      toast({
        title: "Blog duplicated",
        description: "A copy of the blog post has been created as a draft.",
      });
      await loadBlogs();
    } catch (error) {
      console.error("Error duplicating blog:", error);
      toast({
        title: "Duplication failed",
        description: "The blog post could not be duplicated.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
               <BookOpen className="h-6 w-6 text-primary" />
            </div>
            Blog <span className="text-gray-500 font-light">Management</span>
          </h1>
          <p className="text-gray-400">Compose, edit, and publish your latest thoughts and tutorials.</p>
        </div>

        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) setEditingBlog(null);
          }}
        >
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingBlog(null);
                setIsDialogOpen(true);
              }}
              className="bg-primary hover:bg-primary-hover text-white px-6 py-6 rounded-2xl gap-2 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="h-5 w-5" />
              New Article
            </Button>
          </DialogTrigger>

          <AnimatePresence>
            {isDialogOpen && (
              <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto bg-[#15101E] border-white/10 rounded-3xl p-8">
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-2xl font-bold text-white">
                    {editingBlog ? "Edit Manuscript" : "Draft New Article"}
                  </DialogTitle>
                </DialogHeader>
                <BlogForm
                  blog={editingBlog || undefined}
                  onCancel={() => {
                    setIsDialogOpen(false);
                    setEditingBlog(null);
                    loadBlogs();
                  }}
                />
              </DialogContent>
            )}
          </AnimatePresence>
        </Dialog>
      </div>

      {/* Stats & Search */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
         <div className="sm:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search articles..." 
              className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl focus:border-primary/50 focus:ring-primary/20 w-full"
            />
         </div>
         <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
               <Eye className="h-4 w-4 text-primary" />
               <span className="text-xs font-bold text-gray-400">Total Views</span>
            </div>
            <span className="text-white font-bold">{blogs.reduce((acc, b) => acc + (b.meta?.views ?? b.views ?? 0), 0)}</span>
         </div>
         <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
               <MessageSquare className="h-4 w-4 text-accent" />
               <span className="text-xs font-bold text-gray-400">Published</span>
            </div>
            <span className="text-white font-bold">{blogs.filter(b => b.status === 'published').length}</span>
         </div>
      </div>

      {/* Blogs Table */}
      <div className="glass-card overflow-hidden rounded-3xl border border-white/5">
        {loading ? (
          <div className="py-24 text-center">
             <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em]" />
             <p className="mt-4 text-gray-500 font-medium tracking-widest uppercase text-xs">Querying Archive...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="py-24 text-center">
            <div className="mb-4 flex justify-center">
               <div className="h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-gray-600" />
               </div>
            </div>
            <h3 className="text-lg font-bold text-white">The archives are empty</h3>
            <p className="text-gray-500 max-w-xs mx-auto mt-2">Ready to share some knowledge? Start by composing your first blog post.</p>
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(true)}
              className="mt-6 border-primary/20 text-primary hover:bg-primary/10 rounded-xl px-6"
            >
               Compose First Post
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-white/[0.02] hover:bg-white/[0.02] border-white/5">
                  <TableHead className="py-6 text-gray-400 font-bold uppercase tracking-wider text-[10px]">Article</TableHead>
                  <TableHead className="py-6 text-gray-400 font-bold uppercase tracking-wider text-[10px]">Categories</TableHead>
                  <TableHead className="py-6 text-gray-400 font-bold uppercase tracking-wider text-[10px]">Status</TableHead>
                  <TableHead className="py-6 text-gray-400 font-bold uppercase tracking-wider text-[10px]">Analytics</TableHead>
                  <TableHead className="py-6 text-gray-400 font-bold uppercase tracking-wider text-[10px]">Created On</TableHead>
                  <TableHead className="py-6 text-right text-gray-400 font-bold uppercase tracking-wider text-[10px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs.map((blog, idx) => (
                  <motion.tr 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={blog._id || blog.id}
                    className="group border-white/5 hover:bg-white/[0.03] transition-colors"
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10 group-hover:ring-primary/30 transition-all">
                          {blog.thumbnail ? (
                            <Image
                              src={getImageUrl(blog.thumbnail)}
                              alt={blog.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-[8px] text-gray-600 font-bold">
                              N/A
                            </div>
                          )}
                        </div>
                        <div className="max-w-xs">
                           <p className="font-bold text-white group-hover:text-primary transition-colors truncate">{blog.title}</p>
                           <p className="text-[10px] text-gray-500 font-medium">By Md Arifur Rahman</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {(blog.categories || []).slice(0, 2).map((category) => (
                          <Badge key={category} className="bg-white/5 text-gray-400 border-white/10 text-[9px] rounded-md font-bold group-hover:border-primary/20 group-hover:text-primary/70 transition-colors">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight",
                        blog.status === "published"
                          ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                      )}>
                        <div className={cn("w-1.5 h-1.5 rounded-full", blog.status === "published" ? "bg-emerald-500" : "bg-amber-500")} />
                        {blog.status}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                         <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center">
                            <Eye className="h-3 w-3 text-gray-500" />
                         </div>
                         <span className="text-sm font-bold text-white">{blog.meta?.views ?? blog.views ?? 0}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <p className="text-xs text-gray-500 font-medium">
                        {blog.createdAt
                          ? new Date(blog.createdAt).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })
                          : "N/A"}
                      </p>
                    </TableCell>
                    <TableCell className="py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white"
                          onClick={() => {
                            setEditingBlog(blog);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white"
                          onClick={() => handleDuplicate(blog._id || blog.id || "")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 rounded-xl hover:bg-red-500/10 text-gray-400 hover:text-red-500"
                          onClick={() => setBlogToDelete(blog._id || blog.id || null)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <AlertDialog
        open={Boolean(blogToDelete)}
        onOpenChange={(open) => !open && setBlogToDelete(null)}
      >
        <AlertDialogContent className="bg-[#15101E] border-white/10 rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-white">Trash this Article?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              The article will be permanently deleted. This action cannot be reversed once confirmed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel onClick={() => setBlogToDelete(null)} className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10">
              Retain Post
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="rounded-xl bg-red-500 hover:bg-red-600 text-white border-none"
            >
              Confirm Disposal
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

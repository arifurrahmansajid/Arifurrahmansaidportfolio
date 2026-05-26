"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, Pencil, Plus, Trash2, FolderKanban, Search, Filter, Copy } from "lucide-react";
import { ProjectForm } from "@/components/modules/admin/ProjectForm";
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
import { IProject } from "@/interfaces";
import { fetchWithTag } from "@/lib/fetchWithTag";
import { getImageUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<IProject | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchWithTag<IProject[]>("/project", {
        tag: "projects",
      });
      setProjects(response.data ?? []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast({
        title: "Error",
        description: "Failed to load projects.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleDelete = async () => {
    if (!projectToDelete) return;

    try {
      await fetchWithTag(`/project/${projectToDelete}`, { method: "DELETE" });
      toast({
        title: "Project deleted",
        description: "The project has been removed successfully.",
      });
      await loadProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: "Delete failed",
        description: "The project could not be deleted.",
        variant: "destructive",
      });
    } finally {
      setProjectToDelete(null);
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      await fetchWithTag(`/project/${id}/duplicate`, { method: "POST" });
      toast({
        title: "Project duplicated",
        description: "A copy of the project has been created as a draft.",
      });
      await loadProjects();
    } catch (error) {
      console.error("Error duplicating project:", error);
      toast({
        title: "Duplication failed",
        description: "The project could not be duplicated.",
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
               <FolderKanban className="h-6 w-6 text-primary" />
            </div>
            Projects <span className="text-gray-500 font-light">Inventory</span>
          </h1>
          <p className="text-gray-400">Manage and showcase your technical expertise and creative work.</p>
        </div>

        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) setEditingProject(null);
          }}
        >
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingProject(null);
                setIsDialogOpen(true);
              }}
              className="bg-primary hover:bg-primary-hover text-white px-6 py-6 rounded-2xl gap-2 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="h-5 w-5" />
              Add Project
            </Button>
          </DialogTrigger>

          <AnimatePresence>
            {isDialogOpen && (
              <DialogContent className="max-h-[90vh] max-w-4xl overflow-auto bg-[#15101E] border-white/10 rounded-3xl p-8">
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-2xl font-bold text-white">
                    {editingProject ? "Refine Project" : "Forge New Project"}
                  </DialogTitle>
                </DialogHeader>
                <ProjectForm
                  project={editingProject || undefined}
                  onCancel={() => {
                    setIsDialogOpen(false);
                    setEditingProject(null);
                    loadProjects();
                  }}
                />
              </DialogContent>
            )}
          </AnimatePresence>
        </Dialog>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center bg-white/[0.03] border border-white/5 p-4 rounded-2xl">
         <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search projects..." 
              className="pl-10 bg-white/5 border-white/10 rounded-xl focus:border-primary/50 focus:ring-primary/20"
            />
         </div>
         <Button variant="outline" className="gap-2 border-white/10 rounded-xl bg-white/5 hover:bg-white/10">
            <Filter className="h-4 w-4" />
            Filters
         </Button>
      </div>

      {/* Projects Table/Grid */}
      <div className="glass-card overflow-hidden rounded-3xl border border-white/5">
        {loading ? (
          <div className="py-24 text-center">
             <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
             <p className="mt-4 text-gray-500 font-medium tracking-widest uppercase text-xs">Accessing Database...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="py-24 text-center">
            <div className="mb-4 flex justify-center">
               <div className="h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center">
                  <FolderKanban className="h-8 w-8 text-gray-600" />
               </div>
            </div>
            <h3 className="text-lg font-bold text-white">No projects found</h3>
            <p className="text-gray-500 max-w-xs mx-auto mt-2">Start by creating your first project to showcase it on your portfolio.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-white/[0.02] hover:bg-white/[0.02] border-white/5">
                  <TableHead className="py-6 text-gray-400 font-bold uppercase tracking-wider text-[10px]">Preview</TableHead>
                  <TableHead className="py-6 text-gray-400 font-bold uppercase tracking-wider text-[10px]">Information</TableHead>
                  <TableHead className="py-6 text-gray-400 font-bold uppercase tracking-wider text-[10px]">Stack</TableHead>
                  <TableHead className="py-6 text-gray-400 font-bold uppercase tracking-wider text-[10px]">Status</TableHead>
                  <TableHead className="py-6 text-gray-400 font-bold uppercase tracking-wider text-[10px]">Visibility</TableHead>
                  <TableHead className="py-6 text-right text-gray-400 font-bold uppercase tracking-wider text-[10px]">Operations</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {projects.map((project, idx) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={project._id || project.id}
                    className="group border-white/5 hover:bg-white/[0.03] transition-colors"
                  >
                    <TableCell className="py-4">
                      <div className="relative h-16 w-24 overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10 group-hover:ring-primary/30 transition-all">
                        {project.thumbnail ? (
                          <Image
                            src={getImageUrl(project.thumbnail)}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-[10px] text-gray-600 font-bold">
                            MISSING ASSET
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <p className="font-bold text-white group-hover:text-primary transition-colors">{project.title}</p>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                        {project.createdAt ? new Date(project.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'Unknown Date'}
                      </p>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {(project.technologies || []).slice(0, 2).map((tech) => (
                          <Badge key={tech} className="bg-primary/5 text-primary border-primary/20 text-[10px] rounded-md font-bold">
                            {tech}
                          </Badge>
                        ))}
                        {(project.technologies || []).length > 2 && (
                          <span className="text-[10px] text-gray-500 font-bold">+{project.technologies.length - 2}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight",
                        project.status === "published"
                          ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                      )}>
                        <div className={cn("w-1.5 h-1.5 rounded-full", project.status === "published" ? "bg-emerald-500" : "bg-amber-500")} />
                        {project.status}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex gap-3">
                        {project.liveSite && (
                          <a href={project.liveSite} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 text-gray-400 hover:text-primary transition-all">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                        {project.githubLink && (
                          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 text-gray-400 hover:text-primary transition-all">
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white"
                          onClick={() => {
                            setEditingProject(project);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white"
                          onClick={() => handleDuplicate(project._id || project.id || "")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 rounded-xl hover:bg-red-500/10 text-gray-400 hover:text-red-500"
                          onClick={() =>
                            setProjectToDelete(project._id || project.id || null)
                          }
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
        open={Boolean(projectToDelete)}
        onOpenChange={(open) => !open && setProjectToDelete(null)}
      >
        <AlertDialogContent className="bg-[#15101E] border-white/10 rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-white">Permanently Remove Project?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This action will erase the project from the system and it will no longer be visible on your portfolio.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel onClick={() => setProjectToDelete(null)} className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10">
              Keep Project
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="rounded-xl bg-red-500 hover:bg-red-600 text-white border-none"
            >
              Confirm Deletion
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

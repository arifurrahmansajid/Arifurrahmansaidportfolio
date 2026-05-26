"use client";

import { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { X, Plus } from "lucide-react";
import { ImageUpload } from "@/components/shared/ImageUpload";
import { fetchWithTag } from "@/lib/fetchWithTag";
import { useToast } from "@/hooks/use-toast";
import { IProject } from "@/interfaces";

interface ProjectFormProps {
  project?: IProject;
  onCancel: () => void;
}

export const ProjectForm = ({ project, onCancel }: ProjectFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
    const [thumbnail, setThumbnail] = useState<File | null>(null);

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IProject>({
    defaultValues: {
      title: project?.title || "",
      thumbnail: project?.thumbnail || "",
      description: project?.description || "",
      features: project?.features || [""],
      technologies: project?.technologies || [""],
      githubLink: project?.githubLink || "",
      liveSite: project?.liveSite || "",
      status: project?.status || "draft",
    },
  });

  const { fields: featureFields, append: appendFeature, remove: removeFeature } =
    useFieldArray({ control, name: "features" as never });

  const { fields: techFields, append: appendTech, remove: removeTech } =
    useFieldArray({ control, name: "technologies" as never });

const onSubmit = async (data: IProject) => {
  try {
    setLoading(true);

    // Create FormData to handle file uploads
    const formData = new FormData();
    formData.append("title", data.title.trim());
    formData.append("description", data.description.trim());
    formData.append("githubLink", data.githubLink?.trim() || "");
    formData.append("liveSite", data.liveSite?.trim() || "");
    formData.append("status", data.status);


    const cleanfeatures = (data.features || [])
      .map(k => k.trim())
      .filter(Boolean);

      
    formData.append("features", JSON.stringify(cleanfeatures));




        const cleantechnologies = (data.technologies || [])
      .map(k => k.trim())
      .filter(Boolean);
    formData.append("technologies", JSON.stringify(cleantechnologies));


    if (thumbnail) {
      formData.append("file", thumbnail);
    }


   for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const isEdit = !!(project?._id || project?.id);
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit ? `/project/${project?._id || project?.id}` : `/project`;

    await fetchWithTag(url, {
      method,
      data: formData,
      isFormData: true, // important to tell fetchWithTag it's FormData
      tag: "projects",
    });

    toast({
      title: project ? "Project Updated" : "Project Created",
      description: `Your project has been ${project ? "updated" : "created"} successfully.`,
      duration: 4000,
    });

    onCancel();
  } catch (error) {
    console.error(error);
    toast({
      title: "Error",
      description: "There was an error saving your project. Please try again.",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 p-6 bg-card rounded-2xl shadow-lg border border-border w-full  max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h2 className="text-3xl font-bold text-center sm:text-left text-primary">
        {project ? "Edit Project" : "Create New Project"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Title */}
        <div className="col-span-1 sm:col-span-2 space-y-2">
          <Label htmlFor="title">Project Title</Label>
          <Input
            id="title"
            placeholder="Enter project title..."
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
        </div>

        {/* Thumbnail */}
        <div className="col-span-1 sm:col-span-2 space-y-2">
          <Label>Thumbnail Image</Label>
    
              <ImageUpload
              onChange={setThumbnail}
              onRemove={() => setThumbnail(null)}
              initial={project?.thumbnail}
            />
        
          {errors.thumbnail && (
            <p className="text-sm text-red-500">{errors.thumbnail.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="col-span-1 sm:col-span-2 space-y-2">
          <Label htmlFor="description">Description</Label>
          <Controller
            name="description"
            control={control}
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <Textarea
                id="description"
                placeholder="Describe your project..."
                rows={5}
                className="resize-none"
                {...field}
              />
            )}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Features */}
        <div className="col-span-1 sm:col-span-2 space-y-2">
          <Label>Key Features</Label>
          <div className="space-y-3">
            {featureFields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col sm:flex-row gap-2"
              >
                <Input
                  {...register(`features.${index}`)}
                  placeholder={`Feature ${index + 1}`}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFeature(index)}
                  disabled={featureFields.length === 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendFeature("")}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Feature
            </Button>
          </div>
        </div>

        {/* Technologies */}
        <div className="col-span-1 sm:col-span-2 space-y-2">
          <Label>Technologies Used</Label>
          <div className="space-y-3">
            {techFields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col sm:flex-row gap-2"
              >
                <Input
                  {...register(`technologies.${index}`)}
                  placeholder="e.g., React, Node.js, MongoDB"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTech(index)}
                  disabled={techFields.length === 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendTech("")}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Technology
            </Button>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-2">
          <Label htmlFor="githubLink">GitHub Repository</Label>
          <Input
            id="githubLink"
            type="url"
            placeholder="https://github.com/username/repo"
            {...register("githubLink", {
              pattern: {
                value: /^https?:\/\/.+/,
                message: "Please enter a valid URL",
              },
            })}
          />
          {errors.githubLink && (
            <p className="text-sm text-red-500">{errors.githubLink.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="liveSite">Live Demo</Label>
          <Input
            id="liveSite"
            type="url"
            placeholder="https://your-project.com"
            {...register("liveSite", {
              pattern: {
                value: /^https?:\/\/.+/,
                message: "Please enter a valid URL",
              },
            })}
          />
          {errors.liveSite && (
            <p className="text-sm text-red-500">{errors.liveSite.message}</p>
          )}
        </div>
      </div>

      {/* Status Switch */}
      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Switch
              id="status"
              checked={field.value === "published"}
              onCheckedChange={(checked) =>
                field.onChange(checked ? "published" : "draft")
              }
            />
          )}
        />
        <Label htmlFor="status" className="cursor-pointer">
          Publish immediately
        </Label>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-border">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : project ? "Update Project" : "Create Project"}
        </Button>
      </div>
    </motion.form>
  );
};

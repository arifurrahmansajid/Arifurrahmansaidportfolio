// "use client";

// import { useState } from "react";
// import { useForm, Controller, useFieldArray } from "react-hook-form";
// import { motion } from "framer-motion";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import { RichTextEditor } from "./RichTextEditor";
// import { ImageUpload } from "@/components/shared/ImageUpload";
// import { fetchWithTag } from "@/lib/fetchWithTag";
// import { useToast } from "@/hooks/use-toast";
// import { IBlog } from "@/interfaces";

// const categories = ["React", "TypeScript", "Next.js", "JavaScript", "CSS", "Other"];

// interface BlogFormProps {
//   blog?: IBlog;
//   onCancel: () => void;
// }

// export const BlogForm = ({ blog, onCancel }: BlogFormProps) => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [thumbnail, setThumbnail] = useState<File | null>(null);
//   const { toast } = useToast();

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm<IBlog>({
//     defaultValues: {
//       title: blog?.title || "",
//       categories: blog?.categories || [],
//       tags: blog?.tags || [""],
//       content: blog?.content || "",
//       status: blog?.status || "draft",
//       meta: blog?.meta || {
//         seoTitle: "",
//         seoDescription: "",
//         readTime:0,
//         seoKeywords: [""],
//       },
//     },
//   });

// const { fields: tagFields, append: addTag, remove: removeTag } = useFieldArray({
//   control,
//   name: "tags" as never, 
// });



// const { fields: keywordFields, append: addKeyword, remove: removeKeyword } = useFieldArray({
//   control,
//   name: "meta.seoKeywords" as never, 
// });



 

// const onSubmit = async (data: IBlog) => {
//   try {
//     setLoading(true);

//     const formData = new FormData();

//     // === Basic Fields ===
//     formData.append("title", data.title?.trim() || "");
//     formData.append("content", data.content?.trim() || "");
//     formData.append("status", data.status || "draft");

// (data.categories || []).forEach(category => {
//   if (category?.trim()) formData.append("categories", category.trim());
// });

//     // === Thumbnail ===
//     if (thumbnail instanceof File) {
//       formData.append("file", thumbnail);
//     }

//     // === Array Fields ===
//     const cleanCategories = (data.categories || [])
//       .map(c => c.trim())
//       .filter(Boolean);

//     const cleanTags = (data.tags || [])
//       .map(t => t.trim())
//       .filter(Boolean);

//     const cleanKeywords = (data.meta?.seoKeywords || [])
//       .map(k => k.trim())
//       .filter(Boolean);

//     // Append as JSON strings
//     formData.append("categories", JSON.stringify(cleanCategories));
//     formData.append("tags", JSON.stringify(cleanTags));

//     // === Meta Object ===
//     const metaData = {
//       seoTitle: data.meta?.seoTitle?.trim() || "",
//       seoDescription: data.meta?.seoDescription?.trim() || "",
//       readTime: Number(data.meta?.readTime) || 0,
//       seoKeywords: cleanKeywords,
//     };

//     formData.append("meta", JSON.stringify(metaData));

//     // === Optional Debugging ===
//     // Log data to verify what’s being sent (optional)
//     for (const [key, value] of formData.entries()) {
//       console.log(`${key}:`, value);
//     }

//     // === API Call ===
//     const method = blog ? "PUT" : "POST";
//     const url = blog ? `/blog/${blog._id}` : `/blog`;

//     await fetchWithTag(url, {
//       method,
//       data: formData,
//       isFormData: true,
//       tag: "blogs",
//     });

//     toast({
//       title: blog ? "Blog Updated" : "Blog Posted",
//       description: `Your blog has been ${blog ? "updated" : "posted"} successfully.`,
//       duration: 4000,
//     });

//     onCancel();
//   } catch (error) {
//     console.error(error);
//     toast({
//       title: "Error",
//       description: "There was an error saving your blog. Please try again.",
//       variant: "destructive",
//     });
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <motion.form
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-8 p-6 bg-card rounded-2xl shadow-lg border border-border max-w-3xl mx-auto"
//       initial={{ opacity: 0, y: 40 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4, ease: "easeOut" }}
//     >
//       <h2 className="text-2xl font-semibold text-gray-800">✍️ Blog Editor</h2>

//       {/* Title */}
//       <div className="space-y-2">
//         <Label htmlFor="title">Title</Label>
//         <Input
//           id="title"
//           placeholder="Enter your blog title..."
//           {...register("title", { required: "Title is required" })}
//         />
//         {errors.title && (
//           <p className="text-sm text-red-500">{errors.title.message}</p>
//         )}
//       </div>

//       {/* Thumbnail */}
//       <div className="space-y-2">
//         <Label>Thumbnail</Label>
        
//             <ImageUpload
//               onChange={setThumbnail}
//               onRemove={() => setThumbnail(null)}
//               initial={blog?.thumbnail}
//             />
          
       
//       </div>

//       {/* Categories */}
//       <div className="space-y-2">
//         <Label>Category</Label>
//         <Controller
//           name="categories"
//           control={control}
//           render={({ field }) => (
//             <Select
            
//               onValueChange={(value) => field.onChange([value])}
//               value={field.value?.[0] || ""}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select category" />
//               </SelectTrigger>
//               <SelectContent>
//                 {categories.map((cat) => (
//                   <SelectItem key={cat} value={cat}>
//                     {cat}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           )}
//         />
//       </div>

//       {/* Tags */}
//       <div className="space-y-2">
//         <Label>Tags</Label>
//         <div className="flex flex-col gap-2">
//           {tagFields.map((field, index) => (
//             <div key={field.id} className="flex items-center gap-2">
//               <Input
//                 {...register(`tags.${index}`)}
//                 placeholder="Enter a tag"
//                 className="flex-1"
//               />
//               <Button
//                 type="button"
//                 variant="ghost"
//                 onClick={() => removeTag(index)}
//                 disabled={tagFields.length === 1}
//               >
//                 ✕
//               </Button>
//             </div>
//           ))}
//           <Button
//             type="button"
//             variant="outline"
//             size="sm"
//             onClick={() => addTag("")}
//           >
//             + Add Tag
//           </Button>
//         </div>
//       </div>

//       {/* SEO Fields */}
//       <div className="p-4 border border-gray-200 rounded-lg space-y-4 bg-gray-50/60">
//         <h3 className="font-semibold text-gray-700">SEO Settings</h3>

//         <div className="grid md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label>SEO Title</Label>
//             <Input 
//               placeholder="SEO-friendly title" 
//               {...register("meta.seoTitle")}
//             />
//           </div>
//           <div className="space-y-2">
//             <Label>SEO Description</Label>
//             <Input
//               placeholder="SEO-friendly description"
//               {...register("meta.seoDescription")}
//             />
//           </div>
//           <div className="space-y-2">
//             <Label>SEO readTime</Label>
//             <Input
//               placeholder="SEO-friendly readTime"
//               {...register("meta.readTime")}
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label>SEO Keywords</Label>
//           <div className="flex flex-col gap-2">
//             {keywordFields.map((field, index) => (
//               <div key={field.id} className="flex items-center gap-2">
//                 <Input
//                   {...register(`meta.seoKeywords.${index}`)}
//                   placeholder="Enter keyword"
//                   className="flex-1"
//                 />
//                 <Button
//                   type="button"
//                   variant="ghost"
//                   onClick={() => removeKeyword(index)}
//                   disabled={keywordFields.length === 1}
//                 >
//                   ✕
//                 </Button>
//               </div>
//             ))}
//             <Button
//               type="button"
//               variant="outline"
//               size="sm"
//               onClick={() => addKeyword("")}
//             >
//               + Add Keyword
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="space-y-2">
//         <Label>Content</Label>
//         <Controller
//           name="content"
//           control={control}
//           rules={{ required: "Content is required" }}
//           render={({ field }) => (
//               <RichTextEditor
//       key={blog?._id || "new"} 
//       value={field.value || ""} 
//       onChange={field.onChange}
//     />
//           )}
//         />
//         {errors.content && (
//           <p className="text-sm text-red-500">{errors.content.message}</p>
//         )}
//       </div>

//       {/* Publish Toggle */}
//       <div className="flex items-center space-x-2 pt-2">
//         <Controller
//           name="status"
//           control={control}
//           render={({ field }) => (
//             <Switch
//               id="status"
//               checked={field.value === "published"}
//               onCheckedChange={(checked) =>
//                 field.onChange(checked ? "published" : "draft")
//               }
//             />
//           )}
//         />
//         <Label htmlFor="status">Publish immediately</Label>
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-end gap-3 pt-4">
//         <Button
//           type="button"
//           variant="outline"
//           onClick={onCancel}
//           disabled={loading}
//         >
//           Cancel
//         </Button>
//         <Button type="submit" disabled={loading}>
//           {loading ? "Saving..." : blog ? "Update Blog" : "Publish Blog"}
//         </Button>
//       </div>
//     </motion.form>
//   );
// };





"use client";

import { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { motion } from "framer-motion";
import { X, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { RichTextEditor } from "./RichTextEditor";
import { ImageUpload } from "@/components/shared/ImageUpload";
import { fetchWithTag } from "@/lib/fetchWithTag";
import { useToast } from "@/hooks/use-toast";
import { IBlog } from "@/interfaces";
import { getImageUrl } from "@/lib/utils";

const CATEGORIES = ["React", "TypeScript", "Next.js", "JavaScript", "CSS", "Other"];

interface BlogFormProps {
  blog?: IBlog;
  onCancel: () => void;
}

type BlogFormData = {
  title: string;
  categories: string[];
  tags: { value: string }[];
  content: string;
  status: "draft" | "published";
  meta: {
    seoTitle: string;
    seoDescription: string;
    readTime: number;
    seoKeywords: { value: string }[];
  };
};

export const BlogForm = ({ blog, onCancel }: BlogFormProps) => {
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    blog?.categories || []
  );
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BlogFormData>({
    defaultValues: {
      title: blog?.title || "",
      categories: blog?.categories || [],
      tags: (blog?.tags || [""]).map(tag => ({ value: tag })),
      content: blog?.content || "",
      status: blog?.status || "draft",
      meta: {
        seoTitle: blog?.meta?.seoTitle || "",
        seoDescription: blog?.meta?.seoDescription || "",
        readTime: blog?.meta?.readTime || 0,
        seoKeywords: (blog?.meta?.seoKeywords || [""]).map(keyword => ({ value: keyword })),
      },
    },
  });

  const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({
    control,
    name: "tags",
  });

  const { fields: keywordFields, append: appendKeyword, remove: removeKeyword } = useFieldArray({
    control,
    name: "meta.seoKeywords",
  });


  // Category handlers
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleRemoveCategory = (category: string) => {
    setSelectedCategories(prev => prev.filter(c => c !== category));
  };

  // Form submission




const onSubmit = async (data: BlogFormData) => {
  try {
    setLoading(true);

    // Validate at least one category
    if (selectedCategories.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select at least one category.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();

    // Basic fields
    formData.append("title", data.title.trim());
    formData.append("content", data.content.trim());
    formData.append("status", data.status);

    // Thumbnail
    if (thumbnail instanceof File) {
      formData.append("file", thumbnail);
    }

    // Clean and filter arrays
    const cleanCategories = selectedCategories
      .map(c => c.trim())
      .filter(Boolean);

    const cleanTags = data.tags
      .map(t => t.value.trim())
      .filter(Boolean);

    const cleanKeywords = data.meta.seoKeywords
      .map(k => k.value.trim())
      .filter(Boolean);

    // Append complex fields as JSON strings (expected by backend)
    formData.append("categories", JSON.stringify(cleanCategories));
    formData.append("tags", JSON.stringify(cleanTags));
    
    const metaData = {
      seoTitle: data.meta.seoTitle.trim(),
      seoDescription: data.meta.seoDescription.trim(),
      readTime: Number(data.meta.readTime) || 0,
      seoKeywords: cleanKeywords,
    };
    formData.append("meta", JSON.stringify(metaData));

    // API call
    const isEdit = !!(blog?._id || blog?.id);
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit ? `/blog/${blog?._id || blog?.id}` : `/blog`;

    await fetchWithTag(url, {
      method,
      data: formData,
      isFormData: true,
      tag: "blogs",
    });

    toast({
      title: blog ? "Blog Updated" : "Blog Published",
      description: `Your blog has been ${blog ? "updated" : "published"} successfully.`,
    });

    onCancel();
  } catch (error) {
    console.error("Blog form error:", error);
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to save blog. Please try again.",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};












  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 bg-card rounded-2xl shadow-lg border border-border max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <span className="text-3xl">✍️</span>
        <h2 className="text-2xl font-semibold">
          {blog ? "Edit Blog" : "Create New Blog"}
        </h2>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium">
          Title <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          placeholder="Enter an engaging blog title..."
          className="text-base"
          {...register("title", {
            required: "Title is required",
            minLength: { value: 3, message: "Title must be at least 3 characters" },
            maxLength: { value: 200, message: "Title must be less than 200 characters" },
          })}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Thumbnail */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Thumbnail Image</Label>
        <ImageUpload
          onChange={setThumbnail}
          onRemove={() => setThumbnail(null)}
          initial={blog?.thumbnail ? getImageUrl(blog.thumbnail) : undefined}
        />
      </div>

      {/* Categories - Multi-select */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">
          Categories <span className="text-red-500">*</span>
        </Label>
        <Select onValueChange={handleCategoryToggle}>
          <SelectTrigger>
            <SelectValue placeholder="Select categories..." />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem 
                key={cat} 
                value={cat}
                disabled={selectedCategories.includes(cat)}
              >
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* Selected Categories */}
        {selectedCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-lg">
            {selectedCategories.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="px-3 py-1 text-sm"
              >
                {category}
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(category)}
                  className="ml-2 hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
        {selectedCategories.length === 0 && (
          <p className="text-sm text-muted-foreground">No categories selected</p>
        )}
      </div>

      {/* Tags */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Tags</Label>
        <div className="space-y-2">
          {tagFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <Input
                {...register(`tags.${index}.value`)}
                placeholder="e.g., #react-hooks or web-dev"
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeTag(index)}
                disabled={tagFields.length === 1}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendTag({ value: "" })}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Tag
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          Content <span className="text-red-500">*</span>
        </Label>
        <Controller
          name="content"
          control={control}
          rules={{
            required: "Content is required",
            minLength: { value: 50, message: "Content must be at least 50 characters" }
          }}
          render={({ field }) => (
            <RichTextEditor
              key={blog?._id || "new"}
              value={field.value || ""}
              onChange={field.onChange}
            />
          )}
        />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>

      {/* SEO Settings */}
      <div className="space-y-4 p-5 border border-border rounded-xl bg-muted/30">
        <h3 className="font-semibold text-base flex items-center gap-2">
          <span>🔍</span> SEO Settings
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="seoTitle" className="text-sm">SEO Title</Label>
            <Input
              id="seoTitle"
              placeholder="Optimized title for search engines"
              {...register("meta.seoTitle", {
                maxLength: { value: 60, message: "Max 60 characters" }
              })}
            />
            {errors.meta?.seoTitle && (
              <p className="text-xs text-red-500">{errors.meta.seoTitle.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="readTime" className="text-sm">Read Time (minutes)</Label>
            <Input
              id="readTime"
              type="number"
              min="0"
              placeholder="5"
              {...register("meta.readTime", {
                valueAsNumber: true,
                min: { value: 0, message: "Must be positive" }
              })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="seoDescription" className="text-sm">SEO Description</Label>
          <Input
            id="seoDescription"
            placeholder="Brief description for search results"
            {...register("meta.seoDescription", {
              maxLength: { value: 160, message: "Max 160 characters" }
            })}
          />
          {errors.meta?.seoDescription && (
            <p className="text-xs text-red-500">{errors.meta.seoDescription.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <Label className="text-sm">SEO Keywords</Label>
          <div className="space-y-2">
            {keywordFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <Input
                  {...register(`meta.seoKeywords.${index}.value`, {
                    pattern: {
                      value: /^[a-zA-Z0-9\s-]+$/,
                      message: "Only letters, numbers, spaces and hyphens"
                    }
                  })}
                  placeholder="e.g., web-development"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeKeyword(index)}
                  disabled={keywordFields.length === 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendKeyword({ value: "" })}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Keyword
            </Button>
          </div>
        </div>
      </div>

      {/* Status Toggle */}
      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
        <div className="space-y-0.5">
          <Label htmlFor="status" className="text-sm font-medium">
            Publication Status
          </Label>
          <p className="text-xs text-muted-foreground">
            {selectedCategories.length === 0 
              ? "Select at least one category to publish"
              : "Make this blog visible to readers"}
          </p>
        </div>
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
              disabled={selectedCategories.length === 0}
            />
          )}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : blog ? "Update Blog" : "Publish Blog"}
        </Button>
      </div>
    </motion.form>
  );
};
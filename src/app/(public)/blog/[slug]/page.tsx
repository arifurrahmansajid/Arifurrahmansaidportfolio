import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, Clock, Eye, Tag } from "lucide-react";
import { fetchWithTag } from "@/lib/fetchWithTag";
import { IBlog } from "@/interfaces";
import { LexicalRenderer } from '@/components/shared/editor/LexicalRenderer';
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import BackButton from "@/components/shared/BackButton";
import { getImageUrl } from "@/lib/utils";




export async function generateStaticParams() {
  try {
    const url = `/blog`;
    const blogs = await fetchWithTag<IBlog[]>(url, { tag: "blogs" });
    return blogs?.data?.map((blog) => ({ slug: blog.slug })) ?? [];
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const url = `/blog/${slug}`;
  const blog = await fetchWithTag<IBlog>(url, { tag: `blogs , blog-${slug}` });

  if (!blog?.data) {
    return {
      title: "Blog Not Found | Faysal’s Blog",
      description: "The blog you're looking for does not exist.",
    };
  }

  const { title, meta, thumbnail } = blog.data;
  const seoTitle = meta?.seoTitle || `${title} | Faysal’s Blog`;
  const seoDescription =
    meta?.seoDescription || "Read this insightful post by Faysal.";
  const seoKeywords = meta?.seoKeywords?.join(", ") || "blog, article, insight";

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: [{ url: thumbnail || "/default-blog.jpg" }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [thumbnail || "/default-blog.jpg"],
    },
  };
}

interface BlogDetailsProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailsPage({ params }: BlogDetailsProps) {
  const { slug } = await params;
  const url = `/blog/${slug}`;
  const result = await fetchWithTag<IBlog>(url, { tag: `blog , blog-${slug}` });

  if (!result.data) return notFound();




  const  blog  = result.data;

  return (
    <article className="min-h-screen bg-background">
      <section className="relative pt-24 pb-12 px-4 overflow-hidden">
     
<div className="absolute inset-0 -z-10 overflow-hidden"> <div className="absolute top-20 left-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl" /> <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" /> </div>

        
        <div className="max-w-4xl mx-auto relative z-10">
   <BackButton/>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags?.map((tag : string) => (
              <Badge key={tag} variant="secondary" className="text-sm">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
            {blog.createdAt && (
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {format(new Date(blog.createdAt), 'MMMM dd, yyyy')}
              </span>
            )}
            {blog.meta?.readTime && (
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {blog.meta.readTime} min read
              </span>
            )}
            {blog.meta?.views && (
              <span className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {blog.meta.views.toLocaleString()} views
              </span>
            )}
          </div>

          {/* Thumbnail */}
      {blog.thumbnail && ( <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-10 shadow-lg ring-1 ring-border/10"> <Image src={getImageUrl(blog.thumbnail)} alt={blog.title} fill className="object-cover rounded-2xl" priority /> </div> )}
        </div>
      </section>

      {/* Content Section */}
      <section className="px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 bg-card/50 backdrop-blur border-border">
            <LexicalRenderer content={blog.content} />
          </Card>

          {/* SEO Description Footer */}
          {blog.meta?.seoDescription && (
            <div className="mt-8 p-6 bg-muted/30 rounded-lg border border-border">
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                Summary
              </h3>
              <p className="text-foreground/80">
                {blog.meta.seoDescription}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Related Posts */}
      {/* {relatedBlogs.length > 0 && (
        <section className="px-4 pb-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <BlogCard key={relatedBlog._id} blog={relatedBlog} />
              ))}
            </div>
          </div>
        </section>
      )} */}
    </article>
  );
}

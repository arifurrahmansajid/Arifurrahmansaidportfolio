import BlogDetailsSkeleton from "@/components/blogs/BlogDetailsSkeleton";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <BlogDetailsSkeleton />
    </div>
  )
}
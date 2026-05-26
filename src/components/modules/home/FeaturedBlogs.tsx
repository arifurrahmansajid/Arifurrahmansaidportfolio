import React from "react";
import BlogCard from "@/components/blogs/BlogCard";
import { IBlog } from "@/interfaces";
import { fetchWithTag } from "@/lib/fetchWithTag";

const FeaturedBlogs = async () => {
  try {
    const url = `/blog`;
    const result = await fetchWithTag<IBlog[]>(url, { tag: "blogs" });

    const blogs: IBlog[] = result?.data
      ? Array.isArray(result.data)
        ? result.data
        : [result.data]
      : [];

    if (blogs.length === 0) {
      return (
        <section className="relative py-16 px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Featured Blogs
          </h2>
          <p className="text-gray-400">No featured blogs available at the moment.</p>
        </section>
      );
    }

    return (
      <section className="relative py-24 px-6 overflow-hidden bg-[var(--color-bg-base)]">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto">
          {/* Headline Section */}
          <div className="flex flex-col items-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white tracking-tight">
              Latest <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic">Stories</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
            <p className="text-gray-400 text-center max-w-lg font-medium">
              Explore my latest thoughts on web development, design, and technology.
            </p>
          </div>

          {/* Blog Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
            {blogs.map((blog, i) => (
              <BlogCard key={blog._id || i} blog={blog} />
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error loading featured blogs:", error);

    return (
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Featured Blogs
        </h2>
        <p className="text-red-400">
          Failed to load featured blogs. Please try again later.
        </p>
      </section>
    );
  }
};

export default FeaturedBlogs;

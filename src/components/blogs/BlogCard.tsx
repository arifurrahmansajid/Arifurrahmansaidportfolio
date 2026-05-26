"use client";

import { Badge } from '@/components/ui/badge';
import { Clock, Eye, Calendar, ArrowUpRight } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';
import { IBlog } from '@/interfaces';
import Link from 'next/link';
import { getImageUrl } from '@/lib/utils';
import { motion } from 'framer-motion';

interface BlogCardProps {
  blog: IBlog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/blog/${blog.slug}`} className="block group">
        <div className="relative h-full flex flex-col overflow-hidden bg-[#15101E]/40 backdrop-blur-md border border-white/5 rounded-3xl transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(120,46,250,0.15)] group-hover:bg-[#15101E]/60">
          
          {/* Image Container */}
          {blog.thumbnail && (
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={getImageUrl(blog.thumbnail)}
                alt={blog.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0914] via-transparent to-transparent opacity-80" />
              
              {/* Category Badge - Floating */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {blog.categories?.slice(0, 1).map((cat) => (
                  <Badge 
                    key={cat} 
                    className="bg-secondary/20 hover:bg-secondary/30 text-secondary border-secondary/30 backdrop-blur-md text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-lg"
                  >
                    {cat}
                  </Badge>
                ))}
              </div>

              {/* View Indicator */}
              <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>
          )}
          
          {/* Content Area */}
          <div className="flex-1 p-6 flex flex-col">
            {/* Meta Top */}
            <div className="flex items-center gap-4 mb-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              {blog.createdAt && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span>{format(new Date(blog.createdAt), 'MMM dd, yyyy')}</span>
                </div>
              )}
              <div className="h-1 w-1 rounded-full bg-white/10" />
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>{blog.meta?.readTime || 5} min</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-3 text-white leading-tight group-hover:text-primary transition-colors duration-300">
              {blog.title}
            </h3>
            
            {blog.meta?.seoDescription && (
              <p className="text-gray-400 text-sm mb-6 line-clamp-2 font-medium leading-relaxed">
                {blog.meta.seoDescription}
              </p>
            )}
            
            {/* Tags Area */}
            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {blog.tags?.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-[10px] text-gray-500 bg-white/5 px-2 py-0.5 rounded-md">
                    #{tag.replace(/\s+/g, '')}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-gray-500 text-xs font-semibold">
                <Eye className="w-3.5 h-3.5" />
                <span>{blog.meta?.views?.toLocaleString() || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

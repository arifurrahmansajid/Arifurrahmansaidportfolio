"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function BlogDetailsSkeleton() {
  return (
    <article className="min-h-screen bg-background animate-pulse">
      <section className="relative pt-24 pb-12 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-10 w-32 mb-8 rounded-full" />
          <div className="flex flex-wrap gap-2 mb-6">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <Skeleton className="h-16 w-full mb-6 rounded-lg" />
          <Skeleton className="h-8 w-3/4 mb-4 rounded-lg" />
          <Skeleton className="h-8 w-1/2 mb-8 rounded-lg" />
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <Skeleton className="aspect-video w-full rounded-2xl mb-10" />
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="max-w-4xl mx-auto space-y-4">
          <Card className="p-8 md:p-12 bg-card/50 backdrop-blur border-border space-y-4">
            <Skeleton className="h-6 w-full rounded-lg" />
            <Skeleton className="h-6 w-full rounded-lg" />
            <Skeleton className="h-6 w-5/6 rounded-lg" />
            <Skeleton className="h-6 w-3/4 rounded-lg" />
            <Skeleton className="h-6 w-2/3 rounded-lg" />
          </Card>
          <Skeleton className="mt-8 h-20 w-full rounded-lg" />
        </div>
      </section>
    </article>
  );
}

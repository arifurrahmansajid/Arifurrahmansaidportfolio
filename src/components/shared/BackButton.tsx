"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className="my-4"
      variant="ghost"
    >
     <ArrowLeft className="w-4 h-4 mr-2" />
      Go Back
    </Button>
  );
}

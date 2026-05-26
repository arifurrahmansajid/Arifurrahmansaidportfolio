import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImageUrl(path: string | undefined | null) {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("data:")) return path;
  
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  // Ensure we don't have double slashes
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  
  // Encode URI to handle spaces and special characters in filenames
  return `${baseUrl}${encodeURI(cleanPath)}`;
}

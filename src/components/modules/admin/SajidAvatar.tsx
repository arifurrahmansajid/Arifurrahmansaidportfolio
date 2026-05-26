// This is a placeholder image for Md Arifur Rahman Sajid. Replace with a real photo if available.
import Image from "next/image";

export default function SajidAvatar({ className = "", size = 40 }) {
  return (
    <Image
      src="/sajid-avatar.png"
      alt="Md Arifur Rahman Sajid"
      width={size}
      height={size}
      className={`object-cover rounded-full ${className}`}
    />
  );
}

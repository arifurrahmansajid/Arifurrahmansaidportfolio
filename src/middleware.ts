import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/dashboard/blogs", "/dashboard/projects"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const session = req.cookies.get("session")?.value;
    
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const user = JSON.parse(session);
      if (!user?.id) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

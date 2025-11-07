import { NextResponse } from "next/server";

// 3. Define your protected routes (routes that require a token)
const protectedPaths = ["/account", "/liked-videos", "/history"];

// 4. Define public-only routes (routes a logged-in user shouldn't see)
const publicOnlyPaths = ["/sign-in", "/register"];

export function middleware(request) {
  // 1. Get the token from the request's cookies
  const token = request.cookies.get("token");

  // 2. Get the path the user is trying to visit
  const { pathname } = request.nextUrl;

  // Check if the current path is one of the protected paths
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  // Check if the current path is one of the public-only paths
  const isPublicOnlyPath = publicOnlyPaths.some((path) =>
    pathname.startsWith(path)
  );

  // 5. REDIRECT LOGIC

  // Case A: User is trying to access a protected path (e.g., /account)
  if (isProtectedPath) {
    if (!token) {
      // No token? Redirect them to the sign-in page.
      const url = request.nextUrl.clone(); // Clone the URL
      url.pathname = "/sign-in"; // Set new path
      return NextResponse.redirect(url);
    }
  }

  // Case B: User is logged in AND trying to access a public-only path (e.g., /sign-in)
  if (isPublicOnlyPath) {
    if (token) {
      // Already has a token? Redirect them to their account page.
      const url = request.nextUrl.clone();
      url.pathname = "/account";
      return NextResponse.redirect(url);
    }
  }

  // 6. If none of the above, let the user continue.
  return NextResponse.next();
}

// 7. The 'matcher' config
// This tells the middleware which paths to run on.
// This is more efficient than running it on *every* request (like images, CSS, etc.)
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api (your API routes - we want to protect them separately)
     */
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};

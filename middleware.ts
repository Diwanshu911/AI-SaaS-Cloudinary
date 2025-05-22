// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
// import { NextResponse } from 'next/server';

// const isPublicRoute = createRouteMatcher([
//     "/sign-in",
//     "/sign-up",
//     "/",
//     "/home"
// ])
// const isPublicApiRoute = createRouteMatcher([
//     "/api/videos"
// ])

// export default clerkMiddleware((auth, req) => {
//     const {userId} = auth();
//     const currentUrl = new URL(req.url)
//      const isAccessingDashboard = currentUrl.pathname === "/home"
//      const isApiRequest = currentUrl.pathname.startsWith("/api")

//      // If user is logged in and accessing a public route but not the dashboard
//     if(userId && isPublicRoute(req) && !isAccessingDashboard) {
//         return NextResponse.redirect(new URL("/home", req.url))
//     }
//     //not logged in
//     if(!userId){
//         // If user is not logged in and trying to access a protected route
//         if(!isPublicRoute(req) && !isPublicApiRoute(req) ){
//             return NextResponse.redirect(new URL("/sign-in", req.url))
//         }

//         // If the request is for a protected API and the user is not logged in
//         if(isApiRequest && !isPublicApiRoute(req)){
//             return NextResponse.redirect(new URL("/sign-in", req.url))
//         }
//     }
//     return NextResponse.next()

// })

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };


import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in", "/sign-up", "/home"]);

const isPublicApiRoute = createRouteMatcher(["/api/videos"]);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();
  const currentUrl = new URL(req.url);
  const pathname = currentUrl.pathname;

  // Skip redirect logic for root "/" since it's handled in app/page.tsx
  if (pathname === "/") {
    return NextResponse.next();
  }

  const isAccessingDashboard = pathname === "/home";
  const isApiRequest = pathname.startsWith("/api");

  // If user is logged in and accessing a public route (except dashboard)
  if (userId && isPublicRoute(req) && !isAccessingDashboard) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // If not logged in and trying to access a protected route
  if (!userId) {
    if (!isPublicRoute(req) && !isPublicApiRoute(req)) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    if (isApiRequest && !isPublicApiRoute(req)) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

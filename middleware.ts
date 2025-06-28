import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  "/sign-in",
  "/sign-up",
  "/home",
  "/",
]);

const isPublicApiRoute = createRouteMatcher([
  "/api/videos",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const currentURL = new URL(req.url);
  const pathname = currentURL.pathname.replace(/\/$/, '');
  const isAccessingDashboard = pathname === '/home';
  const isApiRequest = currentURL.pathname.startsWith('/api');

  // Handle logged-in users
  if (userId) {
    // Prevent redirect loop: Do not redirect if already on '/home'
    if (isPublicRoute(req) && !isAccessingDashboard) {
      return NextResponse.redirect(new URL('/home', req.url));
    }
  } else {
    // Handle non-logged-in users
    // Redirect to '/sign-in' if accessing a protected route
    if (!isPublicRoute(req) && !isPublicApiRoute(req)) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    // Prevent redirect loop: Do not redirect if already on '/sign-in' or '/sign-up'
    if (isApiRequest && !isPublicApiRoute(req)) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
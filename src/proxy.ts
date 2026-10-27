import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const privateRoutes = [
    "/dashboard",
    "/dashboard/bookings",
    "/dashboard/reviews",
    "/dashboard/profile",
    "/dashboard/admin",
    "/dashboard/admin/listings",
    "/dashboard/admin/users",
    "/dashboard/admin/orders",
    "/dashboard/admin/analytics",
    "/dashboard/admin/settings",
];

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const isAuthenticated = Boolean(token);
    const reqPath = request.nextUrl.pathname;

    const isPrivateReq = privateRoutes.some((route) =>
        reqPath.startsWith(route),
    );

    if (!isAuthenticated && isPrivateReq) {
        return NextResponse.redirect(
            new URL(`/login?callbackUrl=${reqPath}`, request.url),
        );
    }
    return NextResponse.next();
}

export const config = {
    matcher: "/dashboard/:path*",
};

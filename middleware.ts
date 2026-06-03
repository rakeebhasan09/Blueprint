import { auth } from "@/lib/auth";

export default auth((req) => {
    const pathname = req.nextUrl.pathname;
    const user = req.auth?.user;

    if (pathname.startsWith("/dashboard/admin")) {
        if (!user) {
            return Response.redirect(new URL("/login", req.url));
        }

        if (user.role !== "admin") {
            return Response.redirect(new URL("/", req.url));
        }
    }
});

export const config = {
    matcher: ["/dashboard/:path*"],
};

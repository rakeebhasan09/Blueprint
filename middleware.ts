import { auth } from "@/lib/auth";

export default auth((req) => {
    const pathname = req.nextUrl.pathname;
    const user = req.auth?.user;

    if (!user) {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set(
            "callbackUrl",
            `${pathname}${req.nextUrl.search}`,
        );
        return Response.redirect(loginUrl);
    }

    if (pathname.startsWith("/dashboard/admin")) {
        if (user.role !== "admin") {
            return Response.redirect(new URL("/", req.url));
        }
    }
});

export const config = {
    matcher: ["/dashboard/:path*"],
};

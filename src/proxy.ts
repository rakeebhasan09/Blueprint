import { auth } from "./lib/auth";

export const proxy = auth((request) => {
    const isLoggedIn = Boolean(request.auth);
    const { pathname, search } = request.nextUrl;

    if (pathname.startsWith("/dashboard") && !isLoggedIn) {
        const loginUrl = new URL("/login", request.url);

        loginUrl.searchParams.set("callbackUrl", `${pathname}${search}`);

        return Response.redirect(loginUrl);
    }
});

export const config = {
    matcher: ["/dashboard/:path*"],
};

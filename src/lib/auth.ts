import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";

type UserRole = "user" | "manager" | "admin";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        // Google Provider
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        // Facebook Provider
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }),

        // Credentials Provider
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: credentials.email,
                                password: credentials.password,
                            }),
                        },
                    );

                    if (!response.ok) {
                        return null;
                    }

                    const data = await response.json();
                    const user = data.user;

                    if (!user?.id && !user?._id) {
                        return null;
                    }

                    return {
                        id: String(user.id ?? user._id),
                        name: user.name,
                        email: user.email,
                        image: user.image ?? user.picture ?? null,
                        role: user.role ?? "user",
                    };
                } catch (error) {
                    console.error("Credentials login failed:", error);
                    return null;
                }
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
    },

    callbacks: {
        async signIn({ user, account }) {
            // Credentials login is handled by authorize().
            if (account?.provider === "credentials") {
                return true;
            }

            // Check whether login is through Google or Facebook.
            const isSocialProvider =
                account?.provider === "google" ||
                account?.provider === "facebook";

            if (isSocialProvider) {
                try {
                    // Email is required by your current backend API.
                    if (!user.email) {
                        console.error("Social login email not found");
                        return false;
                    }

                    const API_URL = process.env.NEXT_PUBLIC_API_URL;

                    if (!API_URL) {
                        console.error("API URL is missing");
                        return false;
                    }

                    // Check whether the user already exists.
                    const response = await fetch(
                        `${API_URL}/users?email=${encodeURIComponent(user.email)}`,
                        { cache: "no-store" },
                    );

                    if (!response.ok) {
                        console.error("User lookup failed:", response.status);
                        return false;
                    }

                    const data = await response.json();
                    const existingUser = data?.users?.[0];

                    // Existing user: skip registration.
                    if (existingUser?._id || existingUser?.id) {
                        console.log("Existing user found");
                        return true;
                    }

                    // New user: register in the backend.
                    const registerResponse = await fetch(
                        `${API_URL}/auth/register`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                user,
                                account,
                            }),
                        },
                    );

                    if (!registerResponse.ok) {
                        console.error(
                            "Social registration failed:",
                            registerResponse.status,
                        );
                        return false;
                    }

                    return true;
                } catch (error) {
                    console.error("Social login failed:", error);
                    return false;
                }
            }

            // Reject unsupported providers.
            return false;
        },

        async jwt({ token, user, account }) {
            // This runs during initial sign-in.
            if (user) {
                // Credentials login.
                if (account?.provider === "credentials") {
                    token.id = user.id;
                    token.email = user.email;
                    token.role =
                        (user as typeof user & { role?: UserRole }).role ??
                        "user";
                }

                // Google or Facebook login.
                const isSocialProvider =
                    account?.provider === "google" ||
                    account?.provider === "facebook";

                if (isSocialProvider && user.email) {
                    const API_URL = process.env.NEXT_PUBLIC_API_URL;

                    if (!API_URL) {
                        throw new Error("API URL is missing");
                    }

                    // Retrieve database user information.
                    const response = await fetch(
                        `${API_URL}/users?email=${encodeURIComponent(user.email)}`,
                        { cache: "no-store" },
                    );

                    if (!response.ok) {
                        throw new Error("Database user lookup failed");
                    }

                    const data = await response.json();
                    const dbUser = data?.users?.[0];

                    const dbUserId = dbUser?._id ?? dbUser?.id;

                    if (!dbUserId) {
                        throw new Error("Database user not found");
                    }

                    // Save database information in JWT.
                    token.id = String(dbUserId);
                    token.email = dbUser.email;
                    token.role = dbUser.role ?? "user";
                }
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = String(token.id ?? "");
                session.user.role =
                    (token.role as UserRole | undefined) ?? "user";
            }

            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
});

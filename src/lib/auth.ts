import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
// import Credentials from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";

type UserRole = "user" | "manager" | "admin";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

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
            // Credentials users are authenticated by your backend.
            if (account?.provider === "credentials") {
                return true;
            }

            // Register or synchronize Google users with your backend.
            if (account?.provider === "google") {
                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
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

                    if (!response.ok) {
                        console.error(
                            "Google user registration failed:",
                            response.status,
                        );
                        return false;
                    }

                    return true;
                } catch (error) {
                    console.error("Google registration failed:", error);
                    return false;
                }
            }

            return true;
        },

        async jwt({ token, user, account }) {
            if (user) {
                // Credentials login: use the user returned by authorize().
                if (account?.provider === "credentials") {
                    token.id = user.id;
                    token.email = user.email;
                    token.role =
                        (user as typeof user & { role?: UserRole }).role ??
                        "user";
                }

                // Google login: retrieve the existing database user.
                else if (account?.provider === "google" && user.email) {
                    try {
                        const response = await fetch(
                            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users?email=${encodeURIComponent(user.email)}`,
                        );

                        if (!response.ok) {
                            throw new Error(
                                `User lookup failed: ${response.status}`,
                            );
                        }

                        const data = await response.json();
                        const dbUser = data?.users?.[0];

                        if (!dbUser?._id) {
                            throw new Error(
                                "Google user was not found in the database.",
                            );
                        }

                        token.id = String(dbUser._id);
                        token.email = dbUser.email;
                        token.role = dbUser.role ?? "user";
                    } catch (error) {
                        console.error("Google user lookup failed:", error);
                        throw error;
                    }
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

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        // User Login with email and password (credentials provider)
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials, req) {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(credentials),
                    },
                );
                const data = await res.json();

                if (!res.ok) {
                    return null;
                }

                // return data.user;
                return data.user;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "credentials") {
                return true;
            }

            try {
                const newUser = { user, account };
                const response = await fetch(
<<<<<<< HEAD
                    `${process.env.NEXT_PUBLIC_API_URL}/register`,
=======
                    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/register`,
>>>>>>> af4d07c749c66f7c937ad0761a0e1722656b6b59
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newUser),
                    },
                );

                const data = await response.json();
                return true;
            } catch (error) {
                return false;
            }
        },

<<<<<<< HEAD
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.role =
                    (user as { role?: "user" | "manager" | "admin" }).role ??
                    "user";
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role =
                    (token.role as "user" | "manager" | "admin") ?? "user";
=======
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.role = token.role as string;
>>>>>>> af4d07c749c66f7c937ad0761a0e1722656b6b59
            }
            return session;
        },

        async jwt({ token, user, account }) {
            if (user) {
                if (account?.provider != "credentials") {
                    const dbUserRes = await fetch(
                        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users?email=${user.email}`,
                    );
                    const dbUser = await dbUserRes.json();
                    token.id = dbUser?.users?.[0]?._id;
                    token.email = dbUser?.users?.[0]?.email;
                    token.role = dbUser?.users?.[0]?.role;
                } else {
                    token.id = user.id;
                    token.email = user.email;
                    token.role = user.role;
                }
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});

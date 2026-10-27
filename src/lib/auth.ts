import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user, account }) {
            console.log("User signed in:", { user, account });
            try {
                const newUser = { user, account };
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/register`,
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
                console.error("Error during sign-in:", error);
                return false;
            }
        },

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
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});

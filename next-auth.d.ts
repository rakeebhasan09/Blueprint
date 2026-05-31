import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: string;
            phone?: string;
            bio?: string;
        } & DefaultSession["user"];
    }

    interface User {
        id: string;
        role: string;
        phone?: string;
        bio?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: string;
        phone?: string;
        bio?: string;
    }
}

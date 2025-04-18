import { betterAuth } from "better-auth";
import Database from 'better-sqlite3';
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./app/prisma";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET,
    baseUrl: process.env.BETTER_AUTH_URL,
    database: prismaAdapter(prisma, {
        provider: "mongodb"
    }),
    emailAndPassword: {
        enabled: true
    },
    plugins: [nextCookies()]
})
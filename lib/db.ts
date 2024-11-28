import {PrismaClient} from "@prisma/client";

// This code ensures safe and efficient management of the Prisma client in a Next.js application, especially during development, by:

// Avoiding multiple instances of PrismaClient during hot-reloads.
// Ensuring a single instance is used throughout the app.
// Preventing resource leaks and database connection saturation.

declare global {
    var prisma: PrismaClient | undefined;
};

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;
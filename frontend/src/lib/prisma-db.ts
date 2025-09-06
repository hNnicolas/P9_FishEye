import path from "path";
import dotenv from "dotenv";

// Charge le .env depuis la racine
dotenv.config({ path: path.resolve(process.cwd(), "frontend/.env.local") });

import { PrismaClient } from "../../../generated/prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// Création unique du client Prisma
export const prisma =
  globalThis.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

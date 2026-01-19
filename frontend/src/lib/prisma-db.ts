import { PrismaClient } from "../../../generated/prisma/client";
declare global {
  var prisma: PrismaClient | undefined;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// ==========================
// Types et fonctions utilitaires
// ==========================

export type PhotographerWithPhotos = {
  id: number;
  name: string;
  city: string;
  country: string;
  tagline: string;
  price: number;
  portrait: string;
  photos?: {
    id: number;
    url: string;
    title?: string;
    likes?: number;
  }[];
};

export const getAllPhotographers = () => prisma.photographer.findMany();

export const getPhotographer = (id: number) =>
  prisma.photographer.findUnique({
    where: { id },
  });

export const getAllMediasForPhotographer = (photographerId: number) =>
  prisma.media.findMany({
    where: { photographerId },
  });

export const getMediaById = (mediaId: number) =>
  prisma.media.findUnique({
    where: { id: mediaId },
  });

export const updateNumberOfLikes = (
  mediaId: number,
  newNumberOfLikes: number
) =>
  prisma.media.update({
    where: { id: mediaId },
    data: { likes: newNumberOfLikes },
  });

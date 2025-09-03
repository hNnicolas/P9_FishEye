// src/app/lib/prisma-db.ts
import { PrismaClient } from "@prisma/client";

// Déclare à TypeScript que globalThis peut avoir une propriété prisma
declare global {
  var prisma: PrismaClient | undefined;
}

// Crée une seule instance de Prisma (évite les multiples instances en dev)
const prisma: PrismaClient = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export { prisma };

// Types personnalisés
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

// Fonctions utilitaires
export const getAllPhotographers = async () => {
  return prisma.photographer.findMany();
};

export const getPhotographer = async (
  id: number
): Promise<PhotographerWithPhotos | null> => {
  return prisma.photographer.findUnique({
    where: { id },
    include: { photos: true },
  }) as Promise<PhotographerWithPhotos | null>;
};

export const getAllMediasForPhotographer = async (photographerId: number) => {
  return prisma.media.findMany({
    where: { photographerId },
  });
};

export const updateNumberOfLikes = async (
  mediaId: number,
  newNumberOfLikes: number
) => {
  return prisma.media.update({
    where: { id: mediaId },
    data: { likes: newNumberOfLikes },
  });
};

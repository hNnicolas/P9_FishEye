import { PrismaClient } from "../../../generated/prisma/client";

declare global {
  // Évite la recréation du client en mode dev
  var prisma: PrismaClient | undefined;
}

export const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

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

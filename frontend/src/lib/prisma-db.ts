import { PrismaClient } from "../../../generated/prisma/client";

declare global {
  // Évite la recréation du client en mode dev
  var prisma: PrismaClient | undefined;
}

export const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

// ==========================
// Fonctions utilitaires
// ==========================

export const getAllPhotographers = () => prisma.photographer.findMany();

export const getPhotographer = (id: number) =>
  prisma.photographer.findUnique({
    where: { id },
  });

export const getAllMediasForPhotographer = (photographerId: number) =>
  prisma.media.findMany({
    where: { photographerId },
  });

export const updateNumberOfLikes = (
  mediaId: number,
  newNumberOfLikes: number
) =>
  prisma.media.update({
    where: { id: mediaId },
    data: { likes: newNumberOfLikes },
  });

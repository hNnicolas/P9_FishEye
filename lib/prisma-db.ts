import { PrismaClient } from "../generated/prisma/client";

declare global {
  // Permet de réutiliser la même instance de Prisma en dev
  var prisma: PrismaClient | undefined;
}

// Création unique du client Prisma
export const prisma =
  globalThis.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL, // Next.js charge automatiquement .env.local
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

// Types et fonctions utilitaires
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

export const getAllPhotographers = async () => prisma.photographer.findMany();

export const getPhotographer = async (
  id: number
): Promise<PhotographerWithPhotos | null> => {
  const photographer = await prisma.photographer.findUnique({
    where: { id },
    include: { medias: true },
  });

  if (!photographer) return null;

  return {
    ...photographer,
    photos: photographer.medias.map((m) => ({
      id: m.id,
      url: m.image ?? m.video ?? "",
      title: m.title,
      likes: m.likes,
    })),
  };
};

export const getAllMediasForPhotographer = async (photographerId: number) =>
  prisma.media.findMany({
    where: { photographerId },
  });

export const updateNumberOfLikes = async (
  mediaId: number,
  newNumberOfLikes: number
) =>
  prisma.media.update({
    where: { id: mediaId },
    data: { likes: newNumberOfLikes },
  });

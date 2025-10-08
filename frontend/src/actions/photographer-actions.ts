"use server";

import { getPhotographer, getAllMediasForPhotographer } from "@/lib/prisma-db";

/**
 * Récupère un photographe et ses médias associés
 * via Prisma (existant dans prisma-db.ts)
 */
export async function getPhotographerWithMedias(id: number) {
  const photographer = await getPhotographer(id);
  if (!photographer) return null;

  const medias = await getAllMediasForPhotographer(id);
  return { photographer, medias };
}

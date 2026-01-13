"use server";

import { getPhotographer, getAllMediasForPhotographer } from "@/lib/prisma-db";
import { Media } from "@/app/types/media";
import { Photographer } from "@/app/types/photographer";

export type PhotographerWithMedias = {
  photographer: Photographer;
  medias: Media[];
};

/**
 * Récupère un photographe et ses médias associés
 */
export async function getPhotographerWithMedias(
  id: number
): Promise<PhotographerWithMedias | null> {
  const photographer = await getPhotographer(id);
  if (!photographer) return null;

  const medias = await getAllMediasForPhotographer(id);

  return {
    photographer: photographer as Photographer,
    medias: medias as Media[],
  };
}

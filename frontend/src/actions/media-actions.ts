"use server";

import { updateNumberOfLikes, getMediaById } from "@/lib/prisma-db";

/**
 * Incrémente le nombre de likes d’un média
 */
export async function incrementMediaLike(mediaId: number) {
  // Récupère le média
  const media = await getMediaById(mediaId);
  if (!media) throw new Error("Media not found");

  // Incrémente le nombre de likes
  const newLikes = media.likes + 1;

  // Met à jour la base
  const updated = await updateNumberOfLikes(mediaId, newLikes);

  return updated.likes;
}

import { NextRequest, NextResponse } from "next/server";
import { getMediaById, updateNumberOfLikes } from "@/lib/prisma-db";

interface Params {
  id: string;
}

export async function POST(req: NextRequest, context: { params: Params }) {
  const params = await context.params;
  const mediaId = Number(params.id); // Convertit l'id en nombre

  // Vérifie que l'ID est valide
  if (isNaN(mediaId)) {
    return NextResponse.json(
      { success: false, message: "Invalid media ID" },
      { status: 400 }
    );
  }

  try {
    // Récupère le média correspondant à l'ID
    const media = await getMediaById(mediaId);
    if (!media) {
      return NextResponse.json(
        { success: false, message: "Media not found" },
        { status: 404 }
      );
    }

    // Incrémente le nombre de likes
    const updatedMedia = await updateNumberOfLikes(mediaId, media.likes + 1);

    // Retourne le nouveau nombre de likes
    return NextResponse.json({ success: true, likes: updatedMedia.likes });
  } catch (error) {
    console.error(error);
    // Gestion des erreurs serveur
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

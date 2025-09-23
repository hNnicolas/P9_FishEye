import { NextRequest, NextResponse } from "next/server";
import { updateNumberOfLikes } from "@/lib/prisma-db";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const mediaId = Number(id);

  if (isNaN(mediaId)) {
    return NextResponse.json(
      { success: false, message: "Invalid media ID" },
      { status: 400 }
    );
  }

  try {
    // Récupère les données du média via l'API interne en fonction de son ID
    const currentMedia = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/media/${mediaId}`
    ).then((res) => res.json());

    // Vérifie que le média existe et qu'il a un champ "likes"
    if (!currentMedia || !currentMedia.likes) {
      return NextResponse.json(
        { success: false, message: "Media not found" }, // erreur si non trouvé
        { status: 404 }
      );
    }

    // Met à jour le nombre de likes en l'incrémentant de +1
    const updatedMedia = await updateNumberOfLikes(
      mediaId,
      currentMedia.likes + 1
    );

    // Renvoie la nouvelle valeur des likes dans la réponse JSON
    return NextResponse.json({ success: true, likes: updatedMedia.likes });
  } catch (error) {
    // Capture et logge toute erreur serveur
    console.error(error);

    // Retourne une réponse JSON d'erreur 500
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

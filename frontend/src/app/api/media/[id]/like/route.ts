import { NextRequest, NextResponse } from "next/server";
import { getMediaById, updateNumberOfLikes } from "@/lib/prisma-db";

interface Params {
  id: string;
}

export async function POST(req: NextRequest, { params }: { params: Params }) {
  // Accès correct aux params dynamiques
  const mediaId = Number(params.id);
  if (isNaN(mediaId)) {
    return NextResponse.json(
      { success: false, message: "Invalid media ID" },
      { status: 400 }
    );
  }

  try {
    const media = await getMediaById(mediaId);
    if (!media) {
      return NextResponse.json(
        { success: false, message: "Media not found" },
        { status: 404 }
      );
    }

    const updatedMedia = await updateNumberOfLikes(
      mediaId,
      (media.likes ?? 0) + 1
    );

    return NextResponse.json({ success: true, likes: updatedMedia.likes });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

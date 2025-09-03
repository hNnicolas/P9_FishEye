import { prisma } from "@/app/lib/prisma-db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const mediaId = Number(params.id);

  if (isNaN(mediaId)) {
    return NextResponse.json(
      { success: false, message: "Invalid media ID" },
      { status: 400 }
    );
  }

  try {
    // Récupère le média
    const media = await prisma.media.findUnique({ where: { id: mediaId } });
    if (!media) {
      return NextResponse.json(
        { success: false, message: "Media not found" },
        { status: 404 }
      );
    }

    // Incrémente les likes dans la DB
    const updatedMedia = await prisma.media.update({
      where: { id: mediaId },
      data: { likes: media.likes + 1 },
    });

    return NextResponse.json({ success: true, likes: updatedMedia.likes });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

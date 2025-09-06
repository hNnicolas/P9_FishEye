import { prisma } from "@/lib/prisma-db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Record<string, string> }
) {
  const mediaId = Number(params.id);

  if (isNaN(mediaId)) {
    return NextResponse.json(
      { success: false, message: "Invalid media ID" },
      { status: 400 }
    );
  }

  try {
    const updatedMedia = await prisma.media.update({
      where: { id: mediaId },
      data: { likes: { increment: 1 } },
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

import { verifyToken } from "@/app/lib/middleware";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { postId, type } = await request.json();

    const userID = verifyToken(request);

    if (!userID) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (!postId || !type) {
      return NextResponse.json({ message: "Missing required fields: postId and type" }, { status: 400 });
    }

    const userIDParsed = parseInt(userID);
    if (isNaN(userIDParsed)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const reaction = await prisma.reaction.create({
      data: {
        userId: userIDParsed,
        postId,
        type
      }
    });

    return NextResponse.json({ message: "Reaction created", reaction }, { status: 201 });
  }
  catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
  finally {
    await prisma.$disconnect();
  }
}

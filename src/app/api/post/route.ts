import { verifyToken } from "@/app/lib/middleware";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { content, type } = await request.json();

    const userID = verifyToken(request);

    if (!userID) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (!content || !type) {
      return NextResponse.json({ message: "Missing required fields: content and type" }, { status: 400 });
    }

    const userIDParsed = parseInt(userID);
    if (isNaN(userIDParsed)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        userId: userIDParsed,
        content,
        type
      }
    });

    return NextResponse.json({ message: "Post created", post }, { status: 201 });
  } 
	catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  } 
	finally {
    await prisma.$disconnect();
  }
}

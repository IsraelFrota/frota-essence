import { verifyToken } from "@/app/lib/middleware";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { DataCommentProps } from "@/app/types/types";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { postId, message } = await request.json();

    const userID = verifyToken(request);

    if (!userID) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (!postId || !message) {
      return NextResponse.json({ message: "Missing required fields: postId and message" }, { status: 400 });
    }

    const userIDParsed = parseInt(userID);
    if (isNaN(userIDParsed)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        userId: userIDParsed,
        postId,
        message
      }
    });

    return NextResponse.json({ message: "Comment created", comment }, { status: 201 });
  } 
	catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  } 
	finally {
    await prisma.$disconnect();
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const postId  = url.searchParams.get("postId");

    if (!postId) {
      return NextResponse.json({ message: 'Missing postId parameter' }, { status: 400 });
    }

    const parsedPostId = parseInt(postId);

    const comments: DataCommentProps[] = await prisma.comment.findMany({
      where: {
        postId: parsedPostId
      },
      include: {
        user: {
          select: {
            nickname: true
          }
        }
      }
    });

    return NextResponse.json({ comments }, { status: 200 });
  }
  catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
  finally {
    await prisma.$disconnect();
  }
}
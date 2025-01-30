import { verifyToken } from "@/app/lib/middleware";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { DataReactionProps } from "@/app/types/types";

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

    const isExistReactionUser = await prisma.reaction.findFirst({
      where: {
        postId,
        userId: userIDParsed
      }
    });

    let reaction = null;
    if (isExistReactionUser) {
      reaction = await prisma.reaction.update({
        where: {
          id: isExistReactionUser.id
        },
        data: {
          type
        }
      });
      return NextResponse.json({ message: "Reaction updated", reaction, value: 0 }, { status: 200 });
    }
    
    reaction = await prisma.reaction.create({
      data: {
        userId: userIDParsed,
        postId,
        type
      }
    });

    return NextResponse.json({ message: "Reaction created", reaction, value: 1 }, { status: 201 });
  }
  catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
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

    const reactions: DataReactionProps[] = await prisma.reaction.findMany({
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

    return NextResponse.json({ reactions }, { status: 200 });
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
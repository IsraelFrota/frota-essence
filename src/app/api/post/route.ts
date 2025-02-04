import { verifyToken } from "@/app/lib/middleware";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function POST(request: any) {
  try {
    const formData = await request.formData();

    const content = formData.get("content");
    const type = formData.get("type");
    const file = formData.get("file");

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

    let fileUrl: string | null = null;
    if (file) {
      const uploadDir = path.join(process.cwd(), 'public/uploads/post');
			await mkdir(uploadDir, { recursive: true });

      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}_${file.name.replaceAll(" ", "_").toLowerCase()}`;

      fileUrl = `/uploads/post/${filename}`;
      await writeFile(path.join(uploadDir, filename), buffer);
    }

    const post = await prisma.post.create({
      data: {
        userId: userIDParsed,
        content,
        type,
        file: fileUrl,
      }
    });

    return NextResponse.json(
      { message: "Post created", post }, 
      { status: 201 }
    );
  } 
  catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal Server Error' }, 
      { status: 500 }
    );
  } 
  finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  try {
    const feedbacks = await prisma.post.findMany({
      include: {
        user: {
          select: {
            nickname: true
          }
        },
        reactions: {
          include: {
            user: {
              select: {
                nickname: true,
              }
            }
          } 
        },
        comments: {
          include: {
            user: {
              select: {
                nickname: true,
              }
            }
          } 
        }
      },
      orderBy: {
        updatedAt: "desc"
      }
    });

    return NextResponse.json(feedbacks);
  }
  catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
  finally {
    await prisma.$disconnect();
  }
}
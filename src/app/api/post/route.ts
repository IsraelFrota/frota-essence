import { verifyToken } from "@/app/lib/middleware";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function POST(req: any) {
  try {
    const formData = await req.formData();

    const content = formData.get("content");
    const type = formData.get("type");
    const file = formData.get("file");

    const userID = verifyToken(req);

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
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = file.name.replaceAll(" ", "_").toLowerCase();
      // Gerar a URL relativa para o arquivo
      fileUrl = `/uploads/${filename}`;
      await writeFile(path.join(process.cwd(), `public/uploads/${filename}`), buffer);
    }

    // Criação do post no banco de dados, armazenando a URL da imagem
    const post = await prisma.post.create({
      data: {
        userId: userIDParsed,
        content,
        type,
        file: fileUrl, // Armazenar a URL do arquivo, não o arquivo em si
      }
    });

    return NextResponse.json({ message: "Post created", post }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  } finally {
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
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
  finally {
    await prisma.$disconnect();
  }
}
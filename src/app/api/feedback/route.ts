import { verifyToken } from "@/app/lib/middleware";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
	try {
		const { type, message, toUserId } = await request.json();

		const userID = verifyToken(request);

    if (!userID) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (!type || !message || !toUserId) {
      return NextResponse.json({ message: "Missing required fields: type, message and toUserId" }, { status: 400 });
    }

    const userIDParsed = parseInt(userID);
    if (isNaN(userIDParsed)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

		const feedback = await prisma.feedback.create({
			data: {
				type,
				message,
				fromUserId: userIDParsed,
				toUserId
			}
		});

	  return NextResponse.json({ message: "Feedback created", feedback }, { status: 201 });
  } 
	catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  } 
	finally {
    await prisma.$disconnect();
  }
}
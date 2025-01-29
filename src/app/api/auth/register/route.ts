import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {	
	try {
		const { 
			fullName,
			nickname,
			email,
			password,
			position,
			department,
			roleId
		} = await request.json();

		const userExist = await prisma.user.findUnique({
			where: {
				email
			}
		});

		if (userExist) {
			return NextResponse.json(
				{ message: "Email already registered" },
				{ status: 400 }
			);
		}

		const parsedRoleId = parseInt(roleId, 10);

		if (parsedRoleId < 1 && parsedRoleId > 3) {
			return NextResponse.json(
				{ message: "Invalid type user" },
				{ status: 400 }
			);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				fullName,
				nickname,
				email,
				password: hashedPassword,
				position,
				department,
				roleId: parsedRoleId
			}
		});

		return NextResponse.json(
			{ message: `Registering sucessful: ${user}` },
			{ status: 200 }
		);
	}
	catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Error registering user" },
			{ status: 500 }
		);
	}
	finally {
		await prisma.$disconnect();
	}
}
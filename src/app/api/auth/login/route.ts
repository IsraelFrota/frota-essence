import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(request: Request) {
	try {
		const { email, password } = await request.json();

		if (!email || !password) {
			return NextResponse.json(
				{ error: "Email or password are required" },
				{ status: 400 }
			);
		}

		const user = await prisma.user.findUnique({
			where: {
				email: email
			}
		});

		if (!user) {
			return NextResponse.json(
				{ error: "User not found" },
				{ status: 404 }
			);
		}

		const isValidPassword = await bcrypt.compare(password, user.password);

		if (!isValidPassword) {
			return NextResponse.json(
				{ error: "Invalid credentials" },
				{ status: 401 }
			);
		}

		const jwtToken = jwt.sign({
			userID: user.id,
			name: user.fullName,
			email: user.email
		},
			process.env.JWT_SECRET as string,
			{ expiresIn: "3h" }
		);

		return NextResponse.json(
			{ jwtToken },
			{ status: 200 }
		);
	}
	catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: 'Error authenticating user' },
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect();
	}
};
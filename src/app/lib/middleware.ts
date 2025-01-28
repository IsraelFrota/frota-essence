import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function verifyToken(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userID: string };
    
    return decoded.userID;
  }
	catch (error) {
    console.error(error);
    return null;
  }
}

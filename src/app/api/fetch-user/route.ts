import { cookies } from "next/headers";
import { connectDB } from "../db/connectDB";
import jwt, { JwtPayload } from "jsonwebtoken"
import User from "../models/user.model";

export async function GET(request: Request) {
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    if(!token) {
        return Response.json({message: 'Unauthorised'}, {status: 401});
    }
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET as string);
    if(!decoded) {
        return Response.json({message: "Unauthorised - Invalid token"});
    }
    const userId = (decoded as JwtPayload).userId;
    const user = await User.findById(userId).select("-password");
    if(!user) {
        return Response.json({message: "User not found"}, {status: 404});
    }
    return Response.json({user}, {status: 200});
}
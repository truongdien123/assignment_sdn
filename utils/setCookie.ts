import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers';

export const setCookie = async (userId: string) => {
    if(!process.env.JWT_SECRET) {
        throw new Error("Jwt secret is not defined");
    }
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "7d"});
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7*24*60*60,
    });
    return token;
}
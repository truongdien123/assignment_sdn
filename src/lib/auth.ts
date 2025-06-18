import { getCookie } from "cookies-next";
import { verifyToken } from "./jwt";
import { NextRequest } from "next/server";

export const getUserFromRequest = (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;
  const decoded = verifyToken(token);
  return decoded;
};
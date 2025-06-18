import { NextResponse } from "next/server";
import { connectDB } from "../../db/connectDB";
import User from "../../models/user.model";
import bcrypt from "bcryptjs";
import { setCookie } from "../../../../../utils/setCookie";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword
    })
    await setCookie(newUser._id);
    return NextResponse.json({ message: "Registered successfully", user: {...newUser.toObject(), password: undefined} }, {status: 201});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
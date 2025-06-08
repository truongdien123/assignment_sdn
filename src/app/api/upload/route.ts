// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("image") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  if (file.size > 2 * 1024 * 1024) {
    return NextResponse.json({ error: "File size exceeds 2MB" }, { status: 413 });
  }

  // upload file to Cloudinary, S3 hoặc xử lý nội bộ
  return NextResponse.json({ success: "Uploaded successfully" });
}

// app/api/image-upload/route.ts

import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { Readable } from "stream";

// Cloudinary configuration from .env
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Convert buffer to readable stream
function bufferToStream(buffer: Buffer) {
  const readable = new Readable();
  readable._read = () => {}; // noop
  readable.push(buffer);
  readable.push(null);
  return readable;
}

// POST route handler for image upload
export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const upload = () =>
    new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "uploads" }, // You can change folder name
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      bufferToStream(buffer).pipe(stream);
    });

  try {
    const result: any = await upload();
    return NextResponse.json({ publicId: result.public_id }, { status: 200 });
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

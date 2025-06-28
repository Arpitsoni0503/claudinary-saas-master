// app/api/db-check/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Try to connect to the database
    await prisma.$connect();
    
    // Get the Video model schema
    const videoModel = await prisma.$queryRaw`
      SELECT * FROM information_schema.columns 
      WHERE table_name = 'Video'
    `;
    
    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      schema: videoModel
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Database connection failed",
      error: error
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
// import { NextRequest, NextResponse } from "next/server"
// import { PrismaClient } from "@prisma/client"


// const prisma = new PrismaClient()

// export async function GET(request: NextRequest){
//     try {
//         const videos = await prisma.video.findMany({
//             orderBy: {createdAt: "desc"}
//         })
//         return NextResponse.json(videos)
//     } catch (error) {
//         return NextResponse.json({error: "Error fetching videos"}, {status: 500})
//     } finally {
//         await prisma.$disconnect()
//     }
// }

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server"; // ✅ Use server-side auth

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { userId } = auth(); // ✅ Get the current user's ID

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const videos = await prisma.video.findMany({
      where: { userId }, // ✅ Filter videos by userId
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching videos" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

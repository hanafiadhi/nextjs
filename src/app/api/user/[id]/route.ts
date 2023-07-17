import { verifyJwt } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const accessToken = request.headers.get("authorization");
  console.log(accessToken)
  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(
      JSON.stringify({
        error: "unauthorized",
      }),
      {
        status: 401,
      }
    );
  }
  // const userPosts = await prisma.post.findMany({
  //   where: { authorId: +params.id },
  //   include: {
  //     author: {
  //       select: {
  //         email: true,
  //         name: true,
  //       },
  //     },
  //   }, 
  // });

  // return new Response(JSON.stringify(userPosts));
  return NextResponse.json({message:"token sama"})
}

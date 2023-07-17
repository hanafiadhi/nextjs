import SwaggerApi from "@/model/SwaggerApi";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { CredentialJwt } from "@/lib/jwt";
import { connection } from "@/utils/db";

export const GET = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  const { id } = params;
  try {
    await connection();
    const swagger = await SwaggerApi.findById({ _id: id });
    return new NextResponse(JSON.stringify(swagger), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
export const DELETE = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  const { id } = params;
  try {
    await connection();
    const swagger = await SwaggerApi.findByIdAndDelete({ _id: id });
    return new NextResponse(JSON.stringify(swagger), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
export const PATCH = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  const { id } = params;
  const { title, apiUrl } = await request.json();

  try {
    await connection();
    const swagger = await SwaggerApi.findByIdAndUpdate(
      { _id: id },
      { title, apiUrl },
      {
        new: true,
      }
    );
    return new NextResponse(JSON.stringify({ message: "berhasil" }), {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};

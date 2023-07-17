import SwaggerApi from "@/model/SwaggerApi";
import { connection } from "@/utils/db";
import { NextResponse } from "next/server";
import { CredentialJwt, verifyJwt } from "@/lib/jwt";

export const GET = async (request: Request) => {
  try {
    // const credentialResponse = await CredentialJwt(request);
    // if (credentialResponse) {
    //   return credentialResponse;
    // }
    await connection();
    const swagger = await SwaggerApi.find();
    return new NextResponse(JSON.stringify(swagger), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};

export const POST = async (request: Request) => {
  const { title, apiUrl } = await request.json();
  try {
    await connection();
    const newSwagger = new SwaggerApi({
      title,
      apiUrl,
    });
    const data = await newSwagger.save();
    return new NextResponse(JSON.stringify(data), { status: 201 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};

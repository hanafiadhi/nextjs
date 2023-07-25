import { signJwtAccessToken } from "@/lib/jwt";
import User from "@/model/User";
import { connection } from "@/utils/db";

import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";

interface RequestBody {
  username: string;
  password: string;
}
export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const url = "http://localhost:3000/auth/login";
  const LoginData = {
    username: body.username,
    password: body.password,
    application: "documentation",
  };
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(LoginData),
  };
  try {
    const fect = await fetch(url, requestOptions);
    const Response = await fect.json();
    if (!fect.ok) {
      return new Response(JSON.stringify(null));
    }
    console.log(Response);
    const result = {
      _id: Response.id,
      username: Response.username,
      role: "root",
    };
    // console.log(accessToken);
    return new Response(JSON.stringify(result));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }

  // const user = await User.findOne({ username: body.username }).exec();
  // const findUserByRoleAndApplication: any = (userData: any) => {
  //   return (
  //     userData.role.includes("root") &&
  //     userData.applications.includes("dashboard")
  //   );
  // };

  // const userWithRootRoleAndDocumentationApp =
  //   findUserByRoleAndApplication(user);
  // if (userWithRootRoleAndDocumentationApp == false) {
  //   return new Response(JSON.stringify(null));
  // }

  // if (user && (await bcrypt.compareSync(body.password, user.password))) {
  //   const { _id, username, role, password, ...userWithoutPass } =
  //     user.toJSON(); // Convert the Mongoose document to a plain JavaScript object
  //   const Payload = {
  //     _id,
  //     username,
  //     role,
  //   };
  //   //   const accessToken = signJwtAccessToken(Payload);

  //   const result = {
  //     _id,
  //     username,
  //     role,
  //     // accessToken,
  //   };
  //   // console.log(accessToken);
  //   return new Response(JSON.stringify(result));
  //   // return NextResponse.json(result);
  // } else {
  //   return new Response(JSON.stringify(null));
  // }
}

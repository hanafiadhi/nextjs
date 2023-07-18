import jwt, { JwtPayload } from "jsonwebtoken";
import { decode } from "punycode";

interface SignOption {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "1h",
};

export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOption = DEFAULT_SIGN_OPTION
) {
  const secret_key = process.env.SECRET_KEY;
  const token = jwt.sign(payload, "rahasia", options);
  return token;
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, "rahasia");
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function CredentialJwt(request: Request) {
  const accessToken = request.headers.get("Authorization") || "";
  const Token = accessToken.split("Bearer ")[1];
  if (accessToken == null)
    return new Response(
      JSON.stringify({
        error: "unauthorized",
      }),
      {
        status: 401,
      }
    );
  // const decode = verifyJwt(accessToken);
  // if (decode == null) {
  //   return new Response(
  //     JSON.stringify({
  //       error: "unauthorized",
  //     }),
  //     {
  //       status: 401,
  //     }
  //   );
  // }

  // const currentTime = new Date().getTime();
  // const expired = decode?.exp || 0;
  // const iats = decode?.iat || 0;

  // if (expired > iats) {
  //   return new Response(
  //     JSON.stringify({
  //       error: "Token Expired",
  //     }),
  //     {
  //       status: 401,
  //     }
  //   );
  // }

  // Return null when the token is valid
  return null;
}

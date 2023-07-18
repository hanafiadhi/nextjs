// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string;
  }
}
// declare module "next-auth" {
//   /**
//    * Returned by `useSession`, `getSession` and received as
//    * a prop on the `SessionProvider` React Context
//    */
//   interface Session {
//     refreshTokenExpires?: number;
//     accessTokenExpires: string;
//     refreshToken?: string;
//     token?: string;
//     error?: string;
//     user: User;
//   }

//   interface User {
//     username: string;
//     accessToken: string;
//     role: string;
//     email?: string | null;
//     _id?: string;
//     iat: number;
//     exp: number;
//     jti: string;
//   }
// }

// declare module "next-auth/jwt" {
//   /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
//   interface JWT {
//     refreshTokenExpires?: number;
//     username: string;
//     role: string;
//     accessToken: string;
//     refreshToken?: string;
//     token: string;
//     exp?: number;
//     iat?: number;
//     jti?: string;
//   }
// }

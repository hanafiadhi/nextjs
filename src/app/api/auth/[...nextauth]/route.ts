import { User } from "next-auth/core/types";
import { cookies } from "next/headers";
import { JWT } from "next-auth/jwt/types";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "say may name",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const res = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
            application: "documentation",
          }),
        });

        const user = await res.json();

        if (user.statusCode == 404) return null;
        const hasRootRole = user.role.includes("root");

        if (!hasRootRole) return null;

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  // callbacks: {
  //   async jwt({ token, user }: { token: JWT; user?: User }) {
  //     console.log("ini token", token);
  //     console.log("ini user", user);
  //     if (user) {
  //       token.role = user.role;
  //     }
  //     console.log("ini token setelah disisi", token);
  //     return token;
  //   },

  //   async session({ session, token }) {
  //     console.log("ini token dari sessio pertama", session);
  //     console.log("ini token dari session kedua", token);
  //     if (session?.user) {
  //       session.user.role = token.accessToken;
  //     }
  //     return session;
  //   },
  // },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user?.role) {
        return { ...token, ...user };
      }
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // console.log(session); ini nantinya yang akan di gunakan di client component
      // { user: { name: undefined, email: undefined, image: undefined }, expires: '2023-08-12T04:05:55.540Z' }
      // console.log(token); data ini adalah hasil dari functuon dai jwt di atas
      // {
      //   _id: '6368a6792a7b23010fb13d3d',
      //   username: 'admin',
      //   role: [ 'root' ],
      //   accessToken:
      //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzY4YTY3OTJhN2IyMzAxMGZiMTNkM2QiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6WyJyb290Il0sImlhdCI6MTY4OTIyMDI3NiwiZXhwIjoxNjg5MjIzODc2fQ.nr5HVSKFlFbTMuJnXgE2hGO0AMH3rE4pqJtOWxrcgFM',
      //   iat: 1689221154,
      //   exp: 1691813154,
      //   jti: '29b62d81-5e82-4c99-ba49-f8a4bc2bb7d3'
      // }
      if (session.user) {
        session.user.role = token.role;
      }
      // console.log(session);
      // {
      //   user: {
      //     name: 'admin',
      //     email: undefined,
      //     image: undefined,
      //     accessToken:
      //       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzY4YTY3OTJhN2IyMzAxMGZiMTNkM2QiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6WyJyb290Il0sImlhdCI6MTY4OTIyMDI3NiwiZXhwIjoxNjg5MjIzODc2fQ.nr5HVSKFlFbTMuJnXgE2hGO0AMH3rE4pqJtOWxrcgFM',
      //     role: [ 'root' ]
      //   },
      //   expires: '2023-08-12T04:05:55.540Z'
      // }
      return session;
    },
  },
});

export { handler as GET, handler as POST };

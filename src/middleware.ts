export { default } from "next-auth/middleware";
export const config = {
  matcher: [
    "/",
    "/UserPost/:path*",
    "/swagger/:path*",
    "/api/swagger:path*",
    "/document",
  ],
};

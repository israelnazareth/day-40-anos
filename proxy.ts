import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Proteger /admin exceto /admin/login
        const isLoginPage = req.nextUrl.pathname === "/admin/login";
        const isAdminPage = req.nextUrl.pathname.startsWith("/admin");

        if (isLoginPage) return true;
        if (isAdminPage) return !!token;
        return true;
      },
    },
    pages: {
      signIn: "/admin/login",
    },
  },
);

export const config = {
  matcher: ["/admin/:path*"],
};

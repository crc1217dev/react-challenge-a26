import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/login": true,
  "/create-account": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession(request);
  const isPublicUrl = publicOnlyUrls[request.nextUrl.pathname];
  if (!session.id) {
    if (!isPublicUrl) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    if (isPublicUrl) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

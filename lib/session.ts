import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { NextRequest } from "next/server";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";

interface SessionContent {
  id?: number;
}

export default async function getSession(request?: NextRequest) {
  const cookieStore = request ? request.cookies : await cookies();
  return await getIronSession<SessionContent>(cookieStore as any, {
    cookieName: "tweet-session",
    password: process.env.COOKIE_PASSWORD!,
  });
}

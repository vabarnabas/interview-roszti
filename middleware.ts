import { NextRequest, NextResponse } from "next/server"
import { verify } from "./services/verifyToken"

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("roszti-token")

  if (req.nextUrl.pathname.startsWith(`/connect`)) {
    if (token === undefined || token === "undefined") {
      req.cookies.delete("wt-token")
    }
    return NextResponse.next()
  }

  if (req.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next()
  }

  if (!req.nextUrl.pathname.startsWith("/connect")) {
    if (token === undefined || token === "undefined") {
      req.cookies.delete("wt-token")
      return NextResponse.redirect(
        new URL(
          `https://connect.roszti.barnabee.studio/?o=${req.nextUrl.origin}`,
          req.url
        )
      )
    }

    try {
      await verify(token, "at-secret")
      return NextResponse.next()
    } catch (error) {
      return NextResponse.redirect(
        new URL(
          `https://connect.roszti.barnabee.studio/?o=${req.nextUrl.origin}`,
          req.url
        )
      )
    }
  }
}

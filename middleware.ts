import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface IUrls {
    [key: string]: boolean
}

const publicOnlyUrls:IUrls = {
    "/": true,
    "/login": true,
    "/create-account": true,
    "/sms": true
}

export async function middleware(request: NextRequest) {
    const isPublicPath = publicOnlyUrls[request.nextUrl.pathname]
    const isLoggedIn = Boolean((await getSession()).id);

    if(!isPublicPath && !isLoggedIn) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    if(isPublicPath && isLoggedIn) {
        return NextResponse.redirect(new URL("/profile", request.url))
    }
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"]
}
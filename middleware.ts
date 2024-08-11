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
    // const pathname = request.nextUrl.pathname
    // if(pathname === "/profile") {
    //     return NextResponse.redirect(new URL("/", request.url));
    // }
    const session = await getSession();
    const exists = publicOnlyUrls[request.nextUrl.pathname];
    if(!session.id) {
        if(!exists) {
            return NextResponse.redirect(new URL("/", request.url))
        }
    } else {
        return NextResponse.redirect(new URL("/product", request.url))
    }
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"]
}
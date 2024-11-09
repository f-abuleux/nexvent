import { NextRequest, NextResponse } from "next/server";
import { deleteCookie, getCookie } from "./components/libs/action/server";

const protectedUser = [/^\/user(\/.*)?$/];
const protectedAdmin = [/^\/admin-dashboard(\/.*)?$/];

export async function middleware(request: NextRequest) {
    let cookie = await getCookie("token");
    const url = request.nextUrl.pathname;
    let payload;

    if (protectedUser.some((route) => route.test(url)) || protectedAdmin.some((route) => route.test(url))) {
        if (cookie) {
            try {
                payload = JSON.parse(atob(cookie.split('.')[1]));
                if (protectedUser.some((route) => route.test(url)) && payload.role == "ADMIN") {
                    deleteCookie(cookie);
                    return NextResponse.redirect(new URL("/login-user", request.url));
                } else if (protectedAdmin.some((route) => route.test(url)) && payload.role == "USER") {
                    deleteCookie(cookie)
                    return NextResponse.redirect(new URL("/login-admin", request.url));
                }
            } catch (error) {
                console.error("Failed to parse cookie payload", error);
                return NextResponse.redirect(new URL("/", request.url));
            }
        } else {
            const loginUrl = protectedUser.some((route) => route.test(url)) ? "/login-user" : "/login-admin";
            return NextResponse.redirect(new URL(loginUrl, request.url));
        }
    }
    return NextResponse.next();
}
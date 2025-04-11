import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkIdToken } from "./services/middleware/authMiddleware";
import { AUTH_COOKIE } from "./utils/cookieConstants";
import { CheckIdTokenResp } from "./types/authTypes";

const authProtectedRoutes = [
  "/login",
  "/signup",
  "/forgot-password",
  "/password-reset",
  "/password-rest-sent",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const idToken = request.cookies.get(AUTH_COOKIE)?.value;
  let authData: CheckIdTokenResp | undefined = undefined;
  // if there is a token, check if it is valid if not delete it
  if (!!idToken) {
    authData = await checkIdToken(idToken, request.url);
    if (!authData) request.cookies.delete(AUTH_COOKIE);
  }

  // Being user logged in, redirect by user privileges if necessary, otherwise continue with free access
  const onPrivateRoute = pathname.startsWith("/dashboard");
  const onConfirmEmail = pathname.startsWith("/confirm-email");
  const OnVerifyEmail = pathname.startsWith("/verify-email");

  if (authData) {
    const {
      decodedData: { email_verified },
    } = authData;
    const onAuthRoute = authProtectedRoutes.some((authRoute) =>
      pathname.startsWith(authRoute),
    );

    //  * IF TRIES ACCESSING TO AN AUTH OR ROOT PAGE PREVENT ACCESS IF EMAIL IS VERIFIED
    if (pathname === "/" || onAuthRoute) {
      const redirectPath = email_verified ? "/dashboard/home" : "/verify-email";
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
    // * IF TRIES ACCESSING TO A PRIVATE ROUTE, AND EMAIL IS NOT VERIFIED, REDIRECT TO VERIFY EMAIL PAGE
    if (onPrivateRoute && !email_verified) {
      return NextResponse.redirect(new URL("/verify-email", request.url));
    }
    // * IF TRIES ACCESSING TO CONFIRM EMAIL OR VERIFY PAGE, AND BEING EMAIL ALREADY VERIFIED, REDIRECT TO DASHBOARD
    if ((onConfirmEmail || OnVerifyEmail) && email_verified) {
      return NextResponse.redirect(new URL("/dashboard/home", request.url));
    }
    return NextResponse.next();
  } else {
    // * BEING NOT LOGGED IN
    // * IF TRIES ACCESSING PRIVATE ROUTES, VERIFY EMAIL PAGE, REDIRECT TO LOGIN
    if (onPrivateRoute || OnVerifyEmail) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // if (pathname.startsWith("/api")) {
  //   console.log("It is an api call");
  // }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/api/:path*",
    "/dashboard/:path*",
    "/login",
    "/signup",
    "/forgot-password",
    "/password-reset",
    "/password-rest-sent",
    "/confirm-email",
    "/verify-email",
  ],
};

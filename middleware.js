import { NextResponse } from "next/server";
import { auth } from "./app/_lib/auth";

// This function can be marked `async` if using `await` inside
// export function  middleware(request) {
//   return NextResponse.redirect(new URL("/", request.url));
// }

export const middleware = auth;

export const config = {
  matcher: "/account",
};

import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.delete("jwt");
  cookieStore.delete("role");
  return NextResponse.redirect(new URL("/login", request.url));
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.delete("jwt");
  cookieStore.delete("role");
  return NextResponse.redirect(new URL("/login", request.url));
}
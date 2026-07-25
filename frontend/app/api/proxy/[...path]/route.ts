import { NextRequest, NextResponse } from "next/server";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";
const API_BASE = API_URL.replace(/\/+$/, "");

async function proxy(request: NextRequest, path: string[]) {
  const jwt = request.cookies.get("jwt")?.value;

  const backendUrl = `${API_BASE}/${path.join("/")}${request.nextUrl.search}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (jwt) {
    headers["Authorization"] = `Bearer ${jwt}`;
  }

  const body = ["POST", "PUT", "PATCH"].includes(request.method)
    ? await request.text()
    : undefined;

  try {
    const response = await fetch(backendUrl, {
      method: request.method,
      headers,
      body,
    });

    const responseBody = await response.text();

    return new NextResponse(responseBody, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") || "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Proxy error: unable to reach backend" },
      { status: 502 },
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxy(request, path);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxy(request, path);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxy(request, path);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxy(request, path);
}

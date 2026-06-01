import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { authRateLimit } from "../../../lib/rate-limit";

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_USER = process.env.ADMIN_USER || process.env.ADMIN_USERNAME;
const ADMIN_PASS = process.env.ADMIN_PASS || process.env.ADMIN_PASSWORD;

// Login endpoint
export async function POST(request: Request) {
  try {
    const rateLimitResponse = await authRateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    if (!JWT_SECRET || !ADMIN_USER || !ADMIN_PASS) {
      return NextResponse.json(
        { authenticated: false, error: "Server misconfiguration" },
        { status: 500 },
      );
    }

    const { username, password } = await request.json();

    if (username !== ADMIN_USER || password !== ADMIN_PASS) {
      return NextResponse.json(
        { authenticated: false, error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const token = jwt.sign({ username, role: "admin" }, JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set HTTP-only cookie
    const response = NextResponse.json(
      { authenticated: true },
      { status: 200 },
    );

    response.cookies.set({
      name: "admin_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // Relax SameSite policy
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { authenticated: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

// logout endpoint

// Check auth status
export async function GET() {
  try {
    if (!JWT_SECRET) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }
    jwt.verify(token, JWT_SECRET);
    return NextResponse.json({ authenticated: true }, { status: 200 });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}

// Logout endpoint
export async function DELETE() {
  const response = NextResponse.json(
    { authenticated: false, message: "Logged out successfully" },
    { status: 200 },
  );

  // Clear the cookie
  response.cookies.set({
    name: "admin_token",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0), // Expire immediately
  });

  return response;
}

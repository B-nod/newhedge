import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
// Support both env naming conventions (README vs codebase)
const ADMIN_USER =
  process.env.ADMIN_USER || process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASS =
  process.env.ADMIN_PASS || process.env.ADMIN_PASSWORD || "admin123";

// Login endpoint
export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (username !== ADMIN_USER || password !== ADMIN_PASS) {
      return NextResponse.json(
        { authenticated: false, error: "Invalid credentials" },
        { status: 401 },
      );
    }

    // Create JWT token
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
    const cookieStore = await cookies();
    const token = (await cookieStore).get("admin_token")?.value;
    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    // Verify token
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

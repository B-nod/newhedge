import jwt from "jsonwebtoken";

export function verifyAdminAuth(request: Request): boolean {
  const secret = process.env.JWT_SECRET;
  if (!secret) return false;

  try {
    const cookieHeader = request.headers.get("cookie") ?? "";
    const match = cookieHeader.match(/(?:^|;\s*)admin_token=([^;]*)/);
    const token = match?.[1];
    if (!token) return false;
    jwt.verify(token, secret);
    return true;
  } catch {
    return false;
  }
}

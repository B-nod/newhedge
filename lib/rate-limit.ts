import { NextResponse } from "next/server";
import { RateLimiterMemory } from "rate-limiter-flexible";

const testimonialLimiter = new RateLimiterMemory({
  points: 5,
  duration: 60 * 60,
});

const authLimiter = new RateLimiterMemory({
  points: 10,
  duration: 15 * 60,
});

// Use the last (rightmost) IP from x-forwarded-for to resist client spoofing
// in a single reverse-proxy setup (nginx / Vercel).
function getIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",").at(-1)!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function rateLimit(req: Request) {
  try {
    await testimonialLimiter.consume(getIp(req));
    return null;
  } catch {
    return NextResponse.json(
      { error: "Too many requests, please try again later." },
      { status: 429 }
    );
  }
}

export async function authRateLimit(req: Request) {
  try {
    await authLimiter.consume(getIp(req));
    return null;
  } catch {
    return NextResponse.json(
      { error: "Too many login attempts, please try again later." },
      { status: 429 }
    );
  }
}

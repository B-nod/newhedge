import { NextResponse } from "next/server";
import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 5, // 5 requests
  duration: 60 * 60, // Per 1 hour
});

export async function rateLimit(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  
  try {
    await rateLimiter.consume(ip);
    return null; // Allowed
  } catch {
    return NextResponse.json(
      { error: "Too many requests, please try again later." },
      { status: 429 }
    );
  }
}

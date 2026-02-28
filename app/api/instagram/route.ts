import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Ensure we get fresh data on each request

export async function GET() {
  try {
    const userId = process.env.INSTAGRAM_USER_ID;
    const token = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!userId || !token) {
      throw new Error("Instagram credentials not configured");
    }

    const response = await fetch(
      `https://graph.instagram.com/${userId}/media?fields=id,caption,media_url,permalink,thumbnail_url,media_type,timestamp&access_token=${token}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Instagram posts");
    }

    const data = await response.json();
    const posts = data.data
      .filter(
        (post: {
          id: string;
          caption: string;
          media_url: string;
          permalink: string;
          thumbnail_url: string;
          media_type: string;
          timestamp: string;
        }) => post.media_type !== "VIDEO"
      ) // Filter out videos for simplicity
      .slice(0, 6) // Limit to 6 posts
      .map(
        (post: {
          id: string;
          caption: string;
          media_url: string;
          permalink: string;
          thumbnail_url: string;
          media_type: string;
          timestamp: string;
        }) => ({
          id: post.id,
          caption: post.caption || "",
          mediaUrl: post.media_url,
          permalink: post.permalink,
          mediaType: post.media_type,
          timestamp: post.timestamp,
        })
      );

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Instagram API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch Instagram posts",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

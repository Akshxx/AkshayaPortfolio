"use server";

import { cacheLife } from "next/cache";
import { config } from "@/data/config";

// unauthenticated github api = 60 req/hr per ip; 5min cache -> ~12 req/hr
// returns null on failure so the UI can gracefully handle missing data
export async function getGithubStars(): Promise<number | null> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 300 });

  try {
    const res = await fetch(
      `https://api.github.com/repos/${config.githubUsername}/${config.githubRepo}`,
      { headers: { Accept: "application/vnd.github+json" } },
    );
    if (!res.ok) {
      console.warn(`GitHub API responded with ${res.status} — star count unavailable.`);
      return null;
    }

    const data = await res.json();
    if (typeof data.stargazers_count !== "number") {
      console.warn("Unexpected GitHub API response shape — star count unavailable.");
      return null;
    }
    return data.stargazers_count;
  } catch (err) {
    console.warn("Failed to fetch GitHub stars:", err);
    return null;
  }
}

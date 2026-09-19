import { isAuthenticated } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const authenticated = await isAuthenticated();
  return NextResponse.json({ authenticated });
}
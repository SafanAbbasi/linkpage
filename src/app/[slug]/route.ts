import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = createServerSupabaseClient();

  const { data: redirect } = await supabase
    .from("redirects")
    .select("destination_url")
    .eq("slug", slug)
    .single();

  if (!redirect) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Track the click
  supabase
    .from("clicks")
    .insert({
      link_id: `redirect:${slug}`,
      referrer: request.headers.get("referer") || null,
      user_agent: request.headers.get("user-agent") || null,
    })
    .then(() => {});

  // Handle relative URLs (like /resume.pdf)
  const destination = redirect.destination_url.startsWith("/")
    ? new URL(redirect.destination_url, request.url).toString()
    : redirect.destination_url;

  return NextResponse.redirect(destination, 302);
}

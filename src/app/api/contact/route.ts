import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, message, website, _t } = body;

  // Honeypot: if the hidden "website" field is filled, it's a bot
  if (website) {
    // Return success silently so the bot thinks it worked
    return NextResponse.json({ success: true });
  }

  // Timestamp check: reject if submitted less than 2 seconds after page load
  if (_t && Date.now() - _t < 2000) {
    return NextResponse.json({ success: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required" },
      { status: 400 }
    );
  }

  // Basic length validation
  if (name.length > 200 || email.length > 200 || message.length > 5000) {
    return NextResponse.json(
      { error: "Input too long" },
      { status: 400 }
    );
  }

  const supabase = createServerSupabaseClient();
  const { error } = await supabase
    .from("messages")
    .insert({ name, email, message });

  if (error) {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

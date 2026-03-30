import { NextResponse } from "next/server";
import { createAuthSupabaseClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createAuthSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: clicks } = await supabase
    .from("clicks")
    .select("link_id, clicked_at, referrer, user_agent")
    .order("clicked_at", { ascending: false });

  if (!clicks || clicks.length === 0) {
    return new NextResponse("No data to export", { status: 404 });
  }

  const header = "link_id,clicked_at,referrer,user_agent";
  const rows = clicks.map((row) => {
    const escape = (val: string | null) => {
      if (!val) return "";
      // Escape quotes and wrap in quotes if contains comma
      const escaped = val.replace(/"/g, '""');
      return escaped.includes(",") ? `"${escaped}"` : escaped;
    };
    return `${row.link_id},${row.clicked_at},${escape(row.referrer)},${escape(row.user_agent)}`;
  });

  const csv = [header, ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="linkpage-clicks-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}

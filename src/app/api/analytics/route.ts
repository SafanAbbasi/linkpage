import { NextResponse } from "next/server";
import { createAuthSupabaseClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createAuthSupabaseClient();

  // Verify authentication
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Total clicks per link
  const { data: clicksPerLink } = await supabase
    .from("clicks")
    .select("link_id")
    .then(({ data }) => {
      const counts: Record<string, number> = {};
      data?.forEach((row) => {
        counts[row.link_id] = (counts[row.link_id] || 0) + 1;
      });
      return {
        data: Object.entries(counts).map(([link_id, count]) => ({
          link_id,
          count,
        })),
      };
    });

  // Clicks per day for the last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data: recentClicks } = await supabase
    .from("clicks")
    .select("clicked_at")
    .gte("clicked_at", thirtyDaysAgo.toISOString());

  const clicksPerDay: Record<string, number> = {};
  recentClicks?.forEach((row) => {
    const day = new Date(row.clicked_at).toISOString().split("T")[0];
    clicksPerDay[day] = (clicksPerDay[day] || 0) + 1;
  });

  const dailyClicks = Object.entries(clicksPerDay)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // Total click count
  const totalClicks = clicksPerLink?.reduce((sum, item) => sum + item.count, 0) || 0;

  // Clicks this week
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const weeklyClicks = recentClicks?.filter(
    (row) => new Date(row.clicked_at) >= oneWeekAgo
  ).length || 0;

  return NextResponse.json({
    clicksPerLink,
    dailyClicks,
    totalClicks,
    weeklyClicks,
  });
}

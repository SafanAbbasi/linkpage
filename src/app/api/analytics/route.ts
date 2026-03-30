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

  const { data: allClicks } = await supabase
    .from("clicks")
    .select("link_id, clicked_at");

  // Total clicks per link
  const clickCounts: Record<string, number> = {};
  allClicks?.forEach((row) => {
    clickCounts[row.link_id] = (clickCounts[row.link_id] || 0) + 1;
  });
  const clicksPerLink = Object.entries(clickCounts).map(([link_id, count]) => ({
    link_id,
    count,
  }));

  // Clicks per day for the last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const recentClicks =
    allClicks?.filter(
      (row) => new Date(row.clicked_at) >= thirtyDaysAgo
    ) || [];

  const clicksPerDay: Record<string, number> = {};
  recentClicks.forEach((row) => {
    const day = new Date(row.clicked_at).toISOString().split("T")[0];
    clicksPerDay[day] = (clicksPerDay[day] || 0) + 1;
  });

  const dailyClicks = Object.entries(clicksPerDay)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // Total click count
  const totalClicks = allClicks?.length || 0;

  // Clicks this week
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const weeklyClicks = recentClicks.filter(
    (row) => new Date(row.clicked_at) >= oneWeekAgo
  ).length;

  return NextResponse.json({
    clicksPerLink,
    dailyClicks,
    totalClicks,
    weeklyClicks,
  });
}

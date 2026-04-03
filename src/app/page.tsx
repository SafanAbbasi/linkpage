import InteractivePage from "@/components/InteractivePage";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { LinkItem } from "@/data/links";

export const revalidate = 60;

export default async function Home() {
  const supabase = createServerSupabaseClient();
  const { data: dbLinks } = await supabase
    .from("links")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  // Static fallback descriptions (used until DB column is added)
  const descriptionMap: Record<string, string> = {
    GitHub: "Check out my projects!",
    LinkedIn: "Let's Connect Professionally!",
    "Resume / CV": "Full-Stack Engineer | 5+ years",
    Portfolio: "Explore my projects & case studies",
    "NASA Patent": "US Patent No: 12174259B1 — Laser-based battery testing",
  };

  const links: LinkItem[] = (dbLinks || []).map((row) => ({
    id: row.id,
    label: row.label,
    url: row.url,
    bgColor: row.bg_color,
    hoverColor: row.hover_color,
    icon: row.icon,
    description: row.description || descriptionMap[row.label],
  }));

  return <InteractivePage links={links} />;
}

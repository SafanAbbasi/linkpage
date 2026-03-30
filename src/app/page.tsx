import ProfileHeader from "@/components/ProfileHeader";
import AnimatedLinks from "@/components/AnimatedLinks";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
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

  const links: LinkItem[] = (dbLinks || []).map((row) => ({
    id: row.id,
    label: row.label,
    url: row.url,
    bgColor: row.bg_color,
    hoverColor: row.hover_color,
    icon: row.icon,
  }));

  return (
    <main className="min-h-screen bg-gray-50 transition-colors duration-300 dark:bg-gray-950">
      <ThemeToggle />
      <div className="mx-auto max-w-md px-6 py-8">
        <ProfileHeader />
        <AnimatedLinks links={links} />
        <Footer />
      </div>
    </main>
  );
}

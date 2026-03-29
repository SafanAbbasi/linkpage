import ProfileHeader from "@/components/ProfileHeader";
import LinkButton from "@/components/LinkButton";
import Footer from "@/components/Footer";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { LinkItem } from "@/data/links";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const supabase = createServerSupabaseClient();
  const { data: dbLinks } = await supabase
    .from("links")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  // Map database columns (snake_case) to component props (camelCase)
  const links: LinkItem[] = (dbLinks || []).map((row) => ({
    id: row.id,
    label: row.label,
    url: row.url,
    bgColor: row.bg_color,
    hoverColor: row.hover_color,
    icon: row.icon,
  }));

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-md px-6 py-8">
        <ProfileHeader />
        <div className="flex flex-col gap-4">
          {links.map((link) => (
            <LinkButton key={link.id} link={link} />
          ))}
        </div>
        <Footer />
      </div>
    </main>
  );
}

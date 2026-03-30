"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import ClickChart from "@/components/ClickChart";
import LinkStats from "@/components/LinkStats";
import SortableLinkItem from "@/components/SortableLinkItem";
import QRCode from "@/components/QRCode";
import {
  MousePointerClick,
  CalendarDays,
  TrendingUp,
  LogOut,
  Plus,
  ExternalLink,
  LayoutDashboard,
} from "lucide-react";

interface AnalyticsData {
  clicksPerLink: { link_id: string; count: number }[];
  dailyClicks: { date: string; count: number }[];
  totalClicks: number;
  weeklyClicks: number;
}

interface LinkRow {
  id: string;
  label: string;
  url: string;
  bg_color: string;
  hover_color: string;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
}

export default function AdminPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [links, setLinks] = useState<LinkRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const router = useRouter();

  const [newLabel, setNewLabel] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newBgColor, setNewBgColor] = useState("#333333");
  const [newHoverColor, setNewHoverColor] = useState("#555555");
  const [newIcon, setNewIcon] = useState("");

  const supabase = createBrowserSupabaseClient();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const fetchData = useCallback(async () => {
    const [analyticsRes, linksRes] = await Promise.all([
      fetch("/api/analytics"),
      supabase.from("links").select("*").order("sort_order"),
    ]);

    if (analyticsRes.ok) {
      setAnalytics(await analyticsRes.json());
    }
    if (linksRes.data) {
      setLinks(linksRes.data);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    await supabase.from("links").update({ is_active: !isActive }).eq("id", id);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this link?")) return;
    await supabase.from("links").delete().eq("id", id);
    fetchData();
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = links.findIndex((l) => l.id === active.id);
    const newIndex = links.findIndex((l) => l.id === over.id);
    const reordered = arrayMove(links, oldIndex, newIndex);

    // Optimistic update
    setLinks(reordered);

    // Persist new sort orders
    const updates = reordered.map((link, i) =>
      supabase
        .from("links")
        .update({ sort_order: i + 1 })
        .eq("id", link.id)
    );
    await Promise.all(updates);
  };

  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = newLabel.toLowerCase().replace(/\s+/g, "-");
    const maxOrder = links.reduce((max, l) => Math.max(max, l.sort_order), 0);

    await supabase.from("links").insert({
      id,
      label: newLabel,
      url: newUrl,
      bg_color: newBgColor,
      hover_color: newHoverColor,
      icon: newIcon || null,
      sort_order: maxOrder + 1,
      is_active: true,
    });

    setNewLabel("");
    setNewUrl("");
    setNewBgColor("#333333");
    setNewHoverColor("#555555");
    setNewIcon("");
    setShowAddForm(false);
    fetchData();
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-violet-600" />
            <p className="text-sm text-gray-500">Loading dashboard...</p>
          </div>
        </div>
      </main>
    );
  }

  const topLink = analytics?.clicksPerLink?.reduce(
    (top, item) => (item.count > (top?.count || 0) ? item : top),
    null as { link_id: string; count: number } | null
  );

  const topLinkLabel =
    links.find((l) => l.id === topLink?.link_id)?.label ||
    topLink?.link_id ||
    "—";

  const siteUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://www.safanabbasi.com";

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
              <LayoutDashboard className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                LinkPage Admin
              </h1>
              <p className="text-xs text-gray-500">Analytics & Management</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View Site
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-shadow hover:shadow-md">
            <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-violet-50 transition-transform group-hover:scale-110" />
            <div className="relative">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                <MousePointerClick className="h-5 w-5 text-violet-600" />
              </div>
              <p className="text-sm font-medium text-gray-500">Total Clicks</p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
                {analytics?.totalClicks || 0}
              </p>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-shadow hover:shadow-md">
            <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-blue-50 transition-transform group-hover:scale-110" />
            <div className="relative">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                <CalendarDays className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-gray-500">This Week</p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
                {analytics?.weeklyClicks || 0}
              </p>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-shadow hover:shadow-md">
            <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-emerald-50 transition-transform group-hover:scale-110" />
            <div className="relative">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              <p className="text-sm font-medium text-gray-500">Most Popular</p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
                {topLinkLabel}
              </p>
            </div>
          </div>
        </div>

        {/* Charts + QR Code */}
        {analytics && (
          <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <LinkStats clicksPerLink={analytics.clicksPerLink} links={links} />
            <ClickChart dailyClicks={analytics.dailyClicks} />
            <QRCode url={siteUrl} />
          </div>
        )}

        {/* Links Management */}
        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Manage Links
              </h2>
              <p className="text-xs text-gray-400">
                Drag to reorder
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              Add Link
            </button>
          </div>

          {showAddForm && (
            <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-5">
              <form onSubmit={handleAddLink} className="flex flex-col gap-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Label (e.g. Twitter)"
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    required
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
                  />
                  <input
                    type="url"
                    placeholder="URL (e.g. https://twitter.com/...)"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    required
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
                  />
                </div>
                <div className="flex flex-wrap items-end gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">
                      Button Color
                    </label>
                    <input
                      type="color"
                      value={newBgColor}
                      onChange={(e) => setNewBgColor(e.target.value)}
                      className="h-10 w-14 cursor-pointer rounded-lg border border-gray-200 p-1"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">
                      Hover Color
                    </label>
                    <input
                      type="color"
                      value={newHoverColor}
                      onChange={(e) => setNewHoverColor(e.target.value)}
                      className="h-10 w-14 cursor-pointer rounded-lg border border-gray-200 p-1"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Icon name (optional)"
                    value={newIcon}
                    onChange={(e) => setNewIcon(e.target.value)}
                    className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          )}

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={links.map((l) => l.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="divide-y divide-gray-50">
                {links.map((link) => (
                  <SortableLinkItem
                    key={link.id}
                    link={link}
                    onToggleActive={handleToggleActive}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </main>
  );
}

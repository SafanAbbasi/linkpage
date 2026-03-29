"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  dailyClicks: { date: string; count: number }[];
}

export default function ClickChart({ dailyClicks }: Props) {
  if (dailyClicks.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <p className="text-sm text-gray-400">No click data yet</p>
      </div>
    );
  }

  // Fill in missing days so the chart isn't sparse
  const filled: { date: string; count: number }[] = [];
  if (dailyClicks.length > 0) {
    const start = new Date(dailyClicks[0].date);
    const end = new Date(dailyClicks[dailyClicks.length - 1].date);
    const lookup = Object.fromEntries(dailyClicks.map((d) => [d.date, d.count]));

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().split("T")[0];
      filled.push({ date: key, count: lookup[key] || 0 });
    }
  }

  const data = filled.map((item) => ({
    ...item,
    label: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }));

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <h2 className="mb-1 text-base font-semibold text-gray-900">
        Clicks Over Time
      </h2>
      <p className="mb-5 text-xs text-gray-400">Last 30 days</p>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="clickGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
              fontSize: 13,
            }}
            labelFormatter={(_, payload) => payload?.[0]?.payload?.label || ""}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#7c3aed"
            strokeWidth={2.5}
            fill="url(#clickGradient)"
            dot={{ fill: "#7c3aed", r: 4, strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

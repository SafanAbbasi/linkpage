"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface LinkRow {
  id: string;
  label: string;
  bg_color: string;
}

interface Props {
  clicksPerLink: { link_id: string; count: number }[];
  links: LinkRow[];
}

export default function LinkStats({ clicksPerLink, links }: Props) {
  const data = clicksPerLink
    .map((item) => {
      const link = links.find((l) => l.id === item.link_id);
      return {
        name: link?.label || item.link_id,
        clicks: item.count,
        color: link?.bg_color || "#888",
      };
    })
    .sort((a, b) => b.clicks - a.clicks);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <p className="text-sm text-gray-400">No click data yet</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <h2 className="mb-1 text-base font-semibold text-gray-900">
        Clicks per Link
      </h2>
      <p className="mb-5 text-xs text-gray-400">All time</p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 10 }}>
          <XAxis
            type="number"
            allowDecimals={false}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={75}
            tick={{ fontSize: 13, fill: "#374151", fontWeight: 500 }}
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
          />
          <Bar dataKey="clicks" radius={[0, 6, 6, 0]} barSize={24}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

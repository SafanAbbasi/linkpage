"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";

interface LinkRow {
  id: string;
  label: string;
  url: string;
  bg_color: string;
  is_active: boolean;
  sort_order: number;
}

interface Props {
  link: LinkRow;
  onToggleActive: (id: string, isActive: boolean) => void;
  onDelete: (id: string) => void;
}

export default function SortableLinkItem({
  link,
  onToggleActive,
  onDelete,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50/50 ${
        isDragging ? "relative z-10 bg-white shadow-lg ring-1 ring-gray-200 rounded-xl" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab touch-none rounded p-1 text-gray-300 hover:text-gray-500 active:cursor-grabbing"
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl text-white text-xs font-bold"
          style={{ backgroundColor: link.bg_color }}
        >
          {link.label.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-gray-900">{link.label}</p>
          <p className="text-sm text-gray-400">{link.url}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onToggleActive(link.id, link.is_active)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            link.is_active
              ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              : "bg-gray-100 text-gray-400 hover:bg-gray-200"
          }`}
        >
          {link.is_active ? "Active" : "Inactive"}
        </button>
        <button
          onClick={() => onDelete(link.id)}
          className="rounded-lg p-2 text-gray-300 transition-colors hover:bg-red-50 hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, Pencil, Check, X, MousePointerClick } from "lucide-react";

interface LinkRow {
  id: string;
  label: string;
  url: string;
  bg_color: string;
  hover_color: string;
  icon: string | null;
  is_active: boolean;
  sort_order: number;
}

interface Props {
  link: LinkRow;
  clickCount: number;
  onToggleActive: (id: string, isActive: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<LinkRow>) => void;
}

export default function SortableLinkItem({
  link,
  clickCount,
  onToggleActive,
  onDelete,
  onEdit,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [editLabel, setEditLabel] = useState(link.label);
  const [editUrl, setEditUrl] = useState(link.url);
  const [editBgColor, setEditBgColor] = useState(link.bg_color);
  const [editHoverColor, setEditHoverColor] = useState(link.hover_color);
  const [editIcon, setEditIcon] = useState(link.icon || "");

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

  const handleSave = () => {
    onEdit(link.id, {
      label: editLabel,
      url: editUrl,
      bg_color: editBgColor,
      hover_color: editHoverColor,
      icon: editIcon || null,
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditLabel(link.label);
    setEditUrl(link.url);
    setEditBgColor(link.bg_color);
    setEditHoverColor(link.hover_color);
    setEditIcon(link.icon || "");
    setEditing(false);
  };

  if (editing) {
    return (
      <div ref={setNodeRef} style={style} className="px-6 py-4 bg-gray-50/50">
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <input
              type="text"
              value={editLabel}
              onChange={(e) => setEditLabel(e.target.value)}
              placeholder="Label"
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
            />
            <input
              type="text"
              value={editUrl}
              onChange={(e) => setEditUrl(e.target.value)}
              placeholder="URL"
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
            />
          </div>
          <div className="flex flex-wrap items-end gap-2">
            <div>
              <label className="mb-1 block text-xs text-gray-500">Color</label>
              <input
                type="color"
                value={editBgColor}
                onChange={(e) => setEditBgColor(e.target.value)}
                className="h-9 w-12 cursor-pointer rounded border border-gray-200 p-0.5"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-500">Hover</label>
              <input
                type="color"
                value={editHoverColor}
                onChange={(e) => setEditHoverColor(e.target.value)}
                className="h-9 w-12 cursor-pointer rounded border border-gray-200 p-0.5"
              />
            </div>
            <input
              type="text"
              value={editIcon}
              onChange={(e) => setEditIcon(e.target.value)}
              placeholder="Icon (optional)"
              className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
            />
            <button
              onClick={handleSave}
              className="flex items-center gap-1 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              <Check className="h-3.5 w-3.5" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
            >
              <X className="h-3.5 w-3.5" />
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50/50 ${
        isDragging
          ? "relative z-10 rounded-xl bg-white shadow-lg ring-1 ring-gray-200"
          : ""
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
          className="flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold text-white"
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
        <span className="flex items-center gap-1 text-xs text-gray-400" title="Total clicks">
          <MousePointerClick className="h-3 w-3" />
          {clickCount}
        </span>
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
          onClick={() => setEditing(true)}
          className="rounded-lg p-2 text-gray-300 transition-colors hover:bg-blue-50 hover:text-blue-500"
        >
          <Pencil className="h-4 w-4" />
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

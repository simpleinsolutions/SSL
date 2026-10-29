"use client";

import React, { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronUp, ArrowUpDown } from "lucide-react";
import { EmptyState } from "./EmptyState";
import { Button3D } from "@/components/3d/Button3D";

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchPlaceholder?: string;
  searchFilter?: (item: T, query: string) => boolean;
  onRowClick?: (item: T) => void;
  actions?: React.ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  filterComponent?: React.ReactNode;
  pageSize?: number;
}

export function DataTable<T extends { id?: string | number }>({
  columns,
  data,
  searchPlaceholder = "Search records...",
  searchFilter,
  onRowClick,
  actions,
  emptyTitle = "No records found",
  emptyDescription = "Try adjusting your search terms or filters to find what you're looking for.",
  filterComponent,
  pageSize = 15,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    if (searchFilter) {
      return data.filter((item) => searchFilter(item, search.toLowerCase()));
    }
    return data.filter((item) =>
      Object.values(item as Record<string, unknown>).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search, searchFilter]);

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const valA = (a as Record<string, unknown>)[sortKey];
      const valB = (b as Record<string, unknown>)[sortKey];
      if (valA === valB) return 0;
      if (valA === undefined || valA === null) return 1;
      if (valB === undefined || valB === null) return -1;
      if (typeof valA === "number" && typeof valB === "number") {
        return sortDir === "asc" ? valA - valB : valB - valA;
      }
      const strA = String(valA).toLowerCase();
      const strB = String(valB).toLowerCase();
      return sortDir === "asc" ? strA.localeCompare(strB) : strB.localeCompare(strA);
    });
  }, [filteredData, sortKey, sortDir]);

  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDir === "asc") setSortDir("desc");
      else {
        setSortKey(null);
        setSortDir("asc");
      }
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setCurrentPage(1);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#d8e2ed] bg-white shadow-[var(--shadow-3d-card)]">
      {/* 3D Specular Upper Rim Highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/90 via-transparent to-transparent opacity-60"
      />

      {/* Table Toolbar */}
      <div className="relative z-10 p-4 border-b border-[#e1e8f0] bg-gradient-to-b from-[#fbfdff] to-[#f6f9fd] flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-3.5 py-2 text-xs rounded-xl border border-[#c5d2e1] bg-white text-foreground placeholder:text-muted-foreground/70 shadow-[var(--shadow-3d-recessed)] focus:outline-none focus:ring-3 focus:ring-[#0b6fdb]/20 focus:border-[#0b6fdb] transition-all"
            />
          </div>
          {filterComponent}
        </div>

        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {/* Table Body */}
      {paginatedData.length === 0 ? (
        <div className="p-8">
          <EmptyState title={emptyTitle} description={emptyDescription} />
        </div>
      ) : (
        <div className="relative z-10 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#e1e8f0] bg-[#f8fafd] text-[#14263d]">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    scope="col"
                    onClick={() => col.sortable && handleSort(col.key)}
                    className={`py-3.5 px-4 font-bold uppercase tracking-wider text-[11px] select-none ${
                      col.sortable ? "cursor-pointer hover:bg-[#eef4fb] transition-colors" : ""
                    } ${
                      col.align === "right"
                        ? "text-right"
                        : col.align === "center"
                        ? "text-center"
                        : "text-left"
                    } ${col.className || ""}`}
                  >
                    <div
                      className={`inline-flex items-center gap-1.5 ${
                        col.align === "right" ? "justify-end" : ""
                      }`}
                    >
                      <span>{col.header}</span>
                      {col.sortable && (
                        <span className="text-muted-foreground">
                          {sortKey === col.key ? (
                            sortDir === "asc" ? (
                              <ChevronUp className="w-3.5 h-3.5 text-[#0b6fdb]" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 text-[#0b6fdb]" />
                            )
                          ) : (
                            <ArrowUpDown className="w-3 h-3 opacity-40 hover:opacity-100" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef3f8]">
              {paginatedData.map((item, idx) => (
                <tr
                  key={item.id ?? idx}
                  onClick={() => onRowClick && onRowClick(item)}
                  tabIndex={onRowClick ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (onRowClick && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      onRowClick(item);
                    }
                  }}
                  className={`transition-colors ${
                    onRowClick
                      ? "cursor-pointer hover:bg-[#f0f6fd] focus:outline-none focus:bg-[#f0f6fd]"
                      : "hover:bg-[#fafcff]"
                  }`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`py-3.5 px-4 text-foreground align-middle ${
                        col.align === "right"
                          ? "text-right"
                          : col.align === "center"
                          ? "text-center"
                          : "text-left"
                      } ${col.className || ""}`}
                    >
                      {col.render
                        ? col.render(item)
                        : String((item as Record<string, unknown>)[col.key] ?? "-")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Footer */}
      <div className="relative z-10 p-3.5 border-t border-[#e1e8f0] bg-gradient-to-b from-[#fbfdff] to-[#f8fafd] flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between text-xs text-muted-foreground">
        <div>
          Showing{" "}
          <span className="font-bold text-foreground">
            {sortedData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}
          </span>{" "}
          to{" "}
          <span className="font-bold text-foreground">
            {Math.min(currentPage * pageSize, sortedData.length)}
          </span>{" "}
          of <span className="font-bold text-foreground">{sortedData.length}</span>{" "}
          entries
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <Button3D
              variant="secondary"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button3D>
            <span className="px-2 text-xs font-semibold text-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button3D
              variant="secondary"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button3D>
          </div>
        )}
      </div>
    </div>
  );
}

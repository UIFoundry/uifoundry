"use client";

import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnPinningState,
  type VisibilityState,
  type GroupingState,
  type ExpandedState,
} from "@tanstack/react-table";
import { cn } from "~/styles/utils";
import type { Comparison_1_Block } from "~/payload-types";
import AlignContent from "./AlignContent";

export default function Comparison_1(props: Comparison_1_Block) {
  type TData = Record<string, unknown>;
  const dataRows = useMemo<TData[]>(() => {
    if (Array.isArray(props.data)) {
      return props.data.filter(
        (r): r is TData => !!r && typeof r === "object" && !Array.isArray(r),
      );
    }
    return [];
  }, [props.data]);

  // Table feature states (controlled for predictability/persistence hooks)
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const initialPinning = useMemo<ColumnPinningState>(() => {
    const left: string[] = [];
    const right: string[] = [];
    for (const c of props.columns) {
      const id = c.accessorKey || c.name;
      const pin = c.pinDefault ?? "none";
      if (pin === "left") left.push(id);
      if (pin === "right") right.push(id);
    }
    return { left, right };
  }, [props.columns]);
  const [columnPinning, setColumnPinning] =
    useState<ColumnPinningState>(initialPinning);
  const [grouping, setGrouping] = useState<GroupingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const columnDefs: ColumnDef<TData>[] = props.columns.map((c) => {
    return {
      accessorKey: c.accessorKey || c.name,
      header: ({ column }) => {
        const canSort = column.getCanSort();
        const isSorted = column.getIsSorted();
        const canPin = column.getCanPin?.() ?? false;
        const pinned = column.getIsPinned?.();
        const canGroup = column.getCanGroup?.() ?? false;
        const isGrouped = column.getIsGrouped?.() ?? false;
        return (
          <div className="flex w-full items-center gap-2">
            <button
              type="button"
              onClick={canSort ? column.getToggleSortingHandler() : undefined}
              className={cn(
                "hover:text-foreground inline-flex items-center gap-1 text-left",
                canSort ? "cursor-pointer" : "cursor-default",
              )}
            >
              <AlignContent column={c} className="w-full">
                {c.name}
              </AlignContent>
              {canSort ? (
                <span className="text-foreground/50 text-xs">
                  {isSorted === "asc" ? "▲" : isSorted === "desc" ? "▼" : ""}
                </span>
              ) : null}
            </button>
            <div className="ml-auto flex items-center gap-1">
              {canGroup ? (
                <button
                  type="button"
                  onClick={() => column.toggleGrouping?.()}
                  className="text-muted-foreground hover:text-foreground rounded px-1 text-[10px]"
                  title={isGrouped ? "Ungroup" : "Group by column"}
                >
                  {isGrouped ? "Ungroup" : "Group"}
                </button>
              ) : null}
              {canPin ? (
                <>
                  <button
                    type="button"
                    onClick={() => column.pin?.("left")}
                    className="text-muted-foreground hover:text-foreground rounded px-1 text-[10px]"
                    title="Pin left"
                  >
                    ◀
                  </button>
                  <button
                    type="button"
                    onClick={() => column.pin?.(false)}
                    className="text-muted-foreground hover:text-foreground rounded px-1 text-[10px]"
                    title="Unpin"
                  >
                    •
                  </button>
                  <button
                    type="button"
                    onClick={() => column.pin?.("right")}
                    className="text-muted-foreground hover:text-foreground rounded px-1 text-[10px]"
                    title="Pin right"
                  >
                    ▶
                  </button>
                  {pinned ? (
                    <span className="text-primary/70 text-[10px]">
                      {pinned}
                    </span>
                  ) : null}
                </>
              ) : null}
            </div>
          </div>
        );
      },
      enableHiding: Boolean(c.enableHiding),
      enablePinning: Boolean(c.enablePinning),
      enableSorting: Boolean(c.enableSorting),
      enableResizing: Boolean(c.enableResizing),
      enableGrouping: Boolean(c.enableGrouping),
      size: typeof c.size === "number" ? c.size : undefined,
      minSize: typeof c.minSize === "number" ? c.minSize : undefined,
      maxSize: typeof c.maxSize === "number" ? c.maxSize : undefined,
      sortDescFirst: Boolean(c.sortDescFirst ?? false),
      invertSorting: Boolean(c.invertSorting ?? false),
      sortUndefined: c.sortUndefined ?? undefined,
      cell: (ctx) => {
        const value = ctx.getValue();
        // Render grouped cells with expand toggles
        if (ctx.row.getIsGrouped?.()) {
          return (
            <div className="flex items-center gap-2">
              <button
                onClick={ctx.row.getToggleExpandedHandler?.()}
                className="text-muted-foreground hover:text-foreground rounded px-1 text-[10px]"
                title={ctx.row.getIsExpanded?.() ? "Collapse" : "Expand"}
              >
                {ctx.row.getIsExpanded?.() ? "−" : "+"}
              </button>
              <span className="font-medium">{String(value)}</span>
              <span className="text-muted-foreground text-xs">
                ({ctx.row.subRows?.length ?? 0})
              </span>
            </div>
          );
        }
        if (typeof value === "boolean") {
          return (
            <AlignContent column={c}>
              <span
                className={cn(
                  value
                    ? "bg-primary inline-block size-2 rounded-full"
                    : "bg-muted inline-block size-2 rounded-full",
                )}
              />
            </AlignContent>
          );
        }
        if (value === null || value === undefined || value === "") return null;
        return typeof value === "string" || typeof value === "number" ? (
          <AlignContent column={c}>
            <span>{value}</span>
          </AlignContent>
        ) : null;
      },
    };
  });

  const table = useReactTable<TData>({
    data: dataRows,
    columns: columnDefs,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: { sorting, columnVisibility, columnPinning, grouping, expanded },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnPinningChange: setColumnPinning,
    onGroupingChange: setGrouping,
    onExpandedChange: setExpanded,
    columnResizeMode: "onChange",
  });

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold md:text-5xl">
            {props.heading}
          </h2>
          {props.subheading ? (
            <p className="text-muted-foreground mt-3 text-lg">
              {props.subheading}
            </p>
          ) : null}
        </div>

        {/* Controls: visibility toggles (only shown if any column can hide) */}
        {props.columns.some((c) => c.enableHiding) ? (
          <div className="text-muted-foreground/80 mt-4 flex flex-wrap gap-3 text-xs">
            {table.getAllLeafColumns().map((col) => (
              <label key={col.id} className="inline-flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={col.getIsVisible()}
                  disabled={!col.getCanHide?.()}
                  onChange={col.getToggleVisibilityHandler?.()}
                />
                <span>{String(col.columnDef.header ?? col.id)}</span>
              </label>
            ))}
          </div>
        ) : null}

        <div className="mt-4 overflow-x-auto">
          <table className="w-full table-auto border-collapse text-left text-sm">
            <thead className="text-muted-foreground">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => {
                    const pinned = header.column.getIsPinned?.();
                    return (
                      <th
                        key={header.id}
                        className="relative p-3 font-medium"
                        style={{
                          position: pinned ? ("sticky" as const) : undefined,
                          left:
                            pinned === "left"
                              ? header.column.getStart?.("left")
                              : undefined,
                          right:
                            pinned === "right"
                              ? header.column.getAfter?.("right")
                              : undefined,
                          zIndex: pinned ? 1 : undefined,
                          width: `${header.getSize()}px`,
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        {/* Resizer */}
                        <div
                          className="absolute top-0 right-0 h-full w-1 cursor-col-resize touch-none opacity-0 select-none hover:opacity-100"
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                        />
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    const pinned = cell.column.getIsPinned?.();
                    return (
                      <td
                        key={cell.id}
                        className="p-3"
                        style={{
                          position: pinned ? ("sticky" as const) : undefined,
                          left:
                            pinned === "left"
                              ? cell.column.getStart?.("left")
                              : undefined,
                          right:
                            pinned === "right"
                              ? cell.column.getAfter?.("right")
                              : undefined,
                          zIndex: pinned ? 0 : undefined,
                          width: `${cell.column.getSize()}px`,
                        }}
                      >
                        {cell.column.columnDef.cell
                          ? flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )
                          : (() => {
                              const v = cell.getValue();
                              return typeof v === "string" ||
                                typeof v === "number" ? (
                                <span>{v}</span>
                              ) : null;
                            })()}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {props.footnote ? (
          <p className="text-muted-foreground mt-4 text-xs">{props.footnote}</p>
        ) : null}
      </div>
    </section>
  );
}

"use client";

import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";

export default function Comparison_2({
  heading,
  subheading,
  columns,
  data,
}: {
  heading: string;
  subheading?: string | null;
  columns: {
    name: string;
    accessorKey: string;
    enableHiding?: boolean;
    enableGrouping?: boolean;
    enableSorting?: boolean;
    enablePinning?: boolean;
    enableResizing?: boolean;
  }[];
  data?: unknown;
}) {
  type ColumnOpts = {
    name: string;
    accessorKey: string;
    enableHiding?: boolean;
    enableGrouping?: boolean;
    enableSorting?: boolean;
    enablePinning?: boolean;
    enableResizing?: boolean;
  };
  type Row = { feature: string } & Record<
    string,
    boolean | string | number | null | undefined
  >;

  const cols = useMemo<ColumnOpts[]>(
    () =>
      Array.isArray(columns) && columns.length >= 2
        ? columns
        : [
            { name: "Starter", accessorKey: "starter" },
            { name: "Business", accessorKey: "business" },
          ],
    [columns],
  );

  const dataRows = useMemo<Row[]>(() => {
    if (Array.isArray(data)) {
      return data.filter((r): r is Row => !!r && typeof r === "object");
    }
    return [];
  }, [data]);

  const columnDefs = useMemo<ColumnDef<Row>[]>(() => {
    const defs: ColumnDef<Row>[] = [
      { accessorKey: "feature", header: "Feature" },
    ];
    cols.forEach((c) => {
      defs.push({
        accessorKey: c.accessorKey || c.name,
        header: c.name,
        enableHiding: Boolean(c.enableHiding),
        enablePinning: Boolean(c.enablePinning),
        enableSorting: Boolean(c.enableSorting),
        enableResizing: Boolean(c.enableResizing),
        enableGrouping: Boolean(c.enableGrouping),
        cell: (ctx) => {
          const v = ctx.getValue();
          if (typeof v === "boolean") {
            return (
              <span
                className={
                  v
                    ? "bg-primary inline-block size-2 rounded-full"
                    : "bg-muted inline-block size-2 rounded-full"
                }
              />
            );
          }
          if (v === null || v === undefined || v === "") return null;
          return typeof v === "string" || typeof v === "number" ? (
            <span>{v}</span>
          ) : null;
        },
      });
    });
    return defs;
  }, [cols]);

  const table = useReactTable<Row>({
    data: dataRows,
    columns: columnDefs,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-left">
          <h2 className="text-4xl font-semibold md:text-5xl">{heading}</h2>
          {subheading ? (
            <p className="text-muted-foreground mt-3 text-lg">{subheading}</p>
          ) : null}
        </div>
        <div className="ring-border/50 mt-8 overflow-x-auto rounded-xl border ring-1">
          <table className="w-full table-auto border-collapse text-left text-sm">
            <thead className="text-muted-foreground">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th key={header.id} className="p-3 font-medium">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-3">
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
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

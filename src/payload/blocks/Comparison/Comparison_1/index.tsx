"use client";

import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  type Row,
} from "@tanstack/react-table";
import { cn } from "~/styles/utils";
import type { Comparison_1_Block } from "~/payload-types";
import AlignContent from "./AlignContent";

export default function Comparison_1(props: Comparison_1_Block) {
  type TableRow = Row<typeof props.data>;
  const dataRows = useMemo<TableRow[]>(() => {
    if (Array.isArray(props.data)) {
      return props.data.filter(
        (r): r is TableRow => !!r && typeof r === "object",
      );
    }
    return [];
  }, [props.data]);

  const columnDefs: ColumnDef<TableRow>[] = props.columns.map((c) => {
    return {
      accessorKey: c.accessorKey || c.name,
      header: () => (
        <AlignContent column={c} className="w-full">
          {c.name}
        </AlignContent>
      ),
      enableHiding: Boolean(c.enableHiding),
      enablePinning: Boolean(c.enablePinning),
      enableSorting: Boolean(c.enableSorting),
      enableResizing: Boolean(c.enableResizing),
      enableGrouping: Boolean(c.enableGrouping),
      cell: (ctx) => {
        const value = ctx.getValue();
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

  const table = useReactTable<TableRow>({
    data: dataRows,
    columns: columnDefs,
    getCoreRowModel: getCoreRowModel(),
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
        <div className="mt-8 overflow-x-auto">
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
        {props.footnote ? (
          <p className="text-muted-foreground mt-4 text-xs">{props.footnote}</p>
        ) : null}
      </div>
    </section>
  );
}

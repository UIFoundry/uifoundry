import React from "react";

interface StatItem {
  label?: string;
  value?: string;
  description?: string;
}
interface ComponentProps {
  header?: string;
  subheader?: string;
  stats?: StatItem[];
}

export default function Stats_1({
  header,
  subheader,
  stats = [],
}: ComponentProps) {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h2 className="text-4xl font-semibold text-balance lg:text-5xl">
            {header}
          </h2>
          <p>{subheader}</p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={`stat-${i}`}
              className="rounded-xl border p-6 text-center"
            >
              <div className="text-2xl font-semibold">{s.value}</div>
              <div className="text-muted-foreground text-sm">{s.label}</div>
              {s.description && (
                <div className="mt-2 text-xs">{s.description}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

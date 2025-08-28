import React from "react";
import Image from "next/image";

interface TeamMember {
  name?: string;
  role?: string;
  bio?: string;
  image?: { url: string; alt: string };
  social?: Array<{ platform?: string; url?: string }>;
}

interface ComponentProps {
  header?: string;
  subheader?: string;
  members?: TeamMember[];
}

export default function Teams_1({
  header,
  subheader,
  members = [],
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

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m, i) => (
            <div key={`member-${i}`} className="rounded-xl border p-6">
              {m.image?.url && (
                <div className="mb-4">
                  <Image
                    src={m.image.url}
                    alt={m.image.alt ?? m.name ?? ""}
                    width={160}
                    height={160}
                    className="h-40 w-40 rounded-full object-cover"
                  />
                </div>
              )}
              <h3 className="text-lg font-medium">{m.name}</h3>
              <p className="text-muted-foreground text-sm">{m.role}</p>
              {m.bio && <p className="mt-3 text-sm">{m.bio}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

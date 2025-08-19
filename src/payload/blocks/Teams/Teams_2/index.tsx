import type { Media } from "~/payload-types";

function isMedia(x: unknown): x is Media {
  return (
    !!x && typeof x === "object" && "url" in (x as Record<string, unknown>)
  );
}

interface Member {
  name: string;
  role: string;
  bio?: string | null;
  avatar?: Media | string | null;
  links?: { href: string; icon: string }[];
}

export default function Teams_2({
  heading,
  members,
}: {
  heading: string;
  members: Member[];
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <h3 className="mb-6 text-center text-2xl font-semibold">{heading}</h3>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {(members ?? []).map((m, i) => (
          <div
            key={i}
            className="bg-background ring-border/50 flex flex-col items-center rounded-xl border p-6 text-center ring-1"
          >
            <div className="bg-background mb-4 size-20 rounded-full border p-0.5 shadow">
              {isMedia(m.avatar) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={m.avatar.url!}
                  alt={m.avatar.alt || m.name}
                  className="aspect-square rounded-full object-cover"
                  width={160}
                  height={160}
                  loading="lazy"
                />
              ) : (
                <div className="bg-muted text-muted-foreground flex size-full items-center justify-center rounded-full text-sm">
                  {m.name?.slice(0, 1) ?? "?"}
                </div>
              )}
            </div>
            <div className="space-y-1">
              <div className="text-foreground text-sm font-medium">
                {m.name}
              </div>
              <div className="text-muted-foreground text-xs">{m.role}</div>
              {m.bio ? (
                <p className="text-muted-foreground mt-2 text-xs leading-5">
                  {m.bio}
                </p>
              ) : null}
            </div>
            {m.links && m.links.length > 0 ? (
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                {m.links.map((l, idx) => (
                  <a
                    key={idx}
                    href={l.href}
                    className="text-muted-foreground hover:text-foreground text-xs underline-offset-4 hover:underline"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {l.icon}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

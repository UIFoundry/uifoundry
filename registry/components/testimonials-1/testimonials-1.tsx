import React from "react";

interface TestimonialItem {
  content?: string;
  author?: string;
  role?: string;
  company?: string;
}
interface ComponentProps {
  header?: string;
  subheader?: string;
  testimonials?: TestimonialItem[];
}

export default function Testimonials_1({
  header,
  subheader,
  testimonials = [],
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
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <blockquote key={`t-${i}`} className="rounded-xl border p-6">
              <p>“{t.content}”</p>
              <footer className="text-muted-foreground mt-3 text-sm">
                — {t.author} {t.role ? `• ${t.role}` : ""}{" "}
                {t.company ? `@ ${t.company}` : ""}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

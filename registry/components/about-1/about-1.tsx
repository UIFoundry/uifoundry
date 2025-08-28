import React from "react";

interface ComponentProps {
  header?: string;
  subheader?: string;
  content?: string;
}

export default function About_1({
  header,
  subheader,
  content,
}: ComponentProps) {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-4xl font-semibold text-balance lg:text-5xl">
          {header}
        </h2>
        <p className="text-muted-foreground mt-3">{subheader}</p>
        {content && <p className="mt-6 text-left leading-relaxed">{content}</p>}
      </div>
    </section>
  );
}

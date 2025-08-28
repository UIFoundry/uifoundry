import React from "react";

interface ComponentProps {
  header?: string;
  subheader?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export default function Contact_1({
  header,
  subheader,
  email,
  phone,
  address,
}: ComponentProps) {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-4xl font-semibold text-balance lg:text-5xl">
          {header}
        </h2>
        <p className="text-muted-foreground mt-3">{subheader}</p>
        <div className="mt-8 space-y-2">
          {email && <p className="text-sm">Email: {email}</p>}
          {phone && <p className="text-sm">Phone: {phone}</p>}
          {address && <p className="text-sm">Address: {address}</p>}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import SocialIcon from "~/ui/icons/social-icon";

interface FooterLink {
  label?: string;
  href?: string;
}
interface SocialLink {
  icon: any;
  href?: string;
}
interface BrandLogo {
  url?: string;
  alt?: string;
}

interface ComponentProps extends React.ComponentPropsWithoutRef<"div"> {
  brandLogo?: BrandLogo;
  links?: FooterLink[];
  socialLinks?: SocialLink[];
  copyright?: string;
}

export default function Footer_1({
  brandLogo,
  links = [],
  socialLinks = [],
  copyright,
  ...divProps
}: ComponentProps) {
  return (
    <footer {...divProps}>
      <div className="mx-auto max-w-5xl px-6 py-8 md:py-16">
        <Link href="/" aria-label="go home" className="mx-auto block size-fit">
          {brandLogo?.url && (
            <Image
              src={brandLogo.url}
              alt={brandLogo.alt ?? "brand"}
              width={200}
              height={150}
            />
          )}
        </Link>

        <div className="flex flex-wrap justify-center gap-6 text-sm">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href ?? "#"}
              className="text-muted-foreground hover:text-primary block duration-150"
            >
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          {socialLinks.map((icon, index) => (
            <SocialIcon
              icon={icon.icon}
              href={icon.href ?? "#"}
              key={`${index}`}
            />
          ))}
        </div>
        <span className="text-muted-foreground block text-center text-sm">
          © {new Date().getFullYear()} {copyright}
        </span>
      </div>
    </footer>
  );
}

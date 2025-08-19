import Link from "next/link";
import Image from "next/image";
import { type ComponentPropsWithRef } from "react";
import SocialIcon from "~/ui/icons/social-icon";
// import type { SocialIconKey } from "~/ui/icons/social-icons";
import type { Footer_2_Block } from "~/payload-types";

export default function Footer_2(
  props: Footer_2_Block & ComponentPropsWithRef<"div">,
) {
  return (
    <footer {...props}>
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <Link href="/" aria-label="go home" className="block size-fit">
              {typeof props.brandLogo === "object" &&
                props.brandLogo &&
                "url" in props.brandLogo &&
                typeof props.brandLogo.url === "string" && (
                  <Image
                    src={props.brandLogo.url}
                    alt={
                      "alt" in props.brandLogo &&
                      typeof props.brandLogo.alt === "string"
                        ? props.brandLogo.alt
                        : ""
                    }
                    width={160}
                    height={48}
                  />
                )}
            </Link>
            {props.description && (
              <p className="text-muted-foreground text-sm leading-6">
                {props.description}
              </p>
            )}
            <div className="flex flex-wrap gap-4">
              {(props.socialLinks ?? []).map((icon, index) => (
                <SocialIcon
                  icon={icon.icon}
                  href={icon.href}
                  key={`${index}`}
                />
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {(props.columns ?? []).map((col, idx) => (
                <div key={idx}>
                  <h4 className="text-foreground mb-3 text-sm font-semibold">
                    {col.title}
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {(col.links ?? []).map((link, li) => (
                      <li key={li}>
                        <Link
                          href={link.href}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div>
                <h4 className="text-foreground mb-3 text-sm font-semibold">
                  {props.newsletterLabel ?? "Subscribe"}
                </h4>
                <form
                  className="flex max-w-sm items-center gap-2"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder={
                      props.newsletterPlaceholder ?? "Enter your email"
                    }
                    className="bg-background focus-visible:ring-ring/50 w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-[3px]"
                  />
                  <button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-3 py-2 text-sm transition-colors">
                    {props.newsletterButtonLabel ?? "Join"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t pt-6">
          <span className="text-muted-foreground block text-center text-sm">
            © {new Date().getFullYear()}{" "}
            {props.copyright ?? "UIFoundry. All rights reserved."}
          </span>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { type ComponentPropsWithRef } from "react";
import type { Footer_1_Block, Media } from "~/payload-types";
import SocialIcon from "~/ui/icons/social-icon";
import Image from "next/image";

export default function Footer_1(
  props: Footer_1_Block & ComponentPropsWithRef<"div">,
) {
  return (
    <footer {...props}>
      <div className="mx-auto max-w-5xl px-6 py-8 md:py-16">
        <Link href="/" aria-label="go home" className="mx-auto block size-fit">
          {props.brandLogo && (
            <Image
              src={(props.brandLogo as Media).url!}
              alt={(props.brandLogo as Media).alt}
              width={200}
              height={150}
            />
          )}
        </Link>

        <div className="flex flex-wrap justify-center gap-6 text-sm">
          {(props.links ?? []).map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-muted-foreground hover:text-primary block duration-150"
            >
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          {props.socialLinks.map((icon, index) => (
            <SocialIcon icon={icon.icon} href={icon.href} key={`${index}`} />
          ))}
        </div>
        <span className="text-muted-foreground block text-center text-sm">
          © {new Date().getFullYear()} {props.copyright}
        </span>
      </div>
    </footer>
  );
}

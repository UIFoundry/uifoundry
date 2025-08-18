"use client";

import { Home, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, type ComponentPropsWithRef } from "react";
import type { Header_3_Block } from "~/payload-types";
import { cn } from "~/styles/utils";

export default function Header_3({
  brandLabel,
  brandHref,
  menuItems,
  ...navProps
}: Header_3_Block & ComponentPropsWithRef<"nav">) {
  const [menuState, setMenuState] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        id="header"
        className={cn(
          "bg-background/60 supports-[backdrop-filter]:bg-background/60 fixed inset-x-0 z-20 w-full border-b backdrop-blur",
          isScrolled && "shadow-sm",
        )}
        {...navProps}
      >
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex h-14 items-center justify-between gap-4">
            <Link
              href={brandHref ?? "/"}
              aria-label={brandLabel ?? "Home"}
              className="flex items-center gap-2"
            >
              <Home />
              <span className="sr-only">{brandLabel ?? "Home"}</span>
            </Link>

            <div className="hidden lg:block">
              <ul className="flex items-center gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setMenuState(!menuState)}
              aria-label={menuState ? "Close Menu" : "Open Menu"}
              className="relative z-20 -m-2.5 -mr-2 block p-2.5 lg:hidden"
            >
              <Menu className="m-auto size-6 duration-200 in-data-[state=active]:scale-0 in-data-[state=active]:rotate-180 in-data-[state=active]:opacity-0" />
              <X className="absolute inset-0 m-auto size-6 scale-0 -rotate-180 opacity-0 duration-200 in-data-[state=active]:scale-100 in-data-[state=active]:rotate-0 in-data-[state=active]:opacity-100" />
            </button>
          </div>

          <div className="bg-background absolute top-14 right-0 left-0 z-10 hidden w-full rounded-b-2xl border-r border-b border-l p-6 shadow-md in-data-[state=active]:block lg:hidden">
            <ul className="grid gap-4 text-base">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground block w-full py-1 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

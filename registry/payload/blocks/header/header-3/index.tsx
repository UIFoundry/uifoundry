/**
 * Header 3 Component
 *
 * Source: https://tailark.com/r/hero-section-5.json (header.tsx)
 * License: Free Tier
 * Adapted from: Tailark Hero Section 5 - Header Component
 *
 * Modifications:
 * - Integrated with PayloadCMS block system
 * - Replaced hardcoded menuItems with dynamic props from Header_3_Block
 * - Replaced Logo component with Home icon from lucide-react
 * - Added preview prop support for admin panel rendering
 * - Preserved scroll-based backdrop blur animation
 */

"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/registry/ui/button";
import React from "react";
import { useScroll, motion } from "motion/react";
import { cn } from "@/registry/default/utils";
import type { Header_3_Block, MediaField as MediaFieldProps } from "~/payload-types";
import type { ComponentPropsWithRef } from "react";
import MediaField from "@/registry/default/lib/fields/media";

export * from "./config";

export default function Header_3({
  preview = false,
  brandLogo,
  logoHref,
  menuItems,
  actionButtons,
  ...navProps
}: { preview?: boolean } & Header_3_Block & ComponentPropsWithRef<"nav">) {
  const [menuState, setMenuState] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { scrollYProgress } = useScroll();

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrolled(latest > 0.05);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className={cn("fixed z-20 w-full pt-2", preview && "relative")}
        {...navProps}
      >
        <div
          className={cn(
            "mx-auto max-w-7xl rounded-3xl px-6 transition-all duration-300 lg:px-12",
            scrolled && "bg-background/50 backdrop-blur-2xl"
          )}
        >
          <motion.div
            key={1}
            className={cn(
              "relative flex flex-wrap items-center justify-between gap-6 py-3 duration-200 lg:gap-0 lg:py-6",
              scrolled && "lg:py-4"
            )}
          >
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              {brandLogo && (
                <Link
                  href={logoHref}
                  aria-label="home"
                  className="relative h-8 w-24 lg:w-32"
                >
                  <MediaField
                    media={brandLogo as MediaFieldProps}
                    fill
                    className="object-contain object-left"
                  />
                </Link>
              )}

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                aria-expanded={menuState}
                aria-controls="mobile-menu"
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>

              <div className="hidden lg:block">
                <ul className="flex gap-8 text-sm">
                  {menuItems?.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="hidden lg:flex lg:gap-3">
              {actionButtons && actionButtons.length > 0 && (
                <>
                  {actionButtons.map((button, index) => (
                    <Button
                      key={index}
                      asChild
                      variant={button.variant}
                      size="sm"
                    >
                      <Link href={button.href}>
                        <span>{button.label}</span>
                      </Link>
                    </Button>
                  ))}
                </>
              )}
            </div>

            <div id="mobile-menu" className="bg-background absolute top-[125%] z-10 mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 in-data-[state=active]:block md:flex-nowrap lg:m-0 lg:w-fit lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems?.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                {actionButtons && actionButtons.length > 0 && (
                  <div className="mt-6 flex flex-col space-y-3">
                    {actionButtons.map((button, index) => (
                      <Button
                        key={index}
                        asChild
                        variant={button.variant}
                        size="sm"
                      >
                        <Link href={button.href}>
                          <span>{button.label}</span>
                        </Link>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </nav>
    </header>
  );
}

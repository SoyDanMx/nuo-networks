"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

interface NavLinkCompatProps
  extends Omit<ComponentPropsWithoutRef<typeof Link>, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
  exact?: boolean;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, href, exact = false, ...props }, ref) => {
    const pathname = usePathname();
    const targetPath = typeof href === "string" ? href.split("#")[0] : "";
    const isHashOnly = typeof href === "string" && href.startsWith("#");
    const isActive =
      !isHashOnly && targetPath.length > 0
        ? exact
          ? pathname === targetPath
          : pathname.startsWith(targetPath)
        : false;

    // Next.js 14 Link does not expose "isPending" like react-router's NavLink.
    void pendingClassName;

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className, isActive && activeClassName)}
        {...props}
      />
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };

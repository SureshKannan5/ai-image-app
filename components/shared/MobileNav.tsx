"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/constants";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <header className="header">
      <Link className="flex items-center md:py-2 gap-2" href="/">
        <Image
          src="/assets/images/logo-text.svg"
          alt="logo"
          width={180}
          height={28}
        />
      </Link>
      <nav className="flex gap-2">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
          <Sheet>
            <SheetTrigger>
              <Image
                src={"/assets/icons/menu.svg"}
                alt="menu"
                height={32}
                width={32}
                className="cursor-pointer"
              />
            </SheetTrigger>
            <SheetContent className="sheet-content sm:w-64x">
              <>
                <Image
                  src={"/assets/images/logo-text.svg"}
                  alt="text"
                  width={152}
                  height={23}
                />

                <ul className="header-nav_elements">
                  {navLinks.slice(0, 6).map((route) => (
                    <li
                      key={route.label}
                      className={clsx(
                        "flex p-18 whitespace-nowrap text-gray-700",
                        {
                          "gradient-text": route.route === pathname,
                        }
                      )}
                    >
                      <Link className="sidebar-link" href={route.route}>
                        <Image
                          src={route.icon}
                          alt="icon"
                          height={24}
                          width={24}
                        />
                        {route.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            </SheetContent>
          </Sheet>
        </SignedIn>
        <SignedOut>
          <Button asChild className="button bg-purple-gradient bg-cover">
            <Link href={"/sign-in"}>Login</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
};

export default MobileNav;

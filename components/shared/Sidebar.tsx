"use client";

import { navLinks } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <Link className="sidebar-logo" href="/">
          <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={180}
            height={28}
          />
        </Link>
        <nav className="sidebar-nav">
          <SignedIn>
            <ul className="sidebar-nav_elements">
              {navLinks.slice(0, 6).map((route) => (
                <li
                  key={route.label}
                  className={clsx("sidebar-nav_element group text-gray-700", {
                    "bg-purple-gradient text-white": route.route === pathname,
                  })}
                >
                  <Link className="sidebar-link" href={route.route}>
                    <Image
                      src={route.icon}
                      className={
                        route.route === pathname ? "brightness-200" : ""
                      }
                      alt="icon"
                      height={24}
                      width={24}
                    />
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="sidebar-nav_elements">
              {navLinks.slice(6).map((route) => (
                <li
                  key={route.label}
                  className={clsx("sidebar-nav_element group text-gray-700", {
                    "bg-purple-gradient text-white": route.route === pathname,
                  })}
                >
                  <Link className="sidebar-link" href={route.route}>
                    <Image
                      src={route.icon}
                      className={
                        route.route === pathname ? "brightness-200" : ""
                      }
                      alt="icon"
                      height={24}
                      width={24}
                    />
                    {route.label}
                  </Link>
                </li>
              ))}
              <li className="flex-center p-4 cursor-pointer gap-2">
                <UserButton afterSignOutUrl="/" showName />
              </li>
            </ul>
          </SignedIn>
          <SignedOut>
            <Button asChild className="button bg-purple-gradient bg-cover">
              <Link href={"/sign-in"}>Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

"use client";
import { PageLayout } from "@/shared/layouts/page";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { routes } from "@/shared/configs/router";

const navRoutes = [
  { href: routes.home, label: "Home" },
  { href: routes.templates, label: "Templates" },
];

export const Header = () => {
  return (
    <header className="h-[96px]">
      <PageLayout className="px-[48px]">
        <div className="h-full w-full flex justify-between items-center">
          <div className="flex items-center gap-[48px]">
            <div className="bg-gray-200 h-[48px]  w-[48px] rounded-2xl " />
            <nav>
              <ul className="flex capitalize gap-8">
                {navRoutes.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex gap-[12px] items-center">
            <Link href={routes.auth.login}>
              <Button variant="secondary">Log in</Button>
            </Link>
            <Link href={routes.auth.signup}>
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </PageLayout>
    </header>
  );
};

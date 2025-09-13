"use client";
import { PageLayout } from "@/shared/layouts/page";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="h-[96px]">
      <PageLayout className="px-[48px]">
        <div className="h-full w-full flex justify-between  items-center">
          <nav>
            <li className="flex uppercase gap-8">
              <Link href="/">Home</Link>
              <a href="#">About</a>
              <a href="#">Contact</a>
            </li>
          </nav>
          <div className="flex gap-[24px] items-center">
            <Link href="login">
              <Button size="link" variant="link">
                Log in
              </Button>
            </Link>
            <Link href="signup">
              <Button>To editor</Button>
            </Link>
          </div>
        </div>
      </PageLayout>
    </header>
  );
};

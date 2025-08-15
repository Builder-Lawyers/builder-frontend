"use client";
import { PageLayout } from "@/shared/layouts/page";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="h-[64px]">
      <PageLayout className="px-[48px] bg-white border-b">
        <div className="h-full  w-full flex justify-between  items-center">
          <nav>
            <li className="flex uppercase gap-8">
              <Link href="/">Home</Link>
              <a href="#">About</a>
              <a href="#">Contact</a>
            </li>
          </nav>
          <Link href="editor">
            <Button>To editor</Button>
          </Link>
        </div>
      </PageLayout>
    </header>
  );
};

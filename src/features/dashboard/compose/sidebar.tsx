"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/shared/ui/sidebar";

import { Home, Inbox } from "lucide-react";
import { UserCard } from "@/entities/user";
import Link from "next/link";
import { routes } from "@/shared/configs/router";

const items = [
  { title: "My Projects", url: routes.dashboard.root, icon: Home },
  { title: "Templates", url: routes.dashboard.templates, icon: Inbox },
  // { title: "Plans", url: "/plans", icon: Calendar },
  // { title: "Settings", url: "/settings", icon: Settings },
];

export const DashboardSidebar = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar className="relative" variant="floating" collapsible="icon">
        {/*<SidebarTrigger className="absolute right-[-12px] top-[50px] z-20" />*/}
        <SidebarContent className="flex flex-col gap-[12px]">
          <SidebarHeader className="p-3">
            <UserCard name={"Dmytro"} />
          </SidebarHeader>
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="flex flex-col gap-2">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url} className="flex items-center gap-2">
                        <item.icon />
                        <span className="text-[14px]">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

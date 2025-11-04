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

import { Home, Inbox, Calendar, Settings } from "lucide-react";
import { UserCard } from "@/entities/user";
import Link from "next/link";

const items = [
  { title: "Projects", url: "/", icon: Home },
  { title: "Templates", url: "/templates", icon: Inbox },
  { title: "Plans", url: "/plans", icon: Calendar },
  { title: "Settings", url: "/settings", icon: Settings },
];

export const DashboardSidebar = () => {
  return (
    <SidebarProvider>
      <Sidebar variant="floating" collapsible="icon">
        <SidebarContent className="flex flex-col gap-[12px]">
          <SidebarHeader className="p-3">
            <UserCard name={"Dmytro"} />
          </SidebarHeader>
          <SidebarGroup className="p-3">
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="flex flex-col gap-2">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url} className="flex items-center gap-2">
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
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

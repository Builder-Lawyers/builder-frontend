"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/shared/components/ui/resizable";
import React from "react";

interface SidebarProps {
  editor?: React.ReactNode;
  tree?: React.ReactNode;
}

export const SidebarHeadless = ({ editor, tree }: SidebarProps) => {
  return (
    <div className="flex grow gap-6 h-full flex-col w-full max-w-[450px] border-r border-black/10 overflow-auto">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel
          defaultSize={60}
          minSize={20}
          maxSize={80}
          className="p-[24px]"
        >
          {tree}
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          defaultSize={40}
          maxSize={80}
          minSize={20}
          className="p-[24px]"
        >
          {editor}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/shared/components/ui/resizable";
import React, { ReactNode } from "react";

export interface SidebarSection {
  id: string;
  label: string | ReactNode;
  element: React.ReactNode;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
}

interface SidebarHeadlessProps {
  sections: SidebarSection[];
  direction?: "vertical" | "horizontal";
  className?: string;
}

export const SidebarHeadless: React.FC<SidebarHeadlessProps> = ({
  sections,
  direction = "vertical",
  className = "",
}) => {
  return (
    <div
      className={`flex grow bg-white rounded-2xl h-full w-full overflow-hidden ${className}`}
    >
      <ResizablePanelGroup direction={direction}>
        {sections.map((section, index) => (
          <React.Fragment key={section.id}>
            <ResizablePanel
              defaultSize={section.defaultSize ?? 50}
              minSize={section.minSize ?? 10}
              maxSize={section.maxSize ?? 90}
            >
              <div className="flex p-4 flex-col gap-6">
                <span className="font-bold capitalize text-[16px]">
                  {section.label}
                </span>
                {section.element}
              </div>
            </ResizablePanel>

            {index < sections.length - 1 && <ResizableHandle />}
          </React.Fragment>
        ))}
      </ResizablePanelGroup>
    </div>
  );
};

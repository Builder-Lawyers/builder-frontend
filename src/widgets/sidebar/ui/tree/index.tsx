"use client";

import { widgetsTemplate } from "@/shared/api/widgets";
import { useEditorStore } from "@/entities/editor";
import { useCallback } from "react";
import { Widget } from "@/entities/widget";
import { IFramePreview } from "@/shared/components/custom/iframe-preview";
import { CreateWidgetButton } from "@/features/addWidget";

export const SidebarTree = () => {
  const widgets = useEditorStore((state) => state.widgets);

  const isSingleElementOnFrame = useCallback(
    (widgetType: string) => {
      return widgets.some(
        (w) => w.type === widgetType && w.settings?.general?.single === true,
      );
    },
    [widgets],
  );

  console.log();
  return (
    <div className="flex flex-col gap-[24px]">
      <p className="text-[12px] font-bold opacity-40 uppercase">Widgets</p>
      {widgetsTemplate.map((widget) => (
        <CreateWidgetButton
          disabled={isSingleElementOnFrame(widget.type)}
          widget={widget}
          key={widget.id}
        >
          <div className="bg-foreground/[7%] flex flex-col gap-4 p-4 rounded">
            <IFramePreview injectCSS="/index.css">
              <Widget {...widget} />
            </IFramePreview>
            <p className="text-[10px] font-bold uppercase">
              {widget.label || widget.type}
            </p>
          </div>
        </CreateWidgetButton>
      ))}
    </div>
  );
};

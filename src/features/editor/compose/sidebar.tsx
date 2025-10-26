import { SidebarHeadless } from "@/shared/ui/custom/sidebar";
import { useState } from "react";
import { Pages } from "@/shared/types/template";
import { cn } from "@/shared/lib/utils";
import { useEditor } from "@/features/editor/model/use-editor";
import { Widget } from "@/features/editor/ui/widget";
import { useWidget } from "@/features/editor/model/use-widget";

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const { widgets } = useEditor();
  const { api, state } = useWidget();
  const [pages, setPages] = useState<Pages["label"][]>([]);

  return (
    <SidebarHeadless
      className={cn(className)}
      sections={[
        {
          id: "pages",
          label: "Pages",
          defaultSize: 30,
          element: (
            <div>
              {pages.map((widget) => (
                <div
                  className="px-3 flex items-center w-full justify-between py-3 rounded-2xl duration-150 hover:bg-secondary/[3%]"
                  key={widget}
                >
                  <div className="flex items-center gap-3">
                    <div>Icon</div>
                    <p className="text-foreground text-[14px]">{widget}</p>
                  </div>
                </div>
              ))}
            </div>
          ),
        },
        {
          id: "widgets",
          label: "Widgets",
          defaultSize: 70,
          element: (
            <div className="">
              {widgets.map((widget) => (
                <Widget
                  isActive={state.selectedWidgetId === widget.id}
                  onClick={() => {
                    api.onSelectedWidgetId(widget.id);
                  }}
                  key={widget.id}
                  widget={widget}
                />
              ))}
            </div>
          ),
        },
      ]}
    />
  );
};

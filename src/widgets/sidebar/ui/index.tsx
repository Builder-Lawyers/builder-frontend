import { SidebarHeadless } from "@/shared/components/custom/sidebar";
import { useEffect, useState } from "react";
import { mockFetchPage } from "@/shared/api/mock";
import { Pages } from "@/shared/types/template";
import MaterialSymbolsComputerOutlineRounded from "~icons/material-symbols/computer-outline-rounded";
import { cn } from "@/shared/lib/utils";
import { useEditor } from "@/entities/editor";
import { Widget } from "@/entities/widget/ui";
import { useWidget } from "@/entities/widget";
import { nanoid } from "nanoid";

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const { widgets } = useEditor();
  const { api, state } = useWidget();
  const [pages, setPages] = useState<Pages["label"][]>([]);

  useEffect(() => {
    mockFetchPage().then((pages) => {
      pages.forEach((page) =>
        setPages((prevState) => [...prevState, page.label]),
      );
    });
  }, []);

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
                    <MaterialSymbolsComputerOutlineRounded
                      opacity="60%"
                      className="text-foreground"
                      color={"text-foreground"}
                      width={24}
                      height={24}
                    />
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
            <div>
              {widgets.map((widget) => (
                <Widget
                  isActive={state.selectedWidgetId === widget.id}
                  onClick={() => {
                    api.onSelectedWidgetId(widget.id);
                  }}
                  key={nanoid()}
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

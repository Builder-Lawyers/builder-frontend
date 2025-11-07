import { SidebarHeadless } from "@/shared/ui/custom/sidebar";
import { cn } from "@/shared/lib/utils";
import { Widget } from "@/features/editor/ui/widget";
import { useWidget } from "@/features/editor/model/use-widget";
import { useEditor } from "@/features/editor/model/use-editor";

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const { pages, widgets } = useEditor();
  const { api, state } = useWidget();

  return (
    <SidebarHeadless
      className={cn(className)}
      sections={[
        {
          id: "pages",
          label: "Pages",
          defaultSize: 30,
          element: (
            <div className="space-y-1">
              {pages.map((page) => (
                <button
                  key={page.label}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition-colors",
                    "hover:bg-secondary/5 active:bg-secondary/10",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="size-4 bg-muted rounded" />
                    <span className="text-[14px] text-foreground">
                      {page.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ),
        },
        {
          id: "widgets",
          label: "Widgets",
          defaultSize: 70,
          element: (
            <div className="flex flex-col gap-1.5">
              {widgets.map((widget) => (
                <Widget
                  isActive={state.selectedWidgetId === widget.id}
                  onClick={() => {
                    console.log(state.selectedWidgetId === widget.id);
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

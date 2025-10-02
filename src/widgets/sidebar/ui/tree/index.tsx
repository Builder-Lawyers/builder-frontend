import { widgetsTemplate } from "@/shared/api/widgets";
import { CreateWidgetButton } from "@/features/addWidget";
import { useEditorStore } from "@/entities/editor";

export const SidebarTree = () => {
  const { widgets } = useEditorStore();

  const isSingleElementOnFrame = (widgetType: string) => {
    return widgets.some(
      (w) => w.type === widgetType && w.settings?.general?.single === true,
    );
  };

  return (
    <div className="flex flex-col gap-2">
      {widgetsTemplate.map((widget) => (
        <CreateWidgetButton
          disabled={isSingleElementOnFrame(widget.type)}
          key={widget.id}
          widget={widget}
        />
      ))}
    </div>
  );
};

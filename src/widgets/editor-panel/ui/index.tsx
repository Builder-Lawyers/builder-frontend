import { useWidget, WidgetTitle } from "@/entities/widget";
import { useMemo } from "react";
import { OptionsVisitor } from "@/widgets/editor-panel/ui/visitor";
import { MetaOptions } from "@/shared/types/template";
import { useEditor } from "@/features/editor";
import { SidebarHeadless } from "@/shared/ui/custom/sidebar";

interface EditorPanelWidgetProps {
  className?: string;
}
export const EditorPanelWidget = ({ className }: EditorPanelWidgetProps) => {
  const { state, api } = useWidget();
  const { widgets, dispatch } = useEditor();

  const widget = useMemo(
    () =>
      state.selectedWidgetId &&
      api.findWidgetById(state.selectedWidgetId, widgets),
    [api, state.selectedWidgetId, widgets],
  );

  if (!widget) return null;

  return (
    <SidebarHeadless
      className={className}
      sections={[
        {
          id: widget.id,
          label: (
            <div className="border-b pb-6 pt-2 border-foreground/20">
              <WidgetTitle label={widget.label} />
            </div>
          ),
          element: (
            <div className="flex flex-col gap-6">
              {widget.options.map((option) => (
                <OptionsVisitor
                  key={option.id}
                  schema={[option]}
                  onChange={(key: keyof MetaOptions["changeable"], value) => {
                    dispatch({
                      type: "Widget.Updated",
                      payload: {
                        id: widget.id,
                        optionId: option.id,
                        changes: { [key]: value },
                      },
                    });
                  }}
                />
              ))}
            </div>
          ),
        },
      ]}
    />
  );
};

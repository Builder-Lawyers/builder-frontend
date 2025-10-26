import { useMemo } from "react";
import { MetaOptions } from "@/shared/types/template";

import { SidebarHeadless } from "@/shared/ui/custom/sidebar";
import { OptionsVisitor } from "@/features/editor/ui/visitor";
import { useEditor } from "@/features/editor/model/use-editor";
import { useWidget } from "@/features/editor/model/use-widget";
import { WidgetTitle } from "@/features/editor/ui/widget";

interface EditorPanelWidgetProps {
  className?: string;
}
export const EditorPanel = ({ className }: EditorPanelWidgetProps) => {
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

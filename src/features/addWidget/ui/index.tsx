import { Button } from "@/shared/components/ui/button";
import { cloneWidget } from "@/features/addWidget";
import { useEditorStore } from "@/entities/editor";
import { WidgetProps } from "@/shared/types";
import { ComponentProps } from "react";
import { useWidgetStore } from "@/entities/widget/model";

type ButtonProps = ComponentProps<typeof Button>;

interface AddWidgetProps extends ButtonProps {
  widget: WidgetProps;
}

export const CreateWidgetButton = ({ widget, ...rest }: AddWidgetProps) => {
  const { api } = useEditorStore();
  const { api: widgetApi } = useWidgetStore();

  return (
    <div>
      <Button
        draggable
        {...rest}
        variant="default"
        onClick={() => {
          const clonedWidget = cloneWidget(widget);

          api.dispatch({
            type: "Widget.Added",
            payload: {
              widget: clonedWidget,
            },
          });

          widgetApi.setActiveWidgetID(clonedWidget);
        }}
        key={widget.id}
      >
        {widget.label}
      </Button>
    </div>
  );
};

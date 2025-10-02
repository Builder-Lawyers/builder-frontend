import { Button } from "@/shared/components/ui/button";
import { cloneWidget } from "@/features/addWidget";
import { useEditorStore } from "@/entities/editor";
import { WidgetProps } from "@/shared/types";
import { ComponentProps } from "react";
import { useWidgetStore } from "@/entities/widget/model";
import { cn } from "@/shared/lib/utils";

type ButtonProps = ComponentProps<typeof Button>;

interface AddWidgetProps extends ButtonProps {
  widget: WidgetProps;
  disabled?: boolean;
}

export const CreateWidgetButton = ({
  widget,
  children,
  disabled,
}: AddWidgetProps) => {
  const { api } = useEditorStore();
  const { api: widgetApi } = useWidgetStore();

  return (
    <div
      className={cn(
        "flex cursor-pointer flex-col gap-2",
        disabled && "opacity-40 cursor-not-allowed",
      )}
      draggable
      onClick={() => {
        if (disabled) return;

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
      {children}
    </div>
  );
};

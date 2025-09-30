import { WidgetProps } from "@/shared/types";

export const cloneWidget = (widget: WidgetProps): WidgetProps => {
  return {
    ...widget,
    id: crypto.randomUUID(),
    children: widget.children?.map(cloneWidget),
  };
};

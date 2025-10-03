import { WidgetProps, WidgetSettings } from "@/shared/types";
import { nanoid } from "nanoid";

export const getWidgetSettings = (
  widget: WidgetProps,
): WidgetSettings | null => {
  return widget?.settings || null;
};

export const cloneWidget = (
  widget: WidgetProps,
  parentId?: string,
): WidgetProps => {
  const id = nanoid();

  return {
    ...structuredClone(widget),
    id,
    parentId,
    children: widget.children?.map((child) => cloneWidget(child, id)),
  };
};

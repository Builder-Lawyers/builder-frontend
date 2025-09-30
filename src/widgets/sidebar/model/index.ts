import { WidgetProps } from "@/shared/types";

export const flattenWidgets = (
  widget: WidgetProps,
): Omit<WidgetProps, "children">[] => {
  const { children, value, ...rest } = widget;

  const flat: Omit<WidgetProps, "children">[] = [];

  if (value !== undefined) {
    flat.push({ ...rest, value });
  }

  if (children) {
    for (const child of children) {
      flat.push(...flattenWidgets(child));
    }
  }

  return flat;
};

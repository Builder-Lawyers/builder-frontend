import { WidgetProps } from "@/shared/types";

type WidgetUpdate = Partial<
  Omit<WidgetProps, "id" | "children" | "type" | "attrs">
>;

export const widgetUpdater = (
  widget: WidgetProps,
  value: WidgetUpdate,
): WidgetProps => {
  return {
    ...widget,
    ...value,
  };
};

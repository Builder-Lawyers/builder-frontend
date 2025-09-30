import { WidgetProps, WidgetSettings } from "@/shared/types";

export const getWidgetSettings = (
  widget: WidgetProps,
): WidgetSettings | null => {
  return widget.settings || null;
};

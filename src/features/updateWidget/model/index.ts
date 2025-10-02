import { WidgetProps } from "@/shared/types";

export const widgetUpdater = (
  widget: WidgetProps,
  value: Partial<WidgetProps>,
): WidgetProps => {
  console.log("widgetUpdater", {
    ...widget,
    ...value,
  });
  return {
    ...widget,
    ...value,
  };
};

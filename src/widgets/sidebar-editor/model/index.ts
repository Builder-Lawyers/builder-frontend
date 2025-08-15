import { get } from "lodash";

export const findWidgetWithProp = (
  json: any,
  key: string,
  value: any,
  widgetPaths: (string | number)[][] = [["global", "props", "widgets"]],
) => {
  for (const path of widgetPaths) {
    const widgets = get(json, path) ?? [];
    for (const widget of widgets) {
      if (widget?.props?.[key] === value) {
        return widget?.props?.[key];
      }
    }
  }

  return undefined;
};

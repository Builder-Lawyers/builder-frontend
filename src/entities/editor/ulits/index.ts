import { WidgetProps } from "@/shared/types";
import { getWidgetSettings } from "@/shared/utils";

export function normalizeWidgets(widgets: WidgetProps[]): WidgetProps[] {
  const topFixed = widgets.filter(
    (w) => getWidgetSettings(w)?.optional?.fixed === "top",
  );
  const bottomFixed = widgets.filter(
    (w) => getWidgetSettings(w)?.optional?.fixed === "bottom",
  );
  const normal = widgets.filter(
    (w) =>
      !["top", "bottom"].includes(
        getWidgetSettings(w)?.optional?.fixed as string,
      ),
  );

  return [...topFixed, ...normal, ...bottomFixed];
}

// entities/editor/model.ts
import { Pages } from "@/shared/types";
import { createEvent, createStore } from "effector";
import { cloneDeep, set } from "lodash";

const $pagesJson = createStore<Pages | null>(null);

const getPagesJson = createEvent<Pages>();

const updateWidgetProp = createEvent<{
  widgetId?: string;
  path: (string | number)[];
  value: any;
}>();

const updateGlobalProp = createEvent<{
  path: (string | number)[];
  value: any;
}>();

$pagesJson.on(getPagesJson, (_, p) => p);

$pagesJson.on(updateWidgetProp, (pages, { widgetId, path, value }) => {
  if (!pages || !widgetId) return pages;
  const next = cloneDeep(pages);

  const updateIn = (widgets?: any[]) => {
    if (!widgets) return;
    for (const w of widgets) {
      if (w?.props?.id === widgetId) {
        set(w.props, path, value);
      }
    }
  };

  updateIn(next.global?.props?.widgets);
  for (const page of next.pages ?? []) updateIn(page.widgets);
  return next;
});

$pagesJson.on(updateGlobalProp, (pages, { path, value }) => {
  if (!pages) return pages;
  const next = cloneDeep(pages);
  set(next, ["global", "props", ...path], value);
  return next;
});

export { $pagesJson, getPagesJson, updateWidgetProp, updateGlobalProp };

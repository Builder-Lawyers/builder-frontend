"use client";
import { useMemo } from "react";
import { useUnit } from "effector-react";

import {
  $pagesJson,
  updateGlobalProp,
  updateWidgetProp,
} from "@/entities/editor/model";
import { $globalProps, $selectedElement } from "@/features/editor/select";
import { RecursiveRender } from "./render";
import { Pages } from "@/shared/types";

export const findWidgetById = (pages: Pages, id: string) => {
  const scan = (widgets?: any[]) =>
    widgets?.find((w) => w?.props?.id === id) ?? null;

  const g = scan(pages.global?.props?.widgets);
  if (g) return g;

  for (const p of pages.pages ?? []) {
    const f = scan(p.widgets);
    if (f) return f;
  }
  return null;
};

export const EditorSidebar = () => {
  const [pages, selected] = useUnit([
    $pagesJson,
    $selectedElement,
    $globalProps,
  ]);
  const doUpdateWidget = useUnit(updateWidgetProp);
  const doUpdateGlobal = useUnit(updateGlobalProp);

  const view = useMemo(() => {
    if (!pages) return { mode: "none" as const, type: "", data: {} };

    const widgetId = selected?.props?.id;
    if (widgetId) {
      const w = findWidgetById(pages, widgetId);
      return {
        mode: "widget" as const,
        id: widgetId,
        type: w?.type ?? "widget",
        data: w?.props ?? w ?? {},
      };
    }

    return {
      mode: "global" as const,
      type: pages.global?.type ?? "global",
      data: pages.global?.props ?? {},
    };
  }, [pages, selected?.props?.id]);

  const handleChange = (path: (string | number)[], value: any) => {
    if (view.mode === "widget" && view.id) {
      doUpdateWidget({ widgetId: view.id, path, value });
    } else if (view.mode === "global") {
      doUpdateGlobal({ path, value });
    }
  };

  const entries = Object.entries(view.data ?? {});

  return (
    <div className="flex grow h-full flex-col w-[400px] border-r border-black/10 gap-2">
      <aside className="p-4 flex flex-col gap-6">
        <h1 className="font-bold text-xl capitalize">{view.type || "—"}</h1>

        <div className="flex flex-col gap-4">
          {entries.map(([key, value]) => {
            return key === "id" ||
              key === "type" ||
              key === "widgets" ? null : (
              <div className="flex gap-[2px] flex-col" key={key}>
                <span className="uppercase font-medium text-sm opacity-40">
                  {key}
                </span>
                <RecursiveRender
                  value={value}
                  path={[key]}
                  onChange={handleChange}
                />
              </div>
            );
          })}
          {!entries.length && <div className="opacity-50 text-sm">No data</div>}
        </div>
      </aside>
    </div>
  );
};

import { create } from "zustand/react";
import { immer } from "zustand/middleware/immer";
import { WidgetProps } from "@/shared/types";
import { getWidgetSettings } from "@/shared/utils";

export interface EditorState {
  widgets: WidgetProps[];
}

interface EditorApi {
  add: (widget: WidgetProps) => void;
  update: (id: string, updater: (widget?: WidgetProps) => WidgetProps) => void;
  remove: (id: string) => void;
  getById: (id: string) => WidgetProps | undefined;
  reorder: (
    parentId: string | null,
    updater: (widgets: WidgetProps[]) => WidgetProps[],
  ) => void;
}

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

export const useEditorStore = create<EditorState & { api: EditorApi }>()(
  immer((set, getState) => ({
    widgets: [],
    api: {
      add: (widget) =>
        set((state) => {
          state.widgets.push(widget);
          state.widgets = normalizeWidgets(state.widgets);
        }),

      update: (id, updater) =>
        set((state) => {
          const updateRecursive = (widgets: typeof state.widgets): boolean => {
            for (let i = 0; i < widgets.length; i++) {
              if (widgets[i].id === id) {
                widgets[i] = updater(widgets[i]);
                return true;
              }
              if (
                widgets[i].children &&
                updateRecursive(widgets[i].children!)
              ) {
                return true;
              }
            }
            return false;
          };

          updateRecursive(state.widgets);
        }),

      remove: (id) =>
        set((state) => {
          state.widgets = state.widgets.filter((w) => w.id !== id);
          state.widgets = normalizeWidgets(state.widgets);
        }),

      getById: (id) => getState().widgets.find((w) => w.id === id),

      reorder: (parentId, updater) =>
        set((state) => {
          if (parentId === null) {
            state.widgets = normalizeWidgets(updater(state.widgets));
          } else {
            const parent = state.widgets.find((w) => w.id === parentId);
            if (parent && parent.children) {
              parent.children = normalizeWidgets(updater(parent.children));
            }
          }
        }),
    },
  })),
);

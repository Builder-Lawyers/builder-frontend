import { create } from "zustand/react";
import { immer } from "zustand/middleware/immer";
import { WidgetProps } from "@/shared/types";
import { normalizeWidgets } from "@/entities/editor/ulits";

export type EditorEvent =
  | { type: "Widget.Added"; payload: { widget: WidgetProps } }
  | {
      type: "Widget.Updated";
      payload: { id: string; changes: Partial<WidgetProps> };
    }
  | { type: "Widget.Removed"; payload: { id: string } }
  | {
      type: "Widget.Reordered";
      payload: {
        parentId: string | null;
        updater: (widgets: WidgetProps[]) => WidgetProps[];
      };
    };

function editorReducer(
  widgets: WidgetProps[],
  event: EditorEvent,
): WidgetProps[] {
  switch (event.type) {
    case "Widget.Added":
      return normalizeWidgets([...widgets, event.payload.widget]);

    case "Widget.Updated": {
      const updateRecursive = (arr: WidgetProps[]): WidgetProps[] =>
        arr.map((w) =>
          w.id === event.payload.id
            ? { ...w, ...event.payload.changes }
            : w.children
              ? { ...w, children: updateRecursive(w.children) }
              : w,
        );
      return updateRecursive(widgets);
    }

    case "Widget.Removed":
      return normalizeWidgets(widgets.filter((w) => w.id !== event.payload.id));

    case "Widget.Reordered":
      if (event.payload.parentId === null) {
        return normalizeWidgets(event.payload.updater(widgets));
      } else {
        return widgets.map((w) =>
          w.id === event.payload.parentId && w.children
            ? {
                ...w,
                children: normalizeWidgets(event.payload.updater(w.children)),
              }
            : w,
        );
      }

    default:
      return widgets;
  }
}

export interface EditorState {
  widgets: WidgetProps[];
  past: EditorEvent[];
  future: EditorEvent[];
  api: {
    dispatch: (event: EditorEvent) => void;
    undo: () => void;
    redo: () => void;
    getById: (id?: string) => WidgetProps | undefined;
  };
}

export const useEditorStore = create<EditorState>()(
  immer((set, get) => ({
    widgets: [],
    past: [],
    future: [],

    api: {
      dispatch: (event) =>
        set((state) => {
          state.past.push(event);
          state.future = [];
          state.widgets = state.past.reduce(editorReducer, []);
        }),

      undo: () =>
        set((state) => {
          if (state.past.length === 0) return;
          const last = state.past.pop()!;
          state.future.unshift(last);
          state.widgets = state.past.reduce(editorReducer, []);
        }),

      redo: () =>
        set((state) => {
          if (state.future.length === 0) return;
          const next = state.future.shift()!;
          state.past.push(next);
          state.widgets = state.past.reduce(editorReducer, []);
        }),

      getById: (id) => get().widgets.find((w) => w.id === id),
    },
  })),
);

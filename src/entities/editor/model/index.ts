import { create } from "zustand/react";
import { immer } from "zustand/middleware/immer";
import { ElementWidget, TypedWidget, WidgetProps } from "@/shared/types";
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
      const { id, changes } = event.payload;

      const updateRecursive = (arr: WidgetProps[]): WidgetProps[] =>
        arr.map((w) => {
          if (w.id === id) {
            if (w.kind === "element") {
              const elementChanges = changes as Partial<ElementWidget>;
              return {
                ...w,
                ...elementChanges,
                props: { ...w.props, ...elementChanges.props },
              };
            }

            if (w.kind === "typed") {
              const typedChanges = changes as Partial<TypedWidget>;
              return {
                ...w,
                ...typedChanges,
                attrs: { ...w.attrs, ...typedChanges.attrs },
              };
            }
          }

          if (w.children) {
            return {
              ...w,
              children: updateRecursive(w.children),
            };
          }

          return w;
        });

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
          state.widgets = editorReducer(state.widgets, event);
          state.past.push(event);
          state.future = [];
        }),

      undo: () =>
        set((state) => {
          if (state.past.length === 0) return;
          state.past.pop();
          state.widgets = state.past.reduce(editorReducer, []);
        }),

      redo: () =>
        set((state) => {
          if (state.future.length === 0) return;
          const next = state.future.shift()!;
          state.widgets = editorReducer(state.widgets, next);
          state.past.push(next);
        }),

      getById: (id) => {
        const search = (arr: WidgetProps[]): WidgetProps | undefined => {
          for (const w of arr) {
            if (w.id === id) return w;
            if (w.children) {
              const found = search(w.children);
              if (found) return found;
            }
          }
        };
        return id ? search(get().widgets) : undefined;
      },
    },
  })),
);

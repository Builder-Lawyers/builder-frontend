import { create } from "zustand";
import { Pages, Widget, MetaOptions } from "@/shared/types/template";

export type EditorEvent =
  | { type: "Pages.Set"; payload: { pages: Pages[] } }
  | { type: "Pages.Reset" }
  | { type: "Page.SetActive"; payload: { label: Pages["label"] } }
  | { type: "Widget.Added"; payload: { widget: Widget } }
  | {
      type: "Widget.Updated";
      payload: {
        id: string;
        optionId: string;
        changes: Partial<MetaOptions["changeable"]>;
      };
    }
  | { type: "Widget.Removed"; payload: { id: string } }
  | { type: "Widget.Reordered"; payload: { widgets: Widget[] } }
  | { type: "Undo" }
  | { type: "Redo" }
  | { type: "Reset" };

export interface EditorModelState {
  pages: Pages[];
  widgets: Widget[];
  activePageLabel: string | null;
  past: EditorEvent[];
  future: EditorEvent[];
}

const initialState: EditorModelState = {
  pages: [],
  widgets: [],
  activePageLabel: null,
  past: [],
  future: [],
};

function updateChangeable<T extends MetaOptions>(
  opt: T,
  changes: Partial<T["changeable"]>,
): T {
  return {
    ...opt,
    changeable: {
      ...opt.changeable,
      ...changes,
    },
  };
}

function editorReducer(
  state: EditorModelState,
  action: EditorEvent,
): EditorModelState {
  switch (action.type) {
    case "Pages.Set":
      return {
        ...state,
        pages: action.payload.pages,
        past: [...state.past, action],
        future: [],
      };

    case "Pages.Reset":
      return {
        ...state,
        pages: [],
        widgets: [],
        activePageLabel: null,
        past: [...state.past, action],
        future: [],
      };

    case "Page.SetActive": {
      const page = state.pages.find((p) => p.label === action.payload.label);
      if (!page) return state;

      return {
        ...state,
        activePageLabel: page.label,
        widgets: page.registry ?? [],
        past: [...state.past, action],
        future: [],
      };
    }

    case "Widget.Added":
      return {
        ...state,
        widgets: [...state.widgets, action.payload.widget],
        past: [...state.past, action],
        future: [],
      };

    case "Widget.Updated":
      return {
        ...state,
        widgets: state.widgets.map((w) => {
          if (w.id !== action.payload.id) return w;
          const updatedOptions = w.options.map((opt) =>
            opt.id === action.payload.optionId
              ? updateChangeable(opt, action.payload.changes)
              : opt,
          );
          return { ...w, options: updatedOptions };
        }),
        past: [...state.past, action],
        future: [],
      };

    case "Widget.Removed":
      return {
        ...state,
        widgets: state.widgets.filter((w) => w.id !== action.payload.id),
        past: [...state.past, action],
        future: [],
      };

    case "Widget.Reordered":
      return {
        ...state,
        widgets: action.payload.widgets,
        past: [...state.past, action],
        future: [],
      };

    case "Undo": {
      const last = state.past[state.past.length - 1];
      if (!last) return state;
      const newPast = state.past.slice(0, -1);
      const newFuture = [last, ...state.future];
      return { ...state, past: newPast, future: newFuture };
    }

    case "Redo": {
      const next = state.future[0];
      if (!next) return state;
      const newFuture = state.future.slice(1);
      const newPast = [...state.past, next];
      return { ...state, past: newPast, future: newFuture };
    }

    case "Reset":
      return initialState;

    default:
      return state;
  }
}

type EditorStore = EditorModelState & {
  dispatch: (action: EditorEvent) => void;
};

export const useEditor = create<EditorStore>((set) => ({
  ...initialState,
  dispatch: (action) => set((state) => editorReducer(state, action)),
}));

import { create } from "zustand";
import { MetaOptions, Widget } from "@/shared/types/template";

export type EditorEvent =
  | { type: "Widget.Added"; payload: { widget: Widget } }
  | {
      type: "Widget.Updated";
      payload: {
        id: string;
        optionId: string;
        changes: Partial<MetaOptions["changeable"]>;
      };
    }
  | { type: "Widget.Removed"; payload: { id: string } };
export interface EditorModelState {
  widgets: Widget[];
  past: EditorEvent[];
  future: EditorEvent[];
}

const initialState: EditorModelState = {
  widgets: [],
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
    case "Widget.Added": {
      return {
        ...state,
        widgets: [...state.widgets, action.payload.widget],
        past: [...state.past, action],
        future: [],
      };
    }

    case "Widget.Updated": {
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
    }

    case "Widget.Removed": {
      return {
        ...state,
        widgets: state.widgets.filter((w) => w.id !== action.payload.id),
        past: [...state.past, action],
        future: [],
      };
    }

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

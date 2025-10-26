import { create } from "zustand/react";
import { immer } from "zustand/middleware/immer";
import { Widget } from "@/shared/types/template";

interface State {
  selectedWidgetId: string;
}

interface Api {
  onSelectedWidgetId: (widgetId: string) => void;
  findWidgetById: (widgetId: string, widgets: Widget[]) => Widget;
}

interface WidgetModel {
  state: State;
  api: Api;
}

export const useWidget = create<WidgetModel>()(
  immer((setState) => ({
    state: {
      selectedWidgetId: "",
    },
    api: {
      onSelectedWidgetId: (widgetId) =>
        setState((state) => {
          state.state.selectedWidgetId = widgetId;
        }),
      findWidgetById: (widgetId: string, widgets) => {
        const found = widgets.find((widget) => widget.id === widgetId);
        if (!found) {
          throw new Error(`Widget with id "${widgetId}" not found`);
        }
        return found;
      },
    },
  })),
);

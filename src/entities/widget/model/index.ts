import { create } from "zustand/react";
import { immer } from "zustand/middleware/immer";
import { WidgetProps } from "@/shared/types";

export interface WidgetState {
  widget: WidgetProps | null;
}

interface WidgetApi {
  setActiveWidget: (widget: WidgetProps) => void;
  updateWidget: (
    widget: WidgetProps,
    updater: (widget: WidgetProps) => WidgetProps,
  ) => void;
}

export const useWidgetStore = create<WidgetState & { api: WidgetApi }>()(
  immer((set) => ({
    widget: null,
    api: {
      setActiveWidget: (widget: WidgetProps) =>
        set((state) => {
          state.widget = widget;
        }),
      updateWidget: (widget: WidgetProps, updater) =>
        set((state) => {
          state.widget = updater(widget);
        }),
    },
  })),
);

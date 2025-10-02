import { create } from "zustand/react";
import { immer } from "zustand/middleware/immer";
import { WidgetProps } from "@/shared/types";

export interface WidgetState {
  activeWidgetID: string | null;
}

interface WidgetApi {
  setActiveWidgetID: (widget: WidgetProps) => string;
}

export const useWidgetStore = create<WidgetState & { api: WidgetApi }>()(
  immer((set) => ({
    activeWidgetID: null,
    api: {
      setActiveWidgetID: (widget: WidgetProps) => {
        set((state) => {
          state.activeWidgetID = widget.id;
        });
        return widget.id;
      },
    },
  })),
);

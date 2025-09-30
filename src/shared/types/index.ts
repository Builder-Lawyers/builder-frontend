import { JSX } from "react";

export interface WidgetSettings {
  optional: { fixed?: "top" | "bottom" };
  general: {
    single?: boolean;
  };
}

export interface WidgetProps<
  Tag extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements,
> {
  id: string;
  type: string;
  value?: string;
  settings?: WidgetSettings;
  attrs?: Record<string, any>;
  tag: Tag;
  props?: Partial<JSX.IntrinsicElements[Tag]>;
  children?: Array<Omit<WidgetProps, "settings">>;
}

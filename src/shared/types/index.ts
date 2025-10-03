import { JSX } from "react";

export interface WidgetSettings {
  optional?: { fixed?: "top" | "bottom" };
  general?: {
    single?: boolean;
  };
}

export interface BaseWidget {
  id: string;
  parentId?: string;
  label?: string;
  settings?: WidgetSettings;
  children?: WidgetProps[];
}

export interface ElementWidget<Tag extends keyof JSX.IntrinsicElements = any>
  extends BaseWidget {
  kind: "element";
  tag: Tag;
  props?: JSX.IntrinsicElements[Tag];
}

export interface TypedWidget extends BaseWidget {
  kind: "typed";
  type: "button" | "link" | "hero" | string;
  value?: string;
  attrs?: Record<string, any>;
}

export type WidgetProps = ElementWidget | TypedWidget;

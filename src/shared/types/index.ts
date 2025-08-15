// types.ts
export type ColorToken = string;

export interface Colors {
  main: ColorToken;
  accent: ColorToken;
}

export interface Button {
  name?: string;
  label: string;
  href: string;
}

export interface WidgetProps {
  type: string;
  props: {
    id: string;
    title?: string;
    description?: string;
    buttons?: Button[]; // у твоєму JSON це завжди масив
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface GlobalInnerProps {
  type: "global";
  logo: string;
  colors: Colors;
  widgets: WidgetProps[];
  pages: Page[];
  [key: string]: unknown;
}

export interface Global {
  type: "global";
  props: GlobalInnerProps;
}

export type Page = {
  title: string;
  slug: string;
  widgets: WidgetProps[];
};

export interface Pages {
  global: Global;
  pages: Page[];
}

export enum Attributes {
  widgetProps = "[data-prop]",
  widgetProps_without = "data-prop",
  widgetId = "[data-widget-id]",
  widgetId_without = "data-widget-id",
}

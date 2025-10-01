import { WidgetProps } from "@/shared/types/index";
import { JSX } from "react";

export interface ButtonWidget extends WidgetProps<"button"> {
  type: "button";
  props?: JSX.IntrinsicElements["button"];
  children?: [
    {
      id: string;
      type: "button-value";
      tag: "p";
      value: string;
    },
  ];
}

export interface ButtonLinkWidget extends WidgetProps<"a"> {
  type: "button-link";
  props: {
    href: string;
    target?: "_blank" | "_self";
  };
  children?: [ButtonWidget];
}

import { WidgetProps } from "@/shared/types";
import React, { ComponentProps, ComponentType, JSX } from "react";

export interface WidgetComponentProps
  extends Omit<ComponentProps<"div">, "id" | "type" | "children">,
    Omit<WidgetProps, "tag"> {
  tag?: string | keyof JSX.IntrinsicElements | ComponentType<any>;
}

export const Widget = ({
  id,
  type,
  tag: Tag = "div",
  value,
  attrs = {},
  children = [],
  onClick,
  props,
  parentId,
  ...rest
}: WidgetComponentProps) => {
  const Comp = Tag as keyof JSX.IntrinsicElements | ComponentType<any>;

  return (
    <Comp
      {...attrs}
      {...props}
      {...rest}
      onClick={onClick}
      data-parent-id={parentId}
      data-widget-id={id}
      className={type}
    >
      {value}
      {children?.map((widget) => (
        <Widget key={widget.id} {...widget} />
      ))}
    </Comp>
  );
};

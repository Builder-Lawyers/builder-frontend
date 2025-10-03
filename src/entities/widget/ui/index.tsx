import { WidgetProps, ElementWidget, TypedWidget } from "@/shared/types";
import { ComponentType, JSX } from "react";

type Renderer<T extends WidgetProps> = (widget: T) => JSX.Element;

const renderElement: Renderer<ElementWidget> = (w) => {
  const { id, tag: Tag = "div", props, children = [], parentId, ...other } = w;
  const Comp = Tag as keyof JSX.IntrinsicElements | ComponentType<any>;
  return (
    <Comp {...props} {...other} data-widget-id={id} data-parent-id={parentId}>
      {children.map((c) => (
        <Widget key={c.id} {...c} />
      ))}
    </Comp>
  );
};

const renderTyped: Renderer<TypedWidget> = (w) => {
  const { id, value, attrs, children = [], parentId, ...other } = w;
  const Comp = "div";
  return (
    <Comp {...attrs} {...other} data-widget-id={id} data-parent-id={parentId}>
      {value}
      {children.map((c) => (
        <Widget key={c.id} {...c} />
      ))}
    </Comp>
  );
};

const renderers: {
  element: Renderer<ElementWidget>;
  typed: Renderer<TypedWidget>;
} = {
  element: renderElement,
  typed: renderTyped,
};

export const Widget = (widget: WidgetProps) => {
  switch (widget.kind) {
    case "element":
      return renderers.element(widget);
    case "typed":
      return renderers.typed(widget);
  }
};

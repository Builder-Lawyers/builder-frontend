import { WidgetProps, ElementWidget, TypedWidget } from "@/shared/types";

export interface EditorField {
  id: string;
  widgetType: string;
  field: string;
  label: string;
  value: any;
  parentID?: string;
}

type WidgetVisitor = {
  typed: (widget: TypedWidget) => EditorField[];
  element: (widget: ElementWidget) => EditorField[];
};

const visitor: WidgetVisitor = {
  typed(widget) {
    if (!widget.value) return [];
    return [
      {
        id: widget.id,
        parentID: widget.parentId,
        widgetType: widget.type,
        field: "value",
        label: widget.label ?? "Value",
        value: widget.value,
      },
    ];
  },

  element(widget) {
    const fields: EditorField[] = [];

    if (widget.tag) {
      fields.push({
        id: widget.id,
        parentID: widget.parentId,
        widgetType: widget.tag,
        field: "tag",
        label: "Tag",
        value: widget.tag,
      });
    }

    if (widget.props) {
      Object.entries(widget.props).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "") {
          fields.push({
            id: widget.id,
            parentID: widget.parentId,
            widgetType: widget.tag,
            field: `props.${k}`,
            label: k,
            value: v,
          });
        }
      });
    }

    return fields;
  },
};

export function flattenForEditor(
  widget: WidgetProps,
  prefix = "",
): EditorField[] {
  const current = visitor[widget.kind](widget as any);
  const children =
    widget.children?.flatMap((c) => flattenForEditor(c, prefix)) ?? [];
  return [...current, ...children];
}

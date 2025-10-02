import { WidgetProps } from "@/shared/types";

export const collectMergedProps = (
  widget: WidgetProps,
): Record<string, any> => {
  const merged: Record<string, any> = {};

  const walk = (node: WidgetProps) => {
    if (node.props) {
      Object.assign(merged, node.props);
    }
    if (node.children) {
      node.children.forEach(walk);
    }
  };

  walk(widget);
  return merged;
};

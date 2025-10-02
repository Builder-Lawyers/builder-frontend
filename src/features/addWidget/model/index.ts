import { WidgetProps } from "@/shared/types";
import { nanoid } from "nanoid";

export const cloneWidget = (
  widget: WidgetProps,
  parentId?: string,
): WidgetProps => {
  const id = nanoid();

  return {
    ...widget,
    id,
    parentId,
    children: widget.children?.map((child) => cloneWidget(child, id)),
  };
};

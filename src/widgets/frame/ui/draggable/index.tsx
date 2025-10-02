import { useSortable } from "@dnd-kit/sortable";
import { Widget } from "@/entities/widget";
import { WidgetComponentProps } from "@/entities/widget";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties } from "react";

interface SortableWidgetProps {
  isActive?: boolean;
}

export const SortableWidget = ({
  ...props
}: WidgetComponentProps & SortableWidgetProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
    });

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <Widget
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      {...props}
    />
  );
};

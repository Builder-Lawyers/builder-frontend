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
  const isWidgetFixed = () => {
    return Boolean(props?.settings?.optional.fixed);
  };
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      disabled: isWidgetFixed(),
      id: props.id,
    });

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: isWidgetFixed() ? "default" : "pointer",
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

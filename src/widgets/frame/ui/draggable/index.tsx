import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Widget } from "@/entities/widget";
import { WidgetComponentProps } from "@/entities/widget";

export const SortableWidget = ({ ...props }: WidgetComponentProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
      animateLayoutChanges: () => false,
    });

  const style = {
    transform: CSS.Transform.toString({
      x: transform?.x ?? 0,
      y: transform?.y ?? 0,
      scaleX: 1,
      scaleY: 1,
    }),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Widget {...props} />
    </div>
  );
};

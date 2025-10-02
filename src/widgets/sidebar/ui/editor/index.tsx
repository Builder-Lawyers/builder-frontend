import { WidgetProps } from "@/shared/types";
import Input from "@/shared/components/ui/input";
import { useEditorStore } from "@/entities/editor";

export const SidebarEditor = ({
  widget,
  name,
}: {
  widget: Omit<WidgetProps, "children">[];
  name: string;
}) => {
  const api = useEditorStore((state) => state.api);

  return (
    <div className="flex gap-[24px] flex-col">
      <p className="text-[14px] font-bold opacity-40 uppercase">edit {name}</p>
      <div className="flex flex-col gap-4">
        {widget.map((widget) => (
          <div className="flex flex-col gap-1.5" key={widget.id}>
            <p className="text-[10px] font-bold opacity-40 uppercase">
              {widget.label || widget.type}
            </p>
            <Input
              onChange={(e) => {
                api.dispatch({
                  type: "Widget.Updated",
                  payload: {
                    id: widget.id,
                    changes: {
                      value: e.target.value,
                    },
                  },
                });
              }}
              defaultValue={widget.value}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

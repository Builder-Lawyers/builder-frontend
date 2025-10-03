import { useEditorStore } from "@/entities/editor";
import { EditorField } from "@/widgets/sidebar/model";
import Input from "@/shared/components/ui/input";

export const SidebarEditor = ({
  widget,
  label,
}: {
  widget: EditorField[];
  label: string;
}) => {
  const api = useEditorStore((state) => state.api);

  console.log(widget);
  return (
    <div className="flex gap-[24px] flex-col">
      <p className="text-[10px] font-bold opacity-40 uppercase">{label}</p>
      <div className="flex flex-col gap-4">
        {widget.map((f) => (
          <div key={`${f.id}-${f.field}`} className="flex flex-col gap-1.5">
            <p className="text-[10px] font-bold opacity-40 uppercase">
              {f.label}
            </p>
            <Input
              defaultValue={f.value}
              onChange={(e) => {
                api.dispatch({
                  type: "Widget.Updated",
                  payload: {
                    id: f.id,
                    changes: { [f.field]: e.target.value },
                  },
                });
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

import { Input } from "@/shared/components/ui/input";
import { CollapsibleCustom } from "@/shared/components/custom/collapsible-custom";

type RecursiveRenderProps = {
  value: any;
  path?: (string | number)[];
  onChange?: (path: (string | number)[], value: any) => void;
};

export const RecursiveRender = ({
  value,
  path = [],
  onChange,
}: RecursiveRenderProps) => {
  const isPrimitive = (val: any) =>
    typeof val === "string" ||
    typeof val === "number" ||
    typeof val === "boolean";

  if (isPrimitive(value)) {
    return (
      <Input
        value={String(value)}
        onChange={(e) => {
          const newValue =
            typeof value === "number" ? Number(e.target.value) : e.target.value;
          onChange?.(path, newValue);
        }}
      />
    );
  }

  if (Array.isArray(value)) {
    return (
      <div className="border-gray-300">
        {value.map((item, index) => {
          return (
            <CollapsibleCustom key={index} title={item?.label || item?.type}>
              <RecursiveRender
                value={item}
                path={[...path, index]}
                onChange={onChange}
              />
            </CollapsibleCustom>
          );
        })}
      </div>
    );
  }

  if (typeof value === "object" && value !== null) {
    return (
      <div className="border-gray-300 gap-4 mt-2 flex flex-col">
        {Object.entries(value).map(([key, val]) => {
          if (key === "type") return null;
          if (key === "id") return null;
          return (
            <div className="flex gap-[2px] flex-col" key={key}>
              <span className="font-medium uppercase text-sm opacity-40 capitalize">
                {key}
              </span>
              <RecursiveRender
                value={val}
                path={[...path, key]}
                onChange={onChange}
              />
            </div>
          );
        })}
      </div>
    );
  }

  return <p>—</p>;
};

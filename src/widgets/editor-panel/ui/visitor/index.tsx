import React, { FC, ReactNode } from "react";
import {
  MetaOptions,
  TextOption,
  ImageOption,
  LinkOption,
  ButtonOption,
  ListOption,
} from "@/shared/types/template";
import SolarTextBold from "~icons/solar/text-bold";
import Input from "@/shared/components/ui/input";
import WpfCursor from "~icons/wpf/cursor";
import MiOptionsVertical from "~icons/mi/options-vertical";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/shared/components/ui/dropzone";

type MetaType = MetaOptions["meta"];

type FieldRenderer<T extends MetaOptions = MetaOptions> = FC<{
  field: T;
  onChange?: (
    key: keyof T["changeable"],
    value: T["changeable"][keyof T["changeable"]],
  ) => void;
}>;

const OptionsLabel = ({
  label,
  icon,
  action,
}: {
  icon: ReactNode;
  label: string;
  action?: ReactNode;
}) => (
  <div className="flex items-center justify-between w-full">
    <label className="flex items-center gap-2">
      {icon}
      <p className="capitalize text-[14px]">{label}</p>
    </label>
    {action && action}
  </div>
);

const defaultComponents: Record<MetaType, FieldRenderer<any>> = {
  text: ({ field, onChange }: { field: TextOption; onChange?: any }) => (
    <div className="flex flex-col gap-1.5">
      <OptionsLabel
        icon={<SolarTextBold width={16} height={16} />}
        label={field.label}
      />
      {field.changeable.value.length > 40 ? (
        <Textarea
          value={field.changeable.value}
          className="min-h-fit resize-none"
          onChange={(e) => onChange?.("value", e.target.value)}
        />
      ) : (
        <Input
          type="text"
          value={field.changeable.value}
          onChange={(e) => onChange?.("value", e.target.value)}
        />
      )}
    </div>
  ),

  image: ({ field, onChange }: { field: ImageOption; onChange?: any }) => (
    <div className="flex flex-col gap-2">
      <OptionsLabel
        icon={<SolarTextBold width={16} height={16} />}
        label={field.label}
      />
      <Input
        type="text"
        value={field.changeable.src}
        placeholder="Image source URL"
        onChange={(e) => onChange?.("src", e.target.value)}
      />
      <Input
        type="text"
        value={field.changeable.value}
        placeholder="Alt text"
        onChange={(e) => onChange?.("value", e.target.value)}
      />
      <Dropzone>
        <DropzoneContent />
        <DropzoneEmptyState />
      </Dropzone>
    </div>
  ),

  link: ({ field, onChange }: { field: LinkOption; onChange?: any }) => (
    <div className="flex flex-col gap-1.5">
      <OptionsLabel
        icon={<WpfCursor width={16} height={16} />}
        label={field.label}
      />
      <Input
        type="text"
        value={field.changeable.href}
        placeholder="URL"
        onChange={(e) => onChange?.("href", e.target.value)}
      />
      <Input
        type="text"
        value={field.changeable.value}
        placeholder="Link text"
        onChange={(e) => onChange?.("value", e.target.value)}
      />
    </div>
  ),

  button: ({ field, onChange }: { field: ButtonOption; onChange?: any }) => (
    <div className="flex flex-col gap-1.5">
      <OptionsLabel
        icon={<WpfCursor width={16} height={16} />}
        label={field.label}
        action={<MiOptionsVertical />}
      />
      <Input
        type="text"
        value={field.changeable.value}
        placeholder="Button label"
        onChange={(e) => onChange?.("value", e.target.value)}
      />
      {"href" in field.changeable && (
        <Input
          type="text"
          value={field.changeable.href}
          placeholder="Link URL"
          onChange={(e) => onChange?.("href", e.target.value)}
        />
      )}
    </div>
  ),

  list: ({ field, onChange }: { field: ListOption; onChange?: any }) => (
    <div className="flex flex-col gap-2 rounded-md">
      {field.changeable.items.map((item, i) => (
        <OptionsVisitor
          key={item.id ?? i}
          schema={[item]}
          onChange={(key, value) => {
            onChange?.("items", [
              ...field.changeable.items.slice(0, i),
              { ...item, changeable: { ...item.changeable, [key]: value } },
              ...field.changeable.items.slice(i + 1),
            ]);
          }}
        />
      ))}
    </div>
  ),
};

function ViewGenerator<T extends MetaOptions>({
  schema,
  components,
  onChange,
}: {
  schema: T[];
  components?: Partial<typeof defaultComponents>;
  onChange?: (
    key: keyof T["changeable"],
    value: T["changeable"][keyof T["changeable"]],
  ) => void;
}) {
  const mergedComponents = { ...defaultComponents, ...components };

  return (
    <>
      {schema.map((field) => {
        const Component = mergedComponents[field.meta] as FieldRenderer<T>;
        if (!Component) return null;

        return (
          <div key={field.id}>
            <Component
              field={field}
              onChange={(key, value) => onChange?.(key, value)}
            />
          </div>
        );
      })}
    </>
  );
}

export const OptionsVisitor = <T extends MetaOptions>({
  schema,
  onChange,
}: {
  schema: T[];
  onChange?: (
    key: keyof T["changeable"],
    value: T["changeable"][keyof T["changeable"]],
  ) => void;
}) => {
  return <ViewGenerator<T> schema={schema} onChange={onChange} />;
};

import * as React from "react";

import { cn } from "@/shared/lib/utils";
import { Label } from "@/shared/components/ui/label";

type InputSlots = {
  root?: React.ElementType;
  input?: React.ElementType;
  label?: React.ElementType;
  helper?: React.ElementType;
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  slots?: InputSlots;
  label?: string;
  helperText?: string;
  error?: string;
}

function InputHeadless({ className, type, slots, ...props }: InputProps) {
  const Root = slots?.root ?? "div";
  const InputSlot = slots?.input ?? "input";

  return (
    <Root data-slot="root">
      <InputSlot
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground py-[8px] placeholder:text-secondary/60 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border-secondary/40 border bg-transparent px-4 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visile:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className,
        )}
        {...props}
      />
    </Root>
  );
}

export default function Input({
  slots,
  label,
  helperText,
  error,
  ...props
}: InputProps) {
  const Root = slots?.root ?? "div";
  const LabelSlot = slots?.label ?? Label;
  const HelperSlot = slots?.helper ?? "p";

  return (
    <Root className="w-full gap-1.5 flex-col flex" data-slot="root">
      {label && (
        <LabelSlot htmlFor={props.id} data-slot="label">
          {label}
        </LabelSlot>
      )}
      <InputHeadless {...props} slots={slots} />
      {helperText && (
        <HelperSlot
          className="text-[14px] text-muted-foreground"
          data-slot="helper"
        >
          {helperText}
        </HelperSlot>
      )}
      {error && (
        <HelperSlot className="text-[14px]" data-slot="error">
          {error}
        </HelperSlot>
      )}
    </Root>
  );
}

export { Input };

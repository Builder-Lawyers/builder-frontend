import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { Label } from "@/shared/ui/label";

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

function InputHeadless({
  className,
  type,
  slots,
  error,
  ...props
}: InputProps) {
  const Root = slots?.root ?? "div";
  const InputSlot = slots?.input ?? "input";

  return (
    <Root data-slot="root">
      <InputSlot
        type={type}
        data-slot="input"
        aria-invalid={!!error}
        className={cn(
          "file:text-foreground py-[10px] placeholder:text-secondary/60 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-xl border bg-transparent px-3 text-base transition-[color,box-shadow,border] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          error
            ? "border-destructive ring-destructive/40 focus-visible:ring-destructive/40"
            : "border-secondary/40 ring-foreground/60 focus-visible:ring-[2px]",
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
      <InputHeadless {...props} slots={slots} error={error} />
      {helperText && !error && (
        <HelperSlot
          className="text-[14px] text-muted-foreground"
          data-slot="helper"
        >
          {helperText}
        </HelperSlot>
      )}
      {error && (
        <HelperSlot className="text-[12px] text-destructive" data-slot="error">
          {error}
        </HelperSlot>
      )}
    </Root>
  );
}

export { Input };

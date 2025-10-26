import {
  MetaOptions,
  Widget as WidgetProps,
  WidgetOptions,
} from "@/shared/types/template";
import React, { HTMLAttributes, RefObject, useRef, useState } from "react";
import { cn } from "@/shared/lib/utils";
import { Icon } from "@iconify/react";

export const WidgetTitle = ({ label }: { label: WidgetProps["label"] }) => {
  return (
    <div className="flex items-center gap-3">
      <p className="text-foreground text-[14px]">{label}</p>
    </div>
  );
};

const OptionIcon = ({ meta }: { meta: MetaOptions["meta"] }) => {
  switch (meta) {
    case "link":
      return <div>icon</div>;
    default:
      return <div className="w-5 h-5 bg-secondary/10 rounded" />;
  }
};

interface WidgetComponentProps {
  widget: WidgetProps;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isOpen: boolean;
  isActive: boolean;
}

const WidgetComponent = ({
  widget,
  onClick,
  isOpen,
  isActive,
  ...rest
}: WidgetComponentProps) => {
  return (
    <div
      {...rest}
      onClick={onClick}
      className={cn(
        "px-[12px] flex items-center w-full justify-between py-[12px] rounded-2xl duration-150 hover:bg-secondary/[3%]",
        isActive && "bg-secondary/[5%]",
      )}
    >
      <WidgetTitle label={widget.label} />
      {widget.options && (
        <Icon
          className={cn(isOpen)}
          icon="fluent:layer-diagonal-24-regular"
          width="24"
        />
      )}
    </div>
  );
};

const Options = ({
  options,
  contentRef,
}: {
  options: WidgetOptions;
  contentRef: RefObject<HTMLDivElement | null>;
}) => {
  return (
    <div ref={contentRef}>
      {options.map((option) => (
        <div
          className="px-[12px] ml-[24px] flex items-center w-full justify-between py-[10px] rounded-2xl duration-150 hover:bg-secondary/[3%]"
          key={option.id}
        >
          <div className="flex items-center gap-3">
            <OptionIcon meta={option.meta} />
            <p className="text-foreground capitalize text-[14px]">
              {option.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

interface WidgetContainerProps extends HTMLAttributes<HTMLDivElement> {
  widget: WidgetProps;
  isActive: boolean;
}

export const Widget = ({ widget, isActive, ...rest }: WidgetContainerProps) => {
  const [isOpen, setIsOpen] = useState(isActive);

  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col">
      <WidgetComponent
        {...rest}
        isActive={isActive}
        isOpen={isOpen}
        onClick={(e) => {
          setIsOpen(!isOpen);
          rest.onClick?.(e);
        }}
        widget={widget}
      />
      <div
        className={cn(
          "transition-all duration-250 ease-in-out overflow-hidden",
        )}
      >
        {isOpen && widget.options && (
          <Options contentRef={contentRef} options={widget.options} />
        )}
      </div>
    </div>
  );
};

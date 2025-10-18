import FluentLayerDiagonal24Regular from "~icons/fluent/layer-diagonal-24-regular";
import IconamoonArrowUp2Light from "~icons/iconamoon/arrow-up-2-light";
import {
  MetaOptions,
  Widget as WidgetProps,
  WidgetOptions,
} from "@/shared/types/template";
import React, {
  HTMLAttributes,
  RefObject,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/shared/lib/utils";

export const WidgetTitle = ({ label }: { label: WidgetProps["label"] }) => {
  return (
    <div className="flex items-center gap-3">
      <FluentLayerDiagonal24Regular
        opacity="60%"
        className="text-foreground"
        width={24}
        height={24}
      />
      <p className="text-foreground text-[14px]">{label}</p>
    </div>
  );
};

const OptionIcon = ({ meta }: { meta: MetaOptions["meta"] }) => {
  switch (meta) {
    case "link":
      return (
        <FluentLayerDiagonal24Regular
          opacity="60%"
          className="text-foreground"
          width={20}
          height={20}
        />
      );
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
        <IconamoonArrowUp2Light
          className={cn(
            "duration-150 transform",
            isOpen ? "rotate-180" : "rotate-0",
          )}
          height={18}
          width={18}
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
  const [isOpen, setIsOpen] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, widget.options]);

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
          "transition-all duration-150 ease-in-out overflow-hidden",
        )}
        style={{
          height: isOpen ? height : 0,
          opacity: isOpen ? 1 : 0,
        }}
      >
        {isOpen && widget.options && (
          <Options contentRef={contentRef} options={widget.options} />
        )}
      </div>
    </div>
  );
};

import { WidgetProps } from "@/shared/types";
import React, {
  ComponentProps,
  ComponentType,
  JSX,
  useEffect,
  useRef,
  useState,
} from "react";

export interface WidgetComponentProps
  extends Omit<ComponentProps<"div">, "id" | "type" | "children">,
    Omit<WidgetProps, "tag"> {
  tag?: string | keyof JSX.IntrinsicElements | ComponentType<any>;
}

export const Widget = ({
  id,
  type,
  tag: Tag = "div",
  value,
  attrs = {},
  children = [],
  onClick,
  settings,
  props,
  ...rest
}: WidgetComponentProps) => {
  const Comp = Tag as keyof JSX.IntrinsicElements | ComponentType<any>;
  const optionalSettings = settings?.optional;
  const ref = useRef<HTMLElement | null>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (ref.current) {
      const el = ref.current;
      const resizeObserver = new ResizeObserver(() => {
        setSize({ width: el.offsetWidth, height: el.offsetHeight });
      });
      resizeObserver.observe(el);

      setSize({ width: el.offsetWidth, height: el.offsetHeight });

      return () => resizeObserver.disconnect();
    }
  }, []);

  const style: React.CSSProperties = (() => {
    switch (optionalSettings?.fixed) {
      case "top":
        return {
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
        };
      default:
        return {};
    }
  })();

  return (
    <>
      <Comp
        ref={ref as any}
        {...attrs}
        {...props}
        {...rest}
        onClick={onClick}
        data-widget-id={id}
        className={type}
        style={style}
      >
        {value}
        {children?.map((widget) => (
          <Widget key={widget.id} {...widget} />
        ))}
      </Comp>

      {optionalSettings?.fixed === "top" && size.height > 0 && (
        <div style={{ height: size.height }} aria-hidden="true" />
      )}
    </>
  );
};

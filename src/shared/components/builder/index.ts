import { WidgetProps } from "@/shared/types";

export const factory = {
  link: (props: { href: string; children?: WidgetProps[] }): WidgetProps => {
    const child = props.children?.find((c) => typeof c.value === "string");

    console.log(child);

    return {
      id: crypto.randomUUID(),
      type: "link",
      tag: "a",
      props: {
        href: props.href,
        id: child?.id,
      },
      children: props.children,
    };
  },

  button: (props: { value: string }): WidgetProps => ({
    id: crypto.randomUUID(),
    type: "button",
    tag: "button",
    value: props.value,
  }),
};

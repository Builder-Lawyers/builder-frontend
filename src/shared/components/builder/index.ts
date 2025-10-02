import { WidgetProps } from "@/shared/types";

// factory.link({
//   href: "#",
//   type: "button-link",
//   label: "Button",
//   id: crypto.randomUUID(),
//   children: [factory.button({ parentId: "button-link", value: "32123" })],
// }),

export const factory = {
  link: (
    props: Omit<WidgetProps, "settings" | "tag"> & {
      href?: string;
    },
  ): WidgetProps => {
    return {
      ...props,
      tag: "a",
      props: {
        href: props.href,
      },
      children: props.children,
    };
  },

  button: (
    props: Omit<WidgetProps, "id" | "settings" | "type" | "tag"> & {
      value: string;
      parentId?: string;
    },
  ): WidgetProps => ({
    id: crypto.randomUUID(),
    parentId: props.parentId,
    tag: "button",
    type: "button",
    ...props,
  }),
};

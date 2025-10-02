import { WidgetProps } from "@/shared/types";
import { nanoid } from "nanoid";

export const method = {
  link: (builder: (id: string) => WidgetProps): WidgetProps => {
    const id = nanoid();
    return builder(id);
  },

  button: (props: { value: string; parentId?: string }): WidgetProps => ({
    id: nanoid(),
    type: "button",
    tag: "button",
    value: props.value,
    parentId: props.parentId,
  }),
};

const linkWidget = method.link((id) => {
  return {
    type: "button-link",
    tag: "a",
    label: "Button",
    props: {
      href: "https://www.google.com",
    },
    id,
    children: [method.button({ parentId: id, value: "32123" })],
  };
});

export const widgetsTemplate: WidgetProps[] = [
  linkWidget,
  {
    id: crypto.randomUUID(),
    type: "header",
    tag: "header",
    settings: {
      general: {
        single: true,
      },
      optional: {
        fixed: "top",
      },
    },
    label: "Header",
    children: [
      {
        id: crypto.randomUUID(),
        type: "header",
        tag: "section",
        children: [
          {
            type: "header-title",
            id: crypto.randomUUID(),
            tag: "h1",
            value: "Header Title",
          },
          {
            id: crypto.randomUUID(),
            type: "button",
            tag: "button",
            children: [
              {
                id: crypto.randomUUID(),
                type: "button-value",
                tag: "p",
                value: "Button",
              },
            ],
          },
        ],
      },
    ],
  },
];

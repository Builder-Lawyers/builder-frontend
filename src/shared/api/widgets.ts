import { WidgetProps } from "@/shared/types";

export const widgetsTemplate: WidgetProps[] = [
  {
    id: crypto.randomUUID(),
    type: "header",
    tag: "header",
    settings: {
      optional: {
        fixed: "top",
      },
      general: {
        single: true,
      },
    },
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
  {
    id: crypto.randomUUID(),
    type: "button",
    tag: "button",
    props: {
      href: "https://www.figma.com/design/4wwWHe2NkkjsqoQjxUwuUI/--BUILDER?node-id=137-791&p=f&t=YUsrxnfjnQ3SSdUN-0",
    },
    children: [
      {
        id: crypto.randomUUID(),
        type: "button-value",
        tag: "p",
        value: "Button",
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    type: "hero",
    tag: "section",
    children: [
      {
        type: "hero-title",
        id: crypto.randomUUID(),
        tag: "h1",
        value: "HERO",
      },
      {
        type: "hero-desc",
        id: crypto.randomUUID(),
        tag: "p",
        value: "HERO",
      },
    ],
  },
];

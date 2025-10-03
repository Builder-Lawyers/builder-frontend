import { WidgetProps } from "@/shared/types";

export const widgetsTemplate: WidgetProps[] = [
  {
    id: crypto.randomUUID(),
    kind: "typed",
    type: "button",
    label: "Button link",
    children: [
      {
        id: crypto.randomUUID(),
        kind: "element",
        tag: "a",
        props: { href: "https://google.com", target: "_blank" },
        children: [
          {
            id: crypto.randomUUID(),
            kind: "element",
            tag: "button",
            children: [
              {
                id: crypto.randomUUID(),
                kind: "typed",
                type: "button-text",
                value: "Button",
              },
            ],
          },
        ],
      },
    ],
  },
];

import { WidgetProps } from "@/shared/types";
import { factory } from "../components/builder";

export const widgetsTemplate: WidgetProps[] = [
  {
    id: crypto.randomUUID(),
    type: "header",
    tag: "header",
    children: [
      factory.link({
        href: "#",
        children: [
          {
            id: crypto.randomUUID(),
            type: "header-title",
            tag: "h1",
            value: "Header Title",
          },
        ],
      }),
      factory.button({ value: "32123" }),
    ],
  },
  factory.button({ value: "dsads" }),
];

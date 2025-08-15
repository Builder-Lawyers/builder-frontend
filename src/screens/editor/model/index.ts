import { Attributes } from "@/shared/types";
import { findWidgetById } from "@/shared/lib/findWidgetById";

export const clickOnDomElement = (
  el: Element | null,
  json: any,
  onClickElement: any,
) => {
  const elementProps = findWidgetById(
    json,
    el?.getAttribute(Attributes.widgetId_without) || "",
  );

  if (!elementProps || !el) return;

  onClickElement({
    el: el,
    props: elementProps,
  });
};

import { Pages, WidgetProps } from "@/shared/types";

export const asArray = <T>(v?: T | T[] | null): T[] =>
  v == null ? [] : Array.isArray(v) ? v : [v];

export type WidgetLocation =
  | { scope: "global"; widgetIndex: number }
  | { scope: "page"; pageIndex: number; widgetIndex: number };

export function locateWidget(pages: Pages, id: string): WidgetLocation | null {
  const gi = pages.global.props.widgets.findIndex((w) => w.props?.id === id);
  if (gi >= 0) return { scope: "global", widgetIndex: gi };

  for (let p = 0; p < pages.pages.length; p++) {
    const wi = pages.pages[p].widgets.findIndex((w) => w.props?.id === id);
    if (wi >= 0) return { scope: "page", pageIndex: p, widgetIndex: wi };
  }
  return null;
}

export function findWidgetById(pages: Pages, id: string): WidgetProps | null {
  const loc = locateWidget(pages, id);
  if (!loc) return null;

  return loc.scope === "global"
    ? pages.global.props.widgets[loc.widgetIndex]
    : pages.pages[loc.pageIndex].widgets[loc.widgetIndex];
}

export function updateWidgetProps(
  pages: Pages,
  id: string,
  updater: (props: WidgetProps["props"]) => WidgetProps["props"],
): Pages {
  const loc = locateWidget(pages, id);
  if (!loc) return pages;

  if (loc.scope === "global") {
    const widgets = pages.global.props.widgets.map((w, i) =>
      i === loc.widgetIndex ? { ...w, props: updater(w.props) } : w,
    );
    return {
      ...pages,
      global: {
        ...pages.global,
        props: { ...pages.global.props, widgets },
      },
    };
  } else {
    const page = pages.pages[loc.pageIndex];
    const widgets = page.widgets.map((w, i) =>
      i === loc.widgetIndex ? { ...w, props: updater(w.props) } : w,
    );
    const pagesCloned = pages.pages.slice();
    pagesCloned[loc.pageIndex] = { ...page, widgets };
    return { ...pages, pages: pagesCloned };
  }
}

type AnyProps = Record<string, any>;

interface SearchResult {
  widgetType: string;
  propPath: string[];
  value: any;
}

export function findPropById(
  widgets: { type: string; props: AnyProps }[],
  id: string,
): SearchResult | null {
  for (const widget of widgets) {
    const result = searchProps(widget.props, id, [widget.type]);
    if (result) {
      return { widgetType: widget.type, ...result };
    }
  }
  return null;
}
function searchProps(
  props: AnyProps,
  id: string,
  path: string[],
): { propPath: string[]; value: any } | null {
  if (!props || typeof props !== "object") return null;

  if (Array.isArray(props)) {
    for (let i = 0; i < props.length; i++) {
      const item = props[i];
      if (item && typeof item === "object") {
        if (item.id === id) {
          return { propPath: [...path, String(i)], value: item };
        }
        const res = searchProps(item, id, [...path, String(i)]);
        if (res) return res;
      }
    }
  } else {
    for (const [key, value] of Object.entries(props)) {
      if (value && typeof value === "object") {
        if (value.id === id) {
          return { propPath: [...path, key], value };
        }
        const res = searchProps(value, id, [...path, key]);
        if (res) return res;
      }
    }
  }

  return null;
}

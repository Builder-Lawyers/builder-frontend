import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  ListOption,
  MetaOptions,
  WidgetOptions,
} from "@/shared/types/template";
import Handlebars from "handlebars";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
function flattenOption(opt: MetaOptions): any {
  if (opt.meta === "list") {
    const list = opt as ListOption;
    const items = list.changeable?.items ?? [];
    return {
      items: items.map(flattenOption),
    };
  }

  if ("changeable" in opt && opt.changeable) {
    return { ...opt.changeable };
  }

  return {};
}

export function renderWidget(template: string, options: WidgetOptions) {
  const context = options.reduce<Record<string, any>>((acc, opt) => {
    if (opt.meta === "list") {
      const list = opt as ListOption;
      const items = list.changeable?.items ?? [];
      acc[list.label] = { items: items.map(flattenOption) };
    } else {
      acc[opt.label] = flattenOption(opt);
    }
    return acc;
  }, {});

  const compiled = Handlebars.compile(template);
  return compiled(context);
}

import { createEvent, createStore } from "effector";
import { GlobalInnerProps, WidgetProps } from "@/shared/types";

export type ClickPayload = {
  props: WidgetProps | null | WidgetProps[];
  el?: HTMLElement;
};

const resetSelectedElement = createEvent();
const $globalProps = createStore<GlobalInnerProps | null>(null);
const $selectedElement = createStore<WidgetProps | null>(null);
const $selectedElementHTML = createStore<HTMLElement | null>(null);
const initGlobal = createEvent<GlobalInnerProps | null>();

const clickOnElement = createEvent<ClickPayload>();

$selectedElement.on(clickOnElement, (_, { props }) => {
  return props || null;
});

$selectedElementHTML.on(clickOnElement, (_, { el }) => {
  return el || null;
});

$globalProps.on(initGlobal, (_, props) => props || null);

$selectedElement.reset(resetSelectedElement);
$selectedElementHTML.reset(resetSelectedElement);

export {
  $selectedElement,
  resetSelectedElement,
  $selectedElementHTML,
  clickOnElement,
  initGlobal,
  $globalProps,
};

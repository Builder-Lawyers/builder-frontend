import { DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { WidgetProps } from "@/shared/types";

export const useFrame = (ref: HTMLIFrameElement | null) => {
  const [selectedDOMElement, setSelectedDOMElement] =
    useState<HTMLDivElement | null>(null);

  const clickOnElement = (element: HTMLDivElement) => {
    setSelectedDOMElement(element);
  };

  const handleDragEnd = ({
    event,
    action,
    widgets,
  }: {
    event: DragEndEvent;
    action: (oldIndex: number, newIndex: number) => void;
    widgets: WidgetProps[];
  }) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = widgets.findIndex((w) => w.id === active.id);
    const newIndex = widgets.findIndex((w) => w.id === over.id);

    action(oldIndex, newIndex);
  };

  const findDOMElement = (id: string) => {
    if (!ref) return null;
    const iframeDoc = ref.contentDocument;
    if (!iframeDoc) return null;
    return iframeDoc.querySelector<HTMLDivElement>(`[data-widget-id="${id}"]`);
  };

  return {
    handleDragEnd,
    findDOMElement,
    clickOnElement,
    selectedDOMElement,
  };
};

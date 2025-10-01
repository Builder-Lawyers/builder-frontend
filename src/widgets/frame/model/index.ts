import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useEditorStore } from "@/entities/editor";
import { useEffect, useMemo, useState } from "react";

export const useFrame = (ref: HTMLIFrameElement | null) => {
  const { widgets, api: editorApi } = useEditorStore();

  const [hoveredDOMElement, setHoveredDOMElement] =
    useState<HTMLDivElement | null>(null);

  const [selectedDOMElement, setSelectedDOMElement] =
    useState<HTMLDivElement | null>(null);

  const clickOnElement = (element: HTMLDivElement) => {
    setSelectedDOMElement(element);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = widgets.findIndex((w) => w.id === active.id);
    const newIndex = widgets.findIndex((w) => w.id === over.id);

    editorApi.reorder(null, (list) => arrayMove(list, oldIndex, newIndex));
  };

  useEffect(() => {
    if (!ref) return;
    const iframeDoc = ref.contentDocument;

    if (!iframeDoc) return;

    const handleLeave = () => {
      setHoveredDOMElement(null);
    };

    iframeDoc.addEventListener("mouseleave", handleLeave);

    return () => {
      iframeDoc.removeEventListener("mouseleave", handleLeave);
    };
  }, [ref, setHoveredDOMElement]);

  const elementDOMProps = useMemo(() => {
    const element = hoveredDOMElement?.getBoundingClientRect();

    if (!element) return null;

    const offset = 2;

    return {
      isActive: !!element,
      height: element.height - offset * 2,
      width: element.width - offset * 2,
      coordinates: { x: element.x, y: element.y },
    };
  }, [hoveredDOMElement]);

  return {
    handleDragEnd,
    elementDOMProps,
    setHoveredDOMElement,
    clickOnElement,
    selectedDOMElement,
  };
};

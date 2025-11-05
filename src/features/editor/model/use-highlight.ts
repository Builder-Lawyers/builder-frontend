import { useEffect, useState, RefObject } from "react";

interface HighlightPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface HighlightControls {
  onElementEvent: (e: React.MouseEvent<HTMLElement>) => void;
}

interface UseHighlightsReturn {
  hoverHighlight: HighlightControls;
  activeHighlight: HighlightControls;
  hoverPos: HighlightPosition;
  activePos: HighlightPosition;
}

export const useHighlights = (
  iframeRef: RefObject<HTMLIFrameElement | null>,
  selectedWidgetId?: string,
): UseHighlightsReturn => {
  const [hoverPos, setHoverPos] = useState<HighlightPosition>({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const [activePos, setActivePos] = useState<HighlightPosition>({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const updateFromElement = (
    el: HTMLElement,
    setter: (pos: HighlightPosition) => void,
  ) => {
    const rect = el.getBoundingClientRect();
    const iframeWindow = iframeRef.current?.contentWindow;
    if (!iframeWindow) return;

    setter({
      top: rect.top + iframeWindow.scrollY,
      left: rect.left + iframeWindow.scrollX,
      width: rect.width,
      height: rect.height,
    });
  };

  const hoverHighlight = {
    onElementEvent: (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget as HTMLElement;
      if (el) updateFromElement(el, setHoverPos);
    },
  };

  const activeHighlight = {
    onElementEvent: (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget as HTMLElement;
      if (el) updateFromElement(el, setActivePos);
    },
  };

  useEffect(() => {
    if (!selectedWidgetId || !iframeRef.current) return;
    const iframeDoc = iframeRef.current.contentDocument;
    if (!iframeDoc) return;

    const el = iframeDoc.querySelector(
      `[data-widget-id="${selectedWidgetId}"]`,
    ) as HTMLElement | null;

    if (el) updateFromElement(el, setActivePos);
  }, [selectedWidgetId, iframeRef]);

  return { hoverHighlight, activeHighlight, hoverPos, activePos };
};

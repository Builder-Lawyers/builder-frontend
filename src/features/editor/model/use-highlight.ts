import React, { useState, useCallback, useRef, useEffect } from "react";
import { HighlightProps } from "@/features/editor/ui/highlight";
import { shallowEqual } from "@/shared/lib/utils";

export const useHighlight = (
  iframeRef?: React.RefObject<HTMLIFrameElement | null>,
) => {
  const [hoverPositions, setHoverPositions] = useState<HighlightProps>({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const [activePositions, setActivePositions] = useState<HighlightProps>({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const hoveredElementRef = useRef<HTMLElement | null>(null);
  const activeElementRef = useRef<HTMLElement | null>(null);

  const computePosition = useCallback(
    (el: HTMLElement | null): HighlightProps | null => {
      const iframe = iframeRef?.current;
      if (!el || !iframe) return null;

      const rect = el.getBoundingClientRect();

      const scrollY = iframe.contentWindow?.scrollY ?? 0;

      return {
        top: rect.top + scrollY,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      };
    },
    [iframeRef],
  );

  const updateHover = useCallback(() => {
    const pos = computePosition(hoveredElementRef.current);
    if (!pos) return;
    setHoverPositions((prev) => (shallowEqual(prev, pos) ? prev : pos));
  }, [computePosition]);

  const updateActive = useCallback(() => {
    const pos = computePosition(activeElementRef.current);
    if (!pos) return;
    setActivePositions((prev) => (shallowEqual(prev, pos) ? prev : pos));
  }, [computePosition]);

  const onHoverElement = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      hoveredElementRef.current = e.currentTarget as HTMLElement;
      updateHover();
    },
    [updateHover],
  );

  const onSelectElement = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget as HTMLElement;
      activeElementRef.current = el;
      updateActive();
    },
    [updateActive],
  );

  useEffect(() => {
    const iframe = iframeRef?.current;
    if (!iframe) return;

    const iframeWin = iframe.contentWindow;
    const resizeObs = new ResizeObserver(() => {
      updateHover();
      updateActive();
    });

    resizeObs.observe(iframe);
    if (hoveredElementRef.current) resizeObs.observe(hoveredElementRef.current);
    if (activeElementRef.current) resizeObs.observe(activeElementRef.current);

    iframeWin?.addEventListener("scroll", updateHover, { passive: true });
    iframeWin?.addEventListener("scroll", updateActive, { passive: true });

    return () => {
      resizeObs.disconnect();
      iframeWin?.removeEventListener("scroll", updateHover);
      iframeWin?.removeEventListener("scroll", updateActive);
    };
  }, [iframeRef, updateHover, updateActive]);

  return {
    onHoverElement,
    onSelectElement,
    hoverPositions,
    activePositions,
  };
};

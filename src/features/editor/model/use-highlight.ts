import { useRef, useState, useEffect } from "react";
import { HighlightFactory } from "@/features/editor/model/highlight-factory";
import { HighlightProps } from "@/features/editor/ui/highlight";

export const useHighlights = (
  iframeRef: React.RefObject<HTMLIFrameElement | null>,
) => {
  const factoryRef = useRef(new HighlightFactory(iframeRef));

  const [hoverPos, setHoverPos] = useState<HighlightProps>({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const [activePos, setActivePos] = useState<HighlightProps>({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const hoverHighlight = factoryRef.current.create("hover", setHoverPos);
  const activeHighlight = factoryRef.current.create("active", setActivePos);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const win = iframe.contentWindow;
    const handleUpdate = () => {
      hoverHighlight.update();
      activeHighlight.update();
    };

    const resizeObs = new ResizeObserver(handleUpdate);
    resizeObs.observe(iframe);

    win?.addEventListener("scroll", handleUpdate, { passive: true });

    return () => {
      resizeObs.disconnect();
      win?.removeEventListener("scroll", handleUpdate);
    };
  }, [iframeRef, hoverHighlight, activeHighlight]);

  return {
    hoverHighlight,
    activeHighlight,
    hoverPos,
    activePos,
  };
};

import { RefObject, useEffect, useRef } from "react";

type InjectionProps = {
  iframeRef: RefObject<HTMLIFrameElement | null>;
  onLoad?: (iframe: HTMLIFrameElement) => void;
  onClick?: (target: HTMLElement, iframe: HTMLIFrameElement) => void;
  onMouseMove?: (target: HTMLElement, iframe: HTMLIFrameElement) => void;
  onHover?: (target: HTMLElement, iframe: HTMLIFrameElement) => void;
  onCleanup?: () => void;
};

export const useIframeInjection = ({
  iframeRef,
  onLoad,
  onClick,
  onMouseMove,
  onHover,
  onCleanup,
}: InjectionProps) => {
  const attachedDocRef = useRef<Document | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const iframe = iframeRef?.current;
    if (!iframe) return;

    const cleanups: (() => void)[] = [];

    const runInjection = () => {
      const doc = iframe.contentDocument;
      const win = iframe.contentWindow;
      const body = doc?.body;

      if (!doc || !win || !body) return;

      if (attachedDocRef.current && attachedDocRef.current !== doc) {
        cleanups.forEach((fn) => fn());
        cleanups.length = 0;
      }

      attachedDocRef.current = doc;

      onLoad?.(iframe);

      if (onClick) {
        const handleClick = (e: MouseEvent) => {
          const target = e.target as HTMLElement | null;
          if (target) onClick(target, iframe);
        };
        doc.addEventListener("click", handleClick, true);
        cleanups.push(() =>
          doc.removeEventListener("click", handleClick, true),
        );
      }

      if (onMouseMove || onHover) {
        const handleMouseMove = (e: MouseEvent) => {
          if (rafRef.current) return;
          rafRef.current = requestAnimationFrame(() => {
            rafRef.current = null;

            const target = e.target as HTMLElement | null;
            if (!target) return;

            if (onMouseMove) onMouseMove(target, iframe);
            if (onHover) onHover(target, iframe);
          });
        };
        doc.addEventListener("mousemove", handleMouseMove, { passive: true });
        cleanups.push(() => {
          doc.removeEventListener("mousemove", handleMouseMove);
          if (rafRef.current) cancelAnimationFrame(rafRef.current);
        });
      }
    };

    iframe.addEventListener("load", runInjection);

    if (iframe.contentDocument?.readyState === "complete") {
      runInjection();
    }

    return () => {
      iframe.removeEventListener("load", runInjection);
      cleanups.forEach((fn) => fn());
      attachedDocRef.current = null;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [iframeRef, onClick, onMouseMove, onHover]);

  useEffect(() => {
    return () => {
      onCleanup?.();
    };
  }, []);
};

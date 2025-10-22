"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export const IFramePreview = ({
  children,
  injectCSS,
  scale = 0.4,
}: {
  children: React.ReactNode;
  injectCSS?: string;
  scale?: number;
}) => {
  const ref = useRef<HTMLIFrameElement>(null);
  const [doc, setDoc] = useState<Document | null>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    if (ref.current?.contentDocument) {
      const iframeDoc = ref.current.contentDocument;
      setDoc(iframeDoc);

      if (injectCSS) {
        const linkEl = iframeDoc.createElement("link");
        linkEl.rel = "stylesheet";
        linkEl.type = "text/css";
        linkEl.href = injectCSS;
        iframeDoc.head.appendChild(linkEl);
      }

      const styleEl = iframeDoc.createElement("style");
      styleEl.innerHTML = `
        html, body { 
          margin: 0;
          padding: 0;
          overflow: hidden;
          pointer-events: none !important; 
        }
      `;
      iframeDoc.head.appendChild(styleEl);

      const observer = new ResizeObserver(() => {
        if (iframeDoc.body) {
          setContentHeight(iframeDoc.body.scrollHeight);
        }
      });
      observer.observe(iframeDoc.body);

      return () => observer.disconnect();
    }
  }, [injectCSS]);

  return (
    <iframe
      ref={ref}
      className="overflow-hidden rounded-md"
      style={{
        background: "white",
        padding: "0px 12px",
        width: "100%",
        height: contentHeight ? `${contentHeight * scale}px` : "auto",
      }}
    >
      {doc &&
        createPortal(
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              width: `${100 / scale}%`,
            }}
          >
            {children}
          </div>,
          doc.body,
        )}
    </iframe>
  );
};

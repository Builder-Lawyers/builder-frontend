"use client";

import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  IframeHTMLAttributes,
} from "react";
import { createPortal } from "react-dom";

interface IframeProps extends IframeHTMLAttributes<HTMLIFrameElement> {
  children?: React.ReactNode;
  injectCSS?: string;
}

export const IFrame = forwardRef<HTMLIFrameElement, IframeProps>(
  ({ children, injectCSS, ...rest }, ref) => {
    const innerRef = useRef<HTMLIFrameElement | null>(null);
    const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

    useEffect(() => {
      if (typeof ref === "function") ref(innerRef.current);
      else if (ref)
        (ref as React.MutableRefObject<HTMLIFrameElement | null>).current =
          innerRef.current;
    }, [ref]);

    useEffect(() => {
      const iframe = innerRef.current;
      if (!iframe) return;
      const doc = iframe.contentDocument;
      if (!doc) return;

      if (doc.head && doc.body) {
        setMountNode(doc.body);
        doc.documentElement.style.overflowX = "hidden";
        doc.body.style.overflowX = "hidden";

        if (injectCSS) {
          const existing = doc.head.querySelector("link[data-injected='true']");
          if (existing) existing.remove();

          const link = doc.createElement("link");
          link.rel = "stylesheet";
          link.type = "text/css";
          link.href = injectCSS;
          link.setAttribute("data-injected", "true");
          doc.head.appendChild(link);
        }
      }
    }, [injectCSS]);

    return (
      <iframe
        ref={innerRef}
        {...rest}
        style={{
          ...rest.style,
          border: "none",
          width: "100%",
          height: "100%",
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        {mountNode && createPortal(children, mountNode)}
      </iframe>
    );
  },
);

IFrame.displayName = "IFrame";

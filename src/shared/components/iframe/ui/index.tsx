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
      if (typeof ref === "function") {
        ref(innerRef.current);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLIFrameElement | null>).current =
          innerRef.current;
      }
    }, [ref]);

    useEffect(() => {
      if (innerRef.current) {
        const iframeDoc = innerRef.current.contentDocument;
        if (iframeDoc?.body && iframeDoc?.head) {
          setMountNode(iframeDoc.body);

          if (injectCSS) {
            const linkEl = iframeDoc.createElement("link");
            linkEl.rel = "stylesheet";
            linkEl.type = "text/css";
            linkEl.href = injectCSS;
            iframeDoc.head.appendChild(linkEl);
          }
        }
      }
    }, [injectCSS]);

    return (
      <iframe ref={innerRef} {...rest}>
        {mountNode && createPortal(children, mountNode)}
      </iframe>
    );
  },
);

IFrame.displayName = "IFrame";

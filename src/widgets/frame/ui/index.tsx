"use client";

import { Iframe } from "@/shared/components/iframe";
import { useEffect, useRef } from "react";
import { Zoom } from "@/features/editor/zoom/ui";
import { useUnit } from "effector-react";
import { $scale } from "@/features/editor/zoom";
import { useIframeInjection } from "@/widgets/frame/model";
import { highlightInit } from "@/features/editor/highlight";
import { Attributes, GlobalInnerProps, Pages } from "@/shared/types";
import {
  $selectedElementHTML,
  clickOnElement,
  initGlobal,
  resetSelectedElement,
} from "@/features/editor/select";

import { clickOnDomElement } from "@/screens/editor/model";
import { scrollToActiveElement } from "@/features/editor/slide-to-active-element";
import { UploadWebSite } from "@/features/editor/post-website";
import { resetHighlight } from "@/features/editor/highlight/model";
import { $isPreviewMode, Preview } from "@/features/editor/preview";

interface Props {
  src: string;
  json: Pages | null;
}

export const Frame = ({ src, json }: Props) => {
  const ref = useRef<HTMLIFrameElement>(null);
  const [isPreviewMode] = useUnit([$isPreviewMode]);
  const scale = useUnit($scale);

  const [selectedElement, onClickElement, reset, init] = useUnit([
    $selectedElementHTML,
    clickOnElement,
    resetSelectedElement,
    initGlobal,
  ]);

  useEffect(() => {
    const global = json?.global?.props as GlobalInnerProps;
    if (global) init(global);
  }, []);

  useEffect(() => {}, []);

  useIframeInjection({
    iframeRef: ref,
    onLoad: (frame) => {
      frame.contentWindow?.postMessage({ type: "sync-json", json }, "*");
    },
    onClick: (el, frame) => {
      if (isPreviewMode) return;
      const element =
        el.closest(Attributes.widgetProps) ||
        el.closest(Attributes.widgetId) ||
        null;

      if (!element) return;
      if (selectedElement === element) return reset();

      scrollToActiveElement(frame, el);

      clickOnDomElement(element, json, onClickElement);
    },
    onMouseMove: (el, frame) => {
      if (isPreviewMode) return;
      highlightInit(selectedElement || el, frame);
    },
    onCleanup: () => {
      reset();
      resetHighlight();
    },
  });

  return (
    <Iframe
      ref={ref}
      actions={
        <div className="flex w-full justify-between items-center">
          <Zoom />
          <div className="flex gap-4">
            <Preview callback={resetHighlight} />
            <UploadWebSite />
          </div>
        </div>
      }
      scale={scale}
      src={src}
    />
  );
};

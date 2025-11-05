import React, { useRef } from "react";
import { useEditor } from "@/features/editor/model/use-editor";
import { IFrame } from "@/shared/ui/iframe/ui";
import { Frame } from "@/features/editor/ui/frame";
import { useRenderTemplate } from "@/features/editor/model/use-render-template";
import { PreviewWrapper } from "@/features/editor/compose/preview-mode";
import { Highlight } from "@/features/editor/ui/highlight";
import { useWidget } from "@/features/editor/model/use-widget";
import { useHighlights } from "@/features/editor/model/use-highlight";

export const FrameViewer = () => {
  const { api } = useWidget();
  const { widgets, styles } = useEditor();
  const { renderWidget } = useRenderTemplate();

  console.log(styles);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const { hoverHighlight, activeHighlight, hoverPos, activePos } =
    useHighlights(iframeRef);

  return (
    <Frame>
      <Frame.Content>
        <PreviewWrapper>
          <IFrame ref={iframeRef} className="w-full h-full bg-white shadow-lg ">
            {widgets.map((w) => (
              <div
                onMouseEnter={hoverHighlight.onElementEvent}
                key={w.id}
                data-widget-id={w.id}
                onClick={(e) => {
                  api.onSelectedWidgetId(w.id);
                  activeHighlight.onElementEvent(e);
                }}
                dangerouslySetInnerHTML={{
                  __html: renderWidget(w.component, w.options),
                }}
              />
            ))}
            <Highlight {...hoverPos} type="hover" />
            <Highlight {...activePos} type="active" />
          </IFrame>
        </PreviewWrapper>
      </Frame.Content>
    </Frame>
  );
};

import React, { useRef } from "react";
import { useWidget } from "@/entities/widget";
import { useEditor } from "@/features/editor";
import { IFrame } from "@/shared/ui/iframe/ui";
import { Frame } from "@/features/editor/ui/frame";
import { useRenderTemplate } from "@/features/editor/model/use-render-template";
import {
  PreviewActions,
  PreviewWrapper,
} from "@/features/editor/compose/preview-mode";
import { useHighlight } from "@/features/editor/model/use-highlight";
import { Highlight } from "@/features/editor/ui/highlight";

export const FrameViewer = () => {
  const { api } = useWidget();
  const { widgets } = useEditor();
  const { renderWidget } = useRenderTemplate();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const { onHoverElement, onSelectElement, hoverPositions, activePositions } =
    useHighlight(iframeRef);

  return (
    <Frame>
      <Frame.Actions>
        <PreviewActions />
      </Frame.Actions>
      <Frame.Content>
        <PreviewWrapper>
          <IFrame
            ref={iframeRef}
            injectCSS="/index.css"
            className="h-full w-full bg-white rounded-2xl shadow-lg "
          >
            {widgets.map((w) => (
              <div
                onMouseEnter={onHoverElement}
                key={w.id}
                data-widget-id={w.id}
                onClick={(e) => {
                  api.onSelectedWidgetId(w.id);
                  onSelectElement(e);
                }}
                dangerouslySetInnerHTML={{
                  __html: renderWidget(w.component, w.options),
                }}
              />
            ))}
            <Highlight {...hoverPositions} type="hover" />
            <Highlight {...activePositions} type="active" />
          </IFrame>
        </PreviewWrapper>
      </Frame.Content>
    </Frame>
  );
};

import React, { useRef } from "react";
import { useWidget } from "@/entities/widget";
import { useEditor } from "@/features/editor";
import { IFrame } from "@/shared/ui/iframe/ui";
import { Frame } from "@/features/editor/ui/frame";
import { useRenderTemplate } from "@/features/editor/model/use-render-template";
import { PreviewWrapper } from "@/features/editor/compose/preview-mode";

export const FrameViewer = () => {
  const { api } = useWidget();
  const { widgets } = useEditor();
  const { renderWidget } = useRenderTemplate();

  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <Frame>
      <Frame.Actions>actions</Frame.Actions>
      <Frame.Content>
        <PreviewWrapper>
          <IFrame
            ref={iframeRef}
            injectCSS="/index.css"
            className="w-full h-full bg-white rounded-2xl shadow-lg "
          >
            {widgets.map((w) => (
              <div
                key={w.id}
                data-widget-id={w.id}
                onClick={() => api.onSelectedWidgetId(w.id)}
                dangerouslySetInnerHTML={{
                  __html: renderWidget(w.component, w.options),
                }}
              />
            ))}
          </IFrame>
        </PreviewWrapper>
      </Frame.Content>
    </Frame>
  );
};

import React, { useRef } from "react";
import { useWidget } from "@/entities/widget";
import { ZoomWrapper } from "@/features/zoom";
import { useEditor } from "@/features/editor";
import { IFrame } from "@/shared/ui/iframe/ui";
import { Frame } from "@/features/editor/ui/frame";
import { useRenderTemplate } from "@/features/editor/model/use-render-template";
export const FrameViewer = () => {
  const { api } = useWidget();
  const { renderWidget } = useRenderTemplate();
  const { widgets } = useEditor();

  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <Frame>
      <Frame.Actions>actions</Frame.Actions>
      <Frame.Content>
        <ZoomWrapper>
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
        </ZoomWrapper>
      </Frame.Content>
    </Frame>
  );
};

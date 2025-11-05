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
  const { api, state } = useWidget();
  const { widgets, styles } = useEditor();
  const { renderWidget } = useRenderTemplate();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const { hoverHighlight, hoverPos, activePos } = useHighlights(
    iframeRef,
    state.selectedWidgetId,
  );

  console.log(state.selectedWidgetId);
  return (
    <Frame>
      <Frame.Content>
        <PreviewWrapper>
          <IFrame
            ref={iframeRef}
            injectCSS={styles}
            className="w-full h-full bg-white shadow-lg"
          >
            {widgets.map((w) => (
              <div
                key={w.id}
                data-widget-id={w.id}
                onClick={(e) => {
                  e.stopPropagation();
                  api.onSelectedWidgetId(w.id);
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

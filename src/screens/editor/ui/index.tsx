"use client";
import { useEffect, useRef } from "react";
import { IFrame } from "@/shared/components/iframe/ui";
import { Sidebar } from "@/widgets/sidebar";
import { WidgetEditorPanel } from "@/widgets/editor-panel";
import { mockFetchTemplates } from "@/shared/api/mock";
import { renderWidget } from "@/shared/lib/utils";
import { useEditor } from "@/entities/editor";
import { useWidget } from "@/entities/widget";
import { ZoomActions } from "@/features/zoom/ui";
import { useDeviceView } from "@/features/zoom";

export const Editor = () => {
  const { api } = useWidget();
  const { widgets, dispatch } = useEditor();
  const { width, scale } = useDeviceView();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    mockFetchTemplates()
      .then((items) => items[0].registry)
      .then((widgets) =>
        widgets.forEach((widget) =>
          dispatch({ type: "Widget.Added", payload: { widget } }),
        ),
      );
  }, []);

  return (
    <div className="flex p-2 gap-2 bg-secondary/10 h-dvh overflow-hidden">
      <Sidebar className="max-w-[20%]" />

      <div className="flex flex-col gap-2 w-full h-full relative overflow-hidden">
        <div className="bg-white rounded-2xl p-2 flex items-center gap-2 shadow-sm">
          <ZoomActions />
        </div>
        <div
          className="h-full w-full flex m-auto justify-center items-center grow transition-transform duration-300 ease-in-out"
          style={{
            width,
            transform: `scale(${scale})`,
            transformOrigin: "center center",
          }}
        >
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
        </div>
      </div>

      <WidgetEditorPanel className="max-w-[20%]" />
    </div>
  );
};

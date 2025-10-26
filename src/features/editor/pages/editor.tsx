"use client";

import { useEffect } from "react";
import { Widget } from "@/shared/types/template";
import { useEditor } from "@/features/editor/model/use-editor";
import { Editor } from "@/features/editor/ui/editor-headless";
import { EditorPanel } from "@/features/editor/compose/editor-panel";
import { FrameViewer } from "@/features/editor/compose/frame";
import { Sidebar } from "@/features/editor/compose/sidebar";

export const EditorPage = () => {
  const { dispatch } = useEditor();

  useEffect(() => {
    fetch(
      "https://sanity-web.s3.eu-north-1.amazonaws.com/templates-sources/templates/template-v1/pages.json",
    )
      .then((res) => res.json())
      .then((items) => items[0].registry)
      .then((widgets) => {
        widgets.forEach((widget: Widget) =>
          dispatch({ type: "Widget.Added", payload: { widget } }),
        );
      });
  }, []);

  return (
    <Editor
      editorPanel={<EditorPanel className="max-w-[20%]" />}
      frame={<FrameViewer />}
      sidebar={<Sidebar className="max-w-[20%]" />}
    />
  );
};

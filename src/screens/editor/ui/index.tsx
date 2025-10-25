"use client";

import {
  Editor,
  EditorPanel,
  FrameViewer,
  Sidebar,
  useEditor,
} from "@/features/editor";
import { useEffect } from "react";
import { Widget } from "@/shared/types/template";

export const EditorScreen = () => {
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

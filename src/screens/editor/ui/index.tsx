"use client";
import { useEffect } from "react";

import { mockFetchTemplates } from "@/shared/api/mock";

import {
  Editor,
  EditorPanel,
  FrameViewer,
  Sidebar,
  useEditor,
} from "@/features/editor";

export const EditorScreen = () => {
  const { dispatch } = useEditor();

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
    <Editor
      editorPanel={<EditorPanel className="max-w-[20%]" />}
      frame={<FrameViewer />}
      sidebar={<Sidebar className="max-w-[20%]" />}
    />
  );
};

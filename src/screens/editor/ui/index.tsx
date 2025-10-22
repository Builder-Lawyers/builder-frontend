"use client";
import { useEffect } from "react";
import { SidebarWidget } from "@/widgets/sidebar";
import { mockFetchTemplates } from "@/shared/api/mock";
import { Editor, useEditor } from "@/features/editor";
import { EditorPanelWidget } from "@/widgets/editor-panel";
import { FrameWidget } from "@/widgets/frame";


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
      editorPanel={<EditorPanelWidget className="max-w-[20%]" />}
      frame={<FrameWidget />}
      sidebar={<SidebarWidget className="max-w-[20%]" />}
    />
  );
};

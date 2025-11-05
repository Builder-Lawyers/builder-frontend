"use client";

import { useEditor } from "@/features/editor/model/use-editor";
import { Editor } from "@/features/editor/ui/editor-headless";
import { EditorPanel } from "@/features/editor/compose/editor-panel";
import { FrameViewer } from "@/features/editor/compose/frame";
import { Sidebar } from "@/features/editor/compose/sidebar";
import { useTemplateLoader } from "@/features/editor/model/use-template-loader";

interface EditorPageProps {
  id: number;
}

export const EditorPage = ({ id }: EditorPageProps) => {
  const { dispatch } = useEditor();

  const { isLoading } = useTemplateLoader({
    id: id || 1,
    onLoad: (pages) => {
      dispatch({ type: "Pages.Set", payload: { pages } });
      dispatch({
        type: "Page.SetActive",
        payload: {
          label: "Home",
        },
      });
    },
    onUnload: () => {
      dispatch({ type: "Pages.Reset" });
    },
  });

  return (
    !isLoading && (
      <Editor
        editorPanel={<EditorPanel />}
        frame={<FrameViewer />}
        sidebar={<Sidebar />}
      />
    )
  );
};

"use client";

import { useEditor } from "@/features/editor/model/use-editor";
import { Editor } from "@/features/editor/ui/editor-headless";
import { EditorPanel } from "@/features/editor/compose/editor-panel";
import { FrameViewer } from "@/features/editor/compose/frame";
import { Sidebar } from "@/features/editor/compose/sidebar";
import { useTemplateLoader } from "@/features/editor/model/use-template-loader";
import { useWidget } from "@/features/editor/model/use-widget";

interface EditorPageProps {
  id: number;
}

export const EditorPage = ({ id }: EditorPageProps) => {
  const { dispatch } = useEditor();
  const { api, state } = useWidget();

  console.log(state);
  const { isLoading } = useTemplateLoader({
    id: id || 1,
    onLoad: (pages, styles) => {
      dispatch({ type: "Pages.Set", payload: { pages } });
      dispatch({
        type: "Page.SetStyles",
        payload: {
          styles: styles,
        },
      });
      dispatch({
        type: "Page.SetActive",
        payload: {
          label: "Home",
        },
      });
    },
    onUnload: () => {
      api.resetSelectedWidget();
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

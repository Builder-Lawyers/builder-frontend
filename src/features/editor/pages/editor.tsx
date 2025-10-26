"use client";

import { useEditor } from "@/features/editor/model/use-editor";
import { Editor } from "@/features/editor/ui/editor-headless";
import { EditorPanel } from "@/features/editor/compose/editor-panel";
import { FrameViewer } from "@/features/editor/compose/frame";
import { Sidebar } from "@/features/editor/compose/sidebar";
import { useGetTemplate } from "@/features/editor/model/use-get-template";
import { useEditorPages } from "@/features/editor/model/use-editor-pages";

interface EditorPageProps {
  id: number;
}

export const EditorPage = ({ id }: EditorPageProps) => {
  const { dispatch } = useEditor();
  const { setPagesList } = useEditorPages();

  useGetTemplate({
    id,
    action: (pages) => {
      pages.map((page) => {
        setPagesList(page.label);
      });
    },
  });

  return (
    <Editor
      editorPanel={<EditorPanel />}
      frame={<FrameViewer />}
      sidebar={<Sidebar />}
    />
  );
};

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
  const { setPagesList, activePage, pages, switchPage } = useEditorPages();

  useGetTemplate({
    id,
    dep: activePage,
    action: (pages) => {
      const labels = pages.map((page) => page.label);
      setPagesList({ labels });

      const widgets = pages[0].registry;

      widgets.forEach((widget) => {
        dispatch({
          type: "Widget.Added",
          payload: {
            widget,
          },
        });
      });
    },
  });

  return (
    <Editor
      editorPanel={<EditorPanel />}
      frame={<FrameViewer />}
      sidebar={<Sidebar setActivePage={() => switchPage} pages={pages} />}
    />
  );
};

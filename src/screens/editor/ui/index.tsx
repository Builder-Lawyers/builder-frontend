"use client";
import { Frame } from "@/widgets/frame";
import { Editor } from "@/entities/editor";
import { EditorSidebar } from "@/widgets/sidebar-editor";
import { mockFetch } from "@/shared/api";
import { useUnit } from "effector-react";
import { $pagesJson, getPagesJson } from "@/entities/editor/model";
import { useEffect } from "react";
import { $isPreviewMode } from "@/features/editor/preview";

export const EditorPage = () => {
  const [json, onGetPagesJson] = useUnit([$pagesJson, getPagesJson]);
  const [isPreviewMode] = useUnit([$isPreviewMode]);

  useEffect(() => {
    mockFetch("/api/pages")
      .then((res) => res.json())
      .then((json) => onGetPagesJson(json));
  }, []);

  return (
    json && (
      <Editor
        sidebar={!isPreviewMode && <EditorSidebar />}
        editor={<Frame json={json} src={"/template"} />}
      />
    )
  );
};

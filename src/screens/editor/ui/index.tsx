"use client";

import { Editor } from "@/entities/editor";
import { FramePreview } from "@/widgets/frame";
import { Sidebar } from "@/widgets/sidebar";

export const EditorPage = () => {
  return <Editor sidebar={<Sidebar />} editor={<FramePreview />} />;
};

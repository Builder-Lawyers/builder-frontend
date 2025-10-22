import { ReactNode } from "react";

interface EditorProps {
  editorPanel: ReactNode;
  frame: ReactNode;
  sidebar: ReactNode;
}

export const Editor = ({ sidebar, editorPanel, frame }: EditorProps) => {
  return (
    <div className="flex p-2 gap-2 bg-secondary/10 h-dvh overflow-hidden">
      {sidebar}
      {frame}
      {editorPanel}
    </div>
  );
};

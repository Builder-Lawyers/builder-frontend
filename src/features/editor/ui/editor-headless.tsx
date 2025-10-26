import { ReactNode } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/shared/ui/resizable";

interface EditorProps {
  editorPanel: ReactNode;
  frame: ReactNode;
  sidebar: ReactNode;
}

export const Editor = ({ sidebar, editorPanel, frame }: EditorProps) => {
  return (
    <ResizablePanelGroup
      className="flex p-2 gap-1 grow bg-secondary/10 min-h-dvh"
      direction="horizontal"
    >
      <ResizablePanel minSize={10} maxSize={20} defaultSize={15}>
        {sidebar}
      </ResizablePanel>
      <ResizableHandle className="opacity-0" />
      <ResizablePanel defaultSize={70}>{frame}</ResizablePanel>
      <ResizableHandle className="opacity-0" />
      <ResizablePanel minSize={10} maxSize={20} defaultSize={15}>
        {editorPanel}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

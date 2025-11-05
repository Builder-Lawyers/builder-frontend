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
      className="flex gap-1 w-full grow min-h-dvh"
      direction="horizontal"
    >
      <ResizablePanel minSize={10} maxSize={20} defaultSize={15}>
        {sidebar}
      </ResizablePanel>
      <ResizableHandle className="opacity-0" />
      <ResizablePanel defaultSize={70}>{frame}</ResizablePanel>
      <ResizableHandle className="opacity-0" />
      <ResizablePanel minSize={0} maxSize={20} defaultSize={0}>
        {editorPanel}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

import React, { JSX, ReactNode } from "react";

interface FrameActionsProps {
  children: ReactNode;
}
const FrameActions: React.FC<FrameActionsProps> = ({ children }) => (
  <div className="bg-white rounded-2xl p-2 flex items-center gap-2 shadow-sm">
    {children}
  </div>
);

interface FrameContentProps {
  children: ReactNode;
}
const FrameContent: React.FC<FrameContentProps> = ({ children }) => (
  <div className="h-full w-full flex justify-center items-center grow">
    {children}
  </div>
);

interface FrameProps {
  children: ReactNode;
}

interface FrameCompound {
  (props: FrameProps): JSX.Element;
  Actions: typeof FrameActions;
  Content: typeof FrameContent;
}

export const Frame = (({ children }: FrameProps) => {
  return (
    <div className="flex flex-col gap-2 w-full h-full relative overflow-hidden">
      {children}
    </div>
  );
}) as FrameCompound;

Frame.Actions = FrameActions;
Frame.Content = FrameContent;

import { ReactNode } from "react";

interface Props {
  editor: ReactNode;
  sidebar?: ReactNode;
}

export const Editor = ({ editor, sidebar }: Props) => {
  return (
    <div className="flex h-[calc(100dvh-64px)] w-full grow rounded">
      {sidebar}
      {editor}
    </div>
  );
};

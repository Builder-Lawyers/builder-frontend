import { ReactNode } from "react";

interface TemplatesListProps {
  children: ReactNode;
}

export const TemplatesListHeadless = ({ children }: TemplatesListProps) => {
  return <div></div>;
};

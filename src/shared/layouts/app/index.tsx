import type { ReactNode } from "react";

interface Props {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

export const AppLayout = ({ children, header, footer }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      {header}
      <div className="flex-grow">{children}</div>
      {footer}
      <div className="z-10" id="modal-root" />
    </div>
  );
};

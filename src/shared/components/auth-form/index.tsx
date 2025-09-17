import { CenteringLayout } from "@/shared/layouts/centering";
import { ReactNode } from "react";

interface Props {
  form: ReactNode;
  widget?: ReactNode;
}

export const AuthForm = ({ form, widget }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <CenteringLayout
        forPage={false}
        className="flex h-[100dvh] justify-between gap-[12px] p-2 w-full"
      >
        <div className="flex bg-black/5 p-[48px] rounded-[16px] gap-[12px] h-full w-full flex-col">
          {widget}
        </div>
        <div className="w-full flex justify-center w-full max-w-[900px]">
          {form}
        </div>
      </CenteringLayout>
    </div>
  );
};

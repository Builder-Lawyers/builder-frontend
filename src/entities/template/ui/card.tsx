import { ComponentProps, ReactNode } from "react";
import Image from "next/image";

export interface TemplateCardProps extends ComponentProps<"div"> {
  image?: string;
  title: string;
  actions?: ReactNode;
  id: string;
}

export const TemplateCard = ({
  image,
  title,
  actions,
  ...rest
}: TemplateCardProps) => {
  return (
    <div className="flex flex-col max-w-[350px]  w-full " {...rest}>
      {image ? (
        <Image src={""} alt={"dsa"} className="rounded-2xl" />
      ) : (
        <div className="h-[200px] rounded-t-2xl bg-gray-200 w-[full]" />
      )}
      <div className="flex bg-white rounded-b-2xl p-2 border border-sidebar-border border-t-0 flex-col gap-2 w-[350px] ">
        <h1 className="capitalize">{title}</h1>
        {actions}
      </div>
    </div>
  );
};

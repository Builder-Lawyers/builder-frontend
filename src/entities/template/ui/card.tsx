import { ComponentProps, ReactNode } from "react";
import Image from "next/image";

export interface TemplateCardProps extends ComponentProps<"div"> {
  image?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  id: string;
}

export const TemplateCard = ({
  image,
  description,
  title,
  actions,
  ...rest
}: TemplateCardProps) => {
  return (
    <div
      className="flex flex-col max-w-[350px] max-h-[350px] h-full w-full overflow-clip"
      {...rest}
    >
      {image ? (
        <Image src={""} alt={"dsa"} className="rounded-2xl" />
      ) : (
        <div className="h-[200px] rounded-t-2xl bg-gray-200 w-[full]" />
      )}
      <div className="flex bg-white rounded-b-2xl justify-between border border-sidebar-border border-t-0 flex-col h-[180px] w-[350px] gap-4 p-4">
        <h1 className="capitalize">{title}</h1>
        {description}
        <p className="text-foreground/60">description</p>
        <div className="flex w-full h-[1px] rounded-md bg-sidebar-border" />
        {actions}
      </div>
    </div>
  );
};

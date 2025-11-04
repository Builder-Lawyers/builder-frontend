import { ComponentProps } from "react";
import Image from "next/image";
import { Button } from "@/shared/ui/button";

export interface TemplateCardProps extends ComponentProps<"div"> {
  image?: string;
  title: string;
  description?: string;
  onButtonClick?: () => void;
  id: string;
}

export const TemplateCard = ({
  image,
  description,
  title,
  onButtonClick,
  ...rest
}: TemplateCardProps) => {
  return (
    <div
      className="flex flex-col rounded-2xl max-w-[350px] overflow-clip border border-foreground/10"
      {...rest}
    >
      {image ? (
        <Image src={""} alt={"dsa"} />
      ) : (
        <div className="h-[200px] bg-gray-200 w-[full]" />
      )}
      <div className="flex flex-col gap-4 p-4">
        {title}
        {description}
        <Button onClick={onButtonClick} size="link" variant="link">
          Select template
        </Button>
      </div>
    </div>
  );
};

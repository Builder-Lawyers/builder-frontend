import { ComponentProps } from "react";

interface TemplateCardProps extends ComponentProps<"div"> {
  image: string;
  title: string;
  description: string;
  id: string;
}

export const TemplateCard = ({ title, ...rest }: TemplateCardProps) => {
  return <div {...rest}>{title}</div>;
};

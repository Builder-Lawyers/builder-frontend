import React from "react";
import { cn, getChildByType } from "@/shared/lib/utils";
import { AuthForm, BaseProps } from "@/features/auth/ui/form";

export const Title = ({ children }: BaseProps) => (
  <h1 className="text-2xl font-bold text-center">{children}</h1>
);

export const Subtitle = ({ children, className }: BaseProps) => (
  <p className={cn("text-foreground/60 text-center", className)}>{children}</p>
);

export const Header = ({ children }: BaseProps) => {
  const title = getChildByType(children, AuthForm.Title);
  const subtitle = getChildByType(children, AuthForm.Subtitle);

  return (
    <div className="flex flex-col gap-2 text-center mb-4">
      {title}
      {subtitle}
    </div>
  );
};

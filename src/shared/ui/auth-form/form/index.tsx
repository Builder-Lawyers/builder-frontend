import React from "react";
import { getChildByType } from "@/shared/lib/utils";

import { AuthForm, BaseProps } from "@/shared/ui/auth-form";

export const Title = ({ children }: BaseProps) => (
  <h1 className="text-2xl font-bold text-center">{children}</h1>
);

export const Subtitle = ({ children }: BaseProps) => (
  <p className="text-muted-foreground text-center">{children}</p>
);

export const Header = ({ children }: BaseProps) => {
  const title = getChildByType(children, AuthForm.Title);
  const subtitle = getChildByType(children, AuthForm.Subtitle);

  return (
    <div className="flex flex-col gap-1 text-center mb-4">
      {title}
      {subtitle}
    </div>
  );
};

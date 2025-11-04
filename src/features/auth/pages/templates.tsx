import { useTemplates } from "@/features/auth/model/use-templates";
import { cn } from "@/shared/lib/utils";
import React from "react";

export const ChooseTemplatePage = () => {
  const {} = useTemplates();
  return (
    <div className={cn("flex p-4 h-screen ")}>
      <div className="w-[30%] h-full md:flex hidden grow flex-1/4 bg-accent rounded-xl" />
      <div className="flex-1/2">dsa</div>
    </div>
  );
};

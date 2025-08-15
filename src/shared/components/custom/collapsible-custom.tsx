import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible";
import { ChevronDown, LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

export const CollapsibleCustom = ({
  title,
  icon: Icon,
  children,
  titleClassName,
  className,
}: {
  title: string;
  icon?: LucideIcon;
  titleClassName?: string;
  children: ReactNode;
  className?: string;
}) => (
  <Collapsible className={className}>
    <CollapsibleTrigger className="group cursor-pointer flex w-full items-center justify-between py-2">
      <h3
        className={cn(
          titleClassName,
          "flex items-center gap-2 text-sm font-semibold",
        )}
      >
        {!!Icon && <Icon className="h-5 w-5" />} {title}
      </h3>
      <ChevronDown className="h-4 w-4 group-data-[state=open]:rotate-180 transition-transform text-muted-foreground" />
    </CollapsibleTrigger>
    <CollapsibleContent className=" pb-3">{children}</CollapsibleContent>
  </Collapsible>
);

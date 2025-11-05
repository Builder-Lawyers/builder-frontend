import { TemplateCard, TemplatesListHeadless } from "@/entities/template";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { routes } from "@/shared/configs/router";

export const TemplatesDashboardPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <TemplatesListHeadless>
        <TemplateCard
          actions={
            <div className="flex w-full gap-2">
              <Button variant="bordered">Preview</Button>
              <Link
                className="w-full flex flex-1"
                href={routes.dashboard.editor("1")}
              >
                <Button className="flex-1">Get Started</Button>
              </Link>
            </div>
          }
          title={"dsads"}
          id={"1"}
        />
      </TemplatesListHeadless>
    </div>
  );
};

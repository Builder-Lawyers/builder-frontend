import { TemplateCard, TemplatesListHeadless } from "@/entities/template";
import { Button } from "@/shared/ui/button";

export const TemplatesDashboardPage = () => {
  return (
    <div className="flex flex-col gap-6 px-2 py-6">
      <h1 className="text-3xl uppercase">Popular templates</h1>
      <TemplatesListHeadless>
        <TemplateCard
          actions={
            <div className="flex gap-2">
              <Button variant="bordered">Preview</Button>
              <Button className="flex-1">Get Started</Button>
            </div>
          }
          title={"dsads"}
          id={"1"}
        />
      </TemplatesListHeadless>
    </div>
  );
};

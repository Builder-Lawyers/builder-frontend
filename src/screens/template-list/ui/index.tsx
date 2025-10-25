import { TemplatesList } from "@/features/templates";
import { PageLayout } from "@/shared/layouts/page";

export const TemplatesListPage = () => {
  return (
    <PageLayout>
      Templates
      <TemplatesList />
    </PageLayout>
  );
};

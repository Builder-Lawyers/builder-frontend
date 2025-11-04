"use client";

import { PageLayout } from "@/shared/layouts/page";

import { TemplateCard, TemplatesListHeadless } from "@/entities/template";

export const TemplatesPage = () => {
  return (
    <PageLayout className="px-[48px]">
      <TemplatesListHeadless>
        <TemplateCard title={"32132"} id={"1"} />
      </TemplatesListHeadless>
    </PageLayout>
  );
};

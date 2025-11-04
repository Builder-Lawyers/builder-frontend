"use client";

import { PageLayout } from "@/shared/layouts/page";

import { redirect } from "next/navigation";
import { TemplateCard, TemplatesListHeadless } from "@/entities/template";

export const TemplatesPage = () => {
  return (
    <PageLayout className="px-[48px]">
      <TemplatesListHeadless>
        <TemplateCard
          onButtonClick={() => {
            redirect("/editor/1");
          }}
          title={"32132"}
          id={"1"}
        />
      </TemplatesListHeadless>
    </PageLayout>
  );
};

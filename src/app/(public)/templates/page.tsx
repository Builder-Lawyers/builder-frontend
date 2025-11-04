import { listTemplates } from "@/shared/api/templates/templates";
import { TemplatesPage } from "@/features/templates/pages";

export default function Page() {
  listTemplates({}).then((templates) => {
    console.log(templates);
  });

  return <TemplatesPage />;
}

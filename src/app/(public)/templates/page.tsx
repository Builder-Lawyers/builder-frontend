import { listTemplates } from "@/shared/api/templates/templates";

export default function Page() {
  listTemplates({}).then((templates) => {
    console.log(templates);
  });

  return <div></div>;
}

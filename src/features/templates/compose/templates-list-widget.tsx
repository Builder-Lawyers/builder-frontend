import { TemplatesListHeadless } from "@/features/templates/ui/template-list";
import { TemplateCard } from "@/features/templates/ui/card";

const cards = [
  { image: "string", title: "string", description: "string", id: "321" },
];
export const TemplatesList = () => {
  return (
    <TemplatesListHeadless>
      {cards.map((card) => (
        <TemplateCard key={card.id} {...card} />
      ))}
    </TemplatesListHeadless>
  );
};

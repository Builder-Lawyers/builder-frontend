import { useEffect } from "react";
import { getTemplate } from "@/shared/api/templates/templates";
import { Pages } from "@/shared/types/template";

interface UseGetTemplateProps {
  id: number;
  action: (pages: Pages[]) => void;
}
export const useGetTemplate = ({ id, action }: UseGetTemplateProps) => {
  useEffect(() => {
    getTemplate(id).then((templateMeta) => {
      if (templateMeta.status === 200) {
        fetch(templateMeta.data.structure)
          .then((res) => {
            return res.json();
          })
          .then((result: Pages[]) => {
            action(result);
          });
      }
    });
  }, []);
};

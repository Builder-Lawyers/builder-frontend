import { getTemplate } from "@/shared/api/templates/templates";
import { Pages } from "@/shared/types/template";
import { useLayoutEffect } from "react";

interface UseGetTemplateProps {
  id: number;
  action: (pages: Pages[]) => void;
  dep: string;
}
export const useGetTemplate = ({ id, action, dep }: UseGetTemplateProps) => {
  useLayoutEffect(() => {
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
  }, [dep]);
};

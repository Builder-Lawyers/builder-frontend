"use client";

import { useLayoutEffect } from "react";
import { getTemplate } from "@/shared/api/templates/templates";
import type { Pages } from "@/shared/types/template";

interface UseLoadTemplateParams {
  templateId: number;
  onPagesLoaded: (pages: Pages[]) => void;
  onCssLoaded?: (css: string) => void;
  onReset?: () => void;
  deps?: unknown[];
}

export const useLoadTemplate = ({
  templateId,
  onPagesLoaded,
  onCssLoaded,
  onReset,
  deps = [],
}: UseLoadTemplateParams) => {
  useLayoutEffect(() => {
    let isMounted = true;

    const fetchTemplate = async () => {
      try {
        const templateRes = await getTemplate(templateId);
        if (templateRes.status !== 200) return;

        const { styles, structure } = templateRes.data;

        const [cssText, pagesJson] = await Promise.all([
          fetch(styles).then((res) => res.text()),
          fetch(structure).then((res) => res.json() as Promise<Pages[]>),
        ]);

        if (!isMounted) return;

        onCssLoaded?.(cssText);
        onPagesLoaded(pagesJson);
      } catch (err) {
        console.error("useLoadTemplate error:", err);
      }
    };

    void fetchTemplate();
    return () => {
      isMounted = false;
      onReset?.();
    };
  }, [templateId, ...deps]);
};

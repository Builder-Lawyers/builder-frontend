import { useEffect, useState } from "react";
import { getTemplate } from "@/shared/api/templates/templates";
import { Pages } from "@/shared/types/template";

interface UseTemplateLoaderProps {
  id: number;
  onLoad?: (pages: Pages[]) => void;
  onUnload?: () => void;
  deps?: unknown[];
}

export const useTemplateLoader = ({
  id,
  onLoad,
  onUnload,
  deps = [],
}: UseTemplateLoaderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let cancelled = false;

    const loadTemplate = async () => {
      try {
        setIsLoading(true);
        const meta = await getTemplate(id);
        if (meta.status !== 200) throw new Error("Failed to load template");

        const response = await fetch(meta.data.structure);
        const json = (await response.json()) as Pages[];

        if (!cancelled) {
          onLoad?.(json);
        }
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void loadTemplate();
    return () => {
      onUnload?.();
      cancelled = true;
    };
  }, [id, ...deps]);

  return { isLoading, error };
};

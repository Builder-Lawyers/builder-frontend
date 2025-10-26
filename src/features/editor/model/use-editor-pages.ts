import { useState } from "react";

export const useEditorPages = () => {
  const [activePage, setActivePage] = useState<string>("");
  const [pages, setPages] = useState<string[]>([]);

  const setPagesList = ({ labels }: { labels: Array<string> }) => {
    setPages(labels);
  };

  const switchPage = ({ label }: { label: string }) => {
    setActivePage(label);
  };

  return { setPagesList, switchPage, activePage, pages };
};

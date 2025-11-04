import { useState } from "react";

export const useTemplateStyles = () => {
  const [styles, setStyles] = useState("");

  return { styles, setStyles };
};

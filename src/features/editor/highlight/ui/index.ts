export interface HighlightProps {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
  scrollX?: number;
  scrollY?: number;
  display: string;
}

type Position = "top" | "bottom";

export const sectionInfo = (doc: Document, position?: Position) => {
  const sectionDiv = doc.createElement("div");
  const sectionP = doc.createElement("p");

  if (position === "top") {
    sectionDiv.style.top = "-24px";
  } else {
    sectionDiv.style.bottom = "-24px";
  }

  Object.assign(sectionDiv.style, {
    color: "white",
    pointerEvents: "pointer",
    display: "flex",
    zIndex: "9999",
    gap: "8px",
    position: "absolute",
    padding: "0px 12px",
    backgroundColor: "rgb(73,127,255)",
    borderRadius: "2px",
  });

  sectionDiv.appendChild(sectionP);

  const setActiveSection = (section?: string) => {
    sectionP.innerText = section || "";
  };
  return { sectionDiv, setActiveSection };
};

export const highlightBox = (doc: Document) => {
  const box = doc.createElement("div");

  Object.assign(box.style, {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    scrollX: 0,
    scrollY: 0,
    position: "absolute",
    pointerEvents: "none",
    border: "2px solid rgb(73,127,255)",
    borderRadius: "2px",
    transition: "all 0.2s ease",
    zIndex: "9999",
    display: "none",
    boxSizing: "border-box",
  });

  box.className = "highlight-box";

  const update = ({
    top = 0,
    left = 0,
    width = 0,
    height = 0,
    scrollX = 0,
    scrollY = 0,
    display,
  }: HighlightProps) => {
    box.style.width = `${width}px`;
    box.style.height = `${height}px`;
    box.style.left = `${left + scrollX}px`;
    box.style.top = `${top + scrollY}px`;
    box.style.display = display;
  };

  return { box, update };
};

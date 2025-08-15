import { Attributes } from "@/shared/types";
import { HighlightProps, highlightBox, sectionInfo } from "../ui";

let hoverBoxInstance: {
  box: HTMLDivElement;
  update: (props: HighlightProps) => void;
  setActiveSection: (section?: string) => void;
} | null = null;

let frameScheduled = false;

let lastArgs: [HTMLElement, HTMLIFrameElement] | null = null;

export const hoverHighlight = (
  target: HTMLElement,
  iframe: HTMLIFrameElement,
) => {
  const doc = iframe.contentDocument;
  const win = iframe.contentWindow;

  if (!doc || !win) return;

  if (
    !hoverBoxInstance ||
    hoverBoxInstance.box.ownerDocument !== iframe.contentDocument
  ) {
    if (hoverBoxInstance) {
      hoverBoxInstance.box.remove();
      hoverBoxInstance = null;
    }

    if (!doc.body) return;

    const { box, update } = highlightBox(doc);
    doc.body.appendChild(box);

    hoverBoxInstance = { box, update, setActiveSection: () => {} };
  }

  const { update } = hoverBoxInstance;
  const elementToHighlight = target;

  const closest =
    elementToHighlight.closest(Attributes.widgetProps) ||
    elementToHighlight.closest(Attributes.widgetId);

  if (closest) {
    const rect = closest.getBoundingClientRect();

    update({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      scrollX: win.scrollX,
      scrollY: win.scrollY,
      display: "block",
    });

    const position: "top" | "bottom" = rect.top < 24 ? "bottom" : "top";

    const { sectionDiv, setActiveSection } = sectionInfo(doc, position);

    const oldSectionDiv = hoverBoxInstance.box.querySelector(".section-info");
    if (oldSectionDiv) oldSectionDiv.remove();

    sectionDiv.classList.add("section-info");
    hoverBoxInstance.box.appendChild(sectionDiv);
    hoverBoxInstance.setActiveSection = setActiveSection;

    setActiveSection(
      closest.getAttribute(Attributes.widgetId_without) ||
        closest.getAttribute(Attributes.widgetProps_without) ||
        "",
    );
  } else {
    update({ display: "none" });
    hoverBoxInstance.setActiveSection?.("");
  }
};

let lastHoveredElement: HTMLElement | null = null;

export const highlightInit = (
  target: HTMLElement,
  iframe: HTMLIFrameElement,
  enabled = true,
) => {
  if (!enabled) return;
  if (target === lastHoveredElement) return;

  lastHoveredElement = target;
  lastArgs = [target, iframe];

  if (!frameScheduled) {
    frameScheduled = true;

    requestAnimationFrame(() => {
      if (lastArgs) {
        hoverHighlight(lastArgs[0], lastArgs[1]);
        lastArgs = null;
      }
      frameScheduled = false;
    });
  }
};

export const resetHighlight = () => {
  if (hoverBoxInstance) {
    hoverBoxInstance.box.remove();
    hoverBoxInstance = null;
  }
  lastHoveredElement = null;
  lastArgs = null;
  frameScheduled = false;
};

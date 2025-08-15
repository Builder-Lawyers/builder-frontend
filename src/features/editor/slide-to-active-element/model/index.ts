export const scrollToActiveElement = (
  iframe: HTMLIFrameElement,
  element: HTMLElement,
) => {
  const iframeWindow = iframe.contentWindow;
  const iframeDocument = iframe.contentDocument;

  if (!iframeWindow || !iframeDocument) return;

  const scrollX =
    element.offsetLeft - iframe.clientWidth / 2 + element.clientWidth / 2;

  const scrollY =
    element.offsetTop - iframe.clientHeight / 2 + element.clientHeight / 2;

  iframeWindow.scrollTo({
    left: scrollX,
    top: scrollY,
    behavior: "smooth",
  });
};

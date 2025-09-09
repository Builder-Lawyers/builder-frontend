function u(t) {
  const r = typeof t;
  return r === "string" || r === "number" || r === "boolean";
}
function p(t) {
  const r = f(t);
  for (const n of r) {
    const e = n?.props?.id;
    if (!e) continue;
    const i = document.querySelector(`[data-widget-id="${e}"]`);
    if (!i) continue;
    Array.from(i.querySelectorAll("[data-prop]"))
      .filter((o) => !o.querySelector("[data-prop]"))
      .forEach((o) => a(o, n.props));
  }
}
function a(t, r) {
  const n = t.getAttribute("data-prop");
  if (!n) return;
  const e = c(r, n);
  if (e === void 0) return;
  const i = t.getAttribute("data-attr"),
    s = t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement;
  if (i) {
    if (!u(e)) return;
    t.setAttribute(i, String(e));
    return;
  }
  if (s) {
    if (!u(e)) return;
    t.value = String(e);
    return;
  }
  u(e) &&
    ((t.children && t.children.length > 0) || (t.textContent = String(e)));
}
function c(t, r) {
  return r?.split(".").reduce((n, e) => {
    if (n == null) return;
    const i = Number.isNaN(Number(e)) ? e : Number(e);
    return n[i];
  }, t);
}
function f(t) {
  const r = t.global?.props?.widgets ?? [],
    n = t.pages?.flatMap((e) => e.widgets ?? []) ?? [];
  return [...r, ...n];
}
export { p as s };

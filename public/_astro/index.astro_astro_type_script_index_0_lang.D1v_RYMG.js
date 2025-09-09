import { s as n } from "./syncWithProps.Dxp845QC.js";
window.parent !== window &&
  (console.log("[edit.js] Edit mode enabled"),
  window.addEventListener("message", (o) => {
    console.log("[edit.js] Edit mode enabled");
    const { json: s, type: e } = o.data;
    if (!["http://localhost:3000"].includes(o.origin)) {
      console.warn("Blocked message from origin", o.origin);
      return;
    }
    e === "sync-json" &&
      (console.log("[edit.js] Received sync-json message"), n(s));
  }));

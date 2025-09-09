import { s as n } from "./syncWithProps.Dxp845QC.js";
console.log("[edit.js] RUNNING DIRECT INLINE SCRIPT");
window.parent !== window &&
  (console.log("[edit.js] Edit mode enabled"),
  window.addEventListener("message", (e) => {
    console.log("[edit.js] message received");
    const { json: s, type: o } = e.data;
    o === "sync-json" &&
      (console.log("[edit.js] Received sync-json message"), n(s));
  }));

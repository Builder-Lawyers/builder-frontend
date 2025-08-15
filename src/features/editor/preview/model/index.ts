import { createEvent, createStore } from "effector";

const togglePreviewMode = createEvent();
const $isPreviewMode = createStore(false).on(
  togglePreviewMode,
  (state) => !state,
);

export { $isPreviewMode, togglePreviewMode };

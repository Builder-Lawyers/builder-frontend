import { createEvent, createStore } from "effector";

const ZOOM_STEP = 0.1;

enum ZOOM {
  MIN = 0.35,
  MAX = 1.2,
  DEFAULT = 1,
}

const zoomIn = createEvent();
const zoomOut = createEvent();
const setScale = createEvent<ZOOM>();

const $scale = createStore<number>(ZOOM.DEFAULT);

$scale.on(zoomIn, (scale) => (scale <= ZOOM.MAX ? scale + ZOOM_STEP : scale));
$scale.on(zoomOut, (scale) => (scale >= ZOOM.MIN ? scale - ZOOM_STEP : scale));
$scale.on(setScale, (_, scale) => scale);

export { zoomIn, zoomOut, setScale, $scale, ZOOM };

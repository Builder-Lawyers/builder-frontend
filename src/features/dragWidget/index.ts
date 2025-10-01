import { useCallback, useRef } from "react";

export const useDragWidget = () => {
  const coordsRef = useRef<{ x: number; y: number } | null>(null);

  const setDraggingCoordinates = useCallback(
    (coords: { x: number; y: number } | null) => {
      coordsRef.current = coords;
    },
    [],
  );

  return {
    setDraggingCoordinates,
    coordsRef,
  };
};

export interface HighlightProps {
  isActive?: boolean;
  coordinates?: {
    x: number;
    y: number;
  };
  height?: number;
  width?: number;
}

export const Highlight = ({
  isActive,
  height,
  coordinates,
  width,
}: HighlightProps) => {
  return (
    <div
      style={{
        borderRadius: 4,
        transition: "all 100ms ease",
        pointerEvents: "none",
        display: isActive ? "block" : "none",
        position: "absolute",
        top: coordinates?.y,
        left: coordinates?.x,
        height: height,
        width: width,
        border: "2px solid blue",
      }}
    />
  );
};

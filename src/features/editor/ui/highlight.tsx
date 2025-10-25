export interface HighlightProps {
  top: number;
  left: number;
  width: number;
  height: number;
}

export const Highlight = ({
  top,
  left,
  width,
  height,
  type = "hover",
}: HighlightProps & { type?: "hover" | "active" }) => {
  const color = (type === "active" && "rgba(0, 140, 255, 0.1)") || "";

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width,
        height,
        pointerEvents: "none",
        border: " 2px solid rgba(0, 140, 255, 0.9)",
        background: color,
        borderRadius: 4,
        boxSizing: "border-box",
        transition: "all 0.05s ease-out",
      }}
    />
  );
};

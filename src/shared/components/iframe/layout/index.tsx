import { ReactNode, CSSProperties } from "react";

interface IFrameLayoutProps {
  children: ReactNode;
  style?: CSSProperties;
}

export const IFrameLayout = ({ children, style }: IFrameLayoutProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          maxWidth: "1280px",
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
};

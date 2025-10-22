import {
  devicePresets,
  useDeviceView,
  type Device,
} from "@/features/zoom/model";
import { ReactNode } from "react";
import { Button } from "@/shared/ui/button";

export const ZoomActions = () => {
  const { api, device } = useDeviceView();

  return (
    <div className="flex gap-2">
      {(Object.keys(devicePresets) as Device[]).map((d) => (
        <Button
          key={d}
          onClick={() => api.setDevice(d)}
          variant={device === d ? "default" : "bordered"}
        >
          {d}
        </Button>
      ))}
    </div>
  );
};

export const ZoomWrapper = ({ children }: { children: ReactNode }) => {
  const { width, scale } = useDeviceView();
  return (
    <div
      className="h-full w-full flex m-auto justify-center items-center grow transition-transform duration-300 ease-in-out"
      style={{
        width,
        transform: `scale(${scale})`,
        transformOrigin: "center center",
      }}
    >
      {children}
    </div>
  );
};

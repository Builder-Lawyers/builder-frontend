import {
  devicePresets,
  useDeviceView,
  type Device,
} from "@/features/zoom/model";
import { Button } from "@/shared/components/ui/button";

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

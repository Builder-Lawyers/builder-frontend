import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Device = "desktop" | "phone";

export const devicePresets: Record<
  Device,
  { width: string | number; scale: number }
> = {
  desktop: { width: "100%", scale: 1 },
  phone: { width: 390, scale: 1 },
};

interface Api {
  setDevice: (device: Device) => void;
  resetDevice: () => void;
  setCustomWidth: (width: string | number) => void;
  setScale: (scale: number) => void;
}

interface DeviceViewModel {
  device: Device;
  width: string | number;
  scale: number;
  api: Api;
}

const defaultDevice: Device = "desktop";

export const useDeviceView = create<DeviceViewModel>()(
  immer((set) => ({
    device: defaultDevice,
    width: devicePresets[defaultDevice].width,
    scale: devicePresets[defaultDevice].scale,

    api: {
      setDevice: (device) => {
        const preset = devicePresets[device];
        set((state) => {
          state.device = device;
          state.width = preset.width;
          state.scale = preset.scale;
        });
      },

      resetDevice: () => {
        const preset = devicePresets[defaultDevice];
        set((state) => {
          state.device = defaultDevice;
          state.width = preset.width;
          state.scale = preset.scale;
        });
      },

      setCustomWidth: (width) => {
        set((state) => {
          state.width = width;
        });
      },

      setScale: (scale) => {
        set((state) => {
          state.scale = scale;
        });
      },
    },
  })),
);

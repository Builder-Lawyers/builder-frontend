"use client";
import React, { forwardRef, IframeHTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils";

type DeviceType = "mobile" | "desktop" | "tv";

interface IframeProps extends IframeHTMLAttributes<HTMLIFrameElement> {
  wrapperClassName?: string;
  device?: DeviceType;
  scale?: number;
  actions?: React.ReactNode;
  scaleNode?: React.ReactNode;
}

const deviceSizes: Record<DeviceType, { width: number; height: number }> = {
  mobile: { width: 375, height: 667 },
  desktop: { width: 1440, height: 900 },
  tv: { width: 1920, height: 1080 },
};

export const Iframe = forwardRef<HTMLIFrameElement, IframeProps>(
  (
    {
      src,
      wrapperClassName,

      device = "desktop",
      scale = 1,
      actions,
      ...rest
    },
    ref,
  ) => {
    const scaledWidth = deviceSizes[device].width * scale;

    return (
      <div
        className={cn(
          "relative flex-col   bg-black/[5%] overflow-hidden grow flex w-full h-full justify-center m-auto",
          wrapperClassName,
        )}
      >
        <div className="flex px-2 w-full justify-between items-center bg-white">
          {actions}
        </div>
        <div
          style={{ maxWidth: scaledWidth }}
          className="relative  p-2 w-full h-full flex  items-center  overflow-auto m-auto justify-center"
        >
          <iframe
            className="h-full bg-white rounded border  w-full"
            ref={ref}
            src={src}
            {...rest}
            allow="clipboard-write"
          />
        </div>
      </div>
    );
  },
);

Iframe.displayName = "Iframe";

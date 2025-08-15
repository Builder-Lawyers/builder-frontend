"use client";

import { Button } from "@/shared/components/ui/button";
import { Laptop, Smartphone, ZoomIn, ZoomOut } from "lucide-react";
import { useUnit } from "effector-react";
import { setScale, ZOOM, zoomIn, zoomOut } from "../model";

export const Zoom = () => {
  const [onZoomOut, onZoomIn] = useUnit([zoomOut, zoomIn, setScale]);

  return (
    <div className="flex gap-2 p-1 rounded">
      <Button
        variant={"ghost"}
        onClick={() => {
          setScale(ZOOM.MIN);
        }}
        size={"icon"}
      >
        <Smartphone size={20} />
      </Button>
      <Button
        variant={"ghost"}
        onClick={() => {
          setScale(ZOOM.MAX);
        }}
        size={"icon"}
      >
        <Laptop size={20} />
      </Button>
      <Button variant={"ghost"} onClick={onZoomOut} size={"icon"}>
        <ZoomOut size={20} />
      </Button>
      <Button variant={"ghost"} onClick={onZoomIn} size={"icon"}>
        <ZoomIn size={20} />
      </Button>
    </div>
  );
};

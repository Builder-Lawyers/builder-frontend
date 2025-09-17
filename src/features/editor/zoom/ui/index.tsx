"use client";

import { Button } from "@/shared/components/ui/button";
import { Laptop, Smartphone, ZoomIn, ZoomOut } from "lucide-react";
import { useUnit } from "effector-react";
import { setScale, ZOOM, zoomIn, zoomOut } from "../model";

export const Zoom = () => {
  const [onZoomOut, onZoomIn] = useUnit([zoomOut, zoomIn, setScale]);

  return (
    <div className="flex gap-4 p-1 rounded">
      <Button
        variant="link"
        onClick={() => {
          setScale(ZOOM.MIN);
        }}
      >
        <Smartphone size={20} />
      </Button>
      <Button
        variant="link"
        onClick={() => {
          setScale(ZOOM.MAX);
        }}
      >
        <Laptop size={20} />
      </Button>
      <Button variant="link" onClick={onZoomOut}>
        <ZoomOut size={20} />
      </Button>
      <Button variant="link" onClick={onZoomIn}>
        <ZoomIn size={20} />
      </Button>
    </div>
  );
};

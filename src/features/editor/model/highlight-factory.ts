import React from "react";
import { HighlightProps } from "@/features/editor/ui/highlight";
import { shallowEqual } from "@/shared/lib/utils";

export type HighlightType = "hover" | "active" | "drag";

export interface IHighlight {
  readonly type: HighlightType;
  positions: HighlightProps;
  onElementEvent: (e: React.MouseEvent<HTMLElement>) => void;
  update: () => void;
}

abstract class BaseHighlight implements IHighlight {
  type: HighlightType;
  positions: HighlightProps = { top: 0, left: 0, width: 0, height: 0 };
  elRef: HTMLElement | null = null;

  constructor(
    public iframeRef: React.RefObject<HTMLIFrameElement | null>,
    public setPositions: React.Dispatch<React.SetStateAction<HighlightProps>>,
    type: HighlightType,
  ) {
    this.type = type;
  }

  private computePosition = (el: HTMLElement | null): HighlightProps | null => {
    const iframe = this.iframeRef?.current;
    if (!el || !iframe) return null;
    const rect = el.getBoundingClientRect();
    const scrollY = iframe.contentWindow?.scrollY ?? 0;
    return {
      top: rect.top + scrollY,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };
  };

  update = () => {
    const pos = this.computePosition(this.elRef);
    if (pos)
      this.setPositions((prev) => (shallowEqual(prev, pos) ? prev : pos));
  };

  abstract onElementEvent: (e: React.MouseEvent<HTMLElement>) => void;
}

class HoverHighlight extends BaseHighlight {
  onElementEvent = (e: React.MouseEvent<HTMLElement>) => {
    this.elRef = e.currentTarget as HTMLElement;
    this.update();
  };
}

class ActiveHighlight extends BaseHighlight {
  onElementEvent = (e: React.MouseEvent<HTMLElement>) => {
    this.elRef = e.currentTarget as HTMLElement;
    this.update();
  };
}

export class HighlightFactory {
  constructor(private iframeRef?: React.RefObject<HTMLIFrameElement | null>) {}

  create(
    type: HighlightType,
    setPositions: React.Dispatch<React.SetStateAction<HighlightProps>>,
  ): IHighlight {
    switch (type) {
      case "hover":
        return new HoverHighlight(this.iframeRef!, setPositions, type);
      case "active":
        return new ActiveHighlight(this.iframeRef!, setPositions, type);
      default:
        throw new Error(`Unknown highlight type: ${type}`);
    }
  }
}

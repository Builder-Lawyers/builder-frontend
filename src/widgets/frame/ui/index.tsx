"use client";

import React, { useRef } from "react";
import { useEditorStore } from "@/entities/editor";
import { IFrame } from "@/shared/components/iframe/ui";
import { Highlight } from "@/shared/components/custom/highlight";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
} from "@dnd-kit/core";

import { SortableContext } from "@dnd-kit/sortable";
import { SortableWidget } from "@/widgets/frame/ui/draggable";
import { useWidgetStore } from "@/entities/widget/model";
import { useFrame } from "@/widgets/frame/model";
import { normalizeWidgets } from "@/entities/editor/model";
import { PageLayout } from "@/shared/layouts/page";
import { IFrameLayout } from "@/shared/components/iframe/layout";

export const FramePreview = () => {
  const ref = useRef<HTMLIFrameElement | null>(null);

  const { widgets } = useEditorStore();
  const { api: widgetApi } = useWidgetStore();

  const { handleDragEnd, setHoveredDOMElement, elementDOMProps } = useFrame(
    ref.current,
  );
  const { width, height, coordinates, isActive } = elementDOMProps ?? {};

  const mouseSensor = useSensor(PointerSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 5,
    },
  });

  const normalized = normalizeWidgets(widgets);

  return (
    <div className="p-2 bg-black/5 w-full">
      <IFrame
        injectCSS="/index.css"
        className="w-full h-full rounded bg-white overflow-hidden relative"
        ref={ref}
      >
        <DndContext
          collisionDetection={closestCenter}
          sensors={[mouseSensor]}
          onDragEnd={handleDragEnd}
        >
          <PageLayout>
            <IFrameLayout>
              <SortableContext items={widgets.map((w) => w.id)}>
                {normalized.map((item) => (
                  <SortableWidget
                    key={item.id}
                    onMouseEnter={(e) => setHoveredDOMElement(e.currentTarget)}
                    onClick={() => widgetApi.setActiveWidget(item)}
                    {...item}
                  />
                ))}
              </SortableContext>
            </IFrameLayout>
          </PageLayout>
        </DndContext>
        <Highlight
          isActive={isActive}
          coordinates={coordinates}
          width={width}
          height={height}
        />
      </IFrame>
    </div>
  );
};

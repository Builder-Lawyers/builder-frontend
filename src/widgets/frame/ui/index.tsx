"use client";

import React, { useRef, useState } from "react";
import { useEditorStore } from "@/entities/editor";
import { IFrame } from "@/shared/components/iframe/ui";
import {
  closestCenter,
  DndContext,
  MeasuringStrategy,
  PointerSensor,
  useSensor,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableWidget } from "@/widgets/frame/ui/draggable";
import { useWidgetStore } from "@/entities/widget/model";
import { useFrame } from "@/widgets/frame/model";
import { normalizeWidgets } from "@/entities/editor/model";
import { IFrameLayout } from "@/shared/components/iframe/layout";
import { SortableOverlay } from "@/widgets/frame/ui/overlay";
import { snapCenterToCursor } from "@dnd-kit/modifiers";

export const FramePreview = () => {
  const ref = useRef<HTMLIFrameElement | null>(null);

  const { widgets } = useEditorStore();
  const { api: widgetApi } = useWidgetStore();

  const [activeWidget, setActiveWidget] = useState<(typeof widgets)[0] | null>(
    null,
  );

  const { handleDragEnd, setHoveredDOMElement } = useFrame(ref.current);

  const mouseSensor = useSensor(PointerSensor, {
    activationConstraint: {
      delay: 50,
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
          modifiers={[snapCenterToCursor]}
          collisionDetection={closestCenter}
          sensors={[mouseSensor]}
          onDragEnd={handleDragEnd}
          measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
          onDragStart={(e) => {
            const widget = widgets.find((w) => w.id === e.active.id);
            if (widget) {
              setActiveWidget(widget);
            }
          }}
        >
          <IFrameLayout>
            <SortableContext
              strategy={verticalListSortingStrategy}
              items={widgets.map((w) => w.id)}
            >
              {normalized.map((item) => (
                <SortableWidget
                  key={item.id}
                  onClick={(e) => {
                    setHoveredDOMElement(e.currentTarget);
                    widgetApi.setActiveWidget(item);
                  }}
                  {...item}
                />
              ))}
            </SortableContext>
          </IFrameLayout>

          <SortableOverlay>
            {activeWidget ? <SortableWidget {...activeWidget} /> : null}
          </SortableOverlay>
        </DndContext>
        {/* TODO: Highlight*/}

        {/*<Highlight*/}
        {/*  isActive={isActive}*/}
        {/*  coordinates={coordinates}*/}
        {/*  width={width}*/}
        {/*  height={height}*/}
        {/*/>*/}
      </IFrame>
    </div>
  );
};

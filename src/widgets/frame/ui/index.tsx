"use client";

import React, { useRef, useState } from "react";
import { IFrame } from "@/shared/components/iframe/ui";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableWidget } from "@/widgets/frame/ui/draggable";
import { useWidgetStore } from "@/entities/widget/model";
import { useFrame } from "@/widgets/frame/model";

import { IFrameLayout } from "@/shared/components/iframe/layout";
import { SortableOverlay } from "@/widgets/frame/ui/overlay";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import { useEditorStore } from "@/entities/editor";
import { normalizeWidgets } from "@/entities/editor/ulits";

export const FramePreview = () => {
  const ref = useRef<HTMLIFrameElement | null>(null);

  const { widgets, api: editorApi } = useEditorStore();
  const { api: widgetApi } = useWidgetStore();

  const [activeWidget, setActiveWidget] = useState<(typeof widgets)[0] | null>(
    null,
  );

  const { handleDragEnd, setHoveredDOMElement } = useFrame(ref.current);

  const mouseSensor = useSensor(PointerSensor, {
    activationConstraint: {
      delay: 75,
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
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest("a")) {
            e.preventDefault();
            e.stopPropagation();

            console.log("🔒 Link click blocked in editor mode");
          }
        }}
      >
        <DndContext
          modifiers={[snapCenterToCursor]}
          collisionDetection={closestCenter}
          sensors={[mouseSensor]}
          onDragEnd={(e) =>
            handleDragEnd({
              event: e,
              action: (oldIndex, newIndex) => {
                editorApi.dispatch({
                  type: "Widget.Reordered",
                  payload: {
                    parentId: null,
                    updater: (list) => arrayMove(list, oldIndex, newIndex),
                  },
                });
              },
            })
          }
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
                    widgetApi.setActiveWidgetID(item);
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

"use client";

import React, { useRef } from "react";
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
import { WidgetComponentProps } from "@/entities/widget";

export const FramePreview = () => {
  const ref = useRef<HTMLIFrameElement | null>(null);

  const widgets = useEditorStore((state) => state.widgets);
  const editorApi = useEditorStore((state) => state.api);

  const widgetApi = useWidgetStore((state) => state.api);
  const activeWidgetID = useWidgetStore((state) => state.activeWidgetID);

  const { handleDragEnd } = useFrame(ref.current);

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
              widgets,
            })
          }
          onDragStart={(e) => {
            const widget = widgets.find((w) => w.id === e.active.id);
            if (widget) {
              widgetApi.setActiveWidgetID(widget);
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
                  onClick={() => {
                    widgetApi.setActiveWidgetID(item);
                  }}
                  {...item}
                />
              ))}
            </SortableContext>
          </IFrameLayout>

          <SortableOverlay>
            {activeWidgetID ? (
              <SortableWidget
                {...(editorApi.getById(activeWidgetID) as WidgetComponentProps)}
              />
            ) : null}
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

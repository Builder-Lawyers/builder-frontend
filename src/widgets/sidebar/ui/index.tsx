"use client";

import { SidebarHeadless } from "@/shared/components/custom/sidebar";
import { widgetsTemplate } from "@/shared/api/widgets";
import { AddWidget } from "@/features/addWidget";
import { useWidgetStore } from "@/entities/widget/model";
import Input from "@/shared/components/ui/input";
import { flattenWidgets } from "@/widgets/sidebar/model";
import { widgetUpdater } from "@/features/updateWidget/model";
import { useEditorStore } from "@/entities/editor";
import { Switch } from "@/shared/components/ui/switch";
import { getWidgetSettings } from "@/shared/utils";

export const Sidebar = () => {
  const { widget } = useWidgetStore();
  const { widgets, api } = useEditorStore();

  const isSingleElementOnFrame = (widgetType: string) => {
    return widgets.some(
      (w) => w.type === widgetType && w.settings?.general?.single === true,
    );
  };

  const flat = widget ? flattenWidgets(widget) : [];

  return (
    <SidebarHeadless
      tree={
        <div className="flex flex-col gap-2">
          {widgetsTemplate.map((widget) => (
            <AddWidget
              disabled={isSingleElementOnFrame(widget.type)}
              key={widget.id}
              widget={widget}
            />
          ))}
        </div>
      }
      editor={
        widget && (
          <div className="flex gap-[24px] flex-col">
            <span className="uppercase text-xs opacity-40 font-bold">
              edit {widget.type}
            </span>
            <div className="flex flex-col gap-4">
              {flat.map((widget) => (
                <div className="flex gap-1.5 flex-col" key={widget.id}>
                  <p className="text-[10px] font-bold opacity-40 uppercase">
                    {widget.type}
                  </p>
                  <Input
                    onChange={(e) => {
                      api.update(widget.id, () => {
                        return widgetUpdater(widget, {
                          value: e.target.value,
                        });
                      });
                    }}
                    defaultValue={widget.value}
                  />
                </div>
              ))}
            </div>
            {getWidgetSettings(widget)?.optional && (
              <div className="flex flex-col gap-4">
                <span className="uppercase text-xs opacity-40 font-bold">
                  Settings
                </span>
                <div className="flex gap-1 flex-col">
                  {Object.entries(
                    getWidgetSettings(widget)?.optional ?? {},
                  ).map(([key, value]) => (
                    <div key={key} className="flex gap-2 items-center">
                      <p className="uppercase text-[12px]">{key}:</p>
                      <Switch>{Boolean(value)}</Switch>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      }
    />
  );
};

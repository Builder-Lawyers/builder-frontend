"use client";

import { SidebarHeadless } from "@/shared/components/custom/sidebar";
import { useWidgetStore } from "@/entities/widget/model";
import { useEditorStore } from "@/entities/editor";
import { useMemo } from "react";
import { SidebarEditor } from "@/widgets/sidebar/ui/editor";
import { SidebarTree } from "@/widgets/sidebar/ui/tree";
import { flattenForEditor } from "@/widgets/sidebar/model";

export const Sidebar = () => {
  const { activeWidgetID } = useWidgetStore();
  const { api } = useEditorStore();

  const widget = useMemo(() => {
    return api.getById(activeWidgetID!);
  }, [activeWidgetID, api]);

  const flat = widget ? flattenForEditor(widget, widget.label) : [];

  return (
    <SidebarHeadless
      tree={<SidebarTree />}
      editor={
        widget && <SidebarEditor label={widget.label || ""} widget={flat} />
      }
    />
  );
};

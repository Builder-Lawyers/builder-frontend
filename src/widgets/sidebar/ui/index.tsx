"use client";

import { SidebarHeadless } from "@/shared/components/custom/sidebar";
import { useWidgetStore } from "@/entities/widget/model";
import { flattenWidgets } from "@/widgets/sidebar/model";
import { useEditorStore } from "@/entities/editor";
import { useMemo } from "react";
import { SidebarEditor } from "@/widgets/sidebar/ui/editor";
import { SidebarTree } from "@/widgets/sidebar/ui/tree";

export const Sidebar = () => {
  const { activeWidgetID } = useWidgetStore();
  const { api } = useEditorStore();

  const widget = useMemo(() => {
    return api.getById(activeWidgetID!);
  }, [activeWidgetID, api]);

  const flat = widget ? flattenWidgets(widget) : [];

  return (
    <SidebarHeadless
      tree={<SidebarTree />}
      editor={widget && <SidebarEditor widget={flat} />}
    />
  );
};

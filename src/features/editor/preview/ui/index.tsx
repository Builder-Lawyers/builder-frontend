import { Button } from "@/shared/components/ui/button";
import { Eye } from "lucide-react";
import { useUnit } from "effector-react";
import {
  $isPreviewMode,
  togglePreviewMode,
} from "@/features/editor/preview/model";

export const Preview = ({ callback }: { callback: () => void }) => {
  const [isPreviewMode, onTogglePreviewMode] = useUnit([
    $isPreviewMode,
    togglePreviewMode,
  ]);
  return (
    <Button
      onClick={() => {
        callback?.();
        onTogglePreviewMode();
      }}
      variant={"ghost"}
    >
      <Eye size={20} />
    </Button>
  );
};

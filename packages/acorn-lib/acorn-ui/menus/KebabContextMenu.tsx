import { AcornIcon } from "../content/Icons/AcornIcon";
import type { IconContextMenuProps } from "./IconContextMenu";
import { IconContextMenu } from "./IconContextMenu";

export type KebabContextMenuProps = Omit<IconContextMenuProps, "icon">;

export const KebabContextMenu = (props: KebabContextMenuProps) => {
  return (
    <IconContextMenu {...props} icon={AcornIcon.Navigation.MoreVertical} />
  );
};

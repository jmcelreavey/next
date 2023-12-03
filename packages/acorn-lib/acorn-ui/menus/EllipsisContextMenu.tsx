import { AcornIcon } from "../content/Icons/AcornIcon";
import type { IconContextMenuProps } from "./IconContextMenu";
import { IconContextMenu } from "./IconContextMenu";

export type EllipsisContextMenuProps = Omit<IconContextMenuProps, "icon">;

export const EllipsisContextMenu = (props: EllipsisContextMenuProps) => {
  return <IconContextMenu {...props} icon={AcornIcon.Navigation.MoreHorizontal} />;
};

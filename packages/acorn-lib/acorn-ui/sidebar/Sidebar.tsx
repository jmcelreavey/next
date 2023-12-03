import type {ComponentProps} from "react";
import { makeAcornComponent } from "../utility/makeAcornComponent";

const SidebarContainer = makeAcornComponent("ac-sidebar");

export const Sidebar = (props: ComponentProps<typeof SidebarContainer>) => {
  const { children, ...rest } = props;
  return <SidebarContainer {...rest}>{children}</SidebarContainer>;
};

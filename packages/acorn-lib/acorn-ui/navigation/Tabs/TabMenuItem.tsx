import { Tab } from "morse-react";
import type { TabDefinition } from "./TabDefinition";

export interface TabMenuItemProps {
  tab: TabDefinition;
  isSelected: boolean;
  onSelect?: () => Promise<void>;
}

/**
 * Presents a single tab menu item in side a TabContainer
 *
 * Normally used internally by TabContainer
 *
 * @param props
 * @returns
 */
export const TabMenuItem = (props: TabMenuItemProps) => {
  return (
    <Tab.MenuItem
      current={props.isSelected}
      onClick={props.onSelect}
      className={props.tab.className}
    >
      {props.tab.label ?? props.tab.name}{" "}
      {props.tab.count !== undefined && <span className="c-pill">{props.tab.count}</span>}
    </Tab.MenuItem>
  );
};

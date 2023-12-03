import { TabContentItem } from "morse-react";
import type { PropsWithChildren, ReactNode} from "react";
import { useEffect } from "react";
import type { TabDefinition } from "./TabDefinition";
import { useTabsContext } from "./Tabs";

export type TabProps = PropsWithChildren<Omit<TabDefinition, "group"> & { group?: string }>;

/**
 * Tab contains tab content and through its props describes the tab with meta
 * data that the Tabs can use to present tab selection buttons.
 *
 * @param props
 * @returns
 */
export const Tab = (props: TabProps) => {
  const { registerTab, activeTab, defaultGroupName } = useTabsContext();
  const group = props.group ?? defaultGroupName;
  const { name, count, onTabChanging, label } = props;

  useEffect(() => {
    registerTab({
      group: group,
      name: name,
      count: count,
      onTabChanging: onTabChanging,
      label: label,
    });
  }, [group, name, onTabChanging, label, registerTab, count]);

  const content: ReactNode | null = props.children ?? null;

  if (!content) {
    // Not all tabs have content - for example the ListFilterTab component setups Acorn Tabs
    // just to leverage the tab menu strip but displays it's own content to save expensive unmounting
    // and remounting of the list.
    //
    // If there is no content to show we don't want to output the TabContentItem which will create
    // a padded container for the empty tab content
    return null;
  }

  const isActive = activeTab && group === activeTab.group && props.name === activeTab.name;

  return (
    <TabContentItem key={props.name} active={isActive} hidden={!isActive}>
      {isActive && content}
    </TabContentItem>
  );
};

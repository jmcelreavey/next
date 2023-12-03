import type { PropsWithChildren } from "react";
import React, { useCallback, useContext, useRef, useState } from "react";
import type { TabBehaviours } from "./TabBehaviours";
import { useNextQueryStringTabBehaviour } from "./TabBehaviours";
import type { TabDefinition } from "./TabDefinition";
import { TabMenuItem } from "./TabMenuItem";
import { TabsMenuStrip } from "./TabsMenuStrip";

export interface TabsContextProps {
  tabsName: string;
  tabs: TabDefinition[];
  activeTab?: TabDefinition;
  defaultGroupName: string;

  /**
   * Called by <AcornTab> upon mount to register their meta data with the container.
   * @param tabDefinition
   * @returns
   */
  registerTab: (tabDefinition: TabDefinition) => void;
}

export const TabsContext = React.createContext<TabsContextProps>({
  tabsName: "",
  tabs: [],
  defaultGroupName: "",
  registerTab: () => {},
});

export const useTabsContext = () => useContext(TabsContext);

type TabsContainerProps = Partial<TabBehaviours> & {
  /**
   * The name of the tab container.
   *
   * A name is only required when two tab containers must exist on the same screen.
   *
   * The name provides a default 'group' name to the tabs it contains and helps to
   * prevent collisions with active tab detection.
   *
   * Alternatively use the `group` prop on the `AcornTab` component for more fine
   * grained control.
   */
  name?: string;

  /**
   * The CSS class name for the container
   */
  className?: string;

  /**
   * The CSS class name for the menu strip component
   */
  tabStripClassName?: string;
};

/**
 * Presents content in panels switchable via a tab menu
 *
 * @param props
 * @returns
 */
export const Tabs = (props: PropsWithChildren<TabsContainerProps>) => {
  const tabsRef = useRef<Record<string, TabDefinition>>({});
  const [tabs, setTabs] = useState<TabDefinition[]>([]);

  // Get the default query string behaviours and provide them as substitutes
  // if no props are passed.
  const defaultBehaviours = useNextQueryStringTabBehaviour(undefined, ["page"]);
  const {
    getActiveTab = defaultBehaviours.getActiveTab,
    changeTab = defaultBehaviours.changeTab,
  } = props;

  const defaultGroupName = props.name ?? "tabs";
  const activeTab = getActiveTab(tabs);

  return (
    <TabsContext.Provider
      value={{
        tabs,
        tabsName: defaultGroupName,
        activeTab,
        defaultGroupName,
        registerTab: useCallback(
          (tabDefinition: TabDefinition) => {
            // Update the ref first. The initial render will cause a barrage of calls
            // to registerTab before setTabs() can catchup. We therefore track
            // the building array in the ref, and call setTabs with the correctly
            // combined array.
            tabsRef.current[tabDefinition.name] = {
              ...tabDefinition,
              // Set the group to the default if one is not set
              group: tabDefinition.group ?? defaultGroupName,
            };

            setTabs(Object.values(tabsRef.current));
          },
          [defaultGroupName]
        ),
      }}
    >
      <div className={["ac-tabs", props.className].filter(Boolean).join(" ")}>
        <TabsMenuStrip className={props.tabStripClassName}>
          {tabs.map((tab) => {
            return (
              <TabMenuItem
                key={tab.name}
                tab={tab}
                isSelected={
                  activeTab.group === tab.group && activeTab.name === tab.name
                }
                onSelect={async () => {
                  // Some tabs need to do some action and await for it to finish to guarantee
                  // the data it will display is accurate. If tab.onSelect is populated we
                  // await it's response before updating history.
                  //
                  // The try/catch here is important - if tab selection involves a network request
                  // that might fail, we don't switch tab in that case.
                  if (tab.onTabChanging) {
                    const result = await tab.onTabChanging();

                    if (result === false) {
                      return;
                    }
                  }

                  changeTab(tab, tabs);
                }}
              />
            );
          })}
        </TabsMenuStrip>

        {props.children}
      </div>
    </TabsContext.Provider>
  );
};

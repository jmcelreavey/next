import { useCallback, useState } from "react";
import { useSmartSearchParams } from "../../hooks/useSmartSearchParams";
import type { TabDefinition, TabIndentifier } from "./TabDefinition";
import { useTabsContext } from "./Tabs";

/**
 * Describes the requirements for implementing a hook to drive the
 * behaviours of the AcornTabContainer
 */
export interface TabBehaviours {
  /**
   * Returns the currently active tab, or undefined if no tab is set.
   */
  getActiveTab: (allTabs: TabIndentifier[]) => TabIndentifier;

  /**
   * Called to effect the change of tab
   *
   * @param tab The tab being chosen.
   */
  changeTab: (targetTab: TabIndentifier, allTabs: TabIndentifier[]) => void;
}

/**
 * Behaviours for AcornTabContainer that use the query string to track the active tab.
 *
 * This is the default behaviour used by AcornTabContainer when none is provided to it.
 *
 * @param namespace Engages a query string namespace to keep query string arguments from colliding with
 *                  others on the screen.
 * @param paramsToRemoveOnChange A list of query string parameters to remove when the tab is changed.
 * @returns
 */
export const useNextQueryStringTabBehaviour = (
  namespace?: string,
  paramsToRemoveOnChange?: string[]
): TabBehaviours => {
  const { searchParams, blendSearchParams } = useSmartSearchParams(namespace);

  return {
    getActiveTab: useCallback(
      (allTabs: TabDefinition[]) => {
        return (
          allTabs.find(
            (tab) => tab.group && searchParams[tab.group] && searchParams[tab.group] === tab.name
          ) ??
          allTabs[0] ?? { name: "", group: "" }
        );
      },
      [searchParams]
    ),
    changeTab: useCallback(
      (tab: TabIndentifier, allTabs: TabDefinition[]) => {
        const allGroups: string[] = [];
        for (const tab of allTabs) {
          if (tab.group && !allGroups.includes(tab.group)) {
            allGroups.push(tab.group);
          }
        }

        const paramsToRemove = allGroups
          .filter((group) => group !== tab.group)
          .concat(paramsToRemoveOnChange ?? []);

        if (tab.group) {
          blendSearchParams({ [tab.group]: tab.name }, paramsToRemove);
        }
      },
      [blendSearchParams]
    ),
  };
};

/**
 * Behaviours for AcornTabContainer that use simple React state to track the active tab.
 *
 * @returns
 */
export const useStateTabBehaviour = (): TabBehaviours => {
  const [tabs, setTabs] = useState<Record<string, string>>({});
  const { defaultGroupName } = useTabsContext();

  return {
    getActiveTab: useCallback(
      (allTabs: TabDefinition[]) => {
        return (
          allTabs.find((tab) => tab.group && tabs[tab.group] && tabs[tab.group] === tab.name) ??
          allTabs[0] ?? { name: "", group: "" }
        );
      },
      [tabs]
    ),
    changeTab: useCallback(
      (tab: TabIndentifier) => {
        setTabs({ ...tabs, [tab.group ?? defaultGroupName]: tab.name });
      },
      [tabs, setTabs]
    ),
  };
};

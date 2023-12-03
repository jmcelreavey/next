import { TabContentItem } from "morse-react";
import type { PropsWithChildren } from "react";
import { Tab } from "./Tab";
import { useTabsContext } from "./Tabs";

export type ListFilterTabProps = PropsWithChildren<{
  /**
   * The name of the property within the list criteria that is controlled by changing tabs.
   *
   * For example, if you had a set of tabs to split customers out by "type" then the
   * props should be set to "type".
   */
  criteriaProperty: string;

  /**
   * The values to present as tabs.
   *
   * Only strings are allowed. Each item in the array will form a new tab in the group
   * with a matching name and label.
   */
  values: string[];

  /**
   * An optional map of value strings to counts of records in the tab.
   */
  counts?: Record<string, number>;
}>;

/**
 * A special type of tab that registers a type for each one of a set of values.
 *
 * Used by crud patterns to slave request criteria to the chosen tab for example.
 *
 * @param props
 * @returns
 */
export const ListFilterTab = (props: ListFilterTabProps) => {
  const tabContext = useTabsContext();

  return (
    <>
      {props.values.map((value) => {
        // Note that these tabs are empty. "ListFilter" tabs are essentially a 'trick'.
        // They show tabs in the tab strip, but when chosen they just update the list
        // criteria. All of them show the same content.
        return (
          <Tab
            key={value}
            name={value}
            group={props.criteriaProperty}
            count={props.counts?.[value]}
          />
        );
      })}

      {/* Show the content of the list filter tabs if the active tab is one from this group                
                The second test of whether the active tab name or slug is in the values list from the
                list filters props is kind of redundant in normal use, but it in theory it is possible
                the query string argument might match none of the predictated values - in which case
                nothing would show. */}
      {props.children &&
        tabContext.activeTab?.group === props.criteriaProperty &&
        props.values.includes(tabContext.activeTab?.name) && (
          <TabContentItem active>{props.children}</TabContentItem>
        )}
    </>
  );
};

import { Tab } from "morse-react";
import type { PropsWithChildren } from "react";

export type TabsMenuProps = PropsWithChildren<{
  className?: string;
}>;

/**
 * The menu strip of the TabContainer
 *
 * For now, a simple extension point for the future and meanwhile
 * simply wrapping <Tab.Menu> from morse.
 */
export const TabsMenuStrip = (props: TabsMenuProps) => {
  return (
    <Tab.Menu className={[`ac-tabs__menu `, props.className].filter(Boolean).join(" ")}>
      {props.children}
    </Tab.Menu>
  );
};

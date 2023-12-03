import type { ReactNode} from "react";
import React, { Children, useContext } from "react";
import ReactIs from "react-is";
import { TriggeredLilyPadContext } from "../modals-and-dialogs/LilyPad/TriggeredLilyPad";

/**
 * Presents a menu of options.
 *
 * Each child can be wrapped in an li. If a child is not wrapped in an li, the Menu
 * component will auto wrap it.
 *
 * @param props
 * @returns
 */
export const Menu = (props: { children?: ReactNode }) => {
  const children: ReactNode[] = [];

  // Sometimes, especially if needing a context inside the menu, you might have a
  // single fragment as the top level child. In this case we flatten out the fragment
  // and promote it's children to be top level items.
  Children.forEach(props.children, (item) => {
    children.push(item);
  });

  const lilyPadContext = useContext(TriggeredLilyPadContext);

  return (
    <div className="ac-menu">
      <menu
        onClick={(e) => {
          if (e.currentTarget.tagName === "MENU") {
            return;
          }

          const style = getComputedStyle(e.currentTarget);

          if (style.pointerEvents !== "none") {
            lilyPadContext.hide();
          }
        }}
      >
        {children.map((child, i) => {
          // Auto wrap elements with an li if they aren't already.
          // For full control of the li simple wrap the child manually.
          if (
            ReactIs.isContextConsumer(child) ||
            ReactIs.isContextProvider(child) ||
            (ReactIs.isFragment(child) && child && typeof child === "object" && "props" in child) ||
            (child && typeof child === "object" && "type" in child && child.type === "li")
          ) {
            return <React.Fragment key={i}>{child}</React.Fragment>;
          } else {
            return <li key={i}>{child}</li>;
          }
        })}
      </menu>
    </div>
  );
};

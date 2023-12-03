import type { ReactElement, ReactNode } from "react";
import React from "react";
import {
  TriggeredLilyPad,
  TriggeredLilyPadContext,
} from "../modals-and-dialogs/LilyPad/TriggeredLilyPad";
import { Menu } from "./Menu";

export interface ContextMenuProps {
  children?: ReactNode;
  dontAutoClose?: boolean;
  renderTrigger: (context: { show: (anchorElement?: HTMLElement) => void }) => ReactElement;
}

export const ContextMenu = (props: ContextMenuProps) => {
  return (
    <TriggeredLilyPad className="ac-context-menu" renderTrigger={props.renderTrigger}>
      <TriggeredLilyPadContext.Consumer>
        {(context) => {
          const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (props.dontAutoClose) {
              return;
            }

            // Look to see if the target of the event was inside a Button. If so we
            // should auto close.
            // Do this by starting at the event target and moving up through parents
            // to see if we intersect with a button.
            let parent: HTMLElement | null = event.target as HTMLElement;
            while (parent) {
              if (parent === event.currentTarget) {
                // If we reach the container that has the handler, we can stop
                return;
              }

              if (parent.tagName === "BUTTON") {
                // If we find a button we can should not auto close.
                break;
              }

              parent = parent.parentElement;
            }

            context.hide();
          };

          return (
            <div onClick={handleClick}>
              <Menu>{props.children}</Menu>
            </div>
          );
        }}
      </TriggeredLilyPadContext.Consumer>
    </TriggeredLilyPad>
  );
};

ContextMenu.Menu = Menu;

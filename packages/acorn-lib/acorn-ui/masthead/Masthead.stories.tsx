import type { Meta, StoryObj } from "@storybook/react";
import { Button, Icon } from "morse-react";
import { Search } from "../inputs/Search/Search";
import { Avatar } from "../content/Avatar/Avatar";
import { Masthead } from "./Masthead";

const meta: Meta<typeof Masthead> = {
  component: Masthead,
  tags: ["autodocs"],
};

export default meta;

/**
 * The masthead wraps the content at the top of a page or screen.
 *
 * It usually contains things like the brand logo and avatar, but can
 * contain anything.
 *
 * #### CSS Variables
 * ```css
 * .ac-masthead {
 *    --ac-masthead-bg: var(--color-1);
 *    --ac-masthead-height: var(--touch-target);
 *    --ac-masthead-padding: 0.5em;
 *    --ac-masthead-item-height: calc( var(--ac-masthead-height) - var(--ac-masthead-padding));
 *    --ac-masthead-button-color: var(--color-2);
 *    --ac-masthead-text-button-color: var(--color-2);
 * }
 * ```
 */

export const Example: StoryObj<typeof Masthead> = {
  render: () => (
    <Masthead>
      <Search></Search>
      <button className="c-button +text">
        <Icon iconName="icon-notifications" />
        <Icon iconName="icon-keyboard_arrow_down" />
      </button>
      <button className="c-button +text">
        <Icon iconName="icon-settings" />
        <Icon iconName="icon-keyboard_arrow_down" />
      </button>
      <button className="c-button +text">
        <Avatar>AA</Avatar>
        <Icon iconName="icon-keyboard_arrow_down" />
      </button>
    </Masthead>
  ),
};

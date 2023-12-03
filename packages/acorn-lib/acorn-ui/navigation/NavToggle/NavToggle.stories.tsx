import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar } from "../../sidebar/Sidebar";
import { Nav } from "../Nav/Nav";
import { NavToggle } from "./NavToggle";

const meta: Meta<typeof NavToggle> = {
  component: NavToggle,
  tags: ["autodocs"],
};

export default meta;

/**
 * This component is used to toggle the Nav component when it isn't
 * visible e.g. in a mobile responsive layout.
 *
 * It's **important** that the `Nav` component is the direct sibling
 * of the `NavToggle` component.
 *
 * You should control the visibility of the `NavToggle` component
 * using a media query in your CSS.
 *
 */

export const Example: StoryObj<typeof NavToggle> = {
  render: () => (
    <Sidebar>
      <NavToggle></NavToggle>
      <Nav>
        <Nav primary>
          <Nav.Item>
            <a href="#" className="c-button +text">
              Home
            </a>
          </Nav.Item>
          <Nav.Item>
            <a href="#" className="c-button +text">
              About
            </a>
          </Nav.Item>
          <Nav.Item>
            <a href="#" className="c-button +text">
              Customers
            </a>
          </Nav.Item>
        </Nav>
      </Nav>
    </Sidebar>
  ),
};

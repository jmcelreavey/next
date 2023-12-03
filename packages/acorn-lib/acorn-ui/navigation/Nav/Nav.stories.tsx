import type { Meta, StoryObj } from "@storybook/react";
import { Icon, Pill } from "morse-react";
import { Sidebar } from "../../sidebar/Sidebar";
import { Nav } from "./Nav";

const meta: Meta<typeof Nav> = {
  component: Nav,
  tags: ["autodocs"],
};

export default meta;

/**
 * The nav presents a list of navigation items.
 *
 */

export const Example: StoryObj<typeof Nav> = {
  render: () => (
    <Sidebar>
      <Nav primary>
        <Nav.Item>
          <a href="#" className="c-button +text">
            Dashboard
          </a>
        </Nav.Item>
        <Nav.Item>
          <a href="#" className="c-button +text">
            Bookings
            <Pill>
              <Icon iconName="icon-arrow_forward" className="u-rotate-90" />
              125 &nbsp;
              <Icon iconName="icon-arrow_forward" className="u-rotate+90" />
              110
            </Pill>
          </a>
        </Nav.Item>
        <Nav.Item active>
          <a href="#" className="c-button +text">
            Car Park
            <Pill>1356</Pill>
          </a>
        </Nav.Item>
        <Nav.Item>
          <a href="#" className="c-button +text">
            Valet & Workshop
          </a>
        </Nav.Item>
        <Nav.Item>
          <a href="#" className="c-button +text">
            Customers
          </a>
        </Nav.Item>
        <Nav.Item>
          <a href="#" className="c-button +text">
            Calendar
          </a>
        </Nav.Item>
        <Nav.Item>
          <a href="#" className="c-button +text">
            Settings
          </a>
        </Nav.Item>
      </Nav>
    </Sidebar>
  ),
};

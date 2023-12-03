import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar } from "./Sidebar";

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  tags: ["autodocs"],
};

export default meta;

/**
 * The sidebar is used as the secondary element on the overall screen.
 *
 * It usually contains the navigation but it doesn't always have to. It does use a `<sidebar>` element.
 *
 */

export const Example: StoryObj<typeof Sidebar> = {
  render: () => <Sidebar>this is the sidebar</Sidebar>,
};

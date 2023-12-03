import type {Meta, StoryObj} from "@storybook/react";

import { Brand } from "./Brand";
import Logo from "./acorn-logo-blue.svg";

const meta: Meta<typeof Brand> = {
  component: Brand,
  tags: ["autodocs"],
};

export default meta;

export const Example: StoryObj<typeof Brand> = {
  render: () => (
    <Brand>
      <img src={Logo.src} alt="McCauslands Logo" />
    </Brand>
  ),
};

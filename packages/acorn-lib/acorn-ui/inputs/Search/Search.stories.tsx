import type { Meta, StoryObj } from "@storybook/react";
import { Search } from "./Search";

const meta: Meta<typeof Search> = {
  component: Search,
  tags: ["autodocs"],
};

export default meta;

export const Example: StoryObj<typeof Search> = {
  render: () => <Search></Search>,
};

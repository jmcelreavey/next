import type { Meta, StoryObj } from "@storybook/react";
import { Count } from "./Count";

const meta: Meta<typeof Count> = {
  component: Count,
  tags: ["autodocs"],
  argTypes: {
    count: {
      control: "number",
    },
    fontSize: {
      control: "select",
      options: ["small", "medium", "large"],
      defaultValue: "medium",
    },
    countColor: {
      control: "select",
      options: ["blue", "red", "green", "orange"],
      defaultValue: "blue",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Count>;

export const Example: Story = {
  args: {
    count: 523,
    fontSize: "medium",
    countColor: "blue",
  },
};

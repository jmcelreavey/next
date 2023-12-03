import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";
import type { CheckboxInput } from "./CheckboxInput";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "onChange" },
  },
};

export default meta;

export const CheckboxExample: StoryObj<typeof Checkbox> = {
  name: "Checkbox",
};

export const CheckboxInputExample: StoryObj<typeof CheckboxInput> = {
  name: "CheckboxInput",
};

import type {Meta, StoryObj} from "@storybook/react";
import { TextBoxInput } from "./TextBoxInput";

const meta: Meta<typeof TextBoxInput> = {
  component: TextBoxInput,
};

export default meta;

export const TextBoxExample: StoryObj<typeof TextBoxInput> = {
  args: {
    placeholder: "Enter a customer Name",
  },
  name: "TextBox",
};

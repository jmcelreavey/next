import type {Meta, StoryObj} from "@storybook/react";
import { TextAreaInput } from "./TextAreaInput";

const meta: Meta<typeof TextAreaInput> = {
  component: TextAreaInput,
};

export default meta;

export const Example: StoryObj<typeof TextAreaInput> = {
  args: {
    placeholder: "Enter a description of your problem",
  },
  name: "TextArea",
};

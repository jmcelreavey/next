import type {Meta, StoryObj} from "@storybook/react";
import { TextBoxInput } from "../../inputs/TextBox/TextBoxInput";
import { LabelledInput } from "./LabelledInput";

const meta: Meta<typeof LabelledInput> = {
  component: LabelledInput,
  tags: ["autodocs"],
};

export default meta;

/**
 * ####CSS Variables
 * ```
 * .ac-labelled-input {
 *   --ac-labelled-input-margin: var(--gap);
 * }
 * ```
 * ####Variations
 * 
 * `+no-margin` *Strip the bottom margin*
 */

export const AnInputWithMinimalProps: StoryObj<typeof LabelledInput> = {
  render: () => (
    <LabelledInput>
      <TextBoxInput name="giftAidName" />
    </LabelledInput>
  ),
};

export const OverridingLabel: StoryObj<typeof LabelledInput> = {
  render: () => (
    <LabelledInput label="Some other name">
      <TextBoxInput name="giftAidName" />
    </LabelledInput>
  ),
};

export const QuickMapToTextBox: StoryObj<typeof LabelledInput> = {
  render: () => (
    <LabelledInput
      label="Example"
      name="example"
      inputProps={{ size: 100, placeholder: "You can pass down input props" }}
    />
  ),
};

export const WithErrors: StoryObj<typeof LabelledInput> = {
  render: () => (
    <LabelledInput errors={{ firstName: { message: "Enter a first name to continue" } }}>
      <TextBoxInput name="firstName" />
    </LabelledInput>
  ),
};

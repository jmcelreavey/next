import type {Meta, StoryObj} from "@storybook/react";
import { Field, FieldGroup, Label } from "morse-react";
import { AcornIcon } from "../../content/Icons/AcornIcon";
import { TextBoxInput } from "../../inputs/TextBox/TextBoxInput";
import { Fieldset } from "./Fieldset";

const meta: Meta<typeof Fieldset> = {
  component: Fieldset,
  tags: ["autodocs"],
};

export default meta;

export const Example: StoryObj<typeof Fieldset> = {
  render: () => (
    <Fieldset legend={"This is a legend"} iconName={AcornIcon.Communication.History}>
      <FieldGroup>
        <Field>
          <Label>Forename</Label>
          <TextBoxInput />
        </Field>
        <Field>
          <Label>Surname</Label>
          <TextBoxInput />
        </Field>
      </FieldGroup>
    </Fieldset>
  ),
};
Example.storyName = "Fieldset";

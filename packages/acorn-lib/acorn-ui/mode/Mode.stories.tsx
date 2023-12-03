import type { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonBar, Field, FieldGroup, Form, Heading, Label } from "morse-react";
import { KeyPair } from "../content/KeyPair/KeyPair";
import { TextBoxInput } from "../inputs/TextBox/TextBoxInput";
import { Mode } from "./Mode";

const meta: Meta<typeof Mode> = {
  component: Mode,
  tags: ["autodocs"],
};

export default meta;

export const Example: StoryObj<typeof Mode> = {
  render: () => (
    <Mode>
      <Mode.Header>
        <Heading level={Heading.Level.H2}>Customer Details</Heading>
      </Mode.Header>
      <Mode.Toggle>Edit</Mode.Toggle>
      <Mode.View>
        <KeyPair title="Forename" className="+inline +bar u-marg-bottom">
          John
        </KeyPair>
        <KeyPair title="Surname" className="+inline +bar u-marg-bottom">
          Smith
        </KeyPair>
      </Mode.View>
      <Mode.Edit className="u-hide">
        <Form>
          <FieldGroup>
            <Field>
              <Label>Title</Label>
              <TextBoxInput />
            </Field>
            <Field>
              <Label>Forename</Label>
              <TextBoxInput />
            </Field>
            <Field>
              <Label>Surname</Label>
              <TextBoxInput />
            </Field>
          </FieldGroup>
          <ButtonBar>
            <Button>Save</Button>
            <Button className="+secondary">Cancel</Button>
          </ButtonBar>
        </Form>
      </Mode.Edit>
    </Mode>
  ),
};

import { Footer } from "./Footer";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ButtonBar, Button, Alert } from "morse-react";

const meta: Meta<typeof Footer> = {
  component: Footer,
  tags: ["autodocs"],
};

export default meta;

export const Example: StoryObj<typeof Footer> = {
  render: () => (
    <Footer>
      <ButtonBar>
        <Button>Save & Continue</Button>
        <Button className="+secondary">Cancel and go back</Button>
      </ButtonBar>
      <Alert color={Alert.Color.Warning}>This is a warning</Alert>
    </Footer>
  ),
};

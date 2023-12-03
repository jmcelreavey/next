import type { Meta, StoryObj } from "@storybook/react";
import { AcornIcon } from "../Icons/AcornIcon";
import { KeyPair } from "./KeyPair";

const meta: Meta<typeof KeyPair> = {
  component: KeyPair,
  tags: ["autodocs"],
};

export default meta;

export const Example: StoryObj<typeof KeyPair> = {
  render: () => (
    <>
      <KeyPair title="First Name">Christopher</KeyPair>
      <br />
      <KeyPair title="Email" iconName={AcornIcon.Communication.Email}>
        christoper@email.com
      </KeyPair>
      <br />
      <KeyPair iconName={AcornIcon.Communication.Email}>123456789</KeyPair>
      <br />
      <KeyPair title="Address Line 1" className="+inline">
        123 Somewhere Street
      </KeyPair>
      <br />
      <KeyPair title="Job Role" className="+grid +bar">
        Software Developer
      </KeyPair>
      <br />
      <KeyPair title="Job Role" className="+spaced-apart">
        Software Developer
      </KeyPair>
      <br />
      <KeyPair title="Job Role" className="+border-top">
        Software Developer
      </KeyPair>
    </>
  ),
};

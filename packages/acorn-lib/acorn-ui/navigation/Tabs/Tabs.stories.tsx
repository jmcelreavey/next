import type { Meta, StoryObj } from "@storybook/react";
import { KeyPair } from "../../content/KeyPair/KeyPair";
import { Tab } from "./Tab";
import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  tags: ["autodocs"],
};

export default meta;

export const Example: StoryObj<typeof Tabs> = {
  render: () => (
    <Tabs>
      <Tab name="Basic Details">
        <KeyPair title="Name" content="John Smith" />
        <KeyPair title="Email" content="JohnSmith@outlook.com" />
        <KeyPair title="Phone" content="+44739334222" />
      </Tab>
      <Tab name="History">
        <p>Some History</p>
      </Tab>
      <Tab name="Outcomes">
        <p>Some Outcomes</p>
      </Tab>
    </Tabs>
  ),
};

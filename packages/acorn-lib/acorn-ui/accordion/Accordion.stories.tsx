import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Accordion from "./Accordion";

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  tags: ["autodocs"],
};

export default meta;

export const Example: StoryObj<typeof Accordion> = {
  render: () => (
    <>
      <Accordion title={"Detailed Info"}>This is some accordion content</Accordion>
    </>
  ),
};

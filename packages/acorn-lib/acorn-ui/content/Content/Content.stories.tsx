import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Title } from "../Title/Title";
import { Content } from "./Content";

const meta: Meta<typeof Content> = {
  component: Content,
  tags: ["autodocs"],
};

export default meta;

export const Example: StoryObj<typeof Content> = {
  render: () => (
    <Content>
      <Title>This is the content component</Title>
      <p>
        The main content of the screen should be wrapped in this component. in
        here.
      </p>
    </Content>
  ),
};

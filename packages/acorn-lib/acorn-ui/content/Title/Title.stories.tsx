import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "morse-react";
import { AcornIcon } from "../Icons/AcornIcon";
import { Title } from "./Title";

const meta: Meta<typeof Title> = {
  component: Title,
  tags: ["autodocs"],
  argTypes: {
    iconName: {
      control: "select",
      options: AcornIcon.All,
    },
    headingLevel: {
      control: "select",
      options: Heading.Level,
    },
    className: {
      description: "Test",
      control: "check",
      options: ["+y"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Title>;

export const Example: Story = {
  args: {
    children: "This is a title",
    iconName: AcornIcon.Communication.Calendar,
    headingLevel: Heading.Level.H3,
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "morse-react";
import { BlankSlate } from "./BlankSlate";
import BlankSlateImage from "./info.svg";

const meta: Meta<typeof BlankSlate> = {
  component: BlankSlate,
  tags: ["autodocs"],
};

export default meta;

export const Example: StoryObj<typeof BlankSlate> = {
  render: () => (
    <BlankSlate title="No Customers" imagePath={BlankSlateImage}>
      <p>You haven't added any customers yet</p>
      <Button className="+primary c-button">Add a Record</Button>
    </BlankSlate>
  ),
};

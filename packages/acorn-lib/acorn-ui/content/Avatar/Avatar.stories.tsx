import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  tags: ["autodocs"],
};

export default meta;

export const Example: StoryObj<typeof Avatar> = {
  render: () => (
    <>
      <h1>With Image</h1>
      <Avatar>
        <img
          src="https://api.dicebear.com/6.x/thumbs/svg?seed=Sophie&backgroundColor[]&shapeColor[]"
          alt=""
        />
      </Avatar>
      <Avatar>
        <img src="https://source.unsplash.com/3tYZjGSBwbk" alt="" />
      </Avatar>
      <br />
      <h1>With text or initials</h1>
      <Avatar>AB</Avatar>
    </>
  ),
};

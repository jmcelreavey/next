import { Breadcrumbs } from "./Breadcrumbs";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta<typeof Breadcrumbs> = {
  component: Breadcrumbs,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Example: Story = {
  render: () => (
    <Breadcrumbs>
      <Breadcrumbs.Crumb>
        <a href="/">Dashboard</a>
      </Breadcrumbs.Crumb>
      <Breadcrumbs.Crumb>
        <a href="/customers">Customers</a>
      </Breadcrumbs.Crumb>
      <Breadcrumbs.Crumb>
        <a href="/customers">John Smith</a>
      </Breadcrumbs.Crumb>
    </Breadcrumbs>
  ),
};

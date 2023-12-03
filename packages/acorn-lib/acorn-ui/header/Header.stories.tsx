import type { Meta, StoryObj } from "@storybook/react";
import { Button, Card, CardContent, Icon } from "morse-react";
import { AcornIcon } from "../content/Icons/AcornIcon";
import { Title } from "../content/Title/Title";
import { Header } from "./Header";
const meta: Meta<typeof Header> = {
  component: Header,
  tags: ["autodocs"],
};

export default meta;

export const Example: StoryObj<typeof Header> = {
  render: () => (
    <>
      <Header>
        <Header.Title>
          <Title iconName={AcornIcon.Business.Inventory}>Stock Management</Title>
        </Header.Title>
        <Header.Summary>A summary of the information</Header.Summary>
        <Header.Actions>
          <Button className="+icon">
            <Icon iconName={AcornIcon.Action.AddCircle} className="c-button__icon" />
            <span className="c-button__text">Add new stock item</span>
          </Button>
          <Button className="+ghost">Edit</Button>
        </Header.Actions>
      </Header>
      <br />
      <Card>
        <CardContent>
          <Header>
            <Header.Title>
              <Title>This is a header component</Title>
            </Header.Title>
            <Header.Actions>
              <Button>Edit</Button>
            </Header.Actions>
          </Header>
        </CardContent>
      </Card>
    </>
  ),
};

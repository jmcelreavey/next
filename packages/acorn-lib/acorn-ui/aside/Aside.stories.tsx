import type { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonBar, Card, CardContent, Heading, Icon } from "morse-react";
import { AcornIcon } from "../content/Icons/AcornIcon";
import { KeyPair } from "../content/KeyPair/KeyPair";
import { Title } from "../content/Title/Title";
import { Section } from "../section/Section";
import { Aside } from "./Aside";

const meta: Meta<typeof Aside> = {
  component: Aside,
  tags: ["autodocs"],
};

export default meta;

export const Example: StoryObj<typeof Aside> = {
  render: () => (
    <Aside>
      <Title headingLevel={Heading.Level.H3}>
        Details
        <Icon iconName={AcornIcon.Action.X} />
      </Title>
      <ButtonBar>
        <Button className="+ghost">Edit</Button>
        <Button className="+ghost">Archive</Button>
        <Button className="+ghost +neg">Delete</Button>
      </ButtonBar>
      <Section>
        <Card>
          <CardContent>
            <Title headingLevel={Heading.Level.H3} iconName={AcornIcon.People.Person}>
              Basic Details
            </Title>
            <KeyPair title="Forename" className="+inline">
              John
            </KeyPair>
            <KeyPair title="Surname" className="+inline">
              Smith
            </KeyPair>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Title headingLevel={Heading.Level.H3} iconName={AcornIcon.People.Person}>
              Address
            </Title>
            <KeyPair title="Address Line 1" className="+inline">
              123 Somewhere
            </KeyPair>
            <KeyPair title="Address Line 2" className="+inline">
              Someroad
            </KeyPair>
            <KeyPair title="Postcode" className="+inline">
              BT12 345
            </KeyPair>
          </CardContent>
        </Card>
      </Section>
    </Aside>
  ),
};

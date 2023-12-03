import type { Meta, StoryObj } from "@storybook/react";
import { Button, Icon, Pill, Table } from "morse-react";
import { AcornIcon } from "../../content/Icons/AcornIcon";
import { AcornTable } from "./AcornTable";

const meta: Meta<typeof AcornTable> = {
  component: AcornTable,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AcornTable>;

export const Example: Story = {
  render: () => (
    <AcornTable>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>AddressLine1</Table.HeaderCell>
            <Table.HeaderCell>AddressLine1</Table.HeaderCell>
            <Table.HeaderCell>AddressLine1</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <a href="/">John Smith</a>
            </Table.Cell>
            <Table.Cell>123 Somewhere</Table.Cell>
            <Table.Cell>Antrim</Table.Cell>
            <Table.Cell>
              Co. Antrim <Pill>Warning</Pill>
            </Table.Cell>
            <Table.Cell>jsmith@email.com</Table.Cell>
            <Table.Cell>01245678</Table.Cell>
            <Table.Cell>
              <div className="ac-table__cell-actions">
                <Button appearance={Button.Appearance.Text}>
                  <Icon iconName={AcornIcon.Action.Edit} />
                </Button>
                <Button appearance={Button.Appearance.Text}>Delete</Button>
              </div>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>John Smith</Table.Cell>
            <Table.Cell>123 Somewhere</Table.Cell>
            <Table.Cell>Antrim</Table.Cell>
            <Table.Cell>Co. Antrim</Table.Cell>
            <Table.Cell>jsmith@email.com</Table.Cell>
            <Table.Cell>01245678</Table.Cell>
            <Table.Cell>
              <div className="ac-table__cell-actions">
                <Button appearance={Button.Appearance.Text}>Edit</Button>
                <Button appearance={Button.Appearance.Text}>Delete</Button>
              </div>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>John Smith</Table.Cell>
            <Table.Cell>123 Somewhere</Table.Cell>
            <Table.Cell>Antrim</Table.Cell>
            <Table.Cell>Co. Antrim</Table.Cell>
            <Table.Cell>jsmith@email.com</Table.Cell>
            <Table.Cell>01245678</Table.Cell>
            <Table.Cell>
              <div className="ac-table__cell-actions">
                <Button appearance={Button.Appearance.Text}>Edit</Button>
                <Button appearance={Button.Appearance.Text}>Delete</Button>
              </div>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>John Smith</Table.Cell>
            <Table.Cell>123 Somewhere</Table.Cell>
            <Table.Cell>Antrim</Table.Cell>
            <Table.Cell>Co. Antrim</Table.Cell>
            <Table.Cell>jsmith@email.com</Table.Cell>
            <Table.Cell>01245678</Table.Cell>
            <Table.Cell>
              <div className="ac-table__cell-actions">
                <Button appearance={Button.Appearance.Text}>Edit</Button>
                <Button appearance={Button.Appearance.Text}>Delete</Button>
                <Button>Delete</Button>
              </div>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </AcornTable>
  ),
};

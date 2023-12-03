import type { Meta } from "@storybook/react";
import { formatShortDate } from "logic";
import { users } from "./data";
import { DataTable } from "./DataTable";

export default {
  component: DataTable,
  tags: ["autodocs"],
} as Meta;

export const SimpleDataTable = () => (
  <DataTable
    dataset={users}
    columns={["id", "firstName", "lastName", "email", "lastLoggedIn"]}
  />
);

export const CustomPropertyFormation = () => (
  <DataTable
    dataset={users}
    columns={[
      // Custom property using a propertyGetter
      {
        headingText: "Full name",
        propertyGetter: (user) => `${user.firstName} ${user.lastName}`,
      },
      "email",
      "lastLoggedIn",
    ]}
  />
);

export const CellPropOverride = () => (
  <DataTable
    dataset={users}
    columns={[
      {
        propertyName: "id",
        headingText: "ID",
        cellProps: { numerical: true, className: "u-fill-1" },
      },

      {
        propertyName: "firstName",
        headingText: "Forename",
        cellProps: { className: "u-fill-pos" },
      },

      "lastName",
      "email",
      "lastLoggedIn",
    ]}
  />
);

export const EmptyDataCellRender = () => (
  <DataTable
    dataset={users}
    columns={[
      "id",
      "firstName",
      "lastName",

      // Empty data render
      {
        propertyName: "lastLoggedIn",

        // emptyDataRender: "User has never logged in before", // This would also work
        // emptyDataRender: <em>User has never logged in before</em>, // This would also work
        emptyDataRender: (user) => (
          <em>{user.firstName} has never logged in before</em>
        ),
      },
    ]}
  />
);

export const CustomPropertyFormatting = () => (
  <DataTable
    dataset={users}
    columns={[
      "id",
      "firstName",
      {
        propertyName: "lastName",
        formatter: (value) => value.toUpperCase(),
      },

      // Custom date formatting for example
      {
        propertyName: "lastLoggedIn",
        formatter: (value) => formatShortDate(value),
      },
    ]}
  />
);

export const CustomColumnHeadingRender = () => (
  <DataTable
    dataset={users}
    columns={[
      // Custom heading text
      { propertyName: "id", headingText: "ID", cellProps: { numerical: true } },

      // Custom heading component
      {
        propertyName: "firstName",
        renderHeadingCell: () => <span className="u-fill-red">Forename</span>,
      },

      "lastName",
      "email",
      "lastLoggedIn",
    ]}
  />
);

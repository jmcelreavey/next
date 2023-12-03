import { useState } from "@storybook/addons";
import type { Meta } from "@storybook/react";
import { DataTable } from "../../DataTable";
import type { User} from "../../data";
import { users } from "../../data";
import { SelectableRowsPlugin } from "../SelectableRowsPlugin/SelectableRowsPlugin";
import { ExpandableRowsPlugin } from "./ExpandableRowsPlugin";

export default {
  component: DataTable,
} as Meta;

export const ExpandableRows = () => {
  const [expandedUserIds, setExpandedUserIds] = useState<string[]>([]);

  return (
    <DataTable<User>
      dataset={users}
      columns={["id", "firstName", "lastName", "email", "lastLoggedIn"]}
      plugins={[ExpandableRowsPlugin]}
      pluginOptions={{
        expandableRows: {
          component: ({ item }) => (
            <div className="u-width-100">You're looking at {item.firstName}</div>
          ),
          expansionKey: "id",
          expandedValues: expandedUserIds,
          onRowToggle: setExpandedUserIds,
        },
      }}
    />
  );
};

export const MultipleExpandedRows = () => {
  const [expandedUserIds, setExpandedUserIds] = useState<string[]>([]);

  return (
    <DataTable<User>
      dataset={users}
      columns={["id", "firstName", "lastName", "email", "lastLoggedIn"]}
      plugins={[ExpandableRowsPlugin]}
      pluginOptions={{
        expandableRows: {
          component: ({ item }) => (
            <div className="u-width-100">You're looking at {item.firstName}</div>
          ),
          expansionKey: "id",
          expandedValues: expandedUserIds,
          onRowToggle: setExpandedUserIds,
          maxExpandedRows: 2,
        },
      }}
    />
  );
};

export const UnlimitedExpandedRows = () => {
  const [expandedUserIds, setExpandedUserIds] = useState<string[]>([]);

  return (
    <DataTable<User>
      dataset={users}
      columns={["id", "firstName", "lastName", "email", "lastLoggedIn"]}
      plugins={[ExpandableRowsPlugin]}
      pluginOptions={{
        expandableRows: {
          component: ({ item }) => (
            <div className="u-width-100">You're looking at {item.firstName}</div>
          ),
          expansionKey: "id",
          expandedValues: expandedUserIds,
          onRowToggle: setExpandedUserIds,
          maxExpandedRows: "infinite",
        },
      }}
    />
  );
};

export const UpwardExpandedRowDirection = () => {
  const [expandedUserIds, setExpandedUserIds] = useState<string[]>([]);

  return (
    <DataTable<User>
      dataset={users}
      columns={["id", "firstName", "lastName", "email", "lastLoggedIn"]}
      plugins={[ExpandableRowsPlugin]}
      pluginOptions={{
        expandableRows: {
          component: ({ item }) => (
            <div className="u-width-100">You're looking at {item.firstName}</div>
          ),
          expansionKey: "id",
          expandedValues: expandedUserIds,
          onRowToggle: setExpandedUserIds,
          expansionDirection: "above",
        },
      }}
    />
  );
};

export const ExpandableSelectableTable = () => {
  const [expandedUserIds, setExpandedUserIds] = useState<string[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  return (
    <DataTable<User>
      dataset={users}
      columns={[
        "id",
        "firstName",
        "lastName",
        "email",
        "lastLoggedIn",
        {
          pluginOptions: {
            selectableRows: {
              selectedValues: selectedUserIds,
              onSelection: setSelectedUserIds,
              selectionKey: "id",
            },
          },
        },
      ]}
      plugins={[SelectableRowsPlugin, ExpandableRowsPlugin]}
      pluginOptions={{
        expandableRows: {
          component: ({ item }) => (
            <div className="u-width-100">You're looking at {item.firstName}</div>
          ),
          expansionKey: "id",
          expandedValues: expandedUserIds,
          onRowToggle: setExpandedUserIds,
        },
      }}
    />
  );
};

export const CaretColumn = () => {
  const [expandedUserIds, setExpandedUserIds] = useState<string[]>([]);

  return (
    <DataTable<User>
      dataset={users}
      columns={["id", "firstName", "lastName", "email", "lastLoggedIn"]}
      plugins={[ExpandableRowsPlugin]}
      pluginOptions={{
        expandableRows: {
          component: ({ item }) => (
            <div className="u-width-100">You're looking at {item.firstName}</div>
          ),
          expansionKey: "id",
          expandedValues: expandedUserIds,
          onRowToggle: setExpandedUserIds,
          displayColumnToggleCaret: true,
        },
      }}
    />
  );
};

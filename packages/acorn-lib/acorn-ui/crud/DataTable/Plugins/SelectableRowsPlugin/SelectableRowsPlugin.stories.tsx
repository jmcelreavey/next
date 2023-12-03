import { useState } from "@storybook/addons";
import type { Meta } from "@storybook/react";
import { DataTable } from "../../DataTable";
import type { User} from "../../data";
import { users } from "../../data";
import { SelectableRowsPlugin } from "./SelectableRowsPlugin";

export default {
  component: DataTable,
} as Meta;

export const SelectableRows = () => {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>(["1", "3"]);

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
              selectionKey: "id",
              selectedValues: selectedUserIds,
              onSelection: setSelectedUserIds,
            },
          },
        },
      ]}
      plugins={[SelectableRowsPlugin]}
    />
  );
};

export const SelectAll = () => {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>(["1", "3"]);

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
              selectionKey: "id",
              selectedValues: selectedUserIds,
              onSelection: setSelectedUserIds,
              canSelectAll: true,
            },
          },
        },
      ]}
      plugins={[SelectableRowsPlugin]}
    />
  );
};

export const DisabledRows = () => {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>(["1", "3"]);

  const disabledUserIds = ["1"];

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
              selectionKey: "id",
              selectedValues: selectedUserIds,
              onSelection: setSelectedUserIds,
              canSelectAll: true,
              disabledValues: disabledUserIds,
            },
          },
        },
      ]}
      plugins={[SelectableRowsPlugin]}
    />
  );
};

export const CustomPredicate = () => {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>(["1", "3"]);

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
              selectionKey: "id",
              selectedValues: selectedUserIds,
              onSelection: setSelectedUserIds,
              predicate: () => !!(Math.random() >= 0.5),
            },
          },
        },
      ]}
      plugins={[SelectableRowsPlugin]}
    />
  );
};

export const CustomCheckboxes = () => {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>(["1", "3"]);

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
              selectionKey: "id",
              selectedValues: selectedUserIds,
              onSelection: setSelectedUserIds,
              canSelectAll: true,
              component: (props) => (
                <span onClick={props.onClick} className={props.selected ? "" : "u-translucent"}>
                  {props.selected ? "😼" : "😿"}
                </span>
              ),
            },
          },
        },
      ]}
      plugins={[SelectableRowsPlugin]}
    />
  );
};

export const StyledDefaultSelectionComponentRows = () => {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>(["1", "3"]);

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
              selectionKey: "id",
              selectedValues: selectedUserIds,
              onSelection: setSelectedUserIds,
              className: "u-rotate+180",
            },
          },
        },
      ]}
      plugins={[SelectableRowsPlugin]}
    />
  );
};

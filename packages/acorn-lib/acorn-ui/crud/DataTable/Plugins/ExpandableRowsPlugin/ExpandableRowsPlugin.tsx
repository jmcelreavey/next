import { TableCell, TableRow } from "morse-react";
import type { ComponentType } from "react";
import type { PluginDefinition } from "../PluginDefinition";

export interface ExpandedRowProps<T> {
  item: T;
}

export type ExpandableRowsPluginOptions<T> = {
  [K in keyof T]: {
    /**
     * Key of object to use to determine expanded status. Ideally this should
     * be a unique field for each item, such as an ID.
     */
    expansionKey: K;

    /**
     * Component rendered inside expanded rows
     */
    component: ComponentType<ExpandedRowProps<T>>;

    /**
     * Determines whether or not the expanded content will be rendered
     * above or below the data row. Default "below".
     */
    expansionDirection?: "below" | "above";

    /**
     * Values at the `expansionKey` for each expanded item. A strict equality
     * check is applied by default. Supply `predicate` to override this
     * behaviour.
     */
    expandedValues: T[K][];

    /**
     * Values at the `expansionKey` for items whose rows can't be expanded.
     */
    disabledValues?: T[K][];

    /**
     * Called when any selection component is clicked.
     * Use to update selected items
     *
     * @param newExpandedItemValues Array representing the rows that are
     * currently expanded
     * @param difference The intersection between the input `expandedValues`
     * and the target `newExpandedItemValues`
     */
    onRowToggle: (
      newExpandedItemValues: T[K][],
      difference: T[K],
      action: "expanding" | "collapsing"
    ) => void | Promise<void>;

    /**
     * Maximum number of rows which can be expanded at once.
     * Default: 1
     * For infinite, supply "infinite"
     */
    maxExpandedRows?: number | "infinite";

    /**
     * Injects a column containing a caret to indicate the row's expansion
     * status
     */
    displayColumnToggleCaret?: boolean;

    /** Overrides the default caret display */
    columnToggleCaretComponent?: ComponentType<{ expanded: boolean }>;

    /**
     * Overrides the position of the toggle caret column. Defaults to "end"
     */
    columnToggleCaretColumnPosition?: number | "start" | "end";
  };
}[keyof T];

declare module "../../Plugins/PluginDefinition" {
  interface TablePluginOptions<T> {
    expandableRows?: ExpandableRowsPluginOptions<T>;
  }

  interface ColumnPluginOptions<T, K extends keyof T> {
    expandableRows?: {
      isCaretColumn: boolean;
    };
  }
}

export const ExpandableRowsPlugin: PluginDefinition<any> = {
  handleRowClick: (item, pluginOptions) => {
    const expandableRows = pluginOptions?.expandableRows;

    // No expandable row configuration
    if (!expandableRows) {
      return;
    }

    const value = item[expandableRows.expansionKey];
    const isDisabled = expandableRows.disabledValues?.includes(value);

    if (isDisabled) {
      return;
    }

    const maxExpandedRows = expandableRows.maxExpandedRows ?? 1;

    const isExpanded = expandableRows.expandedValues.some(
      (expandedValue) => expandedValue === value
    );

    if (isExpanded) {
      // Close
      expandableRows.onRowToggle(
        expandableRows.expandedValues.filter((expandedValue) => expandedValue !== value),
        value,
        "collapsing"
      );
    } else if (
      maxExpandedRows === "infinite" ||
      expandableRows.expandedValues.length < maxExpandedRows
    ) {
      // Open
      expandableRows.onRowToggle([...expandableRows.expandedValues, value], value, "expanding");
    } else {
      // Close in order rows were opened until open count + 1 is the same as the max expanded rows
      const difference = maxExpandedRows - expandableRows.expandedValues.length;

      expandableRows.onRowToggle(
        [...expandableRows.expandedValues.slice(difference + 1), value],
        value,
        "collapsing"
      );
    }
  },

  postRowRender: (renderedRow, item, columns, pluginOptions) => {
    const expandableRows = pluginOptions?.expandableRows;

    // No expandable row configuration
    if (!expandableRows) {
      return;
    }

    const isExpanded = expandableRows.expandedValues.includes(item[expandableRows.expansionKey]);

    if (isExpanded) {
      const direction = expandableRows.expansionDirection ?? "below";

      const expandedRow = (
        <TableRow key={`expanded-row-${item[expandableRows.expansionKey]}`}>
          <TableCell colSpan={columns.length}>
            <expandableRows.component item={item} />
          </TableCell>
        </TableRow>
      );

      if (direction === "below") {
        return (
          <>
            {renderedRow}
            {expandedRow}
          </>
        );
      } else {
        return (
          <>
            {expandedRow}
            {renderedRow}
          </>
        );
      }
    } else {
      return renderedRow;
    }
  },

  cellRender: (item, columnDefinition, tablePluginOptions) => {
    if (!columnDefinition.pluginOptions?.expandableRows?.isCaretColumn) {
      return false;
    }

    const expandableRows = tablePluginOptions?.expandableRows;

    // No expandable row configuration
    if (!expandableRows) {
      return;
    }

    const value = item[expandableRows.expansionKey];
    const isExpanded = expandableRows.expandedValues.some(
      (expandedValue) => expandedValue === value
    );

    if (tablePluginOptions?.expandableRows?.columnToggleCaretComponent) {
      return <tablePluginOptions.expandableRows.columnToggleCaretComponent expanded={isExpanded} />;
    } else {
      return isExpanded ? "⮟" : "⮞";
    }
  },

  injectedColumns: (pluginOptions) => [
    {
      definition: {
        // Column pluginOptions
        pluginOptions: {
          expandableRows: {
            isCaretColumn: true,
          },
        },
      },
      position: pluginOptions?.expandableRows?.columnToggleCaretColumnPosition,
    },
  ],
};

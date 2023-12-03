import type { TableCellProps } from "morse-react";
import {
  SortDirection,
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableHead,
  TableHeaderCell,
  TableRow,
  wordifyCamelCase,
} from "morse-react";
import Link from "next/link";
import type {
  ComponentProps,
  ComponentType,
  ReactElement,
  ReactNode,
} from "react";
import React, { isValidElement, useMemo } from "react";
import { AcornTable } from "../AcornTable/AcornTable";
import type { DataTableColumnDefinition } from "./Columns/DataTableColumnDefinition";
import type {
  PluginDefinition,
  TablePluginOptions,
} from "./Plugins/PluginDefinition";
import { formatTime } from "logic";

export interface DatasetTableProps<T, SortType = keyof T>
  extends ComponentProps<typeof AcornTable> {
  /**
   * The data set to display - a simple array.
   */
  dataset: T[];

  /**
   * Property names that are sortable.
   *
   * This is an alternative form of setting
   * columns to sortable to avoid needing to switch each column into a
   * full `ColumnDefinition` just to enable sorting.
   */
  sortableProperties?: (SortType | keyof T)[];

  /**
   * Array of objects to allow `BoundDatasetTableColumns` to infer ability to
   * sort and sort direction, if any.
   *
   * Can be overridden by any setting `sortable` and `sortDirection` in any
   * given `BoundDatasetTableColumn`'s configuration in the `headingProps`
   * config.
   */
  sorts?: {
    property: SortType;
    direction?: SortDirection;
  }[];

  onSortDirectionChange?: (
    property: SortType,
    newDirection: SortDirection
  ) => void;

  /**
   * An array of DataTableColumnDefinitions that describes the column configuration.
   *
   * This allows for passing as an array:
   *
   * - simple string property names (header inferred from property through `wordifyCamelCase`)
   * - `DataTableColumnDefinition` objects to allow for more complex configuration
   */
  columns: (DataTableColumnDefinition<T, SortType> | keyof T)[];

  /**
   * An optional function to handle rending of a row of items.
   *
   * Allows for extended behaviours that might need to inject secondary rows.
   */
  rowRender?: (
    item: T,
    rowElements: (JSX.Element | null)[],
    index: number
  ) => React.ReactNode;

  /** Event handler attached to each `tr` element (with the exception of the heading row) */
  onRowClick?: (
    item: T,
    clickEvent: React.MouseEvent<HTMLTableRowElement>
  ) => void;

  highlightRowOnClick?: boolean;

  /**
   * When set, the contents of each cell will be wrapped in a React Router `<Link>` component to allow browser based
   * linking, rather than `navigate()` or other alternative methods.
   */
  rowLinkTo?: (item: T) => string;

  /**
   * Appends a row to the bottom of the table without the dataset specific click handlers/props.
   *
   * Note that the footer is automatically surrounded with <TableFoot> to be semantically correct.
   */
  footer?: React.ReactNode;

  /**
   * Adds additional content to the header of the table without the dataset specific click handlers/props.
   */
  additionalHeaders?: ComponentType[];

  plugins?: PluginDefinition<T, SortType>[];
  pluginOptions?: TablePluginOptions<T>;
}

/**
 * A DataTable is an AcornTable that maps an array of items to table rows.
 *
 * It uses the columns defined in the `columns` prop to understand how to create individual cells.
 *
 * Columns can be indicated as sortable by passing the sortable and sortablePropertyName settings
 * in the column definition.
 *
 * DataTable has a plugin architecture to allow for heavier customisation for niche use cases.
 * Take a look at the ExpandableRows plugin for an example of how to use this.
 *
 * @param props
 * @returns
 */
export const DataTable = <T, SortType = keyof T>(
  props: DatasetTableProps<T, SortType>
) => {
  const {
    className,
    dataset,
    sorts,
    onSortDirectionChange,
    columns,
    rowRender,
    onRowClick,
    rowLinkTo,
    footer,
    additionalHeaders,
    highlightRowOnClick,
    ...tableProps
  } = props;

  // Give plugins the opportunity to inject columns
  const columnsWithInjections = [...columns];
  const [selectedRow, setSelectedRow] = React.useState<number>();

  props.plugins?.forEach((plugin) => {
    if (!plugin.injectedColumns) {
      return;
    }

    plugin
      .injectedColumns(props.pluginOptions)
      .forEach(({ definition, position }) => {
        if (!position || position === "end") {
          columnsWithInjections.push(definition);
        } else if (position === "start") {
          columnsWithInjections.unshift(definition);
        } else {
          columnsWithInjections.splice(position, 0, definition);
        }
      });
  });

  // Build the collection of headings
  const headings = columnsWithInjections.map((inputColumn, index) => {
    const column =
      typeof inputColumn !== "object"
        ? { propertyName: inputColumn }
        : inputColumn;

    if (column.hide) {
      return null;
    }

    const sort = sorts?.find(
      (sortObject) =>
        sortObject.property ===
        (column.sortablePropertyName ?? column.propertyName)
    );

    const isSortable =
      !!sort ||
      column.headingCellProps?.sortable ||
      column.sortable ||
      column.sortablePropertyName ||
      (column.sortablePropertyName &&
        props.sortableProperties?.includes(column.sortablePropertyName)) ||
      (column.propertyName &&
        props.sortableProperties?.includes(column.propertyName));

    const sortDirection = sort?.direction;

    const handleOnClick = isSortable
      ? () => {
          if (
            props.onSortDirectionChange &&
            (column.sortablePropertyName || column.propertyName)
          ) {
            props.onSortDirectionChange(
              // TODO: Improve typing so that we can remove the following assertion.
              (column.sortablePropertyName ?? column.propertyName) as SortType,
              sortDirection === SortDirection.Descending ||
                sortDirection === undefined
                ? SortDirection.Ascending
                : SortDirection.Descending
            );
          }
        }
      : undefined;

    let toRender: ReactNode = undefined;

    // Give plugins the opportunity to render
    props.plugins?.forEach((plugin) => {
      if (plugin.headingRender) {
        const pluginWantsToRender = plugin.headingRender(
          column,
          props.dataset,
          props.pluginOptions
        );

        // Other falsy values may be valid ReactNodes, such as null, hence the explicit check
        if (pluginWantsToRender !== false) {
          toRender = pluginWantsToRender;
        }
      }
    });

    if (toRender === undefined) {
      /**
       * No plugins rendered
       * 1. If heading cell rendering is overridden generally, use that as first preference
       * 2. Use heading text
       * 3. Use wordified property name
       * 4. Blank
       */

      if (column.renderHeadingCell) {
        // 1
        toRender = column.renderHeadingCell(column.headingCellProps);
      } else if (column.headingText !== undefined) {
        // 2 (!== undefined as an empty string is falsy, and an empty string might be desirable)
        toRender = column.headingText;
      } else if (column.propertyName) {
        // 3
        toRender = wordifyCamelCase(column.propertyName.toString());
      }
    }

    return (
      <TableHeaderCell
        key={`table-header-cell-${index}`}
        {...column.headingCellProps}
        sortable={column.sortable}
        sortDirection={sortDirection}
        onClick={handleOnClick}
      >
        {toRender}
      </TableHeaderCell>
    );
  });

  const linkMap = useMemo(() => {
    const map = new Map<T, string>();

    if (rowLinkTo) {
      for (const item of dataset) {
        map.set(item, rowLinkTo(item));
      }
    }

    return map;
  }, [dataset, rowLinkTo]);

  // Build the collection of rows
  const rows = dataset.map((item, i) => {
    const linkTo = linkMap.get(item);

    // Containing cells
    const cells = columnsWithInjections.map((inputColumn, index) => {
      let cellProps;

      // Either the value directly from the item, or from a getter if supplied
      const column =
        typeof inputColumn !== "object"
          ? { propertyName: inputColumn }
          : inputColumn;

      if (column.hide) {
        return null;
      }

      cellProps = column.cellProps;

      let toRender: T[keyof T] | ReactNode | undefined;

      // Give the plugins an opportunity to render
      props.plugins?.forEach((plugin) => {
        if (plugin.cellRender) {
          const pluginWantsToRender = plugin.cellRender(
            item,
            column,
            props.pluginOptions
          );

          // Other falsy values may be valid ReactNodes, such as null, hence the explicit check
          if (pluginWantsToRender !== false) {
            toRender = pluginWantsToRender;
          }
        }
      });

      /**
       * Order of precedence
       *  - plugins
       *  - propertyGetter
       *  - propertyName
       *      - formatter
       *      - raw value
       *  - undefined
       */
      if (toRender === undefined) {
        if (column.propertyGetter) {
          toRender = column.propertyGetter(item);
        } else if (column.propertyName) {
          const value = item[column.propertyName];

          if (column.formatter) {
            toRender = column.formatter(value);
          } else if (value instanceof Date) {
            toRender = formatTime(value);
          } else {
            toRender = value;
          }
        } else {
          toRender = undefined;
        }
      }

      if (toRender === undefined && column.emptyDataRender) {
        if (typeof column.emptyDataRender === "function") {
          toRender = column.emptyDataRender(item);
        } else {
          toRender = column.emptyDataRender;
        }
      }

      const CellComponent = column.renderCell ?? ItemlessTableCell;

      function canRender(x: any): x is ReactElement {
        if (Array.isArray(x)) {
          return true;
        }

        if (typeof x === "string") {
          return true;
        }

        if (typeof x === "number") {
          return true;
        }
        return isValidElement(x);
      }

      return (
        <CellComponent
          item={item}
          key={`table-cell-row-${index}-column`}
          {...(cellProps ?? {})}
        >
          {linkTo ? (
            <Link
              style={{
                display: "block",
                textDecoration: "inherit",
                color: "inherit",
              }}
              href={linkTo}
            >
              {canRender(toRender) ? toRender : ""}
            </Link>
          ) : canRender(toRender) ? (
            toRender
          ) : (
            ""
          )}
        </CellComponent>
      );
    });

    let rowToRender: ReactNode = undefined;

    // If we have a rowRender prop provided delegate this to the parent
    if (rowRender) {
      rowToRender = rowRender(item, cells, i);
    } else {
      const handleOnClick = (
        clickEvent: React.MouseEvent<HTMLTableRowElement>
      ) => {
        if (highlightRowOnClick) {
          setSelectedRow(i !== selectedRow ? i : undefined);
        }

        // Sets click target
        const target = clickEvent.target as HTMLElement;

        // Checks target isModal (we don't want to trigger onRowClick if it's a button or background click)
        // Background click can only occurs if the modal is open (from the intiial button click).
        const isModal = target.closest(".c-modal");

        // Make sure onRowClick && is not button or background
        if (onRowClick && !isModal) {
          onRowClick(item, clickEvent);
        }

        // Tell plugins that this row has been clicked
        props.plugins?.forEach(
          (plugin) =>
            plugin.handleRowClick &&
            plugin.handleRowClick(item, props.pluginOptions)
        );
      };

      rowToRender = (
        <TableRow
          key={`table-row-${i} ${selectedRow === i ? "+selected" : ""}`}
          style={{ cursor: onRowClick ? "pointer" : undefined }}
          onClick={handleOnClick}
        >
          {cells}
        </TableRow>
      );
    }
    // Allow plugins to process what's about to be rendered
    props.plugins?.forEach((plugin) => {
      if (plugin.postRowRender) {
        rowToRender = plugin.postRowRender(
          rowToRender,
          item,
          columns,
          props.pluginOptions
        );
      }
    });

    return rowToRender;
  });

  const classes = ["ac-datatable", props.className]
    .filter((className) => className)
    .join(" ");

  return (
    <AcornTable className={classes} {...tableProps}>
      <Table>
        <TableHead>
          <>
            <TableRow>{headings}</TableRow>
            {additionalHeaders}
          </>
        </TableHead>

        <TableBody>{rows}</TableBody>

        {footer && <TableFoot>{footer}</TableFoot>}
      </Table>
    </AcornTable>
  );
};

const ItemlessTableCell = <T,>({
  item,
  ...props
}: TableCellProps & { item: T }) => <TableCell {...props} />;

import type { TableCellProps, TableHeaderProps } from "morse-react";
import type { ReactNode } from "react";

/**
 * All dataset table columns are of this type.
 *
 * We describe a heading and cell that must be a React node or a function
 * that returns a React node.
 */
export abstract class DataTableColumn<T> {
  /**
   * A react node or a function to return a react node for the given column
   */
  abstract heading(dataset: T[]): ReactNode;

  /**
   * A react node or a function to return a react node for the given item
   */
  abstract cell(item: T, dataset: T[]): ReactNode;

  /** Props to pass to the `TableCell` components rendered for the header row */
  headingCellProps?: Omit<TableHeaderProps, "header">;

  /** Props to pass to the `TableCell` components rendered for displaying data */
  cellProps?: Omit<TableCellProps, "header">;

  constructor(
    configuration: {
      headingCellProps?: Omit<TableHeaderProps, "header">;
      cellProps?: Omit<TableCellProps, "header">;
    } = {}
  ) {
    this.cellProps = configuration.cellProps;
    this.headingCellProps = configuration.headingCellProps;
  }
}

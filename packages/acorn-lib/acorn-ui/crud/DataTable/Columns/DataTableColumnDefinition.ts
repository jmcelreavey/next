import type { TableCellProps, TableHeaderProps } from "morse-react";
import type { ComponentType, ReactNode } from "react";
import type { ColumnPluginOptions } from "../Plugins/PluginDefinition";

type HeadingCellProps = Omit<TableHeaderProps, "header">;
type CellProps = Omit<TableCellProps, "header">;

export type DataTableCellValue = string | number | boolean | undefined | null;

export type DataTableColumnDefinition<T, SortType = keyof T> = {
  [K in keyof T]: {
    /** Name of field on an item for a given row to render */
    propertyName?: K;

    /**
     * If the column is sortable, then this is name of the sortable column.
     *
     * This may not be a direct property of our attribute but a meta property that
     * activates complex sorting logic on the API side.
     *
     * If it is left undefined, it will default to using the propertyName value.
     */
    sortablePropertyName?: SortType;

    /**
     * An alternative to supplying a property name if a more complex value is to
     * be rendered, e.g. a full name derived from `firstName` and `lastName`.
     *
     * This prop supersedes `propertyName`
     */
    propertyGetter?: (item: T) => ReactNode;

    /** Apply formatting to the value */
    formatter?: (value: T[K]) => ReactNode;

    /** Heading to display in the column's main header cell. Defaults to `propertyName` */
    headingText?: string;

    /** A way to hide the column if the column wanted to control its own visibility */
    hide?: boolean;

    /** Completely overrides heading cell rendering for custom column rendering */
    renderHeadingCell?: (cellProps: HeadingCellProps | undefined) => ReactNode;

    /** Completely overrides cell rendering for custom column rendering */
    renderCell?: ComponentType<CellProps & { item: T }>;

    /** Props to pass to the `TableCell` components rendered for the header row */
    headingCellProps?: HeadingCellProps;

    /** Props to pass to the `TableCell` components rendered for displaying data */
    cellProps?: CellProps;

    sortable?: boolean;

    emptyDataRender?: ReactNode | ((item: T) => ReactNode);

    pluginOptions?: ColumnPluginOptions<T, K>;
  };
}[keyof T];

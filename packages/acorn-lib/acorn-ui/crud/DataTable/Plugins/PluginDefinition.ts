import type { ReactNode } from "react";
import type { DataTableColumnDefinition } from "../Columns/DataTableColumnDefinition";

export interface TablePluginOptions<T> {}
export interface ColumnPluginOptions<T, K extends keyof T> {}

export interface PluginDefinition<T, SortType = T> {
  /** Overrides the rendering of the heading cells for a table. Return `false` to skip override. */
  headingRender?: (
    columnDefinition: DataTableColumnDefinition<T, SortType>,
    items: T[],
    pluginOptions: TablePluginOptions<T> | undefined
  ) => ReactNode | false;

  /** Overrides the rendering of a data cell for a table. Return `false` to skip override. */
  cellRender?: (
    item: T,
    columnDefinition: DataTableColumnDefinition<T, SortType>,
    pluginOptions: TablePluginOptions<T> | undefined
  ) => ReactNode | false;

  /** Notifies the plugin that a row has been clicked. */
  handleRowClick?: (item: T, pluginOptions: TablePluginOptions<T> | undefined) => void;

  /**
   * Provides the plugin with the opportunity to inject extra content into
   * the table body
   */
  postRowRender?: (
    renderedRow: ReactNode,
    item: T,
    columns: (keyof T | DataTableColumnDefinition<T, SortType>)[],
    pluginOptions: TablePluginOptions<T> | undefined
  ) => ReactNode;

  /**
   * Allows a plugin to inject a column at the position. Default position is
   * "end".
   *
   * If more than one plugin attempts to inject at the same position, both
   * will be inserted, but will be inserted in the order the plugins are
   * declared.
   */
  injectedColumns?: (pluginOptions: TablePluginOptions<T> | undefined) => {
    definition: DataTableColumnDefinition<T, SortType>;
    position?: number | "start" | "end";
  }[];
}

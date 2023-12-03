import type { ComponentType } from "react";
import React from "react";
import type { PluginDefinition } from "../PluginDefinition";

interface BaseSelectionComponentProps {
  selected: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export interface SelectionComponentProps<T, K extends keyof T> extends BaseSelectionComponentProps {
  item: T;
  value: K;
  disabled?: boolean;
}

export type SelectAllComponentProps = BaseSelectionComponentProps

export type SelectableRowsPluginOptions<T> = {
  [K in keyof T]: {
    /**
     * Key of object to use to determine selection status. Ideally this should
     * be a unique field for each item, such as an ID.
     */
    selectionKey: K;

    /**
     * Values at the `selectionKey` for each selected item. A strict equality
     * check is applied by default. Supply `predicate` to override this
     * behaviour.
     */
    selectedValues: T[K][];

    /**
     * Values at the `selectionKey` for items whose selection components should
     * be disabled.
     */
    disabledValues?: T[K][];

    /**
     * Called when any selection component is clicked.
     * Use to update selected items
     */
    onSelection: (selectedItems: T[K][]) => void;

    /** Called when the select all component is clicked. */
    onSelectAll?: (allSelected: boolean) => void;

    /**
     * By default a strict equality check is applied to determine if a given
     * item is selected. Supply a predicate to override this behaviour.
     */
    predicate?: (value: T[K], itemUnderTest: T) => boolean;

    /**
     * By default a strict equality check is applied to determine if a given
     * item is disabled. Supply a predicate to override this behaviour.
     */
    disabledPredicate?: (value: T[K], itemUnderTest: T) => boolean;

    canSelectAll?: boolean;

    /**
     * Overrides component rendered inside each row's data cell. This component
     * is also used in the heading row is `canSelectAll` is true, and no custom
     * `selectAllComponent` is supplied.
     */
    component?: ComponentType<SelectionComponentProps<T, K>>;

    /**
     * Class name applied to the default checkbox component if `component`
     * isn't supplied.
     */
    className?: string;

    /**
     * Overrides component rendered inside the heading row if `canSelectAll`
     * is true
     */
    selectAllComponent?: ComponentType<SelectAllComponentProps>;
  };
}[keyof T];

declare module "../../Plugins/PluginDefinition" {
  interface TablePluginOptions<T> {
    // No options at the table level
  }

  interface ColumnPluginOptions<T, K extends keyof T> {
    selectableRows?: SelectableRowsPluginOptions<T>;
  }
}

export const SelectableRowsPlugin: PluginDefinition<any> = {
  headingRender: ({ pluginOptions }, items) => {
    if (!pluginOptions) {
      return false;
    }

    const pluginConfig = pluginOptions.selectableRows;

    if (!pluginConfig || !pluginConfig.canSelectAll) {
      return false;
    }

    const allSelected = items.every(
      pluginConfig.predicate
        ? (item) =>
            pluginConfig.selectedValues.some((selectedItem: any) =>
              pluginConfig.predicate!(selectedItem, item)
            )
        : (item) => pluginConfig.selectedValues.includes(item[pluginConfig.selectionKey])
    );

    const handleOnClick = () => {
      if (pluginConfig.onSelectAll) {
        pluginConfig.onSelectAll(!allSelected);
      } else if (allSelected) {
        // Deselect all (i.e. only keep disabled, selected values)
        pluginConfig.onSelection(
          items
            .map((item) => item[pluginConfig.selectionKey])
            .filter(
              (value) =>
                pluginConfig.disabledValues?.includes(value) &&
                pluginConfig.selectedValues.includes(value)
            )
        );
      } else {
        // Select all
        pluginConfig.onSelection(items.map((item) => item[pluginConfig.selectionKey]));
      }
    };

    if (pluginConfig.selectAllComponent) {
      return <pluginConfig.selectAllComponent onClick={handleOnClick} selected={allSelected} />;
    } else {
      return (
        <input
          type="checkbox"
          checked={allSelected}
          onChange={handleOnClick}
          className={pluginConfig.className}
        />
      );
    }
  },
  cellRender: (item, { pluginOptions }) => {
    if (!pluginOptions) {
      return false;
    }

    const pluginConfig = pluginOptions.selectableRows;

    if (!pluginConfig) {
      return false;
    }

    const value = item[pluginConfig.selectionKey];

    const selected = pluginConfig.selectedValues.some((selectedValue: any) => {
      if (pluginConfig.disabledPredicate) {
        return pluginConfig.disabledPredicate(selectedValue, item);
      } else {
        return selectedValue === value;
      }
    });

    const isDisabled = pluginConfig.disabledValues?.some((disabledValue: any) => {
      if (pluginConfig.predicate) {
        return pluginConfig.predicate(disabledValue, item);
      } else {
        return disabledValue === value;
      }
    });

    const handleOnClick = (e: React.SyntheticEvent) => {
      e.stopPropagation();
      if (isDisabled) {
        return;
      }

      const newItems = selected
        ? pluginConfig.selectedValues.filter((selectedValue: any) => selectedValue !== value)
        : [...pluginConfig.selectedValues, value];

      pluginConfig.onSelection(newItems);
    };

    if (pluginConfig.component) {
      return (
        <pluginConfig.component
          item={item}
          value={value}
          selected={selected}
          disabled={isDisabled}
          onClick={handleOnClick}
        />
      );
    } else {
      return (
        <input
          type="checkbox"
          checked={selected}
          disabled={isDisabled}
          onClick={(e) => e.stopPropagation()}
          onChange={handleOnClick}
          className={pluginConfig.className}
        />
      );
    }
  },
};

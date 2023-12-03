import type { OptionItem } from "../types/OptionItem";
import { defaultCreateOptionFromItemDelegate } from "./useOptionsSource";

export interface SelectedOptionsConfiguration<ItemType> {
  selectedItems: ItemType[];
  options: OptionItem<ItemType>[];
  valueComparator?: (valueA?: ItemType, valueB?: ItemType) => boolean;
  itemToOptionTransformer?: (item: ItemType) => OptionItem<ItemType>;
}

export const defaultValueComparator = <ValueType>(valueA?: ValueType, valueB?: ValueType) => {
  const valueAType = typeof valueA;
  const valueBType = typeof valueB;
  if (
    (valueA === undefined ||
      valueA === null ||
      valueAType === "string" ||
      valueAType === "number" ||
      valueAType === "boolean") &&
    (valueB === undefined ||
      valueB === null ||
      valueBType === "string" ||
      valueBType === "number" ||
      valueBType === "boolean")
  ) {
    return valueA === valueB;
  }

  // Object comparisons are a little fragile. It's possible for a newly created value
  // for example to be returned with a slightly different structure thant ones returned
  // in the general list or search. In many cases the item value contains an id property.
  // If both option and item have an id - we should use that first.
  if (
    valueA &&
    valueB &&
    typeof valueA === "object" &&
    typeof valueB === "object" &&
    "id" in valueA &&
    "id" in valueB
  ) {
    return valueA.id === valueB.id;
  }

  // Slow but reliable for complex values when no custom comparator is supplied.
  if (JSON.stringify(valueA) !== JSON.stringify(valueB)) {
    return false;
  }
  return true;
};

export const useSelectedOptions = <ItemType>(
  configuration: SelectedOptionsConfiguration<ItemType>
): {
  selectedOptions: OptionItem<ItemType>[];
} => {
  const comparator = configuration.valueComparator ?? defaultValueComparator;
  const selectedOptions: OptionItem<ItemType>[] = [];
  const createOptionDelegate =
    configuration.itemToOptionTransformer ?? defaultCreateOptionFromItemDelegate;

  configuration.selectedItems.forEach((value) => {
    // Iterate of the options to match the ones represented by this value.
    const matchingOptions = configuration.options.filter((option) =>
      comparator(option.item, value)
    );
    if (matchingOptions.length > 0) {
      selectedOptions.push(...matchingOptions);
    } else {
      selectedOptions.push(createOptionDelegate(value));
    }
  });

  return {
    selectedOptions,
  };
};

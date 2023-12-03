import type { OptionItem } from "./OptionItem";

export type OptionItemTransformerDelegate<ItemType> = (
  item?: OptionItem<ItemType>
) => OptionItem<ItemType>;
export type OptionValueComparisonDelegate<ValueType> = (
  value1?: ValueType,
  value2?: ValueType
) => boolean;
export type CreateOptionFromItemDelegate<ItemType> = (value?: ItemType) => OptionItem<ItemType>;

export const transformAnyItemToStringValue = <ItemType>(item?: ItemType): string => {
  switch (typeof item) {
    case "string":
      return item;
    case "number":
    case "boolean":
      return item.toString();
    case "object":
      if (item) {
        if ("id" in item) {
          if (typeof item.id === "string") {
            return item.id;
          }
          if (typeof item.id === "number") {
            return item.id.toString();
          }
        }

        return item.toString();
      }
  }

  return "";
};

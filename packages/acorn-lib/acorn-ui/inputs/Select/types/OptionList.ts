import type { OptionItem } from "./OptionItem";

export type OptionList<ItemType> =
  | (OptionItem<ItemType> | ItemType)[]
  | Promise<(OptionItem<ItemType> | ItemType)[]>;

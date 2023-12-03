import type { SyntheticInputProps } from "../../types/SyntheticInputProps";
import type { OptionSourceConfiguration } from "./OptionSourceConfiguration";

export type SelectInputProps<ItemType, Multiple = false> = SyntheticInputProps<
  Multiple extends true ? ItemType[] : ItemType
> &
  Pick<OptionSourceConfiguration<ItemType>, "options" | "itemToOptionTransformer"> & {
    multiple?: Multiple;
  };

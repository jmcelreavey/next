import type { OptionList } from "./OptionList";

export type OptionSourceDelegate<ItemType> = (phrase?: string) => OptionList<ItemType>;

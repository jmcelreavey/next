import type { OptionList } from "./OptionList";
import type { OptionSourceDelegate } from "./OptionSourceDelegate";

export type OptionSource<ItemType> = OptionSourceDelegate<ItemType> | OptionList<ItemType>;

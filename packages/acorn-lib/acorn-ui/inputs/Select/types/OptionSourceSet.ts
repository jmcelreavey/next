import type { OptionSource } from "./OptionSource";

export class OptionSourceSet<ItemType> {
  constructor(public sources: OptionSource<ItemType>[]) {}
}

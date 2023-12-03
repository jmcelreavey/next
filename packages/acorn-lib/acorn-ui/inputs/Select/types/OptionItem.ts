/**
 * Represents a single option. OptionItem objects hold a value, label and an item:
 *
 * label: A string value to show in the UI
 * item:  The item from the option source
 *
 *
 * Note that the name Option was considered here OptionItem keeps this distinct
 * from HTML option objects.
 *
 * Note also that this is a class. Option sources can return an array of values
 * or options. Later we ensure presentation components get a simple list of
 * option objects. This being a class aids in the run time valuation of the
 * items in the array.
 */
export class OptionItem<ItemType = unknown> {
  constructor(public label: string, public item?: ItemType, public disabled?: boolean) {}
}

import type { OptionSource } from "./OptionSource";
import type { OptionItem } from "./OptionItem";
import type { OptionSourceSet } from "./OptionSourceSet";

export interface OptionSourceConfiguration<ItemType> {
  /**
   * By default options are loaded as soon as the component using the hook is mounted.
   *
   * For components that support it, this can be deferred until a later time, possibly
   * when the user 'opens' the drop down for example.
   *
   * If a page contains many drop downs they can cause a spike in network traffic while
   * all of them request data from the API at the same time. In some cases, like when
   * editing a record, many of the drop downs will not even be interacted with by the
   * user and so loading all the options could be a waste of data.
   */
  deferLoadingOptions?: boolean;

  /**
   * The phrase currently being used to refine options
   */
  phrase?: string;

  /**
   * Minimum search phrase length that will trigger option load. Primarly used in places
   * where it would not be possible to load the entire list of available item in an efficient way.
   * For example, a list of all possible customers might contain thousands of reuslts.
   * In addition, in some cases searching on small phrases could cause wasted load on complex
   * database tables, to return an overly large and unhelpful list to the user.
   *
   * Sometimes forcing a search phrase of at least 3 or 4 letters guarantees a manageable list that
   * has a higher probability of being useful to the user.
   *
   */
  minimumSearchLength?: number;

  onChange?: (newValue: ItemType | ItemType[]) => void;

  /**
   * Either an `OptionSource` or an array of `OptionSource` values.
   *
   * OptionSource is an alias for either a concrete array of values or `OptionItem` objects OR
   * a callback that returns the same, or a Promise to return the same.
   *
   * e.g.
   *
   * ['a','b','c']
   * [['a','b','c'], () => ['d','e','f']]
   * () => Promise.resolve([
   *  { value: 'a', label: 'A' },
   *  { value: 'b', label: 'B' },
   *  { value: 'c', label: 'C' },
   *  ])
   *
   * Are all valid examples of option source values.
   *
   * The motiviation is to allow multiple sources to be blended together (e.g. options
   * loaded from an API, mixed with some UI provided values) and to come from sync or async
   * sources.
   */
  options: OptionSource<ItemType> | OptionSourceSet<ItemType>;

  /**
   * When only values are returned by a source, this delegate is responsible for converting
   * these into an `OptionItem` with at least a value and a label.
   * @param item
   * @returns
   */
  itemToOptionTransformer?: (item: ItemType) => OptionItem<ItemType>;
}

import { useCallback, useEffect, useRef, useState } from "react";
import { OptionItem } from "../types/OptionItem";
import type { OptionSource } from "../types/OptionSource";
import type { OptionSourceConfiguration } from "../types/OptionSourceConfiguration";
import type { OptionSourceDelegate } from "../types/OptionSourceDelegate";
import { OptionSourceSet } from "../types/OptionSourceSet";

const isOptionSourceDelegate = <ItemType>(
  optionSource: OptionSource<ItemType>
): optionSource is OptionSourceDelegate<ItemType> => {
  return typeof optionSource === "function";
};

/**
 * Generates a list of options from a range of possible synchronous and asynchronous sources.
 *
 * @param configuration
 * @returns Loading status and an array of OptionItem objects
 */
export const useOptionsSource = <ItemType>(
  configuration: OptionSourceConfiguration<ItemType>
): {
  options: OptionItem<ItemType>[];
  loading: boolean;
} => {
  const lastPhrase = useRef<string>();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<OptionItem<ItemType>[]>([]);

  const resolveOptions = useCallback(
    async (phrase: string) => {
      // As an optimisation we don't resolve the options again if the phrase has
      // not changed. This may need to be controlled via a prop if the source of options
      // is changing more frequently than typically expected.
      if (lastPhrase.current === phrase) {
        return;
      }

      lastPhrase.current = phrase;

      // Respect minimumSearchLength and don't resolve options if the threshold isn't met
      if (
        configuration.minimumSearchLength &&
        (phrase === undefined || phrase.length < configuration.minimumSearchLength)
      ) {
        return;
      }

      // Keep track of our delayed loading indicator - clear any previous timer before starting a new one
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        // Let the UI know that we're working on it. The time out debounces this a little
        // so that any async option resolution has an opportunity to finish before showing
        // the loading indicator. This prevents the loading indicator flashing to the user
        // if the items could have loaded before they would have even noticed.
        setLoading(true);
      }, 200);

      // Normalise the optionsSource prop. For convenience the user can pass a single option
      // source or an array of sources. To make this easier to work with we will convert
      // the single source variant into an array.
      const sources: OptionSource<ItemType>[] =
        configuration.options instanceof OptionSourceSet
          ? configuration.options.sources
          : [configuration.options];

      const loadingPromises = [];

      for (const source of sources) {
        if (isOptionSourceDelegate(source)) {
          // Using Promise.resolve() here normalises the return value of the source which
          // can be a literal value or a promise. Promise.resolve() returns a promise either
          // way.
          // We don't use await here because we might have multiple sources that need
          // blended together and we'll want to wait for them all to resolve using
          // Promise.all();

          loadingPromises.push(
            processOptionSourceResults(
              await Promise.resolve(source(configuration.phrase)),
              configuration.itemToOptionTransformer
            )
          );
        } else {
          const items = processOptionSourceResults(
            await Promise.resolve(source),
            configuration.itemToOptionTransformer
          );

          const filteredItems = configuration.phrase
            ? items.filter((o) => {
                return (
                  configuration.phrase &&
                  o.label.toLowerCase().includes(configuration.phrase.toLowerCase())
                );
              })
            : items;

          loadingPromises.push(filteredItems);
        }
      }

      // Wait for all of the sources to resolve to arrays of items.
      const aggregatedResults = await Promise.all(loadingPromises);

      // Flatten all the options from all the sources into a single array.
      let resolvedOptions: OptionItem<ItemType>[] = [];

      resolvedOptions = resolvedOptions.concat.apply([], aggregatedResults);

      setOptions(resolvedOptions);

      clearTimeout(timeoutRef.current);
      setLoading(false);
    },
    [
      configuration.options,
      configuration.minimumSearchLength,
      configuration.phrase,
      configuration.itemToOptionTransformer,
    ]
  );

  useEffect(() => {
    void resolveOptions(configuration.phrase ?? "");
  }, [configuration.phrase, resolveOptions]);

  return {
    options,
    loading,
  };
};

/**
 * The default transformer for items into options.
 *
 * Supports the following:
 *
 * - Objects with a 'name' property as the option label
 * - Objects without a 'name' property will have toString() called
 * - Non objects will have toString() called as the option label
 * - The value will always be the item.
 *
 * If you want to different transform simply provide the createOptionFromItemDelegate
 * option to the hook.
 *
 * @param item
 * @returns
 */
export const defaultCreateOptionFromItemDelegate = <ItemType>(
  item: ItemType
): OptionItem<ItemType> => {
  let label = "";

  switch (typeof item) {
    case "string":
      label = item;
      break;
    case "number":
    case "boolean":
      label = item.toString();
      break;
    case "object":
      if (item) {
        if ("name" in item && typeof item.name === "string") {
          label = item.name;
        } else {
          label = item.toString();
        }
      }
      break;
  }

  return new OptionItem(label, item);
};

/**
 * Parse the results of an option source and return an array of concrete options
 */
const processOptionSourceResults = <ItemType>(
  sourceResults: (OptionItem<ItemType> | ItemType)[],
  createOptionDelegate?: (item: ItemType) => OptionItem<ItemType>
) => {
  const options = [];
  for (const result of sourceResults) {
    if (result instanceof OptionItem) {
      options.push(result);
    } else {
      options.push(
        createOptionDelegate
          ? createOptionDelegate(result)
          : defaultCreateOptionFromItemDelegate<ItemType>(result)
      );
    }
  }

  return options;
};

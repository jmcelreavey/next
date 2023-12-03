import { useCallback, useState } from "react";

export interface UseHighlightedOptionConfiguration {
  /**
   * The list of all possible items
   */
  numberOfItems: number;

  /**
   * The currently selected (not highlighted) item. This becomes the starting point
   * for highlighting.
   */
  selectedIndex?: number;

  disabledIndices?: number[];
}

export const useHighlightedOption = (configuration: UseHighlightedOptionConfiguration) => {
  const [highlightedIndex, highlightIndex] = useState<number>();
  const { numberOfItems, selectedIndex, disabledIndices = [] } = configuration;

  const highlightNextOption = useCallback(
    (direction: "ArrowUp" | "ArrowDown") => {
      if (disabledIndices.length === numberOfItems) {
        // All options are disabled - no point doing anything.
        return;
      }

      const currentlyHighlightedIndex = highlightedIndex ?? selectedIndex;

      let nextIndex = currentlyHighlightedIndex;

      do {
        if (nextIndex === undefined) {
          if (direction === "ArrowUp") {
            nextIndex = numberOfItems - 1;
          } else {
            nextIndex = 0;
          }
        } else {
          let indexToHighlight = 0;

          if (direction === "ArrowUp") {
            indexToHighlight = nextIndex - 1;

            if (indexToHighlight < 0) {
              // First item was highlighted, roll over to bottom
              indexToHighlight = numberOfItems - 1;
            }
          } else {
            indexToHighlight = nextIndex + 1;

            if (indexToHighlight >= numberOfItems) {
              // Last item highlighted, roll over to top
              indexToHighlight = 0;
            }
          }

          nextIndex = indexToHighlight;
        }
      } while (disabledIndices.includes(nextIndex));

      highlightIndex(nextIndex);
    },
    [highlightedIndex, numberOfItems, selectedIndex, disabledIndices]
  );

  const removeHighlight = useCallback(() => highlightIndex(undefined), []);

  return {
    highlightedIndex,
    highlightIndex,
    removeHighlight,
    highlightNextOption,
  };
};

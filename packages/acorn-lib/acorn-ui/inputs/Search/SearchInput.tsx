import { Icon } from "morse-react";
import { useState } from "react";
import type { SyntheticSelectInputProps } from "../Select/SyntheticSelectInput";
import { SyntheticSelectInputBase } from "../Select/SyntheticSelectInputBase";

export type SearchInputProps<
  ItemType,
  Multiple extends boolean = false
> = SyntheticSelectInputProps<ItemType, Multiple> & {
  fill?: boolean;
};

/**
 * Combines a Search component with the Select component to provide a refinable
 * source of options to present in a Listbox underneath the search.
 *
 * You might use this for search suggestions etc.
 *
 * @param props
 * @returns
 */
export const SearchInput = <ItemType, Multiple extends boolean = false>(
  props: SearchInputProps<ItemType, Multiple>
) => {
  const {
    className,
    fill = true,
    placeholder = "Search for an item",
    ...rest
  } = props;
  const [searchText, setSearchText] = useState<string>();
  const classes = ["ac-search-input", className ?? ""];

  return (
    <SyntheticSelectInputBase<ItemType, Multiple>
      className={classes.join(" ")}
      {...rest}
      phrase={searchText}
      renderTrigger={(context, focusableElementRef, selectedOptions) => {
        const showInput =
          context.isShown ||
          (selectedOptions.length === 0 && searchText === undefined);
        const chosenPlaceholder =
          (selectedOptions.length > 0
            ? selectedOptions[0]?.label ?? ""
            : placeholder) || "";

        const classes = ["c-input", "+text", "+icon", fill ? "+fill" : ""]
          .filter(Boolean)
          .join(" ");

        return (
          <div className={classes}>
            <input
              name={rest.name}
              className={
                "c-input c-input__box +reset +no-border" +
                (!showInput ? " u-hide" : "")
              }
              onFocus={() => {
                if (!context.isShown) {
                  focusableElementRef.current?.parentElement &&
                    context.show(focusableElementRef.current.parentElement);
                }
              }}
              ref={focusableElementRef}
              onChange={(e) => {
                setSearchText(e.currentTarget.value);
              }}
              onKeyUp={(e) => {
                if (e.key !== "Enter") {
                  if (!context.isShown) {
                    focusableElementRef.current?.parentElement &&
                      context.show(focusableElementRef.current.parentElement);
                  }
                }
              }}
              value={searchText}
              placeholder={chosenPlaceholder}
            />
            {!showInput && (
              <div
                className="ac-search-input__placeholder"
                onClick={() => focusableElementRef.current?.focus()}
              >
                {selectedOptions[0]?.label ?? chosenPlaceholder}
              </div>
            )}
            <Icon
              iconName={"icon-search"}
              className="c-input__icon"
              onClick={() => {
                if (selectedOptions.length > 0) {
                  props.onValueChange?.(undefined);
                  if (!context.isShown) {
                    focusableElementRef.current?.parentElement &&
                      context.show(focusableElementRef.current.parentElement);
                  }
                  focusableElementRef.current?.focus();
                }
              }}
            />
          </div>
        );
      }}
    />
  );
};

import { Icon } from "morse-react";
import type { ComponentProps } from "react";
import { makeAcornComponent } from "../../utility/makeAcornComponent";

const SearchContainer = makeAcornComponent("ac-search");

/**
 * Search creates a borderless text input inside a faux input wrapper that includes
 * a search icon.
 *
 * Use this component when building complex search interfaces for which SearchInput
 * cannot be used.
 *
 * > This component does not provide any functionality but all props of a
 * > text input can be passed through to register event handlers on the input.
 * >
 * > Consider first if SearchInput would serve your needs.
 *
 * @param props
 * @returns
 */
export const Search = (
  props: Omit<ComponentProps<typeof SearchContainer>, "onChange"> & ComponentProps<"input">
) => {
  const { className, children, ...rest } = props;
  return (
    <SearchContainer>
      <Icon iconName="icon-search" className="ac-search__icon" />
      <input className={"c-input +text " + (className ?? "")} type="text" {...rest} />
      {children}
    </SearchContainer>
  );
};

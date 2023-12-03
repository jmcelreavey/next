import { SelectButton } from "./SelectButton";
import {
  SyntheticSelectInputBase
  
} from "./SyntheticSelectInputBase";
import type {SyntheticSelectInputBaseProps} from "./SyntheticSelectInputBase";

export type SyntheticSelectInputProps<
  ItemType,
  Multiple extends boolean = false
> = SyntheticSelectInputBaseProps<ItemType, Multiple>;

export const SyntheticSelectInput = <ItemType, Multiple extends boolean = false>(
  props: SyntheticSelectInputProps<ItemType, Multiple>
) => {
  const { className, placeholder = "Select an option", ...rest } = props;
  const classes = ["ac-synthetic-select", className ?? ""];

  return (
    <SyntheticSelectInputBase<ItemType, Multiple>
      className={classes.join(" ")}
      {...rest}
      renderTrigger={(context, focusableElementRef, selectedOptions) => {
        return (
          <SelectButton
            fill
            focusableElementRef={focusableElementRef}
            onFocus={(element) => {
              if (!context.isShown) {
                element && context.show(element);
              }
            }}
            onKeyUp={(e) => {
              if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                if (!context.isShown) {
                  e.currentTarget.parentElement && context.show(e.currentTarget.parentElement);
                }
              }
            }}
          >
            {selectedOptions.length > 0 ? selectedOptions[0]?.label ?? placeholder : placeholder}
          </SelectButton>
        );
      }}
    />
  );
};

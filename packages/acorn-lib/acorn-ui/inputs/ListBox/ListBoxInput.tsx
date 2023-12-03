import { useOptionsSource } from "../Select/hooks/useOptionsSource";
import { transformAnyItemToStringValue } from "../Select/types/OptionValueTransformDelegates";
import type { SelectInputProps } from "../Select/types/SelectInputProps";
import { ListBox, ListBoxBody, ListBoxItem } from "./ListBox";

export type ListBoxInputProps<ItemType> = Omit<
  SelectInputProps<ItemType, false> & {
    placeholder?: string | false;
    name?: string;
    autoFocus?: boolean;
    disabled?: boolean;
  },
  "multiple"
>;

/**
 * Presents a list of selectable options as an input
 *
 * @param props
 * @returns
 */
export const ListBoxInput = <ItemType,>(props: ListBoxInputProps<ItemType>) => {
  const { options, loading } = useOptionsSource({
    options: props.options,
    itemToOptionTransformer: props.itemToOptionTransformer,
  });

  return (
    <ListBox>
      <ListBoxBody
        onItemSelected={(index: number) => {
          if (options[index]?.disabled) {
            return;
          }
          props.onValueChange?.(options[index]?.item);
        }}
      >
        {options.map((option, i) => {
          const selected =
            transformAnyItemToStringValue(option.item) ===
            transformAnyItemToStringValue(props.value);
          return (
            <ListBoxItem
              disabled={option.disabled}
              selected={selected}
              key={transformAnyItemToStringValue(option.item) ?? i}
            >
              {option.label}
            </ListBoxItem>
          );
        })}
      </ListBoxBody>
    </ListBox>
  );
};

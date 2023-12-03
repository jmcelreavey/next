import { useOptionsSource } from "./hooks/useOptionsSource";
import { Select } from "./Select";
import { OptionItem } from "./types/OptionItem";
import { transformAnyItemToStringValue } from "./types/OptionValueTransformDelegates";
import type { SelectInputProps } from "./types/SelectInputProps";

export type HtmlSelectProps<ItemType> = Omit<
  SelectInputProps<ItemType, false> & {
    placeholder?: string | false;
    disabled?: boolean;
  },
  "multiple"
>;

/**
 * A Select input that uses the native HTML select element while providing support for
 * options loading using the `useOptionsSource` hook.
 * @param props
 * @returns
 */
export const SelectInput = <ItemType,>(props: HtmlSelectProps<ItemType>) => {
  const { placeholder } = props;

  const { options, loading } = useOptionsSource({
    options: props.options,
    itemToOptionTransformer: props.itemToOptionTransformer,
  });

  const selectedHtmlValue = props.value
    ? transformAnyItemToStringValue(props.value)
    : undefined;

  let finalOptions = options;

  if (finalOptions.length === 0) {
    if (loading) {
      finalOptions = [new OptionItem("Loading items..."), ...finalOptions];
    }
  }

  if (placeholder !== false) {
    finalOptions = [
      new OptionItem(placeholder ?? "Please select"),
      ...finalOptions,
    ];
  }

  return (
    <Select
      disabled={props.disabled}
      onChange={(e) => {
        // Return the item for this value.
        const foundOption = finalOptions.find(
          (option) =>
            transformAnyItemToStringValue(option.item) === e.currentTarget.value
        );

        props.onValueChange?.(foundOption?.item);
      }}
    >
      {finalOptions.map((option) => {
        const htmlValue = transformAnyItemToStringValue(option.item);

        return (
          <option
            key={htmlValue ?? "-"}
            value={htmlValue}
            selected={selectedHtmlValue === htmlValue}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        );
      })}
    </Select>
  );
};

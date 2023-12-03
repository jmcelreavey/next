import type { ChangeEvent, ComponentProps } from "react";
import React from "react";
import type { SyntheticInputProps } from "../types/SyntheticInputProps";
import { Checkbox } from "./Checkbox";

interface CheckboxInputProps<CheckedValueType, UnCheckedValueType> {
  checkedValue?: CheckedValueType;
  unCheckedValue?: UnCheckedValueType;
}

export const CheckboxInput = <CheckedValueType = true, UnCheckedValueType = false>(
  props: CheckboxInputProps<CheckedValueType, UnCheckedValueType> &
    SyntheticInputProps<CheckedValueType | UnCheckedValueType> &
    ComponentProps<typeof Checkbox>
) => {
  const { checkedValue = true, unCheckedValue = false } = props;

  return (
    <Checkbox
      checked={props.value === checkedValue}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        props.onChange?.(e);
        if (e.currentTarget.checked) {
          // @ts-expect-error The literal value defaults provided can't be
          // assigned despite the generic defaults existing.
          props.onValueChange?.(checkedValue);
        } else {
          // @ts-expect-error The literal value defaults provided can't be
          // assigned despite the generic defaults existing.
          props.onValueChange?.(unCheckedValue);
        }
      }}
    />
  );
};

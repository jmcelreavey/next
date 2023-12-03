import type { ComponentProps } from "react";
import React from "react";
import { TextArea as MorseTextArea } from "morse-react";
import type { SyntheticInputProps } from "../types/SyntheticInputProps";

export const TextAreaInput = (
  props: SyntheticInputProps<string> & ComponentProps<typeof MorseTextArea>
) => {
  return (
    <MorseTextArea
      {...props}
      onChange={(e) => {
        props.onChange?.(e);
        // Satisfy synthetic input requirements
        props.onValueChange?.(e.currentTarget.value);
      }}
    />
  );
};

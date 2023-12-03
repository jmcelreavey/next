import type { InputProps } from "morse-react";
import { Input } from "morse-react";
import { forwardRef } from "react";
import type { SyntheticInputProps } from "../types/SyntheticInputProps";

type TextBoxInputProps = SyntheticInputProps<string> & Omit<InputProps, "text" | "ref">;

export const TextBoxInput = forwardRef<HTMLInputElement, TextBoxInputProps>((props, ref) => {
  return (
    <Input
      className="+text"
      type="text"
      {...props}
      ref={ref}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange?.(e);
        // Satisfy synthetic input requirements
        props.onValueChange?.(e.currentTarget.value);
      }}
    />
  );
});

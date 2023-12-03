import type { InputProps } from "morse-react";
import { Input } from "morse-react";
import type { ForwardedRef, MutableRefObject, RefObject } from "react";

/**
 * A custom checkbox which is still accessible but allows for more
 * control over the styling.
 */
interface CheckboxProps extends InputProps {
  ref?:
    | ((instance: HTMLInputElement | null) => void)
    | RefObject<HTMLInputElement>
     
    | MutableRefObject<HTMLInputElement>
    | null
    | undefined
    | ForwardedRef<HTMLInputElement>;
  label?: string;
}

export const Checkbox = (props: CheckboxProps) => {
  return (
    <label className="ac-checkbox">
      <Input className="+checkbox" type="checkbox" {...props} />
      <span className="ac-checkbox__label">{props.label}</span>
    </label>
  );
};

import type { InputProps } from "morse-react";
import { Input } from "morse-react";
import type { ForwardedRef, MutableRefObject, RefObject } from "react";

/**
 * A custom checkbox which is still accessible but allows for more
 * control over the styling.
 */
interface ColouredCheckboxProps extends InputProps {
  ref?:
    | ((instance: HTMLInputElement | null) => void)
    | RefObject<HTMLInputElement>
    | MutableRefObject<HTMLInputElement>
    | null
    | undefined
    | ForwardedRef<HTMLInputElement>;
  label?: string;
  colour?: string;
}

export const ColouredCheckbox = (props: ColouredCheckboxProps) => {
  const style = { "background-color": props.colour } as React.CSSProperties;
  return (
    <label className="ac-checkbox">
      <Input className="+checkbox" type="checkbox" style={style} {...props} />
      <span className="ac-checkbox__label">{props.label}</span>
    </label>
  );
};

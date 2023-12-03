import type { RefObject} from "react";
import { useEffect, useState } from "react";

export interface UseFocusConfiguration {
  /**
   * Instructs the component to attempt to steal browser focus after the
   * component's initial render.
   */
  autoFocus?: boolean;

  ref: RefObject<HTMLInputElement>;

  preventScroll?: boolean;
}

export const useFocus = (configuration: UseFocusConfiguration) => {
  const [isFocussed, setIsFocussed] = useState(false);

  useEffect(() => {
    if (configuration.autoFocus) {
      configuration.ref.current?.focus({ preventScroll: configuration.preventScroll });
      setIsFocussed(true);
    }
  }, [configuration.preventScroll, configuration.ref, configuration.autoFocus]);

  const stealFocus = () => {
    configuration.ref.current?.focus({ preventScroll: configuration.preventScroll });
  };

  const onFocus = () => setIsFocussed(true);
  const onBlur = () => setIsFocussed(false);

  return {
    isFocussed,
    stealFocus,
    onFocus,
    onBlur,
  };
};

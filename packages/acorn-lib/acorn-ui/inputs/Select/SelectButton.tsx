import type { CustomisableRootComponentProps } from "morse-react/dist/CustomisableRootComponent";
import { FocusHelper } from "morse-react/dist/components/select/components/FocusHelper";
import distillUtilityClasses from "morse-react/dist/utility/distillUtilityClasses";
import type { MutableRefObject, PropsWithChildren} from "react";
import React, { useCallback, useEffect, useRef } from "react";
import { useFocus } from "../hooks/useFocus";

export type SelectButtonProps = CustomisableRootComponentProps<
  "div",
  {
    className?: string;
    fill?: boolean;
    auto?: boolean;
    blank?: boolean;
    reset?: boolean;
    tight?: boolean;

    /**
     * If the select contains content that is focusable, we won't need to add a focus
     * helper.
     */
    focusableElementRef?: MutableRefObject<HTMLInputElement | null>;

    /**
     * True if no focus helper is required because the content of the select
     * will contain a focusable element.
     */
    contentContainsFocusableElement?: boolean;

    onBlur?: (element?: HTMLDivElement | null) => void;
    onFocus?: (element?: HTMLDivElement | null) => void;
  }
>;

/**
 * A select button presents a faux input that looks like a dropdown input.
 *
 * It does not have any behaviours of its own but can be used to build
 * other more complex controls.
 *
 * SelectButton does use a focus tracker to allow it to be focussed to
 * complete the faux input effect.
 *
 *
 * @see Select
 * @see SelectInput
 * @param props
 * @returns
 */
export const SelectButton = (props: PropsWithChildren<SelectButtonProps>) => {
  const {
    fill,
    auto,
    blank,
    reset,
    tight,
    children,
    className,
    focusableElementRef,
    contentContainsFocusableElement,
    ...utilityAndSelectProps
  } = props;

  const [utilityProps] = distillUtilityClasses(utilityAndSelectProps);

  const focusRef = useRef<HTMLInputElement>(null);

  // We support both an externally tracked ref (when children contain the focussable
  // component) or an internally tracked ref (for the FocusHelper)
  const focusTrackerRef = focusableElementRef ?? focusRef;

  const { isFocussed, stealFocus, onFocus, onBlur } = useFocus({
    ref: focusTrackerRef,
  });

  const classes = [
    "c-select",
    fill ? "+fill" : "",
    isFocussed ? "+focus" : "",
    auto ? "+auto" : "",
    blank ? "+blank" : "",
    reset ? "+reset" : "",
    tight ? "+tight" : "",
    ...utilityProps,
    className,
  ].filter((item) => !!item);

  const divRef = useRef<HTMLDivElement>(null);

  const onFocusTrackerFocus = useCallback(() => {
    onFocus();
    props.onFocus?.(divRef.current);
  }, [onFocus, props]);

  const onFocusTrackerKeyUp = useCallback(
    (event: KeyboardEvent) => {
      props.onKeyUp?.(event as unknown as React.KeyboardEvent<HTMLInputElement>);
    },
    [props]
  );

  const onFocusTrackerBlur = useCallback(() => {
    onBlur();
    props.onBlur?.(divRef.current);
  }, [onBlur, props]);

  useEffect(() => {
    const focustTrackerElement = focusTrackerRef?.current;
    if (focustTrackerElement) {
      focustTrackerElement.addEventListener("focus", onFocusTrackerFocus);
      focustTrackerElement.addEventListener("keyup", onFocusTrackerKeyUp);
      focustTrackerElement.addEventListener("blur", onFocusTrackerBlur);
    }
    return () => {
      if (focustTrackerElement) {
        focustTrackerElement.removeEventListener("focus", onFocusTrackerFocus);
        focustTrackerElement.removeEventListener("keyup", onFocusTrackerKeyUp);
        focustTrackerElement.removeEventListener("blur", onFocusTrackerBlur);
      }
    };
  }, [focusTrackerRef, onFocusTrackerBlur, onFocusTrackerFocus, onFocusTrackerKeyUp]);

  return (
    <div
      className={classes.join(" ")}
      onClick={() => {
        stealFocus();
      }}
      ref={divRef}
    >
      {!contentContainsFocusableElement && <FocusHelper ref={focusTrackerRef} />}

      {children}
    </div>
  );
};

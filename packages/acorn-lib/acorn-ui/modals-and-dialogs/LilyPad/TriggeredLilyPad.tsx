import type { ReactElement } from "react";
import React, { useCallback, useMemo, useRef, useState } from "react";
import type { LilyPadProps } from "./LilyPad";
import { LilyPad } from "./LilyPad";

export interface TriggeredLilyPadContextType {
  show: (anchorElement?: HTMLElement) => void;
  hide: () => void;
  toggle: (anchorElement?: HTMLElement) => void;
  isShown: boolean;
}

export const TriggeredLilyPadContext =
  React.createContext<TriggeredLilyPadContextType>({
    show: () => {},
    hide: () => {},
    toggle: () => {},
    isShown: false,
  });

export type TriggeredLilyPadProps = Pick<
  LilyPadProps,
  | "children"
  | "anchorElementClickable"
  | "anchorOrigin"
  | "origin"
  | "size"
  | "preventDismissByClickAway"
  | "preventDismissByEsc"
  | "disableXSnapping"
  | "disableYSnapping"
  | "className"
> & {
  renderTrigger?: (context: TriggeredLilyPadContextType) => ReactElement;
  anchorRef?: React.RefObject<HTMLElement>;
};

/**
 * A TriggeredLilyPad combines a LilyPad with a rendered trigger that makes it
 * easy to show and hide a lily pad as the result of interaction with another
 * component.
 *
 * @param props
 * @returns
 */
export const TriggeredLilyPad = (props: TriggeredLilyPadProps) => {
  const { renderTrigger, anchorRef, ...rest } = props;
  const [shown, setShown] = useState(false);
  const customAnchorRef = useRef<HTMLElement | null>(null);
  const fallbackAnchorRef = useRef<HTMLDivElement>(null);

  const show = useCallback((anchorElement?: HTMLElement) => {
    setShown(true);

    if (anchorElement) {
      customAnchorRef.current = anchorElement;
    }
  }, []);

  const context = useMemo(
    () => ({
      show,
      hide: () => setShown(false),
      toggle: (anchorElement?: HTMLElement) => {
        if (shown) {
          setShown(false);
        } else {
          show(anchorElement);
        }
      },
      isShown: shown,
    }),
    [show, shown]
  );

  const triggerElement = renderTrigger ?? (() => null);

  return (
    <TriggeredLilyPadContext.Provider value={context}>
      {/* Note that the trigger is always wrapped in a div with a fallback ref
       * which is necessary for anchoring the lily pad if no other ref is passed
       * in the anchorRef prop, or element via the show() method. If we conditionally
       * rendered this then the trigger ends up being unmounted before the LilyPad can
       * get a measure of the trigger's bounding rectange (as it's now unmounted) */}
      <div ref={fallbackAnchorRef} className="u-pos-rel">
        <TriggeredLilyPadContext.Consumer children={triggerElement} />
      </div>

      <LilyPad
        {...rest}
        onRequestClose={() => setShown(false)}
        anchorElement={
          customAnchorRef.current ??
          anchorRef?.current ??
          fallbackAnchorRef.current
        }
        isOpen={shown}
      />
    </TriggeredLilyPadContext.Provider>
  );
};

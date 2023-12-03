// TODO - export these hooks from morse-react properly.
import { FocusHelper } from "morse-react/dist/components/select/components/FocusHelper";
import { useFocus } from "morse-react/dist/components/select/hooks/useFocus";
import { useListKeyboardNavigation } from "morse-react/dist/components/select/hooks/useListKeyboardNavigation";
import type { ComponentProps, PropsWithChildren } from "react";
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { useHighlightedOption } from "../Select/hooks/useHighlightedOption";

export interface ListBoxProps {}

/**
 * Presents a list of selectable options.
 *
 * Each child can be wrapped in an li. If a child is not wrapped in an li, the Menu
 * component will auto wrap it.
 *
 * @param props
 * @returns
 */
export const ListBox = (
  props: PropsWithChildren<ListBoxProps & ComponentProps<"div">>
) => {
  const { className, ...rest } = props;
  const classes = ["ac-listbox", props.className];

  return (
    <div className={classes.join(" ")} {...rest}>
      {props.children}
    </div>
  );
};

export interface ListBoxBodyProps {
  name?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  onItemSelected?: (index: number) => void;
  /**
   * If the ListBox is being 'slaved' to another element on the page pass
   * a ref to this element. For example if you have an external text
   * box that should capture keyboard events and control the highlighted
   * value in the list. If passed, the listbox will become unfocusable itself.
   */
  focusableElementRef?: React.MutableRefObject<HTMLInputElement | null>;
}

export const ListBoxBody = (
  props: PropsWithChildren<ListBoxBodyProps & ComponentProps<"div">>
) => {
  const focusRef = useRef<HTMLInputElement>(null);
  const focusTrackingRef = props.focusableElementRef ?? focusRef;

  const { isFocussed, stealFocus, onFocus, onBlur } = useFocus({
    autoFocus: props.autoFocus,
    ref: props.focusableElementRef ?? focusRef,
  });

  const { children, onItemSelected } = props;

  // Normalise possible child variants to an array.
  const childrenArray = React.Children.toArray(children);

  const disabledIndices: number[] = [];
  childrenArray.forEach((child, index) => {
    if (
      typeof child === "object" &&
      "props" in child &&
      child.props?.disabled
    ) {
      disabledIndices.push(index);
    }
  });

  const selectedIndex = childrenArray?.findIndex(
    (child) =>
      typeof child === "object" && "props" in child && child.props?.selected
  );

  const { highlightedIndex, removeHighlight, highlightNextOption } =
    useHighlightedOption({
      numberOfItems: childrenArray?.length ?? 0,
      selectedIndex,
      disabledIndices,
    });

  const onSelect = useCallback(
    (index: number) => {
      removeHighlight();
      onItemSelected?.(index);
    },
    [removeHighlight, onItemSelected]
  );

  const { onKeyDown } = useListKeyboardNavigation({
    disabled: !!props.disabled,
    textInputActive: true, //!!props.searchable || !!props.inlineSearch,
    onActivationKeyPress: useCallback(
      (e: React.KeyboardEvent) => {
        if (highlightedIndex !== undefined) {
          onSelect(highlightedIndex);
        }
        e.stopPropagation();
      },
      [highlightedIndex, onSelect]
    ),
    onArrowNavigation: useCallback(
      (key: "ArrowUp" | "ArrowDown", e: React.KeyboardEvent) => {
        highlightNextOption(key);
      },
      [highlightNextOption]
    ),
    onUnhandledKeyPress: removeHighlight,
  });

  useEffect(() => {
    const focusableElementElement = focusTrackingRef?.current;

    if (focusableElementElement) {
      focusableElementElement.addEventListener(
        "keydown",
        onKeyDown as unknown as EventListener
      );
    }
    return () => {
      if (focusableElementElement) {
        focusableElementElement.removeEventListener(
          "keydown",
          onKeyDown as unknown as EventListener
        );
      }
    };
  }, [onKeyDown, focusTrackingRef]);

  const classNames = ["ac-listbox__body"];

  if (isFocussed) {
    classNames.push("+focus");
  }

  const itemContainerRef = useRef<HTMLOListElement>(null);
  const useBrowserLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

  useBrowserLayoutEffect(() => {
    if (!itemContainerRef.current) {
      return;
    }

    if (!isFocussed) {
      return;
    }

    let itemOfInterest =
      itemContainerRef.current.querySelector(".\\+highlighted");

    if (!itemOfInterest) {
      itemOfInterest = itemContainerRef.current.querySelector(".\\+selected");
    }

    if (!itemOfInterest) {
      return;
    }

    const parentRect = itemContainerRef.current.getBoundingClientRect();
    const interestRect = itemOfInterest.getBoundingClientRect();

    if (
      !(
        interestRect.top >= 0 &&
        interestRect.left >= 0 &&
        interestRect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        interestRect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      )
    ) {
      itemOfInterest.scrollIntoView(true);
    }

    if (interestRect.bottom > parentRect.bottom) {
      itemOfInterest.scrollIntoView(false);
    } else if (interestRect.top < parentRect.top) {
      itemOfInterest.scrollIntoView(true);
    }
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const onClickListener = useCallback(
    (e: MouseEvent) => {
      stealFocus();
      if (e.target) {
        // Get the li parent
        let target: HTMLElement | null = e.target as HTMLElement;
        while (target && target.tagName !== "LI") {
          target = target.parentElement;
          if (target === itemContainerRef.current) {
            // No point going up the entire DOM!
            break;
          }
        }

        if (!target) {
          return;
        }

        const index = target.getAttribute("data-idx");

        if (index !== undefined && index !== null) {
          onSelect(Number(index));
        }
      }
    },
    [onSelect, stealFocus]
  );

  useBrowserLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const containerElement = containerRef.current;

    containerElement.addEventListener("click", onClickListener);

    return () => {
      if (containerElement) {
        containerElement.removeEventListener("click", onClickListener);
      }
    };
  }, [onClickListener]);

  return (
    <div
      className={classNames.join(" ")}
      ref={containerRef}
      onClick={(e) => {}}
      onMouseDown={(e) => e.preventDefault()}
    >
      {!props.focusableElementRef && (
        <FocusHelper
          ref={focusRef}
          name={props.name}
          id={props.name}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      )}
      <ol className="ac-listbox__list" ref={itemContainerRef}>
        {childrenArray?.map((child, index) => (
          <ListBoxContext.Provider
            key={index}
            value={{
              index,
              highlighted: index === highlightedIndex,
            }}
          >
            {child}
          </ListBoxContext.Provider>
        ))}
      </ol>
    </div>
  );
};

interface ListBoxContextType {
  highlighted: boolean;
  index: number;
}

const ListBoxContext = React.createContext<ListBoxContextType>({
  highlighted: false,
  index: 0,
});

export const ListBoxFoot = (
  props: PropsWithChildren<ComponentProps<"div">>
) => {
  const { className, ...rest } = props;
  const classes = ["ac-listbox__foot", props.className];

  return (
    <div className={classes.join(" ")} {...rest}>
      {props.children}
    </div>
  );
};

export const ListBoxHead = (
  props: PropsWithChildren<ComponentProps<"div">>
) => {
  const { className, ...rest } = props;
  const classes = ["ac-listbox__head", props.className];

  return (
    <div className={classes.join(" ")} {...rest}>
      {props.children}
    </div>
  );
};

export interface ListBoxItemProps {
  className?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLLIElement>;
}

export const ListBoxItem = (props: PropsWithChildren<ListBoxItemProps>) => {
  const listBoxContext = useContext<ListBoxContextType>(ListBoxContext);
  const classes = [
    "ac-listbox__item",
    props.className,
    props.disabled ? " +disabled" : "",
    props.selected ? " +selected" : "",
    listBoxContext.highlighted ? " +highlighted" : "",
  ];
  return (
    <li
      onClick={props.onClick}
      data-idx={listBoxContext.index}
      className={classes.join(" ")}
    >
      {props.children}
    </li>
  );
};

ListBox.Head = ListBoxHead;
ListBox.Foot = ListBoxFoot;
ListBox.Body = ListBoxBody;
ListBox.Item = ListBoxItem;

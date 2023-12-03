import type { ModalProps } from "morse-react";
import { debounce, Modal } from "morse-react";
import type { PropsWithChildren } from "react";
import React, { useCallback, useEffect, useRef } from "react";

export type LilyPadProps = ModalProps &
  PropsWithChildren<{
    anchorOrigin?: Position;
    anchorElement?: HTMLElement | null;
    anchorElementClickable?: boolean;

    draggable?: boolean;

    origin?: Position;
    size?: LilyPadSize;

    disableXSnapping?: boolean;
    disableYSnapping?: boolean;
  }>;

enum VerticalAlignment {
  Top = 1,
  Middle = 2,
  Bottom = 4,
}

enum HorizontalAlignment {
  Left = 8,
  Center = 16,
  Right = 32,
}

export enum Position {
  TopLeft = VerticalAlignment.Top | HorizontalAlignment.Left,
  MiddleLeft = VerticalAlignment.Middle | HorizontalAlignment.Left,
  BottomLeft = VerticalAlignment.Bottom | HorizontalAlignment.Left,

  TopCenter = VerticalAlignment.Top | HorizontalAlignment.Center,
  MiddleCenter = VerticalAlignment.Middle | HorizontalAlignment.Center,
  BottomCenter = VerticalAlignment.Bottom | HorizontalAlignment.Center,

  TopRight = VerticalAlignment.Top | HorizontalAlignment.Right,
  MiddleRight = VerticalAlignment.Middle | HorizontalAlignment.Right,
  BottomRight = VerticalAlignment.Bottom | HorizontalAlignment.Right,
}

export interface LilyPadSize {
  width: "auto" | "matchAnchor" | "minimumAnchor" | string;
  height: "auto" | "matchAnchor" | "minimumAnchor" | string;
}

const SNAP_THRESHOLD = 16;

const getTopOffset = (rectangle: DOMRect, position: Position) => {
  if (VerticalAlignment.Bottom & position) {
    return rectangle.height;
  } else if (VerticalAlignment.Middle & position) {
    return rectangle.height / 2;
  }

  return 0;
};

const getLeftOffset = (rectangle: DOMRect, position: Position) => {
  if (HorizontalAlignment.Right & position) {
    return rectangle.width;
  } else if (HorizontalAlignment.Center & position) {
    return rectangle.width / 2;
  }

  return 0;
};

/**
 * Presents a panel that floats on top of other content. The panel can be anchored
 * to another element, and will snap to the edges of the viewport if there is not
 * enough room for it to be displayed.
 *
 * It can also be anchored to nothing and supports dragging.
 *
 * Credit to Chris Wilkinson who wrote most of this component in an earlier version
 * of Morse.
 */
export const LilyPad = (props: LilyPadProps) => {
  // Destructure LilyPad props
  let { anchorOrigin, origin, ...constantProps } = props;

  const {
    anchorElement,
    size = {
      width: "auto",
      height: "auto",
    },
    className,
    draggable,
    anchorElementClickable,
    ...modalProps
  } = constantProps;

  const lilyPadRef = useRef<HTMLDivElement>(null);

  let isDragging = false;
  let dragTopOffset = 0;
  let dragLeftOffset = 0;

  const classes: string[] = [];

  const setPosition = useCallback(() => {
    const LilyPadEl = lilyPadRef.current;

    if (!LilyPadEl) {
      return;
    }

    LilyPadEl.style.position = "absolute";

    let top = 0;
    let bottom: number | undefined = undefined; // Stays undefined unless required (when space is tight and flipping disabled)
    let left = 0;

    let anchorRect: DOMRect;

    if (anchorElement) {
      anchorRect = anchorElement.getBoundingClientRect();
      anchorOrigin ??= Position.BottomLeft;
      origin ??= Position.TopLeft;
    } else {
      // Use the body as the anchor
      anchorRect = document.documentElement.getBoundingClientRect();
      anchorOrigin = Position.MiddleCenter;
      origin = Position.MiddleCenter;
    }

    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth;

    // SIZING
    switch (size.width) {
      case "auto":
        LilyPadEl.style.width = "";
        break;
      case "matchAnchor":
        LilyPadEl.style.width = anchorRect.width + "px";
        break;
      case "minimumAnchor":
        LilyPadEl.style.minWidth = anchorRect.width + "px";
        break;
      default:
        LilyPadEl.style.width = size.width;
    }

    switch (size.height) {
      case "auto":
        LilyPadEl.style.height = "";
        break;
      case "matchAnchor":
        LilyPadEl.style.height = anchorRect.height + "px";
        break;
      case "minimumAnchor":
        LilyPadEl.style.minHeight = anchorRect.height + "px";
        break;
      default:
        LilyPadEl.style.height = size.height;
    }

    const LilyPadRect = LilyPadEl.getBoundingClientRect();

    // POSITION

    // Set position of the anchor element
    top += anchorRect.top + getTopOffset(anchorRect, anchorOrigin);
    left += anchorRect.left + getLeftOffset(anchorRect, anchorOrigin);

    // Adjust for LilyPad origin
    top -= getTopOffset(LilyPadRect, origin);
    left -= getLeftOffset(LilyPadRect, origin);

    // SNAPPING

    // Flip Y direction if LilyPad is going to be outside viewport on Y axis.
    const LilyPadWouldFallOutsideViewPortOnYAxis =
      top < SNAP_THRESHOLD ||
      top + LilyPadRect.height > windowHeight - SNAP_THRESHOLD;

    let wouldBeTop = top;

    const LilyPadOriginIsTop = VerticalAlignment.Top & origin;
    const LilyPadOriginIsBottom = VerticalAlignment.Bottom & origin;

    if (!props.disableYSnapping && LilyPadWouldFallOutsideViewPortOnYAxis) {
      const anchorOriginIsTop = VerticalAlignment.Top & anchorOrigin;
      const anchorOriginIsBottom = VerticalAlignment.Bottom & anchorOrigin;

      if (
        (anchorOriginIsTop && LilyPadOriginIsTop) ||
        (anchorOriginIsBottom && LilyPadOriginIsBottom)
      ) {
        // Both LilyPad and origin are the same (both top or both bottom)
        // In this case, add/subtract the difference between the top/bottom respectively
        // to keep the direction snap inside the anchor
        if (anchorOriginIsTop) {
          wouldBeTop = anchorRect.bottom - LilyPadRect.height;
        } else {
          wouldBeTop = anchorRect.top;
        }
      } else {
        // Both LilyPad and origin are different (one top and one bottom or vice versa)
        // In this case, add/subtract the heights to snap over the anchor

        if (LilyPadOriginIsTop) {
          wouldBeTop -= LilyPadRect.height;
        } else if (LilyPadOriginIsBottom) {
          wouldBeTop += LilyPadRect.height;
        }

        // If the anchor origin isn't in the middle, then also need to snap
        // over the height of the anchor
        if (anchorOriginIsTop) {
          wouldBeTop += anchorRect.height;
        } else if (anchorOriginIsBottom) {
          wouldBeTop -= anchorRect.height;
        }
      }
    }

    /**
     * If the flipped LilyPad would still fall outside the viewport, calculate
     * if it has more room in it's original or flipped position
     */
    const flippedLilyPadWouldFallOutsideViewPortOnYAxis =
      wouldBeTop < SNAP_THRESHOLD ||
      wouldBeTop + LilyPadRect.height > windowHeight - SNAP_THRESHOLD;

    if (flippedLilyPadWouldFallOutsideViewPortOnYAxis) {
      // Work out best place (more room in original or flipped position)
      let originalDeltaOutsideViewport = 0;
      let wouldBeDeltaOutsideViewport = 0;

      if (LilyPadOriginIsTop) {
        // If LilyPad original is top, then original LilyPad top is guaranteed to be inside viewport
        originalDeltaOutsideViewport = top + LilyPadRect.height - windowHeight;
        wouldBeDeltaOutsideViewport = wouldBeTop;
      } else if (LilyPadOriginIsBottom) {
        // If LilyPad origin is bottom, then the original LilyPad top is probably going to be outside the viewport
        originalDeltaOutsideViewport = top;
        wouldBeDeltaOutsideViewport =
          wouldBeTop + LilyPadRect.height - windowHeight;
      }

      // There is more space on the original side when less of the LilyPad falls outside the viewport
      const moreSpaceOnOriginalSide =
        Math.abs(originalDeltaOutsideViewport) <
        Math.abs(wouldBeDeltaOutsideViewport);

      if (moreSpaceOnOriginalSide) {
        // There's more space in the original position, so better staying here, but lock LilyPad height
        if (LilyPadOriginIsTop) {
          // When LilyPad origin is top, stop the bottom going outside the viewport
          bottom = windowHeight - SNAP_THRESHOLD;
        } else {
          // When LilyPad origin is bottom, stop the top going outside the viewport
          bottom = top + LilyPadRect.height; // Put bottom where it would be
          top = SNAP_THRESHOLD; // Force top lower than top of viewport
        }
      } else {
        // There's more space in the flipped position, so flip, but lock LilyPad height
        if (LilyPadOriginIsTop) {
          top = SNAP_THRESHOLD;
          bottom = wouldBeTop + LilyPadRect.height - top - SNAP_THRESHOLD;
        } else {
          bottom = windowHeight - SNAP_THRESHOLD;
        }
      }
    } else {
      // Flipped LilyPad doesn't fall outside viewport, so set new position
      top = wouldBeTop;
    }

    if (
      !props.disableXSnapping &&
      (left < SNAP_THRESHOLD ||
        left + LilyPadRect.width > windowWidth - SNAP_THRESHOLD)
    ) {
      const anchorOriginIsLeft = HorizontalAlignment.Left & anchorOrigin;
      const anchorOriginIsRight = HorizontalAlignment.Right & anchorOrigin;

      const LilyPadOriginIsLeft = HorizontalAlignment.Left & origin;
      const LilyPadOriginIsRight = HorizontalAlignment.Right & origin;

      if (
        (anchorOriginIsLeft && LilyPadOriginIsLeft) ||
        (anchorOriginIsRight && LilyPadOriginIsRight)
      ) {
        // Both LilyPad and origin are the same (both left or both right)
        // In this case, add/subtract the difference between the left/right respectively
        // to keep the direction snap inside the anchor
        if (anchorOriginIsLeft) {
          left = anchorRect.right - LilyPadRect.width;
        } else {
          left = anchorRect.left;
        }
      } else {
        // Both LilyPad and origin are different (one left and one right or vice versa)
        // In this case, add/subtract the widths to snap over the anchor

        if (LilyPadOriginIsLeft) {
          left -= LilyPadRect.width;
        } else if (LilyPadOriginIsRight) {
          left += LilyPadRect.width;
        }

        // If the anchor origin isn't in the center, then also need to snap
        // over the width of the anchor
        if (anchorOriginIsLeft) {
          left += anchorRect.width;
        } else if (anchorOriginIsRight) {
          left -= anchorRect.width;
        }
      }
    }

    // Set styles on the element
    LilyPadEl.style.top = top + "px";
    LilyPadEl.style.left = left + "px";

    if (bottom !== undefined) {
      const LilyPadMaxHeight = top + bottom;
      const newLilyPadHeight =
        LilyPadRect.height < LilyPadMaxHeight
          ? LilyPadRect.height
          : LilyPadMaxHeight;

      LilyPadEl.style.height = newLilyPadHeight + "px";
    } else {
      LilyPadEl.style.height = "";
    }
  }, [anchorElement, anchorOrigin, origin, size]);

  useEffect(() => {
    if (!modalProps.isOpen) {
      return;
    }

    const handleWindowResize = debounce(setPosition);
    const handleMouseUp = () => {
      isDragging = false;

      if (lilyPadRef.current) {
        lilyPadRef.current.style.pointerEvents = "initial";
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && lilyPadRef.current) {
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight;
        const windowWidth =
          window.innerWidth || document.documentElement.clientWidth;

        const height = lilyPadRef.current.clientHeight;
        const width = lilyPadRef.current.clientWidth;
        let top = e.clientY + dragTopOffset;
        let left = e.clientX + dragLeftOffset;

        // Don't go outside the screen
        if (top < SNAP_THRESHOLD) {
          top = SNAP_THRESHOLD;
        } else if (top + height > windowHeight - SNAP_THRESHOLD) {
          top = windowHeight - SNAP_THRESHOLD - height;
        }

        if (left < SNAP_THRESHOLD) {
          left = SNAP_THRESHOLD;
        } else if (left + width > windowWidth - SNAP_THRESHOLD) {
          left = windowWidth - SNAP_THRESHOLD - width;
        }

        lilyPadRef.current.style.top = top + "px";
        lilyPadRef.current.style.left = left + "px";
      }
    };

    const handleMouseDownClick = (e: MouseEvent) => {
      let currentElement: HTMLElement | null = e.target as HTMLElement; // We know better in this case

      let anchorOrLilyPadClicked = false;

      if (!(anchorElement && anchorElementClickable)) {
        // This handler preserves modal behaviour when the anchor is flagged
        // as clickable. In this case we know the Modal component will not
        // create a screen wide click sink, and so we need to do implement our
        // own checks.
        return;
      }

      /**
       * This loop runs through each element, starting with the event target
       * and working up through the lineage of elements up to the document.
       *
       * If, during the loop, the LilyPad or anchor is seen, the click is dismissed
       *
       * A previous attempt using z-indexes was made to lift the anchor
       * element above the backdrop so that it could remain clickable while
       * the rest of the page wasn't. While this would work in simple cases,
       * it would not work when there are LilyPads inside other LilyPads due
       * to the behaviour of z-indexes.
       */
      while (currentElement !== null) {
        if (
          currentElement === anchorElement ||
          currentElement === lilyPadRef.current
        ) {
          anchorOrLilyPadClicked = true;
          break;
        }

        currentElement = currentElement.parentElement;
      }

      if (!anchorOrLilyPadClicked) {
        /**
         * Anchor or LilyPad was NOT clicked. To prevent accidental navigation
         * or other actions, stop this click from going any further and
         * close the modal (equivalent to a modal overlay click)
         */
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();

        if (e.type === "click" && props.onRequestClose) {
          props.onRequestClose();
        }

        return false;
      }
    };

    // If the anchor element is clickable, some special event handlers
    // are required in order to preserve modal behaviour
    document.addEventListener("mousedown", handleMouseDownClick, true);
    document.addEventListener("click", handleMouseDownClick, true);

    window.addEventListener("resize", handleWindowResize);

    if (draggable) {
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("resize", handleWindowResize);

      document.removeEventListener("mousedown", handleMouseDownClick, true);
      document.removeEventListener("click", handleMouseDownClick, true);

      if (draggable) {
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [anchorElement, modalProps.isOpen, draggable]);

  useEffect(() => {
    if (modalProps.isOpen) {
      setPosition();
    }
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!draggable) {
      return;
    }

    e.preventDefault();

    isDragging = true;

    if (lilyPadRef.current) {
      dragTopOffset = lilyPadRef.current.offsetTop - e.clientY;
      dragLeftOffset = lilyPadRef.current.offsetLeft - e.clientX;

      lilyPadRef.current.style.pointerEvents = "none";
    }

    return false;
  };

  if (className) {
    classes.push(className);
  }

  return (
    <Modal
      {...modalProps}
      pointerEventPassthrough={
        anchorElement && anchorElementClickable ? true : false
      }
    >
      <div
        className={classes.join(" ") + " ac-lilypad"}
        ref={lilyPadRef}
        onMouseDown={handleMouseDown}
      >
        {props.children}
      </div>
    </Modal>
  );
};

LilyPad.Position = Position;

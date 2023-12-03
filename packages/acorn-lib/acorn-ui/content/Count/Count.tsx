import type { ComponentProps } from "react";
import { makeAcornComponent } from "../../utility/makeAcornComponent";

export interface CountProps {
  /**
   * The actual count
   */
  count: number | string;
  /**
   * Control the font size
   */
  fontSize?: string;
  /**
   * Change the color of the count
   */
  countColor?: string;
}

const CountWrapper = makeAcornComponent("ac-count c-pill +count");

/**
 * A variation of the pill component used to bring consistency to
 * all the places where we display a total count within the system.
 *
 * @param props
 * @returns
 */
export const Count = (props: ComponentProps<typeof CountWrapper> & CountProps) => {
  const { count, countColor, fontSize, ...rest } = props;

  return (
    <CountWrapper className={"u-font-" + fontSize + " +" + countColor} {...rest}>
      {count}
    </CountWrapper>
  );
};

import type {ComponentProps} from "react";
import { makeAcornComponent } from "../utility/makeAcornComponent";

const WrapContainer = makeAcornComponent("ac-wrap");

/**
 * The `<Wrap>` component is used to constrain the width of the
 * content inside to a **maximum fixed width**
 *
 * #### CSS Variables
 * ```css
 * .ac-wrap {
 *      --ac-wrap-width: var(--fixed-width);
 * }
 * ```
 *
 * #### Variations
 * | Variation Class | Description |
 * | - | - |
 * | `+narrow-width` | *Set the max width to a narrower width* |
 * | `+two-col` | *Add a 2 column layout* |
 * | `+align-start` | *Don't center the layout, align it to the start* |
 *
 */
export const Wrap = (props: ComponentProps<typeof WrapContainer>) => {
  const { children, ...rest } = props;
  return <WrapContainer {...rest}>{children}</WrapContainer>;
};

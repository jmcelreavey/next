import type { ComponentProps } from "react";
import { makeAcornComponent } from "../utility/makeAcornComponent";

const SectionContainer = makeAcornComponent("ac-section", {}, "section");

/**
 * The `<Section>` component is a wrapper component used to define a
 * distint section of content. This is a fairly agnostic component that uses the `<section>`
 * element.
 *
 * It's a useful wrapper when you need to split up content blocks on a screen.
 *
 * #### CSS Variables
 * ```css
 * .ac-section {
 *     --ac-section-padding: var(--cushion);
 *     --ac-section-bg-color: var(--color-site);
 *     --ac-section-border-width: 1px;
 *     --ac-section-border-color: var(--border-color);
 *     --ac-section-border-radius: var( --border-radius );
 * }
 * ```
 *
 * #### Variations
 * | Variation Class | Description |
 * | - | - |
 * | `+color-1` | *Change the background color to `var( --color-1 )`* |
 * | `+color-2` | *Change the background color to `var( --color-2 )`* |
 * | `+color-shade` | *Change the background color to `var( --color-shade )`* |
 * | `+scrollable` | *Adds scrolling behaviour* |
 * | `+border-top` | *Adds a border to the top of the block* |
 * | `+rounded` | *Adds a border radius to the section* |
 * | `+spaced` | *Adds spacing between items vertically* |
 * | `+double-spaced` | *Adds double spacing between items vertically* |
 * | `+no-padding` | *Removes padding* |
 */
export const Section = (props: ComponentProps<typeof SectionContainer>) => {
  const { children, ...rest } = props;
  return <SectionContainer {...rest}>{children}</SectionContainer>;
};

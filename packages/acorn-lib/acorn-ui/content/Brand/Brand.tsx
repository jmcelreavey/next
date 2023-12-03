import type {ComponentProps} from "react";
import { makeAcornComponent } from "../../utility/makeAcornComponent";

const BrandContainer = makeAcornComponent("ac-brand");

/**
 * The brand component simply contains the logo.
 *
 * It should appear **as a direct child** of the `<App>` or '<Website>'
 * component
 *
 * ```jsx
 * <App>
 *    <Brand />
 *    <Header />
 *    <Content />
 * </App>
 * ```
 *
 * #### CSS Variables
 * ```css
 * .ac-brand {
 *    --ac-brand-bg: var(--color-1);
 *    --ac-brand-padding: 0.5em;
 *    --ac-brand-height: calc(var(--touch-target) - var(--ac-brand-padding));
 * }
 * ```
 */

export const Brand = (props: ComponentProps<typeof BrandContainer>) => {
  const { children, ...rest } = props;
  return (
    <BrandContainer {...rest}>
      <a href="/" title="Go to the homepage">
        {children}
      </a>
    </BrandContainer>
  );
};

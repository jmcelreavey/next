import type {ComponentProps} from "react";
import { makeAcornComponent } from "../utility/makeAcornComponent";

const FooterContainer = makeAcornComponent("ac-footer", {}, "footer");

/**
 * The `<Footer>` component is another top level child of the `<App>` or
 * `<Website>` component and typically appears at the bottom of the
 * screen.
 *
 * ####CSS Variables
 * ```css
 * .ac-footer {
 *     --ac-footer-bg-color: var(--color-site);
 *     --ac-footer-padding: var(--unit);
 *     --ac-footer-text-color: var( --color-text );
 * }
 * ```
 */

export const Footer = (props: ComponentProps<typeof FooterContainer>) => {
  const { children, ...rest } = props;
  return <FooterContainer {...rest}>{children}</FooterContainer>;
};

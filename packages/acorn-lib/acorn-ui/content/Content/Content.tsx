import type { ComponentProps } from "react";
import { makeAcornComponent } from "../../utility/makeAcornComponent";

const ContentContainer = makeAcornComponent("ac-content", {}, "main");

/**
 *
 * The `<Content>` component is simply a wrapper component but an important one.
 *
 * Typically the **main content** of the screen should be wrapped in a `<Content>` component.
 *
 * It should appear as a **direct child** of the `<App>` or `<Website>` component.
 *
 * ```jsx
 * <App>
 *    <Header></Header>
 *    <Aside></Aside>
 *    <Content>...</Content>
 * </App>
 * ```
 *
 * #### CSS Variables
 * ```css
 * .ac-content {
 *    --ac-content-bg-color: var(--color-site);
 *    --ac-content-padding: var(--unit);
 *    --ac-content-max-width: auto; *
 * }
 * ```
 */

export const Content = (props: ComponentProps<typeof ContentContainer>) => {
  const { children, ...rest } = props;
  return <ContentContainer {...rest}>{children}</ContentContainer>;
};

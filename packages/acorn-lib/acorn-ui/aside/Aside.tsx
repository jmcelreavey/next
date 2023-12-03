import type {ComponentProps} from "react";
import { Sidebar } from "../sidebar/Sidebar";

/**
 * The Aside component is similar to the `<Sidebar>` component, it actually
 * is a sidebar with an additional class of `+aside` added.
 *
 * It should appear as a **direct child** of the `<App>` or `<Website>` component.
 *
 * ```jsx
 * <App>
 *    <Header></Header>
 *    <Content>...</Content>
 *    <Aside></Aside>
 * </App>
 * ```
 * Typically we would use the Aside component to display information
 * related to the main content.
 *
 * #### CSS Variables
 * ```css
 * .ac-sidebar.\+aside {
 *    --ac-aside-background-color: var(--color-site);
 *    --ac-aside-padding: var(--unit) 0;
 *    --ac-aside-text-color: var(--color-text);
 *    --ac-aside-border-radius: var(--radius) 0 0 var(--radius);
 *    --ac-aside-box-shadow: var(--shadow-heavy);
 *    --ac-aside-width: 25em;
 * }
 * ```
 *
 * | Variation Class | Description |
 * | ---- | --- |
 * | `+modal` | *Makes the Aside behave like a modal, appearing on top of the content* |
 *
 * @see Sidebar
 * @param props
 * @returns
 */
export const Aside = (props: ComponentProps<typeof Sidebar>) => {
  const { children, className, ...rest } = props;
  const classes = [className, "+aside"].filter(Boolean).join(" ");

  return (
    <Sidebar {...rest} className={classes}>
      {children}
    </Sidebar>
  );
};

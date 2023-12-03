import { makeAcornComponent } from "../../utility/makeAcornComponent";

const Breadcrumb = makeAcornComponent("ac-breadcrumbs__item", {}, "li");

/**
 * The `<Breadcrumb>` component is a key navigational tool but it doesn't need to appear
 * on every page. Usually you only need to include when you are navigating more than
 * three levels deep.
 *
 * Usually it's not important to include the root level page e.g. Home or Dashboard
 *
 * #### CSS Variables
 * ```css
 * .ac-breadcrumbs {
 *    --ac-breadcrumbs-separator: "›";
 *    --ac-breadcrumbs-link-style: var(--default-link-state);
 *    --ac-breadcrumbs-link-hover-style: var(--default-link-hover-state);
 *    --ac-breadcrumbs-gap: 0.25em;
 *    --ac-breadcrumbs-link-color: var(--color-link);
 * }
 * ```
 */

export const Breadcrumbs = Object.assign(makeAcornComponent("ac-breadcrumbs", {}, "ol"), {
  Crumb: Breadcrumb,
});

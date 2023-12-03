import { makeAcornComponent } from "../utility/makeAcornComponent";

export const HeaderTitle = makeAcornComponent("ac-header__title");
export const HeaderActions = makeAcornComponent("ac-header__actions");
export const HeaderSummary = makeAcornComponent("ac-header__summary");

/**
 *
 * The Header component gives context to the content beneath. It uses
 * a semantic `<header>` tag  and usually contains things like
 *
 * - The **title** of the page
 * - A **summary** of key information
 * - **Action buttons** that apply to the overall screen
 *
 * #### CSS Variables
 * ```css
 * .ac-header {
 *    --ac-header-bg-color: var(--color-site);
 *    --ac-header-padding: var(--unit);
 *    --ac-header-max-width: auto;
 * }
 * ```
 *
 * The header component is versatile enough to be used nested inside other components
 * like the `<Card>` component for instance.
 */

export const Header = Object.assign(makeAcornComponent("ac-header", {}, "header"), {
  Title: HeaderTitle,
  Actions: HeaderActions,
  Summary: HeaderSummary,
});

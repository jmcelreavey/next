import type { ReactNode } from "react";

/**
 * The minimum data to uniquely identify a tab
 *
 */
export interface TabIndentifier {
  /**
   * The name of the tab
   *
   * This defaults to the label of the tab in the tab menu and is safe to
   * carry mixed case, spaces and punctuation.
   *
   * Name may be used as a slug in which case it will be kebab cased and
   * punctuation removed. Be aware this creates a small oppoortunity for
   * collisions in the slug name.
   */
  name: string;

  /**
   * Optionally group tabs
   *
   * Because of the composable nature of how tabs are installed, groups
   * can help safe guard against accidental collisions in slug names.
   *
   * Additionally groups allow tabs persistance to use different query
   * parameters. As tabs are often slaved to other UI components this allows
   * tabs serving different purposes to share the same menu strip, but use
   * the URL query string differently for example
   */
  group: string;
}

export interface TabDefinition extends TabIndentifier {
  /**
   * Provides for custom React content for the label instead of just
   * the name and count.
   *
   * Note that when using label, count is ignored.
   */
  label?: ReactNode;

  /**
   * A common requirement is to add a count to the tab
   */
  count?: number;

  /**
   * When the user initiates a tab change this prop allows the hosting component
   * to perform data loading, or validation.
   *
   * If the function returns false the tab switch will be cancelled.
   *
   * If the function returns a promise the tab switch will be delayed until the promise resolves.
   * If the promise returns false the switch will be cancelled.
   * @returns
   */
  onTabChanging?: () => Promise<void | false>;

  /**
   * Optionally add an extra class to the tab menu item in the tab menu strip for this tab
   */
  className?: string;
}

import { makeAcornComponent } from "../../utility/makeAcornComponent";

/**
 * The Website Component is a specific component used when building front end websites.
 * Similar to the `App` component it is designed to layout a number of other components.
 * These components **don't need to be** direct children though and can be nested inside
 * each other where it makes sense.
 *
 * - Brand
 * - Header
 * - Nav
 * - Content
 * - Footer
 * - Aside
 *
 * These components should assemble themselves according to the grid provided
 * in the project scss and allows for radically different reassembly should
 * that be required.
 *
 * @param props
 * @returns
 */
export const Website = makeAcornComponent("ac-website");

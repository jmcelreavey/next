import { makeAcornComponent } from "../../utility/makeAcornComponent";

/**
 * The App Component is the root component of an Acorn project. It is designed
 * to layout a number of key children that should be position as immediate
 * ancestors (not nested) for example
 *
 * ```jsx
 * <App>
 *     <Brand></Brand>
 *     <Masthead></Masthead>
 *     <Sidebar></Sidebar>
 *     <Header></Header>
 *     <Content></Content>
 *     <Footer></Footer>
 *     <Aside></Aside>
 * </App>
 * ```
 *
 * These components should assemble themselves according to the grid provided
 * in the project scss and allows for radically different reassembly should
 * that be required.
 *
 * #### CSS Variables
 * ```css
 * .ac-app {
 *     --ac-app-gap: 0;
 *     --ac-sidebar-width: auto;
 *     --ac-aside-width: auto;
 * }
 * ```
 *
 * @param props
 * @returns
 */
export const App = makeAcornComponent("ac-app");

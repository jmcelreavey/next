import { makeAcornComponent } from "../utility/makeAcornComponent";

export const ModeEdit = makeAcornComponent("ac-mode__edit");
export const ModeView = makeAcornComponent("ac-mode__view");
export const ModeToggle = makeAcornComponent(
  "ac-mode__toggle c-button +toggle-ui",
  {},
  "button"
);
export const ModeHeader = makeAcornComponent("ac-mode__header", {}, "header");

/**
 * The Mode component is a simple component used to
 * control the layout and styling when switching between two modes
 * such as 'view' and 'edit'
 */

export const Mode = Object.assign(makeAcornComponent("ac-mode", {}, "div"), {
  Toggle: ModeToggle,
  Header: ModeHeader,
  Edit: ModeEdit,
  View: ModeView,
});

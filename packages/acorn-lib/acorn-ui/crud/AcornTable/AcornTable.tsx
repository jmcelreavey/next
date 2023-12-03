import { makeAcornComponent } from "../../utility/makeAcornComponent";

/**
 * AcornTable wraps a normal HTML or Morse Table and signifies the that table should adopt
 * acorn styling in readiness for more advanced features.
 *
 * Note that this is a simple container component. You may be looking for the more advanced
 * [DataTable component](?path=/docs/acorn-ui-content-datatable--docs) that layous out an
 * array of data automatically.
 */
export const AcornTable = makeAcornComponent("ac-table");

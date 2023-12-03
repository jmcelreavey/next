/**
 * Workflow tabs relate to a group of tabs that express a set of possible states in
 * a workflow. This type allows the relevant settings to be expressed as a single value.
 */
export interface WorkflowTabsSpecification {
  criteriaProperty: string;
  values: string[];
}

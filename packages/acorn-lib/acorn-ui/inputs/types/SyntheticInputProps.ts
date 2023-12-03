export interface SyntheticInputProps<ValueType> {
  /**
   * The name of the input when used within a form
   */
  name?: string;

  /**
   * The value the input should currently reflect
   */
  value?: ValueType | string;

  /**
   * Raised when the input's value changes due to user actions.
   * @param newValue
   * @returns
   */
  onValueChange?: (newValue?: ValueType) => void;
}

export interface WithCancelCallback {
  /**
   * Handle what happens if the user cancels.
   *
   * Optional - if not present the cancel button will not appear
   *
   * @returns
   */
  handleCancel?: () => void;
}

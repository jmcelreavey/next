import { Auth } from "aws-amplify";
import { useCallback } from "react";

export interface CognitoLogoutOptions {
  /**
   * Called after the logout has completed.
   * @returns
   */
  onLoggedOut?: () => void;
}

export interface CognitoLogoutBehaviours {
  /**
   * Presents the behaviour for logout to the implementing component.
   * @returns
   */
  handleLogout: () => Promise<void>;
}

/**
 * Returns a function that supports logging out of Cognito.
 *
 * @param options
 * @returns
 */
export const useCognitoLogout = (options: CognitoLogoutOptions = {}) => {
  const { onLoggedOut } = options;

  const handleLogout = useCallback(async () => {
    await Auth.signOut();
    onLoggedOut?.();
  }, [onLoggedOut]);

  return {
    handleLogout,
    onLoggedOut,
  };
};

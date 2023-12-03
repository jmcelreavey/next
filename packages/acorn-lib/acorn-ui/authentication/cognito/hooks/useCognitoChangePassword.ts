import { Auth } from "aws-amplify";
import { useCallback, useState } from "react";
import type { CognitoUser } from "amazon-cognito-identity-js";
import type { WithCancelCallback } from "./withCancelCallback";

type CognitoChangePasswordOptions = WithCancelCallback & {
  /**
   * The user required for context .
   */
  cognitoUser?: CognitoUser;
};

export type CognitoChangePasswordBehaviours = WithCancelCallback & {
  /**
   * Stores any general error
   */
  submissionError?: string;
  /**
   *
   * @returns
   */
  handleResetPassword: (oldPassword: string, newPassword: string) => Promise<void>;
};

export const useCognitoChangePassword = (
  options: CognitoChangePasswordOptions = {}
): CognitoChangePasswordBehaviours => {
  const [submissionError, setSubmissionError] = useState<string>();

  const handleResetPassword = useCallback(
    async (oldPassword: string, newPassword: string) => {
      if (!options.cognitoUser) {
        return;
      }
      setSubmissionError(undefined);
      try {
        await Auth.changePassword(options.cognitoUser, oldPassword, newPassword);
      } catch (error) {
        setSubmissionError(error.message);
      }
    },
    [options.cognitoUser, setSubmissionError]
  );

  return {
    submissionError,
    handleResetPassword,
    handleCancel: options.handleCancel,
  };
};

import type { User } from "@gcdtech/acorn-common-types";
import { useAuthenticationContext } from "@gcdtech/acorn-react-core";
import { useCallback } from "react";
import { CognitoApiClient } from "../CognitoApiClient";
import type { CognitoJourneyOptions} from "./useCognitoJourney";
import { useCognitoJourney } from "./useCognitoJourney";

type AcornCognitoJourneyOptions = CognitoJourneyOptions & {
  pool: string;
  onAuthenticated?: (user: User) => Promise<void>;
  onAuthenticationFailed?: (error?: Error) => void;
};

/**
 * Composes on top of useCognitoLoginJourney to connect the cognito sign in experience with
 * the Acorn authentication sub systems.
 */
export const useAcornCognitoJourney = (options: AcornCognitoJourneyOptions) => {
  const authenticationContext = useAuthenticationContext();
  const { pool, onAuthenticated, onAuthenticationFailed, onSignIn, ...rest } = options;

  const authenticate = useCallback(
    async (cognitoIdToken: string) => {
      try {
        const acornToken = await CognitoApiClient.get().login(pool, cognitoIdToken);

        const user = await authenticationContext.login(acornToken);
        await onAuthenticated?.(user);
      } catch (err) {
        onAuthenticationFailed?.(err);
      }

      onSignIn?.(cognitoIdToken);
    },
    [authenticationContext, onAuthenticated, onAuthenticationFailed, pool]
  );

  return useCognitoJourney({
    ...rest,
    onSignIn: authenticate,
  });
};

import { useAuthenticationContext } from "@gcdtech/acorn-react-core";
import { useCallback } from "react";
import { useCognitoLogout } from "./useCognitoLogout";

export const useAcornCognitoLogout = () => {
  const authenticationContext = useAuthenticationContext();

  const cognitoLogout = useCognitoLogout({
    onLoggedOut: useCallback(() => {
      authenticationContext.logout();
    }, [authenticationContext]),
  });

  return cognitoLogout;
};

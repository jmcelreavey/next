import React, { useContext } from "react";
import type { CognitoUserPoolSettings } from "../types";

export const CognitoContext = React.createContext<CognitoUserPoolSettings>(null);

export const useCognitoContext = () => {
  const context = useContext(CognitoContext);
  if (context === null) {
    throw new Error("Trying to access CognitoJourneyContext while not inside the context");
  }

  return context;
};

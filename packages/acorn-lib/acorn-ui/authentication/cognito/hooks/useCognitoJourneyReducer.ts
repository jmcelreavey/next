import { useReducer } from "react";
import type {
  CognitoAuthenticationCredentials,
  CognitoChallengeCommunicationMethod,
  CognitoJourneyState,
  CognitoSignInResult} from "../types";
import {
  CognitoChallenge,
  CognitoJourneyStep
} from "../types";

/**
 * The possible actions of the useCognitoJourneyReducer
 */
export type CognitoJourneyAction =
  | {
      type: "challenge";
      challenge: CognitoChallenge.SetupMfa;
      cognitoUser: CognitoSignInResult;
      secret: string;
    }
  | {
      type: "challenge";
      challenge: CognitoChallenge.VerifyMfa;
      cognitoUser: CognitoSignInResult;
    }
  | {
      type: "challenge";
      challenge: CognitoChallenge.ConfirmUser;
      cognitoUser?: CognitoSignInResult;
      challengeCommunicationMethod?: CognitoChallengeCommunicationMethod;
      inflightCredentials: CognitoAuthenticationCredentials;
    }
  | {
      type: "challenge";
      challenge: CognitoChallenge.ForceSetPassword;
      cognitoUser: CognitoSignInResult;
    }
  | {
      type: "start-reset-password";
    }
  | {
      type: "set-inflight-credentials";
      credentials: CognitoAuthenticationCredentials;
    }
  | {
      type: "submission-error";
      error: string;
    }
  | {
      type: "reset";
      step: CognitoJourneyStep;
    };

const journeyReducer = (state: CognitoJourneyState, action: CognitoJourneyAction) => {
  let nextState = { ...state };
  if (action.type === "challenge") {
    // A challenge means the start of the next leg in the journey, so we reset
    // any error message
    nextState.submissionError = undefined;
    switch (action.challenge) {
      case CognitoChallenge.VerifyMfa:
        nextState.step = CognitoJourneyStep.VerifyMfa;
        nextState.cognitoUser = action.cognitoUser;
        break;
      case CognitoChallenge.SetupMfa:
        nextState.step = CognitoJourneyStep.SetupMfa;
        nextState.mfaSecret = action.secret;
        nextState.cognitoUser = action.cognitoUser;
        nextState.mfaSecretQrCodeContent =
          action.secret && nextState.cognitoUser
            ? "otpauth://totp/acorn:" +
              nextState.cognitoUser.getUsername() +
              "?secret=" +
              nextState.mfaSecret
            : undefined;
        break;
      case CognitoChallenge.ConfirmUser:
        nextState.step = CognitoJourneyStep.ConfirmAccount;
        nextState.challengeCommunicationMethod = action.challengeCommunicationMethod;
        nextState.inflightCredentials = action.inflightCredentials;
        break;
      case CognitoChallenge.ForceSetPassword:
        nextState.step = CognitoJourneyStep.ForceSetPassword;
        nextState.cognitoUser = action.cognitoUser;
        break;
    }
  }

  if (action.type === "start-reset-password") {
    nextState = { step: CognitoJourneyStep.ResetPassword };
  }

  if (action.type === "submission-error") {
    nextState.submissionError = action.error;
  }

  if (action.type === "set-inflight-credentials") {
    nextState.inflightCredentials = action.credentials;
  }

  if (action.type === "reset") {
    nextState = { step: action.step ?? CognitoJourneyStep.SignIn };
  }

  return nextState;
};

interface CognitoChallengeReducerOptions {
  /**
   * The starting step of the journey. Defaults to SignIn
   */
  startingStep?: CognitoJourneyStep;
}

/**
 * A reducer that can manage the states to support sign in and sign up flows for Cognito
 * and all supporting challenge steps.
 * @param options
 * @returns
 */
export const useCognitoJourneyReducer = (options?: CognitoChallengeReducerOptions) => {
  const reducer = useReducer(journeyReducer, {
    step: options?.startingStep ?? CognitoJourneyStep.SignIn,
  });

  return reducer;
};

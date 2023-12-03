import { Amplify, Auth } from "aws-amplify";
import { useCallback } from "react";
import { useCognitoContext } from "../contexts/CognitoContext";
import type {
  CognitoAuthenticationCredentials,
  CognitoJourneyState,
  CognitoSignInResult,
  CognitoUserPoolSettings,
} from "../types";
import {
  CognitoChallenge,
  CognitoJourneyStep,
  CognitoMfaMethod,
} from "../types";
import type { CognitoJourneyAction } from "./useCognitoJourneyReducer";
import { useCognitoJourneyReducer } from "./useCognitoJourneyReducer";

export type CognitoJourneyBehaviours = CognitoJourneyState & {
  signIn: (credentials: CognitoAuthenticationCredentials) => Promise<void>;
  signUp: (credentials: CognitoAuthenticationCredentials) => Promise<void>;
  startResetPassword: () => Promise<void>;
  requestResetPasswordCode: (username: string) => Promise<boolean>;
  confirmResetPassword: (
    verificationCode: string,
    password: string
  ) => Promise<boolean>;
  forceSetPassword: (password: string) => Promise<boolean>;
  confirmUser: (code: string) => Promise<boolean>;
  reset: () => Promise<void>;
  initiateMfaSetup: (user: CognitoSignInResult) => Promise<boolean>;
  confirmMfaSetup: (code: string) => Promise<boolean>;
  verifyMfa: (code: string) => Promise<boolean>;
  resendConfirmCode: () => Promise<boolean>;
  permittedMfaMethods: CognitoMfaMethod[];
  passwordPolicies?: string[];
  email?: string;
  signUpEmailLocked?: boolean;
};

export interface CognitoJourneyOptions {
  /**
   * Called when a user completes sign in successfully.
   */
  onSignIn?: (cognitoIdToken: string) => Promise<void>;
  /**
   * Called if sign in fails.
   */
  onSignInFailed?: (error?: Error) => void;

  /**
   * Called when a user completes the sign up process.
   */
  onSignUp?: () => Promise<void>;

  /**
   * True to login in automatically after signing up. Defaults to true.
   */
  autoLoginAfterSignUp?: boolean;

  /**
   * Which step to start upon. If omitted SignIn will be the default.
   */
  startingStep?:
    | CognitoJourneyStep.SignIn
    | CognitoJourneyStep.SignUp
    | CognitoJourneyStep.ResetPassword;

  /**
   * Bullet points as strings for password policy guidance. If omitted no advice
   * will be given. Passed here as this is required on many of the possible steps
   * of the journey.
   */
  passwordPolicies?: string[];

  /**
   * Optionally provide an email address to seed sign in, reset password or sign up forms
   */
  email?: string;

  /**
   * True to disallow users to change their email address during sign up if following
   * a strict invitation only pattern.
   */
  signUpEmailLocked?: boolean;
}

/**
 * A helper that ensures each call to cognito respects the current user pool context
 * and dispatches a submission-error action if an error is thrown.
 *
 * @param delegate The call back to run
 * @param userPoolSettings The user pool details
 * @param dispatch The dispatch call back for the state reducer
 * @param rethrowError True to rethrow any error in addition to dispatching the submission-error action
 * @returns
 */
const wrapAuthCall = async <T>(
  delegate: () => Promise<T>,
  userPoolSettings: CognitoUserPoolSettings,
  dispatch: React.Dispatch<CognitoJourneyAction>,
  rethrowError = false
): Promise<boolean> => {
  Amplify.configure({
    Auth: {
      ...userPoolSettings,
    },
  });

  try {
    await delegate();
    return true;
  } catch (error) {
    dispatch({ type: "submission-error", error: error.message });

    if (rethrowError) {
      throw error;
    }

    return false;
  }
};

export const useCognitoJourney = (
  options: CognitoJourneyOptions = {}
): CognitoJourneyBehaviours => {
  const cognitoContext = useCognitoContext();
  const {
    onSignIn,
    onSignInFailed,
    onSignUp,
    startingStep,
    email,
    signUpEmailLocked,
    passwordPolicies,
    autoLoginAfterSignUp = true,
  } = options;
  const [journeyState, dispatch] = useCognitoJourneyReducer({ startingStep });
  const { inflightCredentials, cognitoUser } = journeyState;

  const checkSessionForLogin = useCallback(async () => {
    await wrapAuthCall(
      async () => {
        const session = await Auth.currentSession();
        const cognitoIdentityToken = session.getIdToken().getJwtToken();

        if (cognitoIdentityToken) {
          onSignIn?.(cognitoIdentityToken);
        }
      },
      cognitoContext,
      dispatch
    );
  }, [onSignIn]);

  const signIn = useCallback(
    async (credentials: CognitoAuthenticationCredentials) => {
      try {
        await wrapAuthCall(
          async () => {
            const response = await Auth.signIn(credentials);

            switch (response.challengeName) {
              case CognitoChallenge.VerifyMfa:
                dispatch({
                  type: "challenge",
                  challenge: CognitoChallenge.VerifyMfa,
                  cognitoUser: response,
                });
                break;
              case CognitoChallenge.SetupMfa:
                await initiateMfaSetup(response);
                break;
              case CognitoChallenge.ForceSetPassword:
                dispatch({
                  type: "challenge",
                  challenge: CognitoChallenge.ForceSetPassword,
                  cognitoUser: response,
                });
                break;
              default:
                await checkSessionForLogin();
            }
          },
          cognitoContext,
          dispatch,
          true
        );
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === "UserNotConfirmedException") {
            dispatch({
              type: "challenge",
              challenge: CognitoChallenge.ConfirmUser,
              inflightCredentials: credentials,
            });
          } else {
            dispatch({ type: "submission-error", error: error.message });
          }
        }

        onSignInFailed?.(error);
      }
    },
    [checkSessionForLogin, dispatch, onSignInFailed]
  );

  const signUp = useCallback(
    async (signUpCredentials: CognitoAuthenticationCredentials) => {
      await wrapAuthCall(
        async () => {
          const response = await Auth.signUp(signUpCredentials);

          if (!response.userConfirmed) {
            dispatch({
              type: "challenge",
              challenge: CognitoChallenge.ConfirmUser,
              challengeCommunicationMethod: {
                destination: response.codeDeliveryDetails.Destination,
                medium: response.codeDeliveryDetails.DeliveryMedium,
              },
              inflightCredentials: signUpCredentials,
            });
          } else {
            await onSignUp?.();
          }
        },
        cognitoContext,
        dispatch
      );
    },
    [dispatch, onSignUp]
  );

  const startResetPassword = useCallback(async () => {
    dispatch({ type: "start-reset-password" });
  }, [dispatch]);

  const requestResetPasswordCode = useCallback(
    async (username: string) => {
      return wrapAuthCall(
        async () => {
          await Auth.forgotPassword(username);
          dispatch({
            type: "set-inflight-credentials",
            credentials: { username, password: "" },
          });
        },
        cognitoContext,
        dispatch
      );
    },
    [dispatch]
  );

  const confirmResetPassword = useCallback(
    async (verificationCode: string, password: string) => {
      return wrapAuthCall(
        async () => {
          await Auth.forgotPasswordSubmit(
            inflightCredentials.username,
            verificationCode,
            password
          );
          await signIn({ username: inflightCredentials.username, password });
        },
        cognitoContext,
        dispatch
      );
    },
    [dispatch, inflightCredentials?.username]
  );

  const forceSetPassword = useCallback(
    async (password: string) => {
      return wrapAuthCall(
        () => Auth.completeNewPassword(cognitoUser, password),
        cognitoContext,
        dispatch
      );
    },
    [dispatch, cognitoUser]
  );

  const reset = useCallback(async () => {
    dispatch({ type: "reset", step: startingStep });
  }, []);

  const initiateMfaSetup = useCallback(
    async (cognitoUser: CognitoSignInResult) => {
      return wrapAuthCall(
        async () => {
          const secret = await Auth.setupTOTP(cognitoUser);
          dispatch({
            type: "challenge",
            challenge: CognitoChallenge.SetupMfa,
            secret,
            cognitoUser,
          });
        },
        cognitoContext,
        dispatch
      );
    },
    [dispatch, cognitoUser]
  );

  const confirmMfaSetup = useCallback(
    async (code: string) => {
      return wrapAuthCall(
        async () => {
          await Auth.verifyTotpToken(cognitoUser, code);
          await checkSessionForLogin();
        },
        cognitoContext,
        dispatch
      );
    },
    [dispatch, cognitoUser]
  );

  const verifyMfa = useCallback(
    async (code: string) => {
      return wrapAuthCall(
        async () => {
          await Auth.confirmSignIn(cognitoUser, code, "SOFTWARE_TOKEN_MFA");
          await checkSessionForLogin();
        },
        cognitoContext,
        dispatch
      );
    },
    [dispatch, cognitoUser]
  );

  const resendConfirmCode = async () => {
    // TODO
    return false;
  };

  const confirmUser = useCallback(
    async (code: string) => {
      try {
        await wrapAuthCall(
          async () => {
            await Auth.confirmSignUp(inflightCredentials.username, code);

            if (startingStep === CognitoJourneyStep.SignIn) {
              await signIn(inflightCredentials);
            } else {
              // If we're signing up however we will need to enter the login
              // pathway, but only if configured to do so.
              onSignUp?.();

              if (autoLoginAfterSignUp) {
                signIn(inflightCredentials);
              }
            }
          },
          cognitoContext,
          dispatch,
          true
        );

        return true;
      } catch (error) {
        if (!(error instanceof Error)) {
          dispatch({
            type: "submission-error",
            error:
              "Something went wrong when verifying your code. Please try again.",
          });
        }
        return false;
      }
    },
    [
      dispatch,
      inflightCredentials,
      cognitoUser,
      onSignUp,
      signIn,
      autoLoginAfterSignUp,
    ]
  );

  return {
    signIn,
    signUp,
    reset,
    confirmUser,
    startResetPassword,
    confirmResetPassword,
    requestResetPasswordCode,
    forceSetPassword,
    initiateMfaSetup,
    confirmMfaSetup,
    verifyMfa,
    resendConfirmCode,
    passwordPolicies,
    permittedMfaMethods: [CognitoMfaMethod.Totp],
    email,
    signUpEmailLocked,
    ...journeyState,
  };
};

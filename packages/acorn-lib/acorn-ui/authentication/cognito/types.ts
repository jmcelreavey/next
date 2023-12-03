import type { Auth } from "aws-amplify";

export interface CognitoUserPoolSettings {
  region: string;
  userPoolId: string;
  userPoolWebClientId: string;
}

/**
 * MFA Methods
 *
 * For now only TOTP is supported so SMS is not present here to avoid confusion, however
 * ideally a future developer would return to add SMS support.
 */
export enum CognitoMfaMethod {
  Totp,
}

/**
 * The sign in result is often passed back to other Auth methods as the
 * current 'user'
 */
export type CognitoSignInResult = Awaited<ReturnType<typeof Auth.signIn>>;

/**
 * If a challenge is sent via email or SMS, this describes the details
 */
export interface CognitoChallengeCommunicationMethod {
  medium: string;
  destination: string;
}

/**
 * The possible steps we support in our journey
 */
export enum CognitoJourneyStep {
  SignIn,
  SignUp,
  ForceSetPassword,
  SetupMfa,
  VerifyMfa,
  ResetPassword,
  ConfirmAccount,
}

/**
 * The challenges that can be presented during sign in or sign up
 */
export enum CognitoChallenge {
  ForceSetPassword = "NEW_PASSWORD_REQUIRED",
  SetupMfa = "MFA_SETUP",
  VerifyMfa = "SOFTWARE_TOKEN_MFA",
  ConfirmUser = "ConfirmUser",
}

/**
 * A simple container for credentials
 */
export interface CognitoAuthenticationCredentials {
  username: string;
  password: string;
}

/**
 * The shape of our reducer state.
 */
export interface CognitoJourneyState {
  /**
   * Contains the most recent submission error.
   */
  submissionError?: string;

  /**
   * The current step
   */
  step: CognitoJourneyStep;

  /**
   * Stores credentials between steps where required
   */
  inflightCredentials?: CognitoAuthenticationCredentials;

  /**
   * Stores the inflight cognito user between steps where required
   */
  cognitoUser?: CognitoSignInResult;

  /**
   * When setting up MFA, the secret to give the user
   */
  mfaSecret?: string;

  /**
   * A QR Code compatible form of the mfaSecrete
   */
  mfaSecretQrCodeContent?: string;

  /**
   * If a challenge answer has been sent to the user, describes how it has been sent
   */
  challengeCommunicationMethod?: CognitoChallengeCommunicationMethod;
}

export interface PasswordPolicyItem {
  /**
   * The text used to describe this plicy item
   */
  policyText: string;

  /**
   * A regular expression that can be used to detect if the password meets this policy.
   */
  passingRegularExpression: RegExp;
}

export type PasswordPolicyItems = (PasswordPolicyItem | string)[];

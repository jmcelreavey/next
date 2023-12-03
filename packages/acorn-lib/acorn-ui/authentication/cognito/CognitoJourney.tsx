import type { ComponentType } from "react";
import type { CognitoConfirmUserFormProps } from "./forms/CognitoConfirmUserForm";
import { CognitoConfirmUserForm } from "./forms/CognitoConfirmUserForm";
import type { CognitoForceSetPasswordFormProps } from "./forms/CognitoForceSetPasswordForm";
import { CognitoForceSetPasswordForm } from "./forms/CognitoForceSetPasswordForm";
import type { CognitoResetPasswordFormProps } from "./forms/CognitoResetPasswordForm";
import { CognitoResetPasswordForm } from "./forms/CognitoResetPasswordForm";
import type { CognitoSetupMfaFormProps } from "./forms/CognitoSetupMfaForm";
import { CognitoSetupMfaForm } from "./forms/CognitoSetupMfaForm";
import type { CognitoSignInFormProps } from "./forms/CognitoSignInForm";
import { CognitoSignInForm } from "./forms/CognitoSignInForm";
import type { CognitoSignUpFormProps } from "./forms/CognitoSignUpForm";
import { CognitoSignUpForm } from "./forms/CognitoSignUpForm";
import type { CognitoVerifyMfaFormProps } from "./forms/CognitoVerifyMfaForm";
import { CognitoVerifyMfaForm } from "./forms/CognitoVerifyMfaForm";
import type { CognitoJourneyBehaviours } from "./hooks/useCognitoJourney";
import { CognitoJourneyStep, CognitoMfaMethod } from "./types";

type CognitoJourneyProps = CognitoJourneyBehaviours & {
  /**
   * Provides support for replacing individual components in the journey
   */
  components?: {
    [CognitoJourneyStep.SignIn]: ComponentType<CognitoSignInFormProps>;
    [CognitoJourneyStep.SignUp]: ComponentType<CognitoSignUpFormProps>;
    [CognitoJourneyStep.ConfirmAccount]: ComponentType<CognitoConfirmUserFormProps>;
    [CognitoJourneyStep.SetupMfa]: ComponentType<CognitoSetupMfaFormProps>;
    [CognitoJourneyStep.VerifyMfa]: ComponentType<CognitoVerifyMfaFormProps>;
    [CognitoJourneyStep.ForceSetPassword]: ComponentType<CognitoForceSetPasswordFormProps>;
    [CognitoJourneyStep.ResetPassword]: ComponentType<CognitoResetPasswordFormProps>;
  };
};

/**
 * Connects the Cognito components required to complete a full authentication journey
 * including sign in, sign up, forgot password, confirm account and forced password resets.
 */
export const CognitoJourney = (props: CognitoJourneyProps) => {
  const {
    components = {
      [CognitoJourneyStep.SignIn]: CognitoSignInForm,
      [CognitoJourneyStep.ConfirmAccount]: CognitoConfirmUserForm,
      [CognitoJourneyStep.SignUp]: CognitoSignUpForm,
      [CognitoJourneyStep.ForceSetPassword]: CognitoForceSetPasswordForm,
      [CognitoJourneyStep.ResetPassword]: CognitoResetPasswordForm,
      [CognitoJourneyStep.SetupMfa]: CognitoSetupMfaForm,
      [CognitoJourneyStep.VerifyMfa]: CognitoVerifyMfaForm,
    },
  } = props;

  switch (props.step) {
    case CognitoJourneyStep.ConfirmAccount:
      const ConfirmAccountForm = components[props.step];
      return (
        <ConfirmAccountForm
          handleConfirmUser={props.confirmUser}
          challengeCommunicationMethod={props.challengeCommunicationMethod}
          handleCancel={props.reset}
          handleRequestCode={props.resendConfirmCode}
          submissionError={props.submissionError}
        />
      );
    case CognitoJourneyStep.SetupMfa:
      const SetupMfaForm = components[props.step];
      return (
        <SetupMfaForm
          handleCancel={props.reset}
          handleVerifyTotp={props.confirmMfaSetup}
          secret={props.mfaSecret}
          secretQrCodeContent={props.mfaSecretQrCodeContent}
          submissionError={props.submissionError}
          permittedMfaMethods={props.permittedMfaMethods}
        />
      );
    case CognitoJourneyStep.VerifyMfa:
      const VerifyMfaForm = components[props.step];
      return (
        <VerifyMfaForm
          handleCancel={props.reset}
          handleVerifyTotp={props.verifyMfa}
          mfaMethod={CognitoMfaMethod.Totp}
          submissionError={props.submissionError}
        />
      );
    case CognitoJourneyStep.ForceSetPassword:
      const ForceSetPasswordForm = components[props.step];
      return (
        <ForceSetPasswordForm
          handleSetPassword={props.forceSetPassword}
          handleCancel={props.reset}
          submissionError={props.submissionError}
          passwordPolicies={props.passwordPolicies}
        />
      );
    case CognitoJourneyStep.SignIn:
      const SignInForm = components[props.step];
      return (
        <SignInForm
          email={props.email}
          handleAttemptLogin={props.signIn}
          handleForgotPassword={props.startResetPassword}
          submissionError={props.submissionError}
        />
      );
    case CognitoJourneyStep.SignUp:
      const SignUpForm = components[props.step];
      return (
        <SignUpForm
          handleSignUp={props.signUp}
          email={props.email}
          lockEmail={props.signUpEmailLocked}
          submissionError={props.submissionError}
          passwordPolicies={props.passwordPolicies}
        />
      );
    case CognitoJourneyStep.ResetPassword:
      const ResetPasswordForm = components[props.step];
      return (
        <ResetPasswordForm
          email={props.email ?? props.inflightCredentials?.username}
          handleCancel={props.reset}
          handleCancelConfirm={props.reset}
          handleInitiateReset={props.requestResetPasswordCode}
          submissionError={props.submissionError}
          showEnterNewPassword={!!props.inflightCredentials}
          handleConfirmResetPassword={props.confirmResetPassword}
          passwordPolicies={props.passwordPolicies}
        />
      );
    default:
      return <p>This step of the login journey is not supported</p>;
  }
};

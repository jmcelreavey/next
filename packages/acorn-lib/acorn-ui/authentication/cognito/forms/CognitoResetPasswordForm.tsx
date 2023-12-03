import type { FormikConfig } from "formik";
import { Form, Formik } from "formik";
import { Alert, Button, ButtonBar, FormActions } from "morse-react";
import { object, ref, string } from "yup";
import { LabelledInput } from "../../../forms/LabelledInput/LabelledInput";
import type { WithCancelCallback } from "../hooks/withCancelCallback";
import { PasswordPolicy } from "./PasswordPolicy";

interface ResetSubmission { password: string; confirmPassword: string; verificationCode: string }
interface InitiateSubmission { email: string }

export interface CognitoResetPasswordFormProps extends WithCancelCallback {
  /**
   * True if the verification and password stage should be displayed to the user
   */
  showEnterNewPassword: boolean;
  /**
   * Stores any general error
   */
  submissionError?: string;
  /**
   * Initiates a reset request with AWS
   */
  handleInitiateReset: (username: string) => void;
  /**
   * Finally resets the Cognito password
   */
  handleConfirmResetPassword: (verificationCode: string, password: string) => Promise<boolean>;

  /**
   * Allows the user to back out of the reset
   */
  handleCancelConfirm: () => void;

  /**
   * Password policy items an a array of strings or PasswordPolicyItem objects.
   *
   * If strings are supplied those policies will show as a list of bullet points.
   * If PasswordPolicyItem objects are supplied the given regular expression will be used
   * to validate the password against the policy.
   */
  passwordPolicies?: PasswordPolicyItems;

  /**
   * Optionally an email address to seed the form with.
   */
  email?: string;
}

export const CognitoResetPasswordForm = (props: CognitoResetPasswordFormProps) => {
  const handleInitiateReset: FormikConfig<InitiateSubmission>["onSubmit"] = async (values) => {
    return props.handleInitiateReset(values.email);
  };

  const handleResetPassword: FormikConfig<ResetSubmission>["onSubmit"] = async (values) => {
    return props.handleConfirmResetPassword(values.verificationCode, values.password);
  };

  return (
    <div className="ac-cognito ac-cognito-reset-password">
      {props.submissionError && (
        <Alert data-label="form-submission-error">{props.submissionError}</Alert>
      )}
      {props.showEnterNewPassword ? (
        <Formik<ResetSubmission>
          initialValues={{ password: "", confirmPassword: "", verificationCode: "" }}
          onSubmit={handleResetPassword}
          validationSchema={object().shape({
            email: string().email("Enter your email address").required("Enter your email address"),
            password: string().required("Enter a new password"),
            confirmPassword: string()
              .when("password", {
                is: (password: string | undefined) => !!(password && password.length > 0),
                then: string().oneOf([ref("password")], "Password confirmation doesn't match"),
              })
              .required("Password confirmation doesn't match"),
          })}
        >
          {({ isSubmitting, values }) => (
            <Form className="c-form" autoComplete="off">
              <p>
                If an account exists with us, an email will have been sent to "{props.email}"
                containing a verification code.
              </p>
              <p>Enter the code below along with a new password to continue.</p>

              <LabelledInput name="verificationCode" label="6 digit verification code" />
              <LabelledInput
                name="password"
                inputProps={{
                  type: "password",
                }}
              />

              <PasswordPolicy policies={props.passwordPolicies} currentValue={values.password} />

              <LabelledInput
                name="confirmPassword"
                inputProps={{
                  type: "password",
                }}
              />
              <FormActions>
                <ButtonBar className="+stacked">
                  <Button busy={isSubmitting} data-label="confirm-reset-password">
                    Reset my password
                  </Button>
                  <Button
                    type="button"
                    onClick={() => props.handleCancelConfirm()}
                    data-label="cancel"
                  >
                    Cancel
                  </Button>
                </ButtonBar>
              </FormActions>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik<InitiateSubmission>
          initialValues={{ email: props.email ?? "" }}
          onSubmit={handleInitiateReset}
          validationSchema={object().shape({
            email: string().email("Enter your email address").required("Enter your email address"),
          })}
        >
          {({ isSubmitting }) => (
            <Form className="c-form +fill">
              <LabelledInput
                name="email"
                inputProps={{
                  type: "email",
                  placeholder: "my@email.address",
                }}
              />
              <FormActions>
                <ButtonBar className="+stacked">
                  <Button busy={isSubmitting} data-label="initiate-reset-password">
                    Reset my password
                  </Button>
                  {props.handleCancel && (
                    <Button
                      type="button"
                      onClick={() => props.handleCancel?.()}
                      data-label="cancel"
                    >
                      Go Back
                    </Button>
                  )}
                </ButtonBar>
              </FormActions>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

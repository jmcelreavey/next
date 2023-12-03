import { Form, Formik } from "formik";
import { Alert, Button, FormActions } from "morse-react";
import { object, string } from "yup";
import { LabelledInput } from "../../../forms/LabelledInput/LabelledInput";
import type { CognitoAuthenticationCredentials } from "../types";

interface SignInSubmission {
  email: string;
  password: string;
}

export interface CognitoSignInFormProps {
  /**
   * Attemps to login using the given credentials.
   *
   * If successful the onLoggedIn callback will be triggered if passed via options.
   *
   * This method intentially does not return a result as some sign in journies require
   * additional steps.
   *
   * @param username
   * @param password
   */
  handleAttemptLogin: (credentials: CognitoAuthenticationCredentials) => Promise<void>;

  /**
   * Stores any general error during login
   */
  submissionError?: string;

  /**
   * Handle the user action of forgot password.
   */
  handleForgotPassword?: () => void;

  /**
   * Resets the form state
   * @returns
   */
  reset?: () => void;

  /**
   * True if the password was recently reset. Displays a message accordingly
   */
  passwordReset?: boolean;

  /**
   * Optionally an email address to seed the sign in form with.
   */
  email?: string;
}

export const CognitoSignInForm = (props: CognitoSignInFormProps) => {
  return (
    <div className="ac-cognito ac-cognito-signin-form">
      {props.passwordReset && (
        <Alert data-label="form-submission-success">Your password has been reset.</Alert>
      )}
      {props.submissionError && (
        <Alert data-label="form-submission-error">{props.submissionError}</Alert>
      )}

      <Formik<SignInSubmission>
        initialValues={{ email: props.email ?? "", password: "" }}
        onSubmit={(values) => {
          return props.handleAttemptLogin?.({
            username: values.email,
            password: values.password,
          });
        }}
        validationSchema={object().shape({
          email: string().email("Enter your email address").required("Enter your email address"),
          password: string().required("Enter your password"),
        })}
      >
        {({ isSubmitting }) => (
          <Form className="c-form">
            <LabelledInput
              name="email"
              inputProps={{
                type: "email",
                placeholder: "my@email.address",
              }}
            />

            <LabelledInput
              name="password"
              inputProps={{
                type: "password",
              }}
            />

            <FormActions className="u-marg-bottom">
              <Button busy={isSubmitting} data-label="log-in">
                Log in
              </Button>
            </FormActions>

            {props.handleForgotPassword && (
              <Button
                type="button"
                className="+2 +long"
                onClick={() => props.handleForgotPassword?.()}
                data-label="forgot-password"
              >
                Forgotten your password?
              </Button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

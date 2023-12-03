import { Form, Formik } from "formik";
import { Alert, Button, ButtonBar, FormActions } from "morse-react";
import { object, ref, string } from "yup";
import { LabelledInput } from "../../../forms/LabelledInput/LabelledInput";
import type { WithCancelCallback } from "../hooks/withCancelCallback";
import type { CognitoAuthenticationCredentials } from "../types";
import { PasswordPolicy } from "./PasswordPolicy";

export interface CognitoSignUpFormProps extends WithCancelCallback {
  /**
   * Handles the signup action
   */
  handleSignUp: (credentials: CognitoAuthenticationCredentials) => Promise<void>;

  /**
   * Stores any general error during submission
   */
  submissionError?: string;

  email?: string;

  lockEmail?: boolean;

  /**
   * Password policy items an a array of strings or PasswordPolicyItem objects.
   *
   * If strings are supplied those policies will show as a list of bullet points.
   * If PasswordPolicyItem objects are supplied the given regular expression will be used
   * to validate the password against the policy.
   */
  passwordPolicies?: PasswordPolicyItems;
}

interface SignUpSubmission {
  email: string;
  password: string;
  confirmPassword: string;
}

export const CognitoSignUpForm = (props: CognitoSignUpFormProps) => {
  return (
    <div className="ac-cognito ac-cognito-signup">
      {props.submissionError && (
        <Alert data-label="form-submission-error">{props.submissionError}</Alert>
      )}

      <Formik<SignUpSubmission>
        initialValues={{ email: props.email ?? "", password: "", confirmPassword: "" }}
        onSubmit={(values) => {
          return props.handleSignUp?.({
            username: values.email,
            password: values.password,
          });
        }}
        validationSchema={object().shape({
          email: string()
            .email("Your email address is needed to log in")
            .required("Your email address is needed to log in"),
          password: string().required("Your Wilsons password is needed to log in"),
          confirmPassword: string()
            .when("password", {
              is: (password: string | undefined) => !!(password && password.length > 0),
              then: string().oneOf([ref("password")], "Password confirmation doesn't match"),
            })
            .required("Password confirmation doesn't match"),
        })}
      >
        {({ submitForm, isSubmitting, values }) => (
          <Form className="c-form" autoComplete="off">
            {props.lockEmail ? (
              <>
                <p>
                  Your Email: <b>{props.email}</b>
                </p>
                <p>You will log in with this email address and the password you enter below.</p>
              </>
            ) : (
              <LabelledInput
                name="email"
                inputProps={{
                  type: "email",
                  placeholder: "my@email.address",
                }}
              />
            )}

            <LabelledInput
              label="Create Password"
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
                <Button busy={isSubmitting} onClick={submitForm} data-label="sign-up">
                  Sign up
                </Button>
                {props.handleCancel && (
                  <Button type="button" onClick={() => props.handleCancel?.()} data-label="cancel">
                    Go back
                  </Button>
                )}
              </ButtonBar>
            </FormActions>
          </Form>
        )}
      </Formik>
    </div>
  );
};
